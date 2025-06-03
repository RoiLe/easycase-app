// src/components/StatusSection.jsx
import React, { useState } from "react";
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

  const handleCheckStatus = () => {
    // Replace this logic with real backend integration
    setStatus({
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
    });
  };

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-sky-100" id="status">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Track Your Claim Status</h2>

        {/* Diagram with steps */}
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-stretch my-10">
          {STAGES.map((stage, idx) => (
            <Card key={idx} className={`flex-1 ${status?.currentStep === idx ? "border-blue-500 border-2" : ""}`}>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">{stage}</h3>
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
          <h4 className="text-lg font-semibold mb-3 text-gray-800">Enter Your Reference Number</h4>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="e.g. REF123456"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleCheckStatus}>Check</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
