import { collection, DocumentSnapshot, getDocs, updateDoc, setDoc, doc, addDoc } from "firebase/firestore";
import Nunjucks from "nunjucks";
import Util from "util";
import type { NextApiRequest, NextApiResponse } from "next";
import * as Nodemailer from "nodemailer";
import { firestore } from "../../firebase/clientApp";
import { titleCase } from "../../functions";
import fs from "fs-extra";
const mailBody = fs.readFileSync("public/templates/register.njk").toString();
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
