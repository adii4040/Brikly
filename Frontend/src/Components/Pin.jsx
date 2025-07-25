import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
function Pin({ item }) {
    return (
        <>
            <Marker position={[item?.address?.latitude, item?.address?.longitude]}>
                    <Popup>
                        <div className="flex gap-3 w-48">
                            <img
                                src={item.images[0].url}
                                alt=""
                                className="w-16 h-12 object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-between overflow-hidden">
                                <Link
                                    to={`/post/${item._id}`}
                                    className="text-xs font-medium  truncate"
                                >
                                    {item.title}
                                </Link>
                                <span className="text-[10px]">{item.bedrooms} Bedroom</span>
                                <b className="text-[10px]">₹{item.price}</b>
                            </div>
                        </div>
                    </Popup>
            </Marker >
        </>
    )
}

export default Pin