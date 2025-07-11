import React from 'react'
import SearchList from '../Components/SearchList'
import Apartment from '../Components/Apartment'
import Map from '../Components/Map'
import { listData } from '../lib/dummyData'

function List() {
  const data = listData

  return (
    <div className='w-full h-contentheight px-5 md:px-0 flex flex-col lg:flex-row overflow-y-scroll lg:overflow-hidden'>
      <div className="left w-full   lg:w-[60%] lg:pr-10">
        <div className='search'>
          <h1 className='text-xl font-light'>Search results for <b>"London"</b></h1>
          <SearchList />
        </div>

        <div className='description lg:max-h-[70vh] mt-5 pb-5 lg:overflow-y-auto scrollbar-hide '>
          {
            data?.map((item) => (
              <div key={item.id}>
                <Apartment
                item={item} />
                </div>
            ))
          }
        </div>
      </div>
      <div className="right w-full h-full lg:w-[40%] rounded-md -mt-1 ">
        <Map items={data}/>
      </div>
    </div>
  )
}

export default List