import type { NextApiRequest, NextApiResponse } from "next";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import "dotenv/config";
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteField, doc, getDocs, getFirestore, query, setDoc, updateDoc, where, orderBy } from "firebase/firestore";
import _ from "lodash";
import fs from "fs-extra";
import nodemailer from "nodemailer";
import nunjucks from "nunjucks";
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
const htmlBody = fs.readFileSync("mail.html", "utf8");

// Mail Provider
const Mail = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});
export default async function mail(req: NextApiRequest, res: NextApiResponse) {
  let success = false;
  if (!req.body)
    return res.status(200).json({
      success,
      message: "No body",
    });
  Mail.sendMail({
    from: '"NuTopia" <info@nutopia.in>',
    to: req.body.userEmail,
    cc: [`${process.env.MAILER_USER}`],
    html: nunjucks.renderString(htmlBody, req.body.formData),
  })
    .then(() => (success = true))
    .catch((e) => {
      success = false;
    });
  res.status(200).json({
    success,
    message: `Successfully sent mail to ${req.body.userEmail}`,
  });
}
