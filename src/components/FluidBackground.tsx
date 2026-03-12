'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FluidShaderMaterial = {
  uniforms: {
    u_time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    varying vec2 vUv;

    // 2D Simplex Noise Function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      float noiseVal = snoise(st * 1.5 + vec2(u_time * 0.1, u_time * 0.15));
      float noiseVal2 = snoise(st * 3.0 - vec2(u_time * 0.05, u_time * 0.08));
      
      float n = noiseVal * 0.5 + noiseVal2 * 0.5 + 0.5;

      vec3 colorBlack = vec3(0.0);
      vec3 colorDeep = vec3(0.05, 0.2, 0.02);
      vec3 colorNeon = vec3(0.34, 0.5, 0.08); // Muted dark-green highlight

      // Gradient mask so it's mainly at bottom right
      float mask = pow(st.x, 1.5) * pow(1.0 - st.y, 2.0); 

      float deepBlend = smoothstep(0.26, 0.66, n * mask * 2.0);
      float neonBlendRaw = smoothstep(0.86, 1.0, n * mask * 1.1);
      float neonBlend = pow(neonBlendRaw, 2.0) * 0.28;

      vec3 finalColor = mix(colorBlack, colorDeep, deepBlend);
      finalColor = mix(finalColor, colorNeon, neonBlend);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const PlaneFluid = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        ref={materialRef} 
        args={[FluidShaderMaterial]} 
      />
    </mesh>
  );
};

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas gl={{ antialias: false }}>
        <PlaneFluid />
      </Canvas>
    </div>
  );
}
