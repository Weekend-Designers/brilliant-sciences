import {Fragment} from 'react'
import {Stack, TextField, CircularProgress} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

export default ({inProgress, startIcon}) => {
  return (
    <Stack color="primary" sx={{borderColor: "primary.main"}} direction="row" alignItems="center" style={{
      borderRadius: "4px",
      borderStyle: "solid",
      borderWidth: "1.5px",
      height: "fit-content",
      padding: "0 0.3rem"
    }}>
      {startIcon}
      <input style={{
        borderStyle: "none",
        padding: ".3rem",
        outline: "none",
      }}/>
      {
        inProgress == true
        ? <CircularProgress size={18}/>
        : <Fragment/>
      }
    </Stack>
  )
}
