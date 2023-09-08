import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Layout from "./components/Layout";
import PrivateRoute from "./services/auth/PrivateRoute";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./services/auth/authSlice";
import Home from "./pages/Home";
import HeadLayout from "./components/HeadLayout";
import Account from "./pages/Account";
import Edit from "./components/account/Edit";
import Topup from "./pages/Topup";



function App() {
    const token = useSelector(selectCurrentToken)

    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to={token !== null ? '/dashboard' : '/login'} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
                path={"/login"}
                element={<Login />}
            />
            <Route element={<PrivateRoute />} >
                <Route element={<Layout />}>
                    <Route element={<HeadLayout />}>
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/top-up" element={<Topup />} />
                    </Route>
                    <Route path="/account" element={<Account />} />
                    <Route path="/edit-account" element={<Edit />} />
                </Route>
            </Route>

        </Routes>
    );
}

export default App