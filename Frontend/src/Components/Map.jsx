import React from 'react'
import {MapContainer,TileLayer} from 'react-leaflet'
import Pin from './Pin'

function Map({items}) {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={7} scrollWheelZoom={true} className='w-full h-full -z-0 rounded-md'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                items?.map((item) => <Pin item={item} key={item.id}/>)
            }
        </MapContainer>
  )
}

export default Map