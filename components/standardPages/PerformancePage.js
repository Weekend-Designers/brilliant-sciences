import {Fragment} from "react"
import {Stack, Slider, IconButton, Button, Select, MenuItem} from "@mui/material"
import {
  PlayArrowRounded as PlayIcon,
  VolumeUpRounded as VolumeIcon,
  VolumeOffRounded as MuteIcon,
  FullscreenRounded as FullscreenIcon,
  FullscreenExitRounded as ExitFullscreenIcon,
} from '@mui/icons-material';
import ContentCard from "../ContentCard"
import ImageCard from "../ImageCard"
import LabelItem from "../settingItems/LabelItem"
import EvaluationItem from "../settingItems/EvaluationItem"

export default ({hidden}) => {
  const pecentage = 85
  const performanceTable = [
    ["electricity", true],
    ["embedded systems", true],
    ["construction", true],
    ["music production", true],
    ["religious education", false],
    ["telecommunication", true],
    ["human anatomy", false],
    ["social studies", true],
  ]
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
        <ContentCard title="Performance">
          <LabelItem text="Overall performance" valueProps={{style: {fontSize: "1.3rem"}}} value={`${pecentage}%`}/>
        </ContentCard>
        <ContentCard title="Taken Courses">
          <EvaluationItem list={performanceTable}/>
        </ContentCard>
      </Stack>
    </Stack>
  )
}
