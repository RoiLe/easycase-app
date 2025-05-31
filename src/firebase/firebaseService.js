import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app, db } from "./firebaseConfig";

const storage = getStorage(app);

export const submitFormData = async (formData, referenceId) => {
  try {
    let ticketUrl = null;

    // ✅ Upload file if exists
    if (formData.ticket) {
      const storageRef = ref(storage, `tickets/${referenceId}_${formData.ticket.name}`);
      //await uploadBytes(storageRef, formData.ticket);
      const uploadTask = uploadBytesResumable(storageRef, formData.ticket);
      await uploadTask;
      ticketUrl = await getDownloadURL(storageRef);
    }

    // ✅ Create Firestore-safe version of data
    const { ticket, ...cleanData } = formData;

    await addDoc(collection(db, "eligibilitySubmissions"), {
      ...cleanData,
      ticket: ticketUrl,
      referenceId,
      timestamp: new Date().toISOString(),
    });

    console.log("✅ Data saved and file uploaded.");
  } catch (error) {
    console.error("❌ Error saving data to Firestore:", error);
    throw error;
  }
};
