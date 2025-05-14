import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import coach from '../../public/StepContent/coach.jpg';
import booking from '../../public/StepContent/bookingcoach.jpg';
import motivatation from '../../public/StepContent/motivitation.jpg';
import team from '../../public/StepContent/team.jpg';

const steps = [
  {
    label: 'Progress Record',
    description: `Track Your Athletic Growth with Precision
Stay motivated by reviewing detailed progress reports, performance metrics, and training history tailored to your fitness journey.`,
    img: coach
  },
  {
    label: 'Book Coach',
    description: 'Find the Perfect Coach for Your Goals\nBrowse our expert coaches and book your personalized session today',
    img: booking
  },

  {
    label: 'Training Programs',
    description:
      'Unlock Your Full Potential with Customized Training. Explore structured training programs designed by expert coaches to improve skills, boost performance, and achieve your fitness goals—no matter your level.',
    img: team
  },

  {
    label: 'Discussion with Coach',
    description:
      'Stay Connected and Informed. Engage in one-on-one or group discussions with your coach to ask questions, get feedback, and stay on track with your training goals. Clear communication leads to better results.',
    img: motivatation
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
    <Box sx={{ maxWidth: 1000 }}>
      <div className="text-center mb-12 mt-12">
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Feature{" "}
          <span className="text-indigo-600">Services</span>
        </h3>
      </div>
      <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', gap: 4 }}>
        {/* Vertical Stepper on Left */}
        <Box sx={{ width: 200, display: 'flex', justifyContent: 'flex-end' }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { fontWeight: 500 } }}>
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Main Card in Center */}
        <Box sx={{
          flex: 1,
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.default',
          boxShadow: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 3,
          minWidth: 1000,
          minHeight: 400 // Ensures consistent card height
        }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {activeStep === steps.length ? (
              <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
                  Process Completed!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  You've successfully finished all steps.
                </Typography>
              </Box>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                alignItems: 'center',
                flex: 1
              }}>
                {/* Image */}
                <Box sx={{
                  flex: 1,
                  height: 250,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#f9f9f9',
                  borderRadius: 1,
                  overflow: 'hidden'
                }}>
                  <img
                    src={steps[activeStep].img}
                    alt={steps[activeStep].label}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>

                {/* Description */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ textAlign: 'left' }}>
                    {steps[activeStep].description}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {activeStep === steps.length ? (
              <Button
                variant="contained"
                onClick={() => setActiveStep(0)}
                sx={{ px: 4, minWidth: 120 }}
              >
                Start Over
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ px: 4, minWidth: 120 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ px: 4, minWidth: 120 }}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default About_Section_Mission