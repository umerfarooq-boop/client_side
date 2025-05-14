
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../axios'
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Nav from '../website/Nav';
import Dashboard from '../sidebar/Dashboard';

function ParentHome() {

  return (
    <>
        <Dashboard>
        <ToastContainer/>
       
            <>
              <h1>Umer</h1>
            </>

        </Dashboard>
    </>
  )
}

export default ParentHome