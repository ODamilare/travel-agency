import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mail";

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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    // ✅ CREATE TOKEN
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        identifier: user.email!,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    });

    // ✅ SEND EMAIL (SAFE WRAP)
    try {
      await sendVerificationEmail(user.email!, token);
    } catch (mailError) {
      console.error("MAIL ERROR:", mailError);

      // ⚠️ Don't fail registration because of email
      return NextResponse.json({
        warning:
          "Account created, but we couldn’t send verification email. Try again later.",
      });
    }

    return NextResponse.json({
      message: "Account created. Check your email to verify your account.",
    });

  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    // 🔥 HANDLE KNOWN PRISMA ERRORS
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