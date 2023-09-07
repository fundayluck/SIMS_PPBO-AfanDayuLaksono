import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentToken } from '../services/auth/authSlice'
import { useLazyGetProfileQuery } from '../services/modules/profile'
import PImage from '../assets/image/Profile_Photo.png'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { MdAlternateEmail, MdEdit } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

const Account = ({ update }) => {
    const token = useSelector(selectCurrentToken)
    const [user, setUser] = useState([])
    const [getProfile, {
        isFetching
    }] = useLazyGetProfileQuery()

    const [email, setEmail] = useState('')
    const [nDepan, setNDepan] = useState('')
    const [nBelakang, setNBelakang] = useState('')

    useEffect(() => {
        const getPrfl = async () => {
            const user = await getProfile(token)
            setUser(user?.data?.data)
            setEmail(user?.data?.data?.email)
            setNDepan(user?.data?.data?.first_name)
            setNBelakang(user?.data?.data?.last_name)
        }
        getPrfl()
    }, [getProfile, token])

    const dispatch = useDispatch()

    const handleUpdate = async (e) => {

    }

    return (
        <>

            <div className='flex flex-col justify-center items-center mt-10'>
                {isFetching || user.profile_image === undefined ?
                    <img src={PImage} alt="avatar" className="w-[100px] h-[100px] rounded-full mb-2" /> :
                    user.profile_image === 'https://minio.nutech-integrasi.app/take-home-test/null' ?
                        <img src={PImage} alt="avatar" className="w-[100px] h-[100px] rounded-full mb-2" /> :
                        <img src={user.profile_image} alt="avatar" className="w-[100px] h-[100px] rounded-full mb-2" />
                }
                <div onClick={() => console.log('klik')} className={`bg-white fixed ml-[50px] ${update ? 'mb-[230px]' : 'mb-[280px]'} border border-gray border-1 rounded-full z-10 hover:cursor-pointer`}>
                    <MdEdit className='m-1 ' />
                </div>
                <h1 className='font-bold text-xl mb-7'>{`${user.first_name === undefined ? '' : `${user.first_name} ${user.last_name}`} `}</h1>
                <div className='my-2'>
                    <Input
                        readOnly={update ? false : true}
                        iconLeft={<MdAlternateEmail className='absolute ml-1 mr-2 text-[15px] text-[#B6BBC3] cursor-pointer mb-4' />}
                        label={<label className='fixed mb-20 text-sm'>Email</label>}
                        styleInput='w-[450px] h-[32px] mb-2'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='my-2'>
                    <Input
                        readOnly={update ? false : true}
                        iconLeft={<BsFillPersonFill className='absolute ml-1 mr-2 text-[15px] text-[#B6BBC3] cursor-pointer mb-4' />}
                        label={<label className='fixed mb-20 text-sm'>Nama Depan</label>}
                        styleInput='w-[450px] h-[32px]'
                        value={nDepan}
                        onChange={e => setNDepan(e.target.value)}
                    />
                </div>
                <div className='my-2'>
                    <Input
                        readOnly={update ? false : true}
                        iconLeft={<BsFillPersonFill className='absolute ml-1 mr-2 text-[15px] text-[#B6BBC3] cursor-pointer mb-4' />}
                        label={<label className='fixed mb-20 text-sm'>Nama Belakang</label>}
                        styleInput='w-[450px] h-[32px]'
                        value={nBelakang}
                        onChange={e => setNBelakang(e.target.value)}
                    />
                </div>
                {update ? (
                    <div className='my-2'>
                        <Button
                            onClick={handleUpdate}
                            buttonName='Simpan'
                            colorButton='bg-[#F42619]'
                            styleButton='w-[450px] h-[32px] text-white font-bold rounded shadow-md'
                        />
                    </div>
                ) : (
                    <>
                        <div className='my-2'>
                            <NavLink
                                to='/edit-account'
                            >
                                <Button
                                    buttonName='Edit Profile'
                                    colorButton='bg-[#FFFFFF] text-[#F42619] font-bold'
                                    styleButton='w-[450px] h-[32px] rounded shadow-md border border-1 border-{#F42619]'
                                />
                            </NavLink>
                        </div>
                        <div className='my-2'>
                            <Button
                                onClick={() => dispatch(logOut())}
                                buttonName='Log Out'
                                colorButton='bg-[#F42619]'
                                styleButton='w-[450px] h-[32px] text-white font-bold rounded shadow-md'
                            />
                        </div>
                    </>
                )
                }
            </div>
        </>
    )
}

export default Account