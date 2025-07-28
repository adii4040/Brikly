import React, { useState } from 'react'
import { Input, Select } from '../Components/ui/index'
import search from '../../public/search.png'

import { AvailablePropertyType, AvailablePropertyStatus, PropertyStatusEnum, PropertyTypeEnum } from '../Contant'
import { useNavigate } from 'react-router-dom'
function SearchList() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    propertyStatus: "",
    propertyType: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: ""

  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  console.log(form)
  const handleApplyFilters = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (form.city) params.set("city", form.city)
    if (form.propertyStatus) params.set("propertyStatus", form.propertyStatus)
    if (form.propertyType) params.set("propertyType", form.propertyType)
    if (form.minPrice) params.set("minPrice", form.minPrice)
    if (form.maxPrice) params.set("maxPrice", form.maxPrice)
    if (form.bedrooms) params.set("bedrooms", form.bedrooms)


    navigate(`/list?${params}`)
  }
  return (
    <div>
      <form className='flex flex-col gap-5' onSubmit={handleApplyFilters}>
        <Input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          label="Location"
          placeholder="City Location"
          labelClass="text-xs"
          className="w-full h-8 border border-gray placeholder:text-xs"
        />

        <div className='flex flex-wrap md:flex-nowrap justify-between items-end gap-5'>
          <div className='flex flex-col'>
            <label htmlFor="propertyStatus" className='text-xs'>PropertyStatus</label>
            <select 
            id='propertyStatus' 
            name='propertyStatus' 
            onChange={handleChange}
            className="w-20 h-9 ml-2 mt-1 md:ml-0 text-sm rounded-md border border-gray px-3 py-2  bg-white text-black outline-none focus:bg-orange-200/70 duration-200  ">
              {
                AvailablePropertyStatus.map((status) => (
                  <option key={status} value={status} name={status}>
                    {status}
                  </option>
                ))
              }
            </select>
          </div>

          <div className='flex flex-col'>
            <Select
              options={AvailablePropertyType}
              onChange={handleChange}
              name="propertyType"
              label="Property"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0 text-sm rounded-md border border-gray" />
          </div>

          <div className='flex flex-col'>
            <Input
              type="number"
              min={0}
              max={100000}
              name='minPrice'
              value={form.minPrice}
              onChange={handleChange}
              placeholder="any"
              label="Min Price"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0  rounded-md border border-gray placeholder:text-sm" />
          </div>

          <div className='flex flex-col'>
            <Input
              type="number"
              min={0}
              max={100000}
              name='maxPrice'
              value={form.maxPrice}
              onChange={handleChange}
              placeholder="any"
              label="Max Price"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0 rounded-md border border-gray placeholder:text-sm" />
          </div>

          <div className='flex flex-col'>
            <Input
              type="number"
              min={0}
              max={100000}
              name='bedrooms'
              value={form.bedrooms}
              onChange={handleChange}
              placeholder="any"
              label="Bedroom"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0 rounded-md border border-gray placeholder:text-sm" />
          </div>

          <div className='w-20 h-10 md:w-32 md:h-12'>
            <button className='w-full h-full bg-orange-300'><img src={search} className='w-5 md:w-6 mx-auto' /></button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default SearchList