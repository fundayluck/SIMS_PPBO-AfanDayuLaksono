import React from 'react'

const Button = ({ disable, type, buttonName, styleButton, colorButton, onClick }) => {
    return (
        <button disabled={disable} type={type} onClick={onClick} className={`${colorButton} text-[13px] ${styleButton} flex justify-center items-center`}>
            {buttonName}
        </button>
    )
}

export default Button