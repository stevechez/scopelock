"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Play,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

export default function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;

      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* GRID BACKGROUND */}
      <div
        className="
          absolute inset-0 -z-20
          bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:60px_60px]
          [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]
        "
      />

      {/* LIGHTING */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[5%] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[160px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-20
          px-6
          pb-24
          pt-32
          lg:grid-cols-[1.05fr_0.95fr]
          lg:px-8
          lg:pb-32
          lg:pt-40
        "
      >
        {/* LEFT CONTENT */}
        <div className="relative z-10">
          {/* BADGE */}
          <motion.div
            variants={itemVariants}
            className="
              mb-8
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400" />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-white/70
              "
            >
              BUILT FOR PREMIUM RESIDENTIAL CONTRACTORS
            </span>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            variants={itemVariants}
            className="
              max-w-4xl
              text-5xl
              font-semibold
              leading-[0.92]
              tracking-[-0.06em]
              text-white
              sm:text-6xl
              md:text-7xl
              lg:text-[82px]
            "
          >
            Run Your
            <br />
            Construction Company
            <br />
            <span className="text-white/45">Like a High-Performance Firm</span>
          </motion.h1>

          {/* SUBCOPY */}
          <motion.p
            variants={itemVariants}
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-white/60
              md:text-xl
            "
          >
            BUILDRAIL centralizes client communication, approvals, payments, and
            field documentation into one operating system built for premium
            residential construction firms.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="
              mt-10
              flex
              flex-col
              gap-4
              sm:flex-row
            "
          >
            <button
              onClick={(e) => {
                e.preventDefault();

                document.getElementById("pricing")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-white
                px-7
                py-4
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-white/90
                active:scale-[0.98]
              "
            >
              Provision Your Vault
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenDemo}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-7
                py-4
                text-sm
                font-medium
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-white/[0.06]
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  transition-all
                  duration-300
                  group-hover:bg-white
                  group-hover:text-black
                "
              >
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </div>
              See How It Works
            </button>
          </motion.div>

          {/* TRUST ROW */}
          <motion.div
            variants={itemVariants}
            className="
              mt-12
              flex
              flex-wrap
              items-center
              gap-x-8
              gap-y-4
              text-sm
              text-white/45
            "
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Operational clarity across every project
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-400" />
              Payments triggered automatically
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              Every approval documented
            </div>
          </motion.div>
        </div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transform: `translate(${mouse.x}px, ${mouse.y}px)`,
          }}
          className="relative hidden lg:block"
        >
          {/* GLOW */}
          <div className="absolute -inset-10 rounded-[40px] bg-white/5 blur-3xl" />

          {/* IMAGE FRAME */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              shadow-2xl
              backdrop-blur-2xl
            "
          >
            <Image
              src="/images/buildrail-hero-image.png"
              width={1400}
              height={1000}
              priority
              alt="BUILDRAIL platform preview"
              className="
                h-auto
                w-full
                object-cover
              "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
