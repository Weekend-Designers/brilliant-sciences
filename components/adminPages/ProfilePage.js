import {Fragment, useState, useEffect} from "react"
import {Stack, Typography, CircularProgress, Button, Select, MenuItem} from "@mui/material"
import {
  PlayArrowRounded as PlayIcon,
  VolumeUpRounded as VolumeIcon,
  VolumeOffRounded as MuteIcon,
  FullscreenRounded as FullscreenIcon,
  FullscreenExitRounded as ExitFullscreenIcon,
} from '@mui/icons-material';
import ContentCard from "../ContentCard"
import ImageCard from "../ImageCard"
import SelectItem from "../settingItems/SelectItem"
import {useSelector} from "react-redux"
import imagepusher from "../../helpers/imagepusher";

export default ({hidden}) => {
  const username = useSelector(state => state.User.username) + " "
  const email = useSelector(state => state.User.email) + " "
  const photo = useSelector(state => state.User.photo)
  const id = useSelector(state => state.User.id)
  const _theme = useSelector(state => state.User.theme)

  const [uploadingImage, setUploadingImage] = useState(false)
  const [image, setImage] = useState(photo || "/apparatus.jpg")
  const [theme, setTheme] = useState(_theme)
  const [themeName, setThemeName] = useState("")

  const handleImageFile = (e) => {
    if(e.target.files[0]){
      const blob = e.target.files[0]
      const url = URL.createObjectURL(blob)
      setUploadingImage(true)
      imagepusher(blob, id, () => {
        setUploadingImage(false)
        setImage(url)
      })
    }
  }

  return (
    <Stack style={{
      display: hidden ? "flex" : "none",
      flex: 1,
      minHeight: "100vh",
      padding: "1rem"
    }}>
      <Stack style={{
        flex: 1,
        borderRadius: "4px",
        overflow: "hidden",
        marginRight: "1rem"
      }}>
        <ContentCard title="Profile">
          <ImageCard style={{maxHeight: "10rem"}} src={image} content={
            [
              [username + "(Admin)"],
              [email],
              [<Button disabled variant="outlined" style={{height: "2rem"}}>Change Password</Button>],
              [<Button component="label" variant="outlined" style={{height: "2rem"}}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography style={{fontSize: ".875rem"}}>Change Profile Picture</Typography>
                  <input type="file" accept=".jpg, .png" hidden onChange={handleImageFile}/>
                  {
                    uploadingImage
                    ? <CircularProgress size={18}/>
                    : <Fragment/>
                  }
                </Stack>
              </Button>]
            ]
          }/>
        </ContentCard>
        <ContentCard spacing={1} title="General/settings">
          <SelectItem text="Theme" options={[
              "Light",
              "Dark"
          ]}
          value={theme}
          onChange={(value, name) => {
            setTheme(value)
            setThemeName(name)
          }}
          />
        </ContentCard>
      </Stack>
    </Stack>
  )
}
