import { fetchMapSuggestions } from "@/src/services/map";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";
  const sessionToken = searchParams.get("session") || "";
  const longitude = searchParams.get("lng");
  const latitude = searchParams.get("lat");

  const proximity = Boolean(longitude && latitude)
    ? {
        longitude: parseFloat(longitude || "0"),
        latitude: parseFloat(latitude || "0"),
      }
    : undefined;

  const data = await fetchMapSuggestions(query, sessionToken, proximity);

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        data: [],
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
