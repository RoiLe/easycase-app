import React, { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import { Menu } from "lucide-react";
import airplaneImage from "../assets/images/picture.png";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import video1 from "../assets/video/video5.mp4";
import video2 from "../assets/video/video2.mp4";
import video3 from "../assets/video/video3.mp4";

export default function EasyCaseApp() {
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [adIndex, setAdIndex] = useState(0);
  const touchStartX = useRef(null);

  const adImages = [banner1, banner2, banner3];
  const adVideos = [video1, video2, video3];
  const adTexts = [
    "Missed your flight? We turn that into cash.",
    "Your delay, our case. Get compensated easily.",
    "No stress. No fees. Just compensation."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % adImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [adImages.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) setAdIndex((prev) => (prev - 1 + adImages.length) % adImages.length);
    else if (deltaX < -50) setAdIndex((prev) => (prev + 1) % adImages.length);
    touchStartX.current = null;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    date: "",
    location: "",
    ticket: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrorMessage("");
  };

  const validateName = (name) => /^[A-Za-z]{2,20}$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+972\d{9}$/.test(phone);

  const isStepValid = () => {
    switch (step) {
      case 0:
        if (!validateName(formData.firstName) || !validateName(formData.lastName)) {
          setErrorMessage("First and last names must be 2-20 letters only (no digits/symbols). Use English letters.");
          return false;
        }
        return true;
      case 1:
        if (!validateEmail(formData.email) || !validateEmail(formData.confirmEmail)) {
          setErrorMessage("Please enter valid emails with correct format (e.g. name@domain.com).");
          return false;
        }
        if (formData.email !== formData.confirmEmail) {
          setErrorMessage("Emails do not match.");
          return false;
        }
        return true;
      case 2:
        if (!validatePhone(formData.phone)) {
          setErrorMessage("Phone must start with +972 and be followed by 9 digits (e.g. +972501234567).");
          return false;
        }
        return true;
      case 3:
        return formData.date.trim() !== "";
      case 4:
        return formData.location.trim() !== "";
      case 5:
        if (!formData.ticket) {
          setErrorMessage("Please upload your flight ticket.");
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setStep(step + 1);
    }
  };


  const handleSubmit = () => {
    if (!isStepValid()) return;
    const refId = "REF" + Math.floor(100000 + Math.random() * 900000);
    setReference(refId);
    console.log("Submitted Data:", formData);
  };

  const steps = [
    <>
      <Input name="firstName" placeholder="First Name" onChange={handleChange} />
      <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
    </>,
    <>
      <Input name="email" placeholder="Email" onChange={handleChange} />
      <Input name="confirmEmail" placeholder="Confirm Email" onChange={handleChange} />
    </>,
    <>
      <Input name="phone" placeholder="Phone Number (e.g. +972501234567)" onChange={handleChange} />
    </>,
    <>
      <Input name="date" type="date" onChange={handleChange} />
    </>,
    <>
      <Input name="location" placeholder="Where did it happen?" onChange={handleChange} />
    </>,
    <>
      <Input name="ticket" type="file" onChange={handleChange} />
      <Button onClick={handleSubmit}>Submit</Button>
    </>,
  ];

const [menuOpen, setMenuOpen] = useState(false);

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};

return (
        <div className="bg-gradient-to-b from-sky-100 to-white min-h-screen flex flex-col text-center font-sans">
                <header className="p-4 bg-sky-300 shadow-md flex justify-between items-center sticky top-0 z-50">
                        <div className="text-2xl font-extrabold tracking-tight text-gray-800">easyCase</div>
                        <div className="relative">
                                <Button variant="ghost" onClick={() => setMenuOpen((prev) => !prev)}>
                                        <Menu />
                                </Button>
                                {menuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                                <ul className="flex flex-col">
                                                        <li>
                                                                <a
                                                                        href="#about"
                                                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                                        onClick={() => {
                                                                                scrollToSection("about");
                                                                                setMenuOpen(false);
                                                                        }}
                                                                >
                                                                        About Us
                                                                </a>
                                                        </li>
                                                        <li>
                                                                <a
                                                                        href="#eligibility"
                                                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                                        onClick={() => {
                                                                                scrollToSection("eligibility");
                                                                                setMenuOpen(false);
                                                                        }}
                                                                >
                                                                        Eligibility
                                                                </a>
                                                        </li>
                                                        <li>
                                                                <a
                                                                        href="#status"
                                                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                                        onClick={() => {
                                                                                scrollToSection("status");
                                                                                setMenuOpen(false);
                                                                        }}
                                                                >
                                                                        Status Check
                                                                </a>
                                                        </li>
                                                        <li>
                                                                <a
                                                                        href="#contact"
                                                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                                        onClick={() => {
                                                                                scrollToSection("contact");
                                                                                setMenuOpen(false);
                                                                        }}
                                                                >
                                                                        Contact Us
                                                                </a>
                                                        </li>
                                                </ul>
                                        </div>
                                )}
                        </div>
                </header>

                {/* Advertising Section */}
                <section
                    className="relative flex flex-col-reverse md:flex-row items-center justify-center px-6 py-12 min-h-screen bg-sky-50"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <video
                        key={adIndex}
                        src={adVideos[adIndex]} // Replace adImages with the video paths
                        autoPlay
                        loop
                        muted
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{adTexts[adIndex]}</h1>
                        <div className="flex gap-2 justify-center">
                            {adImages.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                        idx === adIndex ? "bg-white scale-125" : "bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Company Information Section */}
                <section className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-5rem)] px-6 py-12 bg-sky-100" id="about">
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                                <img
                                        src={airplaneImage}
                                        alt="Airplane"
                                        className="rounded-xl object-cover h-48 w-48 md:h-64 md:w-96"
                                />
                        </div>
                        <div className="w-full md:w-1/2 text-left mt-8 md:mt-0 md:pl-12">
                                <h1 className="text-3xl md:text-4xl font-bold text-sky-700 mb-4">Who are we?</h1>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                                        Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                                        Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                                </p>
                        </div>
                </section>

                {/* Eligibility Section */}
                <section className="min-h-[80vh] p-6 bg-sky-200 flex items-center justify-center" id="eligibility">
                        <div className="w-full max-w-md">
                                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Initial Eligibility Check</h2>
                                <Card className="p-4 border border-gray-200">
                                        <CardContent className="flex flex-col gap-4">
                                                {reference ? (
                                                        <div>
                                                                <p className="text-green-600 font-bold text-lg text-center">Reference ID: {reference}</p>
                                                        </div>
                                                ) : (
                                                        <>
                                                                {React.cloneElement(steps[step], { key: step })}
                                                                {errorMessage && <p className="text-sm text-red-600 mt-2">{errorMessage}</p>}
                                                                <div className="flex justify-between gap-4 mt-3">
                                                                        {step > 0 ? (
                                                                                <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
                                                                        ) : <span />}
                                                                        {step < steps.length - 1 && (
                                                                                <Button className="ml-auto" onClick={handleNext}>Next</Button>
                                                                        )}
                                                                </div>
                                                        </>
                                                )}
                                        </CardContent>
                                </Card>
                        </div>
                </section>

                {/* Status Check Section */}
                <section className="p-6 bg-sky-300" id="status">
                        <h2 className="text-2xl font-semibold text-gray-800">Status Check</h2>
                        <p className="text-sm text-gray-700">Coming soon...</p>
                </section>

                {/* Contact Section */}
                <section className="p-6 bg-sky-100" id="contact">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Contact Us</h2>
                        <div className="flex flex-col items-center">
                                <p className="text-gray-700 text-lg mb-4">Have questions? We're here to help!</p>
                                <form className="w-full max-w-md flex flex-col gap-4">
                                        <Input name="contactName" placeholder="Your Name" />
                                        <Input name="contactEmail" placeholder="Your Email" />
                                        <textarea
                                                name="contactMessage"
                                                placeholder="Your Message"
                                                className="border border-gray-300 rounded-md p-2 h-32 resize-none"
                                        />
                                        <Button className="mt-2">Send Message</Button>
                                </form>
                        </div>
                </section>
                <footer className="p-4 bg-gray-100 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} easyCase. All rights reserved.
                </footer>
        </div>
);



}