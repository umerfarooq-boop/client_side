import React from 'react'
import { useParams } from 'react-router-dom'

function ViewScore() {
  const {id} = useParams();
  return (
    <>
        <div>ViewScore {id}</div>
    </>
  )
}

export default ViewScore