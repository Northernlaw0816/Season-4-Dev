import {
	collection,
	DocumentSnapshot,
	getDocs,
	updateDoc,
	setDoc,
	doc,
} from "firebase/firestore";
import Nunjucks from "nunjucks";
import Util from "util";
import type { NextApiRequest, NextApiResponse } from "next";
import * as Nodemailer from "nodemailer";
import { firestore } from "../../firebase/clientApp";
import { titleCase } from "../../functions";
import { mailBody } from "../../data/mailBody";
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
			const htmlBody = mailBody;
			MailTransport.sendMail({
				from: '"NuTopia" <info@nutopia.in>',
				to: UpdatedData.schoolEmail,
				cc: [`${process.env.MAILER_EMAIL}`],
				subject: `NuTopia - ${Object.values(UpdatedData.events).map((event) => (titleCase(event.eventName))).join(", ")} Registration successful`,
				html: Nunjucks.renderString(htmlBody, {
					UpdatedData,
					...{
						events: Object.values(UpdatedData.events).map((event) => {
							return { ...event, eventName: titleCase(event.eventName) };
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
