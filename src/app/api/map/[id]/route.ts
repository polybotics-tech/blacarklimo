import { fetchPlaceInformation } from "@/src/services/map";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { searchParams } = new URL(request.url);

  const sessionToken = searchParams.get("session") || "";

  const data = await fetchPlaceInformation(String(id), sessionToken);

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
