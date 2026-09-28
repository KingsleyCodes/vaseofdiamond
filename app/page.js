"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col selection:bg-blue-600 selection:text-white antialiased">
      <Navbar />

      {/* Cinematic Hero Section Component */}
      <Hero
        eyebrow="CURATED SPACES"
        title="Where architecture meets exceptional living."
        description="Discover spaces designed around the way modern life should feel."
        ctaText="Explore Collection"
        ctaHref="#listings"
      />
      <CategoriesSection />

      <Footer />
    </div>
  );
}