"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { LogoutButton } from "@/components/ui/logout-button";
import { supabase } from "@/lib/supabase";

export default function Level2() {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

      if (!player || player.current_level < 2) {
        router.push("/chicken-noodle-soup"); // Must complete previous level first
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

  const encryptedText = "LXFOPVEFRNHR"; // Example Vigenère Cipher text
  const correctAnswer = "HELLOWORLD"; // Change this to your actual expected answer

  // const handleSubmit = () => {
  //   if (input.toUpperCase() === correctAnswer) {
  //     setIsCorrect(true);
  //     setTimeout(() => router.push("/red-blue-green"), 2000);
  //   } else {
  //     alert("The cipher mocks your ignorance... Try again.");
  //   }
  // };

  const handleSubmit = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    if (input.toUpperCase() === correctAnswer) {
      setIsCorrect(true);

      const { error } = await supabase
        .from("players")
        .update({ current_level: 3 })
        .eq("id", session.user.id);

      if (error) {
        console.error("Error updating level:", error);
        alert("Something went wrong while saving your progress.");
        return;
      }

      setTimeout(() => router.push("/red-blue-green"), 2000);
    } else {
      alert("The cipher mocks your ignorance... Try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-8 overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={80}
        color="#8f98a0"
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
        {/* <MagicCard border glow className="p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Level 2 - The Whispering Code
          </h1>
        </MagicCard> */}

        <p className="text-lg text-neutral-300 text-center italic">
          &quot;The voices are trapped within the cipher. Can you hear them? Can
          you set them free?&quot;
        </p>

        {/* Encrypted Text Display */}
        <EvervaultCard text={encryptedText} className="w-96 h-96" />

        {/* Input Field */}
        <motion.input
          type="text"
          placeholder="Whisper the answer..."
          className="p-2 text-black rounded border border-gray-600 shadow-lg w-64 text-center"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Submit Button with HoverBorderGradient */}
        <HoverBorderGradient
          onClick={handleSubmit}
          containerClassName="mt-4"
          className="text-white font-medium tracking-wide shadow-md hover:shadow-lg hover:brightness-110"
          gradient="from-pink-500 via-red-500 to-yellow-500"
        >
          Submit
        </HoverBorderGradient>

        {/* Success Message */}
        {isCorrect && (
          <motion.p
            className="text-green-400 text-lg animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ &quot;The voices grow silent. You have seen through the illusion…
            Move forward.&quot;
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
