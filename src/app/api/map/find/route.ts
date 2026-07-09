import { fetchCoordinateAddress } from "@/src/services/map";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const longitude = searchParams.get("lng");
  const latitude = searchParams.get("lat");

  if (!longitude || !latitude) {
    return NextResponse.json(
      {
        success: false,
        data: null,
      },
      { status: 400 },
    );
  }

  const data = await fetchCoordinateAddress(
    parseFloat(longitude || "0"),
    parseFloat(latitude || "0"),
  );

  if (!data) {
    return NextResponse.json(
      {
        success: false,

        data: null,
      },
      { status: 404 },
    );
  } else {
    return NextResponse.json(
      {
        success: true,

        data,
      },
      { status: 200 },
    );
  }
}
