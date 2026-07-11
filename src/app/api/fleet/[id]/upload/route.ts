import { getVehicle, updateVehiclePhotoUri } from "@/src/utils/db";
import { VehicleRecordType } from "@/src/utils/db/types";
import { NextRequest, NextResponse } from "next/server";
import constants from "@/src/libs/constants";
import { validateAccessToken } from "@/src/services/admin";
import { RedisCache } from "@/src/utils/cache";
import { SUPABASE_BUCKET } from "@/src/utils/supabase";
import {
  convertFileToBuffer,
  deleteImageFromStorageByUri,
  resizeImageSizeByBuffer,
  uploadImageBufferToStorage,
  validateUploadedFileAsPhoto,
} from "@/src/services/uploader";

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

    const { error: fileValidationError } =
      await validateUploadedFileAsPhoto(file);
    if (fileValidationError) {
      return NextResponse.json(
        { success: false, message: fileValidationError },
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
    const buffer = await convertFileToBuffer(file as File);
    const resizedBuffer = await resizeImageSizeByBuffer(buffer);

    console.log("resizedBuffer.length: ", resizedBuffer.length);

    //--UPLOAD IMAGE BUFFER TO STORAGE
    const directory = "vehicles";
    const { error: uploadError, uri: uploadUri } =
      await uploadImageBufferToStorage(
        directory,
        resizedBuffer,
        SUPABASE_BUCKET,
      );
    if (uploadError || !uploadUri) {
      return NextResponse.json({
        success: false,
        message: uploadError,
      });
    }

    //--UPDATE VEHICLE PHOTO URI
    const updatedVehicle = await updateVehiclePhotoUri(id, uploadUri);
    if (!updatedVehicle) {
      //--DELETE UPLOADED IMAGE
      await deleteImageFromStorageByUri(directory, uploadUri, SUPABASE_BUCKET);

      return NextResponse.json({
        success: false,
        message: "Unable to update vehicle image",
      });
    }

    //--IF OLD PHOTO EXISTS, DELETE IT
    if (vehicle.uri?.length > 0) {
      await deleteImageFromStorageByUri(
        directory,
        vehicle.uri,
        SUPABASE_BUCKET,
      );
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
