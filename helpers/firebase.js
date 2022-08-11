import {initializeApp, getApps, getApp} from "firebase/app"
// import {FirebaseApp as auth} from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBEzjI5Kx0EokpKKe0N4XJhg7KVL2R19m4",
  authDomain: "brilliant-sciences.firebaseapp.com",
  projectId: "brilliant-sciences",
  storageBucket: "brilliant-sciences.appspot.com",
  messagingSenderId: "811825813849",
  appId: "1:811825813849:web:f2ac7de4c861ee7cd15448",
  measurementId: "G-L87TNW9W4B"
}

// // Initialize Firebase
// export const app = (!getApps().length) ? initializeApp(firebaseConfig) : getApp()
export const app = () => {
  if(!getApps().length){
    return initializeApp(firebaseConfig)
  }
  console.log("There")
}

// console.log(firebase.auth) // Undefined
// console.log(firebase.default.auth) // Function