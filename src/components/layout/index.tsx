import { Outlet } from "react-router-dom";
import {Header} from "../header/Header"
import { Toaster } from "react-hot-toast";
import  Footer  from "../footer/Footer";

export function Layout(){
    return(
        <>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Toaster position="top-right" />
                <Header/>

                <main className="flex-grow">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
            
        
        </>
    )
}