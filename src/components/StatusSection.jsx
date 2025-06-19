// src/components/StatusSection.jsx
import React, { useState, useRef, useEffect } from "react";
import Input from "../ui/Input";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import Button from "../ui/Button";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig"; // adjust path if needed
import { useTranslation } from 'react-i18next';




const db = getFirestore(app);

const STAGES = [
  "Eligibility Questionnaire",
  "Customer Confirmation",
  "Phone Call",
  "Warning Letter",
  "Court claim decision",
  "Not necessary: ​​Court appeal",
  "Not necessary: Final Judgment"
];

const DURATIONS = [
  "15 minutes",
  "5 minutes",
  "30 minutes",
  "3-6 days",
  "30-60 days",
  "30 days",
  "60 days"
];



export default function StatusSection() {
  const { t } = useTranslation();

  const [ref, setRef] = useState("");
  const [status, setStatus] = useState(null);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  const currentStep = status?.currentStep;

  useEffect(() => {
    if (currentStep != null && cardRefs.current[currentStep]) {
      requestAnimationFrame(() => {
        const container = scrollRef.current;
        const card = cardRefs.current[currentStep];
        if (container && card) {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const containerCenter = container.offsetWidth / 2;
          container.scrollTo({
            left: cardCenter - containerCenter,
            behavior: "smooth"
          });
        }
      });
    }
  }, [currentStep]);

  const handleCheckStatus = async () => {
    try {
      const q = query(
        collection(db, "eligibilitySubmissions"),
        where("referenceId", "==", ref.trim())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const currentStep = docData.status ?? 0;

        const newStatus = {
          currentStep,
          comments: Array(STAGES.length).fill("")
        };

        setStatus(newStatus);
      } else {
        alert("Reference ID not found.");
      }
    } catch (error) {
      console.error("Error fetching status from Firestore:", error);
      alert("An error occurred while checking status.");
    }
  };

  //const statusTitle= t("statusTitle", { returnObjects: true })

  return (
    <section className="py-12 px-6 bg-neutral-400 from-white to-sky-100" id="status">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          <span role="img" aria-label="Bar chart">📊</span> {t("statusTitle")}
        </h2>

        {/* Description */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">About the Process</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan, justo at suscipit euismod,
            lacus urna sodales lacus, nec dapibus odio risus vitae magna. In hac habitasse platea dictumst.
          </p>
        </div>

        {/* Status checker */}
        <div className="bg-white shadow-md p-6 rounded-lg max-w-md mx-auto">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">
            <span role="img" aria-label="Magnifying glass">🔍</span> Enter Your Reference Number
          </h4>
          <div className="flex gap-2 items-center flex-col sm:flex-row">
            <Input
              placeholder="e.g. REF123456"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              className="flex-grow mb-2 sm:mb-0"
            />
            <Button onClick={handleCheckStatus}>Check</Button>
          </div>
          <p className="p-4 text-lg mb-2 mt-4">
            Don't have a reference number yet? Fill out the questionnaire
          </p>
        </div>

        {/* Diagram with steps - scroll only on mobile */}
        <div className="overflow-x-auto md:overflow-x-visible">
          <div ref={scrollRef} className="flex gap-4 my-10 w-max px-2 md:w-full md:justify-between">
            {STAGES.map((stage, idx) => (
              <Card
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`min-w-[180px] md:min-w-0 flex-1 bg-amber-100 flex-shrink-0 h-full flex flex-col justify-between ${
                  status?.currentStep === idx ? "border-black border-2 bg-green-100" : "border border-gray-300"
                }`}
              >
                <CardContent className="flex flex-col h-full">
                  <h3 className="text-md font-semibold mb-2">{stage}</h3>
                  <p className="text-sm text-gray-500 italic mb-2">
                    Duration: {DURATIONS[idx]}
                  </p>
                  <p className="text-sm text-gray-700">
                    {status?.comments[idx] || "No updates yet."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}
