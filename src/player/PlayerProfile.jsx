import React from 'react'

function PlayerProfile() {
  const name = localStorage.getItem('name');
  return (
    <>
      <h1 className='text-center text-3xl text-red-700'>Welcome to Player Profile {name}</h1>
    </>
  )
}

export default PlayerProfile