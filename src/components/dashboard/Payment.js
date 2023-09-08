import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CurrencyInput from 'react-currency-input-field'
import { selectCurrentToken } from '../../services/auth/authSlice'
import { useSelector } from 'react-redux'
import { useLazyGetServicesQuery } from '../../services/modules/information'
import { PiMoneyFill } from 'react-icons/pi'
import Button from '../common/Button'

const Payment = () => {
    const token = useSelector(selectCurrentToken)
    const [getServices] = useLazyGetServicesQuery()
    const [getService, setGetService] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const getSrvcs = async () => {
            const res = await getServices(token)
            setGetService(res.data.data[id]);
        }
        getSrvcs()
    }, [getServices, token, id])

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
                // onClick={DoTopup}
                buttonName='Top Up'
                colorButton={'bg-[#F42619] hover:opacity-80'}
                styleButton='w-full h-[32px] mt-2 text-white font-bold rounded shadow-md'
            />
        </div>
    )
}

export default Payment