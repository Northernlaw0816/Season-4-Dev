import { scryptSync, timingSafeEqual, randomBytes } from "crypto";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

export default async function handler(req: any, res: any) {
  let success = false;

  if (!req.body) {
    return res.status(400).json({
      success,
      message: "No body",
    });
  }

  const {
    user: { schoolId, password },
  } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const accountsCollection = collection(firestore, "school_login_accounts");

  const accountsSnapshot = await getDocs(query(accountsCollection, where("schoolId", "==", schoolId)));

  const accounts: any[] = [];

  accountsSnapshot.forEach((account) => {
    accounts.push(account);
  });

  if (accounts.length === 0) {
    return res.status(200).json({
      success,
      message: "SchoolID is incorrect. Please try again",
    });
  }

  const user = accounts[0];
  const [salt, key] = user.get("password").split(":");
  const userTokenSalt = randomBytes(16).toString("hex");
  const userToken = scryptSync(schoolId, userTokenSalt, 16);

  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");

  success = timingSafeEqual(hashedBuffer, keyBuffer);
  let UserToken = userToken.toString("hex");
  const checkUsrDocumentSnapshot = await getDocs(query(accountsCollection, where("schoolId", "==", schoolId)));

  checkUsrDocumentSnapshot.forEach((usr) => {
    if (usr.get("userToken")) {
      return res.status(200).json({
        success: false,
        message: "Already logged in on a different device",
      });
    }
  });

  try {
    if (success) {
      await updateDoc(doc(accountsCollection, schoolId), {
        userToken: userToken.toString("hex"),
      });
      return res.status(200).json({ message: "Successfully logged in", success: true, userToken: UserToken });
    }
  } catch (e) {
    return res.status(500).json({ message: e, success: false });
  }
  return res.status(400).json({ message: "Couldn't log in", success: false });
}
