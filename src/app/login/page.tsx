"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GradientBackground from "../components/gradbg";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Particles } from "@/components/magicui/particles";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/chicken-noodle-soup");
      }
    } catch {
      setError("An error occurred during login");
    }
  };

  return (
    <>
      <GradientBackground />
      <div className="relative min-h-screen flex items-center justify-center">
        <Particles
          className="absolute inset-0 z-0"
          quantity={120}
          ease={100}
          color="#8f98a0"
          refresh
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-md w-full space-y-8 p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20"
        >
          <div className="absolute -inset-[0.5px] rounded-lg">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
          </div>
          <div className="relative flex flex-col gap-6">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white lowercase">
                sign in to your account
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded"
                >
                  {error}
                </motion.div>
              )}
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <input
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/20 bg-white/10 text-white placeholder-white/50 rounded-t-md focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:z-10 sm:text-sm"
                    type="email"
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/20 bg-white/10 text-white placeholder-white/50 rounded-b-md focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:z-10 sm:text-sm"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
                >
                  sign in
                </motion.button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm text-white/70">
                don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-white hover:text-white/90"
                >
                  sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
