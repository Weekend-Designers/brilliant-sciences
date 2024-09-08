
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {getFirestore, doc, updateDoc} from "firebase/firestore"
import {getApp} from "firebase/app"

export default async (blob, id, done) => {
  if(blob && String(id).trim()){
    const storage = getStorage();
    const profileRef = ref(storage, `Profiles/${id}`);
    console.log(id);
    await uploadBytes(profileRef, blob).then( async (snapshot) => {
      console.log("Success!")
      let url = await getDownloadURL(profileRef)
      const db = getFirestore(getApp())
      await updateDoc(doc(db, "Users", id), {photo: url}).then((result) => {
        done()
      });
    }).catch(error => {
      console.log(error)
    });
  }
}