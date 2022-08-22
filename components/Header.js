import {Fragment} from "react"
import {classList} from "../utils"
import {useRouter} from "next/router"
import {Button} from "@mui/material"
import { useSelector } from "react-redux"

export default ({ className }) => {
  const router = useRouter();
  const loggedIn = useSelector(state => state.User.loggedIn)

  return (
    <nav className={classList(
        "Header",
        "flex",
        "full-width",
        "justify-space-between")}>
        <div className={classList(
            "logo",
            "flex",
            "flex-1",
            "justify-end",
            // "align-center",
            "flex-column"
        )}>
            <img src="/brilliant sciences.svg" style={{height: "2.7rem"}}/>
            {/* <span>
                <b>B</b>rilliant
            </span>
            <span>
                <b>S</b>ciences
            </span> */}
        </div>
        <ul className={classList("flex","justify-space-between")} style={{
            maxWidth: "60%",
            // width: "18rem",

        }}>
            {router.pathname != "/" && <li><a href="/">home</a></li>}
            {router.pathname != "/about" && <li><a href="/about">about</a></li>}
            {router.pathname != "/class" && <li><a href="/class">class</a></li>}
            {router.pathname != "/search" && <li><a href="/search">search</a></li>}
            {router.pathname != "/search" && <li><a href="/account">account</a></li>}
        </ul>
        <div className={classList("flex","flex-1","justify-end","align-center")}>
            {(
                router.pathname != "/account/login" &&
                router.pathname != "/account/signup" &&
                router.pathname != "/account" &&
                router.pathname != "/class" &&
                router.pathname != "/class/[id]" &&
                !loggedIn // is_logged_in
            )
            ? <Fragment>
                <Button variant="contained" href="/account/signup" style={{
                    marginRight: "1rem",
                    color: "white",
                }}>Sign Up</Button>
                <Button variant="outlined" href="/account/login">Log In</Button>
              </Fragment>
            : <Button variant="outlined" href="/class">Class</Button>}
        </div>
    </nav>
  )
}