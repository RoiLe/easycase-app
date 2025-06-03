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
    <section className="min-h-[80vh] p-6 bg-neutral-400 flex items-center justify-center" id="eligibility">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Eligibility Questionnaire</h2>

        {/* Progress Bar */}
        {!reference && (
          <div className="mb-4">
            <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-blue-900 mt-1 font-medium">{progress}% completed</p>
          </div>
        )}

        <Card className="p-4 border border-gray-200">
          <CardContent className="flex flex-col gap-4">
            {reference ? (
              <div className="text-center">
                <p className="text-green-600 font-bold text-lg">Reference ID: {reference}</p>
                <p className="mt-2 text-gray-700">
                <span role="img" aria-label="Celebration">🎉</span> Your submission has been received!
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
      </div>
    </section>
  );
}
