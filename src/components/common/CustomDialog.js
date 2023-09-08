import React from 'react'
import ReactDOM from 'react-dom'

const CustomDialog = ({ children }) => {
    return ReactDOM.createPortal(
        <div className='flex justify-center z-10'>
            <div className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className={`fixed flex justify-center inset-40 top-[100px] p-2 rounded`}>
                <div className='bg-white w-[300px] h-[300px] rounded-md shadow-md'>
                    {children}
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    )
}

export default CustomDialog