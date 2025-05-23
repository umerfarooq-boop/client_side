import Dashboard from '../../Dashboard'
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo, useState, useEffect } from 'react';
import axios from '../../../axios';
import { Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
function Index_player() {

    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [toggle,setToggle] = useState(true);

    const fetchData = async () => {
        try {
        const response = await axios.get("/player");
        if (response.data && response.data.player) {
            setData(response.data.player); // Assuming `coach` contains an array of data
            setLoading(false)
        } else {
            console.error("Unexpected API response format:", response.data);
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    

  // Handle status change
  
  

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

    const columns = useMemo(
        () => [
        //   {
        //     accessorKey: 'id',
        //     header: 'Id',
        //     size: 150,
        //   },
          {
            accessorKey: 'player_name',
            header: 'Name',
            size: 150,
          },
          {
            accessorKey: 'sport_category.name',
            header: 'Sport',
            size: 150,
          },
          {
            accessorKey: 'image',
            header: 'Image',
            Cell: ({ cell }) => (
              <img
                src={`http://127.0.0.1:8000/uploads/player_image/${cell.getValue()}`}
                alt="Coach"
                style={{ width: '50px', height: '50px', borderRadius: '5px' }}
              />
            ),
            size: 100,
          },
          
          {
            accessorKey: 'status',
            header: 'Actions',
            size: 200,
            Cell: ({ row }) => (
              <div style={{ display: 'flex', gap: '10px' }}>
                {/* <Link to={`/add/${row.original.id}`} className="action-button add">
                  Add
                </Link> */}
                <Link to={`/edit_player/${row.original.id}`} className="relative z-50 block rounded-lg border border-yellow-900 bg-yellow-900 px-3 py-1 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-yellow-800">
                <EditNoteIcon className='m-1' />
                </Link>
                <Link to={`/show_player/${row.original.id}`} className="relative z-50 block rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-slate-800">
                <VisibilityOffOutlinedIcon className='m-1'/>
                </Link>
                <button
                className="action-button status"
                style={{
                  backgroundColor: row.original.status === "active" ? "green" : "red",
                  color: "white", // Ensure text is visible
                  border: "none", // Optional for a clean look
                  padding: "1px 16px", // Adjust padding as needed
                  borderRadius: "5px", // Optional for rounded corners
                  cursor: "pointer",
                  margin:"1px" // Pointer cursor for better UX
                }}
                  onClick={() => handleStatusChange(row.original.id)}
                >
                  {row.original.status === "active" ? <CheckCircleSharpIcon/> : <CancelSharpIcon/>}
                </button>
    
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
            <div>
              
              <MaterialReactTable
                columns={columns}
                data={data}
                muiTableBodyCellProps={{
                    style: { wordWrap: 'break-word', maxWidth: '50px' },
                }}
                muiTableContainerProps={{
                    style: { overflowX: 'auto' }, // Horizontal scrolling for smaller screens
                }}
                renderTopToolbarCustomActions={() => (
                    <Link to={'/addhome_slidder'} className='focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900'>Add Slidder</Link>
                )}
            />
            </div>
            )
          }
        </Dashboard>
  )
}

export default Index_player