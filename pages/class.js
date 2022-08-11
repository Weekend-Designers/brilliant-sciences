import {Fragment, useState} from "react"
import {Stack, Button} from "@mui/material"
import MenuButton from "../components/MenuButton"
import Footer from "../components/Footer"
import VideoPage from "../components/standardPages/VideoPage"
import DescriptionPage from "../components/standardPages/DescriptionPage"
import AssesmentPage from "../components/standardPages/AssesmentPage"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
export default () => {
  const router = useRouter()
  const [pager, setPager] = useState(1)
  const video = useSelector(state => state.Course.video)
  const title = useSelector(state => state.Course.title)

  useEffect(() => {
    if(!(video || title)){
      router.push("/search")
    }
  }, [video, title])

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
          <MenuButton key={3} id={3} onClick={(id) => {setPager(id)}} variant={pager == 3 ? "contained" : ""}>Reviews</MenuButton>
          <MenuButton key={4} id={4} onClick={(id) => {setPager(id)}} variant={pager == 4 ? "contained" : ""}>Assesment</MenuButton>
          <div style={{display: 'flex', flex: 1}}></div>
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