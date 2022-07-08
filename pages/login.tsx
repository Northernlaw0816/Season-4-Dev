import { useForm } from "react-hook-form";
import HeadTemplate from "../components/HeadTemplate";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

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

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
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
		<Layout>
			<h1 id="title">Login</h1>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input {...register("user.schoolId", {required: true})}/>
					<input {...register("user.password", {required: true})}/>
					<input type={'submit'} value="Login" />
				</form>
			</div>
		</Layout>
	</>)
}

export default Login
