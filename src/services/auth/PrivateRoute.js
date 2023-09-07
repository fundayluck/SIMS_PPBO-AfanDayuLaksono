import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const PrivateRoute = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    return token !== null
        ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace />
}

export default PrivateRoute