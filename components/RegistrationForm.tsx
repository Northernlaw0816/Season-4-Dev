import { useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import anime from "animejs";
import axios from "axios";
import { toSlug } from "../functions";
import { useRouter } from "next/router";

//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss";
//data
import EventsList from "../data/EventsList";

const Participants = ({ maxParticipants, required }: any) => {
  const { register, formState: { errors }, getFieldState } = useFormContext();
  const participants: any = [];

  for (let i = 0; i < maxParticipants; i++) {
    let nameFieldName = `${maxParticipants > 1 ? `team.participants.${i}.name` : `participants.${i}.name`}`
    let gradeFieldName = `${maxParticipants > 1 ? `team.participants.${i}.grade` : `participants.${i}.grade`}`
    let phoneFieldName = `${maxParticipants > 1 ? `team.participants.${i}.phone` : `participants.${i}.phone`}`
    let emailFieldName = `${maxParticipants > 1 ? `team.participants.${i}.phone` : `participants.${i}.emai`}`

    participants.push(
      <div key={i} className={styles.member_input}>
        {/* NAME */}
        <label htmlFor={nameFieldName}>
          Participant {`${i + 1}: `}
        </label>
        <input
          className={getFieldState(nameFieldName).error && `${styles.error}`}
          required={required}
          {...register(nameFieldName, {
            pattern: {
              value: /^[a-zA-Z.\s]+$/,
              message: "Only letters and spaces are allowed"
            }
          })}
        />
        {/* GRADE */}
        <label htmlFor={gradeFieldName}>Grade: </label>

        <select
          className={getFieldState(gradeFieldName).error && `${styles.error}`}
          required={required}
          {...register(gradeFieldName, {
            validate: (value: string) => {
              if (value === "default-value" && required) {
                return "Please select a grade";
              }
              return undefined;
            }
          })}
        >
          <option value="default-value">Select Grade</option>  
          <option value="9">9</option> 
          <option value="10">10</option> 
          <option value="11">11</option> 
          <option value="12">12</option> 
        </select>

        {/* PHONE */}
        <label htmlFor={phoneFieldName}>Phone: </label>
        <input
          className={getFieldState(phoneFieldName).error && `${styles.error}`}
          required={required}
          {...register(phoneFieldName, {
            pattern: {
              value: /^\d{10}$/i,
              message: "Please enter a valid phone number",
            },
          })}
        />

        <div className={styles.member_errors}>
          <ErrorMessage errors={errors} name={nameFieldName} render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p className={styles.member_error} key={type}>{message}</p>
            ))
          }/>
          <ErrorMessage errors={errors} name={gradeFieldName} render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              message !== true && <p className={styles.member_error} key={type}>{message}</p>
            ))
          }/>
          <ErrorMessage errors={errors} name={phoneFieldName} render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p className={styles.member_error} key={type}>{message}</p>
            ))
          }/>
        </div>
      </div>,
    );
  }
  return participants;
};

const Team = ({ maxParticipants }: any) => {  
  const { register, formState: { errors }, getFieldState} = useFormContext();

  let fieldName = `team.teamName` 

  return (
    <div>
      <hr />
      {maxParticipants > 1 && (
        <>
          <div className={styles.team_input}>
            <label htmlFor={fieldName}>Team Name: </label>
            <input
              className={getFieldState(fieldName).error && `${styles.error}`}
              required={true}
              placeholder="Min 4 characters, Maximum 32 Characters"
              {...register(fieldName, {
                maxLength: {
                  value: 32,
                  message: "Max characters in team name is 32",
                },
                minLength: {
                  value: 4,
                  message: "Min characters in team name is 4",
                }
              })}
            />
            <ErrorMessage errors={errors} name={fieldName} render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className={styles.error} key={type}>{message}</p>
              ))
            }/>
          </div>
        </>
      )}
      <Participants
        maxParticipants={maxParticipants}
        required={true}
      />
    </div>
  );
};

const RegistrationForm = () => {
  let [showAovFields, setShowAovFields] = useState<boolean>(false);
  let [formBody, setFormBody] = useState<any>(<></>);
  let [isRegistering, setIsRegistering] = useState<boolean>(false);
  let [isError, setIsError] = useState(false);
  let [isSuccess, setIsSuccess] = useState(false);
  let [message, setMessage] = useState("");
  let [schools, setSchools] = useState<any>([]);
  const router = useRouter();

  // Handlers
  const onSubmit = async (data: any) => {
    setIsRegistering(true);
    const response = await axios.post("/api/register", {
      ...data,
      userToken:localStorage.getItem("userToken")
    }).then((response:any) => response.data).catch((err:any) => {
      setIsError(true)
      setMessage("An Unknown Error Occurred. Please Try Again Later.")
      if (err.response.data.message) setMessage(err.response.data.message)
    })

    if (response) {
      setIsError(!response.success)
      setIsSuccess(response.success)
      setMessage(response.message)
    }
  }

  useEffect(() => {
  	let timeline = anime.timeline({
  		easing: "linear",
  		direction: "forwards",
  		delay: anime.stagger(100),
  		duration: 1000,
  		loop: true
  	})

  	timeline.add({
  		targets: ".throbber_section",
  		keyframes: [
  			{scale: 0},
  			{scale: 1},
  			{scale: 0}
  		],
  	})

    if(isSuccess || isError) {
      timeline.restart()
      timeline.pause()
    }
  })

  const getSchools = async () => {
    const response = await axios.get("/api/schools").then((response:any) => response.data).catch((err:any) => {
      console.log(err)
    })

    const schools: any[] = []
    response.message.forEach((school:any) => {schools.push(school)})
    setSchools(schools)
    return schools
  }

  useEffect(() => {
    getSchools()
  }, [])

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldUnregister: true
  });

  const resetFields = () => {
    methods.reset();
    methods.unregister("platform");
    router.reload();
  };

  const goBack = () => {
    setIsSuccess(false);
    setIsError(false);
    setMessage("");
    setIsRegistering(false);
  };

  const onEventPlatformChange = () => {
    const platVal = methods.getValues("platform");
    methods.unregister("team");
    methods.unregister("participants");
    
    switch (platVal) {
      case "pc":
        setFormBody(<Team maxParticipants={5}/>);
        break;

      case "mobile":
        setFormBody(<Team maxParticipants={4}/>);
        break;

      case "console":
        setFormBody(<Team maxParticipants={2}/>);
        break;

      case "default-platform":
        setFormBody(<></>);
        break;

      default:
        setFormBody(<></>);
    }
  };

  const onEventChange = () => {
    const eventVal = methods.getValues("event");
    methods.unregister("team");
    methods.unregister("participants");
    methods.unregister("platform");
    methods.unregister("game");

    switch (eventVal) {
      case "arena-of-valor":
        setShowAovFields(true);
        setFormBody(<></>);
        break;

      case "knockout":
        setFormBody(<Team maxParticipants={1}/>);
        setShowAovFields(false);
        break;

      case "truth-or-debug":
        setFormBody(<Team maxParticipants={3}/>);
        setShowAovFields(false);
        break;

      case "log-and-blog":
        setFormBody(<Team maxParticipants={1}/>);
        setShowAovFields(false);
        break;

      case "designscape":
        setFormBody(<Team maxParticipants={1}/>);
        setShowAovFields(false);
        break;

      case "otakuiz":
        setFormBody(<Team maxParticipants={3}/>);
        setShowAovFields(false);
        break;

      case "bass-drop":
        setFormBody(<Team maxParticipants={1}/>);
        setShowAovFields(false);
        break;

      case "pandoras-blocks":
        setFormBody(<Team maxParticipants={3}/>);
        setShowAovFields(false);
        break;

      case "default-value":
        setShowAovFields(false);
        setFormBody(<></>);
        break;

      default:
        setShowAovFields(false);
        setFormBody(<></>);
        break;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={`${styles.registration_form}`} id="registration-form">
        {isRegistering && (
          <div className={styles.disable_form_window}>
            {!isError && !isSuccess && (
              <>
                <h2>Registering...</h2>
                <div className={styles.throbber}>
                  <div className={`throbber_section ${styles.throbber_setion}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                </div>
              </>
            )}

            {isError ? (
              <>
                <h2>{message}</h2>
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                  <div id="reset_btn" className={styles.reset_form_btn} onClick={() => resetFields()}>
                    Reset Form
                  </div>
                  <div id="go_bck_btn" className={styles.reset_form_btn} onClick={() => goBack()}>
                    Go Back
                  </div>
                </div>
              </>
            ) : isSuccess && (
              <>
                <h2>{message}</h2>
                <div id="ok_btn" className={styles.reset_form_btn} onClick={() => resetFields()}>
                  Ok
                </div>
              </>
            )}
          </div>
        )}
        <div>
          <h1 className={styles.form_title}>Form Registration</h1>
          <div className={styles.form_fields}>
            <div className={styles.school_field}>
              <label htmlFor="schoolId" hidden>School Name: </label>
              <select {...methods.register("schoolId", {
                required: true,
                validate: (val) => {
                  if(val === "default-school") {
                    return "Please select your school"
                  }
                  return undefined
                }
              })}>
                <option value="default-school">Select Your School</option>
                {schools.map((school:any, index:number) => {
                  return <option key={index} value={school.schoolId}>{school.schoolName}</option>
                })}
              </select>
            </div>
            <div className={styles.event_field}>
              <label htmlFor="event" hidden>Event: </label>
              <select
                {...methods.register("event", {
                  onChange: onEventChange,
                  validate: (val) => {
                    if(val === "default-event") {
                      return "Please select an event"
                    }
                    return undefined
                  }
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
            </div>
            {showAovFields && (<>
              <div className={styles.platform_field}>
                <label htmlFor="event" hidden>Device Platform: </label>
                <select
                  {...methods.register("platform", {
                    required: true,
                    onChange: onEventPlatformChange,
                    validate: (val) => {
                      if(val === "default-platform") {
                        return "Please select a platform"
                      }
                      return undefined
                    }
                  })}
                >
                  <option value="default-platform">Select a Platform</option>
                  <option value="pc">PC</option>
                  <option value="mobile">Mobile</option>
                  <option value="console">Console</option>
                </select>
              </div>
              <div className={styles.game_field}>
                <label htmlFor="event" hidden>Preferred Game: </label>
                <select
                  {...methods.register("game", {
                    required: true,
                    onChange: onEventPlatformChange,
                    validate: (val) => {
                      if(val === "default-game") {
                        return "Please select your preferred game"
                      }
                      return undefined
                    }
                  })}
                >
                  <option value="default-game">Select a Game</option>
                  {methods.getValues("platform") === "pc" && (<>
                    <option value="pc">Valorant</option>
                    <option value="mobile">CS:GO</option>
                  </>)}
                  {methods.getValues("platform") === "mobile" && (<>
                    <option value="pc">BattleGrounds Mobile India</option>
                    <option value="mobile">Call of Duty: Mobile</option>
                  </>)}
                  {methods.getValues("platform") === "console" && (<>
                    <option value="pc">Fortnite</option>
                    <option value="mobile">Rocket League</option>
                  </>)}
                </select>
              </div>
            </>)}
          </div>
          <div className={styles.main_errors}>
            {["schoolId", "event", "platform", "game"].map((field, index) => {
              return (
                <ErrorMessage key={index} errors={methods.formState.errors} name={field} render={({ messages }) =>
                  messages && Object.entries(messages).map(([type, message]) => {
                    return <p className={styles.main_error} key={type}>{message}</p>
                  })
                }/>
              )
            })}
          </div>
          <div className={styles.team_fields}>{formBody}</div>
          <div className={styles.submit}>
            <input name="register" type={"submit"} value="Register" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
