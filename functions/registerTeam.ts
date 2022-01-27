import { firestore } from "../firebase/clientApp"

import { addDoc, Timestamp } from "firebase/firestore"
import getRegistrationsCollection from "./getRegistrationsCollection"

const registerTeam = async (data: any) => {
	const collection = getRegistrationsCollection()
	const registration = await addDoc(collection, {
		...data,
		registrationDate: Timestamp.now()
	})
	console.log(registration.id)
}

export default registerTeam