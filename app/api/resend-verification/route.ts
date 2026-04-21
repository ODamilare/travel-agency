import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log("🔥 RESEND VERIFICATION ROUTE HIT");

  try {
    const { email } = await req.json();

    console.log("EMAIL RECEIVED:", email);

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    // 🔍 FIND USER
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 🚫 ALREADY VERIFIED
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Already verified" },
        { status: 400 }
      );
    }

    // 🔐 DELETE OLD TOKENS (optional but clean)
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // 🔥 CREATE NEW TOKEN
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    });

    // 🔗 CORRECT VERIFICATION LINK (IMPORTANT FIX)
    const link = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    console.log("VERIFICATION LINK:", link);

    // 📧 SEND EMAIL
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `
        <div>
          <h2>Verify your email</h2>
          <p>Click the button below to verify your account:</p>

          <a href="${link}" style="
            display:inline-block;
            padding:10px 16px;
            background:#6c47ff;
            color:#fff;
            border-radius:8px;
            text-decoration:none;
            margin-top:10px;
          ">
            Verify Email
          </a>
        </div>
      `,
    });

    console.log("RESEND RESPONSE:", response);

    return NextResponse.json({
      success: true,
      message: "Verification email sent",
    });

  } catch (err) {
    console.error("RESEND ERROR:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}