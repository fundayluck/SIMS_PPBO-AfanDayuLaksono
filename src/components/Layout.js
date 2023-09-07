import { Outlet } from "react-router-dom"

import Logo from '../assets/logo/Logo.png'

const Layout = () => {
    return (
        <>
            <div className="fixed border border-1 w-full mt-[54px]"></div>
            <div className="px-[80px]">
                <nav className="min-w-full py-3 text-white flex justify-between items-center">
                    <div className='flex'>
                        <img src={Logo} alt='Logo' width={30} />
                        <h1 className='font-bold text-[20px] ml-2 text-[#2E2E2E]'>SIMS PPOB</h1>
                    </div>
                    <ul className='grid grid-cols-3 gap-10 list-none justify-items-center'>
                        <li className='font-bold' >
                            <h1 className='hover:cursor-pointer text-[#2E2E2E]'>
                                Top Up
                            </h1>
                        </li>
                        <li className='font-bold' >
                            <h1 className='hover:cursor-pointer text-[#2E2E2E]'>
                                Transaction
                            </h1>
                        </li>
                        <li className='font-bold' >
                            <h1 className='hover:cursor-pointer text-[#2E2E2E]'>
                                Akun
                            </h1>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </>
    )
}

export default Layout