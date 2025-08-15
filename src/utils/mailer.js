import nodemailer from "nodemailer";

export async function sendMail({ to, subject, text, html }) {
  // Configure transporter with environment variables
  const port = parseInt(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // If SMTP_HOST is provided, verify connection before sending to provide clearer errors
  if (process.env.SMTP_HOST) {
    await transporter.verify();
  }

  // Send mail
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });

  return info;
}
