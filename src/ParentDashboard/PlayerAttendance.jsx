import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../axios';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from '../sidebar/Dashboard';

function PlayerAttendance() {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const parent_id = localStorage.getItem('parent_id');

    const fetchData = async () => {
        try {
            const response = await axios.get(`/ShowAttendance/${parent_id}`);
            if (
                response.data &&
                response.data.player_attendance &&
                Array.isArray(response.data.player_attendance.player_attendance)
            ) {
                setData(response.data.player_attendance.player_attendance); // <- extract the array
            } else {
                console.error("Unexpected API response format:", response.data);
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [parent_id]);

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
            accessorKey: 'date',
            header: 'Date',
            size: 150,
        },
        {
          accessorKey: 'attendance_status', // Key for accessing attendance data
          header: 'Attendance Status', // Column header
          size: 150, // Width of the column
          Cell: ({ cell }) => {
            const status = cell.getValue()?.toUpperCase(); // Fetch and normalize status
        
            if (status === 'P') {
              // Marked as Present
              return (
                <button
                  className="font-medium text-black bg-white hover:bg-green-600 border-green-400 border rounded-full w-8 h-8"
                  disabled
                >
                  P
                </button>
              );
            } else if (status === 'A') {
              // Marked as Absent
              return (
                <button
                  className="font-medium text-black bg-white hover:bg-red-600 border-red-400 border rounded-full w-8 h-8"
                  disabled
                >
                  A
                </button>
              );
            } else if (status === 'L') {
              // Marked as Late
              return (
                <button
                  className="font-medium text-black bg-white hover:bg-blue-600 border-blue-400 border rounded-full w-8 h-8"
                  disabled
                >
                  L
                </button>
              );
            } else {
              // Unmarked attendance or invalid value
              return (
                <span className="text-gray-500">N/A</span>
              );
            }
          }
        }
        
          
    ], []);

    return (
        <>
            <Dashboard>
                <ToastContainer/>
                {loading ? (
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
                ) : (
                    <MaterialReactTable
                        columns={columns}
                        data={data}
                        muiTableBodyCellProps={{
                            style: { wordWrap: 'break-word', Width: 'auto' },
                        }}
                        muiTableContainerProps={{
                            style: { overflowX: 'auto' },
                        }}
                    />
                )}
            </Dashboard>
        </>
    );
}

export default PlayerAttendance;
