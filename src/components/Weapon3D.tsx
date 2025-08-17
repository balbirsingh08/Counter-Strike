import { useRef } from 'react';
import { Mesh } from 'three';
import { Box } from '@react-three/drei';

interface Weapon3DProps {
  weaponType: 'rifle' | 'pistol' | 'sniper' | 'smg' | 'shotgun';
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const Weapon3D = ({ weaponType, position, rotation = [0, 0, 0], scale = 1 }: Weapon3DProps) => {
  const meshRef = useRef<Mesh>(null);

  const getWeaponModel = () => {
    switch (weaponType) {
      case 'rifle':
        return (
          <group position={position} rotation={rotation} scale={scale}>
            {/* Main body */}
            <Box args={[0.8, 0.08, 0.06]} position={[0, 0, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Stock */}
            <Box args={[0.25, 0.12, 0.08]} position={[0.45, 0, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
            {/* Barrel */}
            <Box args={[0.4, 0.04, 0.04]} position={[-0.5, 0, 0]}>
              <meshPhongMaterial color="#1a1a1a" />
            </Box>
            {/* Magazine */}
            <Box args={[0.15, 0.25, 0.05]} position={[0.1, -0.15, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Grip */}
            <Box args={[0.08, 0.2, 0.06]} position={[0.2, -0.1, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
            {/* Trigger guard */}
            <Box args={[0.06, 0.06, 0.02]} position={[0.15, -0.03, 0]}>
              <meshPhongMaterial color="#1a1a1a" />
            </Box>
          </group>
        );

      case 'sniper':
        return (
          <group position={position} rotation={rotation} scale={scale}>
            {/* Main body - longer for sniper */}
            <Box args={[1.2, 0.08, 0.06]} position={[0, 0, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Stock */}
            <Box args={[0.3, 0.15, 0.1]} position={[0.65, 0, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
            {/* Long barrel */}
            <Box args={[0.6, 0.04, 0.04]} position={[-0.7, 0, 0]}>
              <meshPhongMaterial color="#1a1a1a" />
            </Box>
            {/* Scope */}
            <Box args={[0.3, 0.06, 0.06]} position={[-0.1, 0.08, 0]}>
              <meshPhongMaterial color="#1a1a1a" />
            </Box>
            {/* Magazine */}
            <Box args={[0.12, 0.2, 0.05]} position={[0.1, -0.12, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Grip */}
            <Box args={[0.08, 0.2, 0.06]} position={[0.3, -0.1, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
          </group>
        );

      case 'pistol':
        return (
          <group position={position} rotation={rotation} scale={scale}>
            {/* Main body */}
            <Box args={[0.3, 0.15, 0.04]} position={[0, 0, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Barrel */}
            <Box args={[0.15, 0.03, 0.03]} position={[-0.2, 0.05, 0]}>
              <meshPhongMaterial color="#1a1a1a" />
            </Box>
            {/* Grip */}
            <Box args={[0.06, 0.15, 0.04]} position={[0.1, -0.1, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
            {/* Magazine */}
            <Box args={[0.05, 0.12, 0.03]} position={[0.1, -0.15, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Trigger */}
            <Box args={[0.02, 0.03, 0.01]} position={[0.05, -0.02, 0]}>
              <meshPhongMaterial color="#1a1a1a" />
            </Box>
          </group>
        );

      case 'smg':
        return (
          <group position={position} rotation={rotation} scale={scale}>
            {/* Main body */}
            <Box args={[0.5, 0.08, 0.05]} position={[0, 0, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Stock - smaller than rifle */}
            <Box args={[0.15, 0.1, 0.06]} position={[0.3, 0, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
            {/* Barrel */}
            <Box args={[0.25, 0.03, 0.03]} position={[-0.35, 0, 0]}>
              <meshPhongMaterial color="#1a1a1a" />
            </Box>
            {/* Magazine - larger for SMG */}
            <Box args={[0.12, 0.3, 0.04]} position={[0.05, -0.18, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Grip */}
            <Box args={[0.06, 0.15, 0.05]} position={[0.15, -0.08, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
          </group>
        );

      case 'shotgun':
        return (
          <group position={position} rotation={rotation} scale={scale}>
            {/* Main body - thicker for shotgun */}
            <Box args={[0.7, 0.1, 0.08]} position={[0, 0, 0]}>
              <meshPhongMaterial color="#2a2a2a" />
            </Box>
            {/* Stock */}
            <Box args={[0.25, 0.12, 0.1]} position={[0.4, 0, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
            {/* Wide barrel */}
            <Box args={[0.4, 0.06, 0.06]} position={[-0.45, 0, 0]}>
              <meshPhongMaterial color="#1a1a1a" />
            </Box>
            {/* Pump action */}
            <Box args={[0.15, 0.05, 0.06]} position={[-0.1, -0.08, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
            {/* Grip */}
            <Box args={[0.08, 0.18, 0.07]} position={[0.15, -0.1, 0]}>
              <meshPhongMaterial color="#3a2820" />
            </Box>
          </group>
        );

      default:
        return (
          <Box args={[0.1, 0.1, 0.8]} position={position}>
            <meshPhongMaterial color="#222222" />
          </Box>
        );
    }
  };

  return getWeaponModel();
};

export default Weapon3D;