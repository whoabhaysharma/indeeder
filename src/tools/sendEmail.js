import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { sendMail as sendMailUtil } from "../utils/mailer.js";

/**
 * sendEmail tool
 * @param {{to: string, subject?: string, text?: string, html?: string, from?: string}} options
 * @returns {Promise<object>} nodemailer send result
 */
export const sendEmail = tool(
  async ({ to, subject, text, html, from } = {}) => {
    if (!to) {
      throw new Error('Missing required "to" address');
    }

    const mail = {
      from: from || process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: subject || "(no subject)",
      text: text || (html ? undefined : ""),
      html: html || undefined,
    };

    // Delegate to shared mailer utility which verifies transporter when SMTP_HOST is set
    const info = await sendMailUtil(mail);

    // Return a concise result useful for tools/agents
    return {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    };
  },
  {
    name: "send_email",
    description:
      "Send an email using the configured SMTP server. Parameters: to (recipient), subject, text, html, from (optional).",
    schema: z.object({
      to: z.string().describe("The recipient email address."),
      subject: z.string().optional().describe("Email subject."),
      text: z.string().optional().describe("Plain-text body of the email."),
      html: z.string().optional().describe("HTML body of the email. If provided, used instead of text for HTML-capable clients."),
      from: z.string().optional().describe("Optional from address to override SMTP_FROM."),
    }),
  }
);

export default sendEmail;

// Usage example (not executed):
// import { sendEmail } from './src/tools/sendEmail.js';
// await sendEmail({ to: 'you@example.com', subject: 'Hello', text: 'Body' });
