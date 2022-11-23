import * as React from "react"
import axios from "axios"

import Card from '@mui/material/Card'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ServiceDetails from "./ServiceDetails";
import ServicePricing from "./ServicePricing";
import ServicePreview from "./ServicePreview";

import { useRouter } from "next/router"

const steps = ['Service details', 'Pricing', 'Final Preview'];

export default function CreateServiceModal(){
	const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [serviceName, setServiceName] = React.useState("")
  const [serviceDescription, setServiceDescription] = React.useState("")
  const [serviceCategory, setServiceCategory] = React.useState("")
  const [serviceLpw, setServiceLpw] = React.useState("")
  const [servicePrice, setServicePrice] = React.useState("")

  const router = useRouter()

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if(activeStep == 2){
      axios.post("/api/services", {
        price: servicePrice,
        signature: serviceCategory,
        description: serviceDescription,
        title: serviceName,
	      mentoringWeeks: serviceLpw
      }, { withCredentials: true })
      .then((response) => router.replace(`/service/${response.data.response.service.id}`))      
      
	return
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDisabled = () => {
    if(activeStep === 0)
      return (!serviceName || !serviceDescription || !serviceCategory || !serviceLpw) ? true : false
    if(activeStep === 1)
      return !servicePrice ? true : false
  }

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChangeName = (e) => {
    setServiceName(e.target.value)
  }

  const handleChangeDescription = (e) => {
    setServiceDescription(e.target.value)
  }

  const handleChangeCategory = (e) => {
    setServiceCategory(e.target.value)
  }

  const handleChangeLpw = (e) => {
    setServiceLpw(e.target.value)
  }

  const handleChangePrice = (e) => {
    setServicePrice(e.target.value)
  }

	return (
			<Box className="py-6 px-[300px] flex flex-col gap-4 mt-[62px] w-full h-full"> 
          <h2 className="text-lg font-semibold">Create A Service</h2>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <div className="flex flex-col items-center justify-center pb-8">
            {activeStep == 0 && <ServiceDetails 
            handleChangeName={handleChangeName}
            handleChangeDescription={handleChangeDescription}
            handleChangeCategory={handleChangeCategory}
            handleChangeLpw={handleChangeLpw}
            name={serviceName}
            description={serviceDescription}
            category={serviceCategory}
            lpw={serviceLpw}
            />}
            {activeStep == 1 && <ServicePricing
            handleChangePrice={handleChangePrice}
            price={servicePrice}
            />}
            {activeStep == 2 && <ServicePreview
            name={serviceName}
            description={serviceDescription}
            category={serviceCategory}
            lpw={serviceLpw}
            price={servicePrice}
            />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button 
              disabled={handleDisabled()}
              onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Create' : 'Next'}
              </Button>
            </Box>
          </div>
			</Box>
	)
}
