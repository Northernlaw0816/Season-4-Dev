import { firestore } from "../firebase/clientApp"
import { getDoc, doc, DocumentSnapshot, DocumentData } from "firebase/firestore"

const getParticipantCertificate = async (qID: string | string[] | undefined) => {
	let certID:string  = qID !== undefined ? qID.toString() : "default"
	const certDoc = getDoc(doc(firestore, "certificates", certID))
	return certDoc
}

export default getParticipantCertificate