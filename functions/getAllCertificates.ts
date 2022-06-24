import { firestore } from "../firebase/clientApp"
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore"

const getAllCertificates = async () => {
	const certCollection = collection(firestore, "certificates")

	const certificatesSnapshot = await getDocs(certCollection)

	const certificates: QueryDocumentSnapshot<DocumentData>[] = []
	certificatesSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
		certificates.push(doc)
	})

	return certificates

}

export default getAllCertificates