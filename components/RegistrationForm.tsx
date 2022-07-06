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
const Participants = ({ maxPa, register, errors }: any) => {
  const p: any[] = [];
  for (let i = 0; i < maxPa; i++) {
    p.push(
      <div>
        <h4>
          {maxPa === 1 ? "" : `Participant ${i+1}`}
        </h4>
        <input {...register("name", { required: { value: true, message: "Please enter your name" } })} placeholder="Enter your name" name="name" />
        <br />
        <input
          {...register("grade", {
            required: { value: true, message: "Please enter a valid grade" },
            pattern: { value: /(9|10|11|12)/i, message: "Please enter a valid grade" },
          })}
          placeholder="Enter your grade i.e. 11"
        />
        <label className="error">{errors?.grade?.message}</label>
        <br />
        <input
          {...register("phoneNO", { required: { value: true, message: "Please enter a valid phone number" } })}
          placeholder="Enter your phone number i.e. 9763821982"
        />
      </div>,
    );
  }

  return (
    <>
      {p.map((e) => {
        return e;
      })}
    </>
  );
};
const Teams = ({ maxPa, maxT, register, errors }: any) => {
  const teams: any[] = [];
  for (let i = 0; i < maxT; i++) {
    teams.push(
      <>
        <h3>
          {maxPa === 1 ? "Participant" : "Team"} {i + 1}
        </h3>
        <Participants register={register} maxPa={maxPa} maxT={maxT} errors={errors} />
      </>,
    );
  }
  return (
    <>
      {teams.map((e) => {
        return e;
      })}
    </>
  );
};

const RegistrationForm = ({ event }: any) => {
  // Form
  const {
    getValues,
    getFieldState,
    handleSubmit,
    register,
    resetField,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  // React Hooks
  const router = useRouter();
  let [selectedEvent, setselectedEvent] = useState<string>("");
  let [selectedPlatform, setSelectedPlatform] = useState<boolean>(false);
  let [formBody, setFormBody] = useState<any>();
  let [maxParticipants, setMaxParticipants] = useState<number>(2);
  let [defaultTeamNO, setDefaultTeamNO] = useState<number>(1);
  let [platformInput, setPlatformInput] = useState();
  let [totalTeam, setTotalTeam] = useState<number>(1);

  // Handlers
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handlePlatform = () => {
    setSelectedPlatform(true);
  };

  const handleEventValue = () => {
    const event = getValues("eventSelect");
    setselectedEvent(event);
    switch (event) {
      case "default-event":
        reset();
        resetField("platformSelect");
        setTotalTeam(1);
        router.reload();
        break;
      default:
        reset();
        resetField("platformSelect");
        setTotalTeam(1);
        router.reload();
        break;
      case "arena-of-valor":
        break;
      case "knockout":
        setMaxParticipants(1);
        setTotalTeam(1);
        break;
      case "truth-or-debug":
        setMaxParticipants(3);
        setTotalTeam(1);
        break;
      case "log-and-blog":
        setMaxParticipants(1);
        setTotalTeam(1);
        break;
      case "designscape":
        setMaxParticipants(1);
        setTotalTeam(1);
        break;
      case "otakuiz":
        setMaxParticipants(3);
        setTotalTeam(1);
        break;
      case "bass-drop":
        setMaxParticipants(1);
        setTotalTeam(1);
        break;
      case "pandoras-blocks":
        setMaxParticipants(3);
        setTotalTeam(1);
        break;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
        <div>
          <h1>Registration Form</h1>
          <select
            {...register("eventSelect", {
              required: true,
              onChange: handleEventValue,
              validate: (value) => value !== "default-event",
            })}
          >
            <option value="default-event">Select an event</option>
            {EventsList.map((event: any, index: number) => {
              return (
                <option key={index} value={toSlug(event.title)}>
                  {event.title}
                </option>
              );
            })}
          </select>
          <Teams register={register} maxPa={maxParticipants} maxT={totalTeam} errors={errors} />
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
