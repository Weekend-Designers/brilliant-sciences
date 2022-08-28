import {Fragment, useState, useEffect, useRef} from "react"
import {Stack, IconButton, Typography, Button, CircularProgress, TextField, LinearProgress} from "@mui/material"
import ContentCard from "../ContentCard"
import Table from "../Table"
import NonPropagationButton from "../NonPropagationButton"
import {
  PlayArrowRounded as PlayIcon,
  SkipPreviousRounded as SkipBackIcon,
  SkipNextRounded as SkipNextIcon,
  FlagRounded as FlagIcon,
  Delete as DeleteIcon,
  ClosedCaption as SubtitleIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';
import InputItem from "../settingItems/InputItem"
import SelectItem from "../settingItems/SelectItem"
import ComponentItem from "../settingItems/ComponentItem"
import ButtonItem from "../settingItems/ButtonItem"
import {makeIdNotIn, extractIndex, makeBiKeyObject, extractKey} from "../../utils"
import Player from "react-player"
import coursepusher from "../../helpers/coursepusher"
import ArrayItem from "../settingItems/ArrayItem"
import TwoDimArrayItem from "../settingItems/TwoDimArrayItem"

const data1 = [
  [0, "Title", 'Traffic', 'Dop', "", ""],
  [1, "electricity", 10, '12/2/22', <NonPropagationButton variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton variant="outlined">Unpublish</NonPropagationButton>],
  [2, "electricity", 10, '12/2/22', <NonPropagationButton variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton variant="outlined">Unpublish</NonPropagationButton>],
  [3, "cell study", 4, '13/3/22', <NonPropagationButton variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton variant="outlined">Unpublish</NonPropagationButton>],
  [4, "cell study", 4, '13/3/22', <NonPropagationButton variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton variant="outlined">Unpublish</NonPropagationButton>],
]
const data2 = [
  [0, "Title", 'Traffic', 'Dop', "", ""],
  [1, "electricity", 10, '12/2/22', <NonPropagationButton variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton color="error" variant="outlined">Delete</NonPropagationButton>],
  [2, "electricity", 10, '12/2/22', <NonPropagationButton variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton color="error" variant="outlined">Delete</NonPropagationButton>],
  [3, "cell study", 4, '13/3/22', <NonPropagationButton variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton color="error" variant="outlined">Delete</NonPropagationButton>],
  [4, "cell study", 4, '13/3/22', <NonPropagationButton variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton color="error" variant="outlined">Delete</NonPropagationButton>],
]
const data3 = [
  [1, "electricity", 'physics', '12/2/22', "pending"],
  [2, "cell study", 'biology', '13/3/22', "pending"],
  [3, "reactions", '-', '13/3/22', "pending"],
  [4, "thermo dynamics", '-', '14/7/22', "pending"],
]
const data4 = [
  [0, "Time", 'Title', '', ''],
]

export default ({hidden}) => {
  // useEffect(() => {
  //   const styleSheet = getComputedStyle(document.documentElement)
  //   styleSheet.setProperty('--followers-display', 'inline')
  //   console.log(styleSheet.getPropertyValue("--followers-display"))
  //   return () => {
  //     styleSheet.setProperty('--followers-display', 'none')
  //   }
  // }, [])
  const [newCoursing, setNewCoursing] = useState(true)
  
  return (
    <Stack style={{
      display: hidden ? "flex" : "none",
      flex: 1,
      minHeight: "100vh",
      height: "100vh",
      maxHeight: "100vh",
      // padding: "1rem"
    }}>
      <Stack style={{
        flex: 1,
        borderRadius: "4px",
        overflow: "hidden",
        // marginRight: "1rem",
        position: "relative"
      }}>
        <Stack direction="row" spacing={1} style={{
              // flex: 1
              position: "absolute",
              width: "200%",
              transition: ".5s ease",
              marginLeft: newCoursing ? "-100%" : "0%"
          }}>
          {/* Page 1 */}
          <Page1 setNewCoursing={setNewCoursing}/>
          {/* Page 2 */}
          <Page2 setNewCoursing={setNewCoursing}/>
        </Stack>
      </Stack>
    </Stack>
  )
}

const Page1 = ({setNewCoursing}) => {
  return (
    <Stack spacing={1} style={{
      // position: "absolute",
      width: "50%",
      // background: "green",
      overflow: "auto",
      height: "100vh",
      padding: "1rem",
      borderRadius: "4px",
      margin: 0
      // marginTop: "18.15%"
      // flex: 1
    }}>
    <Stack direction="row" spacing={1}>
        <Button variant="outlined">Published</Button>
        <Button variant="outlined">Unpublished</Button>
        <Stack sx={{flex: 1}}/>
        <Button variant="contained" onClick={()=>{setNewCoursing(true)}}>New</Button>
    </Stack>
    <Stack spacing={1.5} className="Courses-Page-Cards-Container">
      {/* <ContentCard title="Pending courses" noPad>
        <Table data={[[0, data3[0][1], data3[0][2], data3[0][3], data3[0][4]]]} noHeader/>
      </ContentCard>
      {
        data3.map((datum, index) => {
          if(index != 0){
            return (
              <ContentCard key={index} noPad>
                <Table data={[[0, datum[1], datum[2], datum[3], datum[4]]]} noHeader/>
              </ContentCard>
            )
          }else{
            return <Fragment/>
          }
        })
      } */}
      <ContentCard title="Published courses">
        <Table className="Published-Course-Table-data-Container" data={data1}/>
      </ContentCard>
      <ContentCard title="Unpublished courses">
        <Table data={data2}/>
      </ContentCard>
    </Stack>
    </Stack>
  )
}

const Page2 = ({setNewCoursing}) => {
  const [flags, setFlags] = useState(data4)
  const [removeFlag, setRemoveFlag] = useState(0)
  const addFlag = (flag) =>{
    if(flag){
      setFlags([...flags, flag])
      // console.log(flags, flag)
    }
  }
  useEffect(() => {
    if(removeFlag != 0){
      setFlags(flags.filter((flag, index) => (flag[0] != removeFlag)))
      // console.log("id", removeFlag)
      // console.log("flags", flags.filter((flag, index) => (flag[0] != removeFlag)))
    }
  }, [removeFlag])
  
  const [flagName, setFlagName] = useState("")

  const [timeStamp, setTimeStamp] =  useState([0, 0, 0])
  const [playing, setPlaying] =  useState(false)
  const [progress, setProgress] =  useState(0)
  const [duration, setDuration] =  useState(0)
  const [buffering, setBuffering] =  useState(false)
  const video_player_ref = useRef("video_player_ref")
  const [url, setUrl] =  useState("")
  const [video, setVideo] =  useState()
  const [dragAbove, setDragAbove] =  useState(false)
  const [ready, setReady] =  useState(false)
  
  const handleVideoFile = (e) => {
    if(e.target.files[0]){
      setReady(false)
      let blob = e.target.files[0]
      setVideo(blob)
      const fileUrl = URL.createObjectURL(blob)
      setUrl(fileUrl)
    }
  }
  
  const [title, setTitle] =  useState("")
  const [subject, setSubject] = useState(1)
  const [subjectName, setSubjectName] = useState("")
  const [preview, setPreview] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [subtitle, setSubtitle] = useState()
  const [tags, setTags] =  useState([])
  const [links, setLinks] =  useState([])
  const [notes, setNotes] =  useState([])
  const [description, setDescription] = useState("")
  const [price, setPrice] =  useState("0")
  const [enableReviews, setEnableReviews] =  useState(true)

  const [uploaded, setUploaded] =  useState(undefined)

  const publish = () => {
    setUploaded(false)
    let allflgs = flags.filter((flg, index) => (index != 0))
    let sectionsStamps = extractIndex(allflgs, 4) || []
    let sectionsTitles = extractIndex(allflgs, 2) || []
    console.log(sectionsStamps);
    console.log(sectionsTitles);
    let _sections = makeBiKeyObject("title", sectionsTitles, "stamp", sectionsStamps)
    console.log(_sections);
    // TODO: sanitize all text fields to prevent XXS
    console.log(thumbnail, video);
    const _notes = [...notes, {title: "Links", links: links}]
    coursepusher(title, subject, tags, _notes, description, price, subtitle, _sections, enableReviews, preview, thumbnail, video, () => {
      setUploaded(true)
    })
    
    // if(allflgs.length > 0){
    // }else{
    // }
  }

  return (
    <Stack spacing={1} style={{
      // position: "absolute",
      width: "50%",
      // background: "green",
      overflow: "auto",
      height: "100vh",
      padding: "1rem",
      borderRadius: "4px",
      margin: 0
      // marginTop: "18.15%"
      // flex: 1
    }}>
    <ButtonItem text spacing={2} buttons={[
      {
        text: "Cancel",
        props: {
          onClick: ()=>{setNewCoursing(false)}
        }
      }
    ]}/>
    <ContentCard title="New Course Video">
      <Stack spacing={1.5} direction="row">
        <Stack flex={1}>
          <Stack spacing={2} direction="row" justifyContent="space-evenly" alignItems="center">
            <IconButton disabled={!ready} draggable={true} onClick={(e) => {
              if(url && ready){
                const hours = Math.trunc(duration / 3600)
                const minutes = Math.trunc(((duration / 3600) - hours) * 60)
                const seconds = Math.trunc(((((duration / 3600) - hours) * 60) - minutes) * 60)

                const newProgress = parseFloat(progress)-((hours  + minutes + seconds) / 3600)

                video_player_ref.current.seekTo(((newProgress/100) * duration).toFixed(5), "seconds")
                setProgress(newProgress)
                // console.log("prog", progress)
              }
            }}
             onDoubleClick={(e) => {
              if(url && ready){
                const hours = Math.trunc(duration / 3600)
                const minutes = Math.trunc(((duration / 3600) - hours) * 60)
                const seconds = Math.trunc(((((duration / 3600) - hours) * 60) - minutes) * 60)

                const newProgress = parseFloat(progress)-(((hours  + minutes + seconds) / 3600) * (10 * e.detail))

                video_player_ref.current.seekTo(((newProgress/100) * duration).toFixed(5), "seconds")
                setProgress(newProgress)
                // console.log("prog", progress)
              }
            }}><SkipBackIcon/></IconButton>
            <Typography disabled={!ready}>
              {timeStamp[0] > 0 ? `${timeStamp[0] < 10 ? `0${timeStamp[0]}` : timeStamp[0]}:` : ""}
              {timeStamp[1] < 10 ? `0${timeStamp[1]}` : timeStamp[1]}:{timeStamp[2] < 10 ? `0${timeStamp[2]}` : timeStamp[2]}
            </Typography>
            <IconButton disabled={!ready} draggable={true} onClick={(e) => {
              if(url && ready){
                const hours = Math.trunc(duration / 3600)
                const minutes = Math.trunc(((duration / 3600) - hours) * 60)
                const seconds = Math.trunc(((((duration / 3600) - hours) * 60) - minutes) * 60)
          
                const newProgress = parseFloat(progress)+((hours  + minutes + seconds) / 3600)
                
                video_player_ref.current.seekTo(((newProgress/100) * duration).toFixed(5), "seconds")
                setProgress(newProgress)
                // console.log("prog", progress)
              }
            }}
             onDoubleClick={(e) => {
              if(url && ready){
                const hours = Math.trunc(duration / 3600)
                const minutes = Math.trunc(((duration / 3600) - hours) * 60)
                const seconds = Math.trunc(((((duration / 3600) - hours) * 60) - minutes) * 60)
          
                const newProgress = parseFloat(progress)+(((hours  + minutes + seconds) / 3600) * (10 * e.detail))
                
                video_player_ref.current.seekTo(((newProgress/100) * duration).toFixed(5), "seconds")
                setProgress(newProgress)
                // console.log("prog", progress)
              }
            }}><SkipNextIcon/></IconButton>
            <IconButton disabled={!ready} onClick={() => {
              if(url && ready){
                setPlaying(!playing)
              }
            }}>
              {
                playing
                ? <PauseIcon/>
                : <PlayIcon/>
              }
            </IconButton>
            {
              !ready
              ? <Fragment/>
              : <TextField disabled={!ready} className="InputItem-input" value={flagName} onChange={(e)=>{setFlagName(e.target.value)}}/>
            }
            <IconButton disabled={!ready} onMouseUp={(e)=>{
              const id = makeIdNotIn([...extractIndex(flags), removeFlag])
              e.stopPropagation();
              const time_stamp = String(timeStamp[0] > 0 ? `${timeStamp[0] < 10 ? `0${timeStamp[0]}` : timeStamp[0]}:` : "")+String(timeStamp[1] < 10 ? `0${timeStamp[1]}` : `${timeStamp[1]}`)+String(`:${timeStamp[2] < 10 ? `0${timeStamp[2]}` : timeStamp[2]}`)
              if(String(flagName).trim() && url && ready){
                const time_stamps = extractIndex(flags, 1)
                if(!time_stamps.includes(time_stamp)){
                  addFlag([
                    id,
                    time_stamp,
                    flagName,
                    <IconButton color="error" onClick={(e)=>{
                      e.stopPropagation();
                      setRemoveFlag(id)
                    }}><DeleteIcon/></IconButton>,
                    progress
                  ])
                }
              }
            }}><FlagIcon/></IconButton>
            {
              url && !ready
              ? <CircularProgress size={18}/>
              : <Fragment/>
            }
          </Stack>
          <ContentCard innerStyle={{
            maxHeight: "15rem",
            overflow: "auto"
          }}>
            <Table className="CoursePage-table" data={flags} hasHelper attributes onClick={(index)=>{
              if(index && flags[index][4]){
                console.log("click",index , flags[index][4])
                video_player_ref.current.seekTo(((flags[index][4]/100) * duration), "seconds")
                setProgress(flags[index][4])
              }
            }}/>
          </ContentCard>
        </Stack>
        <Stack flex={1}>
          <ContentCard innerStyle={{borderStyle: "none"}} noPad>
            <Stack className={ dragAbove ? "drop-container-hovered" : ""}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragAbove(true)
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragAbove(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragAbove(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragAbove(false)
              setReady(false)
              let blob = e.dataTransfer.files[0]
              const fileUrl = URL.createObjectURL(blob)
              setVideo(blob)
              setUrl(fileUrl)
            }}
            onClick={(e) => {
              e.stopPropagation()
              if(url && ready){
                setPlaying(!playing)
              }
            }}
            style={{background: "black", borderRadius: "5px", height: "15rem", width: "100%", color: "white"}} justifyContent="center" alignItems="center">
              {/* Video Player */}
              {
                !url
                ? (
                  <Fragment>
                    <input id="video-file" type="file" accept=".mp4" hidden onChange={handleVideoFile}/>
                    Drag and Drop a video File
                    <Typography component="label" htmlFor="video-file" color="primary" style={{textDecoration: "underline", fontSize: ".8rem", fontWeight: 200, letterSpacing: ".03rem", cursor: "pointer"}}>choose a file</Typography>
                  </Fragment>
                )
                : (
                  <Player
                    ref={video_player_ref}
                    style={{
                      display: "flex",
                      flex: 1,
                      pointerEvents: "none"
                    }}
                    // url="https://youtu.be/bwmSjveL3Lc"
                    // url="/spykids4.mp4"
                    url={url}
                    onReady={() => {
                      setReady(true)
                      // console.log(video_player_ref.current.getDuration())
                      setDuration(video_player_ref.current.getDuration())
                      // setPreview(true)
                    }}
                    pip={false}
                    config={{ file: { attributes: { controlsList: 'nodownload', disablePictureInPicture: true, preload: "none" } } }}
                    onStart={()=>{
                      // setPlaying(false)
                      // setDuration(video_player_ref.current.getDuration())
                      // video_player_ref.current.seekTo(time_stamp, "seconds")
                    }}
                    // onPlay={()=>{console.log("playing")}}
                    // onPause={()=>console.log("pausing")}
                    onEnded={()=>{
                      setPlaying(false)
                      video_player_ref.current.seekTo(0, "seconds")
                      // setProgress(0)
                      // setTimeStamp([0, 0, 0])
                    }}
                    onProgress={(state)=>{
                      // (state.played * 100).toFixed(5)
                      setProgress((state.played * 100).toFixed(5))
                      // console.log("2", (state.played * 100).toFixed(5))
                      // console.log(state.played)
                      // console.log(video_player_ref.current.getCurrentTime())
                      // console.log(state.playedSeconds)
                      // console.log("3", state.played)
                      // setProgress(state.playedSeconds)
                      // set_time_stamp(state.playedSeconds)
                      const time = state.playedSeconds
                      const hours = Math.trunc(time / 3600)
                      const minutes = Math.trunc(((time / 3600) - hours) * 60)
                      const seconds = Math.trunc(((((time / 3600) - hours) * 60) - minutes) * 60)
                      setTimeStamp([hours, minutes, seconds])
                      // console.log("time", hours, minutes, seconds)
                    }}
                    // onEnded={()=>{dispatch(nextModule())}}
                    onBuffer={()=>{
                      setBuffering(true)
                    }}
                    onBufferEnd={()=>{
                      setBuffering(false)
                    }}
                    width='100%'
                    height='100%'
                    // controls={true}
                    // wrapper={Fragment}
                    playing={playing}
                    muted={false}
                    volume={1}/>
                )
              }
            </Stack>
          </ContentCard>
          <Button component="label" variant="outlined" startIcon={<SubtitleIcon/>}>
            <Typography>Add subtitle file</Typography>
            <input type="file" accept=".srt" hidden onChange={(e) => {
              setSubtitle(e.target.value)
            }}/>
          </Button>
        </Stack>
      </Stack>
    </ContentCard>
    <ContentCard title="New Course Info">
      <Stack spacing={1}>
        <InputItem text="Title" inputProps={{
          value: title,
          onChange: (e)=>{
            setTitle(e.target.value)
          }
        }}/>
        <SelectItem text="Subject" options={[
            "Mathematics",
            "Physics",
            "Chemistry",
            "Biology"
        ]}
        value={subject}
        onChange={(value, name) => {
          setSubject(value)
          setSubjectName(name)
        }}
        />
        <ComponentItem text="Preview file" component={
          <Button component="label" variant="outlined">
            <Typography>Choose a preview file</Typography>
            <input type="file" accept=".mp4" hidden onChange={(e) => {
              if(e.target.files[0]){
                let blob = e.target.files[0]
                const fileUrl = URL.createObjectURL(blob)
                setPreview(blob)
              }
            }}/>
          </Button>
        }/>
        <ComponentItem text="Thumbnail image" component={
          <Button component="label" variant="outlined">
            <Typography>Choose a thumbnail image</Typography>
            <input type="file" accept=".jpg, .png" hidden onChange={(e) => {
              if(e.target.files[0]){
                let blob = e.target.files[0]
                const fileUrl = URL.createObjectURL(blob)
                setThumbnail(blob)
              }
            }}/>
          </Button>
        }/>
        <ArrayItem text="Tags" onChange={(value)=>{
            setTags(extractKey(value, "value"))
          }}/>
        <TwoDimArrayItem text="Notes" typeFile onChange={(value)=>{
          const _title = extractKey(value, "title")
          const _text = extractKey(value, "text")
          console.log(value, "text");
          console.log(makeBiKeyObject("title", _title, "text", _text));
          setNotes(makeBiKeyObject("title", _title, "text", _text))
        }}/>
        <ArrayItem text="Links" onChange={(value)=>{
          setLinks(extractKey(value, "value"))
        }}/>
        {/* <ComponentItem text="Notes" component={
          <Button component="label" variant="outlined">
            <Typography>Choose a notes file</Typography>
            <input type="file" accept=".txt" hidden onChange={async (e) => {
              if(e.target.files[0]){
                const fileUrl = URL.createObjectURL(e.target.files[0])
                setNotes(await (await fetch(fileUrl)).text())
                // console.log(await (await fetch(fileUrl)).text())
              }
            }}/>
          </Button>
        }/> */}
        <ComponentItem className="InputItem-textarea" text="Short Description" component={
          <TextField multiline maxRows={3} variant="outlined" sx={{
            padding: 0
          }}
          value={description}
          onChange={(e)=>{
            setDescription(e.target.value)
          }}/>
        }/>
        {/* <ComponentItem text="Date of publication" component={
          <Button component="label" variant="outlined">
            <Typography>19/1/2050</Typography>
            <input type="date" style={{width: 0, height: 0, borderStyle: "none"}}/>
          </Button>
        }/> */}
        <InputItem text="Price" unit="Rwf" inputProps={{
          value: price,
          onChange: (e)=>{
            setPrice(e.target.value)
          }
        }}/>
        <ButtonItem text="allow reviews" checkBox checked={enableReviews} onChecked={(value) => {
          setEnableReviews(value == true)
        }}/>
        <ButtonItem text={uploaded == undefined ? "" : (uploaded == false ? "UPLOADING" : (uploaded == true ? "SUCCESS" : ""))} spacing={2} buttons={[
          {
            text: "Publish",
            props: {
              disabled: (uploaded == true || uploaded == false),
              variant: "contained",
              onClick: ()=>{
                publish()
              }
            }
          }
        ]}/>
        {uploaded == false ? <LinearProgress style={{width: "100%"}}/> : ""}
      </Stack>
    </ContentCard>
    </Stack>
  )
}
