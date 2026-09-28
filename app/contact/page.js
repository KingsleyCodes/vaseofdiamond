"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Property Inquiry");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const topics = [
    "Property Inquiry",
    "Shortlet Booking",
    "List My Property",
    "Investment / Partnership",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect your backend API / Email service here
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-[#D4AF37] selection:text-[#0a1628] flex flex-col justify-between">
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* =========================================================================
          HERO & CONTACT SECTION
      ========================================================================= */}
      <main className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute left-1/4 top-20 h-[350px] w-[500px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-10 h-[300px] w-[450px] rounded-full bg-[#D4AF37]/5 blur-[140px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
           

            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-6">
              Let’s Connect & <br className="hidden sm:block" />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
                Elevate Your Living
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
              Whether you are looking to acquire private estates, book an exclusive shortlet residence, 
              or consult on real estate investments, our team is at your service.
            </p>
          </div>

          {/* Grid Layout: Contact Information vs Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* LEFT SIDE: Contact Details & Office Hours */}
            <div className="lg:col-span-5 space-y-8">
              <div className="rounded-2xl border border-white/10 bg-[#0a1628]/60 p-8 backdrop-blur-xl space-y-8">
                <h2 className="text-xl font-semibold text-white tracking-wide border-b border-white/10 pb-4">
                  Direct Contact
                </h2>

                {/* Office Location */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3.5 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <MapPinIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                      Head Office
                    </h3>
                    <p className="text-sm font-medium text-white">
                      Central Business District
                    </p>
                    <p className="text-xs text-gray-400">Abuja, Federal Capital Territory, Nigeria</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3.5 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                      Phone & Whatsapp
                    </h3>
                    <p className="text-sm font-medium text-white hover:text-[#F3E5AB] transition-colors">
                      +234 800 000 0000
                    </p>
                    <p className="text-xs text-gray-400">Available 24/7 for urgent inquiries</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3.5 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <EnvelopeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                      Email Address
                    </h3>
                    <p className="text-sm font-medium text-white hover:text-[#F3E5AB] transition-colors">
                      info@Vasofdiamondestates.com
                    </p>
                    <p className="text-xs text-gray-400">Guaranteed response within 2 hours</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 group pt-4 border-t border-white/10">
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-gray-400">
                    <ClockIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Consultation Hours
                    </h3>
                    <p className="text-xs text-gray-300">Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-xs text-gray-300">Sat: 10:00 AM - 4:00 PM (By Appointment)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#0a1628]/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                {submitted ? (
                  <div className="text-center py-16 space-y-4">
                    <CheckCircleIcon className="w-16 h-16 text-[#D4AF37] mx-auto animate-bounce" />
                    <h3 className="text-2xl font-light text-white">
                      Message Received
                    </h3>
                    <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Vas Of Diamond Estates. A senior consultant has received your inquiry and will reach out shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-6 py-2.5 text-xs font-bold text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#0a1628] transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-light text-white mb-2">
                        Send a Direct Message
                      </h2>
                      <p className="text-xs text-gray-400">
                        Fill out the details below and select your topic of inquiry.
                      </p>
                    </div>

                    {/* Topic Selector Buttons */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                        I am inquiring about
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {topics.map((topic) => (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setSelectedTopic(topic)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-left truncate ${
                              selectedTopic === topic
                                ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#F3E5AB]"
                                : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                            }`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Chief John Doe"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+234..."
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your requirements, preferred locations, budget..."
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f27] px-6 py-3.5 text-xs font-bold text-[#0a1628] transition-all duration-300 shadow-lg shadow-[#D4AF37]/10"
                    >
                      <span>Send Message</span>
                      <PaperAirplaneIcon className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}