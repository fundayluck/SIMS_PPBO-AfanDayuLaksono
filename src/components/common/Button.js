import React from 'react'

const Button = ({ buttonName, styleButton, colorButton, onClick }) => {
    return (
        <button onClick={onClick} className={`${colorButton} text-[13px] ${styleButton} flex justify-center items-center`}>
            {buttonName}
        </button>
    )
}

export default Button