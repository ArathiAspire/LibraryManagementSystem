// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDclevaeToM5ywcRKg8EdvxiL2SfUSuzTs",
  authDomain: "librarymanagement-29ab2.firebaseapp.com",
  databaseURL: "https://librarymanagement-29ab2-default-rtdb.firebaseio.com",
  projectId: "librarymanagement-29ab2",
  storageBucket: "librarymanagement-29ab2.appspot.com",
  messagingSenderId: "306948168197",
  appId: "1:306948168197:web:53a7b684ebb43318251a6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
