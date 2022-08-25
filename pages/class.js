import {Fragment, useEffect, useState} from "react"
import {Stack, Button} from "@mui/material"
import MenuButton from "../components/MenuButton"
import Footer from "../components/Footer"
import VideoPage from "../components/standardPages/VideoPage"
import DescriptionPage from "../components/standardPages/DescriptionPage"
import AssesmentPage from "../components/standardPages/AssesmentPage"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import updatelatestcourse from "../helpers/updatelatestcourse"
export default () => {
  const router = useRouter()
  const [pager, setPager] = useState(1)
  const video = useSelector(state => state.Course.video)
  const title = useSelector(state => state.Course.title)
  const enableReviews = useSelector(state => state.Course.enableReviews)
  const [updatedlatestcourse, set_updatedlatestcourse] = useState(false)
  const this_course = useSelector(state => state.Course)
  const userId = useSelector(state => state.User.id)
  const sections = useSelector(state => state.Course.sections) || []

  useEffect(() => {
    if(!video || !title){
      router.push("/search")
    }
  }, [video, title])

  useEffect(() => {
    if(this_course){
      console.log(this_course);
      if(this_course.id && !updatedlatestcourse){
        updatelatestcourse(this_course, userId, () => {
          console.log("good");
          set_updatedlatestcourse(true)
        })
      }
    }
  }, [this_course])

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
          <h3 style={{margin: ".5rem 0 1rem 0", textAlign: "center"}}>Class</h3>
          <MenuButton key={1} id={1} onClick={(id) => {setPager(id)}} variant={pager == 1 ? "contained" : ""} helper="watching: {{section name}}">Video</MenuButton>
          <MenuButton key={2} id={2} onClick={(id) => {setPager(id)}} variant={pager == 2 ? "contained" : ""}>Description</MenuButton>
          {enableReviews
            ? (<MenuButton key={3} id={3} onClick={(id) => {setPager(id)}} variant={pager == 3 ? "contained" : ""}>Reviews</MenuButton>)
            : (<Fragment/>)}
          <MenuButton key={4} id={4} onClick={(id) => {setPager(id)}} variant={pager == 4 ? "contained" : ""}>Assesment</MenuButton>
          <Stack spacing={1} style={{display: 'flex', flex: 1, padding: "0 1rem", margin: ".5rem 0", overflow: "auto"}}>
            {(sections && sections.length > 0)
              ? (sections.map(sect => (<Button variant="contained">{sect.title}</Button>)))
              : ("")}
          </Stack>
          <Button variant="outlined" href="/account">Exit Class</Button>
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
        <VideoPage hidden={pager == 1}/>
        <DescriptionPage hidden={pager == 2}/>
        <AssesmentPage hidden={pager == 4}/>
        <Footer style={{backgroundColor: "white", margin: "2rem 0"}}/>
      </Stack>
    </div>
  )
}

const renderPage = (state) => {
  switch (state) {
    case 1:
      return <VideoPage/>
    case 2:
      return <DescriptionPage/>
    case 4:
      return <AssesmentPage/>
    default:
      return <Fragment/>
  }
}