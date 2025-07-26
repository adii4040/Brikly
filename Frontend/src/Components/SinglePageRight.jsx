import React from 'react'

import utility from '../../public/utility.png'
import pet from '../../public/pet.png'
import fee from '../../public/fee.png'
import size from '../../public/size.png'
import bed from '../../public/bed.png'
import bath from '../../public/bath.png'
import school from '../../public/school.png'
import bus from '../../public/bus.png'
import restaurant from '../../public/restaurant.png'
import save from '../../public/save.png'
import chat from '../../public/chat.png'


import { savePost } from '../Services/postService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Map from '../Components/Map'


function SinglePageRight({ post, postDetails, isSaved }) {



    const queryClient = useQueryClient()
    
    const savePostMutation = useMutation({
        mutationFn: async (postId) => {
            const data = await savePost(postId)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.refetchQueries({queryKey: ["postById"]})
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const savePostFn = (postId) => {
        savePostMutation.mutate(postId)
    }

    return (
        <div >
            <div className='general w-full lg:h-[25vh] pt-5 lg:pt-0'>
                <h1 className='text-base font-semibold'>General</h1>
                <div className='w-full lg:h-[78%] flex flex-col gap-3 mt-5 p-3 bg-white text-black rounded-md '>
                    <div className='flex items-center gap-2'>
                        <img src={utility} alt="utility" className='w-5 h-5 bg-orange-300/50' />
                        <div className='line-'>
                            <h1 className='font-semibold text-sm leading-tight'>Utility Policy</h1>
                            <p className='text-xs m-0'>{postDetails?.generalPolicy?.utilityPolicy}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={pet} alt="pet" className='w-5 h-5 bg-orange-300/50' />
                        <div>
                            <h1 className='font-semibold text-sm leading-tight'>Pet Policy</h1>
                            <p className='text-xs m-0'>{postDetails?.generalPolicy?.petPolicy}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={fee} alt="fee" className='w-5 h-5 bg-orange-300/50' />
                        <div>
                            <h1 className='font-semibold text-sm leading-tight'>Income Policy</h1>
                            <p className='text-xs m-0'>{postDetails?.generalPolicy?.incomePolicy}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='roomsize w-full lg:h-[10vh] mt-2 '>
                <h1 className='text-base font-semibold'>Room Sizes</h1>
                <div className='flex justify-between  mt-5'>
                    <div className="size  p-1 flex items-center gap-1 bg-white">
                        <img src={size} alt="size" className='w-5 h-5' />
                        <p className='text-xs lg:font-semibold'>{postDetails?.roomSizes?.size}sqft</p>
                    </div>
                    <div className="size  p-1 flex items-center gap-1 bg-white">
                        <img src={bed} alt="size" className='w-5 h-5' />
                        <p className='text-xs lg:font-semibold'>{postDetails?.roomSizes?.bedrooms} bed</p>
                    </div>
                    <div className="size  p-1 flex items-center gap-1 bg-white">
                        <img src={bath} alt="size" className='w-5 h-5' />
                        <p className='text-xs lg:font-semibold'>{postDetails?.roomSizes?.bathrooms} bathroom</p>
                    </div>
                </div>
            </div>
            <div className='nearby w-full lg:min-h-[10vh] mt-5 '>
                <h1 className='text-base font-semibold'>Nearby Places</h1>
                <div className='w-full h-full  flex justify-between flex-wrap gap-5 mt-5 p-3 bg-white text-black rounded-md '>
                    <div className='flex items-center gap-2'>
                        <img src={school} alt="utility" className='w-5 h-5' />
                        <div>
                            <h1 className='font-semibold text-sm leading-tight'>School</h1>
                            <p className='text-xs m-0'>{postDetails?.nearByPlacesDistanace?.schoolDist >= 1000 ? (postDetails?.nearByPlacesDistanace?.schoolDist) / 1000 : postDetails?.nearByPlacesDistanace?.schoolDist}km away</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={bus} alt="pet" className='w-5 h-5' />
                        <div>
                            <h1 className='font-semibold text-sm leading-tight'>Hospital</h1>
                            <p className='text-xs m-0'>{postDetails?.nearByPlacesDistanace?.hospitalDist >= 1000 ? (postDetails?.nearByPlacesDistanace?.hospitalDist) / 1000 : postDetails?.nearByPlacesDistanace?.hospitalDist}km away</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={restaurant} alt="fee" className='w-5 h-5' />
                        <div>
                            <h1 className='font-semibold text-sm leading-tight'>Restaurant</h1>
                            <p className='text-xs m-0'>{postDetails?.nearByPlacesDistanace?.restaurantDist >= 1000 ? (postDetails?.nearByPlacesDistanace?.restaurantDist) / 1000 : postDetails?.nearByPlacesDistanace?.restaurantDist}km away</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={school} alt="utility" className='w-5 h-5' />
                        <div>
                            <h1 className='font-semibold text-sm leading-tight'>Railway Station</h1>
                            <p className='text-xs m-0'>{postDetails?.nearByPlacesDistanace?.schoolDist >= 1000 ? (postDetails?.nearByPlacesDistanace?.schoolDist) / 1000 : postDetails?.nearByPlacesDistanace?.schoolDist}km away</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={bus} alt="pet" className='w-5 h-5' />
                        <div>
                            <h1 className='font-semibold text-sm leading-tight'>Bus Stop</h1>
                            <p className='text-xs m-0'>{postDetails?.nearByPlacesDistanace?.busStopDist >= 1000 ? (postDetails?.nearByPlacesDistanace?.busStopDist) / 1000 : postDetails?.nearByPlacesDistanace?.busStopDist}km away</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={restaurant} alt="fee" className='w-5 h-5' />
                        <div>
                            <h1 className='font-semibold text-sm leading-tight'>Airport</h1>
                            <p className='text-xs m-0'>{postDetails?.nearByPlacesDistanace?.airportDist >= 1000 ? (postDetails?.nearByPlacesDistanace?.airportDist) / 1000 : postDetails?.nearByPlacesDistanace?.airportDist}km away</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='location w-full h-[25vh] mt-10 z-0'>
                <h1 className='text-base font-semibold'>Location

                </h1>
                <div className='w-full h-[75%] mt-5'>
                    <Map />
                </div>
            </div>

            <div className='w-full flex justify-between my-5'>
                <button className='flex items-center gap-1 border border-yellow-300 text-xs bg-white p-3 rounded-md' > <img src={chat} alt="" className='w- h-3' /> Send a Message</button>
                <button className={`flex items-center gap-1 border border-yellow-300 text-xs  p-3 rounded-md ${isSaved ? "bg-orange-300" : "bg-white"}`} onClick={() => savePostFn(post?._id)}> <img src={save} alt="" className='w-3 h-3' /> Save the Place</button>
            </div>
        </div>
    )
}

export default SinglePageRight