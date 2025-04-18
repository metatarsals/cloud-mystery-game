import { supabase } from "./supabase";

export interface PlayerLevel {
  id: string;
  level: number;
  experience: number;
  last_updated: string;
}

export class LevelService {
  static async getPlayerLevel(userId: string): Promise<PlayerLevel | null> {
    const { data, error } = await supabase
      .from("player_levels")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching player level:", error);
      return null;
    }

    return data;
  }

  static async initializePlayerLevel(
    userId: string
  ): Promise<PlayerLevel | null> {
    const { data, error } = await supabase
      .from("player_levels")
      .insert([
        {
          id: userId,
          level: 1,
          experience: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error initializing player level:", error);
      return null;
    }

    return data;
  }

  static async addExperience(
    userId: string,
    experience: number
  ): Promise<PlayerLevel | null> {
    // First get current level and experience
    const currentLevel = await this.getPlayerLevel(userId);
    if (!currentLevel) {
      return null;
    }

    // Calculate new experience and level
    const newExperience = currentLevel.experience + experience;
    const newLevel = this.calculateLevel(newExperience);

    // Update the player's level and experience
    const { data, error } = await supabase
      .from("player_levels")
      .update({
        level: newLevel,
        experience: newExperience,
        last_updated: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating player level:", error);
      return null;
    }

    return data;
  }

  private static calculateLevel(experience: number): number {
    // Simple level calculation formula
    // You can adjust this formula based on your game's needs
    return Math.floor(Math.sqrt(experience / 100)) + 1;
  }

  static async getExperienceToNextLevel(currentLevel: number): Promise<number> {
    // Calculate experience needed for next level
    return Math.pow(currentLevel * 10, 2);
  }
}
