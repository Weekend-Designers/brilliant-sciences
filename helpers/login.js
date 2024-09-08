import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth"

const auth = getAuth()
const provider = new GoogleAuthProvider()

export const GoogleLogin = (callback) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user.reloadUserInfo
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorEmail = error.email;
      console.log(errorCode, errorMessage, errorEmail)
      return null
    });
}

export const GoogleLogout = () => {
  signOut(auth).then((result) => {
    console.log("Logged out");
  })
}

export const EmailPasswordLogin = (email, password, callback) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      callback(user.reloadUserInfo);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      const extractedError = String(errorCode).replace("auth/", "")
      console.log(extractedError);
      if (extractedError == "user-not-found") {
        callback("user-not-found")
      }
      callback(null)
    });
}