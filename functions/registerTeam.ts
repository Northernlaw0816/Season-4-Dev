import { addDoc, Timestamp } from "firebase/firestore"
import getRegistrationsCollection from "./getRegistrationsCollection"
import { FormFields } from "./interface"

const registerTeam = async (data: FormFields) => {
	const collection = getRegistrationsCollection()
	await addDoc(collection, {
		...data,
		registrationDate: Timestamp.now()
	})
}

export default registerTeam