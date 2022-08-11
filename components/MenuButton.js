import {Stack, ButtonBase, Typography} from "@mui/material"

export default ({
  id,
  helper,
  children,
  style,
  onClick,
  variant,
  color
}) => {
  const handleClick = (e) => {
      e.stopPropagation()
      try {onClick(id)} catch (e) {}
  }
  return (
    <Stack style={style} component={"span"}>
      <Stack sx={variant == "contained" ? { bgcolor: "primary.main" } : { bgcolor: "white" }} onClick={handleClick} style={{
        padding: helper ? ".5rem .5rem .1rem .5rem" : ".5rem",
        boxShadow: variant == "contained" ? "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)" : "none",
        borderRadius: "4px",
        margin: ".5rem 0",
        cursor: "pointer"
        }} component={"span"}>
        <ButtonBase disableRipple variant={variant} style={{
          padding: "0 0.2rem",
          justifyContent: "flex-start",
          color: variant == "contained" ? "hsl(0, 0%, 100%)" : "hsl(0, 0%, 0%)"
        }}>{children}</ButtonBase>
        <Stack style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          fontSize: ".6rem",
          color: variant == "contained" ? "hsl(0, 0%, 100%)": "hsl(0, 0%, 43%)",
          letterSpacing: ".01rem"
          }}><Typography style={{font: "inherit"}} color={color}>{helper}</Typography></Stack>
      </Stack>
    </Stack>
  )
}