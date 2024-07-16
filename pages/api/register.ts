import { collection, DocumentSnapshot, getDocs, updateDoc, setDoc, doc, addDoc } from "firebase/firestore";
import Nunjucks from "nunjucks";
import Util from "util";
import type { NextApiRequest, NextApiResponse } from "next";
import * as Nodemailer from "nodemailer";
import { firestore } from "../../firebase/clientApp";
import { titleCase } from "../../functions";
const mailBody = `<head>
	<style>
		.body_container {
			padding: 5% 10%;
			margin: 0;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			color: white;
		}

		.email_body {
			border-radius: 1.5rem;
			overflow: hidden;
		}

		.email_header {
			background-color: #00cc22;
			padding: 20px 20px 10px 20px;
		}

		.email_header a>img {
			width: min(max(5rem, 50%), 20rem);
			height: auto;
		}

		.email_content {
			background: #003c47;
			padding: 2ch;
		}

		p {
			font-size: 1.15rem;
		}

		h3 {
			font-size: 1.25rem;
		}

		table {
			width: 90%;
			border-collapse: collapse;
			border-radius: 0.75rem;
			overflow: hidden;
			margin: 1rem auto;
		}

		th,
		td {
			padding: 1ch;
			text-align: center;
		}

		th {
			background: #00cc22;
		}

		td {
			background: hsl(0, 0%, 0%, 50%);
			padding: 0.5em;
		}

		td>p {
			padding: 1ch;
			margin: 0;
			font-size: 1rem;
		}

		.rows {
			display: grid;
			grid-template-rows: repeat(auto-fit, 1fr);
		}

		.row_highlight {
			background: hsl(0, 0%, 50%, 50%);
		}

		.email_footer {
			color: white;
			text-align: center;
			font-size: 0.9rem;
			margin-top: 2rem;
			border-radius: 1.5em;
			background: #003c47;
			padding: 1em
		}

		.links {
			width: 75%;
			padding: 2em;
			margin: 1em auto;
			justify-content: center;
		}

		.link {
			margin: 0;
			padding: 0;
			background: transparent;
		}

		.icon_link {
			width: 40px;
			height: 40px;
		}

		.icon_link>img {
			width: 38px;
			height: 38px;
		}

		.address {
			display: block;
			font-size: 0.95em;
			text-align: left;
			margin: auto;
			width: max-content;
		}

		.copyright {
			font-size: 1rem;
		}

		.im {
			color: white !important;
		}
	</style>
</head>

<body class="body_container">
	<div class="email_body">
		<header class="email_header">
			<a href="https://nutopia.in"><img
					src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Fnutopia-horizontal.png?alt=media&token=d792df57-14f0-4448-83a7-9a31fffc53f6" /></a>
		</header>
		<div class="email_content">
			<h3>Dear {{ schoolName }},</h3>

			<p>Welcome to <strong>NuTopia Season 4</strong>!</p>

			<p>Thank you for register for NuTopia. Please find the details below: </p>

			{% for event in events %}
			<p></p>
			<h3>
				{{ event.eventName }}
			</h3>
			{% if event.isTeam %}
			<table id="{{ event.eventName }}">
				<tr>
					<th>Team Name</th>
					<th>Participants</th>
				</tr>
				{% set cls = cycler("row_normal", "row_highlight") %}
				{% for team in event.teams %}
				<tr class="{{ cls.next() }}">
					<td>{{ team.teamName }}</td>
					<td class="rows participants-list">
						{% for participant in team.participants %}
						<p>{{ participant.name }} - {{participant.grade}} - {{participant.phone}}</p>
						{% endfor %}
					</td>
				</tr>
				{% endfor %}
			</table>
			{% else %}
			<table>
				<tr>
					<th>Name</th>
					<th>Grade</th>
					<th>Phone</th>
				</tr>
				{% set cls = cycler("row_normal", "row_highlight") %}
				{% for participant in event.participants %}
				<tr class="{{ cls.next() }}">
					<td>{{ participant.name }}</td>
					<td>{{ participant.grade }}</td>
					<td>{{ participant.phone }}</td>
				</tr>
				{% endfor %}
			</table>
			{% endif %}

			{% endfor %}

			<p>For queries regarding this registration, please contact us at <a href="mailto:info@nutopia.in" style="color: #00cc22;">info@nutopia.in</a>.</p>
			<p>We hope to see you soon!</p>
		</div>
	</div>
	<div class="email_footer">
		<table class="links">
			<tr>
				<td class="link">
					<a href="https://nutopia.in" class="icon_link"><img style="background: #00cc22; border-radius: 4px;"
							src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Fnu-square.png?alt=media&token=bb190de1-7e16-4319-9205-22d383b2b57b" /></a>
				</td>
				<td class="link">
					<a href="https://www.facebook.com/NuTopia-106903048559461/?ref=page_internal" class="icon_link filter_2"><img
							src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Ffb_logo.png?alt=media&token=ac998233-c94e-4dc7-a028-5e0cc0b03dbb" /></a>
				</td>
				<td class="link">
					<a href="https://www.instagram.com/nutopia_ybps/" class="icon_link"><img
							src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Fig_logo.png?alt=media&token=813105d6-da10-41f3-b391-557fa43c5352" /></a>
				</td>
				<td class="link">
					<a href="https://www.youtube.com/channel/UC6gMtIVvbPDfVsR4e1Knx9A" class="icon_link filter_2"><img
							src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Fyt_logo.png?alt=media&token=c8d25c89-a12f-4a50-8e07-1c18e97c0a8f" /></a>
				</td>
			</tr>
			<tr>
				<td class="link">
					Website
				</td>
				<td class="link">
					FaceBook
				</td>
				<td class="link">
					Instagram
				</td>
				<td class="link">
					YouTube
				</td>
			</tr>
		</table>
		<p class="address">
			Yuvabharathi Public School<br/>
			17/1, Yuva Enclave,<br/>
			Kanuvai - Thudiyalur Road,<br />
			Somayampalayam Post,<br/>
			Kanuvai,<br />
			Coimbatore, Tamil Nadu 641108
		</p>
		<p class="copyright">&copy; <a href="https://nutopia.in" style="color: #00cc22">Team NuTopia</a> 2024. All Rights Reserved.</p>
	</div>
</body>`
interface Participant {
	name: string;
	grade: string;
	phone: string;
	selectedGroups: string[];
	selectableGroups: string[];
}
interface Team {
	platform?: string;
	gameName?: string;
	teamName?: string;
	participants?: Participant[];
}
interface Game {
	gameName?: string;
	teams?: Team[];
}
interface Games {
	[gameName: string]: Game;
}

interface SchoolEvent {
	eventName: string;
	isTeam: boolean;
	isGame: boolean;
	// games?: Games;
	teams?: Team[];
	participants?: Participant[];
}
interface SchoolEvents {
	[eventName: string]: SchoolEvent;
}
interface SchoolData {
	schoolId: string;
	schoolName: string;
	schoolEmail: string;
	events: SchoolEvents;
}

export default async function register(req: NextApiRequest, res: NextApiResponse) {
	const MailTransport = Nodemailer.createTransport({
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
	let body = req.body;

	const {
		schoolId,
		schoolName,
		schoolEmail,
		eventName,
		isTeam,
		isGame,
		gameName,
		platform,
		teams,
		participants,
		currentGroup,
	} = body;
	const CurrentRegistrationTeams: Team[] = teams;
	const CurrentRegistrationParticipants: Participant[] = participants;
	let success = true;
	let message = "";
	message = `Successfully registered for ${titleCase(
		eventName.replaceAll(/-/g, " "),
	)}. Email has been sent regarding registration details.`;

	if (!req.body) {
		success = false;
		return res.status(200).json({
			success: success,
			message: "No body",
		});
	}
	const ParticipantPermission = (
		currentGroup: string,
		selectableGroups: string[] | undefined,
		selectedGroups: string[] | undefined,
	) => {
		if (!selectableGroups) selectableGroups = ["A", "B", "C", "D"];
		if (!selectedGroups) selectedGroups = [];
		// Check if group already exists in registered groups
		if (selectedGroups.includes(currentGroup)) {
			return {
				reason: `may already be registed in group: ${currentGroup}`,
				canParticipate: false,
				selectableGroups,
				selectedGroups,
			};
		}
		// Check if group can be selected
		if (!selectableGroups.includes(currentGroup)) {
			return {
				reason: "cannot join this event",
				canParticipate: false,
				selectableGroups,
				selectedGroups,
			};
		}
		selectedGroups.push(currentGroup);
		switch (currentGroup) {
			case "A": {
				selectableGroups = selectableGroups.filter((grp) => grp === "B" || grp === "D");
				break;
			}
			case "B": {
				selectableGroups = selectableGroups.filter((grp) => grp === "A" || grp === "D");
				break;
			}
			case "C": {
				selectableGroups = selectableGroups.filter((grp) => grp === "D");
				break;
			}
			case "D": {
				selectableGroups = selectableGroups.filter((grp) => grp === "A" || grp === "B" || grp === "C");
				break;
			}
		}
		const data = {
			reason: "",
			canParticipate: true,
			selectedGroups,
			selectableGroups,
		};
		return data;
	};
	const AllRegistrationCollections = collection(firestore, "registrations-s4");
	const AllRegistrationDocuments = await getDocs(AllRegistrationCollections);

	const AllSchoolsRegistration: DocumentSnapshot[] = AllRegistrationDocuments.docs.map((doc) => doc);
	let isError = false;
	let UpdatedData: SchoolData = {
		schoolId: schoolId,
		schoolName: schoolName,
		schoolEmail: schoolEmail,
		events: {
			[eventName]: {
				eventName,
				isTeam,
				isGame,
				teams: [],
				participants: [],
			},
		},
	};
	if (AllSchoolsRegistration.length === 0) {
		if (isTeam) {
			const Teams: Team[] = [];
			CurrentRegistrationTeams.forEach((RegisteredTeam) => {
				if (isError) return;
				const Participants: Participant[] = [];
				RegisteredTeam.participants
					?.filter((participant) => participant)
					.flat()
					.forEach((RegisteredParticipant) => {
						const RegisteredPartcipantPermission = ParticipantPermission(
							currentGroup,
							RegisteredParticipant.selectableGroups,
							RegisteredParticipant.selectedGroups,
						);
						Participants.push({
							name: RegisteredParticipant.name,
							grade: RegisteredParticipant.grade,
							phone: RegisteredParticipant.phone,
							selectableGroups: RegisteredPartcipantPermission.selectableGroups,
							selectedGroups: RegisteredPartcipantPermission.selectedGroups,
						});
					});
				Teams.push({
					teamName: RegisteredTeam.teamName,
					gameName: gameName ?? "",
					platform: platform ?? "",
					participants: Participants,
				});
			});
			if (isError) return;
			Teams.forEach((Team) => UpdatedData.events[`${eventName}`].teams?.push(Team));
		} else {
			const Participants: Participant[] = [];
			CurrentRegistrationParticipants.filter((participant) => participant)
				.flat()
				.forEach((RegisteredParticipant) => {
					if (isError) return;
					const RegisteredPartcipantPermission = ParticipantPermission(
						currentGroup,
						RegisteredParticipant.selectableGroups,
						RegisteredParticipant.selectedGroups,
					);
					Participants.push({
						name: RegisteredParticipant.name,
						grade: RegisteredParticipant.grade,
						phone: RegisteredParticipant.phone,
						selectableGroups: RegisteredPartcipantPermission.selectableGroups,
						selectedGroups: RegisteredPartcipantPermission.selectedGroups,
					});
				});
			if (isError) return;
			Participants.forEach((Participant) => UpdatedData.events[`${eventName}`].participants?.push(Participant));
		}
	} else {
		AllSchoolsRegistration.forEach((School) => {
			if (isError) return;

			const Events: SchoolEvents = School.get("events") as SchoolEvents;

			const EventsData = Object.values(Events);

			UpdatedData.events = { ...UpdatedData.events, ...Events };

			const TeamNames = EventsData.filter((event) => event.eventName === eventName)
				.map((event) =>
					event.teams?.filter((team) => (isGame ? team.gameName === gameName : true))?.map((team) => team.teamName),
				)
				.flat();

			EventsData.forEach((Event) => {
				// UpdatedData.events[`${Event.eventName}`] = Event
				if (isError) return;

				if (isTeam) {
					const Teams: Team[] = [];

					CurrentRegistrationTeams.forEach((RegisteredTeam, RegisteredTeamIndex) => {
						if (isError) return;

						if (TeamNames.includes(RegisteredTeam.teamName)) {
							isError = true;
							success = false;
							message = `Team Name: ${RegisteredTeam.teamName} already exists in this event.`;
							return;
						}
						const Participants: Participant[] = [];

						let isRegisteredParticipantChecked = false;

						const CheckParticipantPermissions = (participant: Participant) => {
							const ParticipantPermissions = ParticipantPermission(
								currentGroup,
								participant.selectableGroups,
								participant.selectedGroups,
							);

							if (!ParticipantPermissions.canParticipate) {
								isError = true;
								success = false;
								message = `${participant.name} ${ParticipantPermissions.reason}`;
								if (ParticipantPermissions.reason === "cannot join this event") {
									message = `${participant.name} has already registered for an another event taking place at the same time`;
								}
								return;
							}

							Participants.push({
								name: participant.name,
								grade: participant.grade,
								phone: participant.phone,
								selectableGroups: ParticipantPermissions.selectableGroups,
								selectedGroups: ParticipantPermissions.selectedGroups,
							});
						};

						RegisteredTeam.participants
							?.filter((RegisteredParticipant) => RegisteredParticipant)
							.flat()
							.forEach((RegisteredParticipant) => {
								if (isError) return;

								Event.teams?.forEach((team) => {
									if (isError) return;

									team.participants
										?.filter((participant) => participant)
										.flat()
										.forEach((participant) => {
											if (participant.phone === RegisteredParticipant.phone) {
												isRegisteredParticipantChecked = true;

												CheckParticipantPermissions(participant);
											}
										});
								});

								Event.participants
									?.filter((participant) => participant)
									.flat()
									.forEach((participant) => {
										if (isError) return;

										if (participant.phone === RegisteredParticipant.phone) {
											isRegisteredParticipantChecked = true;

											CheckParticipantPermissions(participant);
										}
									});

								if (!isRegisteredParticipantChecked) CheckParticipantPermissions(RegisteredParticipant);

								Teams.push({
									teamName: RegisteredTeam.teamName,
									platform: platform,
									gameName: gameName,
									participants: Participants,
								});
							});
					});

					Teams.forEach((Team) => UpdatedData.events[`${eventName}`].teams?.push(Team));
				} else {
					const Participants: Participant[] = [];
					let isRegisteredParticipantChecked = false;
					const CheckParticipantPermissions = (participant: Participant) => {
						const ParticipantPermissions = ParticipantPermission(
							currentGroup,
							participant.selectableGroups,
							participant.selectedGroups,
						);
						if (!ParticipantPermissions.canParticipate) {
							isError = true;
							success = false;
							message = `${participant.name} ${ParticipantPermissions.reason}`;
							if (ParticipantPermissions.reason === "cannot join this event") {
								message = `${participant.name} has already registered for an another event taking place at the same time`;
							}
							return;
						}
						Participants.push({
							name: participant.name,
							grade: participant.grade,
							phone: participant.phone,
							selectableGroups: ParticipantPermissions.selectableGroups,
							selectedGroups: ParticipantPermissions.selectedGroups,
						});
						console.log(`2P1`, Participants);
					};
					CurrentRegistrationParticipants.filter((Participant) => Participant)
						.flat()
						?.forEach((RegisteredParticipant) => {
							if (isError) return;
							Event.teams?.forEach((team) => {
								if (isError) return;

								team.participants
									?.filter((participant) => participant)
									.flat()
									.forEach((participant) => {
										if (participant.phone === RegisteredParticipant.phone) {
											isRegisteredParticipantChecked = true;
											CheckParticipantPermissions(participant);
										}
									});
							});
							Event.participants
								?.filter((participant) => participant)
								.flat()
								.forEach((participant) => {
									if (isError) return;
									if (participant.phone === RegisteredParticipant.phone) {
										isRegisteredParticipantChecked = true;
										CheckParticipantPermissions(participant);
									}
								});
							if (!isRegisteredParticipantChecked) CheckParticipantPermissions(RegisteredParticipant);
						});
					Participants.forEach((Participant) => UpdatedData.events[`${eventName}`].participants?.push(Participant));
				}
			});
		});
	}
	if (success) {
		const DocumentRef = doc(firestore, `registrations-s4`, `${UpdatedData.schoolEmail}`);

		try {
			await updateDoc(DocumentRef, {
				schoolId: UpdatedData.schoolId,
				schoolName: UpdatedData.schoolName,
				schoolEmail: UpdatedData.schoolEmail,
				events: UpdatedData?.events,
			});
		} catch (error) {
			await setDoc(DocumentRef, {
				schoolId: UpdatedData.schoolId,
				schoolName: UpdatedData.schoolName,
				schoolEmail: UpdatedData.schoolEmail,
				events: UpdatedData?.events,
			});
		} finally {
			const htmlBody = mailBody;
			// MailTransport.sendMail({
			// 	from: '"NuTopia" <info@nutopia.in>',
			// 	to: UpdatedData.schoolEmail,
			// 	cc: [`${process.env.MAILER_EMAIL}`],
			// 	subject: `NuTopia - ${Object.values(UpdatedData.events)
			// 		.map((event) => titleCase(event.eventName))
			// 		.join(", ")} Registration successful`,
			// 	html: Nunjucks.renderString(htmlBody, {
			// 		...UpdatedData,
			// 		...{
			// 			schoolName: UpdatedData.schoolName,
			// 			events: Object.values(UpdatedData.events)
			// 				.filter((event) => event.eventName === eventName)
			// 				.map((event) => {
			// 					return { ...event, eventName: titleCase(event.eventName.replaceAll(/-/g, " ")) };
			// 				}),
			// 		},
			// 	}),
			// })
			// 	.then(() => {})
			// 	.catch((e) => {});
		}
	}
	return res.status(200).json({
		success,
		message,
	});
}
