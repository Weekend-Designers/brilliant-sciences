import { getFirestore, collection, where, getDocs, query, orderBy, limit } from "firebase/firestore"
import {getApp} from "firebase/app"

export default async (done) => {
  console.log("Getting 'em");
  const db = getFirestore(getApp())

  const qry = query(collection(db, "Courses"), where("published", "==", true), orderBy("traffic", "desc"), limit(20));

  const querySnapshot = await getDocs(qry);
  let results = Array()
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    results.push(doc.data())
  });
  done(results)
}