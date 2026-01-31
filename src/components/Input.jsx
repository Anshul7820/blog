import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}
            >
                {label}
            </label>}
            <input
                type={type}
                className={`px-3 py-2 rounded-xl bg-white text-black outline-none focus:bg-gray-100 duration-200 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
