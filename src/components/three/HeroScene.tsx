import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    camera.position.z = 7; // start further back — GSAP animates to 5

    // ── Sparse ambient particles ─────────────────────────────
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
      opacity: 0, // start invisible — GSAP fades in
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Mouse parallax ────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const camTarget = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = -(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── Resize ────────────────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // ── Animation loop ────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      particles.rotation.y = t * 0.012;
      particles.rotation.x = t * 0.005;

      // Mouse parallax — lerp toward target
      camTarget.x += (mouse.x * 0.35 - camTarget.x) * 0.025;
      camTarget.y += (mouse.y * 0.35 - camTarget.y) * 0.025;
      camera.position.x = camTarget.x;
      camera.position.y = camTarget.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ── GSAP: intro + scroll parallax ────────────────────────
    // All ScrollTrigger work waits for Lenis so scrollerProxy is active
    let gsapCtx: gsap.Context;

    const initGSAP = () => {
      gsapCtx = gsap.context(() => {
        // Camera pull-in on load
        gsap.to(camera.position, {
          z: 5,
          duration: 2.2,
          delay: 0.2,
          ease: 'power2.inOut',
        });

        // Particles fade in
        gsap.to(material, {
          opacity: 0.2,
          duration: 1.8,
          delay: 0.4,
          ease: 'power2.inOut',
        });

        // Scroll: camera zooms in slightly as user starts scrolling (cinematic)
        gsap.to(camera.position, {
          z: 4.2,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: '40vh top',
            scrub: 2,
          },
        });

        // Scroll: particles drift downward + fade out as user scrolls away
        gsap.to(particles.position, {
          y: -1.8,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: '45vh top',
            scrub: 2,
          },
        });

        gsap.to(material, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: '15vh top',
            end: '50vh top',
            scrub: 1.5,
          },
        });
      });
    };

    if ((window as any).__lenis) {
      initGSAP();
    } else {
      window.addEventListener('lenis:ready', initGSAP, { once: true });
    }

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('lenis:ready', initGSAP);
      gsapCtx?.revert();
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
