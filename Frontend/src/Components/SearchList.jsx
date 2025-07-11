import React from 'react'
import { Input, Select } from '../Components/ui/index'
import search from '../../public/search.png'
function SearchList() {
  return (
    <div>
      <form className='flex flex-col gap-5'>
        <Input
          type="text"
          name="location"
          label="Location"
          placeholder="City Location"
          labelClass="text-xs"
          className="w-full h-8 border border-gray placeholder:text-xs"
        />

        <div className='flex flex-wrap md:flex-nowrap justify-between items-end gap-5'>
          <div className='flex flex-col'>
            <Select
              options={["Buy", "Rent"]}
              label="Type"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0 text-sm rounded-md border border-gray " />
          </div>

          <div className='flex flex-col'>
            <Select
              options={["any", "Apartment", "House", "Condo", "Land"]}
              label="Property"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0 text-sm rounded-md border border-gray" />
          </div>

          <div className='flex flex-col'>
            <Input
              type="Number"
              min={0}
              max={100000}
              placeholder="any"
              label="Min Price"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0  rounded-md border border-gray placeholder:text-sm" />
          </div>

          <div className='flex flex-col'>
            <Input
              type="Number"
              min={0}
              max={100000}
              placeholder="any"
              label="Max Price"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0 rounded-md border border-gray placeholder:text-sm" />
          </div>

          <div className='flex flex-col'>
            <Input
              type="Number"
              min={0}
              max={100000}
              placeholder="any"
              label="Bedroom"
              labelClass="text-xs"
              className="w-20 h-9 ml-2 md:ml-0 rounded-md border border-gray placeholder:text-sm" />
          </div>

          <div className='w-20 h-10 md:w-32 md:h-12'>
            <button type="submit" className='w-full h-full bg-orange-300'><img src={search} className='w-5 md:w-6 mx-auto' /></button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default SearchList