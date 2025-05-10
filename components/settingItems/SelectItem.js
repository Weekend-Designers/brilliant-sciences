import {useState} from "react"
import {Select, Stack, MenuItem} from "@mui/material"

export default ({text, options, value, onChange}) => {
  const [val, setValue] = useState(value)
  return (
    <Stack id="preferred-course-select-label" justifyContent="space-between" direction="row">
      <span>{text}</span>
      <Select labelId="preferred-course-select-label" value={val} style={{
        minWidth: "30%",
        height: "2rem"
      }}>
        {
          options && (
            options.map((opt, index) => (
              <MenuItem key={"preferred-course-select-label"+index} value={index+1} onClick={()=>{
                setValue(index+1);
                try{
                  onChange(opt, index+1)
                }catch(e){
                  try{
                    onChange(opt)
                  }catch(e){}
                }
              }}>{opt}</MenuItem>
            ))
          )
        }
      </Select>
    </Stack>
  )
}