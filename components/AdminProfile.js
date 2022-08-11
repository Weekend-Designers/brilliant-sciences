import {Fragment, useState} from "react"
import {Stack, Button} from "@mui/material"
import MenuButton from "./MenuButton"
import Footer from "./Footer"
import ProfilePage from "./adminPages/ProfilePage"
import RequestsPage from "./adminPages/RequestsPage"
import CoursesPage from "./adminPages/CoursesPage"
import PricingPage from "./adminPages/PricingPage"
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
        // background: "red"
        }}>
          <h3 style={{margin: ".5rem 0 1rem 0", textAlign: "center"}}>Settings</h3>
          <MenuButton key={1} id={1} onClick={(id) => {setPager(id)}} variant={pager == 1 ? "contained" : ""}>Profile</MenuButton>
          <MenuButton key={2} id={2} onClick={(id) => {setPager(id)}} variant={pager == 2 ? "contained" : ""}>Reviews</MenuButton>
          <MenuButton key={3} id={3} onClick={(id) => {setPager(id)}} variant={pager == 3 ? "contained" : ""} helper="{{number}} requests">Requests</MenuButton>
          <MenuButton key={4} id={4} onClick={(id) => {setPager(id)}} variant={pager == 4 ? "contained" : ""} helper="{{upload progress}}%">Courses</MenuButton>
          <MenuButton key={5} id={5} onClick={(id) => {setPager(id)}} variant={pager == 5 ? "contained" : ""}>Pricing</MenuButton>
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
            <Button className="no-text-wrap" variant="outlined" fullWidth href="/">Home</Button>
          </Stack>
      </Stack>
      <Stack style={{
        // padding: "1rem",
        flex: 1,
        flexDirection: "column",
        overflow: "overlay",
        minHeight: "100vh",
        // background: "green"
        }}>
          {/* {renderPage(pager)} */}
          {/* <Footer style={{backgroundColor: "white", margin: "2rem 0"}}/> */}
          <ProfilePage hidden={pager == 1}/>
          <RequestsPage hidden={pager == 3}/>
          <CoursesPage hidden={pager == 4}/>
          <PricingPage hidden={pager == 5}/>
      </Stack>
    </div>
  )
}

const renderPage = (state) => {
  switch (state) {
    case 1:
      return <ProfilePage/>
    case 3:
      return <RequestsPage/>
    case 4:
      return <CoursesPage/>
    case 5:
      return <PricingPage/>
    default:
      return <Fragment/>
  }
}