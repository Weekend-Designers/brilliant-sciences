import {Fragment, useEffect} from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import {getAuth} from "firebase/auth"
import {collection, getFirestore, doc, getDoc, setDoc} from "firebase/firestore"
import {getApp} from "firebase/app"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { useDispatch, useSelector } from 'react-redux'
import {SET} from '../redux/actions'
import { useRouter } from "next/router"

export default () => {
  const [user, loading, error] = useAuthState(getAuth())
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.User.loggedIn)
  const router  = useRouter();

  useEffect(async () => {
    console.log("Loading: ", loading, "|", "Current user", user?.reloadUserInfo)
    if (user) {
      const db = getFirestore(getApp())
      const docRef = doc(db, "Users", user.reloadUserInfo.localId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        dispatch(SET("init user", docSnap.data()))
        dispatch(SET("init course", docSnap.data().latest_course))
        dispatch(SET("init user", {loggedIn: true}))
      } else {
        console.log("Signing you Up!");
        if(router.pathname == "/account/login"){
          const createAc = confirm("You have no account, Please Sign Up")
          if (createAc) {
            router.push("/account/signup")
          }
        }
        if(router.pathname == "/account/signup"){
          const storage = getStorage();
          const profileRef = ref(storage, `Profiles/${user.reloadUserInfo.localId}.jpg`);
          await uploadBytes(profileRef, user.reloadUserInfo.photoUrl).then((snapshot) => {});
          
          const photo = await getDownloadURL(profileRef)
          const usersRef = collection(db, "Users")
          await setDoc(doc(usersRef, user.reloadUserInfo.localId), {
            email: user.reloadUserInfo.email,
            id: user.reloadUserInfo.localId,
            is_admin: false,
            latest_course: "",
            performance: [],
            photo: photo,
            preferred_course: "",
            pricing_plan: "",
            theme: "",
            username: user.reloadUserInfo.displayName
          });
          const _docRef = doc(db, "Users", user.reloadUserInfo.localId)
          const _docSnap = await getDoc(_docRef)
          if (_docSnap.exists()) {
            console.log("Document data:", _docSnap.data());
            dispatch(SET("init user", _docSnap.data()))
            dispatch(SET("init user", {loggedIn: true}))
          }
        }
      }
    }else{
      dispatch(SET("init user", {
        email: null,
        id: null,
        is_admin: null,
        latest_course: null,
        performance: [],
        photo: null,
        preferred_course: null,
        pricing_plan: null,
        theme: null,
        username: null,
        loggedIn: false,
      }))
    }
  }, [user, loading, error])

  return (
    <Fragment>
      {(
        (router.pathname == "/account/login" && loggedIn)
        || (router.pathname == "/account" && !loggedIn)
        || (loggedIn == null)
      )
        ?(<div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 99999,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <span style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img src="/brilliant sciences.svg" style={{ height: "5rem" }} alt="brilliant sciences logo" />
            <br/>
            <span style={{
              width: "150%",
              height: ".3rem",
              borderRadius: ".3rem",
              overflow: "hidden",
              display: 'flex',
            }}>
              <span className="bounce-around" style={{
                width: "17%",
                height: "100%",
                borderRadius: ".3rem",
                backgroundColor: '#61dafb',
              }}></span>
            </span>
          </span>
        </div>)
        :(<span/>)
      }
    </Fragment>
  )
}
