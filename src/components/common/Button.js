import React from 'react'

const Button = ({ buttonName, styleButton, colorButton }) => {
    return (
        <button className={`${colorButton} text-white text-[13px] ${styleButton} flex justify-center items-center`}>
            {buttonName}
        </button>
    )
}

export default Button