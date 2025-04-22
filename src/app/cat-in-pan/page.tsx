"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { MagicCard } from "@/components/magicui/magic-card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { supabase } from "@/lib/supabase";

export default function Level4() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const { data: player } = await supabase
        .from("players")
        .select("current_level")
        .eq("id", session.user.id)
        .single();

      if (!player || player.current_level < 4) {
        router.push("/red-blue-green");
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    setErrorMessage("The shadows conceal the truth... Look deeper.");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-8 overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        color="#00ffcc"
        refresh
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <p className="text-lg text-neutral-400 text-center italic">
          &quot;The door stands locked. Only the enlightened may pass.&quot;
        </p>

        {/* Username & Password Input Box */}
        <MagicCard className="p-6 rounded-lg shadow-lg w-72 text-center border-2 border-teal-400/50 bg-gradient-to-r from-green-900 via-teal-900 to-gray-900">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="source"
              className="p-2 text-white rounded border border-teal-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
          </div>
        </MagicCard>

        <p className="hidden">
          RSA-Encrypted Message: Encrypted Chunks: [(2304774, 2), (7425838, 2),
          (2802020, 2), (4156775, 2), (1485630, 2), (991077, 2), (4571598, 2),
          (2895742, 2), (1812834, 2), (5234546, 2), (4319335, 2), (2424898, 2),
          (5456032, 2), (447193, 2), (2693108, 2), (7145475, 2), (5212004, 2),
          (5591922, 2), (2575733, 2), (7822984, 2), (7922145, 2), (4451102, 2),
          (4779636, 2), (3078253, 2), (110358, 2), (6300545, 2), (4403987, 2),
          (4590983, 2), (5453295, 2), (785992, 2), (6450096, 2)] Private Key:
          (1596269, 7990271)
        </p>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <HoverBorderGradient
          onClick={handleSubmit}
          containerClassName="mt-4"
          className="text-white font-medium tracking-wide shadow-md hover:shadow-lg hover:brightness-110"
          gradient="from-green-500 via-teal-500 to-gray-700"
        >
          Unlock
        </HoverBorderGradient>
      </motion.div>
    </div>
  );
}
