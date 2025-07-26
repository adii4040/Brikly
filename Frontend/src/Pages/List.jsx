import React from 'react'
import SearchList from '../Components/SearchList'
import Apartment from '../Components/Apartment'
import Map from '../Components/Map'
import { listData } from '../lib/dummyData'
import {useFetchAllPosts} from '../hooks/useFetchPost.js'
function List() {

  const {data: allPosts} = useFetchAllPosts()
  //console.log(allPosts?.data?.posts)
  const allPostArr = allPosts?.data?.posts

  return (
    <div className='w-full h-contentheight px-5 md:px-0 flex flex-col lg:flex-row overflow-y-scroll lg:overflow-hidden'>
      <div className="left w-full   lg:w-[60%] lg:pr-10">
        <div className='search'>
          <h1 className='text-xl font-light'>Search results for <b>"London"</b></h1>
          <SearchList />
        </div>

        <div className='description lg:max-h-[70vh] mt-5 pb-5 lg:overflow-y-auto scrollbar-hide '>
          {
            allPostArr?.map((post) => (
              <div key={post?._id}>
                <Apartment
                post={post}
                />
                </div>
            ))
          }
        </div>
      </div>
      <div className="right w-full h-full lg:w-[40%] rounded-md -mt-1 ">
        <Map items={allPostArr}/>
      </div>
    </div>
  )
}

export default List