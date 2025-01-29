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
    const [loading, setLoading] = useState(true);
    const [toggle,setToggle] = useState(true);
    const {id} = useParams();
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [playerType, setPlayerType] = useState("bowler"); // Default selected is 'bowler'
    const [player,setPlayer] = useState([]);
    const handlePlayerTypeChange = (event) => {
      setPlayerType(event.target.value);
    };
    

    const fetchPlayerName = async () => {
      try {
      const response = await axios.get(`/coachschedule/${id}`);
      if (response.data && Array.isArray(response.data.coach_record)) {
        setPlayer(response.data.coach_record);
          console.log("That is player");
          console.log(response.data.coach_record);
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
          });
      } catch (error) {
          Swal.fire({
              title: "Error!",
              text: error.response?.data?.message || "Failed to save the record.",
              icon: "error",
              confirmButtonText: "OK",
          });
      }finally{
        reset();
      }
  };
  
    
  const [playerId, setPlayerId] = useState(""); 
  const [editForm, setEditForm] = useState(null); 

  const handlePlayerChange = (e) => {
    setPlayerId(e.target.value); 
  };


  const EditRecord = async () => {
    if (!playerId) {
      alert("Please select a player before editing.");
      return;
    }
    try {
      const response = await axios.get(`/EditPlayerRecord/${playerId}`);
      // alert(playerId);
      if (response.data && Array.isArray(response.data.playerScore)) {
        setEditForm(response.data.playerScore);
      } else if (response.data && response.data.playerScore) {
        setEditForm([response.data.playerScore]);
      }
      console.log("Edit Record");
      console.log(response.data.playerScore);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const Updateform = async (data) => {
    try {
      await axios.post(`/UpdateScore/${playerId}`, data);
      setLoading(true);
      // Reset the form fields
      // reset(); // Clears the form by resetting to default values
  
      Swal.fire({
        title: "Success!",
        text: "Record Updated Successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to save the record.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      // Ensure the form is reset regardless of success or failure
      reset({
        player_id: "",
        player_type: "",
        played_over: "",
        today_give_wickets: "",
        through_over: "",
        today_taken_wickets: "",
      });
      setLoading(false);
    }
  };
  
  

    useEffect(() => {
        // EditRecord();
        // setEditForm(fetchPlayerName || []);
        fetchPlayerName();
    }, [id]);
    
  
  
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

              {
                editForm  ? (
                  <>
                  {/* <h1 className='text-black'>Edit This Form</h1> */}
                  {
                    editForm.map((data,key)=>(
                      <form
  className="bg-white p-6 shadow rounded-lg space-y-6"
  onSubmit={handleSubmit(Updateform)}
>
  <div className="flex items-center justify-between border-b pb-4">
    <div className="text-gray-700">Player Name</div>
    <div>
      <select
        {...register("player_id", { required: "The player type field is required." })}
        defaultValue={data?.player_id || ""}
        className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="">Select Player Name</option>
        {player.map((item, key) => (
          <option key={item.player?.id || key} value={item.player?.id}>
            {item.player?.player_name}
          </option>
        ))}
      </select>
    </div>
  </div>

  <input
    type="hidden"
    defaultValue={data?.coach_id || ""}
    {...register("coach_id")}
  />

  <div className="flex items-center justify-between border-b pb-4">
    <div className="text-gray-600">Player Type</div>
    <div>
    <select
  {...register("player_type", { required: "The player type field is required." })}
  defaultValue={data.player_type || ""}
  className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
  onChange={handlePlayerTypeChange}
>
  <option value="">Select Player Type</option>
  <option value="bowler" selected={data.player_type === 'bowler'}>Bowler</option>
  <option value="batsman" selected={data.player_type === 'batsman'}>Batsman</option>
</select>

    </div>
  </div>

  {playerType === "batsman" && (
    <>
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-gray-600">Batsman Over</div>
        <div>
          <input
            type="number"
            {...register("played_over", { required: "Played over is required." })}
            defaultValue={data?.played_over || ""}
            className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-gray-600">Batsman Out</div>
        <div>
          <input
            type="number"
            {...register("today_give_wickets", { required: "Today give wickets is required." })}
            defaultValue={data?.today_give_wickets || ""}
            className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
    </>
  )}

  {playerType === "bowler" && (
    <>
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-gray-600">Bowler Over</div>
        <div>
          <input
            type="number"
            {...register("through_over", { required: "Through over is required." })}
            defaultValue={data?.through_over || ""}
            className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-gray-600">Bowler Out</div>
        <div>
          <input
            type="number"
            {...register("today_taken_wickets", { required: "Today taken wickets is required." })}
            defaultValue={data?.today_taken_wickets || ""}
            className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
    </>
  )}

  <div className="flex justify-end">
    <button
      type="button"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
      onClick={() => EditRecord(data)}
    >
      Edit
    </button>
    &nbsp;&nbsp;
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
    >
      Update
    </button>
  </div>
                      </form>
                    ))
                  }
                  </>
                ) : (
                  <>
                  
                    <form
      className="bg-white p-6 shadow rounded-lg space-y-6"
      onSubmit={handleSubmit(MenageScore)}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div className=" text-gray-700">Player Name</div>
        <div>
          
        <select
          {...register("player_id", {
            required: "The player type field is required.",
          })}
          defaultValue=""
          className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={handlePlayerChange}
        >
          <option value="">Select Player Name</option>
          {player.map((item, key) => (
            <option key={item.player?.id || key} value={item.player?.id}>
              {item.player?.player_name}
            </option>
          ))}
        </select>

        </div>
      </div>

      

      <div className="hidden items-center justify-between border-b pb-4 ">
        <div className="text-gray-600">Coach ID</div>
        <div>
          <input
            type="hidden"
            defaultValue={id}
            {...register(`coach_id`)}
            className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-gray-600">Player Type</div>
        <div>
          <select
            {...register(`player_type`, {
              required: "The player type field is required.",
            })}
            value={playerType}
            className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
            onChange={handlePlayerTypeChange}
          >
            <option value="">Select Player Type</option>
            <option value="bowler">Bowler</option>
            <option value="batsman">Batsman</option>
          </select>
        </div>
      </div>

      {
        playerType === 'batsman' && (
          <>
            <div className="flex items-center justify-between border-b pb-4">
            <div className="text-gray-600">Batsman Over</div>
            <div>
              <input
                type="number"
                {...register(`played_over`, {
                  required: "Played over is required.",
                })}
                placeholder="Over Played"
                className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <div className="text-gray-600">Batsman Out</div>
            <div>
              <input
                type="number"
                {...register(`today_give_wickets`, {
                  required: "Today give wickets is required.",
                })}
                placeholder="Today Give Wickets"
                className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          </>
        )
      }

      {/* Bowler */}

      {
        playerType === 'bowler' && (
          <>
            <div className="flex items-center justify-between border-b pb-4">
              <div className="text-gray-600">Bowler Over</div>
              <div>
              <input
                  type="number"
                  {...register(`through_over`, {
                    required: "Today give wickets is required.",
                  })}
                  placeholder="Today Bowler Wickets"
                  className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div className="text-gray-600">Bowler Out</div>
              <div>
              <input
                  type="number"
                  {...register(`today_taken_wickets`, {
                    required: "Today give wickets is required.",
                  })}
                  placeholder="Today Give Wickets"
                  className="border rounded-lg p-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
          </>
        )
      }

      

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >ADD</button>&nbsp;&nbsp;
         <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        onClick={EditRecord} // Call EditRecord on click
      >
        Edit
      </button>&nbsp;&nbsp;
      {/* <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        // Call EditRecord on click
      >
        Update
      </button> */}
      </div>
                  </form>
                  </>
                )
              }

            </div>
    
                      

            )
                      }
                      
    </Dashboard>
  )
}

export default AddScore