import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  projectId: "safedocs-2023",
  appId: "1:334248100368:web:07805650886a699cf1c095",
  storageBucket: "safedocs-2023.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyA16HuuQhpliAvlrhVLEr_y7n7QOtXMcj8",
  authDomain: "safedocs-2023.firebaseapp.com",
  messagingSenderId: "334248100368",
  measurementId: "G-NX4QQ5FBQ3",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;
