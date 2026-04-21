import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (record.expires < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: record.identifier },
      data: {
        password: hashed,
      },
    });

    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}