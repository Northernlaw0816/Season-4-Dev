import { useRouter } from "next/router"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../firebase/clientApp"

import { getParticipantCertificate } from "../../functions"
import HeadTemplate from "../../components/HeadTemplate"
import Layout from "../../components/Layout"

const CertificateParticipant = async () => {
	const router = useRouter()
	const { qID } = router.query
	const certificateRef = await getParticipantCertificate(qID)
	console.log(getParticipantCertificate(qID))

	return (<>
		<HeadTemplate title={`Certificate | ${certificateRef.get("name")}`} description={`Certificate for Participant and/or Winner in NuTopia`}/>

		<Layout skipTo="#certificate">
			<h1>NuTopia Digital Certificate</h1>
			<div>

			</div>

		</Layout>
	</>)
}