import Dashboard from '../../Dashboard'
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { MaterialReactTable } from 'material-react-table';
import React, { useMemo, useState, useEffect } from 'react';
import axios from '../../../axios';
import { Button } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import './indexFeedback.css'; // Import the custom CSS for mobile styles

function IndexFeedback() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get("/feedbackform");
            if (response.data && response.data.feedback) {
                setData(response.data.feedback); // Assuming `feedback` contains an array of data
                setLoading(false);
            } else {
                console.error("Unexpected API response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
                // Show only on mobile
                mobileOnly: true
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 150,
                // Hide this column on mobile
                mobileOnly: false
            },
            {
                accessorKey: 'status',
                header: 'Actions',
                size: 10,
                Cell: ({ row }) => (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to={`/single_feedback/${row.original.id}`} className="relative z-50 block rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-center text-sm text-white shadow-2xl transition duration-200 hover:bg-slate-800">
                            <VisibilityOffOutlinedIcon className='m-1'/>
                        </Link>
                    </div>
                ),
                // Show only on mobile and make this field mandatory
                mobileOnly: true,
                isRequired: true,
            },
        ],
        []
    );

    return (
        <Dashboard>
            <ToastContainer />
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
                            <Link to={'/addhome_slidder'} className='focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900'>
                                Add Slidder
                            </Link>
                        )}
                    />
                </div>
            )}
        </Dashboard>
    );
}

export default IndexFeedback;
