import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CurrencyInput from 'react-currency-input-field'
import { selectCurrentToken } from '../../services/auth/authSlice'
import { useSelector } from 'react-redux'
import { useLazyGetServicesQuery } from '../../services/modules/information'
import { PiMoneyFill } from 'react-icons/pi'
import Button from '../common/Button'
import { useLazyDoPaymentQuery } from '../../services/modules/transaction'
import { ImSpinner2 } from 'react-icons/im'
import Swal from 'sweetalert2'

const Payment = () => {
    const token = useSelector(selectCurrentToken)
    const [getServices] = useLazyGetServicesQuery()
    const [doPayment, { isFetching }] = useLazyDoPaymentQuery()
    const [getService, setGetService] = useState([])
    const [tarif, setTarif] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const bilangan = tarif

    let number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    useEffect(() => {
        const getSrvcs = async () => {
            const res = await getServices(token)
            setGetService(res?.data?.data[id]);
            setTarif(res?.data?.data[id]?.service_tariff)
        }
        getSrvcs()
    }, [getServices, token, id])

    const processPayment = async (e) => {
        e.preventDefault()
        const data = { service_code: getService?.service_code }
        try {
            const response = await doPayment(data, token)
            if (response.status === 'fulfilled') {
                Swal.fire(
                    'Yeay!',
                    `Top Up sebesar <b>${rupiah}</b> berhasil!`,
                    'success'
                )
                navigate('/dashboard')
            } else if (response.status === "rejected") {
                Swal.fire(
                    'Gagal!',
                    `${response.error.data.message}`,
                    'error'
                )
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error);
            Swal.fire(
                'Error!',
                `${error.message}`,
                'error'
            )
            navigate('/dashboard')
        }
    }

    const handlePayment = (e) => {
        Swal.fire({
            title: `Beli ${getService.service_name} senilai`,
            html: `<b>Rp.${rupiah}?</B> `,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '',
            confirmButtonText: 'Ya, lanjutkan Bayar!',
            cancelButtonText: 'Batalkan'
        }).then((result) => {
            if (result.isConfirmed) {
                processPayment(e)
            }
        })
    }

    return (
        <div className='mt-5'>
            <h1 className='mb-2'>Pembayaran</h1>
            <div className='flex'>
                <img
                    src={getService.service_icon}
                    alt=''
                    width={30}
                />
                <h1 className='font-bold ml-2'>{getService.service_name}</h1>
            </div>
            <PiMoneyFill className='absolute text-[#B6BBC3] mt-[25px] ml-2' />
            <CurrencyInput
                type='currency'
                placeholder='masukan nominal top up'
                className='border w-full h-[32px] mt-4 pl-8 outline-none'
                decimalsLimit={2}
                defaultValue={getService.service_tariff}
                value={getService.service_tariff}
                decimalSeparator=","
                groupSeparator="."
            />
            <Button
                onClick={handlePayment}
                buttonName={isFetching ? <ImSpinner2 className='animate-spin text-[22px] text-white' /> : 'Bayar'}
                colorButton={'bg-[#F42619] hover:opacity-80'}
                styleButton='w-full h-[32px] mt-2 text-white font-bold rounded shadow-md'
            />
        </div>
    )
}

export default Payment