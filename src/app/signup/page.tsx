"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck } from "lucide-react";
import { processSignupAndCheckout } from "@/app/actions";

function SignupForm() {
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variantId");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Ensure variantId gets passed to the server action
    if (variantId) formData.append("variantId", variantId);

    try {
      const response = await processSignupAndCheckout(formData);

      if (response.success && response.url) {
        // Instantly push them to Lemon Squeezy
        window.location.href = response.url;
      } else {
        setError(response.error || "Failed to initialize account.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  if (!variantId) {
    return (
      <div className="text-center text-white p-8">
        <p>Invalid plan selection. Please return to pricing.</p>
        <a href="/#pricing" className="text-amber-500 mt-4 block">
          &larr; Back to Plans
        </a>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl"
    >
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-white uppercase italic">
          Secure Your Vault
        </h1>
        <p className="text-sm text-muted mt-2">
          Create your admin login before entering payment details.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            Company Name
          </label>
          <input
            name="companyName"
            type="text"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="Apex Builders LLC"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            Admin Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="steve@apexbuilders.com"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            Master Password
          </label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-500 text-slate-950 font-black py-4 rounded-xl mt-6 uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Continue to Payment \u2192"
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        }
      >
        <SignupForm />
      </Suspense>
    </div>
  );
}
