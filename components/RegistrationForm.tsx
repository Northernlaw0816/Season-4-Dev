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
// import ParticipantFields from "./ParticipantFields";
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

const TeamFields = ({ eventName, register }: any) => {
  let [teamName, setTeamName] = useState<string>("");
  const event = EventsList.find((e) => toSlug(e.title) === eventName);

  const memberFields = [];
  if (event) {
    for (let i = 0; i < event.maxMembers.default; i++) {
      memberFields.push(
        <input {...register(`participants.${i + 1}`, { required: true })} key={i} />
      );
    }
  }
  return (
    <div>
      <input {...register("teamName", {required:true})}/>
      {memberFields}
    </div>
  );
};

const RegistrationForm = ({ event }: any) => {
  let tempt = 0;
  let [eventName, setEventName] = useState<string>("default");
  let [participantsLimit, setParticipantsLimit] = useState<number>(0);
  let [maxTeams, setMaxTeams] = useState<number>(0);
  let [showPlatform, setShowPlatform] = useState<boolean>(false);
  let [showTeamName, setShowTeamName] = useState<boolean>(false);
  let [showGame, setShowGame] = useState<boolean>(false);
  let [isRegistering, setIsRegistering] = useState<boolean>(false);
  let [isError, setIsError] = useState<{ state: boolean; message: string }>();
  let [isSuccess, setIsSuccess] = useState<{
    state: boolean;
    message: string;
  }>();
  let [defaultEvent, setDefaultEvent] = useState<string>(event);
  let [registrations, setRegistrations] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  let [teams, setTeams] = useState<any[]>([]);

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<FormFields>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      event: defaultEvent,
      platform: "default-value",
      game: "default-value",
      participants: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const EventNameChange = () => {
    switch (getValues("event")) {
      case "arena-of-valor":
        setShowTeamName(true);
        setShowPlatform(true);
        break;
      default:
        setShowTeamName(false);
        setShowPlatform(false);
        break;
    }
  };

  let selectedEvent = EventsList.find((event) => event.title === eventName);

  const addTeam = () => {
    const teamDefault = [
      ...teams,
      {
        teamName: "string",
        members: [{ name: "string", grade: "string" }],
      },
    ];

    const indivdualDefault = [
      ...teams,
      {
        name: "string",
        grade: "string",
      },
    ];

    event?.isTeam ? setTeams(teamDefault) : setTeams(indivdualDefault);
  };

  useLayoutEffect(() => {
    EventNameChange();
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.registrationForm}`}>
      <div>
        <h1>Registration</h1>
      </div>

      <div className={`${styles.form_body}`}>
        <h2>Events</h2>
        <select
          {...register("event", {
            onChange: EventNameChange,
            validate: (value) => value !== "default-value",
            required: true,
          })}>
          <option value="default-value">Select an Event</option>

          {EventsList.map((event: any, index: number) => {
            return (
              <option key={index} value={toSlug(event.title)}>
                {event.title}
              </option>
            );
          })}
        </select>
        <h2>Platform</h2>
        <select
          {...register("platform", {
            validate: (value) => value !== "default-value",
            required: true,
          })}>
          <option value="default-value">Select an platform</option>
          {showPlatform &&
            ["Console", "Mobile", "PC"].map((platform: any, index: number) => {
              return (
                <option key={index} value={toSlug(platform)}>
                  {platform}
                </option>
              );
            })}
        </select>
        <button type={"button"} onClick={addTeam}>
          Add Team
        </button>
        <div id="Teams">
          {showTeamName &&
            teams.map((value, index) => {
              const eve = EventsList.filter(
                (e) => toSlug(e.title) === getValues("event")
              )[0];
              return (
                <TeamFields eventName={eventName} register={register}/>
              );
            })}
        </div>
        <input type={"submit"} className={`${styles.submit}`} />
      </div>
    </form>
  );
};

export default RegistrationForm;
