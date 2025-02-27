import React from 'react'
import { useParams } from 'react-router-dom'
import PlayerRequest from '../../website/PlayerRequest';
import ChangeRequest from '../ChangeRequest';
import { AppointmentProvider } from '../../context/AppointmentContext';
import Show_EditAppointment from './Show_EditAppointment';
import Dashboard from '../Dashboard';

function AllAppointment() {
    const {id} = useParams();
    return (
    <>
        <Dashboard>
            <div>
                <div>
                    <AppointmentProvider>
                    <ChangeRequest id={id}/>
                    </AppointmentProvider>
                </div>
                <div>
                    <Show_EditAppointment />
                </div>
                <div></div>
            </div>
        </Dashboard>
    </>
  )
}

export default AllAppointment