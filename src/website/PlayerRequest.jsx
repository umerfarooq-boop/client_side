import React, { useEffect, useMemo, useState } from 'react'
import axios from '../axios'
import ReactPaginate from "react-paginate";
import Nav from './Nav';
import { MaterialReactTable } from 'material-react-table';
import { format } from 'date-fns'; 
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';


function PlayerRequest() {

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // Set items per page
    const [orderBy, setOrderBy] = useState("name");
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const player_id = localStorage.getItem('player_id');
    let role = localStorage.getItem('role');
    role = 'player';
    const handleSort = (field) => {
        if (orderBy === field) {
          setOrder(order === "asc" ? "desc" : "asc");
        } else {
          setOrderBy(field);
          setOrder("asc");
        }
      };
    
      const sortedData = [...data].sort((a, b) => {
        if (order === "asc") {
          return a[orderBy] > b[orderBy] ? 1 : -1;
        } else {
          return a[orderBy] < b[orderBy] ? 1 : -1;
        }
      });
    
      const displayedData = sortedData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      );
    
      const pageCount = Math.ceil(data.length / itemsPerPage);
    
      const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };
    
      // Run the getData function on page load or when page/id changes
      useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`/SinglePlayerRequest/${player_id}/${role}`);
            if (response.data?.SinglePlayerRequest) {
              const scheduleData = Array.isArray(response.data.SinglePlayerRequest)
                ? response.data.SinglePlayerRequest
                : [response.data.SinglePlayerRequest];
              setData(scheduleData);
            //   setPagination(response.data.CoachSchedule);
              console.log(scheduleData);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        getData();
      }, [page,player_id,role]);

      const columns = useMemo(
        () => [
          {
            accessorKey: 'player.player_name',
            header: 'Name',
            size: 150,
          },
          {
            accessorKey: 'player.player_dob',
            header: 'Age',
            size: 150,
            Cell: ({ row }) => {
              const { player_dob } = row.original.player; // Assuming player_dob is in the player object
          
              // Calculate age from player_dob
              const calculateAge = (dob) => {
                const birthDate = new Date(dob);
                const ageDifMs = Date.now() - birthDate.getTime();
                const ageDate = new Date(ageDifMs);
                return Math.abs(ageDate.getUTCFullYear() - 1970); // Get age in years
              };
          
              const age = player_dob ? calculateAge(player_dob) : 'N/A';
          
              return (
                <span>
                  {age}
                </span>
              );
            },
          },
                    
          {
            accessorKey: 'sport_category.name',
            header: 'Sport',
            size: 150,
          },
          {
            header: 'Time',
            size: 150,
            cell: ({ row }) => {
              const { start_time, end_time } = row.original; // Access the actual row data
          
              const formatTime = (time) => {
                // Convert the 24-hour time (HH:mm:ss) into a Date object
                const [hour, minute, second] = time.split(':').map(Number);
                const date = new Date(1970, 0, 1, hour, minute, second); // Create a Date object for time
                return format(date, 'h:mm a'); // Format the Date object into 12-hour format with AM/PM
              };
          
              // If both start_time and end_time are available, format them into the range
              if (start_time && end_time) {
                return `${formatTime(start_time)} - ${formatTime(end_time)}`;
              }
          
              return ''; // Return empty string if times are missing
            },
            accessorFn: (row) => `${row.start_time} - ${row.end_time}`, // Combine times into a single string for better mapping
          }
          
          
          
          
          
          
          
          
          ,          
          {
            accessorKey: 'date_range', // This can be any unique key; it's not directly used here
            header: 'Date Range',
            size: 150,
            Cell: ({ row }) => {
              const { to_date, from_date } = row.original;
          
              // Check if the dates exist and are valid
              const formattedFromDate = from_date ? new Date(from_date).toLocaleDateString() : 'N/A';
              const formattedToDate = to_date ? new Date(to_date).toLocaleDateString() : 'N/A';
          
              return (
                <span>
                  {formattedFromDate} - {formattedToDate}
                </span>
              );
            },
          },
          
          
          {
            accessorKey: 'status',
            header: 'Status',
            size: 5,
            Cell: ({ row }) => {
              const status = row.original.status; // Extracting status from row data
          
              return (
                <div style={{ display: 'flex', gap: '7px' }}>
                  {status === 'processing' ? (
                    <button className="bg-yellow-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                      Processing
                    </button>
                  ) : status === 'booked' ? (
                    <div>
                      <button className="bg-green-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
                      Booked
                    </button>
                      &nbsp;
                      <Link className='bg-yellow-600 text-black font-semibold py-1.5 px-4 rounded shadow hover:bg-orange-500 transition duration-300' to={`/editplayer_appointment/${row.original.id}`}>Edit</Link>                
                    </div>
                  ) : status === 'reject' ? (
                    <button className="bg-red-600 text-black font-semibold py-1 px-5 rounded shadow hover:bg-red-500 transition duration-300">
                      Rejected
                    </button>
                  ) : null}
                </div>
              );
            },
          },
          
          
        
        ],
        []
      );

  return (
    <>
        <Nav />
        <div>
        <div className="p-6 rounded-md shadow-lg bg-white text-black">
      <h1 className="text-xl font-bold mb-4">Your Bookings</h1>
      <div className="overflow-x-auto">
        {
          role === 'player' ? (
            <div>
              
            </div>
          ) : null
        }
      </div>
      

                {
                  role === 'player' ? (
                    <div>
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
                              style: { wordWrap: 'break-word', maxWidth: '200px' },
                          }}
                          muiTableContainerProps={{
                              style: { overflowX: 'auto' }, // Horizontal scrolling for smaller screens
                          }}
                      />
                      )
                    }


                    </div>
                  ) : null
                }




          </div>
        </div>
    </>
  )
}

export default PlayerRequest