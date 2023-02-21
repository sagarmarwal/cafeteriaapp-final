// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvXW2IQF2DXsCp5Y3kLW3_B_MsNMtsKyY",
  authDomain: "orderapp-43b89.firebaseapp.com",
  databaseURL: "https://orderapp-43b89-default-rtdb.firebaseio.com",
  projectId: "orderapp-43b89",
  storageBucket: "orderapp-43b89.appspot.com",
  messagingSenderId: "1068071798631",
  appId: "1:1068071798631:web:8169bb4ef937ab675111c2",
};
// Initialize Firebase
const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
