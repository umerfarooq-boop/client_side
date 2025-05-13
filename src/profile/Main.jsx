import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, MenuItem, Grid, List, ListItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


const Main = ({ nextStep, setRole }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const navigate = useNavigate();
  const [citySuggestions, setCitySuggestions] = useState([]);
  const inputValue = watch('profile_location', '');
  const role = localStorage.getItem('role');
  const fetchCities = async (query) => {
    if (!query) {
      setCitySuggestions([]);
      return;
    }

    const accessToken = 'pk.eyJ1IjoidW1lcndhbGkiLCJhIjoiY20ycGM0aWRrMGxmYjJtc2N2eWRvZHNpNiJ9._eLwWDk871QbnYrq8lcOkw';
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
        {
          params: {
            access_token: accessToken,
            country: 'PK', // Restrict to Pakistan
            types: 'place',
          },
        }
      );

      const cities = response.data.features.map((feature) => feature.place_name);
      setCitySuggestions(cities);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const handleCityChange = (event) => {
    const query = event.target.value;
    // setInputValue(query);
    setValue('profile_location', query); // Sync with react-hook-form
    fetchCities(query);
    
  };

  const handleCitySelect = (city) => {
    // setInputValue(city);
    setValue('profile_location', city); // Sync with react-hook-form
    setCitySuggestions([]);
    const location = localStorage.setItem('location',JSON.stringify(city));
    // console.log(location);
  };

  const user_id = localStorage.getItem('user_id');

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <input type="hidden" value={user_id} {...register('user_id')} />
      <Grid container spacing={5}>
        {/* Date of Birth Field */}
        <Grid item xs={12} sm={6}>
        <TextField
  label="Date of Birth"
  type="date"
  {...register('dob', {
    required: 'Date of Birth is required',
    validate: (value) => {
      const role = localStorage.getItem('role'); // Retrieve the role
      const dob = new Date(value);
      const age = new Date().getFullYear() - dob.getFullYear();
      const isFutureDate = dob > new Date();
      
      // Validate based on role
      if (isFutureDate) {
        return 'Date cannot be in the future';
      }

      if (role === 'player') {
        if (age < 11) {
          Swal.fire({
            title: "Error!",
            text: `Player age must be at least 11 years`,
            icon: "error",
            confirmButtonText: "OK",
          });
          // setTimeout(() => navigate('/signup'), 1000); // Delayed navigation
          return 'Player age must be at least 11 years';
        }
      } else if (role === 'coach') {
        if (age <= 20 || age >= 50) {
          Swal.fire({
            title: "Error!",
            text: "Coach age must be greater than 20 years",
            icon: "error",
            confirmButtonText: "OK",
          });
          // setTimeout(() => navigate('/signup'), 1000); // Delayed navigation
          return 'Coach age must be greater than 20 years or less than 50';
        }
      }
      

      return true; // Valid
    },
  })}
  InputLabelProps={{ shrink: true }}
  error={!!errors.dob}
  helperText={errors.dob?.message}
  fullWidth
  size="small"
/>

        </Grid>



  {/* Gender Field */}
  <Grid item xs={12} sm={6}>
    <TextField
      label="Gender"
      select
      {...register('gender', { required: 'Gender is required' })}
      error={!!errors.gender}
      helperText={errors.gender?.message}
      InputLabelProps={{ shrink: true }}
      fullWidth
      size="small"
    >
      <MenuItem value="male">Male</MenuItem>
      <MenuItem value="female">Female</MenuItem>
    </TextField>
  </Grid>



        {/* City Search Field */}
      
        {/* City Field */}
        <Grid item xs={12}>
          <TextField
            label="City"
            placeholder="Enter city name"
            value={inputValue}
            onChange={handleCityChange}
            fullWidth
            size="small"
            error={!!errors.profile_location}
            helperText={errors.profile_location?.message}
            // {...register('profile_location', { required: 'Location is required' })}
          />
          {citySuggestions.length > 0 && (
            <List style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto' }}>
              {citySuggestions.map((city, index) => (
                <ListItem button key={index} onClick={() => handleCitySelect(city)}>
                  {city}
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      

        {/* Role Field */}
        <Grid item xs={12}>
          <TextField
            label="Role"
            select
            value={role}
            {...register('role', { required: 'Role is required' })}
            error={!!errors.role}
            helperText={errors.role?.message}
            fullWidth
            size="small"
          >
            {role === 'player' && (
          <MenuItem value="player" disabled selected>
            Player
          </MenuItem>
        )}
        {role === 'coach' && (
          <MenuItem value="coach" disabled selected>
            Coach
          </MenuItem>
        )}
        {role === 'admin' && (
          <MenuItem value="admin" disabled selected>
            Admin
          </MenuItem>
        )}
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
