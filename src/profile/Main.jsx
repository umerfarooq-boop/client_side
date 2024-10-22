import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, MenuItem, Grid } from '@mui/material';

const Main = ({ nextStep, setRole }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  
  const sport_role = localStorage.getItem('role');

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date of Birth"
            type="date"
            {...register('dob', { 
              required: 'Date of Birth is required',
              validate: value => new Date(value) <= new Date() || 'Date cannot be in the future',
            })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob?.message}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Gender"
            select
            {...register('gender', { required: 'Gender is required' })}
            error={!!errors.gender}
            helperText={errors.gender?.message}
            fullWidth
            size="small"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Location"
            {...register('profile_location', { 
              required: 'Location is required',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Location must contain only letters and spaces'
              }
            })}
            error={!!errors.profile_location}
            helperText={errors.profile_location?.message}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Role"
            select
            {...register('role', { required: 'Role is required' })}
            value={sport_role}
            error={!!errors.role}
            helperText={errors.role?.message}
            fullWidth
            size="small"
          >
            <MenuItem value="player" disabled={sport_role === 'coach'}>
              Player
            </MenuItem>
            <MenuItem value="coach" disabled={sport_role === 'player'}>
              Coach
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
