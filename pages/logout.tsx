import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeadTemplate from "../components/HeadTemplate";
import Layout from "../components/Layout";

const Logout = () => {

	const [message, setMessage] = useState("")
	const [userToken, setUserToken] = useState<string | null>('')

	useEffect(() => {
        setUserToken(localStorage.getItem('userToken'))
    }, [])

	const router = useRouter()

	const logout = async () => {

		const response = await fetch(`https://api.nutopia.in/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Access-Controll-Allow-Origin": "*",
			},
			body: JSON.stringify({
				userToken: userToken
			})
		}).then(res => res.json())
		.then(data => {
			if(data.success) {
				localStorage.removeItem("userToken")
				setMessage(data.message)
			}
			return data
		})

		if (response.success) {
			localStorage.setItem("userToken", response.userToken)
		}
		router.push("/")
	}

	useEffect(() => {
		logout()
	}, [])

	return (<>
		<HeadTemplate title="NuTopia | Login" description="Login"/>
		<Layout>
			<h1 id="title">Login</h1>
			<div>
				{message}
			</div>
		</Layout>
	</>)
}

export default Logout