import React from "react";
import airplaneImage from "../assets/images/picture.png";

export default function AboutSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-5rem)] px-6 py-12 bg-neutral-300" id="about">
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
  );
}
