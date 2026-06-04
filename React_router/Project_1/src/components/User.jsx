import { Outlet } from "react-router"
import { Header } from "./header/Header"
import { Footer } from "./footer/Footer"




export const User = () => {
    return (
        <>
            <Header />

            <Outlet />

            <Footer />
        </>
    )
}