import { useEffect, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Stack  from '@mui/material/Stack';
import {Button, TextField}  from '@mui/material';
import {GoogleLogin, EmailPasswordLogin, GoogleLogout} from "../../helpers/login"
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { EmailPasswordSignup } from '../../helpers/signup';
import { SET } from '../../redux/actions';

export default () => {
  const loggedIn = useSelector(state => state.User.loggedIn)
  const dispatch = useDispatch()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [confPassword, setConfPassword] = useState("")

  const [emailHelper, setEmailHelper] = useState("")
  const [passwordHelper, setPasswordHelper] = useState("")
  const [usernameHelper, setUsernameHelper] = useState("")
  const [confPasswordHelper, setConfPasswordHelper] = useState("")
  
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [confPasswordError, setConfPasswordError] = useState(false)
  
  useEffect(() => {
    // console.log(`/account/${id}`)
    if(loggedIn){
      router.push("/account/login")
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
        <Typography>Sign Up</Typography>
      </Stack>
      <Stack component={"span"} style={{
        // backgroundColor: "red"
        }}>
        <TextField required color={usernameError ? "error" : "primary"} type="text" label="Enter a username" helperText={usernameHelper} style={{margin: "2% 0"}} value={username} onChange={(e) => {
          setUsername(e.target.value)
          if(!e.target.value.trim()){
            setUsernameHelper("Provide a username")
            setUsernameError(true)
          }else{
            setUsernameHelper("")
            setUsernameError(false)
          }
        }} onBlur={() => {
          if(!username.trim()){
            setUsernameHelper("Provide a username")
            setUsernameError(true)
          }else{
            setUsernameHelper("")
            setUsernameError(false)
          }
        }}/>
        <TextField required color={emailError ? "error" : "primary"} type="email" label="Enter your email" helperText={emailHelper} style={{margin: "2% 0"}} value={email} onChange={(e) => {
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
        <TextField required color={confPasswordError ? "error" : "primary"} type="password" label="Confirm the password" helperText={confPasswordHelper}  style={{margin: "2% 0"}} value={confPassword} onChange={(e) => {
          setConfPassword(e.target.value)
          if(!e.target.value){
            setConfPasswordHelper("Provide a confirmation password")
            setConfPasswordError(true)
          }else{
            setConfPasswordHelper("")
            setConfPasswordError(false)
          }
        }} onBlur={() => {
          if(!confPassword){
            setConfPasswordHelper("Provide a confirmation password")
            setConfPasswordError(true)
          }else{
            setConfPasswordHelper("")
            setConfPasswordError(false)
          }
        }}/>
        <Stack direction="row" justify="center" alignItems="center" spacing={1}>
          <Button type="submit" style={{display: 'flex', flex: 1}} variant="outlined" onClick={(e) => {
              e.preventDefault()
              if(username.trim() && email.trim() && password && confPassword == password) {
                EmailPasswordSignup(username, email, password, (userInfo) => {
                  if(userInfo){
                    const loggedIn = true;
                    const id = userInfo.localId
                    const email = userInfo.email
                    const username = userInfo.displayName
                    const photo = userInfo.photoUrl
                    dispatch(SET("init user", {loggedIn: null}))
                    dispatch(SET("init user", userInfo))
                  }
                })
              }else{
                if(!username.trim()){
                  setUsernameHelper("Provide a username")
                  setUsernameError(true)
                }else{
                  setUsernameHelper("")
                  setUsernameError(false)
                }
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
                if(!confPassword){
                  setConfPasswordHelper("Provide a confirmation password")
                  setConfPasswordError(true)
                }else if(confPassword != password){
                  setConfPasswordHelper("Confirmation password must match the password above")
                  setConfPasswordError(true)
                }else{
                  setConfPasswordHelper("")
                  setConfPasswordError(false)
                }
              }
          }}>Sign Up</Button>
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
          }}>
            <img src="/GoogleLogo.svg"/>
          </Button>
        </Stack>
        <Stack style={{flexDirection: "row", justifyContent: "space-between", margin: "2% 0"}}>
            <a></a>
            <a href="/account/login">I already have an account, Log In instead!</a>
        </Stack>
      </Stack>
    </Stack>
  )
}  