import { ReactNode, useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import anime from "animejs";
import axios from "axios";
import { useRouter } from "next/router";

//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss";

const Participants = ({ maxParticipants, required }: any) => {
	const {
		register,
		formState: { errors },
		getFieldState,
	} = useFormContext();

	const participantsList: ReactNode[] = [];

	for (let i = 0; i < maxParticipants; i++) {
		let nameFieldName = `${maxParticipants > 1 ? "team." : ""}participants.${i}.name`;
		let gradeFieldName = `${maxParticipants > 1 ? "team." : ""}participants.${i}.grade`;
		let phoneFieldName = `${maxParticipants > 1 ? "team." : ""}participants.${i}.phone`;

		participantsList.push(
			<div key={i} className={styles.form_input}>
				{/* NAME */}
				<label htmlFor={nameFieldName}>Participant {`${i + 1}: `}</label>
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
					{[9, 10, 11, 12].map((grade, index) => <option value={grade} key={index}>{grade}</option>)}
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
			</div>
		);
	}

	return <>
		{participantsList.map((participant) => {
			return participant
		})}
	</>;
};

const Team = ({ maxParticipants }: any) => {
	const {
		register,
		formState: { errors },
		getFieldState,
	} = useFormContext();

	let fieldName = `team.teamName`;

	return (
		<>
			{maxParticipants > 1 && (
				<>
					<div className={styles.form_input}>
						<label htmlFor={fieldName}>Team Name: </label>
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
				</>
			)}
			<Participants maxParticipants={maxParticipants} required={true} />
		</>
	);
};

const RegistrationForm = ({title, event}: {title: string, event: string}) => {
	const router = useRouter();
	
	let [schools, setSchools] = useState<any>([]);
	let [formBody, setFormBody] = useState<any>(<></>);

	let [isRegistering, setIsRegistering] = useState<boolean>(false);
	let [isError, setIsError] = useState(false);
	let [isSuccess, setIsSuccess] = useState(false);
	let [message, setMessage] = useState("");

	// Handlers
	const onSubmit = async (data: any) => {
		setIsRegistering(true);
		const response = await axios
			.post("/api/register", {
				...data,
			})
			.then((response: any) => response.data)
			.catch((err: any) => {
				setIsError(true);
				setMessage("An Error Occurred. Please Try Again.");
				if (err.response.data.message) setMessage(err.response.data.message);
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
		const response = await axios
			.get("/api/schools")
			.then((response: any) => response.data)
			.catch((err: any) => {
				console.log(err);
			});
		
		const schools: string[] = [];
		
		response.message.forEach((school: any) => {
			schools.push(school as string);
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
		getSchools()

		switch (event) {
			case "arena-of-valor":
				switch (router.query.game) {
					case "valorant":
					case "freefire":
						setFormBody(<Team maxParticipants={4} />);
						break;
					case "bgmi":
					case "cod":
						setFormBody(<Team maxParticipants={3} />);
						break;
					case "fifa":
					case "minecraft":
						setFormBody(<Team maxParticipants={2} />);
						break;
				}
				break;

			case "knockout":
				setFormBody(<Team maxParticipants={1} />);
				break;

			case "truth-or-debug":
				setFormBody(<Team maxParticipants={2} />);
				break;

			case "log-and-blog":
				setFormBody(<Team maxParticipants={1} />);
				break;

			case "designscape":
				setFormBody(<Team maxParticipants={2} />);
				break;

			case "otakuiz":
				setFormBody(<Team maxParticipants={3} />);
				break;

			case "pitstop":
				setFormBody(<Team maxParticipants={4} />);
				break;

			case "code-clash":
				setFormBody(<Team maxParticipants={3} />);
				break;
		}
	}, [event, router]);

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
						<label htmlFor="schoolId">School:</label>
						<select {...methods.register("schoolId", {
							required: true,
							validate: (val) => {
								if (val === "default-school") {
									return "Select your School";
								}
								return undefined;
							},
						})}>
							<option value="default-school">Select Your School</option>
							{schools.map((school: any, index: number) => {
								return (
									<option key={index} value={school.schoolId}>
										{school.schoolName}
									</option>
								);
							})}
						</select>
						<ErrorMessage
							errors={methods.formState.errors}
							name={"schoolId"}
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
					{formBody}
				</div>
				<div className={styles.submit}>
					<input name="register" type={"submit"} value="Register" />
				</div>
			</form>
		</FormProvider>
	);
};

export default RegistrationForm;
