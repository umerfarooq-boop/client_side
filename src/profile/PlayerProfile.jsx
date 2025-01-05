import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem ,InputAdornment} from '@mui/material';
import axios from '../axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const PlayerProfile = () => {
    const { register, formState: { errors } } = useFormContext();
    const [sport, setSport] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getSportCategory = async () => {
            try {
                const response = await axios.get('/category');
                console.log(response.data.category);
                setSport(response.data.category);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        getSportCategory();
    }, []);

    let location = localStorage.getItem('location');
    if(location){
        location = location.replace(/"/g,'');
        location = location.replace(/,/g,'');
        console.log(location);
    }else{
        console.log("No Location Foud");
    }

    const [error, setErrors] = useState({ image: '' });

const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    let errorMessage = '';
    if (name === 'image' && file.size > 180 * 1024) { // 180 KB limit
        errorMessage = 'Image size must be less than 180 KB.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
};

const player_record = localStorage.getItem('coach_id' || '');

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <input type="hidden" value={player_record} {...register('user_id')} />
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Date of Birth"
                        {...register('player_dob', {
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
                                    text: `<strong>Player age must be at least 11 years<strong>`,
                                    icon: "error",
                                    confirmButtonText: "OK",
                                  });
                                //   setTimeout(() => navigate('/signup'), 1000); // Delayed navigation
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
                                //   setTimeout(() => navigate('/signup'), 1000); // Delayed navigation
                                  return 'Coach age must be greater than 20 years or less than 50';
                                }
                              }
                              
                        
                              return true; // Valid
                            },
                          })}
                        fullWidth
                        size="small"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.player_dob}
                        helperText={errors.player_dob?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Player Name"
                        {...register("player_name", {
                            required: "Name is required",
                            minLength: {
                              value: 3,
                              message: "Name must be at least 3 characters",
                            },
                            pattern: {
                              value: /^[A-Za-z\s]+$/, // Regex for strings with only letters and spaces
                              message: "Name must contain only letters",
                            },
                          })}
                        fullWidth
                        size="small"
                        error={!!errors.player_name}
                        helperText={errors.player_name?.message}
                    />
                </Grid>

                {/* Sport Category */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" error={!!errors.cat_id}>
                        <InputLabel id="level-label">Sport Category</InputLabel>
                        <Select
                            labelId="level-label"
                            {...register('cat_id', { required: 'Sport Category is required' })}
                            defaultValue=""
                        >
                            {sport.length > 0 ? (
                                sport.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="" disabled>
                                    No categories available
                                </MenuItem>
                            )}
                        </Select>
                        {errors.cat_id && <p style={{ color: 'red' }}>{errors.cat_id.message}</p>}
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        label="Play"
                        select
                        {...register('playwith', { required: 'Gender is Required' })}
                        error={!!errors.role}
                        helperText={errors.role?.message}
                        fullWidth
                        size="small"
                    >
                        <MenuItem value="individual">
                        Individual
                        </MenuItem>
                        <MenuItem value="team">
                        Team
                        </MenuItem>
                    </TextField>
                </Grid>

                {/* Gender Dropdown */}
                <Grid item xs={6} sm={6}>
                    <TextField
                        label="Gender"
                        {...register('player_gender', { required: 'Gender is required' })}
                        select
                        fullWidth
                        size="small"
                        error={!!errors.player_gender}
                        helperText={errors.player_gender?.message}
                    >
                        <MenuItem value="male">
                        Male
                        </MenuItem>
                        <MenuItem value="female">
                        Female
                        </MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone Number"
                        {...register('player_phonenumber', {
                            required: 'Phone number is required',
            pattern: {
                value: /^\d{9}$/, // Matches exactly 9 digits
                message: 'Phone number must be 9 digits',
            },
        })}
        inputProps={{
            maxLength: 9,  // Set max length to 9
            inputMode: 'numeric',  // Helps on mobile devices
        }}
        fullWidth
        size="small"
        InputLabelProps={{ shrink: true }}
        InputProps={{
            startAdornment: <InputAdornment position="start">+92</InputAdornment>,
        }}
                        error={!!errors.player_phonenumber}
                        helperText={errors.player_phonenumber?.message}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Replace non-numeric characters
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Address"
                        {...register('player_address', { required: 'Address is required' })}
                        fullWidth
                        size="small"
                        error={!!errors.player_address}
                        helperText={errors.player_address?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Location"
                        value={location}
                        {...register('player_location', { required: 'Location is required' })}
                        fullWidth
                        size="small"
                        error={!!errors.player_location}
                        helperText={errors.player_location?.message}
                    />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12} sm={12}>
    <TextField
        label="Profile"
        {...register('image')}
        type="file"
        fullWidth
        size="small"
        InputLabelProps={{ shrink: true }}
        onChange={handleFileChange}
        inputProps={{ name: 'image' }}
        error={!!error.image}
        helperText={error.image}
    />
</Grid>

            </Grid>
        </div>
    );
};

export default PlayerProfile;
