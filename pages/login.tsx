import { useForm } from "react-hook-form";
import HeadTemplate from "../components/HeadTemplate";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

import styles from '../styles/pages/Login.module.scss'
import { useState } from "react";

const Login = () => {
	const {
		register,
		handleSubmit,
	} = useForm({ mode: "onSubmit", shouldUnregister: true})

	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState("")

	const router = useRouter()

	const onSubmit = async (data: any) => {
		setIsLoading(true)
		let response = await axios.post("/api/login", {...data}).then(res => res.data)

		if (response.success) {
			localStorage.setItem("userToken", response.userToken)

			const userData = await axios.post("/api/user", {userToken: response.userToken}).then(res => res.data)

			if (userData.success) {
				localStorage.setItem("schoolName", userData.user.schoolName)
				localStorage.setItem("schoolId", userData.user.schoolId)
				localStorage.setItem("email", userData.user.email)
				router.push("/")
			}

		} else {
			setMessage(response.message)
		}

		setIsLoading(false)
	}

	return (<>
		<HeadTemplate title="NuTopia | Login" description="Login"/>
		<Layout overrideClasses={styles.main}>
			<div className={styles.form_container}>
				<h1 id="title">Login</h1>
				<p>{message}</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.field_section}>
						<label htmlFor="user.schoolId">School ID</label>
						<input {...register("user.schoolId", {required: true})}/>
					</div>

					<div className={styles.field_section}>
						<label htmlFor="user.password">Password</label>
						<input {...register("user.password", {required: true})}/>
					</div>

					<div className={styles.submit}>
						<input type={'submit'} value={isLoading ? "↺" : "Login"} disabled={isLoading}/>
					</div>
				</form>
			</div>
		</Layout>
	</>)
}

export default Login
