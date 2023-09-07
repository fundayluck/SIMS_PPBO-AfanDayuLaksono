import React from 'react'

const Button = ({ buttonName, styleButton }) => {
    return (
        <button className={`bg-[#F42619] text-white text-[13px] ${styleButton} `}>
            {buttonName}
        </button>
    )
}

export default Button