import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section className="p-6 bg-white" id="contact">
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
  );
}
