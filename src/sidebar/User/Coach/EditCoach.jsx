import React from 'react'
import { useParams } from 'react-router-dom'

function EditCoach() {
    const {id} = useParams();
    return (
    <div>EditCoach {id}</div>
  )
}

export default EditCoach