// components/Form/StepRenderer.jsx
import React from "react";
import Input from "../../ui/Input";
import Card from "../../ui/Card";
import CardContent from "../../ui/CardContent";

export default function StepRenderer({ step, formData, handleChange, questions }) {
  const steps = [
    // Step 0: Name
    <div key="name">
      <Input name="firstName" placeholder="First Name" onChange={handleChange} />
      <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
    </div>,

    // Step 1: Email
    <div key="email">
      <Input name="email" placeholder="Email" onChange={handleChange} />
      <Input name="confirmEmail" placeholder="Confirm Email" onChange={handleChange} />
    </div>,

    // Step 2: Phone
    <div key="phone">
      <div className="flex gap-2">
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleChange}
          className="border p-2 rounded w-1/3"
        >
          <option value="+972">+972 IL</option>
          <option value="+1">+1 USA</option>
          <option value="+44">+44 UK</option>
          <option value="+33">+33 FR</option>
          <option value="+49">+49 GER</option>
        </select>
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-2/3"
        />
      </div>
    </div>,

    // Step 3: Date
    <div key="date">
      <Input name="date" type="date" onChange={handleChange} />
    </div>,

    // Step 4: Location
    <div key="location">
      <Input name="location" placeholder="Where did it happen?" onChange={handleChange} />
    </div>,
  ];

  // Step 5+: dynamic questions
  const dynamicQuestions = questions.flatMap((section, sectionIndex) =>
    section.questions.map((q, questionIndex) => (
      <Card key={`q-${sectionIndex}-${questionIndex}`} className="p-4 border border-gray-300">
        <CardContent>
          <p className="mb-2">{q}</p>
          <Input
            name={`answer_${sectionIndex}_${questionIndex}`}
            value={formData[`answer_${sectionIndex}_${questionIndex}`] || ""}
            onChange={handleChange}
          />
        </CardContent>
      </Card>
    ))
  );

  // Final step: ticket upload
  const ticketStep = (
    <div key="ticket-upload">
      <Input name="ticket" type="file" onChange={handleChange} />
    </div>
  );

  const fullSteps = [...steps, ...dynamicQuestions, ticketStep];
  return fullSteps[step];
}
