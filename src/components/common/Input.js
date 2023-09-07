import React from 'react'


const Input = ({ readOnly, defaultValue, label, type, placeholder, styleInput, value, onChange, refer, icon, iconLeft }) => {
    return (
        <div className='flex items-center justify-start'>
            {iconLeft}
            {label}
            <div className='flex justify-end items-center'>
                <input
                    readOnly={readOnly}
                    defaultValue={defaultValue}
                    type={type}
                    ref={refer}
                    value={value}
                    onChange={onChange}
                    className={`border border-[#DDDDDD] p-2 pl-6 ${styleInput} mb-5 outline-none`}
                    placeholder={placeholder}
                />
                {icon}
            </div>
        </div>
    )
}

export default Input