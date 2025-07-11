import React, { useState } from 'react'
import {Input} from '../Components/ui/index'
import search from '../../public/search.png'

const types = ["Buy", "Rent"]

function SearchBar() {
  const [query, setQuery] = useState({
    type:"Buy",
    location:"",
    minPrice:0,
    maxPrice:0
    
  })

  const toggleType = (inputType) => {
    setQuery(prev => ({...prev, type: inputType}))
  }
  return (
    <div>
      <div className="type">
        {
          types.map((type) => (
            <button key={type} onClick={() => toggleType(type)} className={`w-20 h-12  border border-b-0 ${type === "Buy" ? "rounded-tl-lg border-r-0" : "rounded-tr-lg border-l-0 "}  ${query.type === type ? "bg-black text-white" : ""}`}>{type}</button>
          ))
        }
      </div>
      <form className='md:flex items-center border border-b-0 border-gray'>
        <Input 
        type="text"
        name="location"
        placeholder="City Location"
        className=" w-full h-14 border-b-2 rounded-none placeholder:text-sm" />

        <Input 
        type="number"
        name="minPrice"
        min={0}
        max={100000}
        placeholder="Min Price"
        className=" w-full h-14 border-b-2 rounded-none placeholder:text-sm" />

        <Input 
        type="number"
        name="maxPrice"
        min={0}
        max={100000}
        placeholder="Max Price"
        className=" w-full h-14 border-b-2 rounded-none placeholder:text-sm" />

        <button type="submit" className='w-full md:w-44 h-14 bg-orange-300'><img src={search} className='md:w-6 mx-auto'/></button>
      </form>
    </div>
  )
}

export default SearchBar