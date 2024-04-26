import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  projectId: "safedocs-2023",
  appId: "---",
  storageBucket: "---",
  locationId: "us-central",
  apiKey: "---",
  authDomain: "---",
  messagingSenderId: "---",
  measurementId: "---",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth=getAuth(firebaseApp);

export {storage,auth}
