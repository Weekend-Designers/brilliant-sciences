import {Fragment, useEffect} from "react"
import StandardProfile from "../../components/StandardProfile"
import AdminProfile from "../../components/AdminProfile"
import {useSelector} from "react-redux"
import {useRouter} from "next/router"

export default () => {
  const is_admin = useSelector(state => state.User.is_admin)
  const loggedIn = useSelector(state => state.User.loggedIn)
  const router = useRouter()
  
  useEffect(() => {
    // console.log(`/account/${id}`);
    if(loggedIn == false){
      router.push("/account/login")
    }
  }, [loggedIn])

  return (
    <Fragment>
      {
        is_admin
        ? <AdminProfile/>
        : <StandardProfile/>
      }
    </Fragment>
  )
}