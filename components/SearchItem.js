import {useState} from "react"
import { Stack, Typography } from "@mui/material"

export default ({id, name, text, image, price}) => {
  const [hovered, setHovered] = useState(false) // NOSONAR
    return (
      <Stack alignItems="center" justifyContent="center" style={{
        position: "relative",
      }}>
        <Stack direction="row" alignItems="center" spacing={1} style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0px 0px 8px -4px black",
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
              borderStyle: "none",
              borderRadius: "4px",
              alignSelf: "stretch",
              margin: "0.5rem"
          }} alt="search icon" />
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
  