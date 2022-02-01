import { useState, useEffect} from "react"
import { useForm, UseFormRegister } from "react-hook-form"
// import { DevTool } from "@hookform/devtools"
import anime from "animejs"
import { registerTeam } from "../functions"

//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss"
//data
import EventsList from "../data/EventsList"
import { toSlug } from "../functions"

const MemberInputs = ({index, register, errors}: {index: number, register: UseFormRegister<any>, errors:any}) => {

	const [memberError, setMemberError] = useState<string>("")

	const onChangeHandler = () => {
		let message = ""
		setTimeout(() => {
			if (errors.participants && errors.participants[index]) {
				const fieldGroup = errors.participants[index]
				for(let [field] of Object.entries(fieldGroup)) {
					message = fieldGroup[field].message
					// console.log(
					// 	`Inside For Loop: ${fieldGroup[field].message}\nVar Inside For Loop: ${message}`
					// )
				}
			}
			setMemberError(message)
		}, 100)
		// console.log(`Afrer set state: ${memberError}`)
	}

	return (
		<div className={styles.member_input}>
			<label htmlFor={"participants."+index+".name"}>Team Member {index + 1}</label>
			<input
				type="text"
				placeholder="Name"
				id={"participants."+index+".name"}
				className={errors.participants && errors.participants[index] && errors.participants[index].name?.message && styles.error_field}
				{...register("participants."+index+".name", {
					required: `Team Member ${index+1}'s Name Is Required`,
					onChange: onChangeHandler,
					minLength: {
						value: 3,
						message: `Team Member ${index+1}'s Name Must Be At Least 3 Characters`
					}
				})}
			/>

			<label htmlFor={"participants."+index+".grade"}>Grade</label>
			<input
				type="text"
				placeholder="Grade"
				id={"participants."+index+".grade"}
				className={errors.participants && errors.participants[index] && errors.participants[index].grade?.message && styles.error_field}
				{...register("participants."+index+".grade", {
					required: "Grade Is Required",
					onChange:  onChangeHandler,
					pattern: {
						value: /^([1,2]{2}\s*[A-B]\s*[1,2]|([9]|10)\s*[A-E])$/i,
						message: "Enter A Valid Grade"
					}
				})}
			/>

			<label htmlFor={"participants."+index+".email"}>E-Mail Address</label>
			<input
				type="email"
				placeholder="yourname@example.com"
				id={"participants."+index+".grade"}
				className={errors.participants && errors.participants[index] && errors.participants[index].email?.message && styles.error_field}
				{...register("participants."+index+".email", {
					required: "Email Is Required",
					onChange: onChangeHandler,
					minLength: {
						value: 5,
						message: "Email Must Be At Least 5 Characters"
					},
					pattern: {
						value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
						message: `Enter A Valid Email`
					}
				})}
			/>

			{memberError !== "" && (
				<div className={`${styles.error} ${styles.member_error}`}>
					<p>{memberError}</p>
				</div>
			)}
		</div>
	)
}

const RegistrationForm = () => {

	let [participantsLimit, setParticipantsLimit] = useState<number>(1)
	let [showPlatform, setShowPlatform] = useState<boolean>(false)
	let [showTeamName, setShowTeamName] = useState<boolean>(false)
	let [isRegistering, setIsRegistering] = useState<boolean>(false)
	let [isError, setIsError] = useState<boolean>(false)

	const { register, unregister, handleSubmit, reset, formState: {errors}, control} = useForm<{
		event: string,
		platform: string,
		teamName: string,
		participants: {
			name: string,
			grade: string,
			email: string
		}[]
	}>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			event: "default-value",
			platform: "default-value",
			teamName: "",
			participants: [
				{
					name: "",
					grade: "",
					email: ""
				}
			]

		}
	})

	const resetFields = () => {
		reset()
		setParticipantsLimit(1)
		setShowPlatform(false)
		unregister("platform")
		setShowTeamName(false)
		unregister("teamName")
	}


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
			`https://${process.env.NEXT_PUBLIC_MAILER_API_ENDPOINT}/mail/register`,
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
			resetFields()
			setIsRegistering(false)
			alert("Successfully registered")
		} else {
			setIsError(true)
			console.log(response)
			alert("Please Try Again. An Error Has Occured.")
		}
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
					{
						isError ? <h2>An Error Occured! Please reload and try again</h2> : <h2>Registering...</h2>
					}
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
						<select disabled={!showPlatform} {...register("platform", {required: true, shouldUnregister: true, validate: value => value !== "default-value"})}>
							<option value="default-value">Select a Platform</option>
							<option value="Console">Console</option>
							<option value="Mobile">Mobile</option>
							<option value="PC">PC</option>
						</select>
				</div>}
			</div>}

			<div className={styles.team_fields}>
				<h3>Team Details</h3>
				{showTeamName &&(<>
					<div className={styles.team_input}>
						<label htmlFor="teamName">Team Name</label>
						<input type="text" placeholder="Team Name" {...register("teamName", {required: "Team Name Is Required", minLength: {value: 5, message: "Team Name Needs To Be Atleast 5 Characters."}, shouldUnregister: true})}/>
					</div>
					{errors.teamName && (
						<span className={styles.error}>
							<p>{errors.teamName.message}</p>
						</span>
					)}
				</>)
				}
				<hr/>
				<MemberInputs index={0} register={register} errors={errors}/>
				{
					participantsLimit > 1 && (<>
						<hr/>
						<MemberInputs index={1} register={register} errors={errors}/>
						{participantsLimit > 2 && (<>
							<hr/>
							<MemberInputs index={2} register={register} errors={errors}/>
						</>)}
					</>)
				}
			</div>

			<div className={styles.submit}>
				<input type="submit" value="Register"/>
			</div>
			{/* <DevTool control={control}/> */}
		</form>
	)
}

export default RegistrationForm