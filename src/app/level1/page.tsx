"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { MagicCard } from "@/components/magicui/magic-card";

export default function Level1() {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  const correctAnswer = "hiddenmessage";



  const handleSubmit = () => {
    if (input.toLowerCase() === correctAnswer) {
      setIsCorrect(true);
      setTimeout(() => router.push("/level2"), 2000);
    } else {
      alert("Incorrect! The shadows whisper… Try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-8 overflow-hidden">
      {/* Enhanced Background Particles */}
      <Particles className="absolute inset-0 z-0" quantity={120} ease={100} color="#8f98a0" refresh />

      {/* Floating Cryptic Hints at Random Positions */}


      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Heading Wrapped in MagicCard */}
        <MagicCard border glow className="p-6 rounded-lg shadow-lg bg-transparent">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Level 1 - The Silent Image
          </h1>
        </MagicCard>

        <p className="text-lg text-neutral-300 text-center">
          "Every image speaks, but some whispers must be decoded..."
        </p>

        {/* Image Section */}
        <div className="p-1 bg-gray-800 rounded-lg shadow-lg">
          <img
            src="/stego-image.png"
            alt="Steganographic Image"
            className="w-64 h-64 object-cover rounded"
          />
        </div>

        {/* Input Field */}
        <motion.input
          type="text"
          placeholder="Enter the hidden truth..."
          className="p-2 text-black rounded border border-gray-600 shadow-lg w-64 text-center"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Submit Button Wrapped in MagicCard */}
        <MagicCard border glow>
          <motion.button
            onClick={handleSubmit}
            className="px-6 py-2 bg-gradient-to-r from-red-500 via-purple-600 to-indigo-500 
                      hover:from-red-600 hover:via-purple-700 hover:to-indigo-600 
                      text-white font-semibold rounded transition shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Submit
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
            ✅ "Access granted. Proceeding to the next layer..."
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
