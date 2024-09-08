import {Typography, Stack, TextField, Button} from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useState, Fragment, useEffect } from "react"
import { makeId, maxChars } from "../../utils"

export default ({text, style, onChange, typeFile, placeholder}) => {
  const [internal_value, setInternal_value] = useState("")
  const [internal_file, setInternal_file] = useState()
  const [values, setValues] = useState([])
  const addValue = (value) => {
    if(value){
      if(typeFile){
        setValues([
          ...values,
          {
            id: makeId(5),
            value: value.name || "anonymous",
            file: value,
          }
        ])
      }else{
        setValues([
          ...values,
          {
            id: makeId(5),
            value,
          }
        ])
      }
    }
  }

  const removeValue = (id) => {
    if(id){
      setValues(values.filter(value => (value.id != id)))
    }
  }

  useEffect(() => {
    try{
      onChange(values)
      console.log(values);
    }catch(e){}
  }, [values])

  return (
    <Stack style={style} justifyContent="space-between" alignItems="flex-start" direction="row">
      <span>{text}</span>
      <Stack spacing={1} component={"span"} alignItems="flex-start" direction="column" style={{fontSize: ".8rem", fontWeight: "bold"}}>
        <Stack spacing={1} component={"span"} alignItems="center" direction="row">
          <Fragment>
            {typeFile
            ? (
              <Button component="label" variant="outlined">
                <Typography>
                    {internal_file
                      ? (maxChars(internal_file.name))
                  : "Choose a file"}
                </Typography>
                <input type="file" accept=".txt" hidden onChange={(e) => {
                  if(e.target.files[0] && e.target.files[0].type == "text/plain"){
                    setInternal_file(e.target.files[0])
                    e.target.files = undefined
                  }
                }}/>
              </Button>
            )
            : (
                <TextField className="InputItem-input" placeholder={placeholder} value={internal_value} onChange={(e) => {
                  setInternal_value(e.target.value)
              }}></TextField>
            )}
          </Fragment>
          <Button variant="outlined" style={{
            height: "2rem",
            width: "2rem",
            minWidth: 0,
          }} onClick={() => {
            if(typeFile){
              if (internal_file) {
                console.log(internal_file);
                addValue(internal_file)
                setInternal_file(null)
              }
            } else if (internal_value) {
              addValue(internal_value)
              setInternal_value("")
            }
          }}>
            <AddIcon/>
          </Button>
        </Stack>
        <Fragment>
          {renderItems(values, removeValue)}
        </Fragment>
      </Stack>
    </Stack>
  )
}

const renderItems = (values, removeValue) => {
  const output = Array()
  for (const element of values) {
    const val = element.value
    const id = element.id
    output.push(
      <Stack spacing={1} component={"span"} alignItems="center" direction="row" style={{width: "100%"}}>
        <Button variant="outlined" style={{
          height: "2rem",
          width: "2rem",
          minWidth: 0,
        }} onClick={() => {
          removeValue(id)
        }}>
          <RemoveIcon/>
        </Button>
        <Typography variant="outlined" sx={{borderColor: "primary.main"}} style={{
          height: "2rem",
          minWidth: 0,
          fontSize: "1rem",
          fontWeight: "200",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "4px",
          padding: "0 .5rem",
          display: "flex",
          flex: 1,
          alignItems: "center",
        }}>{maxChars(val)}</Typography>
      </Stack>
    )
  }
  return output
}