import React, { useMemo, useState, useEffect } from 'react';
import Dashboard from '../../Dashboard';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../../axios'; // Remove duplicate imports if necessary
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

function AllCoach() {
  const [data, setData] = useState([]); // State for storing API data
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/coach");
      if (response.data && response.data.coach) {
        setData(response.data.coach); // Assuming `coach` contains an array of data
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
      const response = await axios.get(`/changeStatus/${id}`);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, status: item.status === "active" ? "inactive" : "active" }
              : item
          )
        );
        console.log("Status updated successfully!");
      } else {
        console.error("Failed to update status:", response.data);
      }
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
      // {
      //   accessorKey: 'id',
      //   header: 'Id',
      //   size: 150,
      // },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      // {
      //   accessorKey: 'experience',
      //   header: 'Experience',
      //   size: 150,
      // },
      {
        accessorKey: 'level',
        header: 'Level',
        size: 100,
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
        size: 150,
      },
      {
        accessorKey: 'certificate',
        header: 'Certificate',
        Cell: ({ cell }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <a 
            href={`http://127.0.0.1:8000/uploads/coach_certificate/${cell.getValue()}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#007bff',
            }}
          >
            <img
              src="https://img.icons8.com/fluency/48/pdf.png" // Attractive PDF icon
              alt="PDF Icon"
              style={{ width: '30px', height: '30px', marginRight: '10px' }}
            />
            <span>View Certificate</span>
          </a>
        </div>
        
          ),
          size: 100,
      },
      // {
      //   accessorKey: 'image',
      //   header: 'Image',
      //   Cell: ({ cell }) => (
      //     <img
      //       src={`http://127.0.0.1:8000/uploads/coach_image/${cell.getValue()}`}
      //       alt="Coach"
      //       style={{ width: '50px', height: '50px', borderRadius: '5px' }}
      //     />
      //   ),
      //   size: 100,
      // },
      
      // {
      //   accessorKey: 'coach_location',
      //   header: 'Location',
      //   size: 150,
      // },
      {
        accessorKey: 'status',
        header: 'Actions',
        size: 5,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '7px' }}>
            {/* <Link to={`/add/${row.original.id}`} className="action-button add">
              Add
            </Link> */}
            <Link to={`/editcoach/${row.original.id}`} className="relative z-50 block rounded-lg border border-yellow-900 bg-yellow-900 px-3 py-1 text-center text-xs text-white shadow-2xl transition duration-200 hover:bg-yellow-800">
              <EditNoteIcon  className='m-1'/>
            </Link>

            <Link to={`/showcoach/${row.original.id}`} className="relative z-50 block rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-slate-800">
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
                <br />
              <MaterialReactTable
          columns={columns}
          data={data}
          // state={{ isLoading }}
          // enableColumnResizing
          // enableColumnHiding
          muiTableBodyCellProps={{
            style: { wordWrap: 'break-word', maxWidth: '200px' },
          }}
          muiTableContainerProps={{
            style: { overflowX: 'auto' }, // Horizontal scrolling for smaller screens
          }}
        />
              </div>
            )
          }
    </Dashboard>

  );
}

export default AllCoach;
