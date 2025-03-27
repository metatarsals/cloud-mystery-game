"use client";

import Hero from "./components/hero";
import { GlowingEffectDemo } from "./components/features";
import GradientBackground from "./components/gradbg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";


export default function Home() {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GradientBackground />
      <div className="relative w-full h-screen overflow-hidden">
        {/* Glowing Effect - Fades Out */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: showHero ? 0 : 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <GlowingEffectDemo />
        </motion.div>

        {/* Hero Section - Fades In */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHero ? 1 : 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <Hero />
        </motion.div>
      </div>
    </>
  );
}
