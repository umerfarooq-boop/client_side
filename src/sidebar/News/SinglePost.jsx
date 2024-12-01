import React from 'react'
import Dashboard from '../Dashboard'
import { useParams } from 'react-router-dom'

function SinglePost() {
    const {id} = useParams();
  return (
    <>
        <Dashboard>
            <h1>Post Record {id}</h1>
        </Dashboard>
    </>
  )
}

export default SinglePost