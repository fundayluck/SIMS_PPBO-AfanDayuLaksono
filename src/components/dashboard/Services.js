import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../services/auth/authSlice'
import { useLazyGetServicesQuery } from '../../services/modules/information'
import { NavLink } from 'react-router-dom'

const Services = () => {
    const token = useSelector(selectCurrentToken)
    const [allService, setAllService] = useState([])
    const [getServices] = useLazyGetServicesQuery()

    useEffect(() => {
        const getSrvc = async () => {
            const services = await getServices(token)
            setAllService(services?.data?.data);
        }
        getSrvc()
    }, [getServices, token])
    return (
        <div className='flex mt-10'>
            {allService.map((list, index) =>
                <NavLink to={`service/${index}`} className='flex flex-col ' key={index}>
                    <div className='p-3' >
                        <img
                            src={list.service_icon}
                            alt={list?.service_name}
                            width={100}
                        />
                    </div>
                    <p className='text-[10px] text-center mx-3'>{list?.service_name}</p>
                </NavLink>
            )}
        </div>
    )
}

export default Services