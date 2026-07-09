import { validateAccessToken } from "@/src/services/admin";
import {
  createVehicle,
  deleteVehicle,
  getVehicle,
  updateVehicle,
} from "@/src/utils/db";
import {
  VehicleRecordType,
  VehicleUpdateRecordType,
} from "@/src/utils/db/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const vehicle: VehicleRecordType | null = await getVehicle(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: { vehicle } });
  } catch (error) {
    //console.error("Get vehicle error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to fetch vehicle.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
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

    const { id } = await params;
    const vehicle: VehicleRecordType | null = await getVehicle(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found." },
        { status: 404 },
      );
    }

    await deleteVehicle(id);

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    //console.error("Get vehicle error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to fetch vehicle.",
      },
      { status: 500 },
    );
  }
}

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

    const body = (await request.json()) as Partial<VehicleUpdateRecordType>;

    const { id } = await params;
    const vehicle: VehicleRecordType | null = await getVehicle(id);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Vehicle not found." },
        { status: 404 },
      );
    }

    const {
      id: vehicleId,
      createdAt,
      updatedAt,
      uri,
      ...updatedableInfo
    } = vehicle;
    const updateVehicleInfo: Omit<
      VehicleRecordType,
      "id" | "createdAt" | "updatedAt" | "uri"
    > = { ...updatedableInfo, ...body };

    const updatedVehicle: VehicleRecordType | null = await updateVehicle(
      id,
      updateVehicleInfo,
    );

    if (!updatedVehicle) {
      return NextResponse.json(
        { success: false, message: "Unable to update vehicle" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        vehicleId: updatedVehicle.id,
        vehicle: updatedVehicle,
      },
    });
  } catch (error) {
    //console.error("Update vehicle error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to update vehicle.",
      },
      { status: 500 },
    );
  }
}
