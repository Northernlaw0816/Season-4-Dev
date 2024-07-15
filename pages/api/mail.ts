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
	const schoolData: { schoolEmail: string; schoolName: string }[] = req.body;
	let canSendEmail = false;

	function* getNextMailAddress(data: { schoolEmail: string; schoolName: string }[]) {
		for (let i = 0; i < data.length; i++) {
			yield data[i];
		}
	}
	const getMail = getNextMailAddress(schoolData);
	const sendMail = async () => {
		if (!canSendEmail) return;
		// const { schoolName, schoolEmail } = getMail.next().value as { schoolEmail: string; schoolName: string };
		const school = getMail.next().value as { schoolEmail: string; schoolName: string };
		await Mail.sendMail({
			from: '"NuTopia" <info@nutopia.in>',
			subject: `Nutopia Season 4 Official Invite`,
			to: school.schoolEmail,
			cc: [`${process.env.MAILER_EMAIL}`],
			html: nunjucks.renderString(htmlBody, school),
		})
			.then(() => {
				console.log(Mail.isIdle());
				const date = new Date();
				console.log(
					`Email sent to ${school.schoolEmail} at ${date.getHours() - 12}:${date.getMinutes()}:${date.getSeconds()}`,
				);
				success = true;
				canSendEmail = false;
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	schoolData.forEach(async (school, index) => {
		canSendEmail = true;
		await sendMail();
	});
	res.status(200).json({
		success,
		message: `Successfully sent mail to ${schoolData.map((school) => school.schoolEmail).join(", ")}`,
	});
}
