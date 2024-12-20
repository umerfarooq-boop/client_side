import Dashboard from '../../Dashboard'
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo, useState, useEffect } from 'react';
import axios from '../../../axios';
import { Button } from '@mui/material';
function Index_about_question() {

    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [toggle,setToggle] = useState(true);

    const fetchData = async () => {
        try {
        const response = await axios.get("/frequentlyquestion");
        if (response.data && response.data.question) {
            setData(response.data.question); // Assuming `coach` contains an array of data
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
      const response = await axios.get(`UpdateFeatureStatus/${id}`);
      console.log(response);
  
      if (response.status === 201 && response.data.question_status) {
        // Update the status in the data
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, status: response.data.question_status.status } // Ensure correct spelling of 'status'
              : item
          )
        );
        toast.success("Status Updated Successfully");
      } else {
        console.error("Failed to update status:", response.data);
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Something went wrong while updating the status.");
    }
  };
  
  

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
            accessorKey: 'title',
            header: 'Title',
            size: 150,
          },
          // {
          //   accessorKey: 'description',
          //   header: 'Description',
          //   size: 150,
          // },
          
          {
            accessorKey: 'image',
            header: 'Image',
            Cell: ({ cell }) => (
              <img
                src={`http://127.0.0.1:8000/uploads/frequently_question/${cell.getValue()}`}
                alt="Coach"
                style={{ width: '50px', height: '50px', borderRadius: '5px' }}
              />
            ),
            size: 100,
          },
          {
            accessorKey: 'status',
            header: 'Actions',
            size: 100,
            Cell: ({ row }) => (
              <div style={{ display: 'flex', gap: '10px' }}>
                {/* <Link to={`/add/${row.original.id}`} className="action-button add">
                  Add
                </Link> */}
                <Link to={`/edit_about_question/${row.original.id}`} className="relative z-50 block rounded-lg border border-yellow-900 bg-yellow-900 px-5 py-3 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-yellow-800">
                  Edit
                </Link>
                <Link to={`/single_about_question/${row.original.id}`} className="relative z-50 block rounded-lg border border-slate-800 bg-slate-900 px-5 py-3 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-slate-800">
                  Show
                </Link>
                <button
                  className="action-button status"
                  style={{
                    backgroundColor: row.original.status === "active" ? "green" : "red", // Check 'status' instead of 'stauts'
                    color: "white", // Text color
                    border: "none", // Clean look
                    padding: "10px 15px", // Padding
                    borderRadius: "5px", // Rounded corners
                    cursor: "pointer", // Pointer cursor for UX
                  }}
                  onClick={() => handleStatusChange(row.original.id)}
                >
                  {row.original.status === "active" ? "Active" : "Block"} {/* Check 'status' instead of 'stauts' */}
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
                    <Link to={'/add_about_question'} className='focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900'>Add About Question</Link>
                )}
            />
            </div>
            )
          }
        </Dashboard>
  )
}


export default Index_about_question