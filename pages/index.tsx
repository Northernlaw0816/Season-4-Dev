import { collection, DocumentData, getDocs, orderBy, Query, query, QueryDocumentSnapshot, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import HeadTemplate from "../components/HeadTemplate"
import Layout from "../components/Layout"
import { firestore } from "../firebase/clientApp"
import { filterString } from "../functions"

const Certificates = () => {

	let [certificates, setCertificates] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
	let [names, setNames] = useState<string[]>([])
	
	const getAllCertificates = async (name?: string | string[]) => {
		setNames([] as string[])

		const certCollection = collection(firestore, "certificates")

		let nameQuery: Query | null = null

		if (typeof(name) == "object") {
			nameQuery = query(certCollection, where("name", "in", name))
		} else {
			nameQuery = name ? query(certCollection, where("name", "==", name)) : query(certCollection, orderBy("name", "asc"))
		}

		const certificatesSnapshot = await getDocs(nameQuery)

		const certificatesRef: QueryDocumentSnapshot<DocumentData>[] = []
		const namesRef: string[] = []
		certificatesSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
			certificatesRef.push(doc)
			namesRef.push(doc.get("name"))
		})

		setCertificates(certificatesRef)
		setNames(namesRef)
	}

	useEffect(() => {
		getAllCertificates()
	}, [])
	
	const { register, getValues } = useForm<{
		search: string
	}>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		delayError: 200
	})

	const handleChange = () => {
		let value = getValues("search")	
		let filteredList = filterString(names, value)

		console.log(`search string: ${value}`)
		console.log(filteredList)

		if (value != "") {
			console.log("Not Empty String")
			if (filteredList.length <= 0) {
				setCertificates([])
				console.log("Not Found")
			} else {
				getAllCertificates(filteredList)
				console.log("Found")
			}
		} else {
			getAllCertificates()
		}
	}

	return (<>
		<HeadTemplate title="NuTopia | Certificates Search" description="Search for your digital certificate for participating and/or winning in a NuTopia Event"/>
		
		<Layout>
			<div style={{paddingBlockStart: "1em", paddingInline: "clamp(10%, 1rem, 2%)", display: "grid", gap: "1em", placeItems: "center", gridTemplateColumns: "auto 1fr"}}>
				<span style={{fontWeight: "bold", fontSize: "1.25rem"}}>Search </span><input style={{width: "100%", padding: "1em", outline: "none", border: "none", background: "var(--primary)", color: "white"}} type="search" placeholder="Your Name" {...register("search", {
					required: true,
					onChange:  handleChange,
					validate: value => value != ""
				})}/>
			</div>

			<div style={{display: "grid", gap: "1em", gridTemplateColumns: "repeat(4, minmax(4em, 1fr))", padding: "1em"}}>
				{certificates?.map((cert, index) => {
					return (<div key={index}>
						<p>Name: {cert.get("name")}</p>
						<p>Grade: {cert.get("grade")}</p>
						<p>Event: {cert.get("event")}</p>
						<p>{cert.get("winner") ? "Winner" : "Participant"}</p>
					</div>)
				})}
			</div>
		</Layout>
	</>)
}

export default Certificates