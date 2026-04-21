import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(deals);
  } catch (error) {
    console.error("DEALS FETCH ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 }
    );
  }
}