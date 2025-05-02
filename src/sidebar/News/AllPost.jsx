import Dashboard from '../Dashboard'
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios'
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
function AllPost() {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [toggle,setToggle] = useState(true);
    const coach_id = localStorage.getItem('coach_id');
    const fetchData = async () => {
      try {
        const response = await axios.get(`ShowSignleCoachPost/${coach_id}`);
        if (response.data && response.data.post) {
          const postData = response.data.post;
          setData(postData); // Set the posts data
        } else {
          console.error("Unexpected API response format:", response.data);
          setData([]); // Set empty array if the data format isn't as expected
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Set empty array in case of error
      } finally {
        setLoading(false); // Ensure loading is stopped regardless of outcome
      }
    };
    

  // Handle status change
  const handleStatusChange = async (id) => {
    try {
      const response = await axios.get(`/changePostStatus/${id}`);
      console.log(response);
      if (response.status === 201 && response.data.status) {
        setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, post_status: response.data.post.post_status } : item
        )
        );
        console.log("Status updated successfully!");
        toast.success("Status Updated Successfully");
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
    //   {
    //     accessorKey: 'id',
    //     header: 'Id',
    //     size: 150,
    //   },
      {
        accessorKey: 'post_name',
        header: 'Post Name',
        size: 150,
      },
      {
        accessorKey: 'post_description',
        header: 'Post Description',
        size: 150,
        Cell: ({ cell }) => {
          const description = cell.getValue() || '';
          const truncated = description.split(' ').slice(0, 10).join(' ') + (description.split(' ').length > 10 ? '...' : '');
          return truncated;
        },
      },
      
      // {
      //   accessorKey: 'post_status',
      //   header: 'Post Status',
      //   size: 100,
      // },
      {
        accessorKey: 'coach.name',
        header: 'Coach Name',
        size: 100,
      },
      {
        accessorKey: 'post_image',
        header: 'Image',
        Cell: ({ cell }) => (
          <img
            src={`http://127.0.0.1:8000/uploads/coach_posts/${cell.getValue()}`}
            alt="Coach"
            style={{ width: '50px', height: '50px', borderRadius: '5px' }}
          />
        ),
        size: 100,
      },
      {
        accessorKey: 'post_status',
        header: 'Actions',
        size: 250,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* <Link to={`/add/${row.original.id}`} className="action-button add">
              Add
            </Link> */}
            <Link to={`/updatepost/${row.original.id}`} className="relative z-50 block rounded-lg border border-yellow-900 bg-yellow-900 px-3 py-1 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-yellow-800">
            <EditNoteIcon className='m-1' />
            </Link>
            <Link to={`/singlepost/${row.original.id}`} className="relative z-50 block rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-slate-800">
            <VisibilityOffOutlinedIcon className='m-1'/>
            </Link>
            <button
            className="action-button status"
            style={{
              backgroundColor: row.original.post_status === "active" ? "green" : "red",
              color: "white", // Ensure text is visible
              border: "none", // Optional for a clean look
              padding: "1px 16px", // Adjust padding as needed
                  borderRadius: "5px", // Optional for rounded corners
                  cursor: "pointer",
                  margin:"1px" // Pointer cursor for better UX
            }}
              onClick={() => handleStatusChange(row.original.id)}
            >
              {row.original.post_status === "active" ? <CheckCircleSharpIcon/> : <CancelSharpIcon/>}
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
  ) : data.length > 0 ? (
    <>
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
          <Link
            to="/AddPost"
            className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 italic"
          >
            Add Post
          </Link>
        )}
      />
    </>
  ) : (
    <div>No Record Found
      <Link to={'/AddPost'}>Add Post</Link>
    </div>
  )
}


    </Dashboard>
  )
}

export default AllPost