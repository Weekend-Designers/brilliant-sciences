import { useState } from "react"
import {Stack, Button} from "@mui/material"
import MenuButton from "./MenuButton"
import ProfilePage from "./standardPages/ProfilePage"
import PerformancePage from "./standardPages/PerformancePage"
import {GoogleLogout} from "../helpers/login"
export default () => {
  const [pager, setPager] = useState(1)
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      maxHeight: "100vh",
      minWidth: "100%"
    }}>
      <Stack style={{
        padding: "1rem",
        minWidth: "25%",
        }}>
          <h3 style={{margin: ".5rem 0 1rem 0", textAlign: "center"}}>Settings</h3>
          <MenuButton key={1} id={1} onClick={(id) => {setPager(id)}} variant={pager == 1 ? "contained" : ""}>Profile</MenuButton>
          <MenuButton key={2} id={2} onClick={(id) => {setPager(id)}} variant={pager == 2 ? "contained" : ""} helper="{{days}} to expire">Subscription</MenuButton>
          <MenuButton key={3} id={3} onClick={(id) => {setPager(id)}} variant={pager == 3 ? "contained" : ""} helper="{{Good/Fair/Improve}}">Performance</MenuButton>
          <div style={{display: 'flex', flex: 1}}></div>
          <Stack spacing={1} direction="row">
            <Button className="no-text-wrap" variant="outlined" fullWidth onClick={()=>{
              GoogleLogout()
              dispatch(SET("init user", {
                email: null,
                id: null,
                is_admin: null,
                latest_course: null,
                performance: [],
                photo: null,
                preferred_course: null,
                pricing_plan: null,
                theme: null,
                username: null,
                loggedIn: false,
              }))
            }}>Log Out</Button>
            <Button className="no-text-wrap" variant="outlined" fullWidth href="/class">Class</Button>
          </Stack>
      </Stack>
      <Stack style={{
        flex: 1,
        flexDirection: "column",
        overflow: "overlay",
        minHeight: "100vh",
      }}>
          <ProfilePage hidden={pager == 1}/>
          <PerformancePage hidden={pager == 3}/>
      </Stack>
    </div>
  )
}

const renderPage = (state) => {
  switch (state) {
    case 1:
      return <ProfilePage/>
    case 3:
      return <PerformancePage/>
    default:
      return
  }
}