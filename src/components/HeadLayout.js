import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import PImage from '../assets/image/Profile_Photo.png'
import { useSelector } from 'react-redux'
import { useLazyGetProfileQuery } from '../services/modules/profile'
import { useLazyGetBalanceQuery } from '../services/modules/transaction'
import { selectCurrentToken } from '../services/auth/authSlice'

const HeadLayout = () => {
    const token = useSelector(selectCurrentToken)
    const [user, setUser] = useState([])
    const [balance, setBalance] = useState([])
    const [show, setShow] = useState(false)
    const [getProfile, {
        isFetching
    }] = useLazyGetProfileQuery()
    const [getBalance] = useLazyGetBalanceQuery()
    useEffect(() => {
        const getPrfl = async () => {
            const user = await getProfile(token)
            const balance = await getBalance(token)
            setUser(user?.data?.data)
            setBalance(balance?.data?.data)
        }
        getPrfl()
    }, [getProfile, getBalance, token])
    return (
        <>
            <div className="flex justify-between mt-5 ">
                <div className="">
                    {
                        isFetching || user.profile_image === undefined ?
                            <img src={PImage} alt="avatar" className="w-[50px] h-[50px] rounded-full mb-2" /> :
                            user.profile_image === 'https://minio.nutech-integrasi.app/take-home-test/null' ?
                                <img src={PImage} alt="avatar" className="w-[50px] h-[50px] rounded-full mb-2" /> :
                                <img src={user.profile_image} alt="avatar" className="w-[50px] h-[50px] rounded-full mb-2" />
                    }
                    <h1>Selamat Datang,</h1>
                    <h1 className="font-bold text-[25px]">{`${user.first_name === undefined ? '' : `${user.first_name} ${user.last_name}`} `}</h1>
                </div>
                <div className="bg-saldo bg-contain bg-no-repeat w-[497px] py-5 px-3">
                    <p className='text-white font-bold text-[12px]'>Saldo anda</p>
                    <div className='flex text-white font-bold text-[27px] mb-[5px]'>
                        <p className='mr-1'>Rp</p>
                        <input
                            type={show ? 'text' : 'password'}
                            readOnly
                            className='w-[200px] bg-[#F13B2F]'
                            defaultValue={
                                balance?.balance === 0 ?
                                    show ? balance.balance :
                                        1231231 :
                                    balance?.balance
                            }
                        />
                    </div>
                    {show ?
                        <p onClick={() => setShow(false)} className='text-white text-[11px] hover:cursor-pointer'>Tutup saldo</p>
                        :
                        <p onClick={() => setShow(true)} className='text-white text-[11px] hover:cursor-pointer'>Lihat saldo</p>
                    }
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default HeadLayout