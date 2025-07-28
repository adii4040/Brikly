import React, { useState } from 'react'
import { Input } from '../Components/ui/index'
import search from '../../public/search.png'
import { AvailablePropertyStatus, PropertyStatusEnum } from '../Contant'
import { useNavigate } from 'react-router-dom'
import { useFetchAllPosts } from '../hooks/useFetchPost'

function SearchBar() {


  const navigate = useNavigate()

  const [form, setForm] = useState({
    propertyStatus: PropertyStatusEnum.BUY,
    city: "",
    minPrice: "",
    maxPrice: ""

  })

  const toggleStatus = (inputType) => {
    setForm({ ...form, propertyStatus: inputType })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  //console.log(form)

  const handleApplyFilters = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (form.city) params.set("city", form.city)
    if (form.propertyStatus) params.set("propertyStatus", form.propertyStatus)
    if (form.minPrice) params.set("minPrice", form.minPrice)
    if (form.maxPrice) params.set("maxPrice", form.maxPrice)

    navigate(`/list?${params}`)
  }

  return (
    <div>

      <div className="type">
        {
          AvailablePropertyStatus.map((status) => (
            <button key={status} onClick={() => toggleStatus(status)} className={`w-20 h-12  border border-b-0 ${status === "Buy" ? "rounded-tl-lg border-r-0" : "rounded-tr-lg border-l-0 "}  ${form.propertyStatus === status ? "bg-black text-white" : ""}`}>{status}</button>
          ))
        }
      </div>
      <form className='md:flex flex-col items-start' onSubmit={handleApplyFilters}>

        <div className='flex'>
          <Input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City Location"
            className=" w-full h-14 border border-r-0 rounded-none placeholder:text-sm" />

          <Input
            type="number"
            name="minPrice"
            value={form.minPrice}
            onChange={handleChange}
            min={0}
            max={100000}
            placeholder="Min Price"
            className=" w-full h-14 border border-x-0 rounded-none placeholder:text-sm" />

          <Input
            type="number"
            name="maxPrice"
            value={form.maxPrice}
            onChange={handleChange}
            min={0}
            max={100000}
            placeholder="Max Price"
            className=" w-full h-14 border border-x-0 rounded-none placeholder:text-sm" />
          <button className='w-full md:w-44 h-14 bg-orange-300'><img src={search} className='md:w-6 mx-auto' /></button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar