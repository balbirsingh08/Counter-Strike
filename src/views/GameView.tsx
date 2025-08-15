// View - Game's Output Layer (Presentation) - React Implementation
import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { GameView as IGameView } from "../presenters/GamePresenter";
import { Player, Weapon } from "../models/GameModel";

export class ReactGameView implements IGameView {
  private setPlayerStats: ((player: Player) => void) | null = null;
  private setGameTime: ((time: number) => void) | null = null;
  private setScore: ((tScore: number, ctScore: number) => void) | null = null;
  private setWeapons: ((weapons: Weapon[]) => void) | null = null;
  private setHealth: ((health: number, armor: number) => void) | null = null;

  // React hook for connecting to React state
  useGameView() {
    const [playerStats, setPlayerStatsState] = useState<Player | null>(null);
    const [gameTime, setGameTimeState] = useState<number>(115);
    const [score, setScoreState] = useState<{ terrorist: number; ct: number }>({ terrorist: 0, ct: 0 });
    const [weapons, setWeaponsState] = useState<Weapon[]>([]);
    const [health, setHealthState] = useState<{ health: number; armor: number }>({ health: 100, armor: 0 });

    // Connect setters
    this.setPlayerStats = setPlayerStatsState;
    this.setGameTime = setGameTimeState;
    this.setScore = (tScore: number, ctScore: number) => setScoreState({ terrorist: tScore, ct: ctScore });
    this.setWeapons = setWeaponsState;
    this.setHealth = (health: number, armor: number) => setHealthState({ health, armor });

    return {
      playerStats,
      gameTime,
      score,
      weapons,
      health,
    };
  }

  updatePlayerStats(player: Player): void {
    this.setPlayerStats?.(player);
  }

  updateGameTime(time: number): void {
    this.setGameTime?.(time);
  }

  updateScore(terroristScore: number, ctScore: number): void {
    this.setScore?.(terroristScore, ctScore);
  }

  showWeaponSelection(weapons: Weapon[]): void {
    this.setWeapons?.(weapons);
  }

  displayHealthBar(health: number, armor: number): void {
    this.setHealth?.(health, armor);
  }

  playSound(soundType: string): void {
    // In a real implementation, this would play actual game sounds
    console.log(`Playing sound: ${soundType}`);
  }

  showNotification(message: string): void {
    toast({
      title: "Game Update",
      description: message,
      duration: 3000,
    });
  }
}