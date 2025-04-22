"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { MagicCard } from "@/components/magicui/magic-card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { supabase } from "@/lib/supabase";

export default function Level4() {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // Store error message
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
        router.push("/red-blue-green"); // Must complete previous level first
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

  // Expected decrypted message (Update with actual RSA decryption result)
  const correctPassphrase = "trustnoone";

  const handleSubmit = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    if (input.toLowerCase() === correctPassphrase) {
      setIsCorrect(true);

      const { error } = await supabase
        .from("players")
        .update({ current_level: 5 })
        .eq("id", session.user.id);

      if (error) {
        console.error("Error updating level:", error);
        alert("Something went wrong while saving your progress.");
        return;
      }
      setErrorMessage("");
      setTimeout(() => router.push("/completion"), 2000);
    } else {
      setErrorMessage("The shadows conceal the truth... Look deeper.");
    }
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
        {/* Heading with MagicCard */}
        <MagicCard className="p-6 rounded-lg shadow-lg border border-teal-500 bg-gray-900">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 via-teal-500 to-gray-400 bg-clip-text text-transparent">
            Level 4 - The Forbidden Gate
          </h1>
        </MagicCard>

        <p className="text-lg text-neutral-400 text-center italic">
          &quot;The door stands locked. Only the enlightened may pass.&quot;
        </p>

        {/* Username & Password Input Box */}
        <MagicCard className="p-6 rounded-lg shadow-lg w-72 text-center border-2 border-teal-400/50 bg-gradient-to-r from-green-900 via-teal-900 to-gray-900">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="p-2 text-white rounded border border-teal-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 text-white rounded border border-teal-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
          </div>
        </MagicCard>

        {/* Hidden RSA Message */}
        <p className="hidden">
          RSA-Encrypted Message: U2FsdGVkX19XbGF3dmlkZXJ0cnVzdG5vMQ==
        </p>

        {/* Input Field for Decrypted Passphrase */}
        <motion.input
          type="text"
          placeholder="Enter the key to the void..."
          className="p-2 text-black rounded border border-gray-600 shadow-lg w-64 text-center bg-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Error Message */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Submit Button */}
        <HoverBorderGradient
          onClick={handleSubmit}
          containerClassName="mt-4"
          className="text-white font-medium tracking-wide shadow-md hover:shadow-lg hover:brightness-110"
          gradient="from-green-500 via-teal-500 to-gray-700"
        >
          Unlock
        </HoverBorderGradient>

        {/* Success Message */}
        {isCorrect && (
          <motion.p
            className="text-green-400 text-lg animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ &quot;The void acknowledges you... Proceed, if you dare.&quot;
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
