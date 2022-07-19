import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "../../firebase/clientApp";
import { titleCase } from "../../functions";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  let body = req.body;

  const { event, participants, team, platform, schoolId, game } = body;

  let success = true;
  let message = "";

  if (team) {
    message = `Successfully registered for ${titleCase(event.toString().replace(/-/g, " "))}`;
  } else if (participants) {
    message = `Successfully registered for ${titleCase(event.toString().replace(/-/g, " "))}`;
  }

  if (!req.body) {
    return res.status(200).json({
      success: false,
      message: "No body",
    });
  }

  // Database code here

  const registrationsCollection = collection(firestore, "registrations_season_2");
  const allRegistrationsSnapshot = await getDocs(registrationsCollection);
  const registrationsSnapshot = await getDocs(query(registrationsCollection, where("schoolId", "==", schoolId)));
  const schoolRegistrations: any = [];
  const allRegistrations: any = [];

  registrationsSnapshot.forEach((doc: any) => {
    schoolRegistrations.push(doc);
  });
  allRegistrationsSnapshot.forEach((doc: any) => {
    allRegistrations.push(doc);
  });

  const phones: any = [];
  if (allRegistrations.length > 0) {
    allRegistrations.forEach((registrations: any) => {
      if (registrations.get("team")) {
        registrations.get("team").participants.forEach((participant: any) => {
          phones.push(participant.phone);
        });
      }

      if (registrations.get("participants")) {
        registrations.get("participants").forEach((participant: any) => {
          phones.push(participant.phone);
        });
      }
    });

    if (team) {
      team.participants.forEach((participant: any, index: number) => {
        if (phones.includes(participant.phone)) {
          return res.status(200).json({
            success: false,
            message: `Phone number already in use (Participant: ${index + 1})`,
          });
        }
      });
    }

    if (participants) {
      participants.forEach((participant: any, index: number) => {
        if (participant.phone === "") delete participants[index];
        if (phones.includes(participant.phone)) {
          return res.status(200).json({
            success: false,
            message: `Phone number already in use (Participant: ${index + 1})`,
          });
        }
      });
    }
  }

  if (schoolRegistrations.length > 0) {
    const tmpEvents: any = [];
    const tmpGames: any = [];
    const teamName: any = [];

    schoolRegistrations.forEach((registration: any) => {
      if (registration.get("event") === "arena-of-valor") {
        tmpEvents.push(`${registration.get("event")}:${registration.get("platform")}`);
        tmpEvents.push(registration.get("game"));
      } else tmpEvents.push(registration.get("event"));
    });

    if (event === "arena-of-valor") {
      if (tmpGames.filter((Game: any) => Game === game).length >= 3) {
        return res.status(200).json({ success: false, message: `Reached the maximum registrations for this game (${game}) from your school` });
      }
      if (tmpEvents.filter((Event: any) => `${event}:${platform}` === Event).length >= 3) {
        return res.status(200).json({
          success: false,
          message: `Reached maximum registrations for this platform (${platform}) from your school`,
        });
      }
    } else if (tmpEvents.filter((Event: any) => event === Event).length >= 3) {
      return res.status(200).json({
        success: false,
        message: `Reached maximum registrations for this event from your school`,
      });
    }

    if (team) {
      let teamNames: Array<any> = [];
      if (!teamNames.includes(team.teamName) || !teamName.includes(team.teamName)) {
        teamNames.push(team.teamName);
        teamName.push(team.teamName);
      } else {
        return res.status(200).json({
          success: false,
          message: `Team name already registered`,
        });
      }
      team.participants.forEach((participant: any, index: any) => {
        let formPhones: Array<any> = [];
        let formNames: Array<any> = [];

        team.participants.forEach((participant: any, innerIndex: any) => {
          if (index !== innerIndex) {
            if (participant.phone !== "") {
              formPhones.push(participant.phone);
            }
            if (participant.name !== "") {
              formNames.push(participant.name);
            }
          }
        });

        if (phones.includes(participant.phone)) {
          success = false;
          message = `Phone number already in use (Participant ${index + 1} : ${participant.phone})`;
        } else if (formPhones.includes(participant.phone)) {
          success = false;
          message = `Phone numbers cannot be same as other members (Participant ${index + 1} : ${participant.phone})`;
        }
      });
    } else {
      participants.forEach((participant: any, index: any) => {
        let formPhones: any = [];
        let formNames: any = [];

        participants.forEach((participant: any, innerIndex: any) => {
          if (index !== innerIndex) {
            formPhones.push(participant.phone);
            formNames.push(participant.name);
          }
        });

        if (phones.includes(participant.phone)) {
          success = false;
          message = `Phone number already in use (Participant ${index + 1} : ${participant.phone})`;
        } else if (formPhones.includes(participant.phone)) {
          success = false;
          message = `Phone numbers cannot be same as participants (Participant ${index + 1} : ${participant.phone})`;
        }
      });
    }
  }

  const data: any = {
    event,
    schoolId,
  };

  if (team) {
    data["team"] = team;
  }

  if (participants) {
    data["participants"] = participants;
  }

  if (platform) {
    data["platform"] = platform;
    data["game"] = game;
  }

  delete data.userToken;

  if (success) {
    addDoc(registrationsCollection, {
      ...data,
    });
  }

  res.status(200).json({
    success,
    message,
  });
}
