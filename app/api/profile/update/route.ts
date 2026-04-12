import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, image } = body;

  const updatedUser = await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      name,
      image,
    },
  });

  return NextResponse.json(updatedUser);
}