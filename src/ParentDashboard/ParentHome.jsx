
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../axios'
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Nav from '../website/Nav';
import Dashboard from '../sidebar/Dashboard';

function ParentHome() {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const parent_id = localStorage.getItem('parent_id');

    const fetchData = async () => {
        try {
            const response = await axios.get(`/player_parent/${parent_id}`);
            if (response.data && response.data.parent_player_record) {
                // Extract player attendance array
                const attendanceData = response.data.parent_player_record.player_attendace || [];
                setData(attendanceData);
            } else {
                console.error("Unexpected API response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [parent_id]);



    

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Define table columns
  const columns = useMemo(() => [
    {
        accessorKey: 'start_time',
        header: 'Start Time',
        size: 150,
    },
    {
        accessorKey: 'end_time',
        header: 'End Time',
        size: 150,
    },
    {
        accessorKey: 'attendance_status',
        header: 'Attendance Status',
        size: 150,
        Cell: ({ cell }) => cell.getValue() || "Not Available" // Handle null values
    }
], []);
  return (
    <>
        <Dashboard>
        <ToastContainer/>
        {
            loading ? (
              <div className="flex flex-col items-center justify-center h-screen">
            <RotatingLines 
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
            ) :
            (
            <MaterialReactTable
                columns={columns}
                data={data}
                muiTableBodyCellProps={{
                    style: { wordWrap: 'break-word', Width:'auto'},
                }}
                muiTableContainerProps={{
                    style: { overflowX: 'auto' }, // Horizontal scrolling for smaller screens
                }}
                
            />
            )
          }
        </Dashboard>
    </>
  )
}

export default ParentHome