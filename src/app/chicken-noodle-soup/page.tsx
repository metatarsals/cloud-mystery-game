"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Lens } from "@/components/ui/lens";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { LogoutButton } from "@/components/ui/logout-button";

export default function Level1() {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  const correctAnswer = "cheese-french-fries";

  const handleSubmit = () => {
    if (input.toLowerCase() === correctAnswer) {
      setIsCorrect(true);
      setTimeout(() => router.push("/cheese-french-fries"), 2000);
    } else {
      alert("Incorrect! The shadows whisper… Try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-8 overflow-hidden">
      {/* Logout Button */}
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>

      {/* Background Particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={120}
        ease={100}
        color="#8f98a0"
        refresh
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center space-y-10 mt-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <p className="text-lg text-neutral-100 text-center">
          &quot;Every image speaks, but some whispers must be decoded...&quot;
        </p>

        {/* Centered 3D Image Container with Lens Effect */}
        <div className="flex justify-center items-center">
          <CardContainer className="flex justify-center items-center">
            <CardBody className="flex justify-center items-center">
              <CardItem translateZ={30} className="shadow-lg rounded-lg">
                <Lens
                  zoomFactor={2.0}
                  lensSize={120}
                  className="flex justify-center items-center"
                >
                  <Image
                    src="/level-1-image-final.jpg"
                    alt="check here"
                    width={1785}
                    height={2379}
                    className="rounded-lg object-cover"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-lg font-medium"
          >
            Correct! Moving to the next level...
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
