import { Fragment, useState, useEffect, useRef } from "react"
import { Stack, IconButton, Typography, Button, CircularProgress, TextField, LinearProgress } from "@mui/material"
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
import { makeIdNotIn, extractIndex, makeBiKeyObject, extractKey } from "../../utils"
import Player from "react-player"
import coursepusher from "../../helpers/coursepusher"
import ArrayItem from "../settingItems/ArrayItem"
import TwoDimArrayItem from "../settingItems/TwoDimArrayItem"
import LabeledArray from "../settingItems/LabeledArray"

const data1 = [
  [0, "Title", 'Traffic', 'Dop', "", ""],
  [1, "electricity", 10, '12/2/22', <NonPropagationButton key={1} variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton key={1} variant="outlined">Unpublish</NonPropagationButton>],
  [2, "electricity", 10, '12/2/22', <NonPropagationButton key={2} variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton key={2} variant="outlined">Unpublish</NonPropagationButton>],
  [3, "cell study", 4, '13/3/22', <NonPropagationButton key={3} variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton key={3} variant="outlined">Unpublish</NonPropagationButton>],
  [4, "cell study", 4, '13/3/22', <NonPropagationButton key={4} variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton key={4} variant="outlined">Unpublish</NonPropagationButton>],
]
const data2 = [
  [0, "Title", 'Traffic', 'Dop', "", ""],
  [1, "electricity", 10, '12/2/22', <NonPropagationButton key={1} variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton key={1} color="error" variant="outlined">Delete</NonPropagationButton>],
  [2, "electricity", 10, '12/2/22', <NonPropagationButton key={2} variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton key={2} color="error" variant="outlined">Delete</NonPropagationButton>],
  [3, "cell study", 4, '13/3/22', <NonPropagationButton key={3} variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton key={3} color="error" variant="outlined">Delete</NonPropagationButton>],
  [4, "cell study", 4, '13/3/22', <NonPropagationButton key={4} variant="outlined">Edit</NonPropagationButton>, <NonPropagationButton key={4} color="error" variant="outlined">Delete</NonPropagationButton>],
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

export default ({ hidden }) => {
  const [newCoursing, setNewCoursing] = useState(true)

  return (
    <Stack style={{
      display: hidden ? "flex" : "none",
      flex: 1,
      minHeight: "100vh",
      height: "100vh",
      maxHeight: "100vh",
    }}>
      <Stack style={{
        flex: 1,
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative"
      }}>
        <Stack direction="row" spacing={1} style={{
          position: "absolute",
          width: "200%",
          transition: ".5s ease",
          marginLeft: newCoursing ? "-100%" : "0%"
        }}>
          <Page1 setNewCoursing={setNewCoursing} />
          <Page2 setNewCoursing={setNewCoursing} />
        </Stack>
      </Stack>
    </Stack>
  )
}

const Page1 = ({ setNewCoursing }) => {
  return (
    <Stack spacing={1} style={{
      width: "50%",
      overflow: "auto",
      height: "100vh",
      padding: "1rem",
      borderRadius: "4px",
      margin: 0
    }}>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined">Published</Button>
        <Button variant="outlined">Unpublished</Button>
        <Stack sx={{ flex: 1 }} />
        <Button variant="contained" onClick={() => { setNewCoursing(true) }}>New</Button>
      </Stack>
      <Stack spacing={1.5} className="Courses-Page-Cards-Container">
        <ContentCard title="Published courses">
          <Table className="Published-Course-Table-data-Container" data={data1} />
        </ContentCard>
        <ContentCard title="Unpublished courses">
          <Table data={data2} />
        </ContentCard>
      </Stack>
    </Stack>
  )
}

const Page2 = ({ setNewCoursing }) => {
  const [flags, setFlags] = useState(data4)
  const [removeFlag, setRemoveFlag] = useState(0)
  const addFlag = (flag) => {
    if (flag) {
      setFlags([...flags, flag])
    }
  }
  useEffect(() => {
    if (removeFlag != 0) {
      setFlags(flags.filter((flag, index) => (flag[0] != removeFlag)))
    }
  }, [removeFlag])

  const [flagName, setFlagName] = useState("")

  const [timeStamp, setTimeStamp] = useState([0, 0, 0])
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  // TODO: implement buffering for this player
  const [buffering, setBuffering] = useState(false) // NOSONAR
  const video_player_ref = useRef("video_player_ref")
  const [url, setUrl] = useState("")
  const [video, setVideo] = useState()
  const [dragAbove, setDragAbove] = useState(false)
  const [ready, setReady] = useState(false)

  const handleVideoFile = (e) => {
    if (e.target.files[0]) {
      setReady(false)
      let blob = e.target.files[0]
      setVideo(blob)
      const fileUrl = URL.createObjectURL(blob)
      setUrl(fileUrl)
    }
  }

  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState(1)
  const [subjectName, setSubjectName] = useState("") // NOSONAR
  const [preview, setPreview] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [subtitle, setSubtitle] = useState()
  const [tags, setTags] = useState([])
  const [links, setLinks] = useState([])
  const [notes, setNotes] = useState([])
  const [assesment, setAssesment] = useState([])
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("0")
  const [enableReviews, setEnableReviews] = useState(true)

  const [uploaded, setUploaded] = useState(undefined)

  const publish = () => {
    setUploaded(false)
    let allflags = flags.filter((flg, index) => (index != 0))
    let sectionsStamps = extractIndex(allflags, 4) || []
    let sectionsTitles = extractIndex(allflags, 2) || []
    console.log(sectionsStamps);
    console.log(sectionsTitles);
    let _sections = makeBiKeyObject("title", sectionsTitles, "stamp", sectionsStamps)
    console.log(_sections);
    // TODO: sanitize all text fields to prevent XXS
    console.log(thumbnail, video);
    const _notes = [...notes, { title: "Links", links: links }]
    coursepusher(title, subject, tags, _notes, description, assesment, price, subtitle, _sections, enableReviews, preview, thumbnail, video, () => {
      setUploaded(true)
    })
  }

  return (
    <Stack spacing={1} style={{
      width: "50%",
      overflow: "auto",
      height: "100vh",
      padding: "1rem",
      borderRadius: "4px",
      margin: 0
    }}>
      <ButtonItem text spacing={2} buttons={[
        {
          text: "Cancel",
          props: {
            onClick: () => setNewCoursing ?? (false)
          }
        }
      ]} />
      <ContentCard title="New Course Video">
        <Stack spacing={1.5} direction="row">
          <Stack flex={1}>
            <Stack spacing={2} direction="row" justifyContent="space-evenly" alignItems="center">
              <IconButton disabled={!ready} draggable={true} onClick={(e) => {
                if (url && ready) {
                  const hours = Math.trunc(duration / 3600)
                  const minutes = Math.trunc(((duration / 3600) - hours) * 60)
                  const seconds = Math.trunc(((((duration / 3600) - hours) * 60) - minutes) * 60)

                  const newProgress = parseFloat(progress) - ((hours + minutes + seconds) / 3600)

                  video_player_ref.current.seekTo(((newProgress / 100) * duration).toFixed(5), "seconds")
                  setProgress(newProgress)
                }
              }}
                onDoubleClick={(e) => {
                  if (url && ready) {
                    const hours = Math.trunc(duration / 3600)
                    const minutes = Math.trunc(((duration / 3600) - hours) * 60)
                    const seconds = Math.trunc(((((duration / 3600) - hours) * 60) - minutes) * 60)

                    const newProgress = parseFloat(progress) - (((hours + minutes + seconds) / 3600) * (10 * e.detail))

                    video_player_ref.current.seekTo(((newProgress / 100) * duration).toFixed(5), "seconds")
                    setProgress(newProgress)
                  }
                }}><SkipBackIcon /></IconButton>
              <Typography disabled={!ready}>
                {timeStamp[0] > 0 ? `${timeStamp[0] < 10 ? `0${timeStamp[0]}` : timeStamp[0]}:` : ""} {/* NOSONAR */}
                {timeStamp[1] < 10 ? `0${timeStamp[1]}` : timeStamp[1]}:{timeStamp[2] < 10 ? `0${timeStamp[2]}` : timeStamp[2]}
              </Typography>
              <IconButton disabled={!ready} draggable={true} onClick={(e) => {
                if (url && ready) {
                  const hours = Math.trunc(duration / 3600)
                  const minutes = Math.trunc(((duration / 3600) - hours) * 60)
                  const seconds = Math.trunc(((((duration / 3600) - hours) * 60) - minutes) * 60)

                  const newProgress = parseFloat(progress) + ((hours + minutes + seconds) / 3600)

                  video_player_ref.current.seekTo(((newProgress / 100) * duration).toFixed(5), "seconds")
                  setProgress(newProgress)
                }
              }}
                onDoubleClick={(e) => {
                  if (url && ready) {
                    const hours = Math.trunc(duration / 3600)
                    const minutes = Math.trunc(((duration / 3600) - hours) * 60)
                    const seconds = Math.trunc(((((duration / 3600) - hours) * 60) - minutes) * 60)

                    const newProgress = parseFloat(progress) + (((hours + minutes + seconds) / 3600) * (10 * e.detail))

                    video_player_ref.current.seekTo(((newProgress / 100) * duration).toFixed(5), "seconds")
                    setProgress(newProgress)
                  }
                }}><SkipNextIcon /></IconButton>
              <IconButton disabled={!ready} onClick={() => {
                if (url && ready) {
                  setPlaying(!playing)
                }
              }}>
                {
                  playing
                    ? <PauseIcon />
                    : <PlayIcon />
                }
              </IconButton>
              {
                ready
                && <TextField disabled={!ready} className="InputItem-input" value={flagName} onChange={(e) => { setFlagName(e.target.value) }} />
              }
              <IconButton disabled={!ready} onMouseUp={(e) => {
                const id = makeIdNotIn([...extractIndex(flags), removeFlag])
                e.stopPropagation();
                const time_stamp = String(timeStamp[0] > 0 ? `${timeStamp[0] < 10 ? `0${timeStamp[0]}` : timeStamp[0]}:` : "") + String(timeStamp[1] < 10 ? `0${timeStamp[1]}` : `${timeStamp[1]}`) + String(`:${timeStamp[2] < 10 ? `0${timeStamp[2]}` : timeStamp[2]}`) // NOSONAR
                if (String(flagName).trim() && url && ready) {
                  const time_stamps = extractIndex(flags, 1)
                  if (!time_stamps.includes(time_stamp)) {
                    addFlag([
                      id,
                      time_stamp,
                      flagName,
                      <IconButton key={`delete_button_${id}`} color="error" onClick={(e) => {
                        e.stopPropagation();
                        setRemoveFlag(id)
                      }}><DeleteIcon /></IconButton>,
                      progress
                    ])
                  }
                }
              }}><FlagIcon /></IconButton>
              {
                url && !ready
                && <CircularProgress size={18} />
              }
            </Stack>
            <ContentCard innerStyle={{
              maxHeight: "15rem",
              overflow: "auto"
            }}>
              <Table className="CoursePage-table" data={flags} hasHelper attributes onClick={(index) => {
                if (index && flags[index][4]) {
                  console.log("click", index, flags[index][4])
                  video_player_ref.current.seekTo(((flags[index][4] / 100) * duration), "seconds")
                  setProgress(flags[index][4])
                }
              }} />
            </ContentCard>
          </Stack>
          <Stack flex={1}>
            <ContentCard innerStyle={{ borderStyle: "none" }} noPad>
              <Stack className={dragAbove ? "drop-container-hovered" : ""}
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
                  if (url && ready) {
                    setPlaying(!playing)
                  }
                }}
                style={{ background: "black", borderRadius: "5px", height: "15rem", width: "100%", color: "white" }} justifyContent="center" alignItems="center">
                {/* Video Player */}
                {
                  !url
                    ? (
                      <Fragment>
                        <input id="video-file" type="file" accept=".mp4" hidden onChange={handleVideoFile} />
                        Drag and Drop a video File
                        <Typography component="label" htmlFor="video-file" color="primary" style={{ textDecoration: "underline", fontSize: ".8rem", fontWeight: 200, letterSpacing: ".03rem", cursor: "pointer" }}>choose a file</Typography>
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
                        url={url}
                        onReady={() => {
                          setReady(true)
                          setDuration(video_player_ref.current.getDuration())
                        }}
                        pip={false}
                        config={{ file: { attributes: { controlsList: 'nodownload', disablePictureInPicture: true, preload: "none" } } }}
                        onEnded={() => {
                          setPlaying(false)
                          video_player_ref.current.seekTo(0, "seconds")
                        }}
                        onProgress={(state) => {
                          setProgress((state.played * 100).toFixed(5))
                          const time = state.playedSeconds
                          const hours = Math.trunc(time / 3600)
                          const minutes = Math.trunc(((time / 3600) - hours) * 60)
                          const seconds = Math.trunc(((((time / 3600) - hours) * 60) - minutes) * 60)
                          setTimeStamp([hours, minutes, seconds])
                        }}
                        onBuffer={() => {
                          setBuffering(true)
                        }}
                        onBufferEnd={() => {
                          setBuffering(false)
                        }}
                        width='100%'
                        height='100%'
                        playing={playing}
                        muted={false}
                        volume={1} />
                    )
                }
              </Stack>
            </ContentCard>
            <Button component="label" variant="outlined" startIcon={<SubtitleIcon />}>
              <Typography>Add subtitle file</Typography>
              <input type="file" accept=".srt" hidden onChange={(e) => {
                setSubtitle(e.target.value)
              }} />
            </Button>
          </Stack>
        </Stack>
      </ContentCard>
      <ContentCard title="New Course Assesment">
        <LabeledArray placeholder1="Type A Question" placeholder2="Add a New Option" onChange={(data) => {
          setAssesment(data)
        }} />
      </ContentCard>
      <ContentCard title="New Course Info">
        <Stack spacing={1}>
          <InputItem text="Title" inputProps={{
            value: title,
            onChange: (e) => {
              setTitle(e.target.value)
            }
          }} />
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
                if (e.target.files[0]) {
                  let blob = e.target.files[0]
                  setPreview(blob)
                }
              }} />
            </Button>
          } />
          <ComponentItem text="Thumbnail image" component={
            <Button component="label" variant="outlined">
              <Typography>Choose a thumbnail image</Typography>
              <input type="file" accept=".jpg, .png" hidden onChange={(e) => {
                if (e.target.files[0]) {
                  let blob = e.target.files[0]
                  setThumbnail(blob)
                }
              }} />
            </Button>
          } />
          <ArrayItem text="Tags" onChange={(value) => {
            setTags(extractKey(value, "value"))
          }} />
          <TwoDimArrayItem text="Notes" typeFile onChange={(value) => {
            const _title = extractKey(value, "title")
            const _text = extractKey(value, "text")
            console.log(value, "text");
            console.log(makeBiKeyObject("title", _title, "text", _text));
            setNotes(makeBiKeyObject("title", _title, "text", _text))
          }} />
          <ArrayItem text="Links" onChange={(value) => {
            setLinks(extractKey(value, "value"))
          }} />
          <ComponentItem className="InputItem-textarea" text="Short Description" component={
            <TextField multiline maxRows={3} variant="outlined" sx={{
              padding: 0
            }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }} />
          } />
          <InputItem text="Price" unit="Rwf" inputProps={{
            value: price,
            onChange: (e) => {
              setPrice(e.target.value)
            }
          }} />
          <ButtonItem text="allow reviews" checkBox checked={enableReviews} onChecked={(value) => {
            setEnableReviews(!!value)
          }} />
          <ButtonItem
            text={uploaded == undefined ? "" : (!uploaded ? "UPLOADING" : "SUCCESS")} // NOSONAR
            spacing={2} buttons={[
              {
                text: "Publish",
                props: {
                  disabled: (!!uploaded || !uploaded),
                  variant: "contained",
                  onClick: () => {
                    publish()
                  }
                }
              }
            ]} />
          {!uploaded ? <LinearProgress style={{ width: "100%" }} /> : ""}
        </Stack>
      </ContentCard>
    </Stack>
  )
}
