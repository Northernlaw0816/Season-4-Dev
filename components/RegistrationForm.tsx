import { useState, useEffect} from "react"
import { useForm } from "react-hook-form"
import anime from "animejs"
import { getRegistrationsCollection, registerTeam } from "../functions"
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

const RegistrationForm = ({event}: any) => {
	let [participantsLimit, setParticipantsLimit] = useState<number>(0)
	let [showPlatform, setShowPlatform] = useState<boolean>(false)
	let [showTeamName, setShowTeamName] = useState<boolean>(false)
	let [showGame, setShowGame] = useState<boolean>(false)
	let [isRegistering, setIsRegistering] = useState<boolean>(false)
	let [isError, setIsError] = useState<{state:boolean, message:string}>({state: false, message: ""})
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
		setIsError({state: false, message: ""})
		setIsRegistering(false)
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
			if (currentTeamName === registartion.get("teamName")) {
				setError("teamName", {type: "existing", message: "Team Name already exists."})
			} else {
				clearErrors("teamName")
			}
		})
	}

	const onSubmit = async (data: any) => {
		// filter participants that have empty fields
		let filteredParticipants = data.participants.filter((el:any) => {
			el.grade = el.grade.toUpperCase()
			return el != null
		})

		// get emails from filtered participants
		let emails = filteredParticipants.map((participant: {name: string, grade:string, email:string}) => {
			return participant.email
		})

		// get grades from filtered participants
		let grades = filteredParticipants.map((participant: {name: string, grade:string, email:string}) => {
			return participant.grade
		})

		/* ------------------------ Firestore ------------------------ */

		// get firestore registrations collection
		const registrationsCollections = getRegistrationsCollection()

		/**
		 * Check if registered for same event
		 */

		// set query
		const registeredEventsQuery = query(registrationsCollections, where('event', '==', data.event))

		// get docs that match the event
		const eventMatchedSnapshot = await getDocs(registeredEventsQuery)

		//push the query result to an array
		const eventMatchedDocs: QueryDocumentSnapshot<DocumentData>[] = []
		eventMatchedSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
			eventMatchedDocs.push(doc)
		})

		//loop through the array and check if the emails are already registered
		registrations.length > 0 && eventMatchedDocs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
			const participants = doc.get("participants")
			participants.forEach((participant: any) => {
				if (emails.includes(participant.email) && grades.includes(participant.grade)) {
					setIsError({state: true, message: `${participantsLimit > 1 ? "One or more team members" : "You"} are already registered for this event`})
				}
			})
		})

		/**
		 * Check if registered for Otakuiz - Throw error if already registered for Designscape/Log and Blog 
		 */
		if (data.event === "otakuiz") {
			// set query for DS and LAB registration documents
			const dsRegistrationsQuery = query(registrationsCollections, where('event', '==', "designscape"))
			const labRegistrationsQuery = query(registrationsCollections, where('event', '==', "log-and-blog"))

			// get docs that match the queries
			const dsRegistrationSnapshot = await getDocs(dsRegistrationsQuery)
			const labRegistrationSnapshot = await getDocs(labRegistrationsQuery)

			// create a list to store the registartions
			const registrations: QueryDocumentSnapshot<DocumentData>[] = []

			// get ds registrations
			dsRegistrationSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				registrations.push(doc)
			})

			// get lab registrations
			labRegistrationSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				registrations.push(doc)
			})

			//loop through the array and check if the emails are registered for ds and lab
			registrations.length > 0 && registrations.map((doc: QueryDocumentSnapshot<DocumentData>) => {
				const participants = doc.get("participants")
				participants.forEach((participant: any) => {
					if (emails.includes(participant.email) && grades.includes(participant.grade)) {
						setIsError({state: true, message: `${participantsLimit > 1 ? "One or more team members" : "You"} are already registered for parallel events \"Designscape\" or \"Log and Blog\".`})
					}
				})
			})
		}

		/**
		 * Check if registered for Designscape/Log and Blog - Throw error if already registered for Otakuiz
		 */
		if (data.event === "designscape" || data.event === "log-and-blog") {
			// set query for OTK registration documents
			const otakuizRegistrationsQuery = query(registrationsCollections, where('event', '==', "otakuiz"))

			// get docs that match the query
			const otakuizRegistrationSnapshot = await getDocs(otakuizRegistrationsQuery)

			// create a list to store the registartions
			const registrations: QueryDocumentSnapshot<DocumentData>[] = []

			// get otakuiz registrations
			otakuizRegistrationSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				registrations.push(doc)
			})
		
			//loop through the array and check if the emails are registered for otakuiz
			registrations.length > 0 && registrations.map((doc: QueryDocumentSnapshot<DocumentData>) => {
				const participants = doc.get("participants")
				participants.forEach((participant: any) => {
					if (emails.includes(participant.email) && grades.includes(participant.grade)) {
						setIsError({state: true, message: `${participantsLimit > 1 ? "One or more team members" : "You"} are already registered for parallel event \"Otakuiz\".`})
					}
				})
			})
		}

		/**
		 * If registering for !AoV Events - Throw error if already registered for !AoV Event
		 */

		if (data.event !== "arena-of-valor") {
			// set query for  registration documents that doesn't match current event	
			const otherRegistrationsQuery = query(registrationsCollections, where('event', "!=", data.event))

			// get docs that match the query
			const otherRegistrationSnapshot = await getDocs(otherRegistrationsQuery)

			// create a list to store the registartions
			const registrations: QueryDocumentSnapshot<DocumentData>[] = []

			// get other registrations
			otherRegistrationSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				if (!doc.get('isSample')) {
					registrations.push(doc)
				}
			})

			// loop through the array and check if the emails are registered for other events
			registrations.length > 0 && registrations.map((doc: QueryDocumentSnapshot<DocumentData>) => {
				if (doc.get("event") != "arena-of-valor") {
					const participants = doc.get("participants")
					participants.forEach((participant: any) => {
						if (emails.includes(participant.email) && grades.includes(participant.grade)) {
							setIsError({state: true, message: `${participantsLimit > 1 ? "One or more team members" : "You"} are already registered for one event. Please register for only one event at a time. This does not apply when registering for \"Arena of Valor\"`})
						}
					})
				}
			})
		}

		/**
		 * If registering for AoV Event - Throw error if already registered for AoV more than 3 times
		 */

		if (data.event === "arena-of-valor") {
			// set query for AoV  registration document
			const aovQuery = query(registrationsCollections, where("event", "==", data.event))

			// get docs that matches the query
			const aovRegistrationsSnapshot = await getDocs(aovQuery)

			// create list to store aov registrations
			const registrations: QueryDocumentSnapshot<DocumentData>[] = []

			// loop through the snapshot and add document to registrations list
			aovRegistrationsSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				registrations.push(doc)
			})

			// loop through registrations and check if the participants are registered for the same platform
			registrations.length > 0 && registrations.map((doc: QueryDocumentSnapshot<DocumentData>) => {
				const participants = doc.get("participants")
				if (data.platform === doc.get("platform")) {
					participants.forEach((participant: any) => {
						if (emails.includes(participant.email) && grades.includes(participant.grade)) {
							setIsError({state: true, message: `One or more team members are already registered for this platform (${data.platform}) for \"Arena of Valor\".`})
						}
					})
				}
			})
		}

		/* ----------------------------------------------------------- */

		// make sure the platform sent in the email is not undefined or default value
		let platform = data.platform === undefined || "default-value" ? "" : ` - ${data.platform}`

		// set registration status
		setIsRegistering(true)

		if(!isError.state) {
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
						isTeam: data.teamName ? true : false,
						teamName: data.teamName ?  data.teamName : "",
						participants: filteredParticipants,
						event: `${data.event}${platform}`.toUpperCase()
					})
				}
			).then(response => response.json()).then(data => {return data})

			platform = data.platform === "default-value" ? undefined : data.platform
			let game  = data.game === "default-value" ? undefined : data.game

			if (response.status === 'success') {

				registerTeam({
					event: data.event,
					...(platform) && {platform: platform},
					...(game) && {game: game},
					...(data.teamName) && {teamName: data.teamName},
					participants: filteredParticipants
				})

				alert("Successfully registered")
				setIsRegistering(false)
				resetFields()
			}  else {
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

	return (
		<form className={styles.registration_form} onSubmit={handleSubmit(onSubmit)}>
			{isRegistering && (
				<div className={styles.disable_form_window}>
					{
						isError.state ? (<>
							<h2>{isError.message}</h2>
							<div className={`${styles.reset_form_btn} ${Effects.button_hover_effect}`} onClick={resetFields}>Reset Form</div>
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
					<ParticipantFields index={0} register={register} errors={errors}/>
					{
						participantsLimit > 1 && (<>
							<hr/>
							<ParticipantFields index={1} register={register} errors={errors}/>
							{participantsLimit > 2 && (<>
								<hr/>
								<ParticipantFields index={2} register={register} errors={errors}/>
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