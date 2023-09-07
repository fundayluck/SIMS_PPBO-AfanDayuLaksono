import React from 'react'
import LoginImage from '../assets/image/Illustrasi_Login.png'
import Logo from '../assets/logo/Logo.png'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const Login = ({ register }) => {
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
                <div className='flex flex-col items-center mt-5'>
                    {/* <form> */}
                    {register ? (
                        <>
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='masukan email anda'
                            />
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='nama depan'
                            />
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='nama belakang'
                            />
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='buat password'
                            />
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='konfirmasi password'
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='email'
                            />
                            <Input
                                styleInput='w-[350px] h-[38px]'
                                placeholder='password'
                            />
                        </>
                    )}
                    <Button
                        styleButton='w-[350px] h-[38px] rounded shadow-md'
                        buttonName='Masuk'
                    />
                    {/* </form> */}
                </div>
            </div>
            <img className='min-w-[50%] max-h-screen' src={LoginImage} alt='LoginImage' />
        </div>
    )
}

export default Login