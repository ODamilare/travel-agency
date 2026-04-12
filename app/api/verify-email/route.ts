import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return Response.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return Response.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { email: record.identifier },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.delete({
      where: { token },
    });

    return Response.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("VERIFY EMAIL ERROR:", err);

    return Response.json(
      { error: "Server error during verification" },
      { status: 500 }
    );
  }
}