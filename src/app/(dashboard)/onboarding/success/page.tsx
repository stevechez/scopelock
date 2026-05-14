"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
// import { verifySubscriptionSync } from '@/app/actions'; // You'd create this helper

export function EnterVaultButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  const handleEntry = async () => {
    setIsSyncing(true);

    // Add a 2-second delay to give the Lemon Squeezy webhook time to hit your database
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Force the router to refresh the page/middleware data, then push to dashboard
    router.refresh();
    router.push("/dashboard");
  };

  return (
    <button
      onClick={handleEntry}
      disabled={isSyncing}
      className="block w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-slate-200 transition-all uppercase italic flex justify-center items-center gap-2"
    >
      {isSyncing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> Unlocking Vault...
        </>
      ) : (
        "Go to Command Center"
      )}
    </button>
  );
}
