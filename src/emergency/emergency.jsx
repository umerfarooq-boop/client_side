import React, { useState } from 'react';

const EmergencyModule = () => {
  const [emergencyType, setEmergencyType] = useState('');
  const [cricketInjury, setCricketInjury] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reportData = {
      emergencyType,
      description,
      reportedAt: new Date().toISOString(),
    };

    if (emergencyType === 'Injury') {
      reportData.injuryType = cricketInjury;
    }

    console.log('Emergency Reported:', reportData);

    // Reset form and show confirmation
    setEmergencyType('');
    setCricketInjury('');
    setDescription('');
    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 3000); // hide confirmation after 3s
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
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Emergency Report Module</h2>
        {isSubmitted && <div style={styles.success}>Emergency Reported Successfully!</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>
            Emergency Type:
            <select
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select Type</option>
              <option value="Injury">Injury</option>
              <option value="Health Issue">Health Issue</option>
              <option value="Harassment">Harassment</option>
              <option value="Other">Other</option>
            </select>
          </label>

          {emergencyType === 'Injury' && (
            <label>
              Select Injury Type:
              <select
                value={cricketInjury}
                onChange={(e) => setCricketInjury(e.target.value)}
                style={styles.input}
                required
              >
                <option value="">Select Injury</option>
                {cricketInjuryOptions.map((injury, index) => (
                  <option key={index} value={injury}>{injury}</option>
                ))}
              </select>
            </label>
          )}

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.input, height: 100 }}
              required
            />
          </label>

          <button type="submit" style={styles.button}>Report Emergency</button>
        </form>
      </div>
    </div>
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
    padding: 20,
    width: '100%',
    maxWidth: 400,
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
    backgroundColor: '#ff4444',
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
