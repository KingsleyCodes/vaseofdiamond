"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon, KeyIcon, HomeModernIcon } from "@heroicons/react/24/outline";

export default function CategoriesSection() {
  const categories = [
    {
      title: "Shortlets",
      subtitle: "TEMPORARY & HOLIDAY STAYS",
      description:
        "Fully furnished, premium apartments and luxury villas available for short-term booking, vacations, or business trips.",
      href: "/shortlets",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      badge: "Book Stays",
      icon: KeyIcon,
    },
    {
      title: "For Sale",
      subtitle: "REAL ESTATE & INVESTMENTS",
      description:
        "Discover exceptional homes, luxury estates, and high-yield commercial properties available for permanent purchase.",
      href: "/for-sale",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      badge: "Buy Property",
      icon: HomeModernIcon,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
        <span className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-[0.2em] mb-1 block">
          Explore Portfolio
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0a1628] tracking-tight">
          Choose Your Path
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Whether you are looking for a temporary luxury escape or a permanent place to call home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative bg-white rounded-2xl overflow-hidden border border-amber-200/50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-[320px] sm:h-[360px]"
            >
              {/* Background Image & Overlay */}
              <div className="absolute inset-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              {/* Top Badge & Icon */}
              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                <span className="bg-[#D4AF37]/20 backdrop-blur-md border border-[#D4AF37]/40 text-[#F3E5AB] text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full tracking-wider uppercase flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {cat.badge}
                </span>

                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-[#0a1628] transition-all duration-300">
                  <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 p-5 sm:p-6">
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block">
                  {cat.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5 group-hover:text-[#F3E5AB] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}