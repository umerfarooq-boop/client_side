import React, { useEffect, useState,useMemo } from "react";
import axios from "../../axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Dashboard from "../Dashboard";
import loadingAnimation from '../../loader/Animation - 1747181954747.json';
import Lottie from 'lottie-react';
import { MaterialReactTable } from 'material-react-table';

const AddScore = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [playerType, setPlayerType] = useState("");
  const [formData, setFormData] = useState({
    played_over: "",
    today_give_wickets: "",
    through_over: "",
    today_taken_wickets: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPlayerName();
  }, [id]);

  const coachID = id;

  const fetchPlayerName = async () => {
    try {
      const response = await axios.get(`/coachschedule/${id}`);
      if (response.data && Array.isArray(response.data.coach_record)) {
        setPlayers(response.data.coach_record);
      } else if (response.data?.coach_record) {
        setPlayers([response.data.coach_record]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const EditRecord = async () => {
    if (!playerId) {
      Swal.fire(
        "Warning!",
        "Please select a player before editing.",
        "warning"
      );
      return;
    }
    try {
      const response = await axios.get(`/EditPlayerRecord/${playerId}`);
      if (response.data?.playerScore) {
        const record = response.data.playerScore;
        setPlayerType(record.player_type);
        setFormData({
          played_over: record.played_over || "",
          today_give_wickets: record.today_give_wickets || "",
          through_over: record.through_over || "",
          today_taken_wickets: record.today_taken_wickets || "",
        });
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const handlePlayerChange = (e) => {
    // alert(e.target.value)
    setPlayerId(e.target.value);
  };

  const handlePlayerTypeChange = (e) => {
    setPlayerType(e.target.value);
    setFormData({
      played_over: "",
      today_give_wickets: "",
      through_over: "",
      today_taken_wickets: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let maxRuns = formData.played_over === 1 ? 32 : formData.played_over * 36; // Dynamic max runs
    let maxWickets = formData.through_over * 6; // Max wickets = overs * 6

    if (playerType === "bowler") {
      if (parseInt(formData.today_taken_wickets) > maxWickets) {
        Swal.fire(
          "Warning!",
          `Wickets taken cannot be more than ${maxWickets} for ${formData.through_over} overs.`,
          "warning"
        );
        return false;
      }
    }

    if (playerType === "batsman") {
      if (parseInt(formData.today_give_wickets) > maxRuns) {
        Swal.fire(
          "Warning!",
          `Maximum runs cannot exceed ${maxRuns} for ${formData.played_over} overs.`,
          "warning"
        );
        return false;
      }
    }

    if (playerType === "allrounder") {
      if (parseInt(formData.today_taken_wickets) > maxWickets) {
        Swal.fire(
          "Warning!",
          `Wickets taken cannot be more than ${maxWickets} for ${formData.played_over} overs.`,
          "warning"
        );
        return false;
      }
      if (parseInt(formData.today_give_wickets) > maxRuns) {
        Swal.fire(
          "Warning!",
          `Maximum runs cannot exceed ${maxRuns} for ${formData.played_over} overs.`,
          "warning"
        );
        return false;
      }
    }

    return true;
  };

  const MenageScore = async () => {
    // alert(playerId)
    if (!playerId || !playerType) {
      Swal.fire(
        "Warning!",
        "Please select a player and player type.",
        "warning"
      );
      return;
    }
    if (!validateForm()) return;

    try {
      const response = await axios.post("/playerscore", {
        player_id: playerId,
        player_type: playerType,
        coach_id: coachID,
        ...formData,
      });

      Swal.fire("Success!", "Record Saved Successfully.", "success");
      resetForm();
      fetchData();
    } catch (error) {
      if (error.response?.status === 402) {
        Swal.fire(
          "Warning!",
          error.response.data.message || "Please Mark Attendance First",
          "warning"
        );
      } else {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Failed to save the record.",
          "error"
        );
      }
    }
  };

  const Updateform = async () => {
    if (!playerId || !playerType) {
      Swal.fire(
        "Warning!",
        "Please select a player and player type.",
        "warning"
      );
      return;
    }
    if (!validateForm()) return;

    try {
      await axios.post(`/UpdateScore/${playerId}`, {
        player_type: playerType,
        ...formData,
      });

      Swal.fire("Success!", "Record Updated Successfully.", "success");
      resetForm();
      fetchData();
    } catch (error) {
      Swal.fire("Error!", "Failed to update the record.", "error");
    }
  };

  const resetForm = () => {
    setPlayerId("");
    setPlayerType("");
    setFormData({
      played_over: "",
      today_give_wickets: "",
      through_over: "",
      today_taken_wickets: "",
    });
    setIsEditing(false);
  };

  // Player Score
  const [data, setData] = useState([]); 
  const [loader, setLoading] = useState(true);

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

  // Player Score

  return (
    <Dashboard>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl xl:text-4xl font-bold text-blue-900 text-center pb-10">
          {isEditing ? "Edit Player Score" : "Add Player Score"}
        </h2>

        <div className="md:w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="player"
          >
            Choose a Player
          </label>
          <select
            id="player"
            value={playerId}
            onChange={handlePlayerChange}
            className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
          >
            <option value="">Choose a Player</option>
            {players.map((player) => (
              <option key={player.player_id} value={player.player_id}>
                {player.player?.player_name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="playerType"
          >
            Player Type
          </label>
          <select
            id="playerType"
            value={playerType}
            onChange={handlePlayerTypeChange}
            className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
          >
            <option value="">Choose Type</option>
            <option value="bowler">Bowler</option>
            <option value="batsman">Batsman</option>
            <option value="allrounder">All-Rounder</option>
          </select>
        </div>

        {playerType === "bowler" && (
          <div className="md:w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Through Overs
            </label>
            <input
              type="number"
              name="through_over"
              value={formData.through_over}
              onChange={handleChange}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
              Wickets Taken
            </label>
            <input
              type="number"
              name="today_taken_wickets"
              value={formData.today_taken_wickets}
              onChange={handleChange}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
        )}

        {playerType === "batsman" && (
          <div className="md:w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Played Overs
            </label>
            <input
              type="number"
              name="played_over"
              value={formData.played_over}
              onChange={handleChange}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
              Runs Scored
            </label>
            <input
              type="number"
              name="today_give_wickets"
              value={formData.today_give_wickets}
              onChange={handleChange}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
        )}

        {playerType === "allrounder" && (
          <div className="md:w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Played Overs
            </label>
            <input
              type="number"
              name="played_over"
              value={formData.played_over}
              onChange={handleChange}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
              Runs Scored
            </label>
            <input
              type="number"
              name="today_give_wickets"
              value={formData.today_give_wickets}
              onChange={handleChange}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
              Through Overs
            </label>
            <input
              type="number"
              name="through_over"
              value={formData.through_over}
              onChange={handleChange}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            />
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4">
              Wickets Taken
            </label>
            <input
              type="number"
              name="today_taken_wickets"
              value={formData.today_taken_wickets}
              onChange={handleChange}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <button
            onClick={EditRecord}
            className="bg-yellow-500 text-white p-2 px-3 rounded"
          >
            Edit
          </button>
          {!isEditing ? (
            <button
              onClick={MenageScore}
              className="bg-indigo-700 text-white p-2 rounded"
            >
              Add Score
            </button>
          ) : (
            <button
              onClick={Updateform}
              className="bg-green-500 text-white p-2 rounded"
            >
              Update Score
            </button>
          )}
        </div>
      </div>

      {/* Player Score */}
      <div className="mt-10 px-4">
    {loader ? (
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    ) : (
      <>
        <div className="text-center mb-6">
          <h3 className="text-3xl font-extrabold italic tracking-tight text-gray-900">
            Players <span className="text-indigo-600">Score</span>
          </h3>
        </div>

        {/* Card container for scrollable table */}
        <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto max-h-[600px]">
          <MaterialReactTable
            columns={columns}
            data={data}
            muiTableBodyCellProps={{
              style: { wordWrap: 'break-word', whiteSpace: 'normal' },
            }}
            muiTableContainerProps={{
              style: { overflowX: 'auto' },
            }}
          />
        </div>
        
      </>
    )
  }

</div>

      {/* Player Score */}
    </Dashboard>
  );
};

export default AddScore;
