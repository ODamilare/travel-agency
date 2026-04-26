import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const link = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await transport.sendMail({
    from: "LuxTravelerz <no-reply@lux.com>",
    to: email,
    subject: "Verify your email - LuxTravelerz",
   html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Email</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #f5f3ff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  }

  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }

  .header {
    background: linear-gradient(135deg, #6c47ff, #9b7bff);
    padding: 40px 20px;
    text-align: center;
    color: white;
  }

  .logo {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .content {
    padding: 40px 30px;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 15px;
  }

  .text {
    font-size: 15px;
    color: #555;
    line-height: 1.7;
    margin-bottom: 25px;
  }

  .steps {
    margin: 20px 0;
    padding-left: 18px;
  }

  .steps li {
    margin-bottom: 10px;
    color: #555;
  }

  .btn {
    display: inline-block;
    padding: 14px 40px;
    background: #6c47ff;
    color: white !important;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    margin-top: 20px;
  }

  .btn:hover {
    background: #5a38e0;
  }

  .footer {
    padding: 25px;
    text-align: center;
    font-size: 13px;
    color: #888;
    border-top: 1px solid #eee;
  }

  .cta {
    background: #6c47ff;
    color: white;
    padding: 30px;
    text-align: center;
  }

  .cta a {
    display: inline-block;
    margin-top: 10px;
    padding: 12px 30px;
    background: white;
    color: #6c47ff;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    .content {
      padding: 25px 20px;
    }
  }
</style>
</head>

<body>

<div class="container">

  <div class="header">
    <div class="logo">UXTRAVELERZ</div>
    <p>Explore the world with ease</p>
  </div>

  <div class="content">
    <div class="title">Welcome, Traveler ✈️</div>

    <div class="text">
      You're just one step away from unlocking amazing travel deals, hidden destinations, and unforgettable experiences.
    </div>

    <div class="text"><strong>Get started:</strong></div>

    <ul class="steps">
      <li>Verify your email address</li>
      <li>Complete your profile</li>
      <li>Explore top destinations</li>
      <li>Book your next trip</li>
    </ul>

    <div style="text-align:center;">
      <a href="${link}" class="btn">Verify Email</a>
    </div>

    <div class="text" style="margin-top:30px;">
      Need help? Contact us at 
      <a href="mailto:support@luxtravelerz.com" style="color:#6c47ff;">
        support@luxtravelerz.com
      </a>
    </div>
  </div>

  <div class="cta">
    <div>Got questions? We're here for you</div>
    <a href="mailto:support@luxtravelerz.com">Contact Support</a>
  </div>

  <div class="footer">
    © 2026 UXTRAVELERZ — All rights reserved
  </div>

</div>

</body>
</html>
`,
  });
};