import constants from "@/src/libs/constants";
import { validateAccessToken } from "@/src/services/admin";
import { RedisCache } from "@/src/utils/cache";
import {
  countAllVehicles,
  createVehicle,
  getMultipleVehicles,
  updateVehicleSortOrder,
} from "@/src/utils/db";
import {
  VehicleRecordType,
  VehicleSortOrderUpdateType,
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

    const totalNumOfVehicles: number = await countAllVehicles();

    const vehicle: VehicleRecordType | null = await createVehicle({
      ...body,
      sortOrder: Number(totalNumOfVehicles + 1),
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Unable to create vehicle" },
        { status: 400 },
      );
    }

    await RedisCache.delete(
      [
        constants.cacheKeyTemp.vehicles.orders(false),
        constants.cacheKeyTemp.vehicles.orders(true),
        constants.cacheKeyTemp.vehicles.count_orders(),
      ],
      true,
    );

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

export async function PUT(request: NextRequest) {
  try {
    const { error, admin } = await validateAccessToken(request);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 401 },
      );
    }

    const body = (await request.json()) as VehicleSortOrderUpdateType;

    const updated = await updateVehicleSortOrder(body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Unable to update vehicle order" },
        { status: 400 },
      );
    }

    const vehicles = await getMultipleVehicles();
    vehicles.forEach((vh) => {
      RedisCache.delete(constants.cacheKeyTemp.vehicles.order(vh.id));
    });
    await RedisCache.delete(
      [
        constants.cacheKeyTemp.vehicles.orders(false),
        constants.cacheKeyTemp.vehicles.orders(true),
        constants.cacheKeyTemp.vehicles.count_orders(),
      ],
      true,
    );

    return NextResponse.json({
      success: true,
      data: {
        vehicles,
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const activeOnly = Boolean(searchParams.get("activeOnly")) || false;

    const vehicles: VehicleRecordType[] = await getMultipleVehicles(activeOnly);

    return NextResponse.json({ success: true, data: { vehicles } });
  } catch (error) {
    //console.error("Get vehicles error:", error);

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
