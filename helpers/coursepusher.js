
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, doc, updateDoc, collection, addDoc } from "firebase/firestore"
import { getApp } from "firebase/app"

export default async (
  title,
  subject,
  tags,
  notes,
  description,
  assesment,
  price,
  subtitle,
  sections,
  enableReviews,
  preview,
  thumbnail,
  video,
  done = () => { }
) => {
  let neededParts = 1;
  let doneParts = 0;
  if (title.trim() && subject && price && sections && thumbnail && video) {
    console.log("You are In");
    const db = getFirestore(getApp())
    const courseRef = await addDoc(collection(db, "Courses"), {
      assesment,
      author: "",
      biography: "",
      description: description || "",
      notes: notes || [],
      enableReviews,
      id: "",
      preview: "",
      price,
      published: true,
      reviews: [],
      sections,
      subject,
      tags: tags || [],
      thumbnail: "",
      title,
      traffic: 0,
      video: "",
    })
    if (courseRef.id) {
      let id = courseRef.id
      console.log(id);

      await updateDoc(doc(db, "Courses", id), { id }).then((result) => {
        doneParts++
      });

      const storage = getStorage();

      if (thumbnail) {
        neededParts++
        const thumbnailRef = ref(storage, `Courses/${id}/thumbnail`);
        await uploadBytes(thumbnailRef, thumbnail).then(async (snapshot) => {
          console.log("Success!")
          let url = await getDownloadURL(thumbnailRef)
          const db = getFirestore(getApp())
          await updateDoc(doc(db, "Courses", id), { thumbnail: url }).then((result) => {
            doneParts++
          });
        })
      }

      if (preview) {
        neededParts++
        const previewRef = ref(storage, `Courses/${id}/preview`);
        await uploadBytes(previewRef, preview).then(async (snapshot) => {
          console.log("Success!")
          let url = await getDownloadURL(previewRef)
          const db = getFirestore(getApp())
          await updateDoc(doc(db, "Courses", id), { preview: url }).then((result) => {
            doneParts++
          });
        })
      }

      if (video) {
        neededParts++
        const videoRef = ref(storage, `Courses/${id}/video`);
        await uploadBytes(videoRef, video).then(async (snapshot) => {
          console.log("Success!")
          let url = await getDownloadURL(videoRef)
          const db = getFirestore(getApp())
          await updateDoc(doc(db, "Courses", id), { video: url }).then((result) => {
            doneParts++
          });
        })
      }

      while (true) {
        if (doneParts == neededParts) {
          done()
          break
        }
      }
    }
  }
}