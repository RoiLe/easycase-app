// src/components/EligibilityForm.jsx
import React, { useState } from "react";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import Button from "../ui/Button";
import { submitFormData } from "../firebase/firebaseService";
import { getSteps, questions } from "./form/formUtils";
import { isStepValid } from "./form/validation";

export default function EligibilityForm() {
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    countryCode: "+972",
    phoneNumber: "",
    date: "",
    location: "",
    ticket: null,
  });

  const steps = getSteps(formData, setFormData);
  const progress = Math.round((step / (steps.length)) * 100);

  const handleBack = () => {
    setStep(step - 1);
    setErrorMessage("");
  };

  const handleNext = () => {
    if (!isStepValid(step, formData, setErrorMessage, questions, steps.length)) return;
    setStep(step + 1);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (!isStepValid(step, formData, setErrorMessage, questions, steps.length)) return;
    const refId = "REF" + Math.floor(100000 + Math.random() * 900000);
    setReference(refId);
    try {
      await submitFormData(formData, refId);
      console.log("Submitted Data:", formData);
    } catch (error) {
      console.error("Submission failed:", error);
      setErrorMessage("Submission failed. Please try again.");
    }
  };

  return (
    <section className="min-h-[80vh] p-6 bg-white flex items-center justify-center" id="eligibility">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          <span role="img" aria-label="Bar chart">📊</span> Eligibility Questionnaire
        </h2>

        {/* Description */}
        <div className="mb-10">
          <p className="text-gray-600">
            Please fill out the form below to check your eligibility for compensation. Your data is secure and will be used only for this purpose.
            At the end of this questionnaire you will receive your reference ID, With it you can follow the process.
          </p>
        </div>

        <p className="text-gray-600 text-sm text-center mb-6">
          <span className="text-blue-600 font-medium">We will never share your data with third parties.</span>
        </p>
       

        <Card className="p-4 border border-gray-200">
          <CardContent className="flex flex-col gap-4">
            {reference ? (
              <div className="text-center">
                <p className="text-green-600 font-bold text-lg">Reference ID: {reference}</p>
                <p className="mt-2 text-gray-700">
                <span role="img" aria-label="Celebration">🎉</span> Your submission has been received!
                </p>
                <p className="text-gray-600">
                  With this reference number you can track the process.
              </p>
              </div>
            ) : (
              <>
                {steps[step]}
                {errorMessage && <p className="text-sm text-red-600 mt-2">{errorMessage}</p>}
                <div className="flex justify-between gap-4 mt-3">
                  {step > 0 ? (
                    <Button variant="outline" onClick={handleBack}>Back</Button>
                  ) : <span />}
                  {step < steps.length - 1 ? (
                    <Button className="ml-auto" onClick={handleNext}>Next</Button>
                  ) : (
                    <Button className="ml-auto" onClick={handleSubmit}>Submit</Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

         {/* Progress Bar */}
        {!reference && (
          <div className="mt-2 mb-4">
            <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-blue-900 mt-1 font-medium">{progress}% completed</p>
          </div>
        )}
      </div>
    </section>
  );
}
