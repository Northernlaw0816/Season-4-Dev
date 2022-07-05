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
  let [selectedEvent, setselectedEvent] = useState<string>("");
  let [selectedPlatform, setSelectedPlatform] = useState<string>("");
  let [formBody, setFormBody] = useState<any>();
  let [platformInput, setPlatformInput] = useState();
  setInterval(() => {
    errors;
  }, 1000);
  // Handlers
  const onSubmit = () => {};

  const handlePlatform = () => {
    setSelectedPlatform(getValues("platformSelect"));
  };

  const handleEventValue = () => {
    const event = getValues("eventSelect");
    setselectedEvent(event);
    switch (event) {
      case "default-event":
        reset();
        resetField("platformSelect");
        break;
      default:
        reset();
        resetField("platformSelect");
        break;
      case "arena-of-valor":
        setFormBody(
          <>
            <select
              {...register("platformSelect", {
                required: true,
                onChange: handlePlatform,
                shouldUnregister: true,
                validate: (value) => value !== "default-value",
              })}
            >
              <option value="default-value">Select a platform</option>
              <option value="pc">PC</option>
              <option value="mobile">Mobile</option>
              <option value="console">Console</option>
            </select>
            {selectedPlatform !== "default-value" && (
              <>
                <input
                  {...register("platform-teamName", {
                    required: true,
                    maxLength: { value: 40, message: "Max 40 Characters" },
                    minLength: { value: 5, message: "Min 5 Characters" },
                  })}
                  placeholder={"Team Name"}
                />
              </>
            )}
          </>,
        );
        break;
      case "knockout":
        break;
      case "truth-or-debug":
        break;
      case "log-and-blog":
        break;
      case "designscape":
        break;
      case "otakuiz":
        break;
      case "bass-drop":
        break;
      case "pandoras-blocks":
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
          {selectedEvent !== "default-event" && selectedEvent === "arena-of-valor" && formBody}
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
