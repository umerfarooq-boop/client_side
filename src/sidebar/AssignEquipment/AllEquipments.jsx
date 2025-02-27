import React from 'react'
import Dashboard from '../Dashboard'
import NewEquipmentRequest from './NewEquipmentRequest'
import EquipmentStock from './EquipmentStock'

function AllEquipments() {
  return (
    <Dashboard>
        <NewEquipmentRequest />
        <EquipmentStock />
    </Dashboard>
  )
}

export default AllEquipments