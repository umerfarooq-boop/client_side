import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
    {
      label: 'Progress Record',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5cDfE482s_Hp2bBTNz5e2WBGecDJEsmC46Q&s'
    },
    {
      label: 'Book Coach',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXm33IIPEAhmE6yztvEuEHuL1MVDIjCB4SIkSrP6ZUjO7VNpUpmwnYJXc5LY0iCJ3o0cM&usqp=CAU'
    },
    {
      label: 'Training Programs',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
        img:'https://blogs.bmj.com/bjsm/files/2015/02/8084325613_86489343de_k.jpg'
    },
    {
      label: 'Discussion with Coach',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
        img:'https://www.contus.com/blog/wp-content/uploads/2023/11/how-chat-system-works.webp'
    },
  ];

function About_Section_Mission() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    return (
      <Box sx={{ maxWidth: 400 }}>
        <div className="text-center mb-16 mt-16">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Feature{" "}
              <span className="text-indigo-600">Services</span>
            </h3>
        </div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <img src={step.img} alt="" />
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
        //   <Paper square elevation={0} sx={{ p: 3 }}>
        //     <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
        //   </Paper>
        )}
      </Box>
    )
}

export default About_Section_Mission