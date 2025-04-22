"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { FileUpload } from "@/components/ui/file-upload";
import { LogoutButton } from "@/components/ui/logout-button";
import { supabase } from "@/lib/supabase";

export default function Level3() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File | null>(null);
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

      if (!player || player.current_level < 3) {
        router.push("/cheese-french-fries");
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

  const handleFileChange = async (files: File[]) => {
    if (!files || files.length === 0) return;

    const uploadedFile = files[0];
    setFile(uploadedFile);

    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = (event.target?.result as string).trim();

      if (text === "pretend-you-dont-see-me") {
        setIsCorrect(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) return;

        const { error } = await supabase
          .from("players")
          .update({ current_level: 4 })
          .eq("id", session.user.id);

        if (error) {
          console.error("Error updating level:", error);
          alert("Something went wrong while saving your progress.");
          return;
        }

        setTimeout(() => router.push("/cat-in-pan"), 2000);
      } else {
        alert("The file whispers the wrong phrase... Try again.");
      }
    };

    reader.readAsText(uploadedFile);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-8 overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        color="#7289da"
      />

      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <p className="text-lg text-neutral-300 text-center italic">
          &quot;The network whispers its secrets, but only those who listen will
          hear the truth.&quot;
        </p>

        <FileUpload onChange={handleFileChange} />

        {isCorrect && (
          <motion.p
            className="text-green-400 text-lg animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ &quot;The transmissions fade… You have deciphered the ghostly
            echoes. Move forward.&quot;
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
