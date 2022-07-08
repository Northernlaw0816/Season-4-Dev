import { useForm } from "react-hook-form";
import HeadTemplate from "../components/HeadTemplate";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

import styles from '../styles/pages/Login.module.scss'

const Login = () => {
	const {
		register,
		formState: { errors },
		getValues,
		handleSubmit,
	} = useForm({ mode: "onSubmit", shouldUnregister: true})

	const router = useRouter()
	
	const onSubmit = async (data: any) => {
		console.log(data)

		const response = await fetch(`https://api.nutopia.in/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Access-Controll-Allow-Origin": "*",
			},
			body: JSON.stringify({...data})
		})
		.then(response => response.json())
		.then(data => {return data})
		.catch(err => console.log(err))

		if (response.success) {
			localStorage.setItem("userToken", response.userToken)
			router.push("/")
		}
	}

	return (<>
		<HeadTemplate title="NuTopia | Login" description="Login"/>
		<Layout overrideClasses={styles.main}>
			<div className={styles.form_container}>
				<h1 id="title">Login</h1>
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
						<input type={'submit'} value="Login" />
						</div>
				</form>
			</div>
		</Layout>
	</>)
}

export default Login
