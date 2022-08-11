import { combineReducers } from "redux"
import User from "./User"
import Course from "./Course"
import Platform from "./Platform"
// import Error from "./Error"
// import Notification from "./Notification"

export default combineReducers({
    User,
    Course,
    Platform,
    // Error,
    // Notification,
})