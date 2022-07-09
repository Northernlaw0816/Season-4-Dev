import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import "dotenv/config";
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteField, doc, getDocs, getFirestore, query, setDoc, updateDoc, where, orderBy } from "firebase/firestore";
import _ from "lodash";
const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});
const firestore = getFirestore(app);
export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  const { event, participants, teams, platform, userToken } = req.body;
  req.body.participants.forEach((participant: any, index: any) => {
    if (participant.name === "") {
      delete req.body.participants[index];
    }
  });
  req.body.teams.forEach((team: any, index: any) => {
    team.participants.forEach((participant: any) => {
      if (participant === "") delete req.body.teams[index];
      console.log(participant);
    });
  });

  const data = {
    event,
    participants,
    teams,
    platform,
  };
  let success = true;
  let message = "Successfully registered";
  if (!req.body)
    return res.status(400).json({
      success: false,
      message: "No body",
    });

  // Database code here
  const accountsCollection = collection(firestore, "school_login_accounts");
  const userTokenQuery = query(accountsCollection, where("userToken", "==", userToken));
  const userDocumentSnapShot = await getDocs(userTokenQuery);
  const userDocuments: any = [];

  userDocumentSnapShot.forEach((doc) => {
    userDocuments.push(doc);
  });
  const schoolId = userDocuments[0].get("schoolId");

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
  res.status(200).json({
    schoolId,
    success,
    message,
  });
  const Data: any = { ...data };
  const vals = Object.values(data);
  vals.forEach((val: any, i: number) => {
    if (val === undefined) delete Data[val];
  });
  if (success) {
    addDoc(registrationsCollection, {
      ...req.body,
      schoolId: schoolId,
    });
  }
}
