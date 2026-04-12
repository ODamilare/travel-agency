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
    from: "oluwashanud101@gmail.com",
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Verify your email</h2>
      <p>Click below to verify your account:</p>
      <a href="${link}">Verify Email</a>
    `,
  });
};