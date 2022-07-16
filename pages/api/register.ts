import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "../../firebase/clientApp";
import { titleCase } from "../../functions";

export default async function register(req: NextApiRequest, res: NextApiResponse) {

  let body = req.body

  if (req.body.participants) {

    for(let participant of req.body.participants) {
      if (participant.name !== "" && (participant.grade === "default-value" || participant.phone === "")) {
        return res.status(400).json({
          success: false,
          message: `Please fill out all fields for ${participant.name}`
        })
      }
    }

    let participants = req.body.participants.filter((participant: any) => {
      return participant.name !== ""
    });

    body.participants = participants;

  }

  if (req.body.teams) {
    let teams = req.body.teams.filter((team: any) => {
      return team.teamName !== ""
    })
    
    body.teams = teams;
  }

  const { event, participants, teams, platform, userToken } = body;

  let success = true;
  let message = "";
  if (teams) {
    message = `Successfully registered ${teams.length} team(s) for ${titleCase(event.replace(/-/g, " "))} ${platform && platform !== "default-value" ? `- ${platform}` : ""}`;
  } else if (participants){
    message = `Successfully registered ${participants.length} participant(s) for ${titleCase(event.replace(/-/g, " "))}`;
  }

  if (!req.body) {
    return res.status(200).json({
      success: false,
      message: "No body",
    });
  }

  // Database code here
  const accountsCollection = collection(firestore, "school_login_accounts");
  const userTokenQuery = query(accountsCollection, where("userToken", "==", userToken));
  const userDocumentSnapShot = await getDocs(userTokenQuery);
  const schoolIds: any = [];

  userDocumentSnapShot.forEach((doc) => {
    schoolIds.push(doc.get("schoolId"));
  });

  const schoolId = schoolIds[0];

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
      if (registrations.get("teams")) {
        registrations.get("teams").forEach((team: any) => {
          team.participants.forEach((participant: any) => {
            phones.push(participant.phone);
          });
        });
      }
      if (registrations.get("participants")) {
        registrations.get("participants").forEach((participant: any) => {
          phones.push(participant.phone);
        });
      }
    });

    if (teams) {
      teams.forEach((team: any, index: number) => {
        team.participants.forEach((participant: any, index: number) => {
          if (phones.includes(participant.phone)) {
            return res.status(200).json({ success: false, message: `Phone number already in use (Participant: ${index + 1})` });
          }
        });
      });
    }
    if (participants) {
      participants.forEach((participant: any, index: number) => {
        if (participant.phone === "") delete participants[index];
        if (phones.includes(participant.phone)) {
          return res.status(200).json({ success: false, message: `Phone number already in use (Participant: ${index + 1})` });
        }
      });
    }
  }

  if (schoolRegistrations.length > 0) {
    const tmpEvents: any = [];
    const teamName: any = [];

    schoolRegistrations.forEach((registration: any) => {
      if (registration.get("event") === "arena-of-valor") {
        tmpEvents.push(`${registration.get("event")}:${registration.get("platform")}`);
      } else tmpEvents.push(registration.get("event"));
    });

    if (event === "arena-of-valor") {
      if (tmpEvents.includes(`${event}:${platform}`)) {
        return res.status(200).json({
          success: false,
          message: `Already registered under this platform (${platform})`,
        });
      }
    } else if (tmpEvents.includes(event)) {
      return res.status(200).json({
        success: false,
        message: `Event already registered`,
      });
    }

    if (teams) {
      teams.forEach((team: any) => {
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

          teams.forEach((team: any) => {
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
          });

          if (phones.includes(participant.phone)) {
            success = false;
            message = `Phone number already in use (Participant ${index + 1} : ${participant.phone})`;
          } else if (formPhones.includes(participant.phone)) {
            success = false;
            message = `Phone numbers cannot be same as other members (Participant ${index + 1} : ${participant.phone})`;
          }
        });
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

  if (teams) {
    data["teams"] = teams;
  }

  if (participants) {
    data["participants"] = participants;
  }

  if (platform) {
    data["platform"] = platform;
  }

  delete data.userToken;

  if (success) {
    addDoc(registrationsCollection, {
      ...data,
    });
  }

  console.log(data);

  return res.status(200).json({
    success,
    message,
  });
}
