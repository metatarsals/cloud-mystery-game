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
  const [fileUrl, setFileUrl] = useState<string | null>(null);
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

  const encryptedText = "q'\\bq8[{ljs\\u92a>4U1\\etj\\f8t%:[^'";
  const correctAnswer = "b'\\xd8[{\\xff\\x92m>4M1\\xff\\x8e%:[^'";

  const handleSubmit = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    if (input == correctAnswer) {
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

      const { data } = supabase.storage
        .from("game-assets")
        .getPublicUrl("encrypted__data.zip");

      const fileUrl = data.publicUrl;
      setFileUrl(fileUrl || null);
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

        {isCorrect && (
          <motion.div
            className="text-green-400 text-lg text-center animate-fade-in mt-6 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>
              ✅ Correct!{" "}
              <span className="italic">See you in red-blue-green.</span>
            </p>

            {fileUrl && (
              <a
                href={fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-600 rounded-full text-white font-semibold hover:bg-green-700 transition"
                onClick={() => {
                  setTimeout(() => router.push("/red-blue-green"), 1500);
                }}
              >
                Download encrypted_data.zip
              </a>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
