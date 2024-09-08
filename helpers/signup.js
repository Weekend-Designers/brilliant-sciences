import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import {getApp} from "firebase/app"

const auth = getAuth()

export const EmailPasswordSignup = (username, email, password, callback) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          if (document.location.pathname == "/account/signup") {
            const db = getFirestore(getApp())
            const usersRef = collection(db, "Users")
            await setDoc(doc(usersRef, user.reloadUserInfo.localId), {
              email: user.reloadUserInfo.email,
              id: user.reloadUserInfo.localId,
              is_admin: false,
              latest_course: "",
              performance: [],
              photo: "",
              preferred_course: "",
              pricing_plan: "",
              theme: "",
              username: username
            });
            const _docRef = doc(db, "Users", user.reloadUserInfo.localId)
            const _docSnap = await getDoc(_docRef)
            if (_docSnap.exists()) {
              console.log("Document data:", _docSnap.data());
              callback({loggedIn: true, ..._docSnap.data()})
            }
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
}