import Dashboard from '../sidebar/Dashboard'
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../axios'
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

function PlayerScore() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const parent_id = localStorage.getItem('parent_id');

  const fetchData = async () => {
    try {
      const response = await axios.get(`/ShowPlayerScore/${parent_id}`);
      const playerObj = response.data.player_score?.[0];
  
      if (playerObj && Array.isArray(playerObj.player_score)) {
        const scores = playerObj.player_score.map(score => ({
          ...score,
          player_name: playerObj.player?.player_name, // Accessing player_name from player object
          coach_name: score.coach?.name || '', // coach is nested in score
        }));
        setData(scores);
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
    const baseColumns = [
      {
        accessorKey: 'player_name',
        header: 'Player Name',
        size: 150,
      },
      {
        accessorKey: 'coach_name',
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
                style: { wordWrap: 'break-word', maxWidth: '200px' },
            }}
            muiTableContainerProps={{
                style: { overflowX: 'auto' }, // Horizontal scrolling for smaller screens
            }}
            renderTopToolbarCustomActions={() => (
              <Link to={'/'} className='focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 italic'>Detail</Link>
          )}
        />
        )
      }
    </Dashboard>
  );
}

export default PlayerScore