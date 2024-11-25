import React, { useMemo, useState, useEffect } from 'react';
import Dashboard from '../../Dashboard';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../../axios'; // Remove duplicate imports if necessary
import { Link } from 'react-router-dom';

function AllCoach() {
  const [data, setData] = useState([]); // State for storing API data
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/coach");
      setData(response.data.coach); // Assuming the API returns an array of coaches
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle status change
  const handleStatusChange = async (id) => {
    try {
      await axios.get(`/changeStatus/${id}`);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, status: item.status === "active" ? "inactive" : "active" }
            : item
        )
      );
      console.log("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'experience',
        header: 'Experience',
        size: 150,
      },
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
      {
        accessorKey: 'image',
        header: 'Image',
        Cell: ({ cell }) => (
          <img
            src={`http://127.0.0.1:8000/uploads/coach_image/${cell.getValue()}`}
            alt="Coach"
            style={{ width: '50px', height: '50px', borderRadius: '5px' }}
          />
        ),
        size: 100,
      },
      
      {
        accessorKey: 'coach_location',
        header: 'Location',
        size: 150,
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
            <Link to={`/edit/${row.original.id}`} className="action-button edit">
              Edit
            </Link>
            <Link to={`/showcoach/${row.original.id}`} className="action-button show">
              Show
            </Link>
            <button
            className="action-button status"
            style={{
              backgroundColor: row.original.status === "active" ? "green" : "red",
              color: "white", // Ensure text is visible
              border: "none", // Optional for a clean look
              padding: "10px 20px", // Adjust padding as needed
              borderRadius: "5px", // Optional for rounded corners
              cursor: "pointer", // Pointer cursor for better UX
            }}
              onClick={() => handleStatusChange(row.original.id)}
            >
              {row.original.status === "active" ? "Active" : "Deactive"}
            </button>

          </div>
        ),
      },
      
    
    ],
    []
  );

  return (
    <Dashboard>
        <MaterialReactTable
          columns={columns}
          data={data}
          state={{ isLoading }}
        //   enableColumnResizing
        //   enableColumnHiding
        //   muiTableBodyCellProps={{
        //     style: { wordWrap: 'break-word', maxWidth: '200px' },
        //   }}
          muiTableContainerProps={{
            style: { overflowX: 'auto' }, // Horizontal scrolling for smaller screens
          }}
        />
    </Dashboard>

  );
}

export default AllCoach;
