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
  const headRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle breathing animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.01;
    }
    if (headRef.current) {
      // Subtle head movement
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
    if (bodyRef.current) {
      // Subtle body sway
      bodyRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Main Body - CT Special Forces Uniform */}
      <mesh ref={bodyRef} position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.7, 1.4, 0.45]} />
        <meshPhongMaterial 
          color="#1e2832"
          shininess={10}
        />
      </mesh>
      
      {/* Tactical Vest with enhanced details */}
      <mesh position={[0, 1.2, 0.24]} castShadow>
        <boxGeometry args={[0.65, 1.0, 0.2]} />
        <meshPhongMaterial 
          color="#2a3a48"
          shininess={20}
        />
      </mesh>
      
      {/* Chest Armor Plates */}
      <mesh position={[-0.15, 1.35, 0.35]} castShadow>
        <boxGeometry args={[0.25, 0.3, 0.08]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      <mesh position={[0.15, 1.35, 0.35]} castShadow>
        <boxGeometry args={[0.25, 0.3, 0.08]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      
      {/* Side Armor Plates */}
      <mesh position={[-0.32, 1.15, 0.25]} rotation={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.6, 0.08]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      <mesh position={[0.32, 1.15, 0.25]} rotation={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.6, 0.08]} />
        <meshPhongMaterial color="#1a252f" />
      </mesh>
      
      {/* Tactical Belt with Equipment */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.75, 0.12, 0.48]} />
        <meshPhongMaterial color="#0f1419" />
      </mesh>
      
      {/* Magazine Pouches */}
      <mesh position={[-0.25, 0.5, 0.3]} castShadow>
        <boxGeometry args={[0.12, 0.18, 0.15]} />
        <meshPhongMaterial color="#0a0f14" />
      </mesh>
      <mesh position={[0, 0.5, 0.3]} castShadow>
        <boxGeometry args={[0.12, 0.18, 0.15]} />
        <meshPhongMaterial color="#0a0f14" />
      </mesh>
      <mesh position={[0.25, 0.5, 0.3]} castShadow>
        <boxGeometry args={[0.12, 0.18, 0.15]} />
        <meshPhongMaterial color="#0a0f14" />
      </mesh>
      
      {/* Holster */}
      <mesh position={[0.35, 0.35, 0.1]} rotation={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.08, 0.25, 0.1]} />
        <meshPhongMaterial color="#0a0f14" />
      </mesh>
      
      {/* Head with improved proportions */}
      <mesh ref={headRef} position={[0, 1.85, 0]} castShadow>
        <boxGeometry args={[0.4, 0.45, 0.4]} />
        <meshPhongMaterial 
          color="#d4af8c"
          shininess={5}
        />
      </mesh>
      
      {/* Modern Tactical Helmet */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <boxGeometry args={[0.48, 0.32, 0.48]} />
        <meshPhongMaterial 
          color="#1e2832"
          shininess={30}
        />
      </mesh>
      
      {/* Helmet Rails */}
      <mesh position={[-0.2, 2.05, 0]} castShadow>
        <boxGeometry args={[0.04, 0.32, 0.48]} />
        <meshPhongMaterial color="#0f1419" />
      </mesh>
      <mesh position={[0.2, 2.05, 0]} castShadow>
        <boxGeometry args={[0.04, 0.32, 0.48]} />
        <meshPhongMaterial color="#0f1419" />
      </mesh>
      
      {/* NVG Mount */}
      <mesh position={[0, 2.15, 0.15]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.2]} />
        <meshPhongMaterial color="#0a0f14" />
      </mesh>
      
      {/* Tactical Goggles */}
      <mesh position={[0, 1.88, 0.2]} castShadow>
        <boxGeometry args={[0.35, 0.18, 0.08]} />
        <meshPhongMaterial 
          color="#000000"
          shininess={100}
        />
      </mesh>
      
      {/* Goggle Strap */}
      <mesh position={[0, 1.88, -0.15]} castShadow>
        <boxGeometry args={[0.38, 0.06, 0.15]} />
        <meshPhongMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Tactical Arms with better proportions */}
      <mesh position={[-0.45, 0.9, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.22, 1.0, 0.22]} />
        <meshPhongMaterial color="#1e2832" />
      </mesh>
      <mesh position={[0.45, 0.9, 0]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.22, 1.0, 0.22]} />
        <meshPhongMaterial color="#1e2832" />
      </mesh>
      
      {/* Forearm Guards */}
      <mesh position={[-0.45, 0.5, 0]} castShadow>
        <boxGeometry args={[0.24, 0.4, 0.24]} />
        <meshPhongMaterial color="#2a3a48" />
      </mesh>
      <mesh position={[0.45, 0.5, 0]} castShadow>
        <boxGeometry args={[0.24, 0.4, 0.24]} />
        <meshPhongMaterial color="#2a3a48" />
      </mesh>
      
      {/* Tactical Gloves with finger details */}
      <mesh position={[-0.55, 0.25, 0]} castShadow>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshPhongMaterial color="#0f1419" />
      </mesh>
      <mesh position={[0.55, 0.25, 0]} castShadow>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshPhongMaterial color="#0f1419" />
      </mesh>
      
      {/* Finger details */}
      <mesh position={[-0.6, 0.25, 0.08]} castShadow>
        <boxGeometry args={[0.06, 0.12, 0.06]} />
        <meshPhongMaterial color="#0a0f14" />
      </mesh>
      <mesh position={[0.6, 0.25, 0.08]} castShadow>
        <boxGeometry args={[0.06, 0.12, 0.06]} />
        <meshPhongMaterial color="#0a0f14" />
      </mesh>
      
      {/* Tactical Pants with cargo pockets */}
      <mesh position={[-0.18, 0.05, 0]} castShadow>
        <boxGeometry args={[0.25, 0.9, 0.25]} />
        <meshPhongMaterial color="#1e2832" />
      </mesh>
      <mesh position={[0.18, 0.05, 0]} castShadow>
        <boxGeometry args={[0.25, 0.9, 0.25]} />
        <meshPhongMaterial color="#1e2832" />
      </mesh>
      
      {/* Cargo Pockets */}
      <mesh position={[-0.28, 0.2, 0.15]} castShadow>
        <boxGeometry args={[0.12, 0.2, 0.08]} />
        <meshPhongMaterial color="#0f1419" />
      </mesh>
      <mesh position={[0.28, 0.2, 0.15]} castShadow>
        <boxGeometry args={[0.12, 0.2, 0.08]} />
        <meshPhongMaterial color="#0f1419" />
      </mesh>
      
      {/* Knee Protection */}
      <mesh position={[-0.18, -0.15, 0.15]} castShadow>
        <boxGeometry args={[0.28, 0.2, 0.15]} />
        <meshPhongMaterial color="#2a3a48" />
      </mesh>
      <mesh position={[0.18, -0.15, 0.15]} castShadow>
        <boxGeometry args={[0.28, 0.2, 0.15]} />
        <meshPhongMaterial color="#2a3a48" />
      </mesh>
      
      {/* Combat Boots - High-tech style */}
      <mesh position={[-0.18, -0.42, 0.15]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.5]} />
        <meshPhongMaterial 
          color="#0a0f14"
          shininess={25}
        />
      </mesh>
      <mesh position={[0.18, -0.42, 0.15]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.5]} />
        <meshPhongMaterial 
          color="#0a0f14"
          shininess={25}
        />
      </mesh>
      
      {/* Boot Details */}
      <mesh position={[-0.18, -0.35, 0.28]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.1]} />
        <meshPhongMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.18, -0.35, 0.28]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.1]} />
        <meshPhongMaterial color="#1a1a1a" />
      </mesh>

      {/* Enhanced Player Name */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.16}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        font="./fonts/Orbitron-Bold.woff"
      >
        🛡️ {name}
      </Text>
      
      {/* Enhanced Health Bar with glow effect */}
      <group position={[0, 2.5, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.3, 0.1, 0.02]} />
          <meshBasicMaterial color="#330000" />
        </mesh>
        <mesh position={[-(1.3 - (health / 100) * 1.3) / 2, 0, 0.01]}>
          <boxGeometry args={[(health / 100) * 1.3, 0.1, 0.03]} />
          <meshBasicMaterial 
            color={health > 75 ? "#00ff00" : health > 50 ? "#88ff00" : health > 25 ? "#ffaa00" : "#ff0000"} 
          />
        </mesh>
        {/* Health text */}
        <Text
          position={[0, -0.15, 0]}
          fontSize={0.08}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {health}/100 HP
        </Text>
      </group>
    </group>
  );
};

// Enhanced Bot Component - CS Terrorist Style
const Bot3D = ({ position, playerPosition, onHit }: Bot3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);
  const [botPos, setBotPos] = useState<[number, number, number]>(position);
  const [isMoving, setIsMoving] = useState(true);
  const [health, setHealth] = useState(100);
  const [lastShot, setLastShot] = useState(0);
  const [isHit, setIsHit] = useState(false);
  const [lastDirection, setLastDirection] = useState<[number, number]>([1, 1]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Enhanced AI movement with proper collision detection
    if (isMoving && health > 0) {
      // More realistic movement pattern
      let moveX = Math.sin(time * 0.3 + position[0]) * 0.8;
      let moveZ = Math.cos(time * 0.25 + position[2]) * 0.8;
      
      let newX = position[0] + moveX * lastDirection[0];
      let newZ = position[2] + moveZ * lastDirection[1];
      
      // Wall collision detection - better boundaries
      const mapBoundary = 12.5; // More restrictive to prevent wall clipping
      
      // Check boundaries and reverse direction if needed
      if (newX >= mapBoundary || newX <= -mapBoundary) {
        setLastDirection(prev => [-prev[0], prev[1]]);
        newX = Math.max(-mapBoundary, Math.min(mapBoundary, newX));
      }
      if (newZ >= mapBoundary || newZ <= -mapBoundary) {
        setLastDirection(prev => [prev[0], -prev[1]]);
        newZ = Math.max(-mapBoundary, Math.min(mapBoundary, newZ));
      }
      
      // Enhanced cover collision detection with better avoidance
      const coverPositions = [
        { x: 5, z: 5, size: 2.2 },
        { x: -5, z: -5, size: 2.2 },
        { x: 0, z: -8, size: 3.0 },
        { x: 8, z: -3, size: 2.2 },
        { x: -8, z: 3, size: 2.2 }
      ];
      
      for (const cover of coverPositions) {
        const distX = Math.abs(newX - cover.x);
        const distZ = Math.abs(newZ - cover.z);
        if (distX < cover.size && distZ < cover.size) {
          // Better avoidance logic
          const pushX = newX > cover.x ? 1.5 : -1.5;
          const pushZ = newZ > cover.z ? 1.5 : -1.5;
          newX += pushX;
          newZ += pushZ;
          // Also change direction for more natural movement
          setLastDirection(prev => [-prev[0], -prev[1]]);
        }
      }
      
      setBotPos([newX, position[1], newZ]);
      meshRef.current.position.set(newX, position[1], newZ);
      
      // Enhanced walking animation
      if (bodyRef.current) {
        bodyRef.current.rotation.x = Math.sin(time * 6) * 0.08;
        bodyRef.current.position.y = 0.9 + Math.sin(time * 12) * 0.025;
        bodyRef.current.rotation.z = Math.sin(time * 8) * 0.03;
      }
      
      // Head bobbing animation
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(time * 3) * 0.1;
        headRef.current.position.y = 1.85 + Math.sin(time * 10) * 0.015;
      }
    }

    // Smooth look at player with head tracking
    const playerVec = new Vector3(...playerPosition);
    if (health > 0 && meshRef.current) {
      // Body looks at player
      const currentLookAt = meshRef.current.rotation.y;
      const targetLookAt = Math.atan2(
        playerPosition[0] - botPos[0],
        playerPosition[2] - botPos[2]
      );
      meshRef.current.rotation.y += (targetLookAt - currentLookAt) * 0.02;
    }

    // Enhanced shooting behavior
    if (time - lastShot > 2.5 && health > 0) {
      const distance = Math.sqrt(
        Math.pow(playerPosition[0] - botPos[0], 2) +
        Math.pow(playerPosition[2] - botPos[2], 2)
      );
      if (distance < 8) { // Only shoot when player is close
        setLastShot(time);
        console.log('Bot shooting at player!');
      }
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
        {/* Main Body - Terrorist Military Outfit */}
        <mesh ref={bodyRef} position={[0, 0.9, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.7, 1.4, 0.45]} />
          <meshPhongMaterial 
            color={isDead ? deadColor : "#3d2f1e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
            shininess={5}
          />
        </mesh>
        
        {/* Tactical Vest - Battle worn */}
        <mesh position={[0, 1.2, 0.24]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.65, 1.0, 0.2]} />
          <meshPhongMaterial 
            color={isDead ? "#111111" : "#2a1f14"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
            shininess={8}
          />
        </mesh>
        
        {/* Chest Rig with Ammo */}
        <mesh position={[0, 1.3, 0.35]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.5, 0.25, 0.12]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#1a1a0e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* AK Magazine Pouches */}
        <mesh position={[-0.22, 1.0, 0.32]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.12, 0.25, 0.12]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#1a140a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0, 1.0, 0.32]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.12, 0.25, 0.12]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#1a140a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.22, 1.0, 0.32]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.12, 0.25, 0.12]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#1a140a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Utility Belt */}
        <mesh position={[0, 0.5, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.75, 0.12, 0.48]} />
          <meshPhongMaterial 
            color={isDead ? "#0f0f0f" : "#1f1a14"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Grenade */}
        <mesh position={[-0.3, 0.5, 0.3]} onClick={handleClick} castShadow>
          <sphereGeometry args={[0.05]} />
          <meshPhongMaterial 
            color={isDead ? "#333333" : "#2d4a2d"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Head with Middle Eastern features */}
        <mesh ref={headRef} position={[0, 1.85, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.4, 0.45, 0.4]} />
          <meshPhongMaterial 
            color={isDead ? "#444444" : "#8d6e3c"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
            shininess={3}
          />
        </mesh>
        
        {/* Tactical Balaclava - Enhanced */}
        <mesh position={[0, 1.92, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.44, 0.4, 0.44]} />
          <meshPhongMaterial 
            color={isDead ? "#050505" : "#0a0a0a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
            shininess={1}
          />
        </mesh>
        
        {/* Eye holes with menacing look */}
        <mesh position={[-0.08, 1.9, 0.22]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.07, 0.08, 0.02]} />
          <meshBasicMaterial 
            color={isDead ? "#222222" : "#8d6e3c"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.08, 1.9, 0.22]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.07, 0.08, 0.02]} />
          <meshBasicMaterial 
            color={isDead ? "#222222" : "#8d6e3c"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Eye pupils for menacing effect */}
        <mesh position={[-0.08, 1.9, 0.23]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.03, 0.04, 0.01]} />
          <meshBasicMaterial 
            color={isDead ? "#111111" : "#000000"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.08, 1.9, 0.23]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.03, 0.04, 0.01]} />
          <meshBasicMaterial 
            color={isDead ? "#111111" : "#000000"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Arms - Muscular build */}
        <mesh position={[-0.45, 0.9, 0]} rotation={[0, 0, 0.18]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.23, 1.0, 0.23]} />
          <meshPhongMaterial 
            color={isDead ? deadColor : "#3d2f1e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.45, 0.9, 0]} rotation={[0, 0, -0.18]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.23, 1.0, 0.23]} />
          <meshPhongMaterial 
            color={isDead ? deadColor : "#3d2f1e"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Forearm wraps */}
        <mesh position={[-0.45, 0.5, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.25, 0.4, 0.25]} />
          <meshPhongMaterial 
            color={isDead ? "#1a1a1a" : "#2a1f14"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.45, 0.5, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.25, 0.4, 0.25]} />
          <meshPhongMaterial 
            color={isDead ? "#1a1a1a" : "#2a1f14"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Combat Gloves with finger details */}
        <mesh position={[-0.55, 0.25, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshPhongMaterial 
            color={isDead ? "#333333" : "#1a140a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.55, 0.25, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshPhongMaterial 
            color={isDead ? "#333333" : "#1a140a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Military Cargo Pants with camouflage pattern */}
        <mesh position={[-0.18, 0.05, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.25, 0.9, 0.25]} />
          <meshPhongMaterial 
            color={isDead ? "#1a1a1a" : "#4a3d28"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.18, 0.05, 0]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.25, 0.9, 0.25]} />
          <meshPhongMaterial 
            color={isDead ? "#1a1a1a" : "#4a3d28"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Cargo Pockets */}
        <mesh position={[-0.3, 0.2, 0.15]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.12, 0.2, 0.08]} />
          <meshPhongMaterial 
            color={isDead ? "#0f0f0f" : "#2a1f14"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.3, 0.2, 0.15]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.12, 0.2, 0.08]} />
          <meshPhongMaterial 
            color={isDead ? "#0f0f0f" : "#2a1f14"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        
        {/* Military Combat Boots */}
        <mesh position={[-0.18, -0.42, 0.15]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.5]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#1a140a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
            shininess={15}
          />
        </mesh>
        <mesh position={[0.18, -0.42, 0.15]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.5]} />
          <meshPhongMaterial 
            color={isDead ? "#0a0a0a" : "#1a140a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
            shininess={15}
          />
        </mesh>
        
        {/* Boot Straps */}
        <mesh position={[-0.18, -0.35, 0.28]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.25, 0.06, 0.08]} />
          <meshPhongMaterial 
            color={isDead ? "#111111" : "#2a1a0a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
        <mesh position={[0.18, -0.35, 0.28]} onClick={handleClick} castShadow>
          <boxGeometry args={[0.25, 0.06, 0.08]} />
          <meshPhongMaterial 
            color={isDead ? "#111111" : "#2a1a0a"} 
            transparent={isDead}
            opacity={isDead ? 0.5 : 1}
          />
        </mesh>
      </mesh>

      {/* Enhanced AK-47 Weapon */}
      {!isDead && (
        <Weapon3D
          weaponType="rifle"
          position={[0.35, 0.45, -0.08]}
          rotation={[0, 0, 0]}
          scale={1.1}
        />
      )}

      {/* Enhanced Bot Name with threat level */}
      <Text
        position={[0, 2.7, 0]}
        fontSize={0.13}
        color={isDead ? "#666666" : "#ff3333"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        font="./fonts/Orbitron-Bold.woff"
      >
        {isDead ? "💀 NEUTRALIZED" : "⚠️ HOSTILE"}
      </Text>
      
      {/* Enhanced Health Bar with glow */}
      {!isDead && (
        <group position={[0, 2.4, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.3, 0.1, 0.02]} />
            <meshBasicMaterial color="#660000" />
          </mesh>
          <mesh position={[-(1.3 - (health / 100) * 1.3) / 2, 0, 0.01]}>
            <boxGeometry args={[(health / 100) * 1.3, 0.1, 0.03]} />
            <meshBasicMaterial 
              color={health > 75 ? "#ff0000" : health > 50 ? "#ff4400" : health > 25 ? "#ff8800" : "#ffaa00"} 
            />
          </mesh>
          {/* Health text */}
          <Text
            position={[0, -0.15, 0]}
            fontSize={0.08}
            color="#ff4444"
            anchorX="center"
            anchorY="middle"
          >
            {health}/100 HP
          </Text>
        </group>
      )}

      {/* Enhanced hit effect with sparks */}
      {isHit && (
        <>
          <mesh position={[0, 0.9, 0]}>
            <sphereGeometry args={[1.2]} />
            <meshBasicMaterial color="#ff4444" transparent opacity={0.3} />
          </mesh>
          {/* Spark effects */}
          <mesh position={[Math.random() * 0.5 - 0.25, 1.5, Math.random() * 0.5 - 0.25]}>
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
          <mesh position={[Math.random() * 0.5 - 0.25, 1.3, Math.random() * 0.5 - 0.25]}>
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial color="#ff8800" />
          </mesh>
        </>
      )}

      {/* Enhanced blood effect when dead */}
      {isDead && (
        <>
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.6, 8]} />
            <meshBasicMaterial color="#8B0000" transparent opacity={0.7} />
          </mesh>
          {/* Additional blood splatter */}
          <mesh position={[0.2, 0.11, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.2, 6]} />
            <meshBasicMaterial color="#660000" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-0.3, 0.11, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.15, 6]} />
            <meshBasicMaterial color="#440000" transparent opacity={0.6} />
          </mesh>
        </>
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
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 1.8, 5]);
  const [kills, setKills] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const totalBots = 5;

  const handleBotHit = () => {
    const newKills = kills + 1;
    setKills(newKills);
    onBotKill();
    console.log('Bot hit! Total kills:', newKills);
    
    if (newKills >= totalBots) {
      setGameWon(true);
      console.log('All bots eliminated! Game won!');
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
        camera={{ position: [0, 8, 15], fov: 75 }}
        gl={{ antialias: true }}
        shadows
        style={{ width: '100%', height: '100vh' }}
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

        {/* Enhanced Controls - Right-click drag to look around */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          mouseButtons={{
            LEFT: undefined,    // Disable left click rotation
            MIDDLE: 1,         // Middle for zoom
            RIGHT: 0           // Right click for rotation
          }}
          minDistance={5}
          maxDistance={25}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.8}
          zoomSpeed={0.8}
          dampingFactor={0.1}
          enableDamping={true}
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