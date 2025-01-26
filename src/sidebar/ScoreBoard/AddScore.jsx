import Dashboard from '../Dashboard'
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios'
import { Link, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";


function AddScore() {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [toggle,setToggle] = useState(true);
    const {id} = useParams();
    const {register,handleSubmit,reset} = useForm();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [playerType, setPlayerType] = useState('bowler'); // Default selected is 'bowler'

    const handlePlayerTypeChange = (e) => {
      setPlayerType(e.target.value);
    };
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
      
    //   const [player_id,setPlayerid] = useState('');

    const fetchData = async () => {
        try {
        const response = await axios.get(`/PlayerRequests/${id}`);
        if (response.data && Array.isArray(response.data.CoachSchedule)) {
            setData(response.data.CoachSchedule);
            // setPlayerid(response.data.CoachSchedule.player.id);
            setLoading(false)
        } else {
            console.error("Unexpected API response format:", response.data);
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };


    const MenageScore = async (formData) => {
        try {
            await axios.post('/playerscore', formData);
            Swal.fire({
                title: "Success!",
                text: "Record Saved Successfully.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                fetchData(); // Refresh data
                closeModal(); // Close the modal
                reset(); // Reset the form
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to save the record.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    useEffect(() => {
        fetchData();
        Modal.setAppElement('#root');
    }, [id]);
    

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'player.player_name',
        header: 'Player Name',
        size: 150,
      },
      {
        accessorKey: 'attendance_status',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => {
          const [modalIsOpen, setIsOpen] = React.useState(false);
          let subtitle;
      
          const openModal = () => setIsOpen(true);
          const closeModal = () => {
            setIsOpen(false);
            reset();
            Swal.close();
          }
      
          const afterOpenModal = () => {
            if (subtitle) {
              subtitle.style.color = '#f00';
            }
          };
      
          const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              zIndex: 1000, // Added z-index for modal
              backgroundColor: '#fff',
              maxWidth: '700px',
              width: '90%',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a dimmed background
              zIndex: 1000, // Ensures the overlay also respects the z-index
            },
          };
      
          return (
            <div>
              <button
                onClick={openModal}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Add Score
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{ marginBottom: '20px' }}>
                  Modal Title
                </h2>
                <button
                  onClick={closeModal}
                  style={{
                    backgroundColor: '#DC3545',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '10px',
                  }}
                >
                  Close
                </button>
                <div style={{ marginBottom: '20px' }}>I am a modal</div>
                <form onSubmit={handleSubmit(MenageScore)}>
                    <select
                        name="player_type"
                        id="player_type"
                        {...register('player_type')}
                        // onChange={handlePlayerTypeChange}
                        style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        }}
                    >
                        <option value="">Select Player Type</option>
                        <option value="bowler">Bowler</option>
                        <option value="batsman">Batsman</option>
                    </select>

                    <input
                            {...register('played_over')}
                            placeholder="Over Played"
                            style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            }}
                        />
                        <input
                            {...register('today_give_wickets')}
                            placeholder="Loss wicket how many times"
                            style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            }}
                        />

                        <input
                            type='number'
                            {...register('through_over')}
                            placeholder="Through Over"
                            style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            }}
                        />

                        {
                        data.map((player, index) => (
                            <input
                            key={index}
                            type="text"
                            defaultValue={player.player?.id || ''}
                            {...register('player_id', { value: player.player?.id })} // Correct registration
                            />
                        ))
                        }

                        <input type="hidden" defaultValue={id} {...register('coach_id')} />

                        {/* <input type="text" value={'Umer'} /> */}


                        <input
                            {...register('today_taken_wickets')}
                            placeholder="Out by Bowler"
                            style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            }}
                        />

                    <button
                        type="submit"
                        style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        backgroundColor: '#6C757D',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>
                </form>
              </Modal>
            </div>
          );
        },
      }
      
      
      

            
      
      
      
      
    
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
            <MaterialReactTable
                columns={columns}
                data={data}
                muiTableBodyCellProps={{
                    style: { wordWrap: 'break-word', Width:'auto'},
                }}
                muiTableContainerProps={{
                    style: { overflowX: 'auto' }, // Horizontal scrolling for smaller screens
                }}
                
            />
            )
          }
    </Dashboard>
  )
}

export default AddScore