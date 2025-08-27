"use client";

import { LocationEditIcon, Mail, SpeakerIcon } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Replace with API call
    alert("Form submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-200 to-white text-black px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left side: Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bol text-primary-color font-semibold font-Jost">
              Contact us
            </h2>
            <p className="text-gray-600 mt-2">
              Whatever your goal – we will get you there.
            </p>
          </div>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <span className="text-2xl">
                <LocationEditIcon className="text-primary-color"/>
              </span>
              <div>
                <p className="font-semibold">Our address:</p>
                <p>
                  8 Octavia St,
                  <br />
                  San Francisco, CA 94108, United States
                </p>
                <p className="mt-2">
                  5-A Constitution Ave,
                  <br />
                  F-5/1, ICT, 44000, PK
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <span className="text-2xl">
                <Mail className="text-primary-color"/>
              </span>
              <div>
                <p className="font-semibold">Email us:</p>
                <p>info@deltadroplet.com</p>
              </div>
            </div>

            {/* Hiring Notice */}
            <div className="flex items-start space-x-4">
              <span className="text-2xl">
                <SpeakerIcon className="text-primary-color"/>
              </span>
              <div>
                <p className="font-semibold">We're hiring</p>
                <p>
                  We're thrilled to announce that we're expanding our team and
                  looking for talented individuals like you to join us. Send us
                  your CV today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
          ></textarea>
          <p className="text-sm text-gray-500">All fields are required</p>

          <button
            type="submit"
            className="relative overflow-hidden h-10 px-4 py-1 group rounded-sm text-white text-sm font-medium flex items-center justify-center gap-2 bg-primary-color"
          >
            <span className="absolute inset-0  transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 bg-black"></span>
            <span className="relative z-10 flex items-center gap-2 tracking-wider">
              Submit<span className="ml-1"> → </span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
