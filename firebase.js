import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import Constants from "expo-constants";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL,
  measurementId: Constants.manifest.extra.measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
