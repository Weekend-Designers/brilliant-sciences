import {Fragment, useEffect, useState} from "react"
import {Stack, LinearProgress} from "@mui/material"
import SearchCard from "../../components/SearchCard"
import SearchItem from "../../components/SearchItem"
import SearchIcon from '@mui/icons-material/Search'
import ProgressField from "../../components/ProgressField"
import getcourses from "../../helpers/getcourses"
import {SET} from "../../redux/actions"
import {useDispatch} from "react-redux"
import {useRouter} from "next/router"

export default () => {
  const [is_searching, set_is_searching] = useState(false)
  const [ready, set_ready] = useState(false)
  const [courses, setCourses] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()
  
  useEffect(() => {
    getcourses((data) => {
      setCourses(data)
      console.log(data);
      set_ready(true)
    })
  }, [])

  return (
    <div>
      <Stack style={{
        flex: 1,
        minHeight: "100vh",
        padding: "1rem"
      }}>
        <Stack flex={1}>
          <Stack direction="row" justifyContent="space-between" style={{
            padding: "0 5.5rem",
          }}>
            {
              is_searching
              ? <h3 style={{margin: ".5rem 0 1rem 0", textAlign: "center"}}>Search results for :  "{"{{search text}}"}"</h3>
              : <h3 style={{margin: ".5rem 0 1rem 0", textAlign: "center"}}>Top Courses</h3>
            }
            <ProgressField inProgress={false} startIcon={<SearchIcon color="primary"/>}/>
          </Stack>
          {
            !is_searching
            ? (
              <Stack style={{
                flex: 1,
                borderRadius: "4px",
                // overflow: "hidden",
                // marginRight: "1rem",
                display: (ready ? "grid" : "flex"),
                justifyContent: "center",
                gridTemplateColumns: "repeat(auto-fill, 13rem)",
                gridGap: "1rem",
                gridAutoRows: "15rem"
              }}>{renderSearchCards(courses, dispatch, router, ready)}</Stack>
            )
            : (
              <Stack style={{
                flex: 1,
                // borderRadius: "4px",
                // overflow: "hidden",
                // marginRight: "1rem",
                display: "grid",
                justifyContent: "center",
                gridTemplateColumns: "repeat(auto-fill, 100%)",
                gridGap: "0.5rem",
                gridAutoRows: "3.3rem"
              }}>{renderSearchItems()}</Stack>
            )
          }
        </Stack>
      </Stack>
    </div>
  )
}

const renderSearchCards = (courses, dispatch, router, ready) => {
  let output = Array()
  if(courses.length > 0){
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i]
      output.push(
        <SearchCard id={i}
          name={course.title}
          text={course.description}
          price={course.price}
          image={course.thumbnail}
          video={course.preview}
          onClick={() => {
            console.log("Any Luck?");
            dispatch(SET("init course", course))
            router.push("/class")
        }}/>
      )
      // output.push(<SearchCard id={i} name="{{name}}" text="{{description}}" price="{{price}}" image="/testimonials.jpg" video="https://go.wootly.ch/dash?source=web&id=9ed25eb85a1ce6b0c19f6fa1b4e72a5c49f871c0&sig=sasAL3sljgOpCtmjgvJIog&expire=1649711414&ofs=8&usr=40843"/>)
    }
    output.push(<SearchCard id={courses.length} name="{{name}}" text="{{short description}}" price="{{price}}" image="/testimonials.jpg" video="/spykids4.mp4"/>)
    return output
  }else{
    return (ready ? "No data" : <LinearProgress style={{width: "100%"}}/>)
  }
}

const renderSearchItems = () => {
  let output = Array()
  for (let i = 0; i < 13; i++) {
    output.push(<SearchItem id={i} name="{{name}}" text="{{description}}" price="{{price}}" image="/testimonials.jpg"/>)
  }
  return output
}