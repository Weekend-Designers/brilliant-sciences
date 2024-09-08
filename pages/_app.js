// components
import Head from 'next/head'
import { useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import StoreWorker from "../components/StoreWorker"
import { useRouter } from "next/router"
import { app } from "../helpers/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth } from "firebase/auth"

// styles
import "../styles/tailwind.css"
import "../styles/library.css"
import "../styles/index.css"
import "../styles/header.css"
import "../styles/footer.css"

// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../redux/reducers'
import { composeWithDevTools } from "@redux-devtools/extension"
import { store } from '../redux'

app()

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    const non_header_routes = ["/", "/resetpassword", "/class", "/account"];
    const non_footer_routes = ["/account", "/class"];

    const [user, loading, error] = useAuthState(getAuth())

    useEffect(() => {
        console.log("Loading: ", loading, "|", "Current user", user?.reloadUserInfo)
    }, [user, loading, error])

    return (
        <Provider store={store}>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />
            </Head>
            {!non_header_routes.includes(router.pathname) && (
                <Header />
            )}
            <StoreWorker />
            <Component {...pageProps} />
            {!non_footer_routes.includes(router.pathname) && (
                <Footer />
            )}
        </Provider>
    )
}

export default MyApp