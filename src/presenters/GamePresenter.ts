// Presenter - The Game's Middleman (Logic + Communication)
import { GameModel, GameState, Player, Weapon } from '../models/GameModel';

export interface GameView {
  updatePlayerStats(player: Player): void;
  updateGameTime(time: number): void;
  updateScore(terroristScore: number, ctScore: number): void;
  showWeaponSelection(weapons: Weapon[]): void;
  displayHealthBar(health: number, armor: number): void;
  playSound(soundType: string): void;
  showNotification(message: string): void;
}

export class GamePresenter {
  private model: GameModel;
  private view: GameView | null = null;
  private currentPlayer: Player | null = null;
  private gameLoop: number | null = null;

  constructor(model: GameModel) {
    this.model = model;
  }

  // View registration
  setView(view: GameView): void {
    this.view = view;
  }

  // Input handling from user interactions
  handlePlayerJoin(playerName: string, team: 'terrorist' | 'counter-terrorist'): Player {
    const newPlayer = this.model.addPlayer({
      name: playerName,
      health: 100,
      armor: 0,
      position: { x: 0, y: 0, z: 0 },
      team,
      money: 800,
      weapons: [],
      isAlive: true,
      kills: 0,
      deaths: 0,
      assists: 0,
    });

    this.currentPlayer = newPlayer;
    this.updateView();
    this.view?.showNotification(`${playerName} joined as ${team}`);
    return newPlayer;
  }

  handleWeaponPurchase(weaponId: string): void {
    if (!this.currentPlayer) return;

    const success = this.model.purchaseWeapon(this.currentPlayer.id, weaponId);
    if (success) {
      this.view?.playSound('weapon_purchase');
      this.view?.showNotification('Weapon purchased successfully');
      this.updateView();
    } else {
      this.view?.showNotification('Insufficient funds');
    }
  }

  handleDamage(playerId: string, damage: number): void {
    const gameState = this.model.getGameState();
    const player = gameState.players.find(p => p.id === playerId);
    
    if (player && player.isAlive) {
      const newHealth = Math.max(0, player.health - damage);
      this.model.updatePlayerHealth(playerId, newHealth);
      
      if (newHealth === 0) {
        this.view?.playSound('player_death');
        this.view?.showNotification(`${player.name} was eliminated`);
      }
      
      this.updateView();
    }
  }

  handleRoundStart(): void {
    this.view?.showNotification('Round started!');
    this.startGameLoop();
  }

  handleRoundEnd(winningTeam: 'terrorist' | 'counter-terrorist'): void {
    this.model.updateScore(winningTeam);
    this.view?.showNotification(`${winningTeam.toUpperCase()} team wins the round!`);
    this.stopGameLoop();
    this.updateView();
  }

  // Client prediction for responsiveness
  predictMovement(playerId: string, newPosition: { x: number; y: number; z: number }): void {
    // Local prediction logic would go here
    // In a real game, this would update local state immediately
    // and then reconcile with server updates
  }

  predictWeaponFire(weaponId: string): void {
    // Immediate visual feedback for weapon firing
    this.view?.playSound('weapon_fire');
    // Visual effects would be triggered here
  }

  // Game loop management
  private startGameLoop(): void {
    if (this.gameLoop) return;

    this.gameLoop = window.setInterval(() => {
      const gameState = this.model.getGameState();
      const newTime = gameState.roundTime - 1;
      
      this.model.updateRoundTime(newTime);
      this.updateView();

      if (newTime <= 0) {
        this.handleRoundEnd('counter-terrorist'); // CT wins if time runs out
      }
    }, 1000);
  }

  private stopGameLoop(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
  }

  // Update view with current model state
  private updateView(): void {
    if (!this.view) return;

    const gameState = this.model.getGameState();
    
    // Update game time
    this.view.updateGameTime(gameState.roundTime);
    
    // Update score
    this.view.updateScore(gameState.terroristScore, gameState.counterTerroristScore);
    
    // Update current player stats
    if (this.currentPlayer) {
      const updatedPlayer = gameState.players.find(p => p.id === this.currentPlayer!.id);
      if (updatedPlayer) {
        this.view.updatePlayerStats(updatedPlayer);
        this.view.displayHealthBar(updatedPlayer.health, updatedPlayer.armor);
      }
    }
  }

  // Get data for view
  getAvailableWeapons(): Weapon[] {
    return this.model.getWeapons();
  }

  getCurrentGameState(): GameState {
    return this.model.getGameState();
  }

  getCurrentPlayer(): Player | null {
    return this.currentPlayer;
  }

  // Cleanup
  destroy(): void {
    this.stopGameLoop();
    this.view = null;
  }
}