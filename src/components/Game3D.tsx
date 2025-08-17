import { Canvas, useThree } from '@react-three/fiber';
import { Text, Box, Sphere, Plane } from '@react-three/drei';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Mesh, Vector3, Euler } from 'three';
import { useFrame } from '@react-three/fiber';

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

// Player Component
const Player3D = ({ position, color, name, health }: Player3DProps) => {
  return (
    <group position={position}>
      {/* Player Body */}
      <Box args={[0.5, 1.5, 0.3]} position={[0, 0.75, 0]}>
        <meshPhongMaterial color={color} />
      </Box>
      {/* Player Head */}
      <Sphere args={[0.3]} position={[0, 1.8, 0]}>
        <meshPhongMaterial color={color} />
      </Sphere>
      {/* Player Name */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      {/* Health Bar */}
      <group position={[0, 2.2, 0]}>
        <Box args={[1, 0.1, 0.02]} position={[0, 0, 0]}>
          <meshBasicMaterial color="red" />
        </Box>
        <Box args={[health / 100, 0.1, 0.03]} position={[-(1 - health / 100) / 2, 0, 0.01]}>
          <meshBasicMaterial color="green" />
        </Box>
      </group>
    </group>
  );
};

// Bot Component with AI
const Bot3D = ({ position, playerPosition, onHit }: Bot3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const [botPos, setBotPos] = useState<[number, number, number]>(position);
  const [isMoving, setIsMoving] = useState(true);
  const [health, setHealth] = useState(100);
  const [lastShot, setLastShot] = useState(0);
  const [isHit, setIsHit] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Simple AI movement - patrol pattern
    if (isMoving && health > 0) {
      const newX = position[0] + Math.sin(time * 0.3) * 2;
      const newZ = position[2] + Math.cos(time * 0.2) * 1.5;
      setBotPos([newX, position[1], newZ]);
      meshRef.current.position.set(newX, position[1], newZ);
    }

    // Look at player
    const playerVec = new Vector3(...playerPosition);
    if (health > 0) {
      meshRef.current.lookAt(playerVec);
    }

    // Shoot at player occasionally
    if (time - lastShot > 4 && health > 0) {
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

  return (
    <group>
      {/* Bot Body - Improved visuals */}
      <mesh ref={meshRef} position={botPos} onClick={handleClick}>
        {/* Torso */}
        <boxGeometry args={[0.6, 1.2, 0.3]} />
        <meshPhongMaterial 
          color={isDead ? "#444444" : isHit ? "#ff0000" : "#cc3333"} 
          transparent={isDead}
          opacity={isDead ? 0.5 : 1}
        />
      </mesh>
      
      {/* Bot Head */}
      <mesh position={[botPos[0], botPos[1] + 1.4, botPos[2]]} onClick={handleClick}>
        <sphereGeometry args={[0.25]} />
        <meshPhongMaterial 
          color={isDead ? "#333333" : isHit ? "#ff4444" : "#bb2222"} 
          transparent={isDead}
          opacity={isDead ? 0.5 : 1}
        />
      </mesh>

      {/* Arms */}
      <mesh position={[botPos[0] - 0.4, botPos[1] + 0.5, botPos[2]]} onClick={handleClick}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshPhongMaterial color={isDead ? "#444444" : "#aa2222"} transparent={isDead} opacity={isDead ? 0.5 : 1} />
      </mesh>
      <mesh position={[botPos[0] + 0.4, botPos[1] + 0.5, botPos[2]]} onClick={handleClick}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshPhongMaterial color={isDead ? "#444444" : "#aa2222"} transparent={isDead} opacity={isDead ? 0.5 : 1} />
      </mesh>

      {/* Legs */}
      <mesh position={[botPos[0] - 0.15, botPos[1] - 0.8, botPos[2]]} onClick={handleClick}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshPhongMaterial color={isDead ? "#333333" : "#992222"} transparent={isDead} opacity={isDead ? 0.5 : 1} />
      </mesh>
      <mesh position={[botPos[0] + 0.15, botPos[1] - 0.8, botPos[2]]} onClick={handleClick}>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshPhongMaterial color={isDead ? "#333333" : "#992222"} transparent={isDead} opacity={isDead ? 0.5 : 1} />
      </mesh>

      {/* Weapon */}
      {!isDead && (
        <mesh position={[botPos[0] + 0.3, botPos[1] + 0.3, botPos[2] - 0.2]} onClick={handleClick}>
          <boxGeometry args={[0.1, 0.1, 0.8]} />
          <meshPhongMaterial color="#222222" />
        </mesh>
      )}

      {/* Bot Name with better styling */}
      <Text
        position={[botPos[0], botPos[1] + 2, botPos[2]]}
        fontSize={0.15}
        color={isDead ? "#666666" : "#ff4444"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {isDead ? "💀 ELIMINATED" : "🎯 TERRORIST BOT"}
      </Text>
      
      {/* Health Bar - Only show if alive */}
      {!isDead && (
        <group position={[botPos[0], botPos[1] + 1.7, botPos[2]]}>
          {/* Background */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 0.08, 0.02]} />
            <meshBasicMaterial color="#660000" />
          </mesh>
          {/* Health fill */}
          <mesh position={[-(1 - health / 100) / 2, 0, 0.01]}>
            <boxGeometry args={[health / 100, 0.08, 0.03]} />
            <meshBasicMaterial color={health > 50 ? "#00ff00" : health > 25 ? "#ffff00" : "#ff0000"} />
          </mesh>
        </group>
      )}

      {/* Hit effect */}
      {isHit && (
        <mesh position={[botPos[0], botPos[1] + 0.5, botPos[2]]}>
          <sphereGeometry args={[0.8]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
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

// Mouse Look Controls
const MouseLookControls = () => {
  const { camera } = useThree();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const sensitivity = 0.002;
      setRotation(prev => ({
        x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.x - event.movementY * sensitivity)),
        y: prev.y - event.movementX * sensitivity
      }));
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      return () => canvas.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useFrame(() => {
    camera.rotation.x = rotation.x;
    camera.rotation.y = rotation.y;
  });

  return null;
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
  onBotKill: () => void;
  onGameExit?: () => void;
}

const Game3D = ({ playerName, playerTeam, playerHealth, onBotKill, onGameExit }: Game3DProps) => {
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
        <div className="text-xs text-blue-300">🖱️ Move mouse to look around</div>
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

        {/* Mouse Look Controls */}
        <MouseLookControls />
      </Canvas>

      {/* Enhanced Instructions */}
      <div className="absolute bottom-4 left-4 z-40 bg-black/80 text-white p-4 rounded-lg border border-blue-500/30 max-w-sm">
        <div className="text-sm space-y-2">
          <div className="text-yellow-400 font-bold">🎮 GAME CONTROLS</div>
          <div>🎯 <strong>LEFT CLICK</strong> on red bots to shoot</div>
          <div>🖱️ <strong>MOVE MOUSE</strong> to look around</div>
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