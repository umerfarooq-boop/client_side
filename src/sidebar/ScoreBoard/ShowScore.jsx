import Dashboard from '../Dashboard'
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios'
import { useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

function ShowScore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/playerscore/${id}`);
      if (response.data && response.data.playerScore) {
        setData(response.data.playerScore);
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
        accessorKey: 'coach.name',
        header: 'Coach Name',
        size: 150,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 150,
      },
      {
        accessorKey: 'player_type',
        header: 'Player Type',
        size: 150,
      },
    ];

    // Check if there's data to inspect player_type
    if (data.length > 0) {
      const playerType = data[0].player_type;

      if (playerType === 'bowler') {
        baseColumns.push(
          {
            accessorKey: 'through_over',
            header: 'Bowling Over',
            size: 150,
          },
          {
            accessorKey: 'today_taken_wickets',
            header: 'Wickets',
            size: 150,
          }
        );
      } else if (playerType === 'batsman') {
        baseColumns.push(
          {
            accessorKey: 'played_over',
            header: 'Batting Over',
            size: 150,
          },
          {
            accessorKey: 'today_give_wickets',
            header: 'Wicket',
            size: 150,
          }
        );
      } else if (playerType === 'allrounder') {
        baseColumns.push(
          {
            accessorKey: 'through_over',
            header: 'Bowling Over',
            size: 150,
          },
          {
            accessorKey: 'today_taken_wickets',
            header: 'Wickets',
            size: 150,
          },
          {
            accessorKey: 'played_over',
            header: 'Batting Over',
            size: 150,
          },
          {
            accessorKey: 'today_give_wickets',
            header: 'Wicket',
            size: 150,
          }
        );
      }
    }

    return baseColumns;
  }, [data]);


  return (
    <Dashboard>
      <ToastContainer />
      <br />
      {
        loading ? (
          <div className="flex flex-col items-center justify-center h-screen ">
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

export default ShowScore;
