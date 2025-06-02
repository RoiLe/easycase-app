// src/components/form/validation.js
//import { questions } from "./form/formUtils"; // adjust path based on your structure


export const isStepValid = (step, formData, setErrorMessage, questions, totalSteps) => {
  // Step 0: Name validation
  if (step === 0) {
    const validFirst = /^[A-Za-z]{2,20}$/.test(formData.firstName);
    const validLast = /^[A-Za-z]{2,20}$/.test(formData.lastName);
    if (!validFirst || !validLast) {
      setErrorMessage("First and last names must be 2-20 letters only (English letters only).");
      return false;
    }
    return true;
  }

  // Step 1: Email validation
  if (step === 1) {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const confirmValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.confirmEmail);
    if (!emailValid || !confirmValid) {
      setErrorMessage("Please enter valid emails.");
      return false;
    }
    if (formData.email !== formData.confirmEmail) {
      setErrorMessage("Emails do not match.");
      return false;
    }
    return true;
  }

  // Step 2: Phone validation
  if (step === 2) {
    const regexMap = {
      "+972": /^\d{9}$/,
      "+1": /^\d{10}$/,
      "+44": /^\d{10}$/,
      "+33": /^\d{9}$/,
      "+49": /^\d{10}$/,
    };
    const phoneRegex = regexMap[formData.countryCode];
    if (!phoneRegex || !phoneRegex.test(formData.phoneNumber)) {
      setErrorMessage("Phone number is invalid for selected country.");
      return false;
    }
    return true;
  }

  // Step 3: Date
  if (step === 3) {
    if (!formData.date?.trim()) {
      setErrorMessage("Please select a date.");
      return false;
    }
    return true;
  }

  // Step 4: Location
  if (step === 4) {
    if (!formData.location?.trim()) {
      setErrorMessage("Please enter a location.");
      return false;
    }
    return true;
  }

  // Dynamic questions: steps 5 to (5 + total questions - 1)
  const DYNAMIC_START = 5;
  const totalDynamicQuestions = questions.reduce((acc, section) => acc + section.questions.length, 0);
  const dynamicStepEnd = DYNAMIC_START + totalDynamicQuestions;

  if (step >= DYNAMIC_START && step < dynamicStepEnd) {
    const dynamicIndex = step - DYNAMIC_START;
    let sectionIndex = 0;
    let questionIndex = dynamicIndex;
    for (let i = 0; i < questions.length; i++) {
    const qCount = questions[i].questions.length;
    if (questionIndex < qCount) {
        sectionIndex = i;
        break;
    }
    questionIndex -= qCount;
    }
    const key = `answer_${sectionIndex}_${questionIndex}`;

    console.log("step", step);
    console.log("Dynamic key:", key, "Value:", formData[key]);
    if (!formData[key] || formData[key].trim() === "") {
      setErrorMessage("Please answer the question.");
      return false;
    }
    return true;
  }

  // Final ticket upload
  if (step === totalSteps - 1) {
    if (!formData.ticket) {
      setErrorMessage("Please upload your flight ticket.");
      return false;
    }
    return true;
  }

  return true; // fallback
};
