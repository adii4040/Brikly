import React from 'react'
import SearchList from '../Components/SearchList'
import Apartment from '../Components/Apartment'
import Map from '../Components/Map'
import { useFetchAllPosts } from '../hooks/useFetchPost.js'
import { useLocation } from "react-router-dom";
function List() {


  function useQueryParams() {
    const { search } = useLocation()
    console.log(search)
    return Object.fromEntries(new URLSearchParams(search))
  }

  const queryParams = useQueryParams()
  console.log(queryParams.city, "queryParams")
  const { data: allPosts, isLoading, isError, error } = useFetchAllPosts(queryParams)


  console.log("All Posts:", allPosts);
  console.log(error)

  //console.log(allPosts?.data?.posts)
  const allPostArr = allPosts?.data?.posts

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div className='w-full h-contentheight px-5 md:px-0 flex flex-col lg:flex-row overflow-y-scroll lg:overflow-hidden'>
      <div className="left w-full   lg:w-[60%] lg:pr-10">
        <div className='search'>
          {
            queryParams.city ? <h1 className='text-xl font-light'>Search results for <b>"{queryParams.city }"</b></h1> : <h1 className='text-xl font-light'>No location is mentioned!</h1>
          }
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
        <Map items={allPostArr} />
      </div>
    </div>
  )
}

export default List