import { useState, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import anime from "animejs";
import {
  getRegistrationsCollection,
  registerTeam,
  validateFields,
} from "../functions";
import { FormFields } from "../functions/interface";
import { toSlug } from "../functions";

//components
import ParticipantFields from "./ParticipantFields";
//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss";
import Effects from "../styles/Effects.module.scss";
//data
import EventsList from "../data/EventsList";
import {
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";

const RegistrationForm = ({ event }: any) => {
  // ? REACT HOOKS
  let [showPlatform, setShowPlatform] = useState<boolean>(false);
  let [participantsLimit, setParticipantsLimit] = useState<number>(0);
  let [ShowTeamName, setShowTeamName] = useState<boolean>(false);
  const onSubmit = (data: any) => {};
  const {
    register,
    formState: { errors },
    reset,
    unregister,
    clearErrors,
    setError,
    getValues,
    handleSubmit,
  } = useForm({ mode: "onSubmit", shouldUnregister: true });
  const onEventChange = () => {
    const eventVal = getValues("events");
    console.log(eventVal);
    switch (eventVal) {
      case "arena-of-valor":
        setParticipantsLimit(0);
        setShowPlatform(true);
        setShowTeamName(true);
        break;

      case "knockout":
        setParticipantsLimit(1);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(false);
        break;

      case "truth-or-debug":
        setParticipantsLimit(2);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(true);
        break;

      case "log-and-blog":
        setParticipantsLimit(1);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(true);
        break;

      case "designscape":
        setParticipantsLimit(1);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(true);
        break;

      case "otakuiz":
        setParticipantsLimit(3);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(true);
        break;

      case "bass-drop":
        setParticipantsLimit(1);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(true);
        break;

      case "pandoras-blocks":
        setParticipantsLimit(3);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(true);
        break;

      case "default-value":
        setParticipantsLimit(0);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(false);
        unregister("teamName");
        break;

      default:
        setParticipantsLimit(0);
        setShowPlatform(false);
        unregister("platform");
        setShowTeamName(false);
        unregister("teamName");
        break;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
        <div>
          <h1>Form Registration</h1>
          <select
            {...register("events", {
              required: true,
              onChange: onEventChange,
              validate: (e: any) => e !== "default-event",
            })}
          >
            <option value="default-event">Select an Event</option>
            {EventsList.map((event, index) => {
              return (
                <option value={toSlug(event.title)} key={index}>
                  {event.title}
                </option>
              );
            })}
          </select>
          <br />
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
