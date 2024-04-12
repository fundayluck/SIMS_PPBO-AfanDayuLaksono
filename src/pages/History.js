import React, { useEffect, useState } from 'react'
import { useLazyGetHistoryQuery } from '../services/modules/transaction'
import { selectCurrentToken } from '../services/auth/authSlice'
import { useSelector } from 'react-redux'
import Slider from 'react-slick';
import CustomCard from '../components/common/CustomCard';

const months = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember'
];

const settings = {
    slidesToShow: 6,
    centerPadding: "10px",
};

const History = () => {
    const token = useSelector(selectCurrentToken)
    const [limit, setLimit] = useState(5)
    const [getHistory, { isFetching }] = useLazyGetHistoryQuery()
    const [list, setList] = useState([])
    const [selectedMonth, setSelectedMonth] = useState('')

    useEffect(() => {
        const getHstry = async () => {
            const response = await getHistory({ token, limit: limit })
            setList(response?.data?.data?.records ?? []);
        }
        getHstry()
    }, [getHistory, token, limit])

    const filterDataByMonth = (list, month) => {

        if (!month) return list; // If no month is selected, return all data
        return list.filter(item => {
            const itemDate = new Date(item.created_on);

            return (itemDate.getMonth() + 1) === month;
        });
    };

    const filteredData = filterDataByMonth(list, selectedMonth)

    return (
        <div className='mt-4'>
            <h1 className='font-bold text-lg'>Semua Transaksi</h1>
            <div className='w-[70%]'>
                <Slider  {...settings} >
                    {months ? months.map((list, index) =>
                        <button
                            onClick={() => setSelectedMonth(index + 1)}
                            key={index}
                            className={selectedMonth === index + 1 ? 'text-lg underline font-bold text-[#87C3AE] p-3 outline-none' : 'text-lg  font-bold text-[#87C3AE] p-3 outline-none'}
                        >
                            {list}
                        </button>
                    ) : []}
                </Slider>
            </div>
            <CustomCard isFetching={isFetching} data={filteredData} setLimit={setLimit} limit={limit} />
        </div>
    )
}

export default History