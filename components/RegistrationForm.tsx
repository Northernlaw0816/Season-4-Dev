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

const Participants = ({
  maxTeams,
  maxParticipants,
  errors,
  register,
  teamIndex,
}: any) => {
  const participants: any = [];
  for (let i = 0; i < maxParticipants; i++) {
    participants.push(
      <div key={i} className={styles.member_input}>
        {/* NAME */}
        <label
          htmlFor={`${
            maxParticipants > 1
              ? `teams.${teamIndex}.participant.${i}.name`
              : `participants.${teamIndex}.name`
          }`}>
          Participant {maxParticipants === 1 ? teamIndex + 1 : i + 1}:{" "}
        </label>
        <input
          {...register(
            `${
              maxParticipants > 1
                ? `teams.${teamIndex}.participant.${i}.name`
                : `participants.${teamIndex}.name`
            }`,
            { required: true }
          )}
        />
        {/* GRADE */}
        <label
          htmlFor={`${
            maxParticipants > 1
              ? `teams.${teamIndex}.participant.${i}.grade`
              : `participants.${teamIndex}.grade`
          }`}>
          Grade:{" "}
        </label>
        <input
          {...register(
            `${
              maxParticipants > 1
                ? `teams.${teamIndex}.participant.${i}.grade`
                : `participants.${teamIndex}.grade`
            }`,
            {
              pattern: {
                value: /^(9|10|11|12)/i,
                message: "Please enter a valid grade",
              },
            }
          )}
        />
        {/* PHONE */}
        <label
          htmlFor={`${
            maxParticipants > 1
              ? `teams.${teamIndex}.participant.${i}.phone`
              : `participants.${teamIndex}.phone`
          }`}>
          Phone:{" "}
        </label>
        <input
          {...register(
            `${
              maxParticipants > 1
                ? `teams.${teamIndex}.participant.${i}.phone`
                : `participants.${teamIndex}.phone`
            }`,
            {
              pattern: {
                value: /\d{10}/i,
                message: "Please enter a valid phone number",
              },
            }
          )}
        />
      </div>
    );
  }
  return participants;
};

const Teams = ({
  maxTeams,
  maxParticipants,
  errors,
  register,
  platEvent,
}: any) => {
  const teams: any = [];

  for (let i = 0; i < maxTeams; i++) {
    let h3 = `Team ${i + 1}`;

    if (platEvent) {
      if (platEvent === "pc") {
        if (i === 0) h3 = "Valorant";
        if (i === 1) h3 = "CS:GO";
      }
      if (platEvent === "mobile") {
        if (i === 0) h3 = "BattleGround Mobile India";
        if (i === 2) h3 = "Call Of Duty";
      }
      if (platEvent === "console") {
        if (i === 0) h3 = "Fortnite";
        if (i === 1) h3 = "Rocket League";
      }
    }

    let teamIndex = 

    teams.push(
      <div key={i}>
        {maxParticipants > 1 && (
          <>
            <hr/>
            {platEvent === "mobile" && i % 2 === 0 && <h3>{h3}</h3>}
            <h3>{platEvent === "mobile" ? `Team ${(i % 2) + 1}` : h3}</h3>

            <div className={styles.team_input}>
              <label htmlFor={`teams.${(platEvent === "mobile" ? i % 2 : i)}.teamName`}>Team Name: </label>
              <input
                {...register(
                  `teams.${(platEvent === "mobile" ? i % 2 : i)}.teamName`,
                  {
                    required: true,
                    maxLength: {
                      value: 32,
                      message: "Max characters in team name is 32",
                    },
                    minLength: {
                      value: 4,
                      message: "Min characters in team name is 4",
                    },
                  }
                )}
              />
            </div>
          </>
        )}
        <Participants
          teamIndex={i}
          register={register}
          maxTeams={maxTeams}
          maxParticipants={maxParticipants}
        />
      </div>
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
  const onSubmit = async (data: any) => {
    console.log(data);

    const response = await fetch(
      `http://192.168.3.91:4000/validate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
    )
  };
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
  const resetFields = () => {
    reset();
    unregister("platform");
    router.reload();
  };
  const onEventPlatformChange = () => {
    const platVal = getValues("platform");
    unregister("teams")
    unregister("participants")
    setPlatEvent(platVal);
    switch (platVal) {
      case "pc":
        setFormBody(
          <Teams
            register={register}
            maxTeams={2}
            maxParticipants={5}
            errors={errors}
            platEvent={"pc"}
          />
        );
        break;
      case "mobile":
        setFormBody(
          <Teams
            register={register}
            maxTeams={4}
            maxParticipants={4}
            errors={errors}
            platEvent={"mobile"}
          />
        );
        break;
      case "console":
        setFormBody(
          <Teams
            register={register}
            maxTeams={2}
            maxParticipants={2}
            errors={errors}
            platEvent={"console"}
          />
        );
        break;
      case "default-platform":
        setFormBody(<></>);
        break;
      default:
        setFormBody(<></>);
    }
  };
  const onEventChange = () => {
    const eventVal = getValues("event");
    unregister("teams")
    unregister("participants")
    console.log(eventVal)
    
    switch (eventVal) {
      case "arena-of-valor":
        setShowPlatform(true);
        setFormBody(<></>);
        console.log("aov")
        break;

      case "knockout":
        setShowPlatform(false);
        setFormBody(
          <Teams register={register} maxTeams={1} maxParticipants={1} />
        );
        unregister("platform");
        break;

      case "truth-or-debug":
        setShowPlatform(false);
        setFormBody(
          <Teams register={register} maxTeams={2} maxParticipants={3} />
        );
        unregister("platform");
        break;

      case "log-and-blog":
        setShowPlatform(false);
        setFormBody(
          <Teams register={register} maxTeams={2} maxParticipants={1} />
        );
        unregister("platform");
        break;

      case "designscape":
        setShowPlatform(false);
        setFormBody(
          <Teams register={register} maxTeams={2} maxParticipants={1} />
        );
        unregister("platform");
        break;

      case "otakuiz":
        setShowPlatform(false);
        setFormBody(
          <Teams register={register} maxTeams={1} maxParticipants={3} />
        );
        unregister("platform");
        break;

      case "bass-drop":
        setShowPlatform(false);
        setFormBody(
          <Teams register={register} maxTeams={2} maxParticipants={1} />
        );
        unregister("platform");
        break;

      case "pandoras-blocks":
        setShowPlatform(false);
        setFormBody(
          <Teams register={register} maxTeams={1} maxParticipants={3} />
        );
        unregister("platform");
        break;

      case "default-value":
        setShowPlatform(false);
        unregister("platform");
        setFormBody(<></>);
        break;

      default:
        setShowPlatform(false);
        unregister("platform");
        setFormBody(<></>);
        break;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.registration_form}`}>
        <div>
          <h1 className={styles.form_title}>Form Registration</h1>
          <div className={styles.form_fields}>
            <div className={styles.event_field}>
              <select
                {...register("event", {
                  required: true,
                  onChange: onEventChange,
                  validate: (e: any) => e !== "default-event",
                })}>
                <option value="default-event">Select an Event</option>
                {EventsList.map((event, index) => {
                  return (
                    <option value={toSlug(event.title)} key={index}>
                      {event.title}
                    </option>
                  );
                })}
              </select>
            </div>
            {(
              <select
                {...register("platform", {
                  required: true,
                  onChange: onEventPlatformChange,
                  validate: (val) => val !== "default-platform",
                })}>
                <option value="default-platform">Select a Platform</option>
                <option value="pc">PC</option>
                <option value="mobile">Mobile</option>
                <option value="console">Console</option>
              </select>
            )}
            </div>
            <div className={styles.team_fields}>
              {formBody}
            </div>
            <div className={styles.submit}>
              <input type={'submit'} value="Register"/>
            </div>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
