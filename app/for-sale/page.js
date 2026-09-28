"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SparklesIcon, CheckCircleIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function ForSalePage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-[#D4AF37] selection:text-[#0a1628] flex flex-col justify-between">
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* =========================================================================
          COMING SOON HERO SECTION
      ========================================================================= */}
      <main className="relative flex-1 flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Radial Glow Effects */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] sm:h-[500px] sm:w-[800px] rounded-full bg-[#D4AF37]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-3xl text-center z-10">
        

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6">
            Properties For Sale <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
              Coming Soon
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto max-w-xl text-base sm:text-lg text-gray-400 font-light leading-relaxed mb-10">
            We are preparing an exclusive catalog of prime residential developments, 
            luxury waterfront estates, and high-yield investment properties.
          </p>

          {/* =========================================================================
              VIP NOTIFICATION FORM / CARD
          ========================================================================= */}
          <div className="mx-auto max-w-md rounded-2xl border border-[#D4AF37]/30 bg-[#0a1628]/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Get Off-Market Access
                </p>
                <p className="text-xs text-gray-400">
                  Register your interest to receive early access to off-market properties and private listings before public release.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-[#D4AF37] hover:bg-[#c49f27] px-5 py-3 text-xs font-bold text-[#0a1628] transition-all duration-300 shadow-md"
                  >
                    Join Investor List
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-4 text-center space-y-2">
                <CheckCircleIcon className="mx-auto h-10 w-10 text-[#D4AF37]" />
                <h3 className="text-base font-semibold text-white">You're Registered</h3>
                <p className="text-xs text-gray-400">
                  Thank you for registering. Our team will contact you with priority off-market listings as soon as they become available.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}