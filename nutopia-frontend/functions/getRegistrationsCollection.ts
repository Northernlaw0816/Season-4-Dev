import { firestore } from "../firebase/clientApp"

import { collection } from "firebase/firestore"

const getRegistrationsCollection = () => {
	return collection(firestore, 'registrations')
}

export default getRegistrationsCollection