import Dashboard from '../Dashboard';
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { RotatingLines } from 'react-loader-spinner';
=======
import loadingAnimation from '../../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
import { ToastContainer, toast } from 'react-toastify';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

function AllPost() {
  const [data, setData] = useState([]);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
=======
  const [loader, setLoader] = useState(true);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const coach_id = localStorage.getItem('coach_id');

  const fetchData = async () => {
    try {
      const response = await axios.get(`ShowSignleCoachPost/${coach_id}`);
      if (response.data && response.data.post) {
        setData(response.data.post);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        // setLoader(false)
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
<<<<<<< HEAD
      setLoader(false);
=======
<<<<<<< HEAD
      setLoading(false);
=======
      setLoader(false)
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
    }
  };

  const handleStatusChange = async (id) => {
    try {
      const response = await axios.get(`/changePostStatus/${id}`);
      if (response.status === 201 && response.data.status) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, post_status: response.data.post.post_status } : item
          )
        );
        toast.success("Status Updated Successfully");
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(() => [
    {
      accessorKey: 'post_name',
      header: 'Post Name',
      size: 150,
      Cell: ({ cell, row }) =>
        row.original.placeholder ? (
          <span className="text-gray-500 italic">No posts found</span>
        ) : (
          cell.getValue()
        ),
    },
    {
      accessorKey: 'post_description',
      header: 'Post Description',
      size: 150,
      Cell: ({ cell, row }) => {
        if (row.original.placeholder) return '';
        const description = cell.getValue() || '';
        const truncated = description.split(' ').slice(0, 10).join(' ') + (description.split(' ').length > 10 ? '...' : '');
        return truncated;
      },
    },
    {
      accessorKey: 'coach.name',
      header: 'Coach Name',
      size: 100,
      Cell: ({ cell, row }) => (row.original.placeholder ? '' : cell.getValue()),
    },
    {
      accessorKey: 'post_image',
      header: 'Image',
      size: 100,
      Cell: ({ cell, row }) =>
        row.original.placeholder ? (
          ''
        ) : (
          <img
            src={`http://127.0.0.1:8000/uploads/coach_posts/${cell.getValue()}`}
            alt="Coach"
            style={{ width: '50px', height: '50px', borderRadius: '5px' }}
          />
        ),
    },
    {
      accessorKey: 'post_status',
      header: 'Actions',
      size: 250,
      Cell: ({ row }) =>
        row.original.placeholder ? (
          ''
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              to={`/updatepost/${row.original.id}`}
              className="relative z-50 block rounded-lg border border-yellow-900 bg-yellow-900 px-3 py-1 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-yellow-800"
            >
              <EditNoteIcon className="m-1" />
            </Link>
            <Link
              to={`/singlepost/${row.original.id}`}
              className="relative z-50 block rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-slate-800"
            >
              <VisibilityOffOutlinedIcon className="m-1" />
            </Link>
            <button
              className="action-button status"
              style={{
                backgroundColor: row.original.post_status === "active" ? "green" : "red",
                color: "white",
                border: "none",
                padding: "1px 16px",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "1px",
              }}
              onClick={() => handleStatusChange(row.original.id)}
            >
              {row.original.post_status === "active" ? <CheckCircleSharpIcon /> : <CancelSharpIcon />}
            </button>
          </div>
        ),
    },
  ], [data]);

  return (
    <Dashboard>
      <ToastContainer />
<<<<<<< HEAD
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
=======
      {loader ? (
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <Lottie animationData={loadingAnimation} loop={true} />
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              All <span className="text-indigo-600">Posts</span>
            </h3>
          </div>
<<<<<<< HEAD
          <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto max-h-[600px]">
            <MaterialReactTable
              columns={columns}
              data={data.length > 0 ? data : []}
              muiTableBodyProps={{
                children: data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{
                        textAlign: 'center',
                        padding: '20px',
                        fontStyle: 'italic',
                        color: 'gray',
                      }}
                    >
                      No posts found
                    </td>
                  </tr>
                ) : undefined,
              }}
              muiTableBodyCellProps={{
                style: {
                  textAlign: 'center',
                },
              }}
              muiTableContainerProps={{
                style: { overflowX: 'auto' },
              }}
              renderTopToolbarCustomActions={() => (
                <Link
                  to="/AddPost"
                  className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
                >
                  Add Post
                </Link>
              )}
            />
          </div>
=======
          <MaterialReactTable
            columns={columns}
            data={data.length > 0 ? data : []}
            muiTableBodyProps={{
              children: data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      textAlign: 'center',
                      padding: '20px',
                      fontStyle: 'italic',
                      color: 'gray',
                    }}
                  >
                    No posts found
                  </td>
                </tr>
              ) : undefined,
            }}
            muiTableBodyCellProps={{
              style: {
                textAlign: 'center',
              },
            }}
            muiTableContainerProps={{
              style: { overflowX: 'auto' },
            }}
            renderTopToolbarCustomActions={() => (
              <Link
                to="/AddPost"
<<<<<<< HEAD
                className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 italic"
=======
                className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 "
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
              >
                Add Post
              </Link>
            )}
          />
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
        </>
      )}
    </Dashboard>
  );
}

export default AllPost;
