import { useFormContext } from 'react-hook-form';
import { TextField, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from '../axios';

const CoachProfile = () => {
    const { register, formState: { errors } } = useFormContext();
    const [category, setCategory] = useState('');

    // const role = localStorage.getItem('role');


    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await axios.get('/category');
                setCategory(response.data.category);
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Coach Name"
                        {...register('name', { required: 'Name is required' })}
                        fullWidth
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" error={!!errors.experience}>
                        <InputLabel id="experience-label">Experience</InputLabel>
                        <Select
                            labelId="experience-label"
                            {...register('experience', { required: 'Experience is required' })}
                            defaultValue=""
                        >
                            <MenuItem value="1year">1 Year</MenuItem>
                            <MenuItem value="2year">2 Year</MenuItem>
                            <MenuItem value="3year">3 Year</MenuItem>
                            <MenuItem value="4year">4 Year</MenuItem>
                            <MenuItem value="5year">5 Year</MenuItem>
                            <MenuItem value="6year">Above 6 Year</MenuItem>
                        </Select>
                        {errors.experience && <p>{errors.experience.message}</p>}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" error={!!errors.level}>
                        <InputLabel id="level-label">Level</InputLabel>
                        <Select
                            labelId="level-label"
                            {...register('level', { required: 'Level is required' })}
                            defaultValue=""
                        >
                            <MenuItem value="level 1">Level 1</MenuItem>
                            <MenuItem value="level 2">Level 2</MenuItem>
                            <MenuItem value="level 3">Level 3</MenuItem>
                        </Select>
                        {errors.level && <p>{errors.level.message}</p>}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone Number"
                        {...register('phone_number', { 
                            required: 'Phone number is required',
                            pattern: {
                                value:/^((\+92)|(0092))[-\s]?(\d{3})[-\s]?(\d{7})$|^\d{11}$|^\d{4}-\d{7}$/, // Adjust according to your phone number format
                                message: 'Phone number must be 10 digits'
                            }
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.phone_number}
                        helperText={errors.phone_number?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" error={!!errors.category_id}>
                        <InputLabel id="category-label">Sport Category</InputLabel>
                        <Select
                            labelId="category-label"
                            {...register('category_id', { required: 'Sport Category is required' })}
                            defaultValue=""
                        >
                            {category.length > 0 ? (
                                category.map((item) => (
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
                        {errors.category_id && <p>{errors.category_id.message}</p>}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" error={!!errors.hasAcademy}>
                        <InputLabel id="academy-label">Academy</InputLabel>
                        <Select
                            labelId="academy-label"
                            {...register('hasAccademy', { required: 'Academy is required' })}
                            defaultValue=""
                        >
                            <MenuItem value="yes">Create Academy</MenuItem>
                            <MenuItem value="yes">Registered Academy</MenuItem>
                        </Select>
                        {errors.hasAcademy && <p>{errors.hasAcademy.message}</p>}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Coach Location"
                        {...register('coach_location', { 
                            required: 'Coach Location is required',
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: 'Location must contain only letters and spaces'
                            }
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.coach_location}
                        helperText={errors.coach_location?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Upload Image"
                        {...register('image')}
                        type="file"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Upload Certificate"
                        {...register('certificate')}
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

export default CoachProfile;
