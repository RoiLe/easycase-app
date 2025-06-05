// src/firebase/firebaseService.js
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const submitFormData = async (formData, referenceId) => {
  try {
    const { ticket, countryCode, phoneNumber, ...rest } = formData;

    const fullPhone = `${countryCode}${phoneNumber}`;

    const dataToStore = {
      ...rest,
      phone: fullPhone,
      referenceId,
      status: 0, // Initial status
      timestamp: new Date().toISOString(),
    };

    await addDoc(collection(db, "eligibilitySubmissions"), dataToStore);
    console.log("✅ Data saved to Firestore:", dataToStore);
  } catch (error) {
    console.error("❌ Error saving data to Firestore:", error);
    throw error;
  }
};
