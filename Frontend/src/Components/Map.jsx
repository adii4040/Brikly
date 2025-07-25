import React from 'react'
import {MapContainer,TileLayer} from 'react-leaflet'
import Pin from './Pin'

function Map({items}) {
    return (
        <MapContainer center={[22.9734, 78.6569]} zoom={5} scrollWheelZoom={true} className='w-full h-full -z-0 rounded-md'>
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