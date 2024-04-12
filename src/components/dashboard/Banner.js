import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../services/auth/authSlice'
import { useLazyGetBannerQuery } from '../../services/modules/information'
import Slider from 'react-slick'

const Banner = () => {
    const token = useSelector(selectCurrentToken)
    const [allBanner, setAllBanner] = useState([])
    const [getBanner] = useLazyGetBannerQuery()
    console.log(allBanner);
    useEffect(() => {
        const getSrvc = async () => {
            const services = await getBanner(token)
            setAllBanner(services?.data?.data ?? []);
        }
        getSrvc()
    }, [getBanner, token])
    const settings = {
        // className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 4,
        speed: 500
    };
    return (
        <div className='fixed w-full mt-3 '>
            <h1 className='font-bold'>Temukan promo menarik</h1>
            <Slider autoplay {...settings} >
                {allBanner.map((list, index) =>
                    <img
                        src={list.banner_image}
                        className='p-6 w-[100px]'
                        alt={list.banner_name}
                        key={index}
                    />
                )}
            </Slider>
        </div>
    )
}

export default Banner