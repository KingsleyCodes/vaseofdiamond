"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shortlets", href: "/shortlets" },
  { label: "For Sale", href: "/for-sale" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isHome = pathname === "/";
  const isLight = isHome && !scrolled;

  const topText = isLight ? "text-white" : "text-gray-900";
  const mutedText = isLight ? "text-white/70" : "text-gray-600";

  return (
    <>
      {/* =========================================================
          FLOATING GLASS NAVBAR
      ========================================================== */}
      <header
        className={`
          fixed
          left-0
          right-0
          top-0
          z-[100]
          flex
          justify-center
          px-3
          sm:px-6
          transition-all
          duration-500
          ease-out
          ${scrolled ? "pt-2 sm:pt-3" : "pt-3 sm:pt-5"}
        `}
      >
        <div
          className={`
            relative
            flex
            w-full
            max-w-[1400px]
            items-center
            justify-between
            overflow-hidden
            rounded-2xl
            sm:rounded-[28px]
            border
            transition-all
            duration-500
            ease-out
            ${
              isLight
                ? "border-[#D4AF37]/30 bg-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                : "border-[#D4AF37]/20 bg-white/80 shadow-[0_8px_30px_rgba(10,22,40,0.08)]"
            }
            ${
              scrolled
                ? "h-[62px] sm:h-[68px] px-3.5 sm:px-5"
                : "h-[72px] sm:h-[80px] px-4 sm:px-6"
            }
          `}
          style={{
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
          }}
        >
          {/* Top hairline highlight */}
          <div
            className={`
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              ${
                isLight
                  ? "bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
                  : "bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"
              }
            `}
          />

          {/* =====================================================
              LOGO
          ====================================================== */}
          <Link
            href="/"
            aria-label="VasofDiamond home"
            className={`group relative z-10 flex items-center gap-2.5 sm:gap-3 ${topText}`}
          >
            <div
              className={`
                relative
                flex
                h-8
                w-8
                sm:h-9
                sm:w-9
                shrink-0
                rotate-45
                items-center
                justify-center
                transition-transform
                duration-500
                group-hover:rotate-[135deg]
                border border-[#D4AF37]
                bg-[#D4AF37]/10
              `}
            >
              <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 border border-[#D4AF37]" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-[-0.03em] sm:text-lg">
                Vasof<span className="text-[#D4AF37] font-light">Diamond</span>
              </span>

              <span
                className={`
                  mt-0.5
                  text-[6.5px]
                  sm:text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.32em]
                  transition-colors
                  duration-500
                  ${isLight ? "text-[#F3E5AB]/80" : "text-[#997915]"}
                `}
              >
                Real Estate
              </span>
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <nav className="relative z-10 hidden items-center lg:flex">
            <div
              className={`
                flex
                items-center
                gap-1
                rounded-full
                border
                px-1.5
                py-1
                transition-all
                duration-500
                ${
                  isLight
                    ? "border-[#D4AF37]/30 bg-black/30"
                    : "border-[#D4AF37]/20 bg-gray-50/80"
                }
              `}
            >
              {NAV_LINKS.map(({ label, href }) => {
                const active =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      relative
                      rounded-full
                      px-3.5
                      xl:px-5
                      py-2
                      text-[12px]
                      xl:text-[13px]
                      font-medium
                      tracking-[-0.01em]
                      transition-all
                      duration-300
                      ${
                        active
                          ? isLight
                            ? "bg-[#D4AF37]/20 text-white border border-[#D4AF37]/40"
                            : "bg-[#0a1628] text-[#F3E5AB] shadow-sm"
                          : `${mutedText} hover:${
                              isLight ? "text-white" : "text-[#0a1628]"
                            }`
                      }
                    `}
                  >
                    {label}

                    <span
                      className={`
                        absolute
                        bottom-1
                        left-1/2
                        h-[2px]
                        -translate-x-1/2
                        rounded-full
                        bg-[#D4AF37]
                        transition-all
                        duration-300
                        ${
                          active && !isLight
                            ? "w-0 opacity-0"
                            : active
                            ? "w-4 opacity-100"
                            : "w-0 opacity-0"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* =====================================================
              DESKTOP CTA
          ====================================================== */}
          <div className="relative z-10 hidden lg:block">
            <Link
              href="/contact"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#D4AF37]
                hover:bg-[#c49f27]
                text-[#0a1628]
                px-4
                xl:px-5
                py-2
                xl:py-2.5
                text-[12px]
                xl:text-[13px]
                font-bold
                transition-all
                duration-300
                shadow-md
                hover:shadow-lg
              "
            >
              <span>Let's Talk</span>

              <ArrowUpRightIcon
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>

          {/* =====================================================
              MOBILE ANIMATED HAMBURGER BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className={`
              relative
              z-10
              flex
              h-9
              w-9
              sm:h-10
              sm:w-10
              shrink-0
              flex-col
              items-center
              justify-center
              gap-1.5
              rounded-full
              border
              transition-all
              duration-300
              lg:hidden
              ${
                isOpen
                  ? "border-[#D4AF37] bg-[#0a1628]/80 text-[#D4AF37]"
                  : isLight
                  ? "border-[#D4AF37]/40 bg-black/30 text-white"
                  : "border-gray-200 bg-white text-[#0a1628]"
              }
            `}
          >
            {/* Top Bar */}
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`h-[2px] w-4 rounded-full ${
                isOpen ? "bg-[#D4AF37]" : isLight ? "bg-white" : "bg-[#0a1628]"
              }`}
            />
            {/* Middle Bar */}
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`h-[2px] w-4 rounded-full ${
                isOpen ? "bg-[#D4AF37]" : isLight ? "bg-white" : "bg-[#0a1628]"
              }`}
            />
            {/* Bottom Bar */}
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`h-[2px] w-4 rounded-full ${
                isOpen ? "bg-[#D4AF37]" : isLight ? "bg-white" : "bg-[#0a1628]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* =========================================================
          MOBILE MENU TRANSPARENT GLASS DRAWER
      ========================================================== */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="
                absolute
                right-0
                top-0
                flex
                h-full
                w-[85%]
                max-w-[360px]
                flex-col
                border-l
                border-[#D4AF37]/30
                bg-black/40
                shadow-2xl
              "
              style={{
                backdropFilter: "blur(28px) saturate(160%)",
                WebkitBackdropFilter: "blur(28px) saturate(160%)",
              }}
            >
              {/* Panel Header */}
              <div className="flex h-[80px] items-center justify-between border-b border-white/10 px-6 pt-4">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="flex h-7 w-7 rotate-45 items-center justify-center border border-[#D4AF37] bg-[#D4AF37]/10">
                    <div className="h-2.5 w-2.5 border border-[#D4AF37]" />
                  </div>

                  <div className="leading-none text-white">
                    <div className="text-base font-semibold tracking-tight">
                      Vasof<span className="text-[#D4AF37]">Diamond</span>
                    </div>

                    <div className="mt-1 text-[7px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]/70">
                      Real Estate
                    </div>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8 overflow-y-auto">
                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                  Navigation
                </p>

                <div className="space-y-1">
                  {NAV_LINKS.map(({ label, href }, index) => {
                    const active =
                      pathname === href ||
                      (href !== "/" && pathname.startsWith(href));

                    return (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={`
                            group
                            flex
                            items-center
                            justify-between
                            border-b
                            py-4
                            transition-all
                            duration-300
                            ${
                              active
                                ? "border-[#D4AF37]"
                                : "border-white/10"
                            }
                          `}
                        >
                          <span
                            className={`
                              text-xl
                              font-normal
                              tracking-[-0.02em]
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                              ${
                                active
                                  ? "text-[#F3E5AB] font-semibold"
                                  : "text-white"
                              }
                            `}
                          >
                            {label}
                          </span>

                          <ArrowUpRightIcon
                            className={`
                              h-4
                              w-4
                              transition-all
                              duration-300
                              group-hover:-translate-y-0.5
                              group-hover:translate-x-0.5
                              ${
                                active
                                  ? "text-[#D4AF37]"
                                  : "text-white/40"
                              }
                            `}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="border-t border-white/10 p-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    bg-[#D4AF37]
                    hover:bg-[#c49f27]
                    px-5
                    py-3.5
                    text-xs
                    font-bold
                    text-[#0a1628]
                    transition-all
                    duration-300
                    shadow-lg
                  "
                >
                  <span>Schedule a Conversation</span>

                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/50">
                  © {new Date().getFullYear()} VasofDiamond
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}