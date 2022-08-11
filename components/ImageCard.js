import {Card, Stack, CardContent, Typography} from "@mui/material"

export default ({src, content, style}) => {
    return (
      <Stack spacing={1} direction="row" style={{
        maxHeight: "8rem",
        ...style}}>
        <Stack
          component="img"
          sx={{
            width: style ? (style.maxHeight ? style.maxHeight : "8rem") : "8rem",
            height: "100%",
            borderRadius: "4px"
          }}
          src={src}
          alt="profile"
        />
        <Stack spacing={0.5}>
            {
                content.map(cont => (
                    <Typography variant="subtitle1" component="div">
                        {cont[0]}{cont[1] ? `: ${cont[1]}` : ""}
                    </Typography>
                ))
            }
        </Stack>
      </Stack>
    )
}