import { useState } from "react";
import { useForm } from "react-hook-form";
import anime from "animejs";
import { toSlug } from "../functions";
import { useRouter } from "next/router"

//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss"
//data
import EventsList from "../data/EventsList"

const Participants = ({ maxParticipants, register, teamIndex, errors, required }: any) => {
  const participants: any = [];

  const fieldErrors: any[] = [] 

  if (maxParticipants > 1) {
    if(errors && errors.teams){
      errors.teams[teamIndex].participants.forEach((participant: any, index: number) => {
        fieldErrors.push(participant.name)
        fieldErrors.push(participant.grade)
        fieldErrors.push(participant.phone)
      })
    }
  }

  for (let i = 0; i < maxParticipants; i++) {
    participants.push(
      <div key={i} className={styles.member_input}>
        {/* NAME */}
        <label htmlFor={`${maxParticipants > 1 ? `teams.${teamIndex}.participants.${i}.name` : `participants.${teamIndex}.name`}`}>
          Participant {maxParticipants === 1 ? teamIndex + 1 : i + 1}:{" "}
        </label>
        <input
          className={required && styles.required}
          required={required}
          {...register(`${maxParticipants > 1 ? `teams.${teamIndex}.participants.${i}.name` : `participants.${teamIndex}.name`}`)}
        />
        {/* GRADE */}
        <label htmlFor={`${maxParticipants > 1 ? `teams.${teamIndex}.participants.${i}.grade` : `participants.${teamIndex}.grade`}`}>Grade: </label>

        <input 
          className={required && styles.required}
          required={required}
          {...register(`${maxParticipants > 1 ? `teams.${teamIndex}.participant.${i}.grade` : `participants.${teamIndex}.grade`}`, { pattern: {value: /^(9|10|11|12)$/i} })} />
        {/* PHONE */}
        <label htmlFor={`${maxParticipants > 1 ? `teams.${teamIndex}.participants.${i}.phone` : `participants.${teamIndex}.phone`}`}>Phone: </label>
        <input
          className={required && styles.required}
          required={required}
          {...register(`${maxParticipants > 1 ? `teams.${teamIndex}.participants.${i}.phone` : `participants.${teamIndex}.phone`}`, {
            pattern: {
              value: /\d{10}/i,
              message: "Please enter a valid phone number",
            }
          })}
        />

      </div>,
    );
  }
  return participants;
};

const Teams = ({ maxTeams, maxParticipants, register, platEvent, index, teamTitle, getValues }: any) => {
  const [required, setRequired] = useState(false);

  const handleTeamName = () => {
    setRequired(getValues(`teams.${index}.teamName`) !== "")

    console.log(`team${index}Name: ${getValues(`teams.${index}.teamName`)}`)
    console.log(`isTeam${index}Required: ${getValues(`teams.${index}.teamName`) !== ""}`)
  };

  return (
    <div key={index}>
      {maxParticipants > 1 && (
        <>
          <hr />
          {platEvent === "mobile" && index % 2 === 0 && <h3>{teamTitle}</h3>}
          <h3>{platEvent === "mobile" ? `Team ${(index % 2) + 1}` : teamTitle}</h3>

          <div className={styles.team_input}>
            <label htmlFor={`teams.${index}.teamName`}>Team Name: </label>
            <input
              {...register(`teams.${index}.teamName`, {
                maxLength: {
                  value: 32,
                  message: "Max characters in team name is 32",
                },
                minLength: {
                  value: 4,
                  message: "Min characters in team name is 4",
                },
                onChange: handleTeamName,
              })}
            />
          </div>
        </>
      )}
      <Participants index={index} register={register} maxTeams={maxTeams} maxParticipants={maxParticipants} teamIndex={index} getValues={getValues} required={required} />
    </div>
  );
};

const RegistrationForm = ({ event }: any) => {
  // ? REACT HOOKS
  let [showPlatform, setShowPlatform] = useState<boolean>(false);
  let [platEvent, setPlatEvent] = useState<string>("");
  let [formBody, setFormBody] = useState<any>(<></>);
  let [isRegistering, setIsRegistering] = useState<boolean>(false);
  let [isError, setIsError] = useState({state: false, message: ""});
  let [isSuccess, setIsSuccess] = useState({state: false, message: ""});
  const router = useRouter();

  // Handlers
  const onSubmit = async (data: any) => {

    setIsRegistering(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Controll-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ...data,
        userToken: localStorage.getItem("userToken"),
      }),
    }).then(response => response.json()).then(data => {
      setIsRegistering(false);
      if (!data.success) {
        console.log(data.message)
        setIsError({state: true, message: data.message})
      } else {
        setIsSuccess({state: true, message: data.message})
      }
    }).catch(err => console.error(err));
    
  };

  const {
    register,
    formState: { errors },
    reset,
    unregister,
    getValues,
    handleSubmit,
  } = useForm({ mode: "onChange", shouldUnregister: true, reValidateMode: "onChange" });

  const resetFields = () => {
    reset();
    unregister("platform");
    router.reload();
  };

  const onEventPlatformChange = () => {
    const platVal = getValues("platform");
    unregister("teams");
    unregister("participants");
    setPlatEvent(platVal);
    let maxTeams = 0
    let teams: any = []

    switch (platVal) {
      case "pc":
        maxTeams = 2
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          let teamTitle = `Team ${index + 1}`

          if (index === 0) teamTitle = "Valorant"
          if (index === 1) teamTitle = "CS:GO"

          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={5} errors={errors} platEvent={"pc"} getValues={getValues} teamTitle={teamTitle} index={index} />)
        }
        setFormBody(teams);
        break;

      case "mobile":
        maxTeams = 4
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          let teamTitle = `Team ${index + 1}`

          if (index === 0) teamTitle = "BattleGround Mobile India"
          if (index === 2) teamTitle = "Call Of Duty"

          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={4} errors={errors} platEvent={"mobile"} getValues={getValues} teamTitle={teamTitle} index={index} />)
        }
        setFormBody(teams);
        break;

      case "console":
        maxTeams = 2
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          let teamTitle = `Team ${index + 1}`

          if (index === 0) teamTitle = "Fortnite"
          if (index === 1) teamTitle = "Rocket League"

          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={2} errors={errors} platEvent={"console"} getValues={getValues} teamTitle={teamTitle} index={index} />)
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
    const eventVal = getValues("event");
    unregister("teams");
    unregister("participants");
    console.log(eventVal);
    let maxTeams = 0
    let teams: any = []

    switch (eventVal) {
      case "arena-of-valor":
        setShowPlatform(true);
        setFormBody(<></>);
        console.log("aov");
        break;

      case "knockout":
        maxTeams = 1
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={1} index={index} errors={errors} getValues={getValues} />)
        }
        setFormBody(teams);

        setShowPlatform(false);
        unregister("platform");
        break;

      case "truth-or-debug":
        maxTeams = 2
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={3} index={index} errors={errors} getValues={getValues} />)
        }
        setFormBody(teams);

        setShowPlatform(false);
        unregister("platform");
        break;

      case "log-and-blog":
        maxTeams = 2
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={1} index={index} errors={errors} getValues={getValues} />)
        }
        setFormBody(teams);

        setShowPlatform(false);
        unregister("platform");
        break;

      case "designscape":
        maxTeams = 2
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={1} index={index} errors={errors} getValues={getValues} />)
        }
        setFormBody(teams);

        setShowPlatform(false);
        unregister("platform");
        break;

      case "otakuiz":

        maxTeams = 1
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={3} index={index} errors={errors} getValues={getValues} />)
        }
        setFormBody(teams);

        setShowPlatform(false);
        unregister("platform");
        break;

      case "bass-drop":

        maxTeams = 2
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={1} index={index} errors={errors} getValues={getValues} />)
        }
        setFormBody(teams);

        setShowPlatform(false);
        unregister("platform");
        break;

      case "pandoras-blocks":

        maxTeams = 1
        teams = []

        for (let index = 0; index < maxTeams; index++) {
          teams.push(<Teams register={register} maxTeams={maxTeams} maxParticipants={3} index={index} errors={errors} getValues={getValues} />)
        }
        setFormBody(teams);

        setShowPlatform(false);
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
        {isRegistering && (
          <div className={styles.disable_form_window}>
            {
              isError.state ? (<>
                <h2>{isError.message}</h2>
                <div className={styles.reset_form_btn} onClick={() => resetFields()}>Reset Form</div>
              </>) : isSuccess?.state ? (<>
                <h2>{isSuccess.message}</h2>
                <div className={styles.reset_form_btn} onClick={() => resetFields()}>Ok</div>
              </>) : (<>
                <h2>Registering...</h2>
                <div className={styles.throbber}>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                  <div className={`throbber_section ${styles.throbber_section}`}></div>
                </div>
              </>)}
          </div>
        )}
        <div>
          <h1 className={styles.form_title}>Form Registration</h1>
          <div className={styles.form_fields}>
            <div className={styles.event_field}>
              <select
                {...register("event", {
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
                {...register("platform", {
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
            <input type={"submit"} value="Register" />
          </div>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
