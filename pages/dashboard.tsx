//components
import HeadTemplate from "../components/HeadTemplate"
import Layout from "../components/Layout"

import styles from '../styles/pages/Contact.module.scss'
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"

export const Dashboard = () => {

	const [userData, setUserData] = useState<any>({
		schoolName: "",
		schoolId: "",
		email: ""
	})
	
	useEffect(() => {
		getUserData()
	}, [])

	const getUserData = async () => { 
		const data = await fetch('https://api.nutopia.in/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				userToken: localStorage.getItem('userToken')
			})
		}).then(response => response.json()).then(data => {return data})

		if (data.success) {
			console.log(data)
			setUserData(data.user)
		}
	}

	const getUserRegistrations = async () => {
		const registrationsCollection = collection(firestore, "registrations_season_2")

		const userDocQuery = query(registrationsCollection, where("userId", "==", userData.userId))

		const userDocumentsSnapshot = await getDocs(userDocQuery)

		const userDocuments = userDocumentsSnapshot.docs.map(doc => {
			return doc
		})


	}

    return (<>
        <HeadTemplate title="NuTopia | Contact Us" description="View Our Contact Information"/>
        <Layout overrideClasses={styles.main}>
			<div>
				<h2>Your School</h2>
				<p>School Name: {userData.schoolName}</p>
				<p>School ID: {userData.schoolId}</p>
				<p>School Email: {userData.email}</p>
			</div>

			<div>
				<h2>Your Registrations</h2>

			</div>

		</Layout>
	</>)
}

export default Dashboard