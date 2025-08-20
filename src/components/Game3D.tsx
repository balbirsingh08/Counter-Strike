import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Plane } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Weapon3D } from './Weapon3D';
import { Weapon } from '../models/GameModel';

interface Player3DProps {
  position: [number, number, number];
  color: string;
  name: string;
  health: number;
}

interface Bot3DProps {
  position: [number, number, number];
  playerPosition: [number, number, number];
  onHit: () => void;
}

// Enhanced Player Component - CS2 Crasswater Style
const Player3D = ({ position, color, name, health }: Player3DProps) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle breathing animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
    }
  });

  return (
    <group position={position}>
      {/* Main Body - Counter-Terrorist uniform */}
      <mesh ref={meshRef} position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.65, 1.3, 0.4]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      
      {/* Tactical Vest - More detailed */}
      <mesh position={[0, 1.15, 0.21]} castShadow>
        <boxGeometry args={[0.6, 0.9, 0.18]} />
        <meshPhongMaterial color="#34495e" />
      </mesh>
      
      {/* Chest Plate Details */}
      <mesh position={[0, 1.3, 0.31]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.05]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      
      {/* Tactical Pouches */}
      <mesh position={[-0.2, 0.9, 0.31]} castShadow>
        <boxGeometry args={[0.12, 0.15, 0.08]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      <mesh position={[0.2, 0.9, 0.31]} castShadow>
        <boxGeometry args={[0.12, 0.15, 0.08]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      
      {/* Head - More realistic skin tone */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <boxGeometry args={[0.38, 0.42, 0.38]} />
        <meshPhongMaterial color="#deb887" />
      </mesh>
      
      {/* Tactical Helmet with details */}
      <mesh position={[0, 2.02, 0]} castShadow>
        <boxGeometry args={[0.45, 0.28, 0.45]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      
      {/* Helmet Strap */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <boxGeometry args={[0.48, 0.08, 0.48]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      
      {/* Tactical Goggles */}
      <mesh position={[0, 1.88, 0.19]} castShadow>
        <boxGeometry args={[0.32, 0.15, 0.08]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      
      {/* Arms with tactical sleeves */}
      <mesh position={[-0.42, 0.85, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.2, 0.95, 0.2]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.42, 0.85, 0]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.2, 0.95, 0.2]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      
      {/* Elbow Pads */}
      <mesh position={[-0.42, 0.6, 0]} castShadow>
        <boxGeometry args={[0.22, 0.15, 0.22]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      <mesh position={[0.42, 0.6, 0]} castShadow>
        <boxGeometry args={[0.22, 0.15, 0.22]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      
      {/* Tactical Gloves */}
      <mesh position={[-0.52, 0.28, 0]} castShadow>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      <mesh position={[0.52, 0.28, 0]} castShadow>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      
      {/* Tactical Pants */}
      <mesh position={[-0.16, 0.05, 0]} castShadow>
        <boxGeometry args={[0.22, 0.85, 0.22]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.16, 0.05, 0]} castShadow>
        <boxGeometry args={[0.22, 0.85, 0.22]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      
      {/* Knee Pads */}
      <mesh position={[-0.16, -0.1, 0.12]} castShadow>
        <boxGeometry args={[0.24, 0.18, 0.12]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      <mesh position={[0.16, -0.1, 0.12]} castShadow>
        <boxGeometry args={[0.24, 0.18, 0.12]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      
      {/* Combat Boots - More detailed */}
      <mesh position={[-0.16, -0.38, 0.12]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.45]} />
        <meshPhongMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.16, -0.38, 0.12]} castShadow>
        <boxGeometry args={[0.28, 0.18, 0.45]} />
        <meshPhongMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Boot Laces */}
      <mesh position={[-0.16, -0.32, 0.24]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.02]} />
        <meshPhongMaterial color="#444444" />
      </mesh>
      <mesh position={[0.16, -0.32, 0.24]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.02]} />
        <meshPhongMaterial color="#444444" />
      </mesh>

      {/* Player Name with better styling */}
      <Text
        position={[0, 2.7, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {name}
      </Text>
      
      {/* Enhanced Health Bar */}
      <group position={[0, 2.4, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.08, 0.02]} />
          <meshBasicMaterial color="#660000" />
        </mesh>
        <mesh position={[-(1.2 - (health / 100) * 1.2) / 2, 0, 0.01]}>
          <boxGeometry args={[(health / 100) * 1.2, 0.08, 0.03]} />
          <meshBasicMaterial color={health > 50 ? "#00ff00" : health > 25 ? "#ffff00" : "#ff0000"} />
        </mesh>
      </group>
    </group>
  );
};

// Enhanced Bot Component - CS Terrorist Style
const Bot3D = ({ position, playerPosition, onHit }: Bot3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);
  const [botPos, setBotPos] = useState<[number, number, number]>(position);
  const [isMoving, setIsMoving] = useState(true);
  const [health, setHealth] = useState(100);
  const [lastShot, setLastShot] = useState(0);
  const [isHit, setIsHit] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Enhanced AI movement with wall collision detection
    if (isMoving && health > 0) {
      let newX = position[0] + Math.sin(time * 0.4) * 2.5;
      let newZ = position[2] + Math.cos(time * 0.3) * 2;
      
      // Wall collision detection - keep bots inside boundaries
      const mapBoundary = 13; // Slightly inside the wall boundaries
      newX = Math.max(-mapBoundary, Math.min(mapBoundary, newX));
      newZ = Math.max(-mapBoundary, Math.min(mapBoundary, newZ));
      
      // Avoid cover objects collision
      const coverPositions = [
        { x: 5, z: 5, size: 1.5 },
        { x: -5, z: -5, size: 1.5 },
        { x: 0, z: -8, size: 2.5 },
        { x: 8, z: -3, size: 1.5 },
        { x: -8, z: 3, size: 1.5 }
      ];
      
      for (const cover of coverPositions) {
        const distX = Math.abs(newX - cover.x);
        const distZ = Math.abs(newZ - cover.z);
        if (distX < cover.size && distZ < cover.size) {
          // Push bot away from cover
          newX += (newX > cover.x ? 1 : -1) * 0.5;
          newZ += (newZ > cover.z ? 1 : -1) * 0.5;
        }
      }
      
      setBotPos([newX, position[1], newZ]);
      meshRef.current.position.set(newX, position[1], newZ);
      
      // Add walking animation
      if (bodyRef.current) {
        bodyRef.current.rotation.x = Math.sin(time * 4) * 0.1;
        bodyRef.current.position.y = 0.9 + Math.sin(time * 8) * 0.03;
      }
    }

    // Look at player smoothly
    const playerVec = new Vector3(...playerPosition);
    if (health > 0) {
      meshRef.current.lookAt(playerVec);
    }

    // Shoot at player occasionally
    if (time - lastShot > 3 && health > 0) {
      setLastShot(time);
      console.log('Bot shooting at player!');
    }

    // Reset hit animation
    if (isHit) {
      setTimeout(() => setIsHit(false), 200);
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();
    if (health <= 0) return;
    
    setIsHit(true);
    setHealth(prev => {
      const newHealth = Math.max(0, prev - 25);
      if (newHealth === 0) {
        setIsMoving(false);
        onHit();
        console.log('Bot eliminated!');
      }
      return newHealth;
    });
  };

  const isDead = health <= 0;
  const hitColor = isHit ? "#ff0000" : "#cc3333";
  const deadColor = "#444444";

  return (
    <group position={botPos}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Main Body - Terrorist outfit with more detail */}
        <mesh ref={bodyRef} position={[0, 0.9, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.65, 1.3, 0.4]} />
          <meshPhongMaterial 
            color={isDead ? deadColor : "#654321"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Terrorist Vest - Worn and weathered */}
        <mesh position={[0, 1.15, 0.21]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.6, 0.9, 0.18]} />
          <meshPhongMaterial 
            color={isDead ? "#111111" : "#2d1b0e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Ammo Pouches */}
        <mesh position={[-0.22, 1.0, 0.31]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.1]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#1a1a1a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.22, 1.0, 0.31]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.1]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#1a1a1a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Head - Darker skin tone */}
        <mesh position={[0, 1.85, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.38, 0.42, 0.38]} />
          <meshPhongMaterial 
            color={isDead ? "#444444" : "#8B6914"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Terrorist Balaclava/Mask - More detailed */}
        <mesh position={[0, 1.92, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.42, 0.38, 0.42]} />
          <meshPhongMaterial 
            color={isDead ? "#050505" : "#000000"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Eye holes in mask */}
        <mesh position={[-0.08, 1.88, 0.21]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshPhongMaterial 
            color={isDead ? "#222222" : "#8B6914"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.08, 1.88, 0.21]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshPhongMaterial 
            color={isDead ? "#222222" : "#8B6914"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Arms - Military style */}
        <mesh position={[-0.42, 0.85, 0]} rotation={[0, 0, 0.2]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.2, 0.95, 0.2]} />
          <meshPhongMaterial 
            color={isDead ? deadColor : "#654321"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.42, 0.85, 0]} rotation={[0, 0, -0.2]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.2, 0.95, 0.2]} />
          <meshPhongMaterial 
            color={isDead ? deadColor : "#654321"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Tactical Gloves */}
        <mesh position={[-0.52, 0.28, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshPhongMaterial 
            color={isDead ? "#333333" : "#2d1b0e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.52, 0.28, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshPhongMaterial 
            color={isDead ? "#333333" : "#2d1b0e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Military Cargo Pants */}
        <mesh position={[-0.16, 0.05, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.22, 0.85, 0.22]} />
          <meshPhongMaterial 
            color={isDead ? "#1a1a1a" : "#4a4a2a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.16, 0.05, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.22, 0.85, 0.22]} />
          <meshPhongMaterial 
            color={isDead ? "#1a1a1a" : "#4a4a2a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Combat Boots - More detailed */}
        <mesh position={[-0.16, -0.38, 0.12]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.28, 0.18, 0.45]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#2d1b0e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.16, -0.38, 0.12]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.28, 0.18, 0.45]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#2d1b0e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
      </mesh>

      {/* Enhanced Weapon - AK-47 style */}
      {!isDead && (
        <Weapon3D
          weaponType="rifle"
          position={[0.3, 0.4, -0.1]}
          rotation={[0, 0, 0]}
          scale={0.9}
        />
      )}

      {/* Bot Name with terrorist styling */}
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.12}
        color={isDead ? "#666666" : "#ff4444"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {isDead ? "💀 ELIMINATED" : "☠️ TERRORIST"}
      </Text>
      
      {/* Enhanced Health Bar */}
      {!isDead && (
        <group position={[0, 2.3, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 0.08, 0.02]} />
            <meshBasicMaterial color="#660000" />
          </mesh>
          <mesh position={[-(1.2 - (health / 100) * 1.2) / 2, 0, 0.01]}>
            <boxGeometry args={[(health / 100) * 1.2, 0.08, 0.03]} />
            <meshBasicMaterial color={health > 50 ? "#00ff00" : health > 25 ? "#ffff00" : "#ff0000"} />
          </mesh>
        </group>
      )}

      {/* Enhanced hit effect */}
      {isHit && (
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[1]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.4} />
        </mesh>
      )}

      {/* Blood effect when dead */}
      {isDead && (
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.5, 8]} />
          <meshBasicMaterial color="#8B0000" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
};

// Map/Environment - Enhanced
const GameMap = () => {
  return (
    <>
      {/* Ground with texture pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshPhongMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Grid pattern on ground */}
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i}>
          <mesh position={[i * 5 - 12.5, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.1, 30]} />
            <meshBasicMaterial color="#444444" />
          </mesh>
          <mesh position={[0, 0.01, i * 5 - 12.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[30, 0.1]} />
            <meshBasicMaterial color="#444444" />
          </mesh>
        </group>
      ))}
      
      {/* Perimeter walls */}
      <mesh position={[15, 1.5, 0]} castShadow>
        <boxGeometry args={[0.5, 3, 30]} />
        <meshPhongMaterial color="#555555" />
      </mesh>
      <mesh position={[-15, 1.5, 0]} castShadow>
        <boxGeometry args={[0.5, 3, 30]} />
        <meshPhongMaterial color="#555555" />
      </mesh>
      <mesh position={[0, 1.5, 15]} castShadow>
        <boxGeometry args={[30, 3, 0.5]} />
        <meshPhongMaterial color="#555555" />
      </mesh>
      <mesh position={[0, 1.5, -15]} castShadow>
        <boxGeometry args={[30, 3, 0.5]} />
        <meshPhongMaterial color="#555555" />
      </mesh>

      {/* Cover objects - More tactical */}
      <mesh position={[5, 1, 5]} castShadow>
        <boxGeometry args={[2, 2, 0.3]} />
        <meshPhongMaterial color="#666666" />
      </mesh>
      <mesh position={[-5, 0.75, -5]} castShadow>
        <boxGeometry args={[1, 1.5, 1]} />
        <meshPhongMaterial color="#777777" />
      </mesh>
      <mesh position={[0, 0.25, -8]} castShadow>
        <boxGeometry args={[4, 0.5, 1]} />
        <meshPhongMaterial color="#888888" />
      </mesh>
      
      {/* Additional cover - Crates */}
      <mesh position={[8, 0.5, -3]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-8, 0.5, 3]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial color="#8B4513" />
      </mesh>
    </>
  );
};

// Win Screen Component
const WinScreen = ({ onRestart, onExit }: { onRestart: () => void; onExit: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-gradient-to-b from-green-900 to-green-700 p-8 rounded-lg border-2 border-green-400 text-center max-w-md">
        <div className="text-4xl mb-4">🏆</div>
        <div className="text-2xl font-bold text-green-100 mb-2">MISSION ACCOMPLISHED!</div>
        <div className="text-lg text-green-200 mb-6">All terrorists eliminated!</div>
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onExit}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🚪 Exit Game
          </button>
        </div>
      </div>
    </div>
  );
};

interface Game3DProps {
  playerName: string;
  playerTeam: 'terrorist' | 'counter-terrorist';
  playerHealth: number;
  playerWeapon?: Weapon;
  onBotKill: () => void;
  onGameExit?: () => void;
}

const Game3D = ({ playerName, playerTeam, playerHealth, playerWeapon, onBotKill, onGameExit }: Game3DProps) => {
  const [playerPosition] = useState<[number, number, number]>([0, 0, -8]);
  const [kills, setKills] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const totalBots = 5;

  const handleBotHit = () => {
    const newKills = kills + 1;
    setKills(newKills);
    onBotKill();
    
    if (newKills >= totalBots) {
      setGameWon(true);
    }
  };

  const handleRestart = () => {
    setKills(0);
    setGameWon(false);
    // This will trigger a re-render and reset all bots
    window.location.reload();
  };

  const handleExit = () => {
    if (onGameExit) {
      onGameExit();
    }
  };

  return (
    <div className="w-full h-screen relative">
      {gameWon && (
        <WinScreen onRestart={handleRestart} onExit={handleExit} />
      )}
      
      {/* Kill Counter - Enhanced */}
      <div className="absolute top-4 left-4 z-40 bg-black/80 text-white p-6 rounded-lg border border-red-500/30">
        <div className="text-2xl font-bold text-red-400">💀 Kills: {kills}</div>
        <div className="text-sm text-green-400">🎯 Click on bots to shoot!</div>
        <div className="text-xs text-blue-300">🖱️ Right-click + drag to look around</div>
        <div className="text-xs text-yellow-300">⚡ Eliminate all terrorists!</div>
      </div>

      <Canvas
        camera={{ position: playerPosition, fov: 75 }}
        gl={{ antialias: true }}
        shadows
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Environment */}
        <GameMap />

        {/* Player (you) */}
        <Player3D
          position={playerPosition}
          color={playerTeam === 'terrorist' ? '#ff6b35' : '#4a90e2'}
          name={playerName}
          health={playerHealth}
        />

        {/* Player's Weapon in Hand - Fixed positioning and made more visible */}
        {playerWeapon && playerWeapon.type !== 'grenade' && (
          <group position={playerPosition}>
            <Weapon3D
              weaponType={playerWeapon.type}
              position={[0.4, 0.8, 0.3]}
              rotation={[0, Math.PI / 6, Math.PI / 12]}
              scale={0.8}
            />
          </group>
        )}

        {/* Bots - More spread out for better gameplay */}
        <Bot3D
          position={[7, 0, 8]}
          playerPosition={playerPosition}
          onHit={handleBotHit}
        />
        <Bot3D
          position={[-6, 0, 5]}
          playerPosition={playerPosition}
          onHit={handleBotHit}
        />
        <Bot3D
          position={[3, 0, -7]}
          playerPosition={playerPosition}
          onHit={handleBotHit}
        />
        <Bot3D
          position={[-8, 0, -4]}
          playerPosition={playerPosition}
          onHit={handleBotHit}
        />
        <Bot3D
          position={[0, 0, 10]}
          playerPosition={playerPosition}
          onHit={handleBotHit}
        />

        {/* Enhanced Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
        />
      </Canvas>

      {/* Enhanced Instructions */}
      <div className="absolute bottom-4 left-4 z-40 bg-black/80 text-white p-4 rounded-lg border border-blue-500/30 max-w-sm">
        <div className="text-sm space-y-2">
          <div className="text-yellow-400 font-bold">🎮 GAME CONTROLS</div>
          <div>🎯 <strong>LEFT CLICK</strong> on red bots to shoot</div>
          <div>🖱️ <strong>RIGHT CLICK + DRAG</strong> to look around</div>
          <div>🔍 <strong>SCROLL</strong> to zoom in/out</div>
          <div className="text-red-400 font-bold">⚡ MISSION: Eliminate all terrorists!</div>
        </div>
      </div>

      {/* Crosshair Enhancement */}
      <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
        <div className="relative">
          <div className="absolute w-8 h-0.5 bg-red-500 -translate-x-4 translate-y-0 shadow-lg"></div>
          <div className="absolute w-0.5 h-8 bg-red-500 translate-x-0 -translate-y-4 shadow-lg"></div>
          <div className="w-3 h-3 border-2 border-red-500 rounded-full shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Game3D;