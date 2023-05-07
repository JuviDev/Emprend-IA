import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FIREBASE_CONFIG_APIKEY,
  FIREBASE_CONFIG_AUTHDOMAIN,
  FIREBASE_CONFIG_PROJECTID,
  FIREBASE_CONFIG_STORAGEBUCKET,
  FIREBASE_CONFIG_MESSAGINGSENDERID,
  FIREBASE_CONFIG_APPID,
  FIREBASE_CONFIG_MEASUREMENTID,
} from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_CONFIG_APIKEY,
  authDomain: FIREBASE_CONFIG_AUTHDOMAIN,
  projectId: FIREBASE_CONFIG_PROJECTID,
  storageBucket: FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: FIREBASE_CONFIG_APPID,
  measurementId: FIREBASE_CONFIG_MEASUREMENTID,
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
