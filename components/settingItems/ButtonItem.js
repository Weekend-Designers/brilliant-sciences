import {Fragment} from "react"
import {Button, Stack, Checkbox, Typography} from "@mui/material"

export default ({text, style, valueProps, checkBox, checked, buttons, spacing, onChecked}) => {
  return (
    <Stack style={style} justifyContent="space-between" alignItems="center" direction="row">
      {
        checkBox
        ? <Stack direction="row" alignItems="center" spacing={1}>
            <Checkbox defaultChecked={checked} onChange={(e) => {
              try{onChecked(e.target.checked)}catch(e){}
            }}/>
            <Typography style={{fontSize: "1rem", fontWeight: "normal"}}>{text}</Typography>
          </Stack>
        : <Typography style={{fontSize: "1rem", fontWeight: "normal"}}>{text}</Typography>
      }
      <Stack direction="row" alignItems="center" spacing={spacing}>
        {
          buttons
          ? renderButtons(buttons)
          : <Fragment/>
        }
      </Stack>
    </Stack>
  )
}

const renderButtons = (buttons) => {
  let output  = Array()
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i]
    output.push(<Button style={{height: "2rem"}} variant="outlined" {...btn.props}>{btn.text}</Button>)
  }
  return output
}