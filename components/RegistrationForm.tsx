import { ReactNode, useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import anime from "animejs";
import axios from "axios";
import { useRouter } from "next/router";
import Schools from "../data/SchoolsList";
import crypto from "crypto"
//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss";

const Participants = ({ maxParticipants, required, index }: any) => {
	const {
		register,
		formState: { errors },
		getFieldState,
	} = useFormContext();

	const participantsList: ReactNode[] = [];

	for (let i = 0; i < maxParticipants; i++) {
		let nameFieldName = `${maxParticipants > 1 ? `teams.${index}.` : ""}participants.${index}.${i}.name`;
		let gradeFieldName = `${maxParticipants > 1 ? `teams.${index}.` : ""}participants.${index}.${i}.grade`;
		let phoneFieldName = `${maxParticipants > 1 ? `teams.${index}.` : ""}participants.${index}.${i}.phone`;

		participantsList.push(
			<div className={styles.form_input} key={`PLD${i}.${index}`}>
				{/* NAME */}
				<label htmlFor={nameFieldName}>Participant Name {`${i + 1}: `}</label>
				<input
					className={getFieldState(nameFieldName).error && `${styles.error}`}
					required={required}
					{...register(nameFieldName, {
						pattern: {
							value: /^[a-zA-Z.\s]+$/,
							message: "Please enter only characters from 'A-Z'",
						},
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
						},
					})}>
					<option value="default-value">Select Grade</option>
					{[9, 10, 11, 12].map((grade, index) => (
						<option value={grade} key={index}>
							{grade}
						</option>
					))}
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

				<ErrorMessage
					errors={errors}
					name={nameFieldName}
					render={({ messages }) =>
						messages &&
						Object.entries(messages).map(([type, message]) => (
							<p className={styles.input_error} key={type}>
								{message}
							</p>
						))
					}
				/>
				<ErrorMessage
					errors={errors}
					name={gradeFieldName}
					render={({ messages }) =>
						messages &&
						Object.entries(messages).map(
							([type, message]) =>
								message !== true && (
									<p className={styles.input_error} key={type}>
										{message}
									</p>
								),
						)
					}
				/>
				<ErrorMessage
					errors={errors}
					name={phoneFieldName}
					render={({ messages }) =>
						messages &&
						Object.entries(messages).map(([type, message]) => (
							<p className={styles.input_error} key={type}>
								{message}
							</p>
						))
					}
				/>
			</div>,
		);
	}

	return (
		<>
			{participantsList.map((participant) => {
				return participant;
			})}
		</>
	);
};

const Team = ({ maxParticipants, index }: any) => {
	const {
		register,
		formState: { errors },
		getFieldState,
	} = useFormContext();

	let fieldName = `teams.${index}.teamName`;

	return (
		<>
			<hr key={`hr${index}`} />
			{maxParticipants > 1 && (
				<div className={styles.form_input} key={`T${index}`}>
					<label htmlFor={fieldName}>Team Name: {`${index + 1}: `}</label>
					<input
						className={getFieldState(fieldName).error && `${styles.error}`}
						required={true}
						placeholder="Min 4 characters, Maximum 32 Characters"
						{...register(fieldName, {
							maxLength: {
								value: 32,
								message: "Team name must be less than 32 characters",
							},
							minLength: {
								value: 4,
								message: "Team name must be atleast 4 characters",
							},
						})}
					/>
					<ErrorMessage
						errors={errors}
						name={fieldName}
						render={({ messages }) =>
							messages &&
							Object.entries(messages).map(([type, message]) => (
								<p className={styles.input_error} key={type}>
									{message}
								</p>
							))
						}
					/>
				</div>
			)}
			<Participants
				maxParticipants={maxParticipants}
				required={true}
				index={index}
				key={`P${maxParticipants}${index}`}
			/>
		</>
	);
};

const RegistrationForm = ({ title, eventName }: { title: string; eventName: string }) => {
	const router = useRouter();
	let [schools, setSchools] = useState<{ schoolId: string; schoolName: string }[]>([]);
	let [Participants, setParticipants] = useState<number[]>([]);
	let [isRegistering, setIsRegistering] = useState<boolean>(false);
	let [isError, setIsError] = useState(false);
	let [isSuccess, setIsSuccess] = useState(false);
	let [message, setMessage] = useState("");
	let [platform, setPlatform] = useState("");
	let [group, setGroup] = useState("");
	interface Participant {
		name: string;
		grade: string;
		phone: string;
		selectedGroups: string[];
		selectableGroups: string[];
	}
	interface Team {
		teamName?: string;
		participants?: Participant[];
	}
	interface Data { eventName: string; game?: string; isTeam: boolean; currentGroup: string; schoolName: string; schoolId?: string; platform: string; teams: Team[]; participants: Participant[] }
	// Handlers
	const onSubmit = async (evdata: any) => {
		const data: Data = evdata as Data
		const isTeamEvent = ["arena-of-valor", "truth-or-debug", "otakuiz", "code-klash", "pitstop"].includes(eventName);
		data["eventName"] = eventName;
		data["game"] = router.query.game as string ?? "";
		data["isTeam"] = isTeamEvent;
		data["currentGroup"] = group;
		data["platform"] = platform;
		data["schoolId"] = `${data["schoolName"].toLowerCase().replaceAll(" ", "")}@nutopia.in`
		setIsRegistering(true);
		if (data.isTeam) {
			const TeamNameListSize = new Set(data.teams.map((team: any) => team.teamName)).size;
			if (data.teams.length !== TeamNameListSize) {
				setIsError(true);
				setIsSuccess(false);
				setMessage(`Cannot use same Team Name for multiple teams.`);
				return;
			}
			data.teams.forEach((team: any, index: number) => {
				if (isError) return;
				const phoneListSize = new Set(team.participants.flat().map((participant: any) => participant.phone)).size;
				if (phoneListSize !== team.participants.flat().length) {
					setIsError(true);
					setIsSuccess(false);
					setMessage(`Cannot use same phone number for multiple participants. (Check Team ${index + 1})`);
					return;
				}
			});
		} else {
			const phoneListSize = new Set(data.participants.flat().map((participant: any) => participant.phone)).size;
			if (phoneListSize !== data.participants.flat().length) {
				setIsError(true);
				setIsSuccess(false);
				setMessage(`Cannot use same phone number for multiple participants.`);
				return;
			}
		}
		if (isError) return;
		console.log(data["teams"])
		const response = await axios
			.post("/api/register", {
				...data,
			})
			.then((response: any) => response.data)
			.catch((err: any) => {
				setIsError(true);
				setMessage("An Error Occurred. Please Try Again.");
				if (err.response.data.message)
					setMessage(err?.response?.data?.message ?? "An Error Occurred. Please Try Again.");
			});

		if (response) {
			setIsError(!response.success);
			setIsSuccess(response.success);
			setMessage(response.message);
		}
	};

	useEffect(() => {
		let timeline = anime.timeline({
			easing: "linear",
			direction: "forwards",
			delay: anime.stagger(100),
			duration: 1000,
			loop: true,
		});

		timeline.add({
			targets: ".throbber_section",
			keyframes: [{ scale: 0 }, { scale: 1 }, { scale: 0 }],
		});

		if (isSuccess || isError) {
			timeline.restart();
			timeline.pause();
		}
	});

	const getSchools = async () => {
		const schools: { schoolId: string; schoolName: string }[] = Schools.map((school) => {
			return { schoolId: school.schoolId, schoolName: school.schoolName };
		});

		setSchools(schools);
		return schools;
	};

	const methods = useForm({
		mode: "onSubmit",
		reValidateMode: "onChange",
		criteriaMode: "all",
		shouldUnregister: true,
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

	useEffect(() => {
		getSchools();

		switch (eventName) {
			case "arena-of-valor":
				/* Set Participants and Group */
				switch (router.query.game) {
					case "valorant":
					case "freefire":
						setParticipants([4]);
						setGroup("D");
						break;
					case "bgmi":
					case "cod":
						setParticipants([3]);
						setGroup("D");
						break;
					case "fifa":
					case "minecraft":
						setParticipants([2]);
						setGroup("C");
						break;
				}
				/* Set Platform */
				switch (router.query.game) {
					case "valorant":
					case "minecraft":
						setPlatform("pc");
						break;
					case "fifa":
						setPlatform("console");
						break;
					case "cod":
					case "bgmi":
					case "freefire":
						setPlatform("mobile");
						break;
				}
				break;

			case "knockout":
				setParticipants([1]);
				setGroup("C");
				break;

			case "truth-or-debug":
				setParticipants([2]);
				setGroup("A");
				break;

			case "log-and-blog":
				setParticipants([1]);
				setGroup("A");
				break;

			case "designscape":
				setParticipants([1]);
				setGroup("B");
				break;

			case "otakuiz":
				setParticipants([3]);
				setGroup("C");
				break;

			case "pitstop":
				setParticipants([4]);
				setGroup("A");
				break;

			case "code-klash":
				setParticipants([3]);
				setGroup("B");
				break;
		}
	}, [eventName, router]);
	const addNewTeam = () => {
		let newTeam;
		let participantCount = 1;
		switch (eventName) {
			case "arena-of-valor":
				switch (router.query.game) {
					case "valorant":
					case "freefire":
						participantCount = 4;
						break;
					case "bgmi":
					case "cod":
						participantCount = 3;
						break;
					case "fifa":
					case "minecraft":
						participantCount = 2;
						break;
				}
				break;

			case "knockout":
				participantCount = 1;
				break;

			case "truth-or-debug":
				participantCount = 2;
				break;

			case "log-and-blog":
				participantCount = 1;
				break;

			case "designscape":
				participantCount = 1;
				break;

			case "otakuiz":
				participantCount = 3;
				break;

			case "pitstop":
				participantCount = 4;
				break;

			case "code-klash":
				participantCount = 3;
				break;
		}
		setParticipants([...Participants, participantCount]);
	};
	const removeTeam = () => {
		if (Participants.length > 1) Participants.splice(-1, 1);
		setParticipants([...Participants]);
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
						) : (
							isSuccess && (
								<>
									<h2>{message}</h2>
									<div id="ok_btn" className={styles.reset_form_btn} onClick={() => resetFields()}>
										Ok
									</div>
								</>
							)
						)}
					</div>
				)}
				<h2 className={styles.form_title}>{title}</h2>
				<div className={styles.form_fields}>
					<div className={styles.form_input}>
						<label htmlFor="schoolName">School:</label>
						<input
							className={methods.getFieldState("schoolName").error && `${styles.error}`}
							required={true}
							placeholder="Enter School Name"
							{...methods.register("schoolName", {
								required: true
							})}
						/>
						<ErrorMessage
							errors={methods.formState.errors}
							name={"schoolName"}
							render={({ messages }) =>
								messages &&
								Object.entries(messages).map(([type, message]) => {
									return (
										<p className={styles.input_error} key={type}>
											{message}
										</p>
									);
								})
							}
						/>
						<label htmlFor="schoolEmail">School Email:</label>
						<input
							className={methods.getFieldState("schoolEmail").error && `${styles.error}`}
							required={true}
							placeholder="Enter School Name"
							{...methods.register("schoolEmail", {
								required: true,
								pattern: {
									// Email Regex
									value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
									message: "Enter a valid Email ID"
								}
							})}
						/>
						<ErrorMessage
							errors={methods.formState.errors}
							name={"schoolEmail"}
							render={({ messages }) =>
								messages &&
								Object.entries(messages).map(([type, message]) => {
									return (
										<p className={styles.input_error} key={type}>
											{message}
										</p>
									);
								})
							}
						/>
					</div>
					{Participants.map((participantCount: any, index: number) => {
						return <Team maxParticipants={participantCount} key={`T${participantCount}.${index}`} index={index} />;
					})}
				</div>
				<hr />
				<div className={styles.addteam}>
					<input name="addteam" type={"button"} onClick={addNewTeam} value="Add New Team" />
				</div>
				<div className={styles.removeteam}>
					<input
						name="removeteam"
						type={"button"}
						onClick={removeTeam}
						value="Remove Previous Team"
						disabled={Participants.length === 1 ? true : false}
					/>
				</div>
				<div className={styles.submit}>
					<input name="register" type={"submit"} value="Register" />
				</div>
			</form>
		</FormProvider>
	);
};

export default RegistrationForm;
