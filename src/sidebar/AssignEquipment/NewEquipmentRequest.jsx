import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import loadingAnimation from '../../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import { useForm } from 'react-hook-form';

function NewEquipmentRequest() {
  const [data, setData] = useState([]); 
  const [loader, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const player_id = localStorage.getItem('player_id');
  const coach_record = localStorage.getItem('coach_id');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/request_equipment/${coach_record}`);
      if (response.data && Array.isArray(response.data.requestequipment)) {
        setData(response.data.requestequipment);
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

  useEffect(() => {
    fetchData();
  }, [coach_record]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'player_name',
        header: 'Player Name',
        size: 150,
      },
      {
        accessorKey: 'equipment_quantity',
        header: 'Quantity',
        size: 150,
      },
      {
        accessorKey: 'equipment_name',
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
              <Link
                className="action-button accept"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  padding: "5px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                to={`/accept_equipment_request/${row.original.id}`}
              >
                Accept
              </Link>
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
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "green", fontWeight: "bold" }}>Accepted</span>
                <Link to={`/return_equipment/${row.original.id}`} className='pl-5 text-red-600 font-semibold'>Return</Link>
              </div>
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
    <div className="p-6">
      {/* Loader Display */}
      {loader ? (
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : data.length > 0 ? (
        <div>
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
              New <span className="text-indigo-600">Equipment Request</span>
            </h3>
          </div>

          {/* Table Display */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <MaterialReactTable
              columns={columns}
              data={data}
              muiTableBodyCellProps={{
                style: { wordWrap: 'break-word', maxWidth: '200px' },
              }}
              muiTableContainerProps={{
                style: { width: '100%', overflowX: 'auto' }, // Ensure the container is full width and scrollable
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NewEquipmentRequest;
