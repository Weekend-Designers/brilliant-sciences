import {useEffect, useState} from "react"
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Stack  from '@mui/material/Stack';
import {Button, TextField, IconButton}  from '@mui/material';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/app"
import {GoogleLogin, EmailPasswordLogin, GoogleLogout} from "../../helpers/login"
import {useSelector} from "react-redux"
import {useRouter} from "next/router"

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailHelper, setEmailHelper] = useState("")
  const [passwordHelper, setPasswordHelper] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const loggedIn = useSelector(state => state.User.loggedIn)
  const id = useSelector(state => state.User.id)
  const router = useRouter()

  useEffect(() => {
    // console.log(`/account/${id}`)
    if(loggedIn){
      router.push("/account")
    }
  }, [loggedIn])

  return (
    <Stack style={{width: "70%", margin: "auto"}} component={"span"}>
      <Stack direction="row" style={{
          // backgroundColor: "red",
          margin: "5% 0",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: ".5rem",
          height: "3rem",
          justifyContent: "center",
          alignItems: "center"
          }}>
          <LockIcon style={{marginRight: "1%"}}/>
          <Typography>Log In</Typography>
      </Stack>
      <Stack component={"form"} method={"post"} style={{
        // backgroundColor: "red"
        }}>
        <TextField required color={emailError ? "error" : "primary"} type="email" label="Enter a username or email" helperText={emailHelper} style={{margin: "2% 0"}} value={email} onChange={(e) => {
          setEmail(e.target.value)
          if(e.target.validationMessage != "Email is valid"){
            setEmailHelper(e.target.validationMessage)
            setEmailError(true)
          }else{
            setEmailHelper("")
            setEmailError(false)
          }
        }} onBlur={() => {
          if(!email.trim()){
            setEmailHelper("Provide an email")
            setEmailError(true)
          }else{
            setEmailHelper("")
            setEmailError(false)
          }
        }}/>
        <TextField required color={passwordError ? "error" : "primary"} type="password" label="Enter a password" helperText={passwordHelper}  style={{margin: "2% 0"}} value={password} onChange={(e) => {
          setPassword(e.target.value)
          if(!e.target.value){
            setPasswordHelper("Provide a password")
            setPasswordError(true)
          }else{
            setPasswordHelper("")
            setPasswordError(false)
          }
        }} onBlur={() => {
          if(!password){
            setPasswordHelper("Provide a password")
            setPasswordError(true)
          }else{
            setPasswordHelper("")
            setPasswordError(false)
          }
        }}/>
        {/* <StyledFirebaseAuth uiConfig={loginConfig} firebaseAuth={app.auth()}/> */}
        <Stack direction="row" justify="center" alignItems="center" spacing={1}>
          <Button type="submit" style={{display: 'flex', flex: 1}} variant="outlined" onClick={(e) => {
              e.preventDefault()
              if(email.trim() && password){
                EmailPasswordLogin(email, password, (userInfo) => {
                  if(userInfo != "user-not-found"){
                    const loggedIn = true;
                    const id = userInfo.localId
                    const email = userInfo.email
                    const username = userInfo.displayName
                    const photo = userInfo.photoUrl
                  }else{
                    const createAc = confirm("You have no account, Please Sign Up")
                    if(createAc){
                      // GoogleLogout()
                      router.push("/account/signup")
                    }
                  }
                })
                
              }else{
                if(!email.trim()){
                  setEmailHelper("Provide an email")
                  setEmailError(true)
                }else{
                  setEmailHelper("")
                  setEmailError(false)
                }
                if(!password){
                  setPasswordHelper("Provide a password")
                  setPasswordError(true)
                }else{
                  setPasswordHelper("")
                  setPasswordError(false)
                }
              }
          }}>Log In</Button>
          <Button variant="outlined" style={{whiteSpace: "pre"}} onClick={(e) => {
            GoogleLogout()
            GoogleLogin((userInfo) => {
              if(userInfo){
                const loggedIn = true;
                const id = userInfo.localId
                const email = userInfo.email
                const username = userInfo.displayName
                const photo = userInfo.photoUrl
              }
            })
            dispatch(SET("init user", {
              loggedIn: null,
            }))
          }}>
            <img src="/GoogleLogo.svg"/>
          </Button>
        </Stack>
        <Stack style={{flexDirection: "row", justifyContent: "space-between", margin: "2% 0"}}>
            <a href="/account/signup">I have no account, Sign Up instead!</a>
            <a href="/resetpassword">Forgot password!</a>
        </Stack>
      </Stack>
    </Stack>
  )
}
