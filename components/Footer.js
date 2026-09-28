import Link from "next/link";
import {
  BuildingOffice2Icon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";

/* ─────────────────────────  DATA  ───────────────────────── */

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shortlets", href: "/shortlets" },
  { label: "For Sale", href: "/for-sale" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

const SERVICE_LINKS = [
  { label: "Buy Property", href: "/for-sale" },
  { label: "Property Management", href: "/services" },
];

const SOCIALS = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
];

/* ─────────────────────────  COMPONENT  ───────────────────────── */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070e1b] text-white overflow-hidden">
      {/* Decorative background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Golden glow top-left */}
        <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-[#D4AF37]/15 rounded-full blur-[130px]" />
        {/* Golden glow bottom-right */}
        <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      {/* CTA Card Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="relative bg-gradient-to-br from-[#0a1628] via-[#12233f] to-[#0a1628] border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)]">
          {/* Card decorative accents */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="text-center lg:text-left max-w-xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] mb-2 sm:mb-3">
                Let&apos;s Find Your
                <br />
                <span className="text-[#D4AF37]">Perfect Property.</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Whether you&apos;re booking a luxury stay or investing in real estate — our team is ready to assist.
              </p>
            </div>
            <Link
              href="/contact"
              className="group shrink-0 inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#c49f27] text-[#070e1b] pl-6 pr-2.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all duration-300"
            >
              <span>Contact Us</span>
              <span className="w-8 h-8 rounded-lg bg-[#070e1b] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowRightIcon className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-[#D4AF37]" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#997915] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 group-hover:scale-105 transition-all duration-300">
                <BuildingOffice2Icon className="w-5 h-5 text-[#070e1b]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Vasof<span className="text-[#D4AF37]">Diamond</span>
              </span>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-md mb-6">
              Redefining luxury real estate in Nigeria. We curate the finest
              shortlets, homes, and investment properties for those who demand excellence.
            </p>

            {/* Socials */}
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center overflow-hidden hover:border-[#D4AF37]/50 transition-colors duration-300"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#997915] scale-0 group-hover:scale-100 rounded-xl transition-transform duration-300 origin-center" />
                  <Icon className="relative w-3.5 h-3.5 text-gray-400 group-hover:text-[#070e1b] transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs text-gray-400 hover:text-[#F3E5AB] transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37] scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <span className="-ml-2.5 group-hover:ml-0 transition-all duration-200">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs text-gray-400 hover:text-[#F3E5AB] transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37] scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <span className="-ml-2.5 group-hover:ml-0 transition-all duration-200">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#D4AF37] mb-4">
              Get in Touch
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
                  Visit
                </p>
                <p className="text-gray-300 leading-snug">
                  12 Admiralty Way, Lekki Phase 1,
                  <br />
                  Lagos, Nigeria
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
                  Email
                </p>
                <a
                  href="mailto:hello@vasofdiamond.com"
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  hello@vasofdiamond.com
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
                  Call
                </p>
                <a
                  href="tel:+2348000000000"
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  +234 800 000 0000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-gray-500 text-center sm:text-left">
              © {year} VasofDiamond. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-[11px] text-gray-500 hover:text-[#D4AF37] transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}