import React from 'react'

const Input = ({ placeholder, styleInput }) => {
    return (
        <input
            className={`border border-[#DDDDDD] p-2 ${styleInput} mb-5 outline-none`}
            placeholder={placeholder}
        />
    )
}

export default Input