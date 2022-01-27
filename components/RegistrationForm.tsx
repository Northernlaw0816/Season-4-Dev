import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import anime from "animejs"
import { registerTeam } from "../functions"

//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss"
//data
import EventsList from "../data/EventsList"
import { toSlug } from "../functions"

const RegistrationForm = () => {

	let [participantsLimit, setParticipantsLimit] = useState<number>(1)
	let [showPlatform, setShowPlatform] = useState<boolean>(false)
	let [showTeamName, setShowTeamName] = useState<boolean>(false)
	let [isRegistering, setIsRegistering] = useState<boolean>(false)

	const { register, unregister, handleSubmit, reset} = useForm()


	const handleEventValue = (event: any) => {
		switch (event.target.value) {
			case "Arena of Valor":
				setParticipantsLimit(3)
				setShowPlatform(true)
				setShowTeamName(true)
				break

			case "Truth or Debug":
				setParticipantsLimit(2)
				setShowPlatform(false)
				unregister("platform")
				setShowTeamName(true)
				break

			case "Otakuiz":
				setParticipantsLimit(2)
				setShowPlatform(false)
				unregister("platform")
				setShowTeamName(true)
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

	const onSubmit = async (data: any) => {
		let filteredParticipants = data.participants.filter((el:any) => {
			return el != null
		})

		let emails = filteredParticipants.map((participant: {name: string, grade:string, email:string}) => {
			return participant.email
		})

		const platform = data.platform != undefined ? ` - ${data.platform}` : ""

		setIsRegistering(true)

		const response = await fetch(
			`http://${process.env.NEXT_PUBLIC_MAILER_API_ENDPOINT}/mail/register`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${process.env.NEXT_PUBLIC_MAILER_API_KEY}`
				},
				body : JSON.stringify({
					recipients: [...emails, "info@nutopia.in", /* "admin@nutopia.in" */],
					isTeam: data.teamName ? true : false,
					teamName: data.teamName ?  data.teamName : "",
					participants: filteredParticipants,
					event: `${data.event}${platform}`
				})
			}
		).then(response => response.json()).then(data => {return data})
		
		if (response.status === 'success') {
			registerTeam({
				event: data.event,
				platform: data.platform ? data.platform : "",
				teamName: data.teamName ? data.teamName : "",
				participants: filteredParticipants
			})
			reset()
			setIsRegistering(false)
			alert("Successfully registered")
		} else {
			console.log(response)
			alert("Please Try Again. An Error Has Occured.")
		}
	}

	const MemberInputs = ({index}: {index: number}) => {
		return (
			<div className={styles.member_input}>
				<label htmlFor={`participant.${index}.name`}>Team Member {index + 1}</label>
				<input
					type="text"
					placeholder="Name"
					autoComplete="name"
					{...register(`participants.${index}.name`, {required: true})}
				/>

				<label htmlFor={`participants.${index}.grade`}>Grade</label>
				<input
					type="text"
					placeholder="Grade"
					{...register(`participants.${index}.grade`, {required: true})}
				/>

				<label htmlFor="email">E-Mail Address</label>
				<input
					type="email"
					placeholder="yourname@example.com"
					autoComplete="email"
					{...register(`participants.${index}.email`, {required: true})}
				/>
			</div>
		)
	}

	useEffect(() => {
		participantsLimit < 3 && unregister("participants.2")
		participantsLimit < 2 && unregister("participants.1")
	}, [participantsLimit, unregister])

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
				</div>
			)}
			<div className={styles.form_title}>
				<h2 id={toSlug("Registration Form")}>Registration Form</h2>
			</div>

			{<div className={styles.form_fields}>
				<div className={styles.event_input}>
					<label>Event</label>
					<select {...register("event", {required: true, onChange: handleEventValue, validate: value => value !== "default-value"})}>
						<option value="default-value">Select an Event</option>
						{
							EventsList.map((event: any, index: number) => {
								return <option key={index} value={event.title}>{event.title}</option>
							})
						}
					</select>
				</div>

				{showPlatform && <div className={styles.platform_input}>
						<label>Platform</label>
						<select disabled={!showPlatform} {...register("platform", {required: true, validate: value => value !== "default-value"})}>
							<option value="default-value">Select a Platform</option>
							<option value="Console">Console</option>
							<option value="Mobile">Mobile</option>
							<option value="PC">PC</option>
						</select>
				</div>}
			</div>}

			<div className={styles.team_fields}>
				<h3>Team Details</h3>
				{showTeamName && <div className={styles.team_input}>
					<label htmlFor="teamName">Team Name</label>
					<input type="text" placeholder="Team Name" {...register("teamName", {required: true, minLength: 5})}/>
				</div>}
				<hr/>
				<MemberInputs index={0}/>
				{
					participantsLimit > 1 && (<>
						<hr/>
						<MemberInputs index={1}/>
						{participantsLimit > 2 && (<>
							<hr/>
							<MemberInputs index={2}/>
						</>)}
					</>)
				}
			</div>

			<div className={styles.submit}>
				<input type="submit" value="Register"/>
			</div>
		</form>
	)
}

export default RegistrationForm