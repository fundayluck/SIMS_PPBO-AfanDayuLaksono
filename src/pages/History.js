import React, { useEffect, useState } from 'react'
import { useLazyGetHistoryQuery } from '../services/modules/transaction'
import { selectCurrentToken } from '../services/auth/authSlice'
import { useSelector } from 'react-redux'
import Slider from 'react-slick';
import CustomCard from '../components/common/CustomCard';

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

const settings = {
    slidesToShow: 6,
    centerPadding: "10px",
};

const History = () => {
    const token = useSelector(selectCurrentToken)
    const [limit, setLimit] = useState(5)
    const [getHistory] = useLazyGetHistoryQuery()
    const [list, setList] = useState([])


    useEffect(() => {
        const getHstry = async () => {
            const response = await getHistory({ token, limit: limit })
            setList(response?.data?.data?.records);
        }
        getHstry()
    }, [getHistory, token, limit])

    return (
        <div className='mt-4'>
            <h1 className='font-bold text-lg'>Semua Transaksi</h1>
            <div className='w-[70%]'>
                <Slider  {...settings} >
                    {months ? months.map((list, index) =>
                        <button key={index} className='text-lg font-bold text-[#87C3AE] p-3'>
                            {list}
                        </button>
                    ) : []}
                </Slider>
            </div>
            <CustomCard data={list} setLimit={setLimit} limit={limit} />
        </div>
    )
}

export default History