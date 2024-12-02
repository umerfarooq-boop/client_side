import React from 'react'
import Dashboard from '../Dashboard'
import { useParams } from 'react-router-dom'

function Updatenews() {
  const {id} = useParams();
  return (
    <>
      <>
        <Dashboard>
          <h1>The id is {id}</h1>
        </Dashboard>
      </>
    </>
  )
}

export default Updatenews