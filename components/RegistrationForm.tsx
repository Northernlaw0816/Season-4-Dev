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

const Participants = ({ maxParticipants, teamIndex, required }: any) => {
  const { register, formState: { errors }, getFieldState } = useFormContext();
  const participants: any = [];

  for (let i = 0; i < maxParticipants; i++) {
    let nameFieldName = `${maxParticipants > 1 ? `teams.${teamIndex}.participants.${i}.name` : `participants.${teamIndex}.name`}`
    let gradeFieldName = `${maxParticipants > 1 ? `teams.${teamIndex}.participants.${i}.grade` : `participants.${teamIndex}.grade`}`
    let phoneFieldName = `${maxParticipants > 1 ? `teams.${teamIndex}.participants.${i}.phone` : `participants.${teamIndex}.phone`}`

    participants.push(
      <div key={i} className={styles.member_input}>
        {/* NAME */}
        <label htmlFor={nameFieldName}>
          Participant {maxParticipants === 1 ? teamIndex + 1 : i + 1}:{" "}
        </label>
        <input
          className={getFieldState(nameFieldName).error && `${styles.error}`}
          required={required}
          {...register(nameFieldName, {
            pattern: {
              value: /^[a-zA-Z\s]+$/,
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
            validate: (value: any) => {
                if (required) {
                  return value === "default-value" && "Grade is required" 
                } else {
                  return false
                }
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

const Teams = ({ maxTeams, maxParticipants, platEvent, index, teamTitle }: any) => {  
  const { register, formState: { errors }, getValues, getFieldState} = useFormContext();
  const [required, setRequired] = useState(false);

  const handleTeamName = () => {
    setRequired(getValues(fieldName) !== "");
  };

  useEffect(() => {
    if (!platEvent) {
      if (index === 0) {
        setRequired(true);
      }
    }
  });

  let fieldName = `teams.${index}.teamName` 

  return (
    <div key={index}>
      {maxParticipants > 1 && (
        <>
          <hr />
          {platEvent === "mobile" && index % 2 === 0 && <h3>{teamTitle}</h3>}
          <h3>{platEvent === "mobile" ? `Team ${(index % 2) + 1}` : teamTitle}</h3>


          <div className={styles.team_input}>
            <label htmlFor={fieldName}>Team Name: </label>
            <input
              className={getFieldState(fieldName).error && `${styles.error}`}
              required={required}
              placeholder="Min 4 characters, Maximum 32 Characters"
              {...register(fieldName, {
                maxLength: {
                  value: 32,
                  message: "Max characters in team name is 32",
                },
                minLength: {
                  value: 4,
                  message: "Min characters in team name is 4",
                },
                onChange: handleTeamName
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
        index={index}
        register={register}
        maxTeams={maxTeams}
        maxParticipants={maxParticipants}
        teamIndex={index}
        getValues={getValues}
        required={required}
      />
    </div>
  );
};

const RegistrationForm = () => {
  let [showPlatform, setShowPlatform] = useState<boolean>(false);
  let [formBody, setFormBody] = useState<any>(<></>);
  let [isRegistering, setIsRegistering] = useState<boolean>(false);
  let [isError, setIsError] = useState(false);
  let [isSuccess, setIsSuccess] = useState(false);
  let [message, setMessage] = useState("");
  const router = useRouter();

  // Handlers
  const onSubmit = async (data: any) => {
    setIsRegistering(true);
    const response = await axios.post("/api/register", {
      ...data,
      userToken:localStorage.getItem("userToken")
    }).then((response:any) => response.data).catch((err:any) => {
      setIsError(true)
      setMessage(err.response.data.message)
    })

    if (response) {
      setIsError(!response.success)
      setIsSuccess(response.success)
      setMessage(response.message)
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
    methods.unregister("teams");
    methods.unregister("participants");
    let maxTeams = 0;
    let teams: any = [];

    switch (platVal) {
      case "pc":
        maxTeams = 2;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          let teamTitle = `Team ${index + 1}`;

          if (index === 0) teamTitle = "Valorant";
          if (index === 1) teamTitle = "CS:GO";

          teams.push(
            <Teams
              maxTeams={maxTeams}
              maxParticipants={5}
              platEvent={"pc"}
              teamTitle={teamTitle}
              index={index}
            />,
          );
        }
        setFormBody(teams);
        break;

      case "mobile":
        maxTeams = 4;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          let teamTitle = `Team ${index + 1}`;

          if (index === 0) teamTitle = "BattleGround Mobile India";
          if (index === 2) teamTitle = "Call Of Duty";

          teams.push(
            <Teams
              maxTeams={maxTeams}
              maxParticipants={4}
              platEvent={"mobile"}
              teamTitle={teamTitle}
              index={index}
            />,
          );
        }
        setFormBody(teams);
        break;

      case "console":
        maxTeams = 2;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          let teamTitle = `Team ${index + 1}`;

          if (index === 0) teamTitle = "Fortnite";
          if (index === 1) teamTitle = "Rocket League";

          teams.push(
            <Teams
              maxTeams={maxTeams}
              maxParticipants={2}
              platEvent={"console"}
              teamTitle={teamTitle}
              index={index}
            />,
          );
        }
        setFormBody(teams);
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
    methods.unregister("teams");
    methods.unregister("participants");
    methods.unregister("platform");
    let maxTeams = 0;
    let teams: any = [];

    switch (eventVal) {
      case "arena-of-valor":
        setShowPlatform(true);
        setFormBody(<></>);
        break;

      case "knockout":
        maxTeams = 1;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams
            maxTeams={maxTeams}
            maxParticipants={1}
            index={index}
          />);
        }
        setFormBody(teams);

        setShowPlatform(false);
        methods.unregister("platform");
        break;

      case "truth-or-debug":
        maxTeams = 2;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams
            maxTeams={maxTeams}
            maxParticipants={3}
            index={index}
          />);
        }
        setFormBody(teams);

        setShowPlatform(false);
        methods.unregister("platform");
        break;

      case "log-and-blog":
        maxTeams = 2;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams
            maxTeams={maxTeams}
            maxParticipants={1}
            index={index}
          />);
        }
        setFormBody(teams);

        setShowPlatform(false);
        methods.unregister("platform");
        break;

      case "designscape":
        maxTeams = 2;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams
            maxTeams={maxTeams}
            maxParticipants={1}
            index={index}
          />);
        }
        setFormBody(teams);

        setShowPlatform(false);
        methods.unregister("platform");
        break;

      case "otakuiz":
        maxTeams = 1;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams
            maxTeams={maxTeams}
            maxParticipants={3}
            index={index}
          />);
        }
        setFormBody(teams);

        setShowPlatform(false);
        methods.unregister("platform");
        break;

      case "bass-drop":
        maxTeams = 2;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams
            maxTeams={maxTeams}
            maxParticipants={1}
            index={index}
          />);
        }
        setFormBody(teams);

        setShowPlatform(false);
        methods.unregister("platform");
        break;

      case "pandoras-blocks":
        maxTeams = 1;
        teams = [];

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams
            maxTeams={maxTeams}
            maxParticipants={3}
            index={index}
          />);
        }
        setFormBody(teams);

        setShowPlatform(false);
        methods.unregister("platform");
        break;

      case "default-value":
        setShowPlatform(false);
        methods.unregister("platform");
        setFormBody(<></>);
        break;

      default:
        setShowPlatform(false);
        methods.unregister("platform");
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
            <div className={styles.event_field}>
              <select
                {...methods.register("event", {
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
            </div>
            {showPlatform && (
              <select
                {...methods.register("platform", {
                  required: true,
                  onChange: onEventPlatformChange,
                  validate: (val) => val !== "default-platform",
                })}
              >
                <option value="default-platform">Select a Platform</option>
                <option value="pc">PC</option>
                <option value="mobile">Mobile</option>
                <option value="console">Console</option>
              </select>
            )}
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
