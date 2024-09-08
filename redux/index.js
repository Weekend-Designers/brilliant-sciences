import { configureStore } from "@reduxjs/toolkit"
import { composeWithDevTools } from '@redux-devtools/extension'
import User from "./reducers/User"
import Course from "./reducers/Course"
import Platform from "./reducers/Platform"

export const store = configureStore({
    reducer: {
        User,
        Course,
        Platform
    },
    devTools: composeWithDevTools()
})