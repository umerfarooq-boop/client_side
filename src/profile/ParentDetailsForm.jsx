import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Grid,InputAdornment } from '@mui/material';


const ParentDetailsForm = () => {
    // const { register } = useFormContext();
    const { register, formState: { errors } } = useFormContext();
    let location = localStorage.getItem('location');
    location = location.replace(/"/g,'');
        location = location.replace(/,/g,'');
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Parent CNIC"
                        {...register('cnic', { 
                            required: 'CNIC is required',
                            pattern: {
                                value: /^[0-9]{5}-[0-9]{7}-[0-9]$/, // Adjust this regex based on your CNIC format
                                message: 'Invalid CNIC format (e.g. 61101-0000000-0)',
                            },
                        })}
                        fullWidth
                        size="small"
                        helperText={errors.cnic?.message}
                        error={!!errors.cnic}
                    />
                </Grid>

                

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Parent Name"
                        {...register("name", {
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
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Address"
                        {...register('address', { required: 'Address is required' })}
                        fullWidth
                        size="small"
                        helperText={errors.address?.message}
                        error={!!errors.address}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Parent Phone Number"
                        type='text'
                        {...register('phone_number', {
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
                        error={!!errors.phone_number}
                        helperText={errors.phone_number?.message}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Replace non-numeric characters
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Location"
                        {...register('location', { required: 'Location is required' })}
                        fullWidth
                        size="small"
                        value={location}
                        helperText={errors.location?.message}
                        error={!!errors.location}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default ParentDetailsForm;
