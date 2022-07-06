import { useState, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import anime from "animejs";
import { getRegistrationsCollection, registerTeam, validateFields } from "../functions";
import { FormFields } from "../functions/interface";
import { toSlug } from "../functions";

//components
import ParticipantFields from "./ParticipantFields";
//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss";
import Effects from "../styles/Effects.module.scss";
//data
import EventsList from "../data/EventsList";
import { DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useRouter } from "next/router";
const Participants = ({ maxTeams, maxParticipants, errors, register, teamIndex }: any) => {
  const participants: any = [];
  for (let i = 0; i < maxParticipants; i++) {
    participants.push(
      <>
        <h4>Participant {i + 1}</h4>
        <label htmlFor={`${teamIndex > 0 ? `team${teamIndex}.` : ""}participant${i}.name`}>Name: </label>
        <input {...register(`${teamIndex > 0 ? `team${teamIndex}.` : ""}participant${i}.name`)} />
        <label htmlFor={`${teamIndex > 0 ? `team${teamIndex}.` : ""}participant${i}.grade`}>Grade: </label>
        <input {...register(`${teamIndex > 0 ? `team${teamIndex}.` : ""}participant${i}.grade`)} />
        <label htmlFor={`${teamIndex > 0 ? `team${teamIndex}.` : ""}participant${i}.phone`}>Phone: </label>
        <input {...register(`${teamIndex > 0 ? `team${teamIndex}.` : ""}participant${i}.phone`)} />
      </>,
    );
  }
  return participants;
};
const Teams = ({ maxTeams, maxParticipants, errors, register }: any) => {
  const teams: any = [];
  for (let i = 0; i < maxTeams; i++) {
    teams.push(
      <>
        {maxParticipants > 1 ? (
          <>
            <h3>Team {i + 1}</h3>
            <input
              {...register(`team${i + 1}.teamName`, {
                required: true,
                maxLength: { value: 32, message: "Max characters in team name is 32" },
                minLength: { value: 4, message: "Min characters in team name is 4" },
              })}
            />
            <br />
            <Participants teamIndex={0} register={register} maxTeams={maxTeams} maxParticipants={maxParticipants} />
          </>
        ) : (
          <>
            <Participants teamIndex={0} register={register} maxTeams={maxTeams} maxParticipants={maxParticipants} />
          </>
        )}
      </>,
    );
  }
  return teams;
};
const RegistrationForm = ({ event }: any) => {
  // ? REACT HOOKS
  let [showPlatform, setShowPlatform] = useState<boolean>(false);
  let [platEvent, setPlatEvent] = useState<string>("");
  let [formBody, setFormBody] = useState<any>(<></>);
  const router = useRouter();
  // Handlers
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
  const onEventPlatformChange = () => {
    const platVal = getValues("aov-platform");
    setPlatEvent(platVal);
    switch (platVal) {
      case "pc":
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={5} />);
        break;
      case "mobile":
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={4} />);
        break;
      case "console":
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={2} />);
        break;
      case "default-platform":
        setFormBody(<></>);
        break;
      default:
        setFormBody(<></>);
    }
  };
  const onEventChange = () => {
    const eventVal = getValues("events");
    switch (eventVal) {
      case "arena-of-valor":
        setShowPlatform(true);
        setFormBody(<></>);
        break;

      case "knockout":
        setShowPlatform(false);
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={1} />);
        unregister("platform");
        break;

      case "truth-or-debug":
        setShowPlatform(false);
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={3} />);
        unregister("platform");
        break;

      case "log-and-blog":
        setShowPlatform(false);
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={1} />);
        unregister("platform");
        break;

      case "designscape":
        setShowPlatform(false);
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={1} />);
        unregister("platform");
        break;

      case "otakuiz":
        setShowPlatform(false);
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={3} />);
        unregister("platform");
        break;

      case "bass-drop":
        setShowPlatform(false);
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={1} />);
        unregister("platform");
        break;

      case "pandoras-blocks":
        setShowPlatform(false);
        setFormBody(<Teams register={register} maxTeams={2} maxParticipants={3} />);
        unregister("platform");
        break;

      case "default-value":
        setShowPlatform(false);
        unregister("platform");
        unregister("teamName");
        setFormBody(<></>);
        break;

      default:
        setShowPlatform(false);
        unregister("platform");
        unregister("teamName");
        setFormBody(<></>);
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
          {!showPlatform && formBody}
          {showPlatform && (
            <>
              <select {...register("aov-platform", { required: true, onChange: onEventPlatformChange, validate: (val) => val !== "default-platform" })}>
                <option value="default-platform">Select a Platform</option>
                <option value="pc">PC</option>
                <option value="mobile">Mobile</option>
                <option value="console">Console</option>
              </select>
              {formBody}
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
