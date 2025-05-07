
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios'
import ReportIcon from '@mui/icons-material/Report';
import Dashboard from '../sidebar/Dashboard';
const EmergencyModule = () => {
  const [emergencyType, setEmergencyType] = useState('');
  const [cricketInjury, setCricketInjury] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {register,handleSubmit,reset} = useForm();
  const {id} = useParams();
  const navigate = useNavigate();  

  const Complaint = async (data) => {
    try {
      const response = await axios.post('/send_emergency', {
        emergencyType: emergencyType,
        subemergencyType: cricketInjury,
        description: description,
        player_id: id, // assuming this comes from useParams
        parent_id: id // replace with actual parent ID (or fetch it dynamically)
      });
  
      if (response.data.success) {
        alert('Email Sent and Emergency Recorded');
        setIsSubmitted(true);
        reset();
        navigate(-1);
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send emergency report.');
    }
  };
  

  const cricketInjuryOptions = [
    'Hamstring Strain',
    'Shoulder Injury',
    'Knee Injury',
    'Finger Dislocation',
    'Elbow Pain',
    'Lower Back Pain',
    'Groin Strain',
    'Concussion',
  ];

  return (
    <Dashboard>
      <div style={styles.page}>
      <div style={styles.container}>
      <div className="text-center">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Emergency <span className="text-indigo-600">Complaint</span>
            </h3>
          </div><br /><br />
        {isSubmitted && <div style={styles.success}>Emergency Reported Successfully!</div>}
        <form onSubmit={handleSubmit(Complaint)} style={styles.form}>
        <div className="md:w-full px-3 mb-6 md:mb-0">
  <label
    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    htmlFor="emergency_type"
  >
    Emergency Type
  </label>
  <select
    id="emergency_type"
    value={emergencyType}
    onChange={(e) => setEmergencyType(e.target.value)}
    className={`appearance-none block w-full bg-white text-gray-700 border ${
      !emergencyType ? 'border-red-500' : 'border-gray-300'
    } rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`}
    required
  >
    <option value="">Select Type</option>
    <option value="Injury">Injury</option>
    <option value="Health Issue">Health Issue</option>
    <option value="Harassment">Harassment</option>
    <option value="Other">Other</option>
  </select>
  {!emergencyType && (
    <p className="text-red-500 text-xs italic">Emergency Type is required</p>
  )}
</div>

{emergencyType === 'Injury' && (
  <div className="md:w-full px-3 mb-6 md:mb-0">
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor="injury_type"
    >
      Select Injury Type
    </label>
    <select
      id="injury_type"
      value={cricketInjury}
      onChange={(e) => setCricketInjury(e.target.value)}
      className={`appearance-none block w-full bg-white text-gray-700 border ${
        !cricketInjury ? 'border-red-500' : 'border-gray-300'
      } rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`}
      required
    >
      <option value="">Select Injury</option>
      {cricketInjuryOptions.map((injury, index) => (
        <option key={index} value={injury}>
          {injury}
        </option>
      ))}
    </select>
    {!cricketInjury && (
      <p className="text-red-500 text-xs italic">Injury Type is required</p>
    )}
  </div>
)}


<div className="md:w-full px-3 mb-6 md:mb-0">
  <label
    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    htmlFor="description"
  >
    Description
  </label>
  <textarea
    id="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className={`appearance-none block w-full bg-white text-gray-700 border ${
      !description ? 'border-red-500' : 'border-gray-300'
    } rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`}
    style={{ height: 100 }}
    required
  />
  {!description && (
    <p className="text-red-500 text-xs italic">Description is required</p>
  )}
</div>


  <button type="submit" style={styles.button}>
    Report Emergency &nbsp;
  <ReportIcon style={{ color: 'red' }} />
  </button>
</form>

      </div>
    </div>
    </Dashboard>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  container: {
    padding:  50,
    width: '100%',
    maxWidth: 700,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff4444',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  button: {
    padding: 10,
    backgroundColor: '#3F00FF',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  success: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 5,
    color: '#155724',
    marginBottom: 10,
    textAlign: 'center',
  }
};

export default EmergencyModule;
