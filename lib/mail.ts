import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "UXTRAVELERZ <onboarding@resend.dev>", // change later to your domain
    to: email,
    subject: "Verify your email - UXTRAVELERZ",
   html:`
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
            background-color: #f6f7ff;
            padding: 20px;
            line-height: 1.6;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(108, 71, 255, 0.1);
          }
          .top-gradient {
            height: 8px;
            background: linear-gradient(90deg, #6c47ff 0%, #9b72ff 50%, #ffd166 100%);
          }
          .header {
            background-color: #ffffff;
            padding: 30px 40px 20px;
            text-align: center;
          }
          .logo-image {
            height: 80px;
            width: auto;
            object-fit: contain;
            margin: 0 auto;
            display: block;
          }
          .logo {
            font-size: 32px;
            font-weight: 700;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
            letter-spacing: 2px;
          }
          .logo-accent {
            background: linear-gradient(135deg, #9b72ff, #ffd166);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .content {
            padding: 40px;
            background-color: #ffffff;
          }
          .greeting {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 24px;
          }
          .greeting-accent {
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .message {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 30px;
            line-height: 1.8;
          }
          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 20px;
          }
          .steps-list {
            margin: 0 0 30px 20px;
          }
          .steps-list li {
            font-size: 16px;
            color: #6b7280;
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
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            color: #ffffff;
            text-decoration: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 12px rgba(108, 71, 255, 0.3);
          }
          .verify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(108, 71, 255, 0.4);
          }
          .support-section {
            font-size: 15px;
            color: #6b7280;
            margin-top: 30px;
            line-height: 1.8;
          }
          .support-link {
            color: #6c47ff;
            text-decoration: none;
            font-weight: 600;
          }
          .support-link:hover {
            text-decoration: underline;
          }
          .closing {
            margin-top: 30px;
            font-size: 16px;
            color: #6b7280;
          }
          .signature {
            margin-top: 8px;
            font-weight: 600;
            color: #1f2937;
          }
          .geometric-pattern {
            height: 80px;
            background: linear-gradient(90deg, 
              #6c47ff 0%, #6c47ff 12.5%, 
              #9b72ff 12.5%, #9b72ff 25%, 
              #ffd166 25%, #ffd166 37.5%, 
              #f3efff 37.5%, #f3efff 50%, 
              #6c47ff 50%, #6c47ff 62.5%, 
              #ffd166 62.5%, #ffd166 75%, 
              #9b72ff 75%, #9b72ff 87.5%, 
              #6c47ff 87.5%, #6c47ff 100%);
            position: relative;
          }
          .cta-section {
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
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
            color: #6c47ff;
            text-decoration: none;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            margin-top: 10px;
            transition: transform 0.2s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .footer {
            padding: 30px 40px;
            background-color: #f9f9ff;
            border-top: 1px solid #e5e7eb;
            font-size: 13px;
            color: #9ca3af;
            line-height: 1.8;
          }
          .footer-logo {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
          }
          .footer-logo-image {
            height: 60px;
            width: auto;
            object-fit: contain;
            margin: 0 auto 15px;
            display: block;
          }
          .footer-address {
            margin-top: 15px;
            font-size: 13px;
            color: #9ca3af;
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
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            border-radius: 50%;
            text-decoration: none;
            line-height: 40px;
            color: #ffffff;
            font-size: 18px;
            transition: transform 0.2s ease;
          }
          .social-links a:hover {
            transform: translateY(-2px);
          }
          @media only screen and (max-width: 600px) {
            .content {
              padding: 30px 20px;
            }
            .header {
              padding: 20px;
            }
            .logo-image {
              height: 60px;
            }
            .footer-logo-image {
              height: 50px;
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
          <!-- Top Gradient Line -->
          <div class="top-gradient"></div>
 
          <!-- Header with Logo -->
          <div class="header">
            <img
              src="${process.env.NEXTAUTH_URL}/logo.png"
              alt="LuxTravelerz Logo"
              class="logo-image"
            />
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
            <img
              src="${process.env.NEXTAUTH_URL}/logo.png"
              alt="LuxTravelerz Logo"
              class="footer-logo-image"
            />
            
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