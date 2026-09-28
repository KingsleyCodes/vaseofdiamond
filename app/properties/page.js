"use client";
import React, { useState } from "react";
import { properties } from "@/data/properties";
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  HeartIcon 
} from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || property.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Header & Filter Controls */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Explore All Properties</h1>
          <p className="text-gray-600 mb-8">Browse our complete catalogue of verified real estate listings.</p>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center mb-10">
            <div className="flex items-center flex-1 w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search location or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-gray-800"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-48 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none"
            >
              <option value="All">All Types</option>
              <option value="Duplex">Duplex</option>
              <option value="Apartment">Apartment</option>
              <option value="Terrace">Terrace</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition group">
                <div className="relative h-64 overflow-hidden">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                    {property.type}
                  </span>
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-700 hover:text-red-500 transition">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="text-xl font-bold text-gray-900 mb-1">{property.price}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{property.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center mb-4">
                    <MapPinIcon className="w-4 h-4 mr-1 text-gray-400 flex-shrink-0" />
                    {property.location}
                  </p>
                  <div className="border-t border-gray-100 pt-4 flex justify-between text-xs text-gray-500 font-medium">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}