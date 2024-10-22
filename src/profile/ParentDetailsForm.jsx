import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';

const ParentDetailsForm = () => {
    // const { register } = useFormContext();
    const { register, formState: { errors } } = useFormContext();

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
                        {...register('name', { required: 'Parent name is required' })}
                        fullWidth
                        size="small"
                        helperText={errors.name?.message}
                        error={!!errors.name}
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
                        type='number'
                        {...register('phone_number', { 
                            required: 'Parent phone number is required',
                            pattern: {
                                value: /^[0-9]{10}$/, // Adjust this regex based on your phone number format
                                message: 'Invalid phone number format (10 digits required)',
                            },
                        })}
                        fullWidth
                        size="small"
                        helperText={errors.phone_number?.message}
                        error={!!errors.phone_number}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Location"
                        {...register('location', { required: 'Location is required' })}
                        fullWidth
                        size="small"
                        helperText={errors.location?.message}
                        error={!!errors.location}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default ParentDetailsForm;
