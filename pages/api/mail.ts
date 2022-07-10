import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs-extra";
import nodemailer from "nodemailer";
import nunjucks from "nunjucks";

const htmlBody = fs.readFileSync("mail.html", "utf8");

// Mail Provider
const Mail = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});
export default async function mail(req: NextApiRequest, res: NextApiResponse) {
  let success = false;
  if (!req.body)
    return res.status(200).json({
      success,
      message: "No body",
    });
  Mail.sendMail({
    from: '"NuTopia" <info@nutopia.in>',
    to: req.body.userEmail,
    cc: [`${process.env.MAILER_USER}`],
    html: nunjucks.renderString(htmlBody, req.body.formData),
  })
    .then(() => (success = true))
    .catch((e) => {
      success = false;
    });
  res.status(200).json({
    success,
    message: `Successfully sent mail to ${req.body.userEmail}`,
  });
}
