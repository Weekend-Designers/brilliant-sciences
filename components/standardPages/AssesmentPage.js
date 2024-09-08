import {Fragment, useState} from "react"
import { Stack, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import ContentCard from "../ContentCard"
import { useSelector } from "react-redux";

export default ({hidden}) => {
  const assesment = useSelector(state => state.Course.assesment)
  const [question, setQuestion] = useState(0)
  const [checked, setChecked] = useState(-1)

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
        {(assesment.length > 0)
        ? (
          <Fragment>
            {/* spacing i0 */}
            <ContentCard style={{display: "flex", flex: 1}} title={`${question+1}. ${assesment[question].question}`}>
              <RadioGroup sx={{padding: "1rem 1.5rem"}}>
                  {assesment[question].options.map((opt, index) => (
                      <FormControlLabel
                      key={`form_label_${index}`}
                      control={<Radio />}
                      label={opt}
                      checked={checked == index}
                      onClick={() => {
                        setChecked(index)
                      }}/>
                  ))}
              </RadioGroup>
          </ContentCard>
          {/* spacing */}
          <Stack direction="row" style={{
              padding: "0 .5rem"
          }}>
            <Button
              disabled={question == 0}
              variant="contained"
              onClick={() => {
                if(question > 0){
                  setQuestion(question - 1)
                }
                setChecked(-1)
            }}>Back</Button>
            <Stack style={{fontSize: ".8rem"}} className="flex-1" alignItems="center">{question+1}/{assesment.length}</Stack>
            <Button
              variant="contained"
              onClick={() => {
                if(question == (assesment.length - 1)){
                  alert("Congratulations you completed your assesment")
                }else{
                  setQuestion(question + 1)
                }
                setChecked(-1)
              }}>{
                  question == (assesment.length - 1)
                  ? "Submit"
                  : "Next"
            }</Button>
          </Stack>
        </Fragment>)
        : (
          <ContentCard>
            Sorry, No Assesment Available
          </ContentCard>
        )
        }
      </Stack>
    </Stack>
  )
}

