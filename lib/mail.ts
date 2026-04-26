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
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            line-height: 1.6;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #ffffff;
            padding: 30px 40px 20px;
            text-align: center;
          }
          .logo {
            font-size: 32px;
            font-weight: 700;
            color: #4a9fb5;
            margin-bottom: 10px;
            letter-spacing: 2px;
          }
          .logo-accent {
            color: #e85d75;
          }
          .content {
            padding: 40px;
            background-color: #ffffff;
          }
          .greeting {
            font-size: 24px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 24px;
          }
          .greeting-accent {
            color: #e85d75;
          }
          .message {
            font-size: 16px;
            color: #555555;
            margin-bottom: 30px;
            line-height: 1.8;
          }
          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 20px;
          }
          .steps-list {
            margin: 0 0 30px 20px;
          }
          .steps-list li {
            font-size: 16px;
            color: #555555;
            margin-bottom: 12px;
            line-height: 1.6;
          }
          .button-container {
            text-align: center;
            margin: 40px 0;
          }
          .verify-button {
            display: inline-block;
            padding: 18px 60px;
            background-color: #4a9fb5;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }
          .verify-button:hover {
            background-color: #3d8ca1;
          }
          .support-section {
            font-size: 15px;
            color: #555555;
            margin-top: 30px;
            line-height: 1.8;
          }
          .support-link {
            color: #e85d75;
            text-decoration: none;
          }
          .support-link:hover {
            text-decoration: underline;
          }
          .closing {
            margin-top: 30px;
            font-size: 16px;
            color: #555555;
          }
          .signature {
            margin-top: 8px;
            font-weight: 600;
            color: #2c3e50;
          }
          .geometric-pattern {
            height: 80px;
            background: linear-gradient(90deg, 
              #4a9fb5 0%, #4a9fb5 12.5%, 
              #2c3e50 12.5%, #2c3e50 25%, 
              #f4b4c4 25%, #f4b4c4 37.5%, 
              #f9d5a7 37.5%, #f9d5a7 50%, 
              #4a9fb5 50%, #4a9fb5 62.5%, 
              #f4b4c4 62.5%, #f4b4c4 75%, 
              #f9d5a7 75%, #f9d5a7 87.5%, 
              #4a9fb5 87.5%, #4a9fb5 100%);
            position: relative;
          }
          .cta-section {
            background-color: #e85d75;
            padding: 40px;
            text-align: center;
            color: #ffffff;
          }
          .cta-title {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.4;
          }
          .cta-button {
            display: inline-block;
            padding: 16px 50px;
            background-color: #ffffff;
            color: #2c3e50;
            text-decoration: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            margin-top: 10px;
          }
          .footer {
            padding: 30px 40px;
            background-color: #ffffff;
            border-top: 1px solid #eeeeee;
            font-size: 13px;
            color: #888888;
            line-height: 1.8;
          }
          .footer-logo {
            font-size: 24px;
            font-weight: 700;
            color: #4a9fb5;
            margin-bottom: 15px;
          }
          .footer-address {
            margin-top: 15px;
            font-size: 13px;
            color: #888888;
          }
          .social-links {
            margin-top: 20px;
            text-align: center;
          }
          .social-links a {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin: 0 8px;
            background-color: #2c3e50;
            border-radius: 50%;
            text-decoration: none;
            line-height: 40px;
            color: #ffffff;
            font-size: 18px;
          }
          @media only screen and (max-width: 600px) {
            .content {
              padding: 30px 20px;
            }
            .header {
              padding: 20px;
            }
            .greeting {
              font-size: 20px;
            }
            .verify-button {
              padding: 16px 40px;
              font-size: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header with Logo -->
          <div class="header">
            <div class="logo">
              LUX<span class="logo-accent">TRAVELERZ</span>
            </div>
          </div>

          <!-- Main Content -->
          <div class="content">
            <h1 class="greeting">
              Welcome to LuxTravelerz, <span class="greeting-accent">Traveler</span>!
            </h1>

            <p class="message">
              Welcome to LuxTravelerz! We're excited to have you with us and to guide you through your onboarding process.
            </p>

            <h2 class="section-title">Here are your next steps</h2>
            <ul class="steps-list">
              <li>Verify your email address</li>
              <li>Complete your profile setup</li>
              <li>Explore amazing travel destinations</li>
              <li>Book your dream vacation</li>
            </ul>

            <div class="button-container">
              <a href="${link}" class="verify-button">Click here to verify your email</a>
            </div>

            <div class="support-section">
              If you have any questions or need assistance, our support team is here to help. Feel free to reach out to us at 
              <a href="mailto:support@luxtravelerz.com" class="support-link">support@luxtravelerz.com</a> or visit our Help Center.
            </div>

            <div class="closing">
              Thank you for choosing LuxTravelerz. We look forward to supporting you on your journey!
            </div>

            <div class="closing">
              Welcome to the LuxTravelerz family!
            </div>

            <div class="signature">
              Best,<br>
              The LuxTravelerz Team
            </div>
          </div>

          <!-- Geometric Pattern -->
          <div class="geometric-pattern"></div>

          <!-- CTA Section -->
          <div class="cta-section">
            <div class="cta-title">Got any questions? We'd love to help</div>
            <a href="mailto:support@luxtravelerz.com" class="cta-button">Speak to customer support</a>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-logo">
              LUX<span class="logo-accent">TRAVELERZ</span>
            </div>
            
            <p>
              We're committed to providing you with the best travel experiences and exceptional customer service.
            </p>

            <div class="footer-address">
              LuxTravelerz, Your Address Here, City, Country
            </div>

            <div class="social-links">
              <a href="#" title="Twitter">🐦</a>
              <a href="#" title="LinkedIn">💼</a>
              <a href="#" title="Instagram">📷</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};