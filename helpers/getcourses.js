import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {getFirestore, doc, updateDoc, setDoc, collection, addDoc, where, getDocs, query, orderBy, limit} from "firebase/firestore"
import {getApp} from "firebase/app"

export default async (done) => {
  console.log("Getting 'em");
  const db = getFirestore(getApp())

  const qry = query(collection(db, "Courses"), where("published", "==", true), orderBy("traffic", "desc"), limit(20));

  const querySnapshot = await getDocs(qry);
  let results = Array()
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    results.push(doc.data())
  });
  done(results)

  // const coursesCollection = collection(db, 'Courses');
  // const coursesSnapshot = await getDocs(coursesCollection);
  // const coursesList = coursesSnapshot.docs.map(doc => doc.data());
}