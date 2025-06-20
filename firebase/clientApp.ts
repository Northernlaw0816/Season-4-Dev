import { initializeApp } from "firebase/app";

import { getFirestore, initializeFirestore } from "firebase/firestore";
// Next time remember to fucking remove NEXT_PUBLIC_ prefix from the env during development use!
const app = initializeApp({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

const firestore = getFirestore(app);

export { firestore };
