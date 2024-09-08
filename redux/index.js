import { createStore } from "redux"
import reducers from './reducers'
import { composeWithDevTools } from '@redux-devtools/extension'

// window.__REDUX_DEVTOOLS_EXTENSION__ &&
// window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
// { trace: true, traceLimit: 25 }
const store = createStore(
    reducers,
    composeWithDevTools()
)

export default store