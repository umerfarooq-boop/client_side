import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from '../axios';

const PlayerProfile = () => {
    const { register, formState: { errors } } = useFormContext();
    const [sport, setSport] = useState([]);

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

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Date of Birth"
                        {...register('player_dob', { required: 'Date of Birth is required' })}
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
                        {...register('player_name', { required: 'Name is required' })}
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
                                value: /^[0-9]{10}$/, // Adjust this regex based on your phone number format
                                message: 'Phone number must be 10 digits',
                            },
                        })}
                        fullWidth
                        type='number'
                        size="small"
                        error={!!errors.player_phonenumber}
                        helperText={errors.player_phonenumber?.message}
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
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default PlayerProfile;
