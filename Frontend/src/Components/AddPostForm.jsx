import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { addPost } from '../Services/postService'

import { AvailablePropertyStatus, AvailablePropertyType, AvailableUtilityPolicy, AvailablePetPolicy } from '../Contant'

function AddPostForm() {

    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        latitude: "",
        longitude: "",
        bedrooms: "",
        bathrooms: "",
        propertyType: "",
        propertyStatus: "",
        utilityPolicy: "",
        petPolicy: "",
        incomePolicy: "",
        size: "",
        schoolDist: "",
        hospitalDist: "",
        restaurantDist: "",
        railwayStationDist: "",
        busStopDist: "",
        airportDist: ""

    })
    const [images, setImages] = useState([])

    const addPostMutation = useMutation({
        mutationFn: async (formData) => {
            const data = addPost(formData)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            alert(data.message)
        },
        onError: (err) => {
            console.log(err.message)
            alert(err.message)
        }
    })



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }


    const handleSubmit = (e) => {
        e.preventDefault()


        const formDataObj = new FormData();

        // Append all form fields
        formDataObj.append("title", form.title);
        formDataObj.append("price", form.price);
        formDataObj.append("description", form.description);
        formDataObj.append("landmark", form.landmark);
        formDataObj.append("city", form.city);
        formDataObj.append("state", form.state);
        formDataObj.append("pincode", form.pincode);
        formDataObj.append("latitude", form.latitude);
        formDataObj.append("longitude", form.longitude);
        formDataObj.append("bedrooms", form.bedrooms);
        formDataObj.append("bathrooms", form.bathrooms);
        formDataObj.append("propertyType", form.propertyType);
        formDataObj.append("propertyStatus", form.propertyStatus);
        formDataObj.append("utilityPolicy", form.utilityPolicy);
        formDataObj.append("petPolicy", form.petPolicy);
        formDataObj.append("incomePolicy", form.incomePolicy);
        formDataObj.append("size", form.size);
        formDataObj.append("schoolDist", form.schoolDist);
        formDataObj.append("hospitalDist", form.hospitalDist);
        formDataObj.append("restaurantDist", form.restaurantDist);
        formDataObj.append("railwayStationDist", form.railwayStationDist);
        formDataObj.append("busStopDist", form.busStopDist);
        formDataObj.append("airportDist", form.airportDist);

        //Append the images
        if (images && images.length === 4) {
            images.forEach(img => {
                formDataObj.append("propertyImages", img)
            });
        } else {
            alert("Please upload exactly 4 images.");
            return;
        }
        addPostMutation.mutate(formDataObj)
        console.log(formDataObj)
        console.log(images)
    }


    return (
        <div className='w-[80%] mx-auto p-5'>
            <h1 className='text-3xl font-semibold pt-3'>Add New Post</h1>
            <form onSubmit={handleSubmit} className='mt-5'>
                <div className="head flex flex-col gap-5">
                    <div className='flex gap-5'>
                        <div className='flex flex-col'>
                            <label htmlFor="title" className='font-semibold'>Title</label>
                            <input
                                type="text"
                                id='title'
                                name='title'
                                value={form.title}
                                onChange={handleChange}
                                className='w-96 p-1 border border-black outline-none rounded'
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="Price" className='font-semibold'>Price</label>
                            <input
                                type="number"
                                id='Price'
                                name='price'
                                value={form.price}
                                onChange={handleChange}
                                className='p-1 border border-black outline-none rounded' />
                        </div>



                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="propertyImages" className='font-semibold'>Any 4 Property Images </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            id='propertyImages'
                            name='propertyImages'
                            onChange={(e) => setImages(Array.from(e.target.files))}
                            className='w-96  p-1 border border-black outline-none rounded' />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="desc" className='font-semibold'>Description</label>
                        <textarea name="description" id="description" value={form.description} rows={10} onChange={handleChange} className='border border-black rounded resize-none p-5'></textarea>
                    </div>
                </div>

                <div className="address mt-5">
                    <p className='font-semibold'>Address</p>
                    <div className="container w-full h-36 flex flex-wrap justify-between gap-5 border border-black rounded p-5">
                        <input
                            type="text"
                            name='landmark'
                            placeholder='House Number'
                            value={form.landmark}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none  min-w-[25%]' />
                        <input
                            type="text"
                            name='city'
                            placeholder='City'
                            value={form.city}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input
                            type="text"
                            name='state'
                            placeholder='State'
                            value={form.state}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input
                            type="text"
                            name='pincode'
                            placeholder='Pincode'
                            value={form.pincode}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input
                            type="text" name='latitude'
                            placeholder='Latitude'
                            value={form.latitude}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input
                            type="text"
                            name='longitude'
                            placeholder='Longitude'
                            value={form.longitude}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                    </div>
                </div>

                <div className="property w-full h-full mt-8  flex justify-between ">
                    <div className='flex flex-col'>
                        <label htmlFor="propertyStatus" className='font-semibold'>Property Status</label>
                        <select
                            name="propertyStatus"
                            id="propertyStatus"
                            onChange={handleChange}
                            className='w-[365px] h-10  border border-black rounded'>
                            {
                                AvailablePropertyStatus.map((status) => (
                                    <option key={status} value={status} >{status}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="propertyType" className='font-semibold'>Property Type</label>
                        <select
                            name="propertyType"
                            id="propertyType"
                            onChange={handleChange}
                            className='w-[365px] h-10  border border-black rounded'>
                            {
                                AvailablePropertyType.map((type) => (
                                    <option key={type} value={type}>
                                        {
                                            type
                                        }
                                    </option>
                                ))
                            }

                        </select>
                    </div>
                </div>

                <div className="policyAndSize mt-8 flex justify-between gap-5 ">
                    <div className="generalPolicy w-[45%] h-full">
                        <p className='font-semibold'>General Policy</p>

                        <div className="policyContainer w-full h-[80%] flex flex-col gap-8 py-5 pl-5 mt-1 border border-black rounded ">
                            <div className='flex flex-col'>
                                <label htmlFor="utilityPolicy" className='text-sm mb-2 '>Utility Policy</label>
                                <select
                                    name="utilityPolicy"
                                    id="utilityPolicy"
                                    onChange={handleChange}
                                    className='w-[90%] h-10 border border-black rounded'>
                                    {
                                        AvailableUtilityPolicy.map((utility) => (
                                            <option key={utility} value={utility}>
                                                {
                                                    utility
                                                }
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="petPolicy" className='text-sm mb-2 '>Pet Policy</label>
                                <select
                                    name="petPolicy"
                                    id="petPolicy"
                                    onChange={handleChange}
                                    className='w-[90%] h-10 border border-black rounded'>
                                    {
                                        AvailablePetPolicy.map((pet) => (
                                            <option key={pet} value={pet} >{pet}</option>
                                        ))
                                    }
                                </select>
                            </div>


                            <div className='flex flex-col'>
                                <label htmlFor="incomePolicy" className='text-sm mb-2 '>Income Policy</label>
                                <input
                                    type="text"
                                    id='incomePolicy'
                                    name='incomePolicy'
                                    value={form.incomePolicy}
                                    onChange={handleChange}
                                    className='w-[90%] h-10 p-1 border border-black outline-none rounded' />
                            </div>
                        </div>
                    </div>

                    <div className="roomSize w-[45%] h-full ">
                        <p className='font-semibold'>Sizes</p>
                        <div className="sizeContainer w-full h-[80%] flex flex-col gap-8 py-5 pl-5 mt-1 border border-black rounded">

                            <div className='flex flex-col'>
                                <label htmlFor="size" className='text-sm mb-2 '>Size</label>
                                <input
                                    type="number"
                                    id='size'
                                    name='size'
                                    value={form.size}
                                    onChange={handleChange}
                                    className='w-[90%] h-10 p-1 border border-black outline-none rounded' />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="bedrooms" className='text-sm mb-2 '>Total Bedrooms</label>
                                <input
                                    type="number"
                                    id='bedrooms'
                                    name='bedrooms'
                                    value={form.bedrooms}
                                    onChange={handleChange}
                                    className='w-[90%] h-10 p-1 border border-black outline-none rounded' />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="bathrooms" className='text-sm mb-2 '>Total Bathrooms</label>
                                <input
                                    type="number"
                                    id='bathrooms'
                                    name='bathrooms'
                                    value={form.bathrooms}
                                    onChange={handleChange}
                                    className='w-[90%] h-10 p-1 border border-black outline-none rounded' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="placesNearBy mt-5">
                    <p className='font-semibold'>Distance to the...</p>
                    <div className="container w-full h-36 flex flex-wrap justify-between gap-5 border border-black rounded p-5">
                        <input
                            type="number"
                            name='schoolDist'
                            placeholder='School'
                            value={form.schoolDist}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none  min-w-[25%]' />
                        <input
                            type="number"
                            name='hospitalDist'
                            placeholder='Hospital'
                            value={form.hospitalDist}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input
                            type="number"
                            name='restaurantDist'
                            placeholder='Restaurant'
                            value={form.restaurantDist}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input
                            type="number"
                            name='railwayStationDist'
                            placeholder='Railway Station'
                            value={form.railwayStationDist}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input
                            type="number"
                            name='busStopDist'
                            placeholder='Airport'
                            value={form.busStopDist}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                        <input
                            type="number"
                            name='airportDist'
                            placeholder='Bus Stop'
                            value={form.airportDist}
                            onChange={handleChange}
                            className='bg-transparent border-b border-black outline-none min-w-[25%]' />
                    </div>
                </div>

                <div className='text-end'>
                    <button type="submit" className='mt-5 p-2 rounded border border-black' disabled={addPostMutation.isPending}  >{addPostMutation.isPending ? "Adding..." : "Add Post" }</button>
                </div>
            </form>
        </div>
    )
}

export default AddPostForm