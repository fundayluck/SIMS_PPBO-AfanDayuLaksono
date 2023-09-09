import React, { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import { PiMoneyFill } from 'react-icons/pi'
import CurrencyInput from 'react-currency-input-field'
import Swal from 'sweetalert2'
import { useLazyDoTopupQuery } from '../services/modules/transaction'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../services/auth/authSlice'
import { useNavigate } from 'react-router-dom'


const Topup = () => {
    const token = useSelector(selectCurrentToken)
    const [doTopup] = useLazyDoTopupQuery()
    const [nominal, setNominal] = useState('')
    const [disable, setDisable] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const navigate = useNavigate()

    let bilangan = nominal;

    let number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }



    useEffect(() => {
        if (!isNaN(Number(nominal)) && Number(nominal) >= 10000 && Number(nominal) <= 1000000) {
            setIsValid(true)
            setErrMessage('')
        } else {
            setIsValid(false)
            setErrMessage('ketentuan top up minimal Rp.10.000 dan maksimal Rp.1.000.000')
        }

        if (Number(nominal) === 0 || nominal === undefined) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [nominal, setDisable, setIsValid, setErrMessage])

    const processTopUp = async (e) => {
        const data = { top_up_amount: nominal }
        try {
            const response = await doTopup(data, token)
            if (response.status === 'rejected') {
                Swal.fire(
                    'Gagal!',
                    `${response.error.data.message}`,
                    'error'
                )
                navigate('/dashboard')
            } else if (response.status === 'fulfilled') {
                Swal.fire(
                    'Yeay!',
                    `Top Up sebesar <b>${rupiah}</b> berhasil!`,
                    'success'
                )
                navigate('/dashboard')
            }
        } catch (error) {
            Swal.fire(
                'Error!',
                `${error.message}`,
                'error'
            )
            navigate('/dashboard')
        }
    }

    const DoTopup = () => {
        if (isValid) {
            Swal.fire({
                title: 'Anda yakin untuk Top Up Sebesar',
                html: `<b>Rp.${rupiah}?</B> `,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '',
                confirmButtonText: 'Ya, lanjutkan Top Up!',
                cancelButtonText: 'Batalkan'
            }).then((result) => {
                if (result.isConfirmed) {
                    processTopUp()
                }
            })
        } else {
            Swal.fire({
                icon: 'warning',
                text: `${errMessage}`,
            })
        }
    }


    const listNominal = [
        {
            price: 10000,
            tag: 'Rp.10.000'
        },
        {
            price: 20000,
            tag: 'Rp.20.000'
        },
        {
            price: 50000,
            tag: 'Rp.50.000'
        },
        {
            price: 100000,
            tag: 'Rp.100.000'
        },
        {
            price: 250000,
            tag: 'Rp.250.000'
        },
        {
            price: 500000,
            tag: 'Rp.500.000'
        },
    ]

    return (
        <>
            <div className='mt-5'>
                <h1>Silahkan Masukan</h1>
                <h1 className='font-bold text-[25px]'>Nominal Top Up</h1>
                <div className='grid grid-cols-2 gap-2 items-center'>
                    <div className='mt-4'>
                        <PiMoneyFill className='absolute text-[#B6BBC3] mt-[18px] ml-3' />
                        <CurrencyInput
                            type='currency'
                            placeholder='masukan nominal top up'
                            className='border w-full h-[32px] m-2 pl-7 outline-none'
                            decimalsLimit={2}
                            defaultValue={nominal}
                            value={nominal}
                            decimalSeparator="," groupSeparator="."
                            // onChange={(e) => setNominal(e.target.value)}
                            onValueChange={(value) => setNominal(value ? value : '')}
                        />
                        <Button
                            disable={disable}
                            onClick={DoTopup}
                            buttonName='Top Up'
                            colorButton={disable ? 'bg-[#C6C0C0]' : 'bg-[#F42619]'}
                            styleButton='w-full h-[32px] m-2 text-white font-bold rounded shadow-md'
                        />
                    </div>
                    <div className='grid grid-cols-3 gap-0 mt-4 ml-5 mx-[100px] '>
                        {listNominal.map((list, index) =>
                            <button
                                key={index}
                                onClick={() => setNominal(list.price)}
                                className={
                                    list.price === nominal ? `bg-[#C6C0C0] text-white font-bold m-2 self-center border border-1 
                            text-center py-1 rounded-md shadow-sm
                            `: `m-2 self-center border border-1 
                             text-center py-1 rounded-md hover:opacity-70 shadow-sm
                            `
                                }
                            >
                                {list.tag}
                            </button>
                        )}
                    </div >
                </div >
            </div >
        </>
    )
}

export default Topup