import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import AdBanner from "./components/AdBanner";
import AboutSection from "./components/AboutSection";
import EligibilityForm from "./components/EligibilityForm";
import StatusSection from "./components/StatusSection";
import ContactSection from "./components/ContactSection";
import banner1 from "./assets/images/banner1.png";
import banner2 from "./assets/images/banner2.png";
import banner3 from "./assets/images/banner3.png";
import video1 from "./assets/video/video5.mp4";
import video2 from "./assets/video/video2.mp4";
import video3 from "./assets/video/video3.mp4";

export default function EasyCaseApp() {
  const [adIndex, setAdIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStartX = useRef(null);

  const adImages = [banner1, banner2, banner3];
  const adVideos = [video1, video2, video3];
  const adTexts = [
    "Missed your flight? We turn that into cash.",
    "Your delay, our case. Get compensated easily.",
    "No stress. No fees. Just compensation."
  ];

  useEffect(() => {
    const interval = setInterval(() => setAdIndex((i) => (i + 1) % adImages.length), 4000);
    return () => clearInterval(interval);
  }, [adImages.length]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) setAdIndex((i) => (i - 1 + adImages.length) % adImages.length);
    else if (deltaX < -50) setAdIndex((i) => (i + 1) % adImages.length);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-b from-sky-100 to-white min-h-screen flex flex-col text-center font-sans">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollToSection={scrollToSection} />
      <AdBanner adVideos={adVideos} adImages={adImages} adIndex={adIndex} adTexts={adTexts} handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} />
      <AboutSection />
      <EligibilityForm />
      <StatusSection />
      <ContactSection />
      <footer className="p-4 bg-gray-100 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} easyCase. All rights reserved.
      </footer>
      {/* Beautiful Floating Button to Eligibility Section */}
      
      <button
        onClick={() => scrollToSection("eligibility")}
        className="fixed bottom-6 right-6 bg-gradient-to-r white to-blue-600 text-black font-semibold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce-slow z-50"
      >
          Questionnaire
      </button>

    </div>
  );
}
