import {Fragment, useState, useEffect} from "react"
import {Stack, Button} from "@mui/material"
import MenuButton from "../MenuButton"
import ContentCard from "../ContentCard"
import InputItem from "../settingItems/InputItem"
import LabelItem from "../settingItems/LabelItem"
import ButtonItem from "../settingItems/ButtonItem"
export default ({hidden}) => {
  const [price1, setPrice1] = useState(5000)
  const [initPrice1, setInitPrice1] = useState(price1)
  const [price2, setPrice2] = useState(9000)
  const [initPrice2, setInitPrice2] = useState(price2)
  useEffect(() => {
    setInitPrice1(price1)
    setInitPrice2(price2)
  }, [])
  
  return (
    <Stack style={{
      display: hidden ? "flex" : "none",
      flex: 1,
      minHeight: "100vh",
      padding: "1rem"
    }}>
      <Stack style={{
        flex: 1,
        borderRadius: "4px",
        overflow: "hidden",
        marginRight: "1rem"
      }}>
        <ContentCard title="Plans">
          <LabelItem text="Pay as you learn plan" value="course dependent" valueProps={{
            sx: {
              borderColor: "primary.main"
            },
            style: {
              borderRadius: "4px",
              borderStyle: "solid",
              borderWidth: "1.5px",
              padding: ".5rem",
              height: "2rem",
              display: "flex",
              alignItems: "center"
            }
          }}/>
        </ContentCard>
        <ContentCard>
          <InputItem text="Choose a preference plan" unit="Rwf" inputProps={{
            value: price1,
            onChange: (e)=>{setPrice1(e.target.value)}
          }}/>
        </ContentCard>
        <ContentCard>
          <InputItem text="Full package plan" unit="Rwf" inputProps={{
            value: price2,
            onChange: (e)=>{setPrice2(e.target.value)}
          }}/>
        </ContentCard>
        <div style={{display: 'flex', flex: 1}}></div>
        <ButtonItem spacing={3} checkBox checked text="Save with discounts" buttons={[
          {
            text: "Save",
            props: {
              variant: "contained",
              style: {
                width: "7rem"
              }
            }
          },
          {
            text: "Cancel",
            props: {
              style: {
                width: "7rem"
              }
            }
          },
        ]}/>
      </Stack>
    </Stack>
  )
}