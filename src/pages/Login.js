import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Input from '../components/common/Input'
import Button from '../components/common/Button'

import { useLoginMutation } from '../services/auth/authApiSlice'
import { useLazyRegistrationQuery } from '../services/modules/registration'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, setCredentials } from '../services/auth/authSlice'

import LoginImage from '../assets/image/Illustrasi_Login.png'
import Logo from '../assets/logo/Logo.png'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { ImSpinner2 } from 'react-icons/im'

const Login = ({ register }) => {
    const userRef = useRef()

    //login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //register
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [namaDepan, setNamaDepan] = useState('')
    const [namaBelakang, setnamaBelakang] = useState('')

    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [login, { isLoading: loadingLogin }] = useLoginMutation()
    const [registration, { isLoading: loadingRegist }] = useLazyRegistrationQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [
        email,
        password,
        newEmail,
        newPassword,
        confirmPassword,
        namaDepan,
        namaBelakang
    ]);

    const token = useSelector(selectCurrentToken)

    useEffect(() => {
        if (token !== null) {
            navigate('/dashboard')
        } else {
            return
        }
    }, [token, navigate])

    const validateSubmit = (e) => {
        e.preventDefault()
        if (confirmPassword !== newPassword) {
            setErrMsg('password tidak sama!')
        } else
            if (confirmPassword === newPassword) {
                handleRegist(e)
            }
    }

    const handleRegist = async (e) => {
        e.preventDefault()
        try {
            const data = {
                namaDepan,
                namaBelakang,
                newEmail,
                newPassword
            }
            const response = await registration({
                email: data.newEmail,
                first_name: data.namaDepan,
                last_name: data.namaBelakang,
                password: data.newPassword
            })
            if (response.status === 'rejected') {
                setErrMsg(response.error.data.message)
            } else
                if (response.status === 'fulfilled') {
                    navigate('/login')
                }
        } catch (error) {
            setErrMsg(error.data.message)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const data = {
                email,
                password
            }
            const response = await login(data).unwrap()
            dispatch(setCredentials({ token: response?.data?.token, email: response }))
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            setErrMsg(error.data.message)
        }
    }

    const clearMessage = (e) => {
        e.preventDefault()
        setErrMsg('')
    }

    return (
        <div className='flex items-center w-full'>
            <div className='flex flex-col min-w-[50%]'>
                <div className='flex justify-center items-center'>
                    <img src={Logo} alt='Logo' width={25} />
                    <h1 className='font-bold text-[20px] ml-2 '>SIMS PPOB</h1>
                </div>
                <h1 className='flex justify-center font-bold text-[25px] pt-4 pb-4 px-[170px] text-[#2E2E2E] text-center'>
                    Masuk atau buat akun untuk memulai
                </h1>
                <form onSubmit={register ? validateSubmit : handleLogin} className='flex flex-col items-center mt-5'>
                    {register ? (
                        <>
                            <Input
                                refer={userRef}
                                styleInput='w-[350px] h-[38px]'
                                placeholder='masukan email anda'
                                value={newEmail}
                                onChange={e => setNewEmail(e.target.value)}
                            />
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='nama depan'
                                value={namaDepan}
                                onChange={e => setNamaDepan(e.target.value)}
                            />
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='nama belakang'
                                value={namaBelakang}
                                onChange={e => setnamaBelakang(e.target.value)}
                            />
                            <Input
                                type={show ? 'text' : 'password'}
                                styleInput='w-[350px] h-[38px]'
                                placeholder='buat password'
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                icon={show
                                    ?
                                    <IoEyeOff className='absolute mr-2 cursor-pointer mb-4' onClick={() => (setShow(false))} />
                                    :
                                    <IoEye className='absolute mr-2 cursor-pointer mb-4' onClick={() => (setShow(true))} />}
                            />
                            <Input
                                type={showConfirm ? 'text' : 'password'}
                                styleInput='w-[350px] h-[38px]'
                                placeholder='konfirmasi password'
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                icon={showConfirm
                                    ?
                                    <IoEyeOff className='absolute mr-2 cursor-pointer mb-4' onClick={() => (setShowConfirm(false))} />
                                    :
                                    <IoEye className='absolute mr-2 cursor-pointer mb-4' onClick={() => (setShowConfirm(true))} />}
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                value={email}
                                refer={userRef}
                                onChange={(e) => setEmail(e.target.value)}
                                styleInput='w-[350px] h-[38px] invalid:border-red-500'
                                placeholder='email'
                            />
                            <Input
                                type={show ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                styleInput='w-[350px] h-[38px]'
                                placeholder='password'
                                icon={show
                                    ?
                                    <IoEyeOff className='absolute mr-2 cursor-pointer mb-4' onClick={() => (setShow(false))} />
                                    :
                                    <IoEye className='absolute mr-2 cursor-pointer mb-4' onClick={() => (setShow(true))} />}
                            />
                        </>
                    )}
                    {register ?
                        (
                            <Button
                                colorButton='bg-[#F42619]'
                                styleButton='w-[350px] h-[38px] rounded shadow-md'
                                buttonName={loadingRegist ? <ImSpinner2 className='animate-spin text-[22px]' /> : 'Daftar'}
                            />

                        ) : (
                            <Button
                                colorButton='bg-[#F42619]'
                                styleButton='w-[350px] h-[38px] rounded shadow-md'
                                buttonName={loadingLogin ? <ImSpinner2 className='animate-spin text-[18px] content-center' /> : 'Masuk'}
                            />
                        )

                    }
                    {
                        register ?
                            (
                                <p className='text-sm mt-2'>sudah punya akun? login <Link className='text-[#F42619] font-bold' to='/login'>disini</Link> </p>

                            ) : (
                                <p className='text-sm mt-2'>belum punya akun? registrasi <Link className='text-[#F42619] font-bold' to='/register'>disini</Link> </p>

                            )
                    }
                    <div className={`transition duration-200 ease-out bg-[#FDE4E1] border text-red-700  rounded relative  ${errMsg ? 'scale-10 mt-[12px] px-[100px] py-3' : 'scale-0 mt-[12px] px-4 py-3'}`} role="alert">
                        <span className="block sm:inline">{errMsg}</span>
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
                </form>
            </div>
            <img className='min-w-[50%] max-h-screen' src={LoginImage} alt='LoginImage' />
        </div >
    )
}

export default Login