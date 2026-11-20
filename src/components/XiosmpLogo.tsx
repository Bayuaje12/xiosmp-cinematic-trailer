import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';

type Props = {
  size?: number;
  reveal?: boolean;
  revealFrom?: number;
  glow?: number;
  rotation?: number;
  style?: React.CSSProperties;
};

export const XiosmpLogo: React.FC<Props> = ({
  size = 420,
  reveal = false,
  revealFrom = 0,
  glow = 1,
  rotation = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const s = reveal
    ? spring({frame: frame - revealFrom, fps, config: {damping: 14, stiffness: 90, mass: 0.9}})
    : 1;
  const opacity = reveal ? interpolate(frame, [revealFrom, revealFrom + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  const floatY = Math.sin(frame / 40) * 4;
  const lightSweep = interpolate(frame, [revealFrom, revealFrom + 30], [-120, 220], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        transform: `scale(${0.85 + s * 0.15}) translateY(${floatY}px) rotate(${rotation}deg)`,
        opacity,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -size * 0.12,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.gold}55 0%, ${COLORS.emerald}22 40%, transparent 70%)`,
          filter: `blur(${24 * glow}px)`,
          opacity: 0.9 * glow,
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: `0 0 ${40 * glow}px ${COLORS.gold}66, 0 0 ${80 * glow}px ${COLORS.emerald}33, 0 30px 80px rgba(0,0,0,0.6)`,
        }}
      >
        <Img
          src={staticFile('assets/xiosmp-logo.jpeg')}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
        {reveal ? (
          <div
            style={{
              position: 'absolute',
              top: -20,
              bottom: -20,
              left: `${lightSweep}%`,
              width: '35%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.0), rgba(255,255,255,0.45), rgba(255,255,255,0.0), transparent)',
              transform: 'skewX(-20deg)',
              mixBlendMode: 'screen',
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
