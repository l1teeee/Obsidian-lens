import { lazy, Suspense } from 'react';

// Three.js is code-split so it doesn't inflate the initial bundle
const HeroScene = lazy(() => import('./three/HeroScene'));

export default function HeroCanvas() {
  return (
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
  );
}
