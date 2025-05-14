
import Dashboard from '../sidebar/Dashboard'
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../axios'
import { useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import ReportIcon from '@mui/icons-material/Report';
import {Link} from 'react-router-dom'

function EmergencyPlayersRecord() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/FetchEmergencyRecord/${id}`);
      if (response.data && response.data.emergency) {
        setData(response.data.emergency);
        setLoading(false);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(() => {
    // Common columns
    const baseColumns = [
      {
        accessorKey: 'player.player_name',
        header: 'Player Name',
        size: 150,
      },
      {
        accessorKey: 'player_parent.name',
        header: 'Father Name',
        size: 150,
      },
      {
        accessorKey: 'player_parent.phone_number',
        header: 'Phone Number',
        size: 150,
      },
      {
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <Link
            to={`/emergency/${row.original?.player_parent.id}`} 
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
            style={{ textDecoration: 'none' }}
          >
            <ReportIcon style={{ color: 'red' }} />
            <span>Complaint</span>
          </Link>
        ),
      },
    ];
  
    return baseColumns;
  }, [data]);
  

  return (
    <Dashboard>
      <ToastContainer />
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
        ) : (
          <MaterialReactTable
            columns={columns}
            data={data}
            muiTableBodyCellProps={{
              style: { wordWrap: 'break-word', width: 'auto' },
            }}
            muiTableContainerProps={{
              style: { overflowX: 'auto' },
            }}
          />
        )
      }
    </Dashboard>
  );
}



export default EmergencyPlayersRecord