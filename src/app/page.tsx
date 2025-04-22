"use client";

import Hero from "./components/hero";
import { GlowingEffectDemo } from "./components/features";
import GradientBackground from "./components/gradbg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
// import { LogoutButton } from "@/components/ui/logout-button";

export default function GamePage() {
  const [showHero, setShowHero] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await supabase.auth.getSession();
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowHero(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <GradientBackground />
      <div className="relative w-full h-screen overflow-hidden">
        {/* Logout Button */}

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
