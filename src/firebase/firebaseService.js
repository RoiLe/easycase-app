// src/firebase/firebaseService.js
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const submitFormData = async (formData, referenceId) => {
  try {
    // Clone formData and strip out the File object (ticket)
    const { ticket, ...cleanFormData } = formData;

    const dataToStore = {
      ...cleanFormData,
      referenceId,
      timestamp: new Date().toISOString(),
    };

    await addDoc(collection(db, "eligibilitySubmissions"), dataToStore);
    console.log("✅ Data saved to Firestore:", dataToStore);
  } catch (error) {
    console.error("❌ Error saving data to Firestore:", error);
    throw error;
  }
};
