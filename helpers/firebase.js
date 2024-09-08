import {initializeApp, getApps, getApp} from "firebase/app"
// import {FirebaseApp as auth} from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.FIREBABSE_apiKey,
  authDomain: process.env.FIREBABSE_authDomain,
  projectId: process.env.FIREBABSE_projectId,
  storageBucket: process.env.FIREBABSE_storageBucket,
  messagingSenderId: process.env.FIREBABSE_messagingSenderId,
  appId: process.env.FIREBABSE_appId,
  measurementId: process.env.FIREBABSE_measurementId,
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