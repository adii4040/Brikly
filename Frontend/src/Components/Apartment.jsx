import React from 'react'
import pin from '../../public/pin.png'
import bed from '../../public/bed.png'
import bath from '../../public/bath.png'
import save from '../../public/save.png'
import chat from '../../public/chat.png'
import { Link } from 'react-router-dom'

function Apartment({ post }) {

    return (
        <>
            <div className='w-full h-[22vh] flex mb-10'>
                <div className="imageContainer w-[40%] h-full hidden md:block bg-slate-950 rounded-lg overflow-hidden">
                    <Link to={`/post/${post._id}`}><img src={post.images[0].url} alt="" className='w-full h-full object-cover transition-all duration:200 hover:scale-105 ' /></Link>
                </div>
                <div className="details w-full md:w-[60%]  h-full relative flex flex-col items-start justify-between md:pl-5">
                    <Link to={`/post/${post._id}`}><h1 className='title text-lg text-gray-700 font-bold '>{post.title}</h1></Link>
                    <p className='flex text-xs text-gray-500/80 font-semibold items-center gap-1'><img src={pin} className='w-4 h-4' />{post.address.landmark}, {post.address.city},{post.address.state}, {post.address.pincode}</p>
                    <button className='price bg-orange-300/70 p-1 rounded-md' >₹ {post.price}</button>
                    <div className='amenities flex gap-5 text-xs font-medium'>
                        <div className='bedroom p-1 bg-gray-100 rounded-md ' ><p className='flex items-center gap-1'><img src={bed} alt='bed' className='w-4 h-4' /> {post.bedrooms} Bedroom </p></div>
                        <div className='bathroom p-1 bg-gray-100 rounded-md' ><p className='flex items-center gap-1'><img src={bath} alt='bath' className='w-4 h-4' /> {post.bathrooms} bathroom </p></div>
                    </div>

                    <div className='flex gap-2 absolute bottom-0 right-0'>
                        <div className="bookmark border border-gray-600 rounded p-1"><img src={save} alt="save" className='w-3 h-3' /></div>
                        <div className="contact border border-gray-600 rounded p-1 "><img src={chat} alt="chat" className='w-3 h-3' /></div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Apartment