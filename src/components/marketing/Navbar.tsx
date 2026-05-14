"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ModeToggle } from "@/components/ModeToggle";
import { getAppUrl } from "@/utils/urls";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Product", href: "#product" },
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
    { name: "Case Studies", href: "#case-studies" },
  ];

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.18,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.24,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.04,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    closed: {
      opacity: 0,
      y: 6,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/5 bg-black/70 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* LOGO */}
        <Link
          href="/"
          className="
            group
            flex
            items-center
            text-2xl
            font-bold
            tracking-[-0.08em]
            text-white
            transition-opacity
            duration-300
            hover:opacity-90
          "
        >
          BUILD
          <span className="text-amber-400">RAIL</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                text-sm
                font-medium
                tracking-[-0.01em]
                text-white/55
                transition-colors
                duration-300
                hover:text-white
              "
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-5 sm:flex">
            {/* <ModeToggle /> */}

            <Link
              href={getAppUrl("/login")}
              className="
                text-sm
                font-medium
                text-white/55
                transition-colors
                duration-300
                hover:text-white
              "
            >
              Log in
            </Link>
          </div>

          {/* PRIMARY CTA */}
          <Link
            href={getAppUrl("#pricing")}
            className="
              hidden
              sm:inline-flex
              items-center
              justify-center
              rounded-xl
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-black
              transition-all
              duration-300
              hover:bg-white/90
              active:scale-[0.98]
            "
          >
            Provision Your Vault
          </Link>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center gap-3 md:hidden">
            <ModeToggle />

            <button
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                text-white
              "
            >
              <div className="relative h-4 w-5">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    absolute
                    left-0
                    top-0
                    h-[1.5px]
                    w-full
                    rounded-full
                    bg-current
                  "
                />

                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{
                    duration: 0.15,
                  }}
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-[1.5px]
                    w-full
                    -translate-y-1/2
                    rounded-full
                    bg-current
                  "
                />

                <motion.span
                  animate={
                    isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                  }
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[1.5px]
                    w-full
                    rounded-full
                    bg-current
                  "
                />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* BACKDROP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="
                  fixed
                  inset-0
                  top-20
                  bg-black/40
                  backdrop-blur-sm
                  md:hidden
                "
              />

              {/* MOBILE PANEL */}
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="
                  absolute
                  left-4
                  right-4
                  top-full
                  mt-3
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0F0F10]/95
                  p-6
                  shadow-2xl
                  backdrop-blur-xl
                  md:hidden
                "
              >
                <div className="flex flex-col">
                  {/* NAV ITEMS */}
                  <div className="space-y-1">
                    {navLinks.map((item) => (
                      <motion.div key={item.name} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            px-3
                            py-3
                            text-base
                            font-medium
                            text-white/80
                            transition-colors
                            duration-200
                            hover:bg-white/[0.04]
                            hover:text-white
                          "
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* DIVIDER */}
                  <div className="my-5 h-px bg-white/5" />

                  {/* FOOTER ACTIONS */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Link
                      href={getAppUrl("/login")}
                      onClick={() => setIsOpen(false)}
                      className="
                        block
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        font-medium
                        text-white/60
                        transition-colors
                        duration-200
                        hover:bg-white/[0.04]
                        hover:text-white
                      "
                    >
                      Log in
                    </Link>

                    <Link
                      href={getAppUrl("#pricing")}
                      onClick={() => setIsOpen(false)}
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        px-5
                        py-3.5
                        text-sm
                        font-semibold
                        text-black
                        transition-all
                        duration-300
                        hover:bg-white/90
                        active:scale-[0.98]
                      "
                    >
                      Book Demo
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
