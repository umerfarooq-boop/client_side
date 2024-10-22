import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField, Grid } from "@mui/material";

const AcademyDetailsForm = () => {
  const { register, formState: { errors } } = useFormContext();

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
