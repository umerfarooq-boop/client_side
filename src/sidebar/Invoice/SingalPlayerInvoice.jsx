import React, { useMemo, useState, useEffect } from 'react';
import Dashboard from '../Dashboard';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios'; // Remove duplicate imports if necessary
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Nav from '../../website/Nav';

function SingalPlayerInvoice() {
  const [data, setData] = useState([]); // State for storing API data
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/signal_invoice_record");
      if (response.data && response.data.invoice) {
        setData(response.data.invoice); // Assuming `coach` contains an array of data
        setLoading(false)
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

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 150,
        Cell: ({ row }) => row.index + 1,
      },      
      {
        accessorKey: 'player.name',
        header: 'Player Name',
        size: 150,
      },
      {
        accessorKey: 'coach.name',
        header: 'Coach Name',
        size: 100,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 150,
      },
      {
        accessorKey: 'file_path',
        header: 'Invoice',
        Cell: ({ cell }) => {
          const filePath = cell.getValue(); // e.g. uploads/PDF/PDF_Invoice/invoice_azhar.pdf
          const fullUrl = `http://127.0.0.1:8000/${filePath}`; // match backend path
      
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a 
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                download // Optional: add this to force download
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: '#007bff',
                }}
              >
                <img
                  src="https://img.icons8.com/fluency/48/pdf.png"
                  alt="PDF Icon"
                  style={{ width: '30px', height: '30px', marginRight: '10px' }}
                />
                <span>View Invoice</span>
              </a>
            </div>
          );
        },
        size: 100,
      }
      
      
      

    
    ],
    []
  );

  return (
    <>
      <Nav />
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
        ) : data.length === 0 ? (
          <div className="text-center mt-10 text-gray-600 text-lg">
            No record found.
          </div>
        ) : (
          <div>
            <br />
            <MaterialReactTable
              columns={columns}
              data={data}
              muiTableBodyCellProps={{
                style: { wordWrap: 'break-word', maxWidth: '200px' },
              }}
              muiTableContainerProps={{
                style: { overflowX: 'auto' },
              }}
            />
          </div>
        )}
    </>
  );
}

export default SingalPlayerInvoice