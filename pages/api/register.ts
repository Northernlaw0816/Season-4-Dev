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
import Util from "util";
import type { NextApiRequest, NextApiResponse } from "next";
import schools from "../../data/SchoolsList";
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
	events: Events;
}

export default async function register(req: NextApiRequest, res: NextApiResponse) {
	let body = req.body;

	const { eventName, participants, teams, platform, schoolId, schoolName, game, isTeam, currentGroup } = body;
	const CurrentRegistrationTeams: Team[] = teams;
	const CurrentRegistrationParticipants: Participant[] = participants;
	let success = true;
	let message = "";
	message = `Successfully registered for ${titleCase(eventName.replace(/-/g, " "))}`;

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
				reason: "is already in the current group event",
				canParticipate: false,
				selectableGroups,
				selectedGroups,
			};
		// Check if group can be selected
		if (!selectableGroups.includes(currentGroup))
			return {
				reason: "cannot join this group event",
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
			CurrentRegistrationTeams.forEach((RegisteredTeam) => {
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
					participant["selectableGroups"] = permission.selectableGroups;
					participant["selectedGroups"] = permission.selectedGroups;
					Participants.push(participant);
				};
				RegisteredTeam.participants?.flat()?.forEach((RegisteredParticipant) => {
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
					RegisteredTeam.participants?.flat().forEach((RegisteredParticipant) => {
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
		const DocumentRef = doc(firestore, `registrations-s4`, `${UpdatedData.schoolId}`);
		console.log(Util.inspect(UpdatedData, false, null, true));
		try {
			await updateDoc(DocumentRef, {
				schoolId: UpdatedData.schoolId,
				schoolName: UpdatedData.schoolName,
				events: UpdatedData?.events,
			});
		} catch (error) {
			await setDoc(DocumentRef, {
				schoolId: UpdatedData.schoolId,
				schoolName: UpdatedData.schoolName,
				events: UpdatedData?.events,
			});
		}
	}
	return res.status(200).json({
		success,
		message,
	});
}
