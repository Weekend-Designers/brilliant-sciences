import {Button, Stack, TextField, Typography} from "@mui/material"
import ArrayItem from "./ArrayItem"
import RemoveIcon from '@mui/icons-material/Remove'
import { useState, useEffect } from "react"
import { extractKey, makeId } from "../../utils"

export default ({text, value, onChange, placeholder1, placeholder2}) => {
  const [data, set_data] = useState([])

  const removeQuestion = (id) => {
    if(id){
      set_data(
        data.filter(datum => (datum.id != id))
      )
    }
  }

  useEffect(() => {
    try{
      onChange(data)
      console.log(data);
    }catch(e){}
  }, [data])

  return (
    <Stack spacing={2}>
      {renderQuestions(data, set_data, removeQuestion, placeholder1, placeholder2)}
      <Button style={{height: "2rem", flex: 1}} variant="outlined" onClick={() => {
        set_data(
          [
            ...data,
            {
              id: makeId(5),
              question: "",
              options: [],
            }
          ]
        )
      }}>Add a Question</Button>
    </Stack>
  )
}

const renderQuestions = (data, set_data, removeQuestion, placeholder1, placeholder2) => {
  let output = Array()
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    output.push(
      <Stack key={i} spacing={1} justifyContent="space-between" alignItems="flex-start" direction="row">
        <Stack spacing={1} style={{flex: 1}} direction="row">
          <Button variant="outlined" style={{
            height: "2rem",
            width: "2rem",
            minWidth: 0,
          }} onClick={() => {
            removeQuestion(item.id)
          }}>
            <RemoveIcon/>
          </Button>
          <TextField className="InputItem-input" value={item.question} onChange={(e) => {
            set_data(
              data.map(datum => {
                if(datum.id == item.id){
                  return {...datum, question: e.target.value}
                }
                return datum
              })
            )
          }} style={{flex: 1}} placeholder={placeholder1}/>
        </Stack>
        <ArrayItem placeholder={placeholder2} onChange={(_data) => {
            set_data(
              data.map(datum => {
                if(datum.id == item.id){
                  return {...datum, options: extractKey(_data, "value")}
                }
                return datum
              })
            )
          }}/>
      </Stack>
    )
  }
  return output
}