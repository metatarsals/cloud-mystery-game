import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { MagicCard } from "@/components/magicui/magic-card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FileUpload } from "@/components/ui/file-upload"; // Your custom FileUpload component

export default function Level3() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null); // ✅ Allow file updates
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  const correctMessage = "foundpassword123"; // Expected result

  // ✅ Define the missing handleFileChange function
  const handleFileChange = (files: File[]) => {
    if (files && files.length > 0) {
      setFile(files[0]); // Assuming single file upload
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert("Enter your extracted data before submitting.");
      return;
    }

    if (!file) {
      alert("Upload a .pcap file before submitting.");
      return;
    }

    // ✅ Local validation before sending request
    if (message.toLowerCase() === correctMessage) {
      setIsCorrect(true);
      setTimeout(() => router.push("/cat-in-pan"), 2000);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);

    try {
      const response = await fetch("/api/analyze-pcap", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.correct) {
        setIsCorrect(true);
        setTimeout(() => router.push("/cat-in-pan"), 2000);
      } else {
        alert("The data eludes you... Seek deeper.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to process the file. Try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white px-8 overflow-hidden">
      {/* Particles Background */}
      <Particles className="absolute inset-0 z-0" quantity={100} color="#7289da" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Heading */}
        <MagicCard border glow className="p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Level 3 - The Silent Signals
          </h1>
        </MagicCard>

        <p className="text-lg text-neutral-300 text-center italic">
          &quot;The network whispers its secrets, but only those who listen will hear the truth.&quot;
        </p>

        {/* File Upload (Using Your Custom Component) */}
        <FileUpload onChange={handleFileChange} />

        {/* Input Field */}
        <motion.input
          type="text"
          placeholder="What have you uncovered?"
          className="p-2 text-black rounded border border-gray-600 shadow-lg w-64 text-center"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Submit Button */}
        <HoverBorderGradient 
          onClick={handleSubmit} 
          containerClassName="mt-4"
          gradient="from-blue-500 via-cyan-500 to-teal-500"
          className="text-white font-medium tracking-wide shadow-md transition-all 
                     hover:shadow-lg hover:brightness-110"
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
            ✅ &quot;The transmissions fade… You have deciphered the ghostly echoes. Move forward.&quot;
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
