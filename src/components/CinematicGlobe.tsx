'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Particle Math
function getFibonacciSpherePoints(samples: number, radius: number): Float32Array {
  const points = new Float32Array(samples * 3);
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    points[i * 3] = x * radius;
    points[i * 3 + 1] = y * radius;
    points[i * 3 + 2] = z * radius;
  }
  return points;
}

export default function CinematicGlobe() {
  const masterGroupRef = useRef<THREE.Group>(null);
  
  // Material References for GSAP fading
  const solidSphereMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const particleShaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const flashLightRef = useRef<THREE.PointLight>(null);
  const starsMaterialRef = useRef<THREE.PointsMaterial>(null);

  // References for the 4 shell slices
  const slice1Ref = useRef<THREE.Group>(null);
  const slice2Ref = useRef<THREE.Group>(null);
  const slice3Ref = useRef<THREE.Group>(null);
  const slice4Ref = useRef<THREE.Group>(null);
  
  // Create an array for GSAP to target multiple material instances at once
  const shellMaterialsRef = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);

  // Load Earth map asynchronously (non-blocking so the rest of the scene renders immediately)
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
      (texture) => setEarthTexture(texture),
    );
  }, []);

  const particlesPosition = useMemo(() => {
    return getFibonacciSpherePoints(60000, 2.5); // Particles are at 2.5
  }, []);

  const starsPosition = useMemo(() => {
    const pts = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = 20 + Math.random() * 40; // Spread far beyond the sphere
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);

  // Custom Shader for the Continents
  // IMPORTANT: no deps — material must be created once so GSAP uniform refs stay valid.
  // The globeTexture uniform is updated via useEffect when the texture loads.
  const shaderArgs = useMemo(() => ({
    uniforms: {
      globeTexture: { value: new THREE.Texture() },
      uOpacity: { value: 0.0 }, // Starts fully invisible!
    },
    vertexShader: `
      varying vec2 vUv;
      const float PI = 3.14159265359;

      void main() {
        vec3 normalizedPosition = normalize(position);
        float u = 0.5 + atan(normalizedPosition.z, normalizedPosition.x) / (2.0 * PI);
        float v = 0.5 - asin(normalizedPosition.y) / PI;
        vUv = vec2(u, v);

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 2.5;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D globeTexture;
      uniform float uOpacity;
      varying vec2 vUv;

      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        if (distanceToCenter > 0.5) discard;

        vec4 texColor = texture2D(globeTexture, vUv);
        if (texColor.r > 0.1) discard; // Ocean

        // Premium Green HDR Color bleeding
        vec3 baseColor = vec3(0.2, 0.8, 0.1);
        vec3 hdrColor = baseColor * 4.0;

        gl_FragColor = vec4(hdrColor, uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
  }), []);

  // Push the loaded texture into the existing shader material uniform
  useEffect(() => {
    if (earthTexture && particleShaderMaterialRef.current) {
      particleShaderMaterialRef.current.uniforms.globeTexture.value = earthTexture;
    }
  }, [earthTexture]);

  useFrame((state, delta) => {
    if (masterGroupRef.current) {
      masterGroupRef.current.rotation.y += delta * 0.05;
    }
  });

  // Master GSAP Sequence — polls for #globe-trigger since it may mount after the Canvas
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;
    let rafId: number | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let attempts = 0;
    const MAX_ATTEMPTS = 120; // ~2 seconds at 60fps

    function trySetup() {
      if (cancelled) return;
      attempts++;

      const triggerElement = document.getElementById('globe-trigger');
      const masterGroup = masterGroupRef.current;
      const particleShaderMaterial = particleShaderMaterialRef.current;

      if (!triggerElement || !masterGroup || !particleShaderMaterial) {
        if (attempts < MAX_ATTEMPTS) {
          rafId = requestAnimationFrame(trySetup);
          return;
        }
        return; // Give up after max attempts
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
        }
      });
      timeline = tl;

      // 1. Scale up the Master Group and move it to the right
      tl.fromTo(masterGroup.scale,
        { x: 0.4, y: 0.4, z: 0.4 },
        { x: 2.2, y: 2.2, z: 2.2, ease: 'power2.inOut' },
        0
      );
      tl.fromTo(masterGroup.position,
        { x: 0 },
        { x: 3.5, ease: 'power2.inOut' },
        0
      );

      // 2. Explode the Sliced Shell (Y-axis separation)
      if (slice1Ref.current && slice2Ref.current && slice3Ref.current && slice4Ref.current) {
        tl.to(slice1Ref.current.position, { y: 3.5, ease: 'power2.inOut' }, 0);
        tl.to(slice2Ref.current.position, { y: 1.5, ease: 'power2.inOut' }, 0);
        tl.to(slice3Ref.current.position, { y: -1.5, ease: 'power2.inOut' }, 0);
        tl.to(slice4Ref.current.position, { y: -3.5, ease: 'power2.inOut' }, 0);

        tl.to([slice1Ref.current.rotation, slice4Ref.current.rotation], { y: Math.PI / 2, ease: 'power1.inOut' }, 0);
        tl.to([slice2Ref.current.rotation, slice3Ref.current.rotation], { y: -Math.PI / 2, ease: 'power1.inOut' }, 0);
      }

      // 3. Fade out the Shell Materials
      const validMaterials = shellMaterialsRef.current.filter(Boolean);
      if (validMaterials.length > 0) {
        tl.to(validMaterials, {
          opacity: 0,
          ease: 'power2.inOut'
        }, 0);
      }

      // 4. Fade out the solid glowing core faster
      if (solidSphereMaterialRef.current) {
        tl.to(solidSphereMaterialRef.current, {
          opacity: 0,
          ease: 'power4.inOut',
          duration: 0.15
        }, 0);
      }

      // 5. Fade in the Particle Shader
      tl.to(particleShaderMaterial.uniforms.uOpacity, {
        value: 1,
        ease: 'power2.inOut'
      }, 0);

      // 6. The "Glow Kick" Flash
      if (flashLightRef.current) {
        tl.to(flashLightRef.current, {
          intensity: 200,
          duration: 0.05,
          ease: 'power4.out'
        }, 0);

        tl.to(flashLightRef.current, {
          intensity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        }, 0.05);
      }

      // 7. Fade out Background Stars
      if (starsMaterialRef.current) {
        tl.to(starsMaterialRef.current, {
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.3
        }, 0);
      }

      ScrollTrigger.refresh();
    }

    rafId = requestAnimationFrame(trySetup);

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (timeline) {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      }
    };
  }, []);

  return (
    <group ref={masterGroupRef} position={[0, 0, 0]} rotation={[0, 4.5, 0]}>
      
      {/* 1. Sliced Dark Shell (Dismantles and Fades Out). Radius 2.6 encapsulates everything. */}
      {/* Initial Y offsets create the horizontal "cracks" that light shines through */}
      <group>
        <group ref={slice1Ref}>
          <Sphere args={[2.6, 64, 32, 0, Math.PI * 2, 0, Math.PI / 4]}>
            <meshPhysicalMaterial
              ref={(el) => { shellMaterialsRef.current[0] = el; }}
              color="#070707"
              roughness={0.15}
              metalness={0.8}
              clearcoat={0.2}
              transparent={true}
              opacity={1}
              side={THREE.DoubleSide}
            />
          </Sphere>
        </group>

        <group ref={slice2Ref}>
          <Sphere args={[2.6, 64, 32, 0, Math.PI * 2, Math.PI / 4, Math.PI / 4]}>
            <meshPhysicalMaterial
              ref={(el) => { shellMaterialsRef.current[1] = el; }}
              color="#070707"
              roughness={0.15}
              metalness={0.8}
              clearcoat={0.2}
              transparent={true}
              opacity={1}
              side={THREE.DoubleSide}
            />
          </Sphere>
        </group>

        <group ref={slice3Ref}>
          <Sphere args={[2.6, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 4]}>
            <meshPhysicalMaterial
              ref={(el) => { shellMaterialsRef.current[2] = el; }}
              color="#070707"
              roughness={0.15}
              metalness={0.8}
              clearcoat={0.2}
              transparent={true}
              opacity={1}
              side={THREE.DoubleSide}
            />
          </Sphere>
        </group>

        <group ref={slice4Ref}>
          <Sphere args={[2.6, 64, 32, 0, Math.PI * 2, (3 * Math.PI) / 4, Math.PI / 4]}>
            <meshPhysicalMaterial
              ref={(el) => { shellMaterialsRef.current[3] = el; }}
              color="#070707"
              roughness={0.15}
              metalness={0.8}
              clearcoat={0.2}
              transparent={true}
              opacity={1}
              side={THREE.DoubleSide}
            />
          </Sphere>
        </group>
      </group>

      {/* 2. Solid Glowing Core (Radius 2.4). Highly visible through the shell cracks, fades out on scroll. */}
      <Sphere args={[2.4, 64, 64]}>
        <meshStandardMaterial
          ref={solidSphereMaterialRef}
          color="#cfff28"
          emissive="#cfff28"
          emissiveIntensity={2.5}
          toneMapped={false}
          transparent={true}
          opacity={1}
        />
      </Sphere>

      {/* Hero Point Light (Provides rim lighting to the dark shell from the outside) */}
      <pointLight color="#cfff28" intensity={15} distance={10} position={[0,0,0]} />

      {/* Explosive Flash Light (Simulates energy escaping the cracks during GSAP timeline) */}
      <pointLight ref={flashLightRef} color="#cfff28" intensity={0} distance={15} position={[0,0,0]} />

      {/* 3. Black Blocking Sphere (Radius 2.35). Always visible, blocks back-side particle see-through. */}
      <Sphere args={[2.35, 32, 32]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>

      {/* 4. Particle Globe Layers (Radius 2.5). Fades In. */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial ref={particleShaderMaterialRef} attach="material" args={[shaderArgs]} />
      </points>

      {/* 5. Background Stars (Visible only during Hero, Fades Out) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starsPosition.length / 3}
            array={starsPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          ref={starsMaterialRef} 
          color="#ffffff" 
          size={0.05} 
          transparent={true} 
          opacity={0.6} 
          sizeAttenuation={true} 
          depthWrite={false}
        />
      </points>

    </group>
  );
}
