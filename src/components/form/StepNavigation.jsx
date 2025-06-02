// components/Form/StepNavigation.jsx
import React from "react";
import Button from "../../ui/Button";

export default function StepNavigation({ step, totalSteps, onBack, onNext, onSubmit, showSubmit, errorMessage }) {
  return (
    <>
      {errorMessage && <p className="text-sm text-red-600 mt-2">{errorMessage}</p>}
      <div className="flex justify-between gap-4 mt-3">
        {step > 0 ? (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}

        {step < totalSteps - 1 && !showSubmit && (
          <Button className="ml-auto" onClick={onNext}>
            Next
          </Button>
        )}

        {showSubmit && (
          <Button className="ml-auto" onClick={onSubmit}>
            Submit
          </Button>
        )}
      </div>
    </>
  );
}
