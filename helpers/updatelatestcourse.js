import { doc, getFirestore, updateDoc } from "firebase/firestore";
import {getApp} from "firebase/app"

const db = getFirestore(getApp())

export default async (this_course, userId, done = () => {}) => {
    await updateDoc(doc(db, "Users", userId), {latest_course: this_course}).then((result) => {
        done()
    });
}