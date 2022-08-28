import {Fragment} from "react"
import {Stack, Slider, IconButton} from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  PlayArrowRounded as PlayIcon,
  VolumeUpRounded as VolumeIcon,
  VolumeOffRounded as MuteIcon,
  FullscreenRounded as FullscreenIcon,
  FullscreenExitRounded as ExitFullscreenIcon,
} from '@mui/icons-material';
import ContentCard from "../ContentCard"
import ImageCard from "../ImageCard"
import {maxWords} from "../../utils"
import { useSelector } from "react-redux";

export default ({hidden}) => {
  const notes = useSelector(state => state.Course.notes) || []
  const author = useSelector(state => state.Course.author)
  const biography = useSelector(state => state.Course.biography)
  return (
    <Stack style={{
      display: hidden ? "flex" : "none",
      flex: 1,
      minHeight: "100vh",
      padding: "1rem"
    }}>
      <Stack spacing={2} style={{
        flex: 1,
        marginRight: "1rem"
      }}>
        {notes && notes.length > 0
        ? (notes.map(desc => {
          if(desc.title == "Links"){
            return (<ContentCard title={desc.title}>
              {desc.links.map(link => (<a href={link}>{link}</a>))}
            </ContentCard>)
          }else{
            return (<ContentCard title={desc.title}>
              {desc.text}
            </ContentCard>)
          }
        }))
        : (
          <ContentCard>
            Sorry, No Description Available
          </ContentCard>
        )}
        {author && biography
        ? (<ContentCard title="Author">
          <ImageCard src="/apparatus.jpg" content={
            [
              ["Name", author],
              ["Bio", maxWords(biography)]
            ]
          }/>
        </ContentCard>)
        : (<Fragment/>)}
      </Stack>
    </Stack>
  )
}

