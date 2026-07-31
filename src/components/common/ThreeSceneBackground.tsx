import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneBackgroundProps {
  variant?: 'hero' | 'auth' | 'loading' | 'subtle';
  className?: string;
}

export default function ThreeSceneBackground({ variant = 'hero', className = '' }: ThreeSceneBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference & hardware capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let animFrameId: number;
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const baseZ = variant === 'auth' ? 15 : 12;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, baseZ);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    // --- Cinematic Lighting Setup ---
    // Soft Ambient Foundation (#03131F)
    const ambientLight = new THREE.AmbientLight(0x03131f, 1.8);
    scene.add(ambientLight);

    // Cool White Key Light
    const keyLight = new THREE.DirectionalLight(0xe0f7ff, 3.2);
    keyLight.position.set(15, 22, 16);
    scene.add(keyLight);

    // Vibrant Teal Rim Light (#25A9E0)
    const rimLight = new THREE.DirectionalLight(0x25a9e0, 2.8);
    rimLight.position.set(-18, -12, 10);
    scene.add(rimLight);

    // Soft Blue Subsurface Glow (#147BA6)
    const glowLight = new THREE.PointLight(0x147ba6, 4.5, 35);
    glowLight.position.set(0, -3, 5);
    scene.add(glowLight);

    // Magnetic Dynamic Cursor Spotlight (#6AD5FF)
    const cursorLight = new THREE.PointLight(0x6ad5ff, 2.8, 28);
    cursorLight.position.set(0, 0, 8);
    scene.add(cursorLight);

    // --- Kinetic Sculpture Group ---
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Resolution scaled for performance
    const segX = isMobile ? 50 : variant === 'auth' ? 75 : 110;
    const segY = isMobile ? 35 : variant === 'auth' ? 45 : 70;
    const widthSize = variant === 'auth' ? 24 : 34;
    const heightSize = variant === 'auth' ? 15 : 22;

    // Layer 1: Primary Translucent Liquid Ribbon Sheet (#0B4D68 / #072C40)
    const primaryGeo = new THREE.PlaneGeometry(widthSize, heightSize, segX, segY);
    const primaryInitPos = primaryGeo.attributes.position.array.slice() as Float32Array;

    const primaryMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x072c40),
      emissive: new THREE.Color(0x0b4d68),
      emissiveIntensity: 0.22,
      roughness: 0.16,
      metalness: 0.12,
      transmission: variant === 'subtle' ? 0.95 : 0.82,
      ior: 1.38,
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: variant === 'subtle' ? 0.35 : 0.92,
    });

    const primaryMesh = new THREE.Mesh(primaryGeo, primaryMat);
    primaryMesh.rotation.x = -Math.PI / 4.2;
    primaryMesh.rotation.z = Math.PI / 14;
    primaryMesh.position.set(variant === 'auth' ? 2.5 : 0, -0.8, -1.5);
    sculptureGroup.add(primaryMesh);

    // Layer 2: Secondary Flowing Cyan Data Ribbon (#147BA6 / #25A9E0)
    let secondaryMesh: THREE.Mesh | null = null;
    let secondaryInitPos: Float32Array | null = null;

    if (variant === 'hero' || variant === 'auth') {
      const secGeo = new THREE.PlaneGeometry(widthSize * 0.88, heightSize * 0.88, segX, segY);
      secondaryInitPos = secGeo.attributes.position.array.slice() as Float32Array;

      const secMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x03131f),
        emissive: new THREE.Color(0x147ba6),
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.15,
        transmission: 0.78,
        ior: 1.32,
        thickness: 1.2,
        clearcoat: 0.95,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: variant === 'auth' ? 0.4 : 0.75,
      });

      secondaryMesh = new THREE.Mesh(secGeo, secMat);
      secondaryMesh.rotation.x = -Math.PI / 3.8;
      secondaryMesh.rotation.z = -Math.PI / 9;
      secondaryMesh.position.set(variant === 'auth' ? -2 : -1.8, -2.2, -4.5);
      sculptureGroup.add(secondaryMesh);
    }

    // Layer 3: Deep Ocean Topology Foundation (#6AD5FF highlights)
    let tertiaryMesh: THREE.Mesh | null = null;
    let tertiaryInitPos: Float32Array | null = null;

    if (variant === 'hero') {
      const tertGeo = new THREE.PlaneGeometry(widthSize * 0.75, heightSize * 0.75, segX, segY);
      tertiaryInitPos = tertGeo.attributes.position.array.slice() as Float32Array;

      const tertMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x072c40),
        emissive: new THREE.Color(0x25a9e0),
        emissiveIntensity: 0.2,
        roughness: 0.14,
        metalness: 0.08,
        transmission: 0.88,
        ior: 1.35,
        thickness: 0.9,
        clearcoat: 1.0,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.58,
      });

      tertiaryMesh = new THREE.Mesh(tertGeo, tertMat);
      tertiaryMesh.rotation.x = -Math.PI / 4.8;
      tertiaryMesh.rotation.z = Math.PI / 7;
      tertiaryMesh.position.set(1.5, -3.2, -7.5);
      sculptureGroup.add(tertiaryMesh);
    }

    // --- Magnetic Cursor Influence Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Responsive Handle ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.08 : 0.28;
      const t = elapsedTime * speed;

      // 1. Smooth lerp for Magnetic Cursor Field
      mouseX += (targetMouseX - mouseX) * 0.028;
      mouseY += (targetMouseY - mouseY) * 0.028;

      // Magnetic spotlight position in world space
      cursorLight.position.x = mouseX * 9;
      cursorLight.position.y = -mouseY * 6;

      // 2. Breathing Cycle for Camera & Atmosphere Lighting
      const breathCycle = Math.sin(t * 0.4);
      camera.position.z = baseZ + breathCycle * 0.25;
      ambientLight.intensity = 1.8 + breathCycle * 0.15;
      glowLight.intensity = 4.5 + Math.cos(t * 0.5) * 0.6;

      // First Visit Convergence Progress (0 -> 1 over 2.5s)
      const introRaw = Math.min(1.0, elapsedTime / 2.5);
      const introProgress = introRaw * introRaw * (3 - 2 * introRaw); // Smoothstep curve
      sculptureGroup.scale.setScalar(0.7 + introProgress * 0.3);

      // 3. Deform Layer 1 Vertices (Primary Ribbon Sheet with Data Pulses & Noise)
      const pAttr = primaryGeo.attributes.position;
      const pArr = pAttr.array as Float32Array;
      for (let i = 0; i < pArr.length; i += 3) {
        const x = primaryInitPos[i];
        const y = primaryInitPos[i + 1];

        // Fluid topological base wave
        const w1 = Math.sin(x * 0.25 + t) * Math.cos(y * 0.3 + t * 0.85) * 1.35;
        const w2 = Math.sin((x + y) * 0.18 + t * 0.65) * 0.95;
        const w3 = Math.cos(x * 0.45 - t * 0.35) * Math.sin(y * 0.35 + t * 0.45) * 0.45;

        // Traveling Encrypted Data Light Pulse
        const dataPulse = Math.pow(Math.max(0, Math.sin(x * 0.28 - t * 2.4)), 6) * 1.5;

        // Procedural organic surface noise (prevents mechanical stiffness)
        const microNoise = Math.sin(x * 1.8 + y * 2.3 + t * 0.8) * 0.08 + Math.cos(x * 3.1 - y * 1.9 + t * 0.6) * 0.04;

        // Magnetic Cursor Attraction Field (localized Gaussian pull)
        const distSq = (x - mouseX * 6) ** 2 + (y - mouseY * 4) ** 2;
        const magneticPull = Math.exp(-distSq / 36) * 0.85;

        pArr[i + 2] = primaryInitPos[i + 2] + w1 + w2 + w3 + dataPulse + microNoise + magneticPull;
      }
      pAttr.needsUpdate = true;
      primaryGeo.computeVertexNormals();

      // 4. Deform Layer 2 Vertices (Secondary Ribbon Sheet)
      if (secondaryMesh && secondaryInitPos) {
        const sAttr = secondaryMesh.geometry.attributes.position;
        const sArr = sAttr.array as Float32Array;
        for (let i = 0; i < sArr.length; i += 3) {
          const x = secondaryInitPos[i];
          const y = secondaryInitPos[i + 1];

          const w1 = Math.cos(x * 0.22 - t * 0.75) * Math.sin(y * 0.28 + t * 0.55) * 1.6;
          const w2 = Math.sin((x - y) * 0.14 + t * 0.45) * 0.75;
          const dataPulse = Math.pow(Math.max(0, Math.cos(x * 0.32 + t * 2.1)), 5) * 1.2;

          sArr[i + 2] = secondaryInitPos[i + 2] + w1 + w2 + dataPulse;
        }
        sAttr.needsUpdate = true;
        secondaryMesh.geometry.computeVertexNormals();
      }

      // 5. Deform Layer 3 Vertices (Deep Ocean Foundation Sheet)
      if (tertiaryMesh && tertiaryInitPos) {
        const tAttr = tertiaryMesh.geometry.attributes.position;
        const tArr = tAttr.array as Float32Array;
        for (let i = 0; i < tArr.length; i += 3) {
          const x = tertiaryInitPos[i];
          const y = tertiaryInitPos[i + 1];

          const w1 = Math.sin(x * 0.3 + t * 0.8) * Math.cos(y * 0.2 + t * 0.4) * 1.8;
          tArr[i + 2] = tertiaryInitPos[i + 2] + w1;
        }
        tAttr.needsUpdate = true;
        tertiaryMesh.geometry.computeVertexNormals();
      }

      // 6. Organic Group Rotation & Smooth Parallax Drift
      sculptureGroup.rotation.y = Math.sin(t * 0.18) * 0.12 + mouseX * 0.1;
      sculptureGroup.rotation.x = Math.cos(t * 0.14) * 0.08 + mouseY * 0.06;

      // Parallax camera drift
      camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resource disposal
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      primaryGeo.dispose();
      primaryMat.dispose();
      if (secondaryMesh) {
        secondaryMesh.geometry.dispose();
        (secondaryMesh.material as THREE.Material).dispose();
      }
      if (tertiaryMesh) {
        tertiaryMesh.geometry.dispose();
        (tertiaryMesh.material as THREE.Material).dispose();
      }
      renderer.dispose();
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#02070B] via-[#041722] to-[#082D3E] ${className}`}
      aria-hidden="true"
    />
  );
}


