"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  CreditCard,
  ShieldCheck,
  MessageSquare,
  Camera,
} from "lucide-react";

const modules = [
  {
    title: "Proposals",
    eyebrow: "BidForge™",
    description:
      "Create premium multi-tier proposals that reduce back-and-forth and help contractors close higher-value projects with confidence.",
    icon: FileText,
  },
  {
    title: "Client Portal",
    eyebrow: "Comm Vault™",
    description:
      "Centralize approvals, conversations, documents, and updates into one professional experience homeowners can trust.",
    icon: MessageSquare,
  },
  {
    title: "Change Orders",
    eyebrow: "ScopeLock™",
    description:
      "Capture field changes in real time and secure documented approval before additional work begins.",
    icon: ShieldCheck,
  },
  {
    title: "Payments",
    eyebrow: "PayRail™",
    description:
      "Trigger milestone payments immediately after approvals using modern billing workflows powered by Stripe.",
    icon: CreditCard,
  },
  {
    title: "Field Documentation",
    eyebrow: "CrewLens™",
    description:
      "Maintain a visual timeline of the build with organized site uploads, progress tracking, and accountability records.",
    icon: Camera,
  },
];

export default function ProductModules() {
  return (
    <section id="ecosystem" className="relative bg-[#0B0B0C] py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          <p
            className="
              mb-6
              text-xs
              font-medium
              uppercase
              tracking-[0.24em]
              text-white/40
            "
          >
            Operational Infrastructure
          </p>

          <h2
            className="
              text-5xl
              font-semibold
              leading-[1]
              tracking-[-0.06em]
              text-white
              md:text-7xl
            "
          >
            Operational clarity
            <br />
            for every stage
            <br />
            of the build.
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-white/50
            "
          >
            BUILDRAIL centralizes proposals, approvals, communication, payments,
            and field documentation into one streamlined workflow built for
            premium residential construction firms.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid gap-px overflow-hidden rounded-[32px] border border-white/5 bg-white/5 lg:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                }}
                className="
                  group
                  bg-[#101113]
                  p-10
                  transition-all
                  duration-300
                  hover:bg-[#141518]
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-white/80
                  "
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div className="mt-10">
                  <div
                    className="
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.2em]
                      text-white/35
                    "
                  >
                    {module.eyebrow}
                  </div>

                  <h3
                    className="
                      mt-3
                      text-2xl
                      font-semibold
                      tracking-[-0.04em]
                      text-white
                    "
                  >
                    {module.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      text-base
                      leading-relaxed
                      text-white/50
                    "
                  >
                    {module.description}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* CTA CARD */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              flex
              flex-col
              justify-between
              bg-[#0F1012]
              p-10
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/35
                "
              >
                Built for premium contractors
              </p>

              <h3
                className="
                  mt-6
                  text-4xl
                  font-semibold
                  leading-tight
                  tracking-[-0.05em]
                  text-white
                "
              >
                Replace operational chaos with clarity.
              </h3>
            </div>

            <button
              className="
                mt-12
                inline-flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white
                px-6
                py-4
                text-sm
                font-medium
                text-black
                transition-all
                hover:gap-5
              "
            >
              Provision Your Vault
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
