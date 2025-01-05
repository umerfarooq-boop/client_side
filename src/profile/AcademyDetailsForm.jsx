import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextField, Grid,InputAdornment  } from '@mui/material';

const AcademyDetailsForm = () => {
  const { register,watch, formState: { errors } } = useFormContext();
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

    const [error, setErrors] = useState({ academy_certificate: '' });

const handleAcademyeChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    let errorMessage = '';
    if (name === 'academy_certificate') {
      if (file.type !== 'application/pdf') {
          errorMessage = 'Please upload a valid PDF file.';
      } else if (file.size > 50 * 1024 * 1024) {
          errorMessage = 'PDF size must be less than 50 MB.';
      }
  }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));


    
};
  return (
          <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
        label="Academy Name"
        {...register("academy_name", {
          required: "Academy Name is required",
          minLength: {
            value: 3,
            message: "Academy must be at least 3 characters",
          },
          pattern: {
            value: /^[A-Za-z\s]+(,\s?[0-9]+)?$/, // Regex for strings with letters, spaces, and optional comma followed by numbers
            message: "Academy must contain only letters, spaces, and an optional comma with numbers",
          },
        })}
        fullWidth
        size="small"
        error={!!errors.academy_name}
        helperText={errors.academy_name?.message}
      />

        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Academy Location"
            {...register("academy_location", { required: "Academy location is required" })}
            fullWidth
            value={location}
            size="small"
            error={!!errors.academy_location}
            helperText={errors.academy_location?.message}
          />
        </Grid>

        <Grid item xs={12}>
        <TextField
  label="Address"
  {...register("address", { 
    required: "Address is required", 
  })}
  fullWidth
  size="small"
  error={!!errors.address}
  helperText={errors.address?.message}
/>


        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
    type="text"
    label="Phone Number"
    {...register('academy_phonenumber', {
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
    error={!!errors.academy_phonenumber}
    helperText={errors.academy_phonenumber?.message}
    onInput={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Replace non-numeric characters
    }}
/>



        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
    {...register('academy_certificate')}
    label="Upload Image"
    type="file"
    fullWidth
    size="small"
    InputLabelProps={{ shrink: true }}
    onChange={handleAcademyeChange}
    inputProps={{ name: 'academy_certificate' }} // Make sure this matches the state field name
    error={!!error.academy_certificate}  // Use the correct error key here
    helperText={error.academy_certificate} // Use the correct error key here
/>
        </Grid>
      </Grid>
    </div>
  );
};

export default AcademyDetailsForm;
