import { NavLink, Outlet } from "react-router-dom"
import Logo from '../assets/logo/Logo.png'

const navbarList = [
    {
        path: "/top-up",
        name: "Top Up"
    },
    {
        path: "/transaction",
        name: "Transaction"
    },
    {
        path: "/account",
        name: "Akun"
    },
]


const Layout = () => {
    return (
        <>
            <div className="fixed border border-1 w-full mt-[54px]"></div>
            <div className="px-[80px]">
                <nav className="min-w-full py-3 text-white flex justify-between items-center">
                    <NavLink to='/dashboard' >
                        <div className='flex'>
                            <img src={Logo} alt='Logo' width={30} />
                            <h1 className='font-bold text-[20px] ml-2 text-[#2E2E2E]'>SIMS PPOB</h1>
                        </div>
                    </NavLink>
                    <ul className='grid grid-cols-3 gap-10 list-none justify-items-center'>
                        {/* <li className='font-bold' >
                            <h1 className='hover:cursor-pointer text-[#2E2E2E]'>
                                Top Up
                            </h1>
                        </li>
                        <li className='font-bold' >
                            <h1 className='hover:cursor-pointer text-[#2E2E2E]'>
                                Transaction
                            </h1>
                        </li> */}
                        {/* hover:cursor-pointer text-[#2E2E2E] */}
                        {navbarList.map((list, index) =>
                            <li className='font-bold' key={index}>
                                <NavLink to={list.path} className={({ isActive }) => (isActive ? "hover:cursor-pointer text-[#2E2E2E] text-[#F13B2E]" : "hover:cursor-pointer text-[#2E2E2E]")}>
                                    {list.name}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>

                <Outlet />
            </div>
        </>
    )
}

export default Layout