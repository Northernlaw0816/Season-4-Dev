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
  const {
    getValues,
    getFieldState,
    handleSubmit,
    register,
    resetField,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const onSubmit = () => {};
  const handleEventValue = () =>{
    switch(getValues("eventSelect")){
      case "arena-of-valour":
        
        break;
        default:
        break;
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          {...register("eventSelect", {
            required: true,
            onChange: handleEventValue,
            validate: (value) => value !== "default-value",
          })}>
          <option value="default-event">Select an event</option>
          {EventsList.forEach((event: any, index: number) => {
            return (
              <option key={index} value={toSlug(event.title)}>
                {event.title}
              </option>
            );
          })}
        </select>
      </form>
    </>
  );
};

export default RegistrationForm;
