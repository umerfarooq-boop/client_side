import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Stepper, Step, StepLabel, Button, Box, Typography } from '@mui/material';
import Main from './Main';
import PlayerProfile from './PlayerProfile';
import CoachProfile from './CoachProfile';
import axios from '../axios';
import ParentDetailsForm from './ParentDetailsForm';
import AcademyDetailsForm from './AcademyDetailsForm';
import Swal from "sweetalert2";
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
const a = "im,er"
const steps = ['Basic Information', 'Player/Coach Information', 'Additional Information'];

const Profile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const navigate = useNavigate();
  const [loading, setLoader] = useState(false);

  const methods = useForm({
    mode: 'onTouched', // Validate fields when they are touched
    criteriaMode: 'all',
  });

  const { handleSubmit, trigger, formState: { errors, isValid, isSubmitted } } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger(); // Manually trigger validation
    if (isStepValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (['academy_certificate', 'image', 'certificate'].includes(key)) {
        if (data[key] && data[key][0]) {
          formData.append(key, data[key][0]); // Append the file if it exists
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      setLoader(true); // Show loader
      const response = await axios.post('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      localStorage.setItem('coach_profile_id',response.data.profile.coach_id);
      // console.log(response.data.profile.coach_id);
      // localStorage.setItem('location',response.data.profile.profile_location);
      localStorage.setItem('player_profile_id',response.data.profile.player_id);
      // localStorage.setItem('playwith',response.data.profile.player.playwith);
      setLoader(false); 

      // if (response.data.url) {
      //   window.location.href = response.data.url;
      // }
      

      Swal.fire({
        title: "Success!",
        text: "Profile Created Successfully",
        icon: "success",  
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          const role = localStorage.getItem('role');
          if(role === 'player'){
            // navigate('/dashboard');
            navigate('/coachpost');
          }else if(role === 'coach'){
            navigate('/');
          } 
          }else if(role === 'admin'){
            navigate('/');
          } 
      });
    } catch (error) {
      console.error(error);
      setLoader(false); 
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Main nextStep={handleNext} setRole={setRole} />;
      case 1:
        return role === 'player' ? (
          <PlayerProfile nextStep={handleNext} />
        ) : (
          <CoachProfile nextStep={handleNext} />
        );
      case 2:
        return role === 'player' ? <ParentDetailsForm /> : <AcademyDetailsForm />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <FormProvider {...methods}>
          <Box
            sx={{
              width: '80%',
              margin: 'auto',
              mt: 4,
              p: 4,
              backgroundColor: '#fff',
              borderRadius: 4,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length ? (
              <Typography variant="h6" align="center">
                All steps completed - you're finished
              </Typography>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 2 }}>{getStepContent(activeStep)}</Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', mt: 3 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="contained"
                    color="secondary"
                    sx={{ width: '50px' }}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? handleSubmit(onSubmit) : handleNext}
                    disabled={!isValid} // Disable the "Next" button if form is not valid
                    sx={{ width: '80px' }}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>

                </Box>
              </form>
            )}
          </Box>
        </FormProvider>
      )}
    </>
  );
};

export default Profile;
