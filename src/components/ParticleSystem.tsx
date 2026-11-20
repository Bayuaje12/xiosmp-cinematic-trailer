import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  delay: number;
  color: string;
  blur: number;
};

type Props = {
  count?: number;
  seed?: string;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  direction?: 'up' | 'down' | 'float';
  opacity?: number;
};

export const ParticleSystem: React.FC<Props> = ({
  count = 40,
  seed = 'xiosmp',
  colors = ['#34D399', '#D4AF37', '#F6D365', '#ffffff'],
  minSize = 2,
  maxSize = 7,
  direction = 'up',
  opacity = 0.7,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({length: count}).map((_, i) => {
      const r1 = random(`${seed}-x-${i}`);
      const r2 = random(`${seed}-y-${i}`);
      const r3 = random(`${seed}-s-${i}`);
      const r4 = random(`${seed}-sp-${i}`);
      const r5 = random(`${seed}-d-${i}`);
      const r6 = random(`${seed}-c-${i}`);
      const r7 = random(`${seed}-b-${i}`);
      return {
        x: r1 * 100,
        y: r2 * 100,
        size: minSize + r3 * (maxSize - minSize),
        speed: 0.15 + r4 * 0.6,
        drift: (r5 - 0.5) * 30,
        delay: r2 * 120,
        color: colors[Math.floor(r6 * colors.length) % colors.length],
        blur: r7 * 2,
      };
    });
  }, [count, seed, colors, minSize, maxSize]);

  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {particles.map((p, i) => {
        const t = (frame + p.delay) * p.speed;
        const travel = t % 130;
        const baseY = direction === 'down' ? -10 + travel : direction === 'up' ? 110 - travel : p.y + Math.sin((frame + p.delay) / 40) * 4;
        const x = p.x + Math.sin((frame + p.delay) / 35) * (p.drift / 10);
        const y = direction === 'float' ? baseY : baseY;
        const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((frame + p.delay) / 18));
        const o = opacity * twinkle * interpolate(y, [-20, 0, 100, 120], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              opacity: o,
              filter: `blur(${p.blur}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const FogLayer: React.FC<{opacity?: number; speed?: number}> = ({opacity = 0.18, speed = 0.4}) => {
  const frame = useCurrentFrame();
  const x = (frame * speed) % 800;
  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: -400 + x,
          bottom: '-10%',
          width: '160%',
          height: '55%',
          background: 'radial-gradient(ellipse at center, rgba(220,235,255,0.22) 0%, rgba(220,235,255,0.08) 35%, transparent 70%)',
          filter: 'blur(40px)',
          opacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: -500 + x * 0.6,
          bottom: '-5%',
          width: '140%',
          height: '45%',
          background: 'radial-gradient(ellipse at center, rgba(180,255,220,0.18) 0%, rgba(180,255,220,0.05) 35%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: opacity * 0.8,
        }}
      />
    </AbsoluteFill>
  );
};
