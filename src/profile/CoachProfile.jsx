import { useFormContext } from 'react-hook-form';
import { TextField, Grid, FormControl, InputLabel, MenuItem, Select,InputAdornment  } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from '../axios';

const CoachProfile = () => {
    const { register,watch, formState: { errors } } = useFormContext();
    const [category, setCategory] = useState('');
    
    const [citySuggestions, setCitySuggestions] = useState([]);
    const inputValue = watch('coach_location', '');

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

    /**
     * !Drop Down api setting
     */
    /**
     * !Drop Down api setting
     */

    const [error, setErrors] = useState({ image: '',certificate:'' });
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (!file) return;
    
        let errorMessage = '';
        if(name == 'image'){
            if(file.type === 'application/image'){
                return "Please Upload image png jpg file"
            }else if (name === 'image' && file.size > 180 * 1024) { // 180 KB limit
                errorMessage = 'Image size must be less than 180 KB.';
            }
        }
        // }else if (name === 'certificate') {
        //     if (file.type !== 'application/pdf') {
        //         errorMessage = 'Please upload a valid PDF file.';
        //     } else if (file.size > 50 * 1024 * 1024) {
        //         errorMessage = 'PDF size must be less than 50 MB.';
        //     }
        // }
    
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };
    const handleCertificate = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (!file) return;
    
        let errorMessage = '';
        if (name === 'certificate') {
            if (file.type !== 'application/pdf') {
                errorMessage = 'Please upload a valid PDF file.';
            } else if (file.size > 50 * 1024 * 1024) {
                errorMessage = 'PDF size must be less than 50 MB.';
            }
        }
    
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    // Start here again store locaiton in 


    let location = localStorage.getItem('location'); // Use 'let' for reassignment
    if (location) {
        location = location.replace(/"/g, ''); // Remove all double quotes
        location = location.replace(/,/g, ''); // Remove all double quotes
        // const arr = location.split(','); // Split the string by commas
        // const firstRecord = arr[0].trim(); // Get the first element and trim spaces
        // console.log(firstRecord); // Display the first record
        // location = firstRecord; // Reassign 'location' to the first record
        console.log("The Location is " + location);
    } else {
        console.log("No location found in localStorage");
    }

    // That is my Previous Code where get coach id and store in database
    const coach_id = localStorage.getItem('coach_id' || '');

    const user_id = localStorage.getItem('user_id' || '');

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <input type="hidden" value={user_id} {...register('created_by')} />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Coach Name"
                        fullWidth
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                          
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small" error={!!errors.experience}>
                        <InputLabel >Experience</InputLabel>
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
                    type="text"  // Change to 'text' to control input length better
                    label="Phone Number"
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

                <Grid item xs={6} sm={6}>
                    <TextField
                        label="Coach Location"
                        value={location}
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
                <Grid item xs={6} sm={6}>
                    <TextField
                        type='number'
                        label="Session Charges"
                        {...register('per_hour_charges', { 
                            required: 'Coach Charges is required',
                            pattern: {
                                value: /^[0-9]+$/, // Only allows numeric values
                                message: 'Charges must be a number'
                            },
                            min: {
                                value: 1,
                                message: 'Charges must be at least 1'
                            },
                            max: {
                                value: 1000,
                                message: 'Charges must not exceed 1000'
                            }
                        })}
                        fullWidth
                        size="small"
                        error={!!errors.per_hour_charges}
                        helperText={errors.per_hour_charges?.message}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
                <TextField
                    {...register('certificate')}
                    label="Upload Certificate"
                    type="file"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleCertificate}
                    inputProps={{ name: 'certificate' }}
                    error={!!error.certificate}
                    helperText={error.certificate}
                />
            </Grid>
            </Grid>
        </div>
    );
};

export default CoachProfile;
