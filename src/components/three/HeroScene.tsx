import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ───────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    // ── Sparse ambient particles ──────────────────────────────
    const COUNT = 700;
    const positions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.016,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.2,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Mouse parallax ───────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const camTarget = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = -(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── Resize ───────────────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // ── Animation loop ───────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      particles.rotation.y = t * 0.012;
      particles.rotation.x = t * 0.005;

      camTarget.x += (mouse.x * 0.35 - camTarget.x) * 0.025;
      camTarget.y += (mouse.y * 0.35 - camTarget.y) * 0.025;
      camera.position.x = camTarget.x;
      camera.position.y = camTarget.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas" />;
}
