// Model - The Game's Data & Rules (Authoritative State)
export interface Player {
  id: string;
  name: string;
  health: number;
  armor: number;
  position: { x: number; y: number; z: number };
  team: 'terrorist' | 'counter-terrorist';
  money: number;
  weapons: Weapon[];
  isAlive: boolean;
  kills: number;
  deaths: number;
  assists: number;
}

export interface Weapon {
  id: string;
  name: string;
  type: 'rifle' | 'pistol' | 'sniper' | 'smg' | 'shotgun' | 'grenade';
  damage: number;
  accuracy: number;
  fireRate: number;
  magazineSize: number;
  currentAmmo: number;
  reserveAmmo: number;
  price: number;
  recoilPattern: number[];
}

export interface GameState {
  roundNumber: number;
  roundTime: number;
  maxRoundTime: number;
  terroristScore: number;
  counterTerroristScore: number;
  phase: 'warmup' | 'freezetime' | 'live' | 'ended';
  players: Player[];
  bombPlanted: boolean;
  bombTimer: number;
}

export interface MapData {
  name: string;
  spawnPoints: {
    terrorist: { x: number; y: number; z: number }[];
    counterTerrorist: { x: number; y: number; z: number }[];
  };
  bombSites: {
    A: { x: number; y: number; z: number };
    B: { x: number; y: number; z: number };
  };
}

export class GameModel {
  private gameState: GameState;
  private mapData: MapData;
  private weapons: Weapon[];

  constructor() {
    this.gameState = this.initializeGameState();
    this.mapData = this.initializeMapData();
    this.weapons = this.initializeWeapons();
  }

  private initializeGameState(): GameState {
    return {
      roundNumber: 1,
      roundTime: 115,
      maxRoundTime: 115,
      terroristScore: 0,
      counterTerroristScore: 0,
      phase: 'warmup',
      players: [],
      bombPlanted: false,
      bombTimer: 40,
    };
  }

  private initializeMapData(): MapData {
    return {
      name: 'de_dust2',
      spawnPoints: {
        terrorist: [
          { x: 0, y: 0, z: 0 },
          { x: 10, y: 0, z: 0 },
        ],
        counterTerrorist: [
          { x: 100, y: 0, z: 0 },
          { x: 110, y: 0, z: 0 },
        ],
      },
      bombSites: {
        A: { x: 80, y: 0, z: 0 },
        B: { x: 120, y: 0, z: 0 },
      },
    };
  }

  private initializeWeapons(): Weapon[] {
    return [
      {
        id: 'ak47',
        name: 'AK-47',
        type: 'rifle',
        damage: 36,
        accuracy: 73,
        fireRate: 600,
        magazineSize: 30,
        currentAmmo: 30,
        reserveAmmo: 90,
        price: 2700,
        recoilPattern: [0, 2, 4, 6, 8, 10, 8, 6, 4, 2],
      },
      {
        id: 'm4a4',
        name: 'M4A4',
        type: 'rifle',
        damage: 33,
        accuracy: 78,
        fireRate: 666,
        magazineSize: 30,
        currentAmmo: 30,
        reserveAmmo: 90,
        price: 3100,
        recoilPattern: [0, 1, 3, 5, 7, 9, 7, 5, 3, 1],
      },
      {
        id: 'awp',
        name: 'AWP',
        type: 'sniper',
        damage: 115,
        accuracy: 95,
        fireRate: 41,
        magazineSize: 10,
        currentAmmo: 10,
        reserveAmmo: 30,
        price: 4750,
        recoilPattern: [0, 5, 10, 15, 20],
      },
      {
        id: 'glock',
        name: 'Glock-18',
        type: 'pistol',
        damage: 28,
        accuracy: 56,
        fireRate: 400,
        magazineSize: 20,
        currentAmmo: 20,
        reserveAmmo: 120,
        price: 200,
        recoilPattern: [0, 1, 2, 3, 4],
      },
    ];
  }

  // Public methods for game state management
  getGameState(): GameState {
    return { ...this.gameState };
  }

  getWeapons(): Weapon[] {
    return [...this.weapons];
  }

  updateRoundTime(time: number): void {
    this.gameState.roundTime = Math.max(0, time);
  }

  addPlayer(player: Omit<Player, 'id'>): Player {
    const newPlayer: Player = {
      ...player,
      id: `player_${Date.now()}_${Math.random()}`,
    };
    this.gameState.players.push(newPlayer);
    return newPlayer;
  }

  updatePlayerHealth(playerId: string, health: number): void {
    const player = this.gameState.players.find(p => p.id === playerId);
    if (player) {
      player.health = Math.max(0, health);
      if (player.health === 0) {
        player.isAlive = false;
      }
    }
  }

  purchaseWeapon(playerId: string, weaponId: string): boolean {
    const player = this.gameState.players.find(p => p.id === playerId);
    const weapon = this.weapons.find(w => w.id === weaponId);
    
    if (player && weapon && player.money >= weapon.price) {
      player.money -= weapon.price;
      player.weapons.push({ ...weapon });
      return true;
    }
    return false;
  }

  updateScore(team: 'terrorist' | 'counter-terrorist'): void {
    if (team === 'terrorist') {
      this.gameState.terroristScore++;
    } else {
      this.gameState.counterTerroristScore++;
    }
  }
}