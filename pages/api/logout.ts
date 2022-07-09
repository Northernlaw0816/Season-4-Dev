import { collection, deleteField, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

export default async function handler(req:any, res:any) {

	if (req.method === 'GET') {
		res.status(200).json({
			message: "Logout endpoint"
		})
	}

	const { userToken } = req.body;

	const accountsCollection = collection(firestore, "school_login_accounts");

	const userDocumentSnapshot = await getDocs(query(accountsCollection, where("userToken", "==", userToken)))

	const schoolIds:string[] = []

	userDocumentSnapshot.forEach(account => {
		schoolIds.push(account.get('schoolId'))
	})

	if (schoolIds.length === 0) {
		return res.status(200).json({
			success: false,
			message: "User not found"
		})
	}

	try {
		await updateDoc(doc(accountsCollection, schoolIds[0]), {
			userToken: deleteField()
		});
	} catch {
		return res.status(400).json({
		success: false,
		message: "Couldn't log you out, please try again",
		});
	}

	res.status(200).json({
		success: true,
		message: "Successfully logged out",
		schoolIds: schoolIds
	});
}
