import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "UXTRAVELERZ <onboarding@resend.dev>", // change later to your domain
    to: email,
    subject: "Verify your email - UXTRAVELERZ",
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f3ff;font-family:sans-serif;">

<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

  <div style="background:linear-gradient(135deg,#6c47ff,#9b7bff);padding:40px 20px;text-align:center;color:white;">
    <h1 style="margin:0;">UXTRAVELERZ</h1>
    <p style="opacity:0.8;">Explore the world with ease</p>
  </div>

  <div style="padding:40px 30px;">
    <h2 style="color:#1f2937;">Welcome, Traveler ✈️</h2>

    <p style="color:#555;line-height:1.7;">
      You're one step away from unlocking amazing travel deals.
    </p>

    <ul style="color:#555;">
      <li>Verify your email</li>
      <li>Complete your profile</li>
      <li>Explore destinations</li>
      <li>Book trips</li>
    </ul>

    <div style="text-align:center;margin-top:30px;">
      <a href="${link}" 
         style="background:#6c47ff;color:white;padding:14px 40px;border-radius:10px;text-decoration:none;font-weight:600;">
         Verify Email
      </a>
    </div>

    <p style="margin-top:30px;color:#555;">
      Need help? 
      <a href="mailto:support@luxtravelerz.com" style="color:#6c47ff;">
        Contact support
      </a>
    </p>
  </div>

  <div style="background:#6c47ff;color:white;padding:30px;text-align:center;">
    Got questions? We're here for you
  </div>

  <div style="padding:20px;text-align:center;color:#888;font-size:13px;">
    © 2026 UXTRAVELERZ
  </div>

</div>

</body>
</html>
    `,
  });
};