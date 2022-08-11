import {useState} from "react"
import {Stack, Typography} from "@mui/material"
// import ContentCard from "./ContentCard"

export default ({id, name, text, image, price}) => {
  const [hovered, setHovered] =  useState(false)
    return (
      <Stack alignItems="center" justifyContent="center" style={{
        position: "relative",
      }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{/*backgroundColor: "primary.main"*/}} style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0px 0px 8px -4px black",
        //   borderStyle: "solid",
        //   borderWidth: "1px",
        //   backgroundColor: "white",
          transition: ".5s"
        }}
        onMouseOver={(e) => {
          setHovered(true)
        }}
        onMouseOut={(e) => {
          setHovered(false)
        }}>
            <img src={image} style={{
              display: "flex",
              width: "2.5rem",
              height: "2.3rem",
              // height: "100%",
            //   flex: 1,
              borderStyle: "none",
              borderRadius: "4px",
              alignSelf: "stretch",
              margin: "0.5rem"
            }}/>
            <Typography style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}>{name}</Typography>
            <Stack flex={1} direction="row" alignItems="center" justifyContent="flex-start" style={{
              padding: "0 1rem",
              overflow: "hidden"
            }}>
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
            </Stack>
            <Typography style={{
              fontSize: '0.8rem',
              opacity: "70%",
              letterSpacing: 0.3,
              textAlign: "end",
              marginRight: "1rem"
            }}>{price}</Typography>
        </Stack>
      </Stack>
    )
  }
  