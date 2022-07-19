import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

import { firestore } from "../../firebase/clientApp";
import { titleCase } from "../../functions";

export default async function schools(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(400).json({ success: false, message: "Bad method" });

  const schoolCollection = collection(firestore, "school_login_accounts");
  const schoolArr: Array<any> = [];
  const schoolSnapshot = await getDocs(query(schoolCollection, orderBy("schoolName", "asc")));
  schoolSnapshot.docs.forEach((doc) => {
    schoolArr.push({ schoolName: doc.get("schoolName"), schoolId: doc.get("schoolId") });
  });
  res.status(200).json({ success: true, message: schoolArr });
}
