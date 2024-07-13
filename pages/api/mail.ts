import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs-extra";
import Nodemailer from "nodemailer";
import nunjucks from "nunjucks";

const htmlBody = fs.readFileSync("public/templates/invite.njk").toString();

// Mail Provider
const Mail = Nodemailer.createTransport({
	host: "smtpout.secureserver.net",
	secure: true,
	secureConnection: false, // TLS requires secureConnection to be false
	tls: {
		ciphers: "SSLv3",
	},
	requireTLS: true,
	port: 465,
	debug: false,
	auth: {
		user: process.env.MAILER_EMAIL,
		pass: process.env.MAILER_PASSWORD,
	},
} as Nodemailer.SendMailOptions);
export default async function mail(req: NextApiRequest, res: NextApiResponse) {
	let success = false;
	if (!req.body)
		return res.status(200).json({
			success,
			message: "No body",
		});
	const body: { schoolEmail: string; schoolName: string } = req.body;
	await Mail.sendMail({
		from: '"NuTopia" <info@nutopia.in>',
		subject: `Nutopia Season 4 Official Invite`,
		to: body.schoolEmail,
		cc: [`${process.env.MAILER_EMAIL}`],
		html: nunjucks.renderString(htmlBody, body),
	})
		.then(() => {
			success = true;
		})
		.catch((e: any) => {});
	res.status(200).json({
		success,
		message: `Successfully sent mail to ${body.schoolEmail}`,
	});
}
