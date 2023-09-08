import moment from 'moment/moment'
import React from 'react'

const CustomCard = ({ data, setLimit, limit }) => {
    let Item = data

    return Item.length < 1 ? (
        <h1 className='flex flex-col justify-center items-center h-[300px] '>Maaf tidak ada histori transaksi saat ini</h1>
    ) : (
        <div className='flex flex-col items-center overflow-auto h-[300px] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-[#F1F9F9] pr-2'>
            {Item ? Item.map((list, index) => {
                let bilangan = list.total_amount;

                let number_string = bilangan.toString(),
                    sisa = number_string.length % 3,
                    rupiah = number_string.substr(0, sisa),
                    ribuan = number_string.substr(sisa).match(/\d{3}/g);

                if (ribuan) {
                    let separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }
                let status;
                let color;

                if (list.transaction_type === "TOPUP") {
                    status = '+'
                    color = 'text-[#85CAB1]'
                } else {
                    status = '-'
                    color = 'text-[#DE8467]'
                }
                return (
                    <div className='border border-1 w-full flex justify-between items-center p-4 mb-5 rounded-md' key={index}>
                        <div className=''>
                            <h1 className={`${color} font-bold text-lg`}>{status}Rp.{rupiah}</h1>
                            <p className='text-sm'>{moment(list.created_on).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        </div>
                        <p className='text-sm'>{list.description}</p>
                    </div>
                )
            }) : []}
            {Item.length < limit ?
                <p className='pb-1'>sudah tidak ada history transaksi.</p>
                :
                <button className='flex items-center text-red-500' onClick={() => setLimit(limit + 5)}>show more</button>
            }
        </div>
    )
}

export default CustomCard