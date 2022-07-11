import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

export default async function handler(req: any, res: any) {
  let success = false;

  if (!req.body) {
    return res.status(200).json({
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
    success = false;
    return res.status(200).json({
      success,
      message: "SchoolID is incorrect. Please try again",
    });
  } else {
    success = true;
  }

  const user = accounts[0];
  const [salt, key] = user.get("password").split(":");
  const userTokenSalt = randomBytes(16).toString("hex");
  const userToken = scryptSync(schoolId, userTokenSalt, 16);

  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");

  let passwordMatch = timingSafeEqual(hashedBuffer, keyBuffer);

  if (!passwordMatch) {
    success = false;
    return res.status(200).json({
      success: false,
      message: "Password is incorrect. Please try again",
    });
  }
  
  let userTokens: any[] = [];

  accounts.forEach((usr) => {
    userTokens.push(usr.get("userToken"));
  });

  if (userTokens.length > 0 && userTokens[0] !== undefined) {
    success = false;
    return res.status(200).json({
      success: false,
      message: "Already logged in on a different device",
    });
  } else {
    success = true;
  }

  let UserToken = userToken.toString("hex");

  if (success) {
    try {
      await updateDoc(doc(accountsCollection, schoolId), {
        userToken: userToken.toString("hex"),
      });
      return res.status(200).json({ message: "Successfully logged in", success: true, userToken: UserToken });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Couldn't log in. Please try again", success: false });
    }
  }

  return res.status(200).json({ message: "Couldn't log in. Please try again", success: false });
}
