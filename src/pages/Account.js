import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentToken } from '../services/auth/authSlice'
import { useLazyGetProfileQuery, useLazyUpdateImageQuery, useLazyUpdateProfileQuery } from '../services/modules/profile'
import PImage from '../assets/image/Profile_Photo.png'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { MdAlternateEmail, MdEdit } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { ImSpinner2 } from 'react-icons/im'
import Logo from '../assets/logo/Logo.png'
import CustomDialog from '../components/common/CustomDialog'

const Account = ({ update }) => {
    const userRef = useRef()
    const token = useSelector(selectCurrentToken)
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    const [getProfile, {
        isFetching
    }] = useLazyGetProfileQuery()
    const [updateProfile, {
        isFetching: fetchingUpdate
    }] = useLazyUpdateProfileQuery()
    const [updateImage] = useLazyUpdateImageQuery()

    const [email, setEmail] = useState('')
    const [nDepan, setNDepan] = useState('')
    const [nBelakang, setNBelakang] = useState('')
    const [errNDepan, setErrNDepan] = useState('')
    const [errNBelakang, setErrNBelakang] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [openModal, setOpenModal] = useState(false);

    const [file, setFile] = useState(null)

    useEffect(() => {
        const upload = () => {
            if (file === null) {
                return
            } else {
                setOpenModal(true)
            }
        }
        upload()
    }, [file])

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

    const handleUpdateImage = (e) => {
        console.log(e);
        setFile(e.target.files[0]);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = {
            first_name: nDepan,
            last_name: nBelakang
        }
        try {
            const response = await updateProfile(data, token)
            if (response.status === 'rejected') {
                setErrorMessage(response.error.data.message)
            } else {
                navigate('/account')
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrNBelakang("")
        setErrorMessage('')
        setErrNDepan("")
    }, [
        nDepan,
        nBelakang
    ]);

    const clearMessage = (e) => {
        e.preventDefault()
        setErrorMessage('')
        setErrNBelakang("")
        setErrNDepan("")
    }

    const ImageUpdate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('file', file)
            await updateImage(formData, token)
            setOpenModal(false)
            window.location.reload()
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message)
        }

    }

    const children = <div className='flex flex-col justify-center items-center'>
        <img src={Logo} alt='logo' className='w-[50px] mt-5' />
        <p className='text-black mt-6 mx-2 text-center font-medium'>Apakah Anda Yakin mengganti foto profil?</p>
        <button
            onClick={ImageUpdate}
            className='text-red-600 font-bold mt-10'>
            Ya, Lanjutkan mengganti
        </button>
        <button
            onClick={() => {
                setOpenModal(false)
                setFile(null)
            }}
            className='text-gray-400 font-bold opacity-50 mt-6'>Batalkan</button>
    </div>

    const modal = <CustomDialog children={children} setOpenModal={setOpenModal} />

    return (
        <>
            {openModal && modal}
            <div className='flex flex-col justify-center items-center mt-10'>
                <label htmlFor='files' className='hover:cursor-pointer'>
                    {isFetching || user.profile_image === undefined ?
                        <img src={PImage} alt="avatar" className="w-[100px] h-[100px] rounded-full mb-2" /> :
                        user.profile_image === 'https://minio.nutech-integrasi.app/take-home-test/null' ?
                            <img src={PImage} alt="avatar" className="w-[100px] h-[100px] rounded-full mb-2" /> :
                            <img src={user.profile_image} alt="avatar" className="w-[100px] h-[100px] rounded-full mb-2" />
                    }
                    < input id='files' type='file' className='hidden' onChange={handleUpdateImage} />
                </label>
                <div className={`bg-white fixed ml-[50px] ${update ? 'mb-[210px]' : 'mb-[250px]'} border border-gray border-1 rounded-full z-0 hover:cursor-pointer`}>
                    <MdEdit className='m-1 ' />
                </div>

                <h1 className='font-bold text-xl mb-7'>{`${user.first_name === undefined ? '' : `${user.first_name} ${user.last_name}`} `}</h1>
                <form onSubmit={update ? handleUpdate : null}>
                    <div className='my-2'>
                        <Input
                            readOnly
                            iconLeft={<MdAlternateEmail className='absolute ml-1 mr-2 text-[15px] text-[#B6BBC3] cursor-pointer mb-4' />}
                            label={<label className='fixed mb-20 text-sm'>Email</label>}
                            styleInput='w-[450px] h-[32px] mb-2'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <Input
                            err={errNDepan}
                            refer={userRef}
                            readOnly={update ? false : true}
                            iconLeft={<BsFillPersonFill className='absolute ml-1 mr-2 text-[15px] text-[#B6BBC3] cursor-pointer mb-4' />}
                            label={<label ref={userRef} className='fixed mb-20 text-sm'>Nama Depan</label>}
                            styleInput='w-[450px] h-[32px]'
                            value={nDepan}
                            onChange={e => setNDepan(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <Input
                            err={errNBelakang}
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
                                type='submit'
                                buttonName={fetchingUpdate ? <ImSpinner2 className='animate-spin text-[18px] text-white content-center' /> : 'Simpan'}
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
                </form>
            </div >
            <div className={`transition duration-200 ease-out bg-[#FDE4E1] mx-[340px] border text-red-700  rounded relative  ${errorMessage ? 'scale-10 mt-[12px] px-[100px] py-3' : 'scale-0 mt-[12px] px-4 py-3'}`} role="alert">
                <span className="block sm:inline">{errorMessage}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" >
                    <svg
                        className="fill-current h-6 w-6 text-black-500"
                        onClick={clearMessage}
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <title>
                            Close
                        </title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>

        </>
    )
}

export default Account