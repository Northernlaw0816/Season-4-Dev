import { useState, useEffect} from "react"
import { useForm } from "react-hook-form"
import anime from "animejs"
import { getRegistrationsCollection, registerTeam, validateFields } from "../functions"
import { FormFields } from "../functions/interface"
import { toSlug } from "../functions"

//components
import ParticipantFields from "./ParticipantFields"
//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss"
import Effects from "../styles/Effects.module.scss"
//data
import EventsList from "../data/EventsList"
import {  DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore"
import { useRouter } from "next/router"

const RegistrationForm = ({event}: any) => {
	let [participantsLimit, setParticipantsLimit] = useState<number>(0)
	let [showPlatform, setShowPlatform] = useState<boolean>(false)
	let [showTeamName, setShowTeamName] = useState<boolean>(false)
	let [showGame, setShowGame] = useState<boolean>(false)
	let [isRegistering, setIsRegistering] = useState<boolean>(false)
	let [isError, setIsError] = useState<{state:boolean, message:string}>()
	let [isSuccess, setIsSuccess] = useState<{state:boolean, message:string}>()
	let [defaultEvent, setDefaultEvent] = useState<string>(event)
	let [registrations, setRegistrations] = useState<QueryDocumentSnapshot<DocumentData>[]>([])

	const { register, unregister, handleSubmit, reset, formState: {errors}, getValues, setError, clearErrors } = useForm<FormFields>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: {
			event: defaultEvent,
			platform: "default-value",
			game: "default-value",
			participants: []
		}
	})

	const resetFields = () => {
		reset()
		setParticipantsLimit(0)
		setShowPlatform(false)
		unregister("platform")
		setShowTeamName(false)
		unregister("teamName")
		setDefaultEvent("default-value")
		setShowGame(false)
		setIsRegistering(false)
		router.reload()
	}

	const handleEventValue = () => {
		switch (getValues("event")) {
			case "arena-of-valor":
				setParticipantsLimit(0)
				setShowPlatform(true)
				setShowTeamName(true)
				break

			case "truth-or-debug":
				setParticipantsLimit(2)
				setShowPlatform(false)
				unregister("platform")
				setShowTeamName(true)
				break

			case "otakuiz":
				setParticipantsLimit(2)
				setShowPlatform(false)
				unregister("platform")
				setShowTeamName(true)
				break

			case "default-value":
				setParticipantsLimit(0)
				setShowPlatform(false)
				unregister("platform")
				setShowTeamName(false)
				unregister("teamName")
				break

			default:
				setParticipantsLimit(1)
				setShowPlatform(false)
				unregister("platform")
				setShowTeamName(false)
				unregister("teamName")
				break
		}
	}

	const handlePlatformValue = () => {
		switch (getValues("platform")) {
			case "pc":
				setParticipantsLimit(3)
				setShowGame(false)
				break
			case "mobile":
				setParticipantsLimit(0)
				setShowGame(true)
				break
			case "console":
				setParticipantsLimit(2)
				setShowGame(false)
				break
			case "default-value":
				setParticipantsLimit(0)
				setShowGame(false)
				break
			default:
				setParticipantsLimit(0)
				setShowGame(false)
				break
		}
	}

	const handleGameValue = () => {
		if (getValues("game") === "default-value") {
			setParticipantsLimit(0)
		} else {
			setParticipantsLimit(3)
		}
	}

	const teamNameOnBlur = async () => {
		// get current value of teamName field
		const currentTeamName = getValues("teamName")	
		// get current value of event field
		const currentEvent = getValues("event")
		// get registrations collection
		const registrationsCollections = getRegistrationsCollection()

		// query for documents that match the current event
		const eventQuery = query(registrationsCollections, where("event", "==", currentEvent))
		const eventSnapshot = await getDocs(eventQuery)

		// list to store registrations
		const eventRegistrations: QueryDocumentSnapshot<DocumentData>[] = []
		eventSnapshot.forEach((doc: any) => {
			eventRegistrations.push(doc)
		})

		setRegistrations(eventRegistrations)

		// loop through the list and check for duplicate teamName
		registrations.map((registartion: QueryDocumentSnapshot<DocumentData>) => {
			if (currentTeamName === registartion.get("teamName") && registartion.get("event") !== "arena-of-valor") {
				setError("teamName", {type: "existing", message: "Team Name already exists."})
			} else {
				clearErrors("teamName")
			}
		})
	}

	const onSubmit = async (data: FormFields) => {
		// filter participants that have empty fields
		let filteredParticipants = data.participants.filter((el:any) => {
			el.grade = el.grade.replaceAll(' ', '').toUpperCase()
			return el != null
		})

		// get emails from filtered participants
		let emails = filteredParticipants.map((participant: {name: string, grade:string, email:string}) => {
			return participant.email
		})

		// make sure the platform sent in the email is not undefined or default value
		let platform: string | undefined = data.platform === undefined || "default-value" ? "" : ` - ${data.platform?.replaceAll('-', ' ').toLowerCase()}`

		// set registration status
		setIsRegistering(true)
		let validationError = await validateFields(data, participantsLimit)
		setIsError(validationError)
		
		if(!validationError.state) {
			const response = await fetch(
				`https://${process.env.NEXT_PUBLIC_MAILER_API_ENDPOINT}/mail/register`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${process.env.NEXT_PUBLIC_MAILER_API_KEY}`
					},
					body : JSON.stringify({
						recipients: [...emails, "info@nutopia.in"],
						event: `${data.event.replaceAll('-', ' ').toUpperCase()}${platform}`,
						isTeam: data.teamName ? true : false,
						teamName: data.teamName ?  data.teamName : "",
						participants: filteredParticipants,
					})
				}
			).then(response => response.json()).then(data => { return data })

			platform = data.platform === "default-value" ? undefined : data.platform
			let game  = data.game === "default-value" ? undefined : data.game

			if (response.status === 'success') {

				await registerTeam({
					event: data.event,
					...(platform) && {platform: platform},
					...(game) && {game: game},
					...(data.teamName) && {teamName: data.teamName},
					participants: filteredParticipants
				}).catch(() => resetFields)
				setIsSuccess({state: response, message: "Successfully Registered"})
				alert("Successfully registered")
				setIsRegistering(false)
				resetFields()
			} else {
				setIsError({state: true, message: "Something went wrong. We're not sure what. Please reload and try again."})
				console.error(response)
			}
		}
	}

	useEffect(() => {
		participantsLimit < 3 && unregister("participants.2")
		participantsLimit < 2 && unregister("participants.1")
		participantsLimit < 1 && unregister("participants.0")
	}, [participantsLimit, unregister])
	
	useEffect(() => handleEventValue(), [])

	useEffect(() => {
		let timeline = anime.timeline({
			easing: "linear",
			direction: "forwards",
			delay: anime.stagger(200),
			duration: 1000,
			loop: true
		})

		timeline.add({
			targets: ".throbber_section",
			keyframes: [
				{scale: 0},
				{scale: 1}
			],
		})
	})

	const router = useRouter()

	return (
		<form className={styles.registration_form} onSubmit={handleSubmit(onSubmit)}>
			{isRegistering && (
				<div className={styles.disable_form_window}>
					{
						isError?.state ? (<>
							<h2>{isError.message}</h2>
							<div className={`${styles.reset_form_btn} ${Effects.button_hover_effect}`} onClick={() => router.reload()}>Reset Form</div>
						</>) : isSuccess?.state ? (
							<h2>{isSuccess.message}</h2>
						) : (<>
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
			<div className={styles.form_title}>
				<h2 id={toSlug("Registration Form")}>Registration Form</h2>
			</div>

			{<div className={styles.form_fields}>
				<div className={styles.event_field}>
					<label>Event</label>
					<select {...register("event", {
						required: true,
						onChange: handleEventValue,
						validate: value => value !== "default-value"
					})}>
						<option value="default-value">Select an Event</option>
						{
							EventsList.map((event: any, index: number) => {
								return <option key={index} value={toSlug(event.title)}>{event.title}</option>
							})
						}
					</select>
				</div>

				{showPlatform && <div className={styles.platform_field}>
						<label>Platform</label>
						<div className={styles.platform_input}>
							<select disabled={!showPlatform} {...register("platform", {
								required: true,
								shouldUnregister: true,
								onChange: handlePlatformValue,
								validate: value => value !== "default-value"
							})}>
								<option value="default-value">Select a Platform</option>
								<option value="console">Console</option>
								<option value="mobile">Mobile</option>
								<option value="pc">PC</option>
							</select>
							{showGame && (
								<select {...register("game", {
									required: true,
									shouldUnregister: true,
									onChange: handleGameValue,
									validate: value => value !== "default-value"
								})}>
									<option value="default-value">Select a Game</option>
									<option value="bgmi">Battlegrounds Mobile India</option>
									<option value="cod">Call of Duty: Mobile</option>
								</select>
							)}
						</div>
				</div>}
			</div>}

			<div className={styles.team_fields}>
				<h3>Team Details</h3>
				{showTeamName && participantsLimit > 0  && (<>
					<div className={styles.team_input}>
						<label htmlFor="teamName">Team Name</label>
						<input type="text" placeholder="Team Name" {...register("teamName", {
							required: "Team Name Is Required",
							minLength: {
								value: 5,
								message: "Team Name Needs To Be At least 5 Characters."
							},
							onBlur: teamNameOnBlur,
							shouldUnregister: true
						})}/>
					</div>
					{errors.teamName && (
						<span className={styles.error}>
							<p>{errors.teamName.message}</p>
						</span>
					)}
				</>)}

				<hr/>
				
				{ participantsLimit > 0 ? (<>
					<ParticipantFields index={0} register={register} form={{errors, getValues, setError}} participantsLimit={participantsLimit}/>
					{
						participantsLimit > 1 && (<>
							<hr/>
							<ParticipantFields index={1} register={register} form={{errors, getValues, setError}} participantsLimit={participantsLimit}/>
							{participantsLimit > 2 && (<>
								<hr/>
								<ParticipantFields index={2} register={register} form={{errors, getValues, setError}} participantsLimit={participantsLimit}/>
							</>)}
						</>)
					}
				</>) : (<h3>Please Fill All The Previous Fields</h3>)}
			</div>

			<div className={styles.submit}>
				<input type="submit" value="Register"/>
			</div>
		</form>
	)
}

export default RegistrationForm