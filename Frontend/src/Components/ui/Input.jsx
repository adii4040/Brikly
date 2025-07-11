import React, { useId } from 'react'
const Input = React.forwardRef(function Input({
    type = "text",
    className = "",
    labelClass="",
    name,
    label,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {
                label && <label className={`inline-block mb-1 pl-1 ${labelClass}`} htmlFor={id}>{label}</label>
            }
            <input 
            type={type} 
            id={id}
            name={name}
            className={` px-3 py-2 rounded bg-white text-black outline-none focus:bg-orange-200/70 duration-200 ${className}`}
            ref={ref}
            {...props}
             />
        </div>
    )
})

export default Input