// src/components/StatusSection.jsx
import React, { useState, useRef, useEffect } from "react";
import Input from "../ui/Input";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import Button from "../ui/Button";

const STAGES = [
  "Eligibility Questionnaire",
  "Customer Confirmation",
  "Warning Letter",
  "Judgment",
  "Claim Letter (Optional)",
  "Final Judgment (Optional)"
];

export default function StatusSection() {
  const [ref, setRef] = useState("");
  const [status, setStatus] = useState(null);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

const currentStep = status?.currentStep;

useEffect(() => {
  if (currentStep != null && cardRefs.current[currentStep]) {
    const container = scrollRef.current;
    const card = cardRefs.current[currentStep];
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const containerCenter = container.offsetWidth / 2;
    container.scrollTo({ left: cardCenter - containerCenter, behavior: "smooth" });
  }
}, [currentStep]);


  const handleCheckStatus = () => {
    const newStatus = {
      currentStep: 2, // for example
      comments: [
        "Received questionnaire.",
        "Awaiting confirmation.",
        "Warning letter sent.",
        "Judgment pending.",
        "Claim letter optional.",
        "Final judgment pending."
      ],
      durations: ["2 days", "1 day", "3 days", "-", "-", "-"]
    };
    setStatus(newStatus);

    setTimeout(() => {
      const container = scrollRef.current;
      if (container && container.children[newStatus.currentStep]) {
        const card = container.children[newStatus.currentStep];
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const containerCenter = container.offsetWidth / 2;
        container.scrollTo({ left: cardCenter - containerCenter, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-sky-100" id="status">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
        <span role="img" aria-label="Bar chart">📊</span> Track Your Claim Status
        </h2>

        {/* Diagram with steps - scroll only on mobile */}
        <div className="overflow-x-auto md:overflow-x-visible">
          <div ref={scrollRef} className="flex gap-4 my-10 w-max px-2 md:w-full md:justify-between">
            {STAGES.map((stage, idx) => (
              <Card
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`min-w-[180px] md:min-w-0 flex-1 bg-amber-100 flex-shrink-0 h-full flex flex-col justify-between ${
                  status?.currentStep === idx ? "border-black border-2" : "border border-gray-300"
                }`}
              >
                <CardContent className="flex flex-col h-full">
                  <h3 className="text-md font-semibold mb-2">{stage}</h3>
                  <p className="text-sm text-gray-500 italic mb-2">
                    Duration: {status?.durations[idx] || "-"}
                  </p>
                  <p className="text-sm text-gray-700">
                    {status?.comments[idx] || "No updates yet."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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
        </div>
      </div>
    </section>
  );
}
