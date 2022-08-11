import {Fragment} from "react"
import {Stack, Box, Typography, Button, Select, MenuItem} from "@mui/material"
import ContentCard from "../ContentCard"
import Table from "../Table"

export default ({hidden}) => {
  const data = [
    [0, "Title", 'Subject', 'Date', "Status"],
    [1, "electricity", 'physics', '12/2/22', <Typography>pending</Typography>],
    [2, "cell study", 'biology', '13/3/22', <Typography>Done</Typography>],
    [3, "reactions", '-', '13/3/22', <Typography>pending</Typography>],
    [4, "thermo dynamics", '-', '14/7/22', <Typography>pending</Typography>],
  ]

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
        <ContentCard title="Requests">
          <Table data={data}/>
        </ContentCard>
      </Stack>
    </Stack>
  )
}
