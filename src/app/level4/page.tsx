"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { MagicCard } from "@/components/magicui/magic-card";

export default function Level4() {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  // Expected decrypted message (Update with actual RSA decryption result)
  const correctPassphrase = "trustnoone";

  const handleSubmit = () => {
    if (input.toLowerCase() === correctPassphrase) {
      setIsCorrect(true);
      setTimeout(() => router.push("/completion"), 2000); // Redirects to final page
    } else {
      alert("The shadows conceal the truth... Look deeper.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-8 overflow-hidden">
      {/* Particles Background */}
      <Particles className="absolute inset-0 z-0" quantity={80} ease={80} color="#94a3b8" refresh />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Heading with MagicCard */}
        <MagicCard border glow className="p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 via-teal-500 to-black bg-clip-text text-transparent">
            Level 4 - The Forbidden Gate
          </h1>
        </MagicCard>

        <p className="text-lg text-neutral-400 text-center italic">
          "The door stands locked. Only the enlightened may pass."
        </p>

        {/* Fake Username & Password Inputs */}
        <MagicCard border glow>
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-center">
            <input type="text" placeholder="Username" className="mb-2 p-2 text-black rounded border border-gray-600 w-64 bg-gray-300" />
            <input type="password" placeholder="Password" className="mb-4 p-2 text-black rounded border border-gray-600 w-64 bg-gray-300" />
          </div>
        </MagicCard>

        {/* Hidden RSA Message (Users must inspect page source) */}
        <p className="hidden">RSA-Encrypted Message: U2FsdGVkX19XbGF3dmlkZXJ0cnVzdG5vMQ==</p>

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

        {/* Submit Button */}
        <MagicCard border glow>
          <motion.button
            onClick={handleSubmit}
            className="px-6 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-black 
                      hover:from-green-600 hover:via-teal-600 hover:to-gray-900 
                      text-white font-semibold rounded transition shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Unlock
          </motion.button>
        </MagicCard>

        {/* Success Message */}
        {isCorrect && (
          <motion.p
            className="text-green-400 text-lg animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ "The void acknowledges you... Proceed, if you dare."
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}