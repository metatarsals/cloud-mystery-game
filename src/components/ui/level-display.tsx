"use client";

import { motion } from "framer-motion";
import { LevelService, PlayerLevel } from "@/lib/level-service";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function LevelDisplay() {
  const [playerLevel, setPlayerLevel] = useState<PlayerLevel | null>(null);

  useEffect(() => {
    const initializeLevel = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      let levelData = await LevelService.getPlayerLevel(session.user.id);
      if (!levelData) {
        levelData = await LevelService.initializePlayerLevel(session.user.id);
      }
      setPlayerLevel(levelData);
    };

    initializeLevel();
  }, []);

  if (!playerLevel) return null;

  return (
    <div className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
      <div className="flex flex-col items-end">
        <div className="text-white text-lg font-bold lowercase">
          level {playerLevel.level}
        </div>
        <div className="w-48 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${
                (playerLevel.experience / Math.pow(playerLevel.level * 10, 2)) *
                100
              }%`,
            }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="text-white/70 text-sm mt-1 lowercase">
          {playerLevel.experience} / {Math.pow(playerLevel.level * 10, 2)} xp
        </div>
      </div>
    </div>
  );
}
