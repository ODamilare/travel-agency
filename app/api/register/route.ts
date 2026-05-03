import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import crypto from "crypto";

// ✅ ONLY welcome email
import { sendWelcomeEmail } from "@/lib/sendWelcomeEmail";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // ✅ VALIDATION
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // ✅ CHECK EXISTING USER
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE USER
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        // keep your verification system untouched
        emailVerified: null,
      },
    });
    const token = crypto.randomBytes(32).toString("hex");

await prisma.verificationToken.create({
  data: {
    identifier: user.email!,
    token,
    expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
  },
});

    // ✅ SEND WELCOME EMAIL ONLY
    try {
  await sendWelcomeEmail(user.email!, token, user.name || "Traveler");
    } catch (mailError) {
      console.error("WELCOME EMAIL ERROR:", mailError);

      // don't fail signup because of email
    }

    return NextResponse.json({
      message: "Account created successfully",
    });

  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    // Prisma duplicate email safety
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}