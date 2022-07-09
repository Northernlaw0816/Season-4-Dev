import type { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { firestore } from "../../firebase/clientApp";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  const { event, participants, teams, platform, userToken } = req.body;

  participants && req.body.participants.forEach((participant: any, index: any) => {
    if (participant.name === "") {
      delete participants[index];
    }
  });

  teams && req.body.teams.forEach((team: any, index: any) => {
    team.participants.forEach((participant: any) => {
      if (participant === "") delete teams[index];
      console.log(participant);
    });
  });

  let success = true;
  let message = "Successfully registered";
  
  if (!req.body) {
    return res.status(400).json({
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
  const registrationsSnapshot = await getDocs(query(registrationsCollection, where("schoolId", "==", schoolId)));
  const registrations: any = [];
  registrationsSnapshot.forEach((doc) => {
    registrations.push(doc);
  });

  if (registrations.length > 0) {
    const phones: any = [];
    const tmpEvents: any = [];
    registrations.forEach((registration: any) => {
      const teamsRef = registration.get("teams");
      if (!tmpEvents.includes(registration.get("event"))) {
        tmpEvents.push(registration.get("event"));
      } else {
        success = false;
        message = "Event already registered";
        return res.status(400).json({
          success,
          message,
        });
      }

      if (teamsRef !== undefined) {
        teamsRef.forEach((teamRef: any) => {
          const membersRef = teamRef["participants"];
          membersRef.forEach((memberRef: any) => {
            phones.push(memberRef["phone"]);
          });
        });
      } else {
        const participants = registration.get("participants");
        participants.forEach((participant: any) => {
          phones.push(participant["phone"]);
        });
      }
    });

    if (teams) {
      teams.forEach((team: any) => {
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

          if (formNames.includes(participant.name)) {
            success = false;
            message = `Name cannot be same as other members (Participant ${index + 1} : ${participant.name})`;
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

        if (formNames.includes(participant.name)) {
          success = false;
          message = `Name cannot be same as other participants (Participant ${index + 1} : ${participant.name})`;
        }
      });
    }
  }

  const data:any = {
    event,
    schoolId
  }

  if (teams) {
    data["teams"] = participants;
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
      ...data
    });
  }

  res.status(200).json({
    success,
    message
  });
}
