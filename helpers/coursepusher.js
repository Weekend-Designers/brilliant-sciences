
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {getFirestore, doc, updateDoc, setDoc, collection, addDoc} from "firebase/firestore"
import {getApp} from "firebase/app"

// Non-essentials
// comment.trim() && subtitle && preview && notes && tags

// Minor-problems
// notes && thumbnail && video

export default async (title, subject, tags, notes, comment, price, subtitle, sections, enableReviews, preview, thumbnail, video) => {
  if(title.trim() && subject && price && sections && thumbnail && video){
    console.log("You are In");
    const db = getFirestore(getApp())
    const courseRef = await addDoc(collection(db, "Courses"), {
      assesment: [],
      author: "",
      biography: "",
      description: "",
      enableReviews,
      id: "",
      preview: "",
      price,
      published: true,
      reviews: [],
      sections,
      subject,
      tags: [],
      thumbnail: "",
      title,
      traffic: 0,
      video: "",
    })
    if(courseRef.id){
      let id = courseRef.id
      console.log(id);

      await updateDoc(doc(db, "Courses", id), {id}).then((result) => {
        // done()
      });

      const storage = getStorage();
      
      if(thumbnail){
        const thumbnailRef = ref(storage, `Courses/${id}/thumbnail`);
        await uploadBytes(thumbnailRef, thumbnail).then( async (snapshot) => {
          console.log("Success!")
          let url = await getDownloadURL(thumbnailRef)
          const db = getFirestore(getApp())
          // const usersRef = collection(db, "Users")
          await updateDoc(doc(db, "Courses", id), {thumbnail: url}).then((result) => {
            // done()
          });
        })
      }

      if(preview){
        const previewRef = ref(storage, `Courses/${id}/preview`);
        await uploadBytes(previewRef, preview).then( async (snapshot) => {
          console.log("Success!")
          let url = await getDownloadURL(previewRef)
          const db = getFirestore(getApp())
          // const usersRef = collection(db, "Users")
          await updateDoc(doc(db, "Courses", id), {preview: url}).then((result) => {
            // done()
          });
        })
      }

      if(video){
        const videoRef = ref(storage, `Courses/${id}/video`);
        await uploadBytes(videoRef, video).then( async (snapshot) => {
          console.log("Success!")
          let url = await getDownloadURL(videoRef)
          const db = getFirestore(getApp())
          // const usersRef = collection(db, "Users")
          await updateDoc(doc(db, "Courses", id), {video: url}).then((result) => {
            // done()
          });
        })
      }

      // if(enableReviews){
      //   const reviewRef = await addDoc(collection(db, "Reviews"), {
      //     id: "",
      //     text: "",
      //     user_id: "",
      //   })
      //   if(reviewRef.id){
      //     await updateDoc(doc(db, "Reviews", reviewRef.id), {id: reviewRef.id}).then((result) => {
      //       // done()
      //     });
      //     await updateDoc(doc(db, "Courses", id), {reviews: reviewRef.id}).then((result) => {
      //       // done()
      //     });
      //   }
      // }
    }
  }
}