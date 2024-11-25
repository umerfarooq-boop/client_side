import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField, Grid } from "@mui/material";

const AcademyDetailsForm = () => {
  const { register, formState: { errors } } = useFormContext();
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
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Academy Name"
            {...register("academy_name", { required: "Academy name is required" })}
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
            {...register("address", { required: "Address is required" })}
            fullWidth
            size="small"
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            {...register("academy_phonenumber", { 
              required: "Phone Number is required",
              pattern: {
                value: /^[0-9]{10}$/, // Adjust this regex based on your phone number format
                message: "Invalid phone number format (10 digits required)",
              },
            })}
            fullWidth
            size="small"
            error={!!errors.academy_phonenumber}
            helperText={errors.academy_phonenumber?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register('academy_certificate')}
            label="Academy Certificate"
            type="file"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            // helperText="Upload Academy Certificate"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AcademyDetailsForm;
