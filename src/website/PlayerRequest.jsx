import React, { useEffect, useMemo, useState } from 'react';
import axios from '../axios';
import ReactPaginate from "react-paginate";
import Nav from './Nav';
import { MaterialReactTable } from 'material-react-table';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlayerRequest() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  // alert(id);
  const player_id = localStorage.getItem('player_id');
  let role = localStorage.getItem('role');
  role = 'player'; // Overriding it here

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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
<<<<<<< HEAD
  const [PaymentStatus,setPaymentStatus] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(`/SinglePlayerRequest/${player_id}/${role}`);
      if (response.data?.SinglePlayerRequest) {
        const scheduleData = Array.isArray(response.data.SinglePlayerRequest)
          ? response.data.SinglePlayerRequest
          : [response.data.SinglePlayerRequest];
  
        // Make sure each item in scheduleData has its own payment_status
        setData(scheduleData); // Each item should contain: status, payment_status, etc.
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    
=======

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/SinglePlayerRequest/${player_id}/${role}`);
        if (response.data?.SinglePlayerRequest) {
          const scheduleData = Array.isArray(response.data.SinglePlayerRequest)
            ? response.data.SinglePlayerRequest
            : [response.data.SinglePlayerRequest];
          setData(scheduleData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    getData();
  }, [player_id, role]);

  const isPaid = localStorage.getItem('isPaid')

  

  const columns = useMemo(() => [
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
        const { player_dob } = row.original.player || {};
        const calculateAge = (dob) => {
          const birthDate = new Date(dob);
          const ageDifMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDifMs);
          return Math.abs(ageDate.getUTCFullYear() - 1970);
        };
        const age = player_dob ? calculateAge(player_dob) : 'N/A';
        return <span>{age}</span>;
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
      accessorFn: (row) => `${row.start_time} - ${row.end_time}`,
      Cell: ({ row }) => {
        const { start_time, end_time } = row.original;
        const formatTime = (time) => {
          const [hour, minute, second] = time.split(':').map(Number);
          const date = new Date(1970, 0, 1, hour, minute, second);
          return format(date, 'h:mm a');
        };
        return start_time && end_time
          ? `${formatTime(start_time)} - ${formatTime(end_time)}`
          : '';
      },
    },
    {
      accessorKey: 'date_range',
      header: 'Date Range',
      size: 150,
      Cell: ({ row }) => {
        const { from_date, to_date } = row.original;
        const formattedFrom = from_date ? new Date(from_date).toLocaleDateString() : 'N/A';
        const formattedTo = to_date ? new Date(to_date).toLocaleDateString() : 'N/A';
        return <span>{formattedFrom} - {formattedTo}</span>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 5,
      Cell: ({ row }) => {
        const status = row.original.status;
<<<<<<< HEAD
        const paymentStatus = row.original.payment_status; // Get it per row
        const playerId = row.original.id; // Assuming this is the player ID
    
        return (
          <div style={{ display: 'flex', gap: '10px', marginRight: '60px' }}>
            {/* Processing + Unpaid */}
            {status === 'processing' && paymentStatus === 'unpaid' && (
              <div className="flex flex-wrap gap-2 items-center">
                <button className="bg-yellow-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                  Processing
                </button>
                <Link
                  to={`/checkoutform/${playerId}`}
                  className="bg-yellow-600 text-black font-semibold py-1.5 px-4 rounded shadow hover:bg-orange-500 transition duration-300"
                >
                  Checkout
                </Link>
              </div>
            )}
    
            {/* Processing + Paid */}
            {status === 'processing' && paymentStatus === 'paid' && (
              <div className="flex flex-wrap gap-2 items-center">
                <button className="bg-yellow-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                  Processing
                </button>
              </div>
            )}
    
            {/* Booked + Unpaid */}
            {status === 'booked' && paymentStatus === 'unpaid' && (
              <div className="flex flex-wrap gap-2 items-center">
                <button className="bg-blue-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-blue-500 transition duration-300">
                  Booked (Unpaid)
                </button>
                <Link
                  to={`/checkoutform/${playerId}`}
                  className="bg-yellow-600 text-black font-semibold py-1.5 px-4 rounded shadow hover:bg-orange-500 transition duration-300"
                >
                  Checkout
                </Link>
              </div>
            )}
    
            {/* Booked + Paid */}
            {status === 'booked' && paymentStatus === 'paid' && (
              <div className="flex flex-wrap gap-2 items-center">
                <button className="bg-green-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-green-500 transition duration-300">
                  Booked (Paid)
                </button>
                <Link
                  to={`/editplayer_appointment/${row?.original?.id}`}
                  className="bg-yellow-600 text-black font-semibold py-1.5 px-4 rounded shadow hover:bg-orange-500 transition duration-300"
                >
                  Edit Appointment
                </Link>
              </div>
            )}
    
            {/* Rejected + Paid */}
            {status === 'reject' && paymentStatus === 'paid' && (
              <button className="bg-red-600 text-black font-semibold py-1 px-5 rounded shadow hover:bg-red-500 transition duration-300">
                Rejected
              </button>
            )}
          </div>
        );
      },
    }
    
=======
        return (
          <div style={{ display: 'flex', gap: '10px', marginRight: '60px' }}>
          {/* Processing Status */}
          {status === 'processing' && isPaid === 'false' && (
            <div className="flex flex-wrap gap-2 items-center">
              <button
                className="bg-yellow-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300"
              >
                Processing
              </button>
              <Link
                to={`/checkoutform/${row?.original?.player_id}`}
                className="bg-yellow-600 text-black font-semibold py-1.5 px-4 rounded shadow hover:bg-orange-500 transition duration-300"
              >
                First
              </Link>
            </div>
          )}
          {status === 'processing' && isPaid === 'true' && (
            <div className="flex flex-wrap gap-2 items-center">
              <button
                className="bg-yellow-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300"
              >
                Processing
              </button>
              
            </div>
          )}
        
          {/* Booked and Not Paid */}
          {status === 'booked' && isPaid === 'false' && (
            <div className="flex flex-wrap gap-2 items-center">
              <button
                className="bg-blue-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-blue-500 transition duration-300"
              >
                Booked (Unpaid)
              </button>
              <Link
                to={`/checkoutform/${row?.original?.player_id}`}
                className="bg-yellow-600 text-black font-semibold py-1.5 px-4 rounded shadow hover:bg-orange-500 transition duration-300"
              >
                First
              </Link>
            </div>
          )}
        
          {/* Booked and Paid */}
          {status === 'booked' && isPaid === 'true' && (
            <div className="flex flex-wrap gap-2 items-center">
              <button
                className="bg-green-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-green-500 transition duration-300"
              >
                Booked (Paid)
              </button>
              <Link
                to={`/editplayer_appointment/${row?.original?.id}`}
                className="bg-yellow-600 text-black font-semibold py-1.5 px-4 rounded shadow hover:bg-orange-500 transition duration-300"
              >
                Edit Appointment
              </Link>
            </div>
          )}
        
          {/* Rejected Status */}
          {status === 'reject' && isPaid === 'true' && (
            <button
              className="bg-red-600 text-black font-semibold py-1 px-5 rounded shadow hover:bg-red-500 transition duration-300"
            >
              Rejected
            </button>
          )}
        </div>
        


        );
      },
    },
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  ], []);

  return (
    <>
      <Nav />
      <div className="text-center mt-5">
        {role === 'player' && (
          <div>
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Your{" "}
                <span className="text-indigo-600">Booking</span>
              </h3>
          </div>
  
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
              <div className='p-2 bg-white shadow-lg m-6'>
                <MaterialReactTable
                  columns={columns}
                  data={displayedData}
                  muiTableBodyCellProps={{
                    style: {
                      wordWrap: "break-word",
                      maxWidth: "200px",
                      padding: "8px 16px", // Adjusts cell padding for better spacing
                      fontSize: "14px", // Adjusts font size for readability
                      color: "#333", // Sets text color
                    },
                  }}
                  muiTableContainerProps={{
                    style: {
                      overflowX: "auto", // Enables horizontal scrolling
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow
                      borderRadius: "8px", // Rounds the corners of the table container
                      border: "1px solid #ddd", // Adds a light border for structure
                    },
                  }}
                  muiTableHeadCellProps={{
                    style: {
                      backgroundColor: "#f5f5f5", // Light gray background for header
                      fontWeight: "bold", // Bold text for column headers
                      textAlign: "center", // Centers text
                      padding: "10px 16px", // Adjust header padding
                      color: "#000", // Sets header text color
                    },
                  }}
                  muiTableBodyRowProps={{
                    hover: true, // Enables hover effect
                    style: {
                      transition: "background-color 0.3s", // Smooth background transition
                      "&:hover": {
                        backgroundColor: "#f0f0f0", // Light gray on hover
                      },
                    },
                  }}
                />
              </div>
            )}
  
          </div>
        )}
      </div>
    </>
  );
  
}

export default PlayerRequest;
