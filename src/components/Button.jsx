import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-700',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 rounded-xl ${bgColor} ${textColor} ${className}`} {...props}
        >
            {children}
        </button>
    )
}

export default Button
