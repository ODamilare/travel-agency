import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = body.token;

    console.log("TOKEN FROM FRONTEND:", token);

    if (!token) {
      return NextResponse.json(
        { error: "Token missing" },
        { status: 400 }
      );
    }

    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    console.log("DB RECORD:", record);

    if (!record) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    console.log("EXPIRES:", record.expires);
    console.log("NOW:", new Date());

    if (record.expires < new Date()) {
      return NextResponse.json(
        { error: "Token expired" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        email: record.identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.delete({
      where: {
        token,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}