import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const Asterisk = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.2;
            groupRef.current.rotation.y -= delta * 0.3;
            groupRef.current.rotation.z += delta * 0.1;
        }
    });

    const material = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.1,
        metalness: 0.8,
    });

    return (
        <group ref={groupRef} scale={1.8}>
            <mesh material={material}>
                <boxGeometry args={[0.3, 4, 0.3]} />
            </mesh>
            <mesh material={material} rotation={[0, 0, Math.PI / 3]}>
                <boxGeometry args={[0.3, 4, 0.3]} />
            </mesh>
            <mesh material={material} rotation={[0, 0, -Math.PI / 3]}>
                <boxGeometry args={[0.3, 4, 0.3]} />
            </mesh>
            <mesh material={material} rotation={[Math.PI / 2, 0, 0]}>
                <boxGeometry args={[0.3, 4, 0.3]} />
            </mesh>
        </group>
    );
};

const Asterisk3D: React.FC = () => {
    return (
        <div className="asterisk-container absolute inset-0 z-0 pointer-events-none mix-blend-difference">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, -10, -10]} intensity={0.5} />
                <Environment preset="city" />
                <Asterisk />
            </Canvas>
        </div>
    );
};

export default Asterisk3D;
