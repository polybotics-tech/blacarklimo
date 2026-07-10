import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";

import { getVehicle, updateVehiclePhotoUri } from "@/src/utils/db";
import { VehicleRecordType } from "@/src/utils/db/types";
import { NextRequest, NextResponse } from "next/server";
import constants from "@/src/libs/constants";
import { validateAccessToken } from "@/src/services/admin";
import { RedisCache } from "@/src/utils/cache";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { error, admin } = await validateAccessToken(request);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 401 },
      );
    }

    const formData = await request.formData();

    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Vehicle photo is missing" },
        { status: 400 },
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        {
          message: "Only JPG, PNG and WEBP images are allowed.",
        },
        { status: 400 },
      );
    }

    if (file.size > constants.photoUpload.MAX_FILE_SIZE) {
      return Response.json(
        {
          message: "Image must not exceed 3MB.",
        },
        { status: 400 },
      );
    }

    const { id } = await params;
    const vehicle: VehicleRecordType | null = await getVehicle(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found." },
        { status: 404 },
      );
    }

    //--CONVERT TO BUFFER AND RESIZE
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const resizedBuffer = await sharp(buffer)
      .resize({
        width: constants.photoUpload.MAX_WIDTH,
        height: constants.photoUpload.MAX_HEIGHT,

        fit: "inside",

        withoutEnlargement: true,
      })
      .webp({
        quality: 85,
      })
      .toBuffer();

    //--ENSURE DIRECTORY EXISTS
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "uploads",
      "images",
      "fleet",
    );
    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    //--RENAME FILE NAME
    const extension = ".webp";
    const filename = `${Date.now()}-${randomUUID()}` + extension;
    await fs.writeFile(path.join(uploadDir, filename), resizedBuffer);

    //--UPDATE VEHICLE PHOTO URI
    const imageUri = "/assets/uploads/images/fleet/" + filename;
    const updatedVehicle = await updateVehiclePhotoUri(id, imageUri);
    if (!updatedVehicle) {
      return NextResponse.json({
        success: false,
        message: "Unable to upload vehicle image",
      });
    }

    //--IF OLD PHOTO EXISTS, DELETE IT
    if (vehicle.uri?.length > 0) {
      const oldPath = path.join(process.cwd(), "public", vehicle.uri);
      await fs.access(oldPath);

      await fs.unlink(oldPath);
    }

    await RedisCache.delete(
      [
        constants.cacheKeyTemp.vehicles.order(id),
        constants.cacheKeyTemp.vehicles.orders(false),
        constants.cacheKeyTemp.vehicles.orders(true),
        constants.cacheKeyTemp.vehicles.count_orders(),
      ],
      true,
    );

    return NextResponse.json({
      success: true,
      message: "Vehicle image uploaded successfully",
      data: {
        vehicle: updatedVehicle,
      },
    });
  } catch (error) {
    console.error("Upload vehicle image error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to upload vehicle image",
      },
      { status: 500 },
    );
  }
}
