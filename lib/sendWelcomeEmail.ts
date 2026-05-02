import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (
  email: string,
  name?: string
) => {
  await resend.emails.send({
    from: "LuxTravelerz <noreply@luxtravelerz.com>",
    to: email,
    subject: "Welcome to LuxTravelerz ✈️",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to LuxTravelerz</title>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
              Roboto, Helvetica, Arial, sans-serif;
            background: #f6f7fb;
            padding: 20px;
            color: #1f2937;
          }

          .container {
            max-width: 620px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(108, 71, 255, 0.12);
          }

          .top-bar {
            height: 8px;
            background: linear-gradient(
              90deg,
              #6c47ff 0%,
              #8f6bff 40%,
              #ffd166 100%
            );
          }

          .hero {
            padding: 50px 40px 30px;
            text-align: center;
            background:
              radial-gradient(circle at top right, #ede9fe 0%, transparent 30%),
              radial-gradient(circle at bottom left, #fff3d6 0%, transparent 30%),
              #ffffff;
          }

          .logo {
            width: 90px;
            margin-bottom: 18px;
          }

          .badge {
            display: inline-block;
            background: #f3efff;
            color: #6c47ff;
            padding: 8px 18px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 22px;
          }

          .title {
            font-size: 34px;
            line-height: 1.2;
            font-weight: 800;
            color: #111827;
            margin-bottom: 16px;
          }

          .gradient {
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .subtitle {
            font-size: 16px;
            line-height: 1.8;
            color: #6b7280;
            max-width: 480px;
            margin: 0 auto;
          }

          .content {
            padding: 10px 40px 40px;
          }

          .cards {
            display: grid;
            gap: 16px;
            margin-top: 35px;
          }

          .card {
            background: #faf8ff;
            border: 1px solid #ede9fe;
            border-radius: 20px;
            padding: 22px;
          }

          .card-title {
            font-size: 18px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 10px;
          }

          .card-text {
            font-size: 15px;
            line-height: 1.7;
            color: #6b7280;
          }

          .features {
            margin-top: 35px;
          }

          .feature {
            display: flex;
            align-items: flex-start;
            margin-bottom: 18px;
          }

          .icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            border-radius: 14px;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            color: white;
            text-align: center;
            line-height: 42px;
            font-size: 18px;
            margin-right: 14px;
          }

          .feature-title {
            font-size: 16px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 4px;
          }

          .feature-text {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.7;
          }

          .cta-box {
            margin-top: 40px;
            padding: 35px;
            border-radius: 24px;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            text-align: center;
            color: white;
          }

          .cta-title {
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 14px;
          }

          .cta-text {
            font-size: 15px;
            line-height: 1.7;
            opacity: 0.92;
            margin-bottom: 28px;
          }

          .button {
            display: inline-block;
            padding: 16px 38px;
            border-radius: 14px;
            background: white;
            color: #6c47ff !important;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          }

          .stats {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            margin-top: 40px;
          }

          .stat {
            flex: 1;
            background: #ffffff;
            border: 1px solid #ede9fe;
            border-radius: 20px;
            padding: 20px;
            text-align: center;
          }

          .stat-number {
            font-size: 26px;
            font-weight: 800;
            color: #6c47ff;
            margin-bottom: 8px;
          }

          .stat-label {
            font-size: 13px;
            color: #6b7280;
          }

          .footer-pattern {
            height: 80px;
            background: linear-gradient(
              90deg,
              #6c47ff 0%, #6c47ff 12.5%,
              #9b72ff 12.5%, #9b72ff 25%,
              #ffd166 25%, #ffd166 37.5%,
              #f5f3ff 37.5%, #f5f3ff 50%,
              #6c47ff 50%, #6c47ff 62.5%,
              #ffd166 62.5%, #ffd166 75%,
              #9b72ff 75%, #9b72ff 87.5%,
              #6c47ff 87.5%, #6c47ff 100%
            );
          }

          .footer {
            padding: 35px;
            text-align: center;
            background: #fafaff;
          }

          .footer-logo {
            width: 70px;
            margin-bottom: 16px;
          }

          .footer-text {
            font-size: 14px;
            line-height: 1.8;
            color: #6b7280;
            margin-bottom: 18px;
          }

          .socials {
            margin-top: 20px;
          }

          .socials a {
            display: inline-block;
            width: 42px;
            height: 42px;
            line-height: 42px;
            border-radius: 50%;
            margin: 0 6px;
            text-decoration: none;
            background: linear-gradient(135deg, #6c47ff, #9b72ff);
            color: white;
            font-size: 18px;
          }

          @media only screen and (max-width: 600px) {
            .hero,
            .content,
            .footer {
              padding-left: 22px;
              padding-right: 22px;
            }

            .title {
              font-size: 28px;
            }

            .stats {
              flex-direction: column;
            }

            .cta-box {
              padding: 28px 22px;
            }
          }
        </style>
      </head>

      <body>
        <div class="container">

          <div class="top-bar"></div>

          <div class="hero">

            <img
              src="${process.env.NEXTAUTH_URL}/logo.png"
              alt="LuxTravelerz"
              class="logo"
            />

            <div class="badge">
              Luxury Travel Platform
            </div>

            <h1 class="title">
              Welcome to
              <span class="gradient">LuxTravelerz</span>,
              ${name || "Traveler"} ✈️
            </h1>

            <p class="subtitle">
              Your premium gateway to unforgettable destinations,
              luxury stays, elite experiences, and world-class travel planning.
            </p>

          </div>

          <div class="content">

            <div class="cards">

              <div class="card">
                <div class="card-title">
                  🌍 Explore the world differently
                </div>

                <div class="card-text">
                  Discover premium destinations, hidden gems,
                  curated travel experiences, and seamless luxury bookings.
                </div>
              </div>

              <div class="card">
                <div class="card-title">
                  🏨 Luxury stays & elite flights
                </div>

                <div class="card-text">
                  Access premium hotels, first-class flights,
                  exclusive travel deals, and unforgettable experiences.
                </div>
              </div>

            </div>

            <div class="features">

              <div class="feature">
                <div class="icon">✈️</div>

                <div>
                  <div class="feature-title">
                    Instant flight booking
                  </div>

                  <div class="feature-text">
                    Search and reserve flights across top global destinations.
                  </div>
                </div>
              </div>

              <div class="feature">
                <div class="icon">🏝️</div>

                <div>
                  <div class="feature-title">
                    Curated luxury experiences
                  </div>

                  <div class="feature-text">
                    Discover premium getaways and experiences tailored for modern travelers.
                  </div>
                </div>
              </div>

              <div class="feature">
                <div class="icon">🚘</div>

                <div>
                  <div class="feature-title">
                    Rides & mobility
                  </div>

                  <div class="feature-text">
                    Premium rides and transportation options built into your travel flow.
                  </div>
                </div>
              </div>

            </div>

            <div class="stats">

              <div class="stat">
                <div class="stat-number">150+</div>
                <div class="stat-label">
                  Destinations
                </div>
              </div>

              <div class="stat">
                <div class="stat-number">24/7</div>
                <div class="stat-label">
                  Support
                </div>
              </div>

              <div class="stat">
                <div class="stat-number">VIP</div>
                <div class="stat-label">
                  Luxury Experience
                </div>
              </div>

            </div>

            <div class="cta-box">

              <div class="cta-title">
                Start your next adventure today
              </div>

              <div class="cta-text">
                Explore luxury travel experiences designed for modern explorers.
              </div>

              <a
                href="${process.env.NEXTAUTH_URL}"
                class="button"
              >
                Explore LuxTravelerz
              </a>

            </div>

          </div>

          <div class="footer-pattern"></div>

          <div class="footer">

            <img
              src="${process.env.NEXTAUTH_URL}/logo.png"
              alt="LuxTravelerz"
              class="footer-logo"
            />

            <div class="footer-text">
              Thank you for joining LuxTravelerz.
              We’re excited to be part of your next journey.
            </div>

            <div class="socials">
              <a href="#">📷</a>
              <a href="#">🐦</a>
              <a href="#">💼</a>
            </div>

          </div>

        </div>
      </body>
      </html>
    `,
  });
};