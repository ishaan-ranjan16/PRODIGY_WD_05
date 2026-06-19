import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const favorites = await prisma.favoriteLocation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(favorites);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch favorites." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cityName, country, lat, lon } = body;

    if (!cityName || !country || lat === undefined || lon === undefined) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const favorite = await prisma.favoriteLocation.upsert({
      where: { lat_lon: { lat, lon } },
      update: {},
      create: { cityName, country, lat, lon },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save favorite." }, { status: 500 });
  }
}
