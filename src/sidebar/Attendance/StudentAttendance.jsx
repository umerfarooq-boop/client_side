import Dashboard from '../Dashboard'
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios'
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
function StudentAttendance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get(`/studentAttendance/${id}`);
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
        accessorKey: 'date',
        header: 'Date',
        size: 150,
      },

      {
        accessorKey: 'player.player_name',
        header: 'Player Name',
        size: 150,
      },


      {
        accessorKey: 'attendance_status', // This should match the key in your data
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => {
          const attendanceStatus = row.original.attendance_status; // Ensure the correct key is accessed

          return (
            <div style={{ display: 'flex', gap: '10px' }}>
              {attendanceStatus === 'P' ? (
                <button
                  className="font-medium text-white bg-green-400 border-green-400 border rounded-full w-8 h-8"
                // onClick={() => markAttendance('P')}
                // disabled={sessionNotStarted || fifteenMinutesPassed}
                >
                  P
                </button>
              ) : attendanceStatus === 'A' ? (
                <button
                  className="font-medium text-black bg-white hover:bg-red-600 border-red-400 border rounded-full w-8 h-8"
                // onClick={() => markAttendance('A')}
                // disabled={sessionNotStarted || fifteenMinutesPassed}
                >
                  A
                </button>
              ) : attendanceStatus === 'L' ? (
                <button
                  className="font-medium text-black bg-white hover:bg-blue-600 border-blue-400 border rounded-full w-8 h-8"
                // onClick={() => markAttendance('L')}
                // disabled={sessionNotStarted || fifteenMinutesPassed}
                >
                  L
                </button>
              ) : 'N/A'}
            </div>
          );
        },
      },

    ],
    []
  );
  return (
    <Dashboard>

      <ToastContainer />
      <br></br>
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
                style: { wordWrap: 'break-word', Width: 'auto' },
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

export default StudentAttendance