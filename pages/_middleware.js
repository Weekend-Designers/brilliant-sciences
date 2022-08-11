import { NextResponse as res } from 'next/server'

export default (req) => {
    // const logged_in = true
    // const { pathname } = req.nextUrl
    // switch (pathname) {
    //     case "/home":
    //         return redirect(req, "/")
    //         break;
    //     case "/account":
    //         if(!logged_in){
    //             return redirect(req, "/account/login")
    //         }
    //         break;
    //     case "/class":
    //         return redirect(req, "/search")
    //         break;
    //     case "/class/[id]":
    //         if(!logged_in){
    //             return redirect(req, "/account/login")
    //         }
    //         break;
    // }
}

const redirect = (req, to) => {
    return res.rewrite(new URL(to, req.url))
}