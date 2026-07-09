import { validateAccessToken } from "@/src/services/admin";
import { createVehicle, getMultipleVehicles } from "@/src/utils/db";
import {
  VehicleRecordType,
  VehicleUpdateRecordType,
} from "@/src/utils/db/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { error, admin } = await validateAccessToken(request);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 401 },
      );
    }

    const body = (await request.json()) as VehicleUpdateRecordType;

    const vehicle: VehicleRecordType | null = await createVehicle(body);

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Unable to create vehicle" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        vehicle,
      },
    });
  } catch (error) {
    console.error("Create vehicle error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to create vehicle",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const activeOnly = Boolean(searchParams.get("activeOnly")) || false;

    const vehicles: VehicleRecordType[] = await getMultipleVehicles(activeOnly);

    return NextResponse.json({ success: true, data: { vehicles } });
  } catch (error) {
    console.error("Get vehicles error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to fetch vehicles.",
      },
      { status: 500 },
    );
  }
}
