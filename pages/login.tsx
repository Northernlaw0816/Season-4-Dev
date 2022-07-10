import { useForm } from "react-hook-form";
import HeadTemplate from "../components/HeadTemplate";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

import styles from '../styles/pages/Login.module.scss'
import { useEffect, useState } from "react";

const Login = () => {
	const {
		register,
		handleSubmit,
	} = useForm({ mode: "onSubmit", shouldUnregister: true})

	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	const [isMobile, setIsMobile] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

	function getWindowWidth() {
        const {clientWidth: width} = document.body
        return width
    }

	function handleResize() {
        setWindowWidth(getWindowWidth())
        setIsMobile(windowWidth <= 600)
    }

	useEffect(() => {
        handleResize()
    
        window.addEventListener('resize', handleResize)
        return () => {
			window.removeEventListener('resize', handleResize)
		}
    })

	const router = useRouter()

	const onSubmit = async (data: any) => {
		setIsLoading(true)
		let response = await axios.post("/api/login", {...data}).then(res => res.data).catch(err => {
			setIsLoading(false)
			setMessage(err.response.data.message)
		})

		if (response && response.success) {
			localStorage.setItem("userToken", response.userToken)

			const userData = await axios.post("/api/user", {userToken: response.userToken}).then(res => res.data).catch(err => {
				setIsLoading(false)
				setMessage(err.response.data.message)
			})

			if (userData.success) {
				localStorage.setItem("schoolName", userData.user.schoolName)
				localStorage.setItem("schoolId", userData.user.schoolId)
				localStorage.setItem("email", userData.user.email)
				router.push("/")
			}
		} else if (response && !response.success) {
			setIsLoading(false)
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
						<div className={styles.password_field}>
							<input {...register("user.password", {required: true})} type={showPassword ? "text" : "password"}/>
							{!isMobile ? <div onMouseDown={() => {setShowPassword(true)}} onMouseUp={() => {setShowPassword(false)}} onMouseLeave={() => {setShowPassword(false)}} className={styles.eye}>{showPassword ? "" : ""}</div> : <div onClick={() => {setShowPassword(!showPassword)}} className={styles.eye}>{showPassword ? "" : ""}</div>}
						</div>
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
