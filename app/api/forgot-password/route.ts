import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

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

    // 🧹 DELETE OLD TOKENS
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // 🔐 CREATE RESET TOKEN
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    });

    // 🔗 RESET LINK
    const link = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    // 📧 SEND EMAIL
    await resend.emails.send({
      from: "LuxTravelerz <noreply@luxtravelerz.com>",
      to: email,
      subject: "Reset your password",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Password</title>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background-color: #f6f7ff;
            padding: 20px;
            line-height: 1.6;
          }

          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 4px 14px rgba(108, 71, 255, 0.12);
          }

          .top-gradient {
            height: 8px;
            background: linear-gradient(
              90deg,
              #6c47ff 0%,
              #9b72ff 50%,
              #ffd166 100%
            );
          }

          .header {
            padding: 30px 40px 10px;
            text-align: center;
          }

          .logo-image {
            height: 80px;
            width: auto;
            object-fit: contain;
          }

          .content {
            padding: 40px;
          }

          .title {
            font-size: 30px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 18px;
            line-height: 1.3;
          }

          .title span {
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .message {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 24px;
            line-height: 1.8;
          }

          .info-box {
            background: #f3efff;
            border: 1px solid #e4dcff;
            border-radius: 18px;
            padding: 22px;
            margin: 30px 0;
          }

          .info-box h3 {
            font-size: 18px;
            color: #111827;
            margin-bottom: 12px;
          }

          .info-box p {
            font-size: 15px;
            color: #6b7280;
            line-height: 1.7;
          }

          .button-container {
            text-align: center;
            margin: 40px 0;
          }

          .reset-button {
            display: inline-block;
            padding: 18px 60px;
            border-radius: 14px;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            color: #ffffff !important;
            text-decoration: none;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 6px 16px rgba(108, 71, 255, 0.3);
          }

          .support {
            margin-top: 30px;
            font-size: 15px;
            color: #6b7280;
            line-height: 1.8;
          }

          .support a {
            color: #6c47ff;
            text-decoration: none;
            font-weight: 600;
          }

          .closing {
            margin-top: 30px;
            color: #6b7280;
            font-size: 16px;
          }

          .signature {
            margin-top: 12px;
            color: #111827;
            font-weight: 700;
          }

          .cta-section {
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            padding: 40px;
            text-align: center;
            color: white;
          }

          .cta-title {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 18px;
          }

          .cta-button {
            display: inline-block;
            padding: 15px 40px;
            border-radius: 12px;
            background: white;
            color: #6c47ff !important;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
          }

          .footer {
            background: #f9f9ff;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #ececec;
          }

          .footer-logo-image {
            height: 60px;
            margin-bottom: 14px;
          }

          .footer p {
            font-size: 13px;
            color: #9ca3af;
            line-height: 1.7;
          }

          @media only screen and (max-width: 600px) {
            .content {
              padding: 28px 20px;
            }

            .header {
              padding: 20px;
            }

            .logo-image {
              height: 60px;
            }

            .title {
              font-size: 24px;
            }

            .reset-button {
              width: 100%;
              padding: 16px;
            }

            .cta-section {
              padding: 30px 20px;
            }
          }
        </style>
      </head>

      <body>
        <div class="email-container">

          <!-- TOP LINE -->
          <div class="top-gradient"></div>

          <!-- HEADER -->
          <div class="header">
            <img
              src="${process.env.NEXTAUTH_URL}/logo.png"
              alt="LuxTravelerz Logo"
              class="logo-image"
            />
          </div>

          <!-- CONTENT -->
          <div class="content">

            <h1 class="title">
              Reset Your <span>Password</span>
            </h1>

            <p class="message">
              We received a request to reset your LuxTravelerz account password.
              Click the button below to securely create a new password.
            </p>

            <div class="info-box">
              <h3>Security Notice</h3>

              <p>
                This password reset link will expire in 1 hour for your security.
                If you did not request this change, you can safely ignore this email.
              </p>
            </div>

            <!-- BUTTON -->
            <div class="button-container">
              <a href="${link}" class="reset-button">
                Reset Password
              </a>
            </div>

            <div class="support">
              Need help? Contact our support team at
              <a href="mailto:support@luxtravelerz.com">
                support@luxtravelerz.com
              </a>
            </div>

            <div class="closing">
              Thank you for choosing LuxTravelerz.
            </div>

            <div class="signature">
              — The LuxTravelerz Team
            </div>

          </div>

          <!-- CTA -->
          <div class="cta-section">
            <div class="cta-title">
              Your next adventure starts here ✈️
            </div>

            <a
              href="${process.env.NEXTAUTH_URL}"
              class="cta-button"
            >
              Explore LuxTravelerz
            </a>
          </div>

          <!-- FOOTER -->
          <div class="footer">

            <img
              src="${process.env.NEXTAUTH_URL}/logo.png"
              alt="LuxTravelerz Logo"
              class="footer-logo-image"
            />

            <p>
              LuxTravelerz is committed to providing premium travel experiences
              and world-class customer support.
            </p>

          </div>
        </div>
      </body>
      </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Password reset email sent",
    });

  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}