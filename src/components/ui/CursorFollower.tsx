import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start off-screen until first mouse move
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isExpanded = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleEnter = () => { isExpanded = true; };
    const handleLeave = () => { isExpanded = false; };

    window.addEventListener('mousemove', handleMouseMove);

    // Attach hover states to all interactive elements present at mount.
    // For dynamically added elements, re-run or use event delegation.
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      // Dot: instant follow
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

      // Ring: lagged lerp
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      const scale = isExpanded ? 1.8 : 1;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${scale})`;
    };

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
