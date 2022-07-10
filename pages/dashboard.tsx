//components
import HeadTemplate from "../components/HeadTemplate"
import Layout from "../components/Layout"

import styles from '../styles/pages/Dashboard.module.scss'
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/clientApp"
// import { titleCase } from "../functions"

export const Dashboard = () => {

	const [userData, setUserData] = useState<any>({
		schoolName: "",
		schoolId: "",
		email: ""
	})

	const [userRegistrations, setUserRegistrations] = useState<any>([])

	const getUserData = () => { 
		const data = {
			schoolName: localStorage.getItem("schoolName"),
			schoolId: localStorage.getItem("schoolId"),
			email: localStorage.getItem("email")
		}

		setUserData(data)
	}

	const getUserRegistrations = async () => {
		const registrationsCollection = collection(firestore, "registrations_season_2")

		const userDocQuery = query(registrationsCollection, where("schoolId", "==", userData.schoolId))

		const userDocumentsSnapshot = await getDocs(userDocQuery)

		const userDocuments: any[] = [] 

		userDocumentsSnapshot.forEach(doc => {
			return userDocuments.push(doc)
		})

		setUserRegistrations(userDocuments)
	}
	
	useEffect(() => {
		getUserData()
	}, [])

	useEffect(() => {
		getUserRegistrations()
	}, [userData])

    return (<>
        <HeadTemplate title="NuTopia | Contact Us" description="View Our Contact Information"/>
        <Layout overrideClasses={styles.main}>

			<h1>Dashboard</h1>

			<div className={styles.layout}>
				<div className={styles.user_card}>
					<h2>Your School</h2>
					<h3>School Name:</h3> <p>{userData.schoolName}</p>
					<h3>School ID:</h3> <p>{userData.schoolId}</p>
					<h3>School Email:</h3> <p>{userData.email}</p>
				</div>
				<div className={styles.registrations_container}>
					<h2>Your Registrations</h2>
					<div className={styles.card_container}>
					{userRegistrations.map((registration:any, index:number) => {
						let registrationData = registration.data()

						let game = <></>			
				
						return (
							<div className={styles.registration_card} key={index}>
								<h3>{registrationData.event.replaceAll("-", " ")}{registrationData.event === "arena-of-valor" && ` - ${registrationData.platform}`}</h3>
								{registrationData.teams && <p><strong>Teams</strong></p>}
								<div className={styles.teams_container}>
									{registrationData.teams && registrationData.teams.map((team:any, index:number) => {
									
										if (registrationData.event === "arena-of-valor") {
											if (registrationData.platform === "pc") {
												game = <p><strong>{index === 0 ? "Valorant" : "CS:GO"}</strong></p>
											} else if (registrationData.platform === "console") {
												game = <p><strong>{index === 0 ? "Fortnite" : "Rocket League"}</strong></p>
											} else if (registrationData.platform === "mobile"){
												game = <p><strong>{index < 2 ? "Call of Duty" : "BGMI"}</strong></p>
											}
										}
										return (<>
											{index > 0 && <hr/>}
											{game}
											<div key={index} style={{textAlign: "left"}}>
									
												<p><strong>Team Name:</strong> {team.teamName}</p>
												<div>
													{team.participants.map((participant:any, index:any) => {
														return (<>
															<div key={index} style={{margin: "0 1em"}}>
																{index > 0 && <hr/>}
																<p><strong>Participant {index+1}:</strong> {participant.name}</p>
																<p><strong>Grade:</strong> {participant.grade}</p>
																<p><strong>Phone:</strong> {participant.phone}</p>
															</div>
														</>)
													})}
												</div>
											</div>
										</>)
									})}
								</div>
								
								{registrationData.participants && <p><strong>Participants</strong></p>}
								{registrationData.participants && registrationData.participants.map((participant:any, index:any) => {
									return (<>
										<div key={index} style={{textAlign: "left"}}>
											{index > 0 && <hr/>}
											<p><strong>Participant {index+1}:</strong> {participant.name}</p>
											<p><strong>Grade:</strong> {participant.grade}</p>
											<p><strong>Phone:</strong> {participant.phone}</p>
										</div>
									</>)
								})}
							</div>
						)
					})}
					</div>
				</div>
			</div>

		</Layout>
	</>)
}

export default Dashboard