import { DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore"
import { getRegistrationsCollection } from "."

const validateFields = async (data: any, participantsLimit: number) => {

	let error = {state: false, message: ""}

	// filter participants that have empty fields
	let filteredParticipants = data.participants.filter((el:any) => {
		el.grade = el.grade.toUpperCase()
		return el != null
	})

	// get names from filtered participants
	let names = filteredParticipants.map((participant: {name: string, grade:string, email:string}) => {
		return participant.name
	})

	// get grades from filtered participants
	let grades = filteredParticipants.map((participant: {name: string, grade:string, email:string}) => {
		return participant.grade
	})

	// get firestore registrations collection
	const registrationsCollections = getRegistrationsCollection()

	/**
	 * Check if registered for same event
	 */

	// set query
	const registeredEventsQuery = query(registrationsCollections, where('event', '==', data.event))

	// get docs that match the event
	const eventMatchedSnapshot = await getDocs(registeredEventsQuery)

	//push the query result to an array
	const eventMatchedDocs: QueryDocumentSnapshot<DocumentData>[] = []
	eventMatchedSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
		eventMatchedDocs.push(doc)
	})

	//loop through the array and check if the emails are already registered
	eventMatchedDocs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
		const participants = doc.get("participants")
		participants.forEach((participant: any) => {
			if (names.includes(participant.name) && grades.includes(participant.grade)) {
				error = {state: true, message: `${participantsLimit > 1 ? "One or more team members" : "You"} are already registered for this event`}
			}
		})
	})

	/**
	 * Check if registered for Otakuiz - Throw error if already registered for Designscape/Log and Blog 
	 */
	if (data.event === "otakuiz") {
		// set query for DS and LAB registration documents
		const dsRegistrationsQuery = query(registrationsCollections, where('event', '==', "designscape"))
		const labRegistrationsQuery = query(registrationsCollections, where('event', '==', "log-and-blog"))

		// get docs that match the queries
		const dsRegistrationSnapshot = await getDocs(dsRegistrationsQuery)
		const labRegistrationSnapshot = await getDocs(labRegistrationsQuery)

		// create a list to store the registartions
		const registrations: QueryDocumentSnapshot<DocumentData>[] = []

		// get ds registrations
		dsRegistrationSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
			registrations.push(doc)
		})

		// get lab registrations
		labRegistrationSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
			registrations.push(doc)
		})

		//loop through the array and check if the emails are registered for ds and lab
		registrations.map((doc: QueryDocumentSnapshot<DocumentData>) => {
			const participants = doc.get("participants")
			participants.forEach((participant: any) => {
				if (names.includes(participant.names) && grades.includes(participant.grade)) {
					error = { state: true, message: `${participantsLimit > 1 ? "One or more team members" : "You"} are already registered for parallel events \"Designscape\" or \"Log and Blog\".` }
				}
			})
		})
	}

	/**
	 * Check if registered for Designscape/Log and Blog - Throw error if already registered for Otakuiz
	 */
	if (data.event === "designscape" || data.event === "log-and-blog") {
		// set query for OTK registration documents
		const otakuizRegistrationsQuery = query(registrationsCollections, where('event', '==', "otakuiz"))

		// get docs that match the query
		const otakuizRegistrationSnapshot = await getDocs(otakuizRegistrationsQuery)

		// create a list to store the registartions
		const registrations: QueryDocumentSnapshot<DocumentData>[] = []

		// get otakuiz registrations
		otakuizRegistrationSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
			registrations.push(doc)
		})
	
		//loop through the array and check if the emails are registered for otakuiz
		registrations.length > 0 && registrations.map((doc: QueryDocumentSnapshot<DocumentData>) => {
			const participants = doc.get("participants")
			participants.forEach((participant: any) => {
				if (names.includes(participant.names) && grades.includes(participant.grade)) {
					error = {state: true, message: `${participantsLimit > 1 ? "One or more team members" : "You"} are already registered for parallel event \"Otakuiz\".`}
				}
			})
		})
	}

	/**
	 * If registering for !AoV Events - Throw error if already registered for !AoV Event
	 */

	if (data.event !== "arena-of-valor") {
		// set query for  registration documents that doesn't match current event	
		const otherRegistrationsQuery = query(registrationsCollections, where('event', "!=", data.event))

		// get docs that match the query
		const otherRegistrationSnapshot = await getDocs(otherRegistrationsQuery)

		// create a list to store the registartions
		const registrations: QueryDocumentSnapshot<DocumentData>[] = []

		// get other registrations
		otherRegistrationSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
			if (!doc.get('isSample')) {
				registrations.push(doc)
			}
		})

		// loop through the array and check if the emails are registered for other events
		registrations.map((doc: QueryDocumentSnapshot<DocumentData>) => {
			if (doc.get("event") != "arena-of-valor") {
				const participants = doc.get("participants")
				participants.forEach((participant: any) => {
					if (names.includes(participant.name) && grades.includes(participant.grade)) {
						error = {state: true, message: `${participantsLimit > 1 ? "One or more team members" : "You"} are already registered for one event. Please register for only one event at a time. This does not apply when registering for \"Arena of Valor\"`}
					}
				})
			}
		})
	}

	/**
	 * If registering for AoV Event - Throw error if already registered for AoV more than 3 times
	 */

	if (data.event === "arena-of-valor") {
		// set query for AoV  registration document
		const aovQuery = query(registrationsCollections, where("event", "==", data.event))

		// get docs that matches the query
		const aovRegistrationsSnapshot = await getDocs(aovQuery)

		// create list to store aov registrations
		const registrations: QueryDocumentSnapshot<DocumentData>[] = []

		// loop through the snapshot and add document to registrations list
		aovRegistrationsSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
			registrations.push(doc)
		})

		// loop through registrations and check if the participants are registered for the same platform
		registrations.map((doc: QueryDocumentSnapshot<DocumentData>) => {
			const participants = doc.get("participants")
			if (data.platform === doc.get("platform")) {
				participants.forEach((participant: any) => {
					if (names.includes(participant.name) && grades.includes(participant.grade)) {
						error = {state: true, message: `One or more team members are already registered for this platform (${data.platform}) for \"Arena of Valor\".`}
					}
				})
			}
		})
	}

	return error
}

export default validateFields