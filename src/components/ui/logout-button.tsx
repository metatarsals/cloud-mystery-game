"use client";

import { HoverBorderGradient } from "./hover-border-gradient";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <HoverBorderGradient
      onClick={handleLogout}
      className="text-white font-medium tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
      gradient="from-pink-500 via-purple-500 to-orange-500"
    >
      {/* logout */}
      <LogOutIcon />
    </HoverBorderGradient>
  );
}
