import { Outlet } from "react-router"
import { Header } from './Header'

export const WithHeader = () => {

    return (
        <>
            <Header />

            <Outlet />
        </>
    )
}