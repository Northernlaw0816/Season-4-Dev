import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

export default async function handler(req:any, res:any) {
	const { userToken } = req.body;
	// Database code here
	const accountsCollection = collection(firestore, "school_login_accounts");
	const userTokenQuery = query(accountsCollection, where("userToken", "==", userToken));
	const userDocumentSnapShot = await getDocs(userTokenQuery).catch((err) => {
	  return res.status(400).json({
		success: false,
		error: err,
	  });
	});


	const userDocuments: any[] = [];
	userDocumentSnapShot.forEach((doc:any) => {
	  userDocuments.push(doc);
	});
  
	let success = userDocuments.length > 0;
  
	const userDocument = userDocuments[0];
  
	const userData = userDocument.data();
  
	if (!success) {
	  return res.status(404).json({
		success: false,
		error: "User not found",
	  });
	}
  
	res.status(200).json({
	  success: success,
	  user: {
		schoolName: userData.schoolName,
		schoolId: userData.schoolId,
		email: userData.email,
	  },
	});
  }