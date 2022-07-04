import { useState } from "react"
import { UseFormRegister } from "react-hook-form"

//stylesheets
import styles from "../styles/components/RegistrationForm.module.scss"

const ParticipantFields = ({index, register, form: {errors, getValues, setError}, participantsLimit}: {index: number, register: UseFormRegister<any>, form: {errors: any, getValues: any, setError: any}, participantsLimit: number}) => {

	const [memberError, setMemberError] = useState<string>("")

	const onChangeHandler = () => {
		let message = ""


		setTimeout(() => {
			if (errors.participants && errors.participants[index]) {
				const fieldGroup = errors.participants[index]
				for(let [field] of Object.entries(fieldGroup)) {
					message = fieldGroup[field].message
				}
			}
			setMemberError(message)
		}, 100)
	}

	const fieldName = index == 0 ?  "Team Representative" : `Member ${index+1}`

	return (
		<div className={styles.member_input}>
			<label htmlFor={"participants."+index+".name"}>{fieldName}</label>
			<input
				type="text"
				placeholder="Name"
				id={"participants."+index+".name"}
				className={errors.participants && errors.participants[index] && errors.participants[index].name?.message && styles.error_field}
				{...register("participants."+index+".name", {
					required: `${fieldName}'s Name Is Required`,
					onChange: onChangeHandler,
					shouldUnregister: true,
					minLength: {
						value: 3,
						message: `${fieldName}'s Name Must Be At Least 3 Characters`
					}
				})}
			/>

			<label htmlFor={"participants."+index+".grade"}>Grade and Section</label>
			<input
				type="text"
				placeholder="e.g: 11 A2"
				id={"participants."+index+".grade"}
				className={errors.participants && errors.participants[index] && errors.participants[index].grade?.message && styles.error_field}
				{...register("participants."+index+".grade", {
					required: "Grade Is Required",
					onChange:  onChangeHandler,
					shouldUnregister: true,
					pattern: {
						value: /^[9,10,11,12]\s+/i,
						message: "Enter A Valid Grade"
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

export default ParticipantFields