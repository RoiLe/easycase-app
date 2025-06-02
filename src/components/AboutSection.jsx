import React from "react";
import team1 from "../assets/images/portrait1.jpg";
import team2 from "../assets/images/portrait2.jpg";
import team3 from "../assets/images/portrait3.jpg";

export default function AboutSection() {
  return (
    <section className="py-12 bg-white text-center" id="about">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Who Are We?</h2>
        <p className="text-gray-700 text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
          Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
        </p>

        {/* Team photos always side by side */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          {[team1, team2, team3].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Team member ${i + 1}`}
              className="w-[30%] min-w-[100px] max-w-[160px] h-auto object-cover rounded shadow-md"
            />
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-6">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="text-green-500 hover:text-green-600 text-2xl"
        >
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.12 2.51 7.19L4 29l7.09-2.47A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.5c-2.13 0-4.22-.62-5.98-1.8l-.43-.27-4.21 1.47 1.41-4.09-.28-.44A9.97 9.97 0 0 1 6 15c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.27-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.27 1.23.43 1.65.55.69.18 1.32.15 1.82.09.56-.07 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-blue-700 hover:text-blue-800 text-2xl"
        >
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
            <path d="M27 4H5C4.447 4 4 4.447 4 5v22c0 .553.447 1 1 1h22c.553 0 1-.447 1-1V5c0-.553-.447-1-1-1zM11.5 24H8V13h3.5v11zm-1.75-12.25c-1.121 0-2.03-.909-2.03-2.03 0-1.12.909-2.03 2.03-2.03s2.03.91 2.03 2.03c0 1.121-.909 2.03-2.03 2.03zM24 24h-3.5v-5.5c0-1.104-.896-2-2-2s-2 .896-2 2V24H13V13h3.5v1.561C17.26 13.221 18.13 13 19 13c2.21 0 4 1.79 4 4V24z"/>
          </svg>
        </a>
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-blue-600 hover:text-blue-700 text-2xl"
        >
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
            <path d="M29 16c0-7.18-5.82-13-13-13S3 8.82 3 16c0 6.48 4.84 11.82 11 12.82V20.5h-3.3V16H14v-2.5c0-3.07 1.79-4.77 4.53-4.77 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.89V16h3.32l-.53 4.5H17.75v8.32C24.16 27.82 29 22.48 29 16z"/>
          </svg>
        </a>
        {/* X (formerly Twitter) icon */}
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="text-black hover:text-gray-800 text-2xl"
        >
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
            <path d="M25.5 7h-3.1l-5.1 6.7L12.1 7H6.5l6.7 9.7L6.2 25h3.1l5.4-7.2 5.3 7.2h5.6l-7-10.1L25.5 7zm-4.2 15l-3.8-5.2-3.9 5.2H8.8l5.7-7.7-6-8.3h3.1l3.5 4.8 3.4-4.8h3.1l-5.9 8.1 5.7 7.9h-3.1z"/>
          </svg>
        </a>
       
      </div>
    </section>
  );
}
