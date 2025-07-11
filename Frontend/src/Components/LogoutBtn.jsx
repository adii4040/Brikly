import React from 'react'

function LogoutBtn({className}) {
  return (
    <button className={`p-1 bg-orange-300 rounded ${className}`} >Logout</button>
  )
}

export default LogoutBtn