import { Fragment } from "react"
import Head from 'next/head'
import {classList} from "../utils"
import Header from "../components/Header"
import Card from "../components/CoverageCard"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {Stack, Typography} from "@mui/material"
import { useSelector } from "react-redux"

export default function Home() {
  const loggedIn = useSelector(state => state.User.loggedIn)

  return (
    <Fragment>
      <Head>
        <title>Brilliant Scinces | Home</title>
        <link rel="icon" href="/brilliant sciences.svg" />
      </Head>
      <main className={classList("flex","flex-column","Index")}>
        <section className={classList("flex","flex-column","align-center")}>
          <Stack className={classList("flex-1","justify-center","align-center")}>
            <Stack className={classList("position-relative","full-width")}>
              <div className={classList("position-absolute","flex-1","full-width","sm:bg-center","xsm:bg-ng35-0")} style={{height: "100vh", width: "100%", backgroundImage: "url('/BS hero-01.svg')", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
            </Stack>
            <Header/>
            <Stack direction="row" flex={1} className={classList("full-width","lg:flex-row","xsm:flex-col")} justifyContent="center" alignItems="center" sx={{padding: "0 7%"}}>
              <div className={classList("flex","flex-1","flex-column","justify-center","align-start","full-width","Hero-section")}>
                <div>
                  Understand All About Sciences
                </div>
                <br/>
                <div>
                  Our topic specific content help you have a better insight about sciences. You are a student or conducting a research, You are an instructor. Just search it, and get it. All from our best authors.
                </div>
                <br/>
                <Stack component="span" direction="row" spacing={2}>
                  {
                    loggedIn // is_logged_in
                    ? <Fragment/>
                    : <Button href="/search" variant="contained">Get an Insight</Button>
                  }
                  <Button href="/class" variant={loggedIn /* is_logged_in */ ? "contained" : "outlined"}>Continue where you left</Button>
                </Stack>
              </div>
              <Stack flex={1}></Stack>
            </Stack>
          </Stack>
        </section>
        <section className={classList("flex","flex-column","justify-center","align-center","flex-wrap")}>
          <h3 style={{fontWeight: "bold", fontSize: "2rem"}}>Our Coverage</h3>
          <div className={classList("flex","flex-1","flex-row","justify-space-evenly","align-center","flex-wrap")}>
            <Card text="Mathematics" image="/math-operations.jpg"/>
            <Card text="Physics" image="/telescope-dish.jpg"/>
            <Card text="Chemistry" image="apparatus.jpg"/>
            <Card text="Biology" image="oil.jpg"/>
          </div>
        </section>
        {/* TODO: remodel testimonials section */}
        <section className={classList("flex","flex-column","justify-space-evenly","align-center","flex-wrap")}>
          <h3 style={{fontWeight: "bold", fontSize: "2rem"}}>Testimonials</h3>
          <div className={classList("image")}></div>
          <div className={classList("text")}>The platform to excel... <a id="more" href='#more'>More</a></div>
          <div className={classList("list","flex")}>
            <div className={classList("thumbnail","image")}></div>
            <div className={classList("thumbnail","image")}></div>
            <div className={classList("thumbnail","image")}></div>
            <div className={classList("thumbnail","image")}></div>
            <div className={classList("thumbnail","image")}></div>
          </div>
        </section>
        <section style={{borderWidth: "0", borderBottomStyle: "solid", borderBottomWidth: "1px", borderStyle: "solid"}} className={classList("flex","flex-column","justify-space-evenly","align-center","flex-wrap")}>
          <h3 style={{fontWeight: "bold", fontSize: "2rem"}}>Let Us Know</h3>
          <div className={classList("flex","flex-1","flex-row","lg:flex-row","flex-col")}>
            <div className={classList("flex","flex-column","justify-start","align-start","xsm:p-1rm-3rm","lg:p-3rm")} style={{padding: '3rem'}}>
              <span style={{boxShadow: "0px 6px 22px 0px #1976d2", borderRadius: "4px", overflow: "hidden", padding: "1rem"}}>
                <b>Email</b>
                <br/>example@domain.com<br/>
              </span>
              <span style={{boxShadow: "0px 6px 22px 0px #1976d2", borderRadius: "4px", overflow: "hidden", padding: "1rem"}}>
                <b>Contact</b>
                <br/>+250700000000<br/>
              </span>
              <span>
                <a href="#socials"><b>Our Socials</b></a>
              </span>
            </div>
            <div className={classList("flex","flex-column","justify-start","align-center","xsm:p-1rm-3rm","lg:p-3rm")} style={{padding: '3rem'}}>
              <Typography style={{margin: 0, fontSize: "1.3rem"}}>Write here</Typography>
              <TextField sx={{boxShadow: "0px 6px 22px 0px #1976d2", borderRadius: "4px", overflow: "hidden"}} label="email" variant="filled"/>
              <TextField sx={{boxShadow: "0px 6px 22px 0px #1976d2", borderRadius: "4px", overflow: "hidden"}} label="Your words..." variant="filled"/>
              <Button fullWidth variant="contained" type="button">Send</Button>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  )
}
