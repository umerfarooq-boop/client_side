import React, { useEffect, useMemo, useState } from 'react'
import axios from '../axios'
import ReactPaginate from "react-paginate";
import Nav from '../website/Nav';
import { MaterialReactTable } from 'material-react-table';
import { format } from 'date-fns'; 
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { useAppointments } from '../context/AppointmentContext';
import { ToastContainer,toast } from 'react-toastify';
import Chat from '../Chat/Chat';

function ChangeRequest({id}) {

   
    const [loading,setLoading] = useState(false);
    // const player_id = localStorage.getItem('player_id');
    const currentUser = JSON.parse(localStorage.getItem('user_id')); // where 'user' contains full user info

    
    let role = localStorage.getItem('role');
    role = 'player'
    
      const [currentPage, setCurrentPage] = useState(0);
      const [itemsPerPage] = useState(5); // Set items per page
      const [orderBy, setOrderBy] = useState("name");
      const [order, setOrder] = useState("asc");
      const [page, setPage] = useState(0);
      const [data,setData] = useState([])
      const { updateStatus,fetchAppointments } = useAppointments();   
  
  
      // const getData = async () => {
      //   try {
      //     const response = await axios.get(`/PlayerRequests/${id}`);
      //     if (response.data?.CoachSchedule) {
      //       const scheduleData = Array.isArray(response.data.CoachSchedule)
      //         ? response.data.CoachSchedule
      //         : [response.data.CoachSchedule];
      //     }
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
      // };
  
      //    useEffect(() => {
          
      //     getData();
      //   }, [id,setData]);
  
      const getData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/PlayerRequests/${id}`);
          setLoading(false);
          if (response.data?.CoachSchedule) {
            setData(response.data.CoachSchedule);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
        
          useEffect(() => {
            getData();
          }, [id]);
        
          const handleStatusChange = async (aid, newStatus) => {
              if (!aid || !newStatus) return; // Validate input
            
              try {
                const endpoint =
                  newStatus === "booked"
                    ? `/AcceptRequest/${aid}`
                    : newStatus === "reject"
                    ? `/RejectRequest/${aid}`
                    : null;
            
                if (!endpoint) throw new Error("Invalid status or endpoint");
            
                const response = await axios.get(endpoint);
            
                if (response.status === 200 || response.status === 201) {
                  toast.success(`Status updated to '${newStatus}'`);
                  getData();
                  updateStatus(aid, newStatus); // Update the calendar context
                  fetchAppointments(); // Refetch appointments to ensure the calendar is accurate
                } else {
                  toast.error("Failed to update status");
                }
              } catch (error) {
                console.error("Error updating status:", error);
                toast.error("Failed to update status");
              }
            };
    
      

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
            size: 12,
            Cell: ({ row }) => {
              const item = row.original; // Extracting status from row data
          
              return (
                <div style={{ display: 'flex', gap: '20px' }}>
                 {item.status === "processing" ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(item.id, "booked")}
                      className="bg-lime-400 text-black font-semibold py-1 px-2 rounded shadow"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, "reject")}
                      className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow"
                    >
                      Decline
                    </button>
                  </div>
                ) : item.status === "booked" ? (
                  <button className="bg-green-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                    Booked
                  </button>
                ) : item.status === "reject" ? (
                  <button className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
                    Reject
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
           ):(
            <div>
        <div className="p-6 rounded-md shadow-lg bg-white text-black">
        <div className="text-center">
                    <h3 className="text-3xl sm:text-2xl leading-normal font-extrabold italic tracking-tight text-gray-900">
                    New Boo<span className="text-indigo-600">king Requests</span>
                    </h3>
                </div>
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
                            style: {
                              overflowX: 'auto', // Enables horizontal scrolling for smaller screens
                              position: 'relative', // Keeps the table's stacking context in check
                              zIndex: 1, // Lower z-index to ensure it does not overlap the chat box
                            },
                          }}
                          enablePagination={false} // Disables pagination
                        />





                      )
                    }


                    </div>
                  ) : null
                }




          </div>
            </div>
          )
        }
    </>
  )
}
export default ChangeRequest