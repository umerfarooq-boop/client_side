import Dashboard from '../Dashboard'
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios'
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
function ShowAttendance() {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [toggle,setToggle] = useState(true);
    const {id} = useParams();
    const fetchData = async () => {
        try {
        const response = await axios.get(`/attendance/${id}`);
        if (response.data && response.data.attendance) {
            setData(response.data.attendance); // Assuming `coach` contains an array of data
            setLoading(false)
        } else {
            console.error("Unexpected API response format:", response.data);
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    

  // Handle status change
  const handleStatusChange = async (id) => {
    try {
      const response = await axios.get(`/attendance/${id}`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
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
        accessorKey: 'player.player_name',
        header: 'Player Name',
        size: 150,
      },
      {
        accessorKey: 'attendance_status',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => {
          const [attendanceStatus, setAttendanceStatus] = React.useState(row.original.attendance_status);
      
          const markAttendance = async (status) => {
            try {
              const response = await axios.post(
                `/markAttendance/${row.original.id}`, // Pass attendance ID
                { attendance_status: status }, // Send the status (P, A, L)
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } } // Include JWT token if required
              );
      
              setAttendanceStatus(status); // Update local state to reflect new attendance status
              alert(response.data.message); // Show success message
            } catch (error) {
              console.error(error.response?.data?.message || "Error occurred");
              alert('Failed to update attendance.');
            }
          };
      
          return (
            <div style={{ display: 'flex', gap: '20px' }}>
              {/* Mark Present Button */}
              {attendanceStatus === 'P' ? (
                <button
                  className="font-medium text-white bg-green-400 border-green-400 border rounded-full w-8 h-8 transition-all delay-300"
                  disabled // Disable the button
                >
                  P
                </button>
              ) : (
                <>
                  {/* Other Buttons */}
                  <button
                    className="font-medium text-black bg-white hover:bg-green-600 border-green-400 border rounded-full w-8 h-8 transition-all delay-300"
                    onClick={() => markAttendance('P')} // Mark Present
                  >
                    P
                  </button>
                  <button
                    className="font-medium text-black bg-white hover:bg-red-600 border-red-400 border rounded-full w-8 h-8 transition-all delay-300"
                    onClick={() => markAttendance('A')} // Mark Absent
                  >
                    A
                  </button>
                  <button
                    className="font-medium text-black bg-white hover:bg-blue-600 border-blue-400 border rounded-full w-8 h-8 transition-all delay-300"
                    onClick={() => markAttendance('L')} // Mark Late
                  >
                    L
                  </button>
                </>
              )}
            </div>
          );
        },
      }
      
      
      
    
    ],
    []
  );
  return (
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
  )
}


export default ShowAttendance