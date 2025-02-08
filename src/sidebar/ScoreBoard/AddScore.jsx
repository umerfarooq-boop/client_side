import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Dashboard from "../Dashboard"
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
      Swal.fire("Warning!", "Please select a player before editing.", "warning");
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

  // Validation Logic
  const validateForm = () => {
    let maxWickets = formData.played_over * 6; // Max wickets = overs * 6 (max per over)
    let maxRuns = formData.played_over === 1 ? 32 : formData.played_over * 36; // Dynamic max runs
  
    if (playerType === "bowler") {
      if (parseInt(formData.today_taken_wickets) > maxWickets) {
        Swal.fire("Warning!", `Wickets taken cannot be more than ${maxWickets} for ${formData.played_over} overs.`, "warning");
        return false;
      }
    }
  
    if (playerType === "batsman") {
      if (parseInt(formData.today_give_wickets) > maxRuns) {
        Swal.fire("Warning!", `Maximum runs cannot exceed ${maxRuns} for ${formData.played_over} overs.`, "warning");
        return false;
      }
    }
  
    if (playerType === "allrounder") {
      if (parseInt(formData.today_taken_wickets) > maxWickets) {
        Swal.fire("Warning!", `Wickets taken cannot be more than ${maxWickets} for ${formData.played_over} overs.`, "warning");
        return false;
      }
      if (parseInt(formData.today_give_wickets) > maxRuns) {
        Swal.fire("Warning!", `Maximum runs cannot exceed ${maxRuns} for ${formData.played_over} overs.`, "warning");
        return false;
      }
    }
  
    return true;
  };
  
  

  const MenageScore = async () => {
    if (!playerId || !playerType) {
      Swal.fire("Warning!", "Please select a player and player type.", "warning");
      return;
    }
    if (!validateForm()) return;

    try {
      await axios.post("/playerscore", {
        player_id: playerId,
        player_type: playerType,
        coach_id: coachID,
        ...formData,
      });

      Swal.fire("Success!", "Record Saved Successfully.", "success");
      resetForm();
    } catch (error) {
      Swal.fire("Error!", "Failed to save the record.", "error");
    }
  };

  const Updateform = async () => {
    if (!playerId || !playerType) {
      Swal.fire("Warning!", "Please select a player and player type.", "warning");
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

  return (
    <Dashboard>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isEditing ? "Edit Player Score" : "Add Player Score"}
      </h2>

      <label className="block text-sm font-medium text-gray-700">Select Player</label>
      <select value={playerId} onChange={handlePlayerChange} className="w-full p-2 mt-1 border rounded">
        <option value="">Choose a Player</option>
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.player?.player_name}
          </option>
        ))}
      </select>

      <label className="block mt-4 text-sm font-medium text-gray-700">Player Type</label>
      <select value={playerType} onChange={handlePlayerTypeChange} className="w-full p-2 mt-1 border rounded">
        <option value="">Choose Type</option>
        <option value="bowler">Bowler</option>
        <option value="batsman">Batsman</option>
        <option value="allrounder">All-Rounder</option>
      </select>

      {playerType === "bowler" && (
        <>
          <label className="block mt-4">Through Overs</label>
          <input type="number" name="through_over" value={formData.through_over} onChange={handleChange} className="w-full p-2 border rounded"/>
          <label className="block mt-4">Wickets Taken</label>
          <input type="number" name="today_taken_wickets" value={formData.today_taken_wickets} onChange={handleChange} className="w-full p-2 border rounded"/>
        </>
      )}

      {playerType === "batsman" && (
        <>
          <label className="block mt-4">Played Overs</label>
          <input type="number" name="played_over" value={formData.played_over} onChange={handleChange} className="w-full p-2 border rounded"/>
          <label className="block mt-4">Runs Scored</label>
          <input type="number" name="today_give_wickets" value={formData.today_give_wickets} onChange={handleChange} className="w-full p-2 border rounded"/>
        </>
      )}

{playerType === "allrounder" && (
        <>
          <label className="block mt-4">Played Overs</label>
          <input type="number" name="played_over" value={formData.played_over} onChange={handleChange} className="w-full p-2 border rounded"/>
          <label className="block mt-4">Runs Scored</label>
          <input type="number" name="today_give_wickets" value={formData.today_give_wickets} onChange={handleChange} className="w-full p-2 border rounded"/>
          <label className="block mt-4">Through Overs</label>
          <input type="number" name="through_over" value={formData.through_over} onChange={handleChange} className="w-full p-2 border rounded"/>
          <label className="block mt-4">Wickets Taken</label>
          <input type="number" name="today_taken_wickets" value={formData.today_taken_wickets} onChange={handleChange} className="w-full p-2 border rounded"/>
        </>
      )}

      <div className="mt-4 flex justify-between">
        <button onClick={EditRecord} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
        {!isEditing ? (
          <button onClick={MenageScore} className="bg-blue-500 text-white p-2 rounded">Add Score</button>
        ) : (
          <button onClick={Updateform} className="bg-green-500 text-white p-2 rounded">Update Score</button>
        )}
      </div>
    </div>
    </Dashboard>
  );
};

export default AddScore;
