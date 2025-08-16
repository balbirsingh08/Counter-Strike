import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Plane } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { Mesh, Vector3 } from 'three';
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

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Simple AI movement
    if (isMoving) {
      const newX = botPos[0] + Math.sin(time * 0.5) * 0.01;
      const newZ = botPos[2] + Math.cos(time * 0.3) * 0.01;
      setBotPos([newX, botPos[1], newZ]);
      meshRef.current.position.set(newX, botPos[1], newZ);
    }

    // Look at player
    const playerVec = new Vector3(...playerPosition);
    meshRef.current.lookAt(playerVec);

    // Shoot at player occasionally
    if (time - lastShot > 3) {
      setLastShot(time);
      // Visual muzzle flash effect could go here
      console.log('Bot shooting!');
    }
  });

  const handleClick = () => {
    setHealth(prev => {
      const newHealth = Math.max(0, prev - 25);
      if (newHealth === 0) {
        setIsMoving(false);
        onHit();
      }
      return newHealth;
    });
  };

  return (
    <group>
      <mesh ref={meshRef} position={botPos} onClick={handleClick}>
        {/* Bot Body */}
        <boxGeometry args={[0.5, 1.5, 0.3]} />
        <meshPhongMaterial color={health > 0 ? "#ff4444" : "#666666"} />
      </mesh>
      {/* Bot Head */}
      <Sphere args={[0.3]} position={[botPos[0], botPos[1] + 1.05, botPos[2]]}>
        <meshPhongMaterial color={health > 0 ? "#ff4444" : "#666666"} />
      </Sphere>
      {/* Bot Name */}
      <Text
        position={[botPos[0], botPos[1] + 1.7, botPos[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Bot {health > 0 ? '(Alive)' : '(Dead)'}
      </Text>
      {/* Health Bar */}
      {health > 0 && (
        <group position={[botPos[0], botPos[1] + 1.4, botPos[2]]}>
          <Box args={[1, 0.1, 0.02]} position={[0, 0, 0]}>
            <meshBasicMaterial color="red" />
          </Box>
          <Box args={[health / 100, 0.1, 0.03]} position={[-(1 - health / 100) / 2, 0, 0.01]}>
            <meshBasicMaterial color="green" />
          </Box>
        </group>
      )}
    </group>
  );
};

// Map/Environment
const GameMap = () => {
  return (
    <>
      {/* Ground */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshPhongMaterial color="#404040" />
      </Plane>
      
      {/* Walls */}
      <Box args={[0.2, 3, 20]} position={[10, 1.5, 0]}>
        <meshPhongMaterial color="#666666" />
      </Box>
      <Box args={[0.2, 3, 20]} position={[-10, 1.5, 0]}>
        <meshPhongMaterial color="#666666" />
      </Box>
      <Box args={[20, 3, 0.2]} position={[0, 1.5, 10]}>
        <meshPhongMaterial color="#666666" />
      </Box>
      <Box args={[20, 3, 0.2]} position={[0, 1.5, -10]}>
        <meshPhongMaterial color="#666666" />
      </Box>

      {/* Some cover objects */}
      <Box args={[2, 1, 2]} position={[3, 0.5, 3]}>
        <meshPhongMaterial color="#888888" />
      </Box>
      <Box args={[1, 2, 1]} position={[-3, 1, -3]}>
        <meshPhongMaterial color="#888888" />
      </Box>
      <Box args={[3, 0.5, 1]} position={[0, 0.25, -5]}>
        <meshPhongMaterial color="#888888" />
      </Box>
    </>
  );
};

// Crosshair
const Crosshair = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="relative">
        <div className="absolute w-6 h-0.5 bg-white -translate-x-3 translate-y-0"></div>
        <div className="absolute w-0.5 h-6 bg-white translate-x-0 -translate-y-3"></div>
        <div className="w-2 h-2 border border-white rounded-full"></div>
      </div>
    </div>
  );
};

interface Game3DProps {
  playerName: string;
  playerTeam: 'terrorist' | 'counter-terrorist';
  playerHealth: number;
  onBotKill: () => void;
}

const Game3D = ({ playerName, playerTeam, playerHealth, onBotKill }: Game3DProps) => {
  const [playerPosition] = useState<[number, number, number]>([0, 0, -8]);
  const [kills, setKills] = useState(0);

  const handleBotHit = () => {
    setKills(prev => prev + 1);
    onBotKill();
  };

  return (
    <div className="w-full h-screen relative">
      <Crosshair />
      
      {/* Kill Counter */}
      <div className="absolute top-4 left-4 z-40 bg-black/50 text-white p-4 rounded">
        <div className="text-lg font-bold">Kills: {kills}</div>
        <div className="text-sm">Click on bots to shoot them!</div>
        <div className="text-xs text-green-400">Use mouse to look around</div>
      </div>

      <Canvas
        camera={{ position: playerPosition, fov: 75 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 10, 0]} intensity={0.5} />

        {/* Environment */}
        <GameMap />

        {/* Player (you) */}
        <Player3D
          position={playerPosition}
          color={playerTeam === 'terrorist' ? '#ff6b35' : '#4a90e2'}
          name={playerName}
          health={playerHealth}
        />

        {/* Bots */}
        <Bot3D
          position={[5, 0, 5]}
          playerPosition={playerPosition}
          onHit={handleBotHit}
        />
        <Bot3D
          position={[-5, 0, 3]}
          playerPosition={playerPosition}
          onHit={handleBotHit}
        />
        <Bot3D
          position={[2, 0, 8]}
          playerPosition={playerPosition}
          onHit={handleBotHit}
        />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          mouseButtons={{
            LEFT: 2, // Right click for looking around
            MIDDLE: 1,
            RIGHT: 0 // Left click for shooting
          }}
        />
      </Canvas>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-40 bg-black/50 text-white p-4 rounded max-w-sm">
        <div className="text-sm space-y-1">
          <div>🎯 <strong>Click</strong> on red bots to shoot them</div>
          <div>🖱️ <strong>Right-click + drag</strong> to look around</div>
          <div>🎮 <strong>Goal:</strong> Eliminate all enemy bots</div>
        </div>
      </div>
    </div>
  );
};

export default Game3D;