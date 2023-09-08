import React from 'react'

const Button = ({ type, buttonName, styleButton, colorButton, onClick }) => {
    return (
        <button type={type} onClick={onClick} className={`${colorButton} text-[13px] ${styleButton} flex justify-center items-center`}>
            {buttonName}
        </button>
    )
}

export default Button