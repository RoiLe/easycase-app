import React from "react";
import Input from "../../ui/Input";
import Card from "../../ui/Card";
import CardContent from "../../ui/CardContent";

export const questions = [
  { title: "🛫 Flight Details", questions: [
    "What was the flight number?",
    "What was the scheduled date and time of the flight?",
    "What was the actual date and time of the flight (if it occurred)?",
    "What was the route of the flight (country, airports)?"
  ] },
  { title: "🧭 Type of Disruption", questions: [
    "Was the flight cancelled, delayed, or changed?",
    "How many hours/days was the delay?",
    "Were you notified in advance? If so – when and how?",
    "Did you receive any additional services (hotel, food, phone)?"
  ] },
  { title: "🎒 Additional Issues", questions: [
    "Was there any issue with your luggage? (delay, loss, damage)",
    "Was there a downgrade in the flight conditions compared to what was promised?"
  ] },
  { title: "💬 Documentation", questions: [
    "Do you have a flight ticket, check-in confirmation, delay confirmation, photos, messages, or communication with the airline?",
    "Did you submit an official complaint to the airline? Did you receive a response?"
  ] },
  { title: "💸 Financial Info", questions: [
    "Did you incur any expenses or financial losses? How much?",
    "Did the airline offer any compensation?"
  ] }
];

export function getSteps(formData, setFormData) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return [
    <div key="name">
      <Input name="firstName" placeholder="First Name" onChange={handleChange} />
      <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
    </div>,
    <div key="email">
      <Input name="email" placeholder="Email" onChange={handleChange} />
      <Input name="confirmEmail" placeholder="Confirm Email" onChange={handleChange} />
    </div>,
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
    <div key="date">
      <Input name="date" type="date" onChange={handleChange} />
    </div>,
    <div key="location">
      <Input name="location" placeholder="Where did it happen?" onChange={handleChange} />
    </div>,
    ...questions.flatMap((section, sectionIndex) =>
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
    ),
    <div key="ticket-upload">
      <Input name="ticket" type="file" onChange={handleChange} />
    </div>
  ];
}
