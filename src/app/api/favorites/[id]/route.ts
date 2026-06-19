import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.favoriteLocation.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete favorite." }, { status: 500 });
  }
}
