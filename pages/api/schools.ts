import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "../../firebase/clientApp";
import { titleCase } from "../../functions";

export default async function schools(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") return res.status(400).json({ success: false, message: "Bad method" });

	const schoolCollection = collection(firestore, "school_login_accounts");
	// console.log(schoolCollection)
	const schoolArr: Array<any> = [
		{ schoolName: "YuvaBharathi Public School" , schoolId:"YuvaBharathi Public School" },
		{ schoolName: "Delhi Public School" , schoolId:"Delhi Public School" },
		{ schoolName: "The Indian Public School", schoolId:"The Indian Public School" },
		{ schoolName: "Chandraganthi Public School" , schoolId:"Chandraganthi Public School" },
	];
	// const schoolSnapshot = await getDocs(query(schoolCollection, orderBy("schoolName", "asc")));
	// console.log(schoolSnapshot.docs)
	// schoolSnapshot.docs.forEach((doc) => {
	//   schoolArr.push({ schoolName: doc.get("schoolName"), schoolId: doc.get("schoolId") });
	// });

	res.status(200).json({ success: true, message: schoolArr });
}
