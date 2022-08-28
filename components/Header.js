import {Fragment, useState, useEffect} from "react"
import {classList} from "../utils"
import {useRouter} from "next/router"
import {Button, IconButton} from "@mui/material"
import { useSelector } from "react-redux"
import MenuIcon from '@mui/icons-material/Menu'
import useWindowSize from "../hooks/useWindowSize"

export default ({ className }) => {
  const router = useRouter();
  const loggedIn = useSelector(state => state.User.loggedIn)
  //   ERROR
  const [menu, setMenu] = useState(false)
  const {width, height} = useWindowSize()

  useEffect(() => {
    setMenu(width > 1024 ? true : false)
  }, [width])
  

  return (
    <nav className={classList(
        "Header",
        "flex",
        "full-width",
        "justify-space-between",
        // responsive
        "lg:flex-row",
        "lg:justify-between",
        "xsm:flex-col",
        "xsm:items-center")}>
        <div className={classList(
            "logo",
            "flex",
            "flex-1",
            "justify-end",
            // "align-center",
            "w-full",
            "justify-between"
        )}>
            <img src="/brilliant sciences.svg" style={{height: "2.7rem"}}/>
            {/* <span>
                <b>B</b>rilliant
            </span>
            <span>
                <b>S</b>ciences
            </span> */}
            <IconButton sx={{color: "white"}} onClick={(e) => {
                e.stopPropagation()
                setMenu(!menu)
            }} className={classList("lg:hidden","xsm:flex")}><MenuIcon/></IconButton>
        </div>
        <ul className={classList(
            // "flex",
            "justify-space-between",
            // responsive
            "lg:flex-row",
            "lg:max-w-3/5",
            "lg:w-auto",
            "lg:my-0",
            "xsm:flex-col",
            "xsm:max-w-full",
            "xsm:w-full",
            "xsm:my-4")}
            style={{
                maxWidth: "60%",
                display: menu ? "flex" : "none",
            }}>
            {router.pathname != "/" && <li className={classList("lg:w-7.5rm","xsm:w-full")}><a href="/">home</a></li>}
            {router.pathname != "/about" && <li className={classList("lg:w-7.5rm","xsm:w-full")}><a href="/about">about</a></li>}
            {router.pathname != "/class" && <li className={classList("lg:w-7.5rm","xsm:w-full")}><a href="/class">class</a></li>}
            {router.pathname != "/search" && <li className={classList("lg:w-7.5rm","xsm:w-full")}><a href="/search">search</a></li>}
            {router.pathname != "/search" && <li className={classList("lg:w-7.5rm","xsm:w-full")}><a href="/account">account</a></li>}
        </ul>
        <div className={classList("flex","flex-1","justify-end","align-center","lg:w-auto","xsm:w-full")}>
            {(
                router.pathname != "/account" &&
                router.pathname != "/class" &&
                router.pathname != "/class/[id]" &&
                !loggedIn // is_logged_in
            )
            ? <Fragment>
                <Button variant="contained" href="/account/signup" style={{
                    marginRight: "1rem",
                    color: "white",
                    display: menu ? "flex" : "none",
                }} className={classList("lg:flex-grow-0", "xsm:flex-grow")}>Sign Up</Button>
                <Button variant="outlined" href="/account/login" className={classList("lg:flex-grow-0", "xsm:flex-grow")} style={{display: menu ? "flex" : "none",}}>Log In</Button>
              </Fragment>
            : <Button variant="outlined" href="/class" className={classList("lg:flex-grow-0", "xsm:flex-grow")} style={{display: menu ? "flex" : "none",}}>Class</Button>}
        </div>
    </nav>
  )
}