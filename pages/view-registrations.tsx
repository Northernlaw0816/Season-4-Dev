import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { query, where, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

//components
import Layout from '../components/Layout'
//stylesheets
import styles from '../styles/pages/view-registrations.module.scss'
import Effects from '../styles/Effects.module.scss'
import { getRegistrationsCollection } from '../functions'

const ViewRegistrations: NextPage = () => {

	const [viewEvent, setViewEvent] = useState<"aov-mobile" | "aov-console" | "aov-pc" | "knock-out" | "truth-or-debug" | "log-and-blog" | "designscape" | "otakuiz">("aov-pc")
	const [participants, setParticipants] = useState<Array<any>>([])

	useEffect(() => {

		// get registrations collection
		const registrations = getRegistrationsCollection()
		// set the default query
		let getEventsQuery = query(registrations, where("event", "==", viewEvent))
		// set query based on platform for AoV
		if (viewEvent == "aov-mobile") {
			getEventsQuery = query(registrations, where("event", "==", "arena-of-valor"), where("platform" , "==", "mobile"))
		} else if (viewEvent == "aov-console") {
			getEventsQuery = query(registrations, where("event", "==", "arena-of-valor"), where("platform" , "==", "console"))
		} else if (viewEvent == "aov-pc") {
			getEventsQuery = query(registrations, where("event", "==", "arena-of-valor"), where("platform" , "==", "pc"))
		}

		// subscribe to live changes to firestore collection
		const unsubscribe = onSnapshot(getEventsQuery, (snapshot) => {
			// get the registration documents from the snapshot
			const registrations: QueryDocumentSnapshot<DocumentData>[] = []
			snapshot.forEach(doc => {
				registrations.push(doc)
			})

			//extract participants from registration documents
			const participants:any[] = [] 
			registrations.map(registration => {
				registration.get("participants").forEach((participant: any) => {
					participant["event"] = registration.get("event")
					// conditionally add fields from the registration to each participant
					if ( registration.get("event") === "arena-of-valor" ) {
						participant["platform"] = registration.get("platform")
						if ( registration.get("platform") === "mobile" ) {
							participant["game"] = registration.get("game")
						}
					}
					//add team name if team event
					if (["arena-of-valor", "truth-or-debug", "otakuiz"].includes(registration.get("event"))) {
						participant["teamName"] = registration.get("teamName")
					}
					// add participant to list
					participants.push(participant)
				})
			})
			// set the participant state so that it's rendered on the webpage
			setParticipants(participants)
		})

	}, [viewEvent])


	return(
		<>
			<Head>
				<title>NuTopia | View Registrations</title>
			</Head>

			<Layout skipTo="" overrideClasses={styles.main}>
				<div className={styles.view_button_container}>
					<button className={`${styles.view_button} ${Effects.button_hover_effect}`} onClick={() => setViewEvent("aov-mobile")}>AOV Mobile</button>
					<button className={`${styles.view_button} ${Effects.button_hover_effect}`} onClick={() => setViewEvent("aov-console")}>AOV Console</button>
					<button className={`${styles.view_button} ${Effects.button_hover_effect}`} onClick={() => setViewEvent("aov-pc")}>AOV PC</button>
					<button className={`${styles.view_button} ${Effects.button_hover_effect}`} onClick={() => setViewEvent("knock-out")}>KO</button>
					<button className={`${styles.view_button} ${Effects.button_hover_effect}`} onClick={() => setViewEvent("truth-or-debug")}>TD</button>
					<button className={`${styles.view_button} ${Effects.button_hover_effect}`} onClick={() => setViewEvent("log-and-blog")}>Lab</button>
					<button className={`${styles.view_button} ${Effects.button_hover_effect}`} onClick={() => setViewEvent("designscape")}>DS</button>
					<button className={`${styles.view_button} ${Effects.button_hover_effect}`} onClick={() => setViewEvent("otakuiz")}>OTK</button>
				</div>

				<h1>{participants[0]?.event}</h1>

				<div className={styles.table_scroll_container}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>S.No</th>
								<th>Name</th>
								<th>Grade</th>
								<th>Email</th>
								<th>Phone</th>
								{viewEvent === "aov-mobile" && <th>Game</th>}
								{["aov-mobile", "aov-console", "aov-pc", "truth-or-debug", "otakuiz"].includes(viewEvent) && <th>Team Name</th>}
							</tr>
						</thead>
						<tbody>
							{participants.map((participant, index) => {
								return(
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{participant.name}</td>
										<td>{participant.grade}</td>
										<td>{participant.email}</td>
										<td>{participant.phone}</td>
										{
											participant.platform === "mobile" && <td>{participant.game}</td>
										}
										{
											["arena-of-valor", "truth-or-debug", "otakuiz"].includes(participant.event) && <td>{participant.teamName}</td>
										}
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</Layout>
		</>
	)
}

export default ViewRegistrations