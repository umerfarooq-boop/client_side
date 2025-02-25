
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../axios'
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Dashboard from '../sidebar/Dashboard';

function PlayerBookedEquipment() {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [toggle,setToggle] = useState(true);
    const player_id = localStorage.getItem('player_id');
    const coach_record = localStorage.getItem('coach_id');

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`/request_equipment/${coach_record}`);
                if (response.data && Array.isArray(response.data.requestequipment)) {
                    setData(response.data.requestequipment); // Directly set the array
                } else if (response.data && response.data.requestequipment) {
                    setData([response.data.requestequipment]); // Wrap single item in an array
                } else {
                    console.warn("No equipment data available.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    },[coach_record])

  // Handle status change
  const handleStatusChange = async (id) => {
    try {
      const response = await axios.get(`/AcceptEquipmentRequest/${id}`);
      console.log(response);
  
      if (response.status === 200 && response.data.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, equipment_status: response.data.acceptRequest.equipment_status } : item
          )
        );
        toast.success(response.data.message || "Status Updated Successfully");
      } else {
        toast.error(response.data.message || "Failed to update status.");
        console.error("Failed to update status:", response.data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      
      // Handle error responses with meaningful messages
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred while updating status.");
      } else {
        toast.error("Network error, please try again.");
      }
    }
  };

  // const handleDeleteChange = async (id) => {
  //   const response = await axios.get(`/DeleteEquipmentRequest/${id}`);
  //   if(response.data && response.data.message ===  201){
  //     toast.success(response.data.message);
  //   }
  // }
  



  // Define table columns
  const columns = useMemo(
    () => [
    //   {
    //     accessorKey: 'id',
    //     header: 'Id',
    //     size: 150,
    //   },
      {
        accessorKey: 'player.player_name',
        header: 'Player Name',
        size: 150,
      },
      {
        accessorKey: 'equipment_quantity',
        header: 'Quantity',
        size: 150,
        
      },
      
      // {
      //   accessorKey: 'post_status',
      //   header: 'Post Status',
      //   size: 100,
      // },
      {
        accessorKey: 'equipment.equipment_name',
        header: 'Equipment',
        size: 100,
      },
      {
        accessorKey: 'return_date_time',
        header: 'Return Date',
        size: 100,
        cell: ({ row }) => {
          const dateTime = new Date(row.original.return_date_time);
          const options = {
            timeZone: 'Asia/Karachi',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          };
      
          const time = new Intl.DateTimeFormat('en-US', options).format(dateTime);
          const date = `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`;
      
          return `${time}. ' -- ' .${date}`;
        },
      },
      
      {
        accessorKey: 'equipment_status',
        header: 'Status',
        size: 250,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* Accept Button (Hidden if already accepted) */}
            {row.original.equipment_status !== "active" && (
              <button
                className="action-button accept"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  padding: "5px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleStatusChange(row.original.id, "accept")}
              >
                Accept
              </button>
            )}
      
            {/* Reject Button (Hidden if already accepted) */}
            {row.original.equipment_status !== "active" && (
              <button
                className="action-button reject"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteChange(row.original.id, "reject")}
              >
                Reject
              </button>
            )}
      
            {/* Status Display */}
            {row.original.equipment_status === "active" && (
              <span style={{ color: "green", fontWeight: "bold" }}>Accepted</span>
            )}
            {row.original.equipment_status === "rejected" && (
              <span style={{ color: "red", fontWeight: "bold" }}>Rejected</span>
            )}
          </div>
        ),
      },
      
      
    
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
                    style: { wordWrap: 'break-word', maxWidth: '200px' },
                }}
                muiTableContainerProps={{
                    style: { overflowX: 'auto' }, // Horizontal scrolling for smaller screens
                }}
                renderTopToolbarCustomActions={() => (
                  <Link to={'/AddEquipment'} className='focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 italic'>Add Equipment</Link>
              )}
            />
            )
          }
    </Dashboard>
  )
}

export default PlayerBookedEquipment