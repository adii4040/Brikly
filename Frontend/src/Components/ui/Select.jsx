import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options = [],
    label = "",
    name = "",
    className = "",
    labelClass = "",
    ...props
}, ref) {

    const id = useId()
    return (
        <div>
            {

                label && <label className={`inline-block mb-1 pl-1 ${labelClass}`} htmlFor={id}>{label}</label>
            }
            <select name={name} id={id} {...props} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-orange-200/70 duration-200  ${className}`}>
                {
                    options?.map((opt) => (
                        <option key={opt} value={opt} className=''>
                            {opt}
                        </option>
                    ))
                }
            </select>
        </div>
    )
})

export default Select