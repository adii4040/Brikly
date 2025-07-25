import React, { useEffect, useState } from 'react'

import SinglePageRight from '../Components/SinglePageRight'
import pin from '../../public/pin.png'

import { useParams } from 'react-router-dom'
import { fetchPostById } from '../Services/postService'
import { useQuery } from '@tanstack/react-query'
function Single() {

  const params = useParams()



  const getPostByIdUrl = `http://localhost:8000/api/v1/post/${params.postId}/get-post`
  const { data } = useQuery({
    queryKey: ["postById", params.postId],
    queryFn: () => fetchPostById(getPostByIdUrl),
    retry: false,
    staleTime: 0,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (err) => {
      console.log(err)
    }
  })


  //console.log(data?.data?.post.post.images)
  const post = data?.data?.post.post
  const postDetails = data?.data?.post.postDetails


  const [imgSrc, setImgSrc] = useState([])

  useEffect(() => {
    if (post?.images) {
      setImgSrc(post.images)
    }
  }, [post?.images])

  //console.log("OUTSIDE",imgSrc)
  const swapImg = (url) => {
    const newImgSrc = [...imgSrc]
    const index = newImgSrc.findIndex(img => img.url === url)
    if (index === -1) return;

    const temp = imgSrc[0]
    newImgSrc[0] = newImgSrc[index]
    newImgSrc[index] = temp

    setImgSrc(newImgSrc)

    //console.log("Inside",imgSrc)
  }
  return (
    <div className='w-full h-contentheight flex flex-col gap-10 md:gap-0  lg:flex-row overflow-y-scroll lg:overflow-y-visible'>
      <div className="left w-full lg:w-[60%] h-full px-5 md:px-0 lg:pr-10 flex flex-col lg:overflow-y-auto">
        <div className="imageContainer w-full h-[45%] flex gap-5">
          <div className='w-[70%] h-full rounded-lg overflow-hidden bg-slate-400'>
            <img src={imgSrc[0]?.url} alt="" className='w-full h-full object-cover' />
          </div>
          <div className='w-[30%] h-full flex flex-col gap-2 '>
            {
              imgSrc?.slice(1).map((src) => (
                <img key={src.url} src={src.url} className='w-full h-[32%] object-cover rounded-lg cursor-pointer' onClick={() => swapImg(src.url)} />
              ))
            }
          </div>
        </div>
        <div className="details w-full h-full lg:h-[55%] flex flex-col gap-5 pt-10">
          <div className="top flex flex-col md:flex-row justify-between md:items-end gap-2 md:gap-0">
            <div className="left">
              <h1 className='title text-3xl font-medium'>{post?.title}</h1>
              <p className='address flex items-center text-xs font-semibold text-gray-500 my-5'><img src={pin} className='h-4 ' /> {post?.address?.landmark}, {post?.address?.city}, {post?.address?.state}, {post?.address?.pincode}</p>
              <button className='bg-orange-300/70 p-1 rounded-md'>₹{post?.price}</button>
            </div>
            <div className="right w-36 md:h-[75%] rounded-md bg-orange-300/50 flex md:flex-col items-center gap-2 p-2">
              <div className='w-12 h-12 md:w-16 md:h-16'>
                <img src={post?.postedBy?.avatar?.url} alt="owner pfp" className='w-12 h-12 md:w-16 md:h-16  rounded-full object-cover' />
              </div>
              <h1 className='text-xs font-semibold'>{post?.postedBy?.fullname}</h1>
            </div>
          </div>
          <div className="bottom mb-5 ">
            <p className='text-sm text-gray-700 font-medium leading-tight text-justify'> {postDetails?.description} </p>
          </div>
        </div>
      </div>

      <div className="right w-full lg:w-[40%] h-full flex flex-col bg-[#fcf5f3] px-5  lg:overflow-y-auto scrollbar-hide">
        <SinglePageRight postDetails={postDetails} />
      </div>
    </div>
  )
}

export default Single