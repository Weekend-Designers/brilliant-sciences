import { useState, useRef } from "react"
import { Stack, Typography, LinearProgress } from "@mui/material"
import Player from "react-player"
import { useRouter } from "next/router"

export default ({id, name, text, image, video, price, onClick}) => {
  const [hovered, setHovered] =  useState(false)
  const [preview, setPreview] =  useState(false)
  const [buffering, setBuffering] =  useState(false)
  const video_player_ref = useRef("video_player_ref")
  const router = useRouter() // NOSONAR
  const toref = useRef()
  return (
    <Stack alignItems="center" justifyContent="center" style={{
      position: "relative",
    }}>
      <Stack className={hovered ? "expand-on-hover" : ""} sx={{borderColor: "primary.main"}} style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: "4px",
        overflow: "hidden",
        borderStyle: "solid",
        borderWidth: "1px",
        backgroundColor: "white",
        transition: ".5s"
      }}
      onClick={(e) => {
        e.stopPropagation()
        try{
          onClick()
        } catch (e) { }
      }}
      onMouseOver={(e) => {
        setTimeout(() => {
          setHovered(true)
        }, 400);
        clearTimeout(toref.current)
      }}
      onMouseOut={(e) => {
        setTimeout(() => {
          setHovered(false)
        }, 400);
        toref.current = setTimeout(() => {
          if (preview) {
            video_player_ref.current.seekTo(0, "seconds")
          }
        }, (10 * 1000));
      }}>
        <Stack alignItems="flex-start" justifyContent="flex-center" style={{
          position: "relative"
        }}>
          {
            hovered && (!preview || buffering)
            && (
              <Stack style={{
                position: "absolute",
                zIndex: 60,
                color: "white",
                padding: "3rem 0",
                width: "100%",
                alignItems: "center",
              }}>
                {video ? "" : "No Preview available"}
              </Stack>
            )
          }
        </Stack>
        <Stack flex={1} fullWidth style={{
          position: "relative"
        }}>
          <Player
          ref={video_player_ref}
          className="video_player"
          style={{
            display: "flex",
            flex: 1,
            borderStyle: "none",
            borderRadius: "4px 4px 0 0",
            alignSelf: "stretch",
            backgroundColor: "black",
            justifyContent: "center",
            pointerEvents: "none",
            position: "absolute",
            opacity: hovered ? 1 : 0
          }}
            url={video}
          onReady={() => {
            setPreview(true)
          }}
          pip={false}
            config={{ file: { attributes: { controlsList: 'nodownload', disablePictureInPicture: true, preload: "none" } } }}
          onBuffer={()=>{
            setBuffering(true)
          }}
          onBufferEnd={()=>{
            setBuffering(false)
          }}
          width='100%'
            height='100%'
          playing={hovered}
          muted={true}
            loop={true} />
          <div src={image} style={{
            display: "flex",
            flex: 1,
            borderStyle: "none",
            borderRadius: "4px 4px 0 0",
            alignSelf: "stretch",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}/>
        </Stack>
        {
          hovered && (!preview || buffering) && video
          && (
            <LinearProgress style={{width: "100%"}}/>
          )
        }
        <Stack style={{
          padding: "0.3rem 0.5rem",
          pointerEvents: "none",
          borderTop: "#1976d2",
          borderWidth: "1px 0 0 0",
          borderStyle: "solid",
        }}>
          <Typography style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden"
          }}>{name}</Typography>
          <Typography style={{
            fontSize: '0.8rem',
            opacity: "70%",
            letterSpacing: 0.3,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden"
          }}>
            {text}
          </Typography>
          <Typography style={{
            fontSize: '0.8rem',
            opacity: "70%",
            letterSpacing: 0.3,
            textAlign: "end"
          }}>{price}</Typography>
        </Stack>
      </Stack>
    </Stack>
    )
  }
  