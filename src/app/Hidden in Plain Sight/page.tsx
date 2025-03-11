"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { MagicCard } from "@/components/magicui/magic-card";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Lens } from "@/components/ui/lens";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-8 overflow-hidden">
      {/* Background Particles */}
      <Particles className="absolute inset-0 z-0" quantity={120} ease={100} color="#8f98a0" refresh />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center space-y-10 mt-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Heading (Keeping Glow) */}
        <MagicCard border glow className="p-6 rounded-lg shadow-lg bg-transparent">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Level 1 - The Silent Image
          </h1>
        </MagicCard>

        <p className="text-lg text-neutral-100 text-center">
          "Every image speaks, but some whispers must be decoded..."
        </p>

        {/* Centered 3D Image Container with Lens Effect */}
        <div className="flex justify-center items-center">
          <CardContainer className="flex justify-center items-center">
            <CardBody className="flex justify-center items-center">
              <CardItem translateZ={30} className="shadow-lg rounded-lg">
                <Lens zoomFactor={2.0} lensSize={120} className="flex justify-center items-center">
                  <img
                    src="/stego-image.jpeg"
                    alt="Steganographic Image"
                    className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-lg"
                  />
                </Lens>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        {/* Input & Button Section */}
        <div className="flex flex-col items-center gap-6">
          {/* Input Field */}
          <motion.input
            type="text"
            placeholder="Enter the hidden truth..."
            className="p-2 text-black rounded border border-gray-600 shadow-lg w-64 text-center transition focus:border-indigo-500 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileFocus={{ scale: 1.05 }}
          />

          {/* Submit Button with Proper Spacing */}
          <HoverBorderGradient
  onClick={handleSubmit}
  className="text-white font-medium tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
  gradient="from-pink-500 via-purple-500 to-orange-500"
>
  Submit
</HoverBorderGradient>

{/* Added proper spacing without affecting glow */}
<div className="h-10"></div>


        </div>

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
