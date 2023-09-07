import { Outlet } from "react-router-dom"
import { logOut } from "../services/auth/authSlice"
import { useDispatch } from "react-redux"


const Layout = () => {
    const dispatch = useDispatch()

    const handleLogout = () => dispatch(logOut())

    return (
        <div>
            <button onClick={handleLogout}>Keluar</button>
            <Outlet />
        </div>
    )
}

export default Layout