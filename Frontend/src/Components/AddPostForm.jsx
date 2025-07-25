import React, {useState} from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


function AddPostForm() {

    const [value, setValue] = useState('');
    return (
        <div className='w-[80%] mx-auto p-5'>
            <h1 className='text-3xl font-semibold pt-3'>Add New Post</h1>
            <form action="" className='mt-5'>
                <div className="head flex flex-col gap-5">
                    <div className='flex gap-5'>
                        <div className='flex flex-col'>
                            <label htmlFor="title" className='font-semibold'>Title</label>
                            <input type="text" id='title' name='title' className='w-96 p-1 border border-black outline-none rounded' />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="Price" className='font-semibold'>Price</label>
                            <input type="number" id='Price' name='price' className='p-1 border border-black outline-none rounded' />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="desc" className='font-semibold'>Description</label>
                        <ReactQuill theme="snow" value={value} onChange={setValue} className="custom-quill"/>
                    </div>
                </div>

                <div className="address mt-5">
                    <p className='font-semibold'>Address</p>
                    <div className="container w-full h-36 flex flex-wrap justify-between gap-5 border border-black rounded p-5">
                        <input type="text" name='landmark' placeholder='House Number' className='bg-transparent border-b border-black outline-none  min-w-[25%]' />
                        <input type="text" name='city' placeholder='City' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input type="text" name='state' placeholder='State' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input type="text" name='pincode' placeholder='Pincode' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input type="text" name='latitude' placeholder='Latitude' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input type="text" name='longitude' placeholder='Longitude' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                    </div>
                </div>

                <div className="property w-full h-full mt-8  flex justify-between ">
                    <div className='flex flex-col'>
                        <label htmlFor="propertyStatus" className='font-semibold'>Property Status</label>
                        <select name="propertyStatus" id="propertyStatus" className='w-[365px] h-10  border border-black rounded'>
                            <option value="">Buy</option>
                            <option value="">Rent</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="propertyType" className='font-semibold'>Property Type</label>
                        <select name="propertyType" id="propertyType" className='w-[365px] h-10 border border-black rounded'>
                            <option value="">Apartment</option>
                            <option value="">House</option>
                            <option value="">Condo</option>
                            <option value="">Land</option>
                        </select>
                    </div>
                </div>

                <div className="policyAndSize mt-8 flex justify-between gap-5 ">
                    <div className="generalPolicy w-[45%] h-full">
                        <p className='font-semibold'>General Policy</p>

                        <div className="policyContainer w-full h-[80%] flex flex-col gap-8 py-5 pl-5 mt-1 border border-black rounded ">
                            <div className='flex flex-col'>
                                <label htmlFor="utilityPolicy" className='text-sm mb-2 '>Utility Policy</label>
                                <select name="utilityPolicy" id="utilityPolicy" className='w-[90%] h-10 border border-black rounded'>
                                    <option value="">Owner is responsible</option>
                                    <option value="">Tenant is responsible</option>
                                    <option value="">Shared</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="petPolicy" className='text-sm mb-2 '>Pet Policy</label>
                                <select name="petPolicy" id="petPolicy" className='w-[90%] h-10 border border-black rounded'>
                                    <option value="">Pets are allowed</option>
                                    <option value="">Pets are not allowed</option>
                                </select>
                            </div>


                            <div className='flex flex-col'>
                                <label htmlFor="incomePolicy" className='text-sm mb-2 '>Income Policy</label>
                                <input type="text" id='incomePolicy' name='incomePolicy' className='w-[90%] h-10 p-1 border border-black outline-none rounded' />
                            </div>
                        </div>
                    </div>

                    <div className="roomSize w-[45%] h-full ">
                        <p className='font-semibold'>Sizes</p>
                        <div className="sizeContainer w-full h-[80%] flex flex-col gap-8 py-5 pl-5 mt-1 border border-black rounded">

                            <div className='flex flex-col'>
                                <label htmlFor="size" className='text-sm mb-2 '>Size</label>
                                <input type="number" id='size' name='size' className='w-[90%] h-10 p-1 border border-black outline-none rounded' />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="bedrooms" className='text-sm mb-2 '>Total Bedrooms</label>
                                <input type="number" id='bedrooms' name='bedrooms' className='w-[90%] h-10 p-1 border border-black outline-none rounded' />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="bathrooms" className='text-sm mb-2 '>Total Bathrooms</label>
                                <input type="number" id='bathrooms' name='bathrooms' className='w-[90%] h-10 p-1 border border-black outline-none rounded' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="placesNearBy mt-5">
                    <p className='font-semibold'>Distance to the...</p>
                    <div className="container w-full h-36 flex flex-wrap justify-between gap-5 border border-black rounded p-5">
                        <input type="number" name='schoolDist' placeholder='School' className='bg-transparent border-b border-black outline-none  min-w-[25%]' />
                        <input type="number" name='hospitalDist' placeholder='Hospital' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input type="number" name='restaurantDist' placeholder='Restaurant' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input type="number" name='railwayStationDist' placeholder='Railway Station' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input type="number" name='busStopDist' placeholder='Airport' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input type="number" name='airportDist' placeholder='Bus Stop' className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                    </div>
                </div>

                <div className='text-end'>
                    <button type="submit" className='mt-5 p-2 rounded border border-black'>Add Post</button>
                </div>
            </form>
        </div>
    )
}

export default AddPostForm