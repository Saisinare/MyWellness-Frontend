import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";

function SignupCard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Form submitted:", finalData);
    // Send finalData to backend here
  };

  return (
    <Card className=" w-1/3 flex h-full flex-col pt-10">
      <div className=" mb-20 p-5">
        <Typography variant="h5" component="h2" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Create your account in two simple steps
        </Typography>
      </div>
      <CardContent className=" w-full">
        {step === 1 && <Step1 onNext={handleNextStep} data={formData} />}
        {step === 2 && (
          <Step2
            onPrev={handlePrevStep}
            onSubmit={handleSubmit}
            data={formData}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default SignupCard;
