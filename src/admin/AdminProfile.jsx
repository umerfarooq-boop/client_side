import React from 'react'

function AdminProfile() {
  const name = localStorage.getItem('name');
  return (
    <>
        <h1 className='text-center text-3xl text-red-700'>Welcome to Admin Profile {name}</h1>
    </>
  )
}

export default AdminProfile