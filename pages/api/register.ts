import {
	addDoc,
	collection,
	DocumentSnapshot,
	documentId,
	getDocs,
	query,
	where,
	updateDoc,
	setDoc,
	doc,
} from "firebase/firestore";
import Nunjucks from "nunjucks";
import Util from "util";
import type { NextApiRequest, NextApiResponse } from "next";
import schools from "../../data/SchoolsList";
import axios from "axios";
import * as Nodemailer from "nodemailer";
import { firestore } from "../../firebase/clientApp";
import { titleCase } from "../../functions";
interface Participant {
	name: string;
	grade: string;
	phone: string;
	selectedGroups: string[];
	selectableGroups: string[];
}
interface Team {
	teamName?: string;
	participants?: Participant[];
}
interface Event {
	eventName: string;
	isTeam: boolean;
	platform: string;
	game: string;
	teams?: Team[];
	participants?: Participant[];
}
interface Events {
	[eventName: string]: Event;
}
interface SchoolData {
	schoolId: string;
	schoolName: string;
	schoolEmail: string;
	events: Events;
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

	const { schoolId, schoolName, schoolEmail, eventName, participants, teams, platform, game, isTeam, currentGroup } =
		body;
	const CurrentRegistrationTeams: Team[] = teams;
	const CurrentRegistrationParticipants: Participant[] = participants;
	let success = true;
	let message = "";
	message = `Successfully registered for ${titleCase(
		eventName.replace(/-/g, " "),
	)}\nEmail has been sent regarding registration details.`;

	if (!req.body) {
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
		if (selectedGroups.includes(currentGroup))
			return {
				reason: "is already registered in the current event.",
				canParticipate: false,
				selectableGroups,
				selectedGroups,
			};
		// Check if group can be selected
		if (!selectableGroups.includes(currentGroup))
			return {
				reason: "cannot join this event",
				canParticipate: false,
				selectableGroups,
				selectedGroups,
			};
		// Include current group in selectedGroup list
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
				game,
				platform,
				isTeam,
				teams: [],
				participants: [],
			},
		},
	};
	if (AllSchoolsRegistration.length === 0) {
		if (isTeam) {
			const Teams: Team[] = [];
			console.log(Util.inspect(CurrentRegistrationTeams, false, null, true));
			CurrentRegistrationTeams.forEach((RegisteredTeam) => {
				console.log(1, RegisteredTeam.participants?.filter((v) => v)?.flat());
				const Participants: Participant[] = [];
				const checkParticipant = (participant: Participant) => {
					const permission = ParticipantPermission(
						currentGroup,
						participant?.selectableGroups,
						participant?.selectedGroups,
					);
					if (!permission.canParticipate) {
						isError = true;
						success = false;
						message = `${participant.name} ${permission.reason}`;

						return;
					}
					console.log(participant, permission);
					if (!participant?.selectableGroups) participant["selectableGroups"] = [];
					if (!participant?.selectedGroups) participant["selectedGroups"] = [];
					participant["selectableGroups"] = permission.selectableGroups;
					participant["selectedGroups"] = permission.selectedGroups;
					Participants.push(participant);
				};
				RegisteredTeam.participants
					?.filter((v) => v)
					?.flat()
					?.forEach((RegisteredParticipant) => {
						checkParticipant(RegisteredParticipant);
					});
				Teams.push({ teamName: RegisteredTeam.teamName, participants: Participants });
			});
			UpdatedData.events[`${eventName}`].teams = Teams;
		} else {
			const Participants: Participant[] = [];
			const checkParticipant = (participant: Participant) => {
				const permission = ParticipantPermission(
					currentGroup,
					participant?.selectableGroups,
					participant?.selectedGroups,
				);
				if (!permission.canParticipate) {
					isError = true;
					success = false;
					message = `${participant.name} ${permission.reason}`;
					return;
				}
				console.log(Util.inspect(participant, false, null, true));
				if (!participant?.selectableGroups) participant["selectableGroups"] = [];
				if (!participant?.selectedGroups) participant["selectedGroups"] = [];
				participant["selectableGroups"] = permission.selectableGroups;
				participant["selectedGroups"] = permission.selectedGroups;
				Participants.push(participant);
			};
			CurrentRegistrationParticipants.flat().forEach((RegisteredParticipant) => {
				checkParticipant(RegisteredParticipant);
			});
			UpdatedData.events[`${eventName}`].participants = Participants;
		}
	}
	AllSchoolsRegistration.forEach((Rschool) => {
		if (isError) return;
		const events: Event[] = Object.values(Rschool.get("events")) as Event[];
		events.forEach((event) => {
			UpdatedData.events = { ...UpdatedData.events, ...{ [event.eventName]: { ...event } } };
			if (isError) return;
			if (isTeam) {
				const TeamNames = events
					.filter((event) => {
						if (event.game) return event.eventName === eventName && event.game === game;
						else return event.eventName === eventName;
					})?.[0]
					?.teams?.map((team: any) => team.teamName);
				const Teams: Team[] = [];
				CurrentRegistrationTeams?.forEach((RegisteredTeam, RegisteredTeamIndex) => {
					if (isError) return;
					if (TeamNames?.includes(RegisteredTeam.teamName)) {
						isError = true;
						success = false;
						message = `Team Name already exists! (Check Team ${
							RegisteredTeamIndex + 1
						})\nPlease use a different Team Name`;
						return;
					}
					const Participants: Participant[] = [];
					const checkParticipant = (participant: Participant) => {
						const permission = ParticipantPermission(
							currentGroup,
							participant?.selectableGroups,
							participant?.selectedGroups,
						);
						if (!permission.canParticipate) {
							isError = true;
							success = false;
							message = `${participant.name} ${permission.reason}`;
							if (permission.reason === "cannot join this event")
								message = `${participant.name} can't register for this event as they are already registered for ${event.eventName}, which is taking place at the same time.
`;
							return;
						}
						participant["selectableGroups"] = permission.selectableGroups;
						participant["selectedGroups"] = permission.selectedGroups;
						Participants.push(participant);
					};
					const checkParticipantOnRegisteredEvents = (RegisteredParticipant: Participant) => {
						let isParticipantChecked = false;
						event.teams?.forEach((team) => {
							if (isError) return;
							team.participants;
							team.participants?.forEach((participant) => {
								if (participant.phone === RegisteredParticipant.phone) {
									checkParticipant(participant);
									isParticipantChecked = true;
								}
							});
						});
						event.participants?.forEach((participant) => {
							if (participant.phone === RegisteredParticipant.phone) {
								checkParticipant(participant);
								isParticipantChecked = true;
							}
						});
						if (!isParticipantChecked) {
							checkParticipant(RegisteredParticipant);
						}
					};
					RegisteredTeam.participants
						?.filter((v) => v)
						?.flat()
						.forEach((RegisteredParticipant) => {
							if (isError) return;
							checkParticipantOnRegisteredEvents(RegisteredParticipant);
						});
					Teams.push({ teamName: RegisteredTeam.teamName, participants: Participants });
				});
				UpdatedData.events[`${eventName}`].teams = Teams;
			} else {
				const Participants: Participant[] = [];
				const checkParticipant = (participant: Participant) => {
					const permission = ParticipantPermission(
						currentGroup,
						participant?.selectableGroups,
						participant?.selectedGroups,
					);
					if (!permission.canParticipate) {
						isError = true;
						success = false;
						message = `${participant.name} ${permission.reason}`;
						if (permission.reason === "cannot join this event")
							message = `${participant.name} can't register for this event as they are already registered for ${event.eventName}, which is taking place at the same time.`;
						return;
					}
					console.log(Util.inspect(participant, false, null, true));
					participant["selectableGroups"] = permission.selectableGroups;
					participant["selectedGroups"] = permission.selectedGroups;
					console.log(Util.inspect(participant, false, null, true));
					Participants.push(participant);
				};
				const checkParticipantOnRegisteredEvents = (RegisteredParticipant: Participant) => {
					let isParticipantChecked = false;
					event.teams?.forEach((team) => {
						if (isError) return;
						team.participants?.forEach((participant) => {
							if (participant.phone === RegisteredParticipant.phone) {
								checkParticipant(participant);
								isParticipantChecked = true;
							}
						});
					});
					event.participants?.forEach((participant) => {
						if (participant.phone === RegisteredParticipant.phone) {
							checkParticipant(participant);
							isParticipantChecked = true;
						}
					});
					if (!isParticipantChecked) {
						checkParticipant(RegisteredParticipant);
					}
				};
				CurrentRegistrationParticipants?.flat()?.forEach((RegisteredParticipant) => {
					if (isError) return;
					checkParticipantOnRegisteredEvents(RegisteredParticipant);
				});
				UpdatedData.events[`${eventName}`].participants = Participants;
			}
		});
	});

	if (success) {
		const DocumentRef = doc(firestore, `registrations-s4`, `${UpdatedData.schoolEmail}`);
		console.log(Util.inspect(UpdatedData, false, null, true));
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
			const htmlBody = `<head>
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

		.email_header a > img {
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
			width: 100%;
			border-collapse: collapse;
			border-radius: 0.75rem;
			overflow: hidden;
			margin: 1rem 0;
		}

		th, td {
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

		td > p {
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

		.icon_link > img {
			width: 38px;
			height: 38px;
		}

		.address {
			font-size: 0.95em;
		}

		.copyright {
			font-size: 1rem;
		}
	</style>
</head>
<body class="body_container">
	<div class="email_body">
		<header class="email_header">
			<a href="https://nutopia.in"><img src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Fnutopia-horizontal.png?alt=media&token=d792df57-14f0-4448-83a7-9a31fffc53f6" /></a>
		</header>
		<div class="email_content">
			<h2>Dear {{ schoolName }},</h2>

			<p>Thank you for your registration and welcome to <strong>Nutopia Season 4</strong>!</p>

			<p>This e-mail acknowledges the registration of participants from your domain.</p>

			<p>Find the details below :</p>

			{% for event in events %}
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

			<p>For any change in the registration kindly write to <a href="mailto:info@nutopia.in" style="color: #00cc22;">info@nutopia.in</a></p>
			<p>Looking for forward to your presence!</p>
		</div>
	</div>
	<div class="email_footer">
		<table class="links">
			<tr>
				<td class="link">
					<a href="https://nutopia.in" class="icon_link"><img style="background: #00cc22; border-radius: 4px;" src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Fnu-square.png?alt=media&token=bb190de1-7e16-4319-9205-22d383b2b57b" /></a>
				</td>
				<td class="link">
					<a href="https://www.facebook.com/NuTopia-106903048559461/?ref=page_internal" class="icon_link filter_2"><img src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Ffb_logo.png?alt=media&token=ac998233-c94e-4dc7-a028-5e0cc0b03dbb" /></a>
				</td>
				<td class="link">
					<a href="https://www.instagram.com/nutopia_ybps/" class="icon_link"><img src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Fig_logo.png?alt=media&token=813105d6-da10-41f3-b391-557fa43c5352" /></a>
				</td>
				<td class="link">
					<a href="https://www.youtube.com/channel/UC6gMtIVvbPDfVsR4e1Knx9A" class="icon_link filter_2"><img src="https://firebasestorage.googleapis.com/v0/b/nutopia-307e4.appspot.com/o/email-assets%2Fyt_logo.png?alt=media&token=c8d25c89-a12f-4a50-8e07-1c18e97c0a8f" /></a>
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
			Yuvabharathi Public School,<br/>
			17/1, Yuva Enclave, Kanuvai - Thudiyalur Road,<br/>
			Somayampalayam Post, Kanuvai,<br/>
			Coimbatore, Tamil Nadu 641108, India
		</p>
		<p class="copyright">&copy; <a href="https://yuvabharathi.in" style="color: #00cc22">Yuvabharathi Public School</a> 2022. All Rights Reserved.</p>
	</div>
</body>`;
			MailTransport.sendMail({
				from: '"NuTopia" <info@nutopia.in>',
				to: UpdatedData.schoolEmail,
				cc: [`${process.env.MAILER_EMAIL}`],
				subject: `Nutopia STEM Carnival Registrations Successful`,
				html: Nunjucks.renderString(htmlBody, {
					UpdatedData,
					...{
						events: Object.values(UpdatedData.events).map((event) => {
							return { ...event, eventName: titleCase(eventName) };
						}),
					},
				}),
			})
				.then(() => {})
				.catch((e) => {});
		}
	}
	return res.status(200).json({
		success,
		message,
	});
}
