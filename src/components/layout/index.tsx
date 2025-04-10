import { Outlet } from "react-router-dom";
import {Header} from "../header/Header"
import { Toaster } from "react-hot-toast";

export function Layout(){
    return(
        <>
            <Toaster position="top-right" />
            <Header/>
            <Outlet/>
           
        </>
    )
}