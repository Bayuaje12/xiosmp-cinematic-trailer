import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';

type Props = {
  variant?: 'intro' | 'logo' | 'economy' | 'adventure' | 'edition' | 'reveal' | 'outro';
  intensity?: number;
};

export const CinematicBackground: React.FC<Props> = ({variant = 'intro', intensity = 1}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 1800], [0, 40]);

  const accentA = variant === 'economy' || variant === 'reveal' ? COLORS.emerald : COLORS.deepBlueLight;
  const accentB = variant === 'logo' || variant === 'outro' || variant === 'reveal' ? COLORS.gold : COLORS.emeraldDark;

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.midnight, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 20% 30%, ${accentA}33 0%, transparent 35%), radial-gradient(circle at 80% 70%, ${accentB}2e 0%, transparent 30%), linear-gradient(135deg, ${COLORS.midnightDeep} 0%, ${COLORS.midnight} 45%, ${COLORS.deepBlue} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.18 * intensity,
          backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 120px), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 120px)`,
          transform: `translateY(${drift * 0.2}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.22 * intensity,
          background: `radial-gradient(ellipse at ${50 + Math.sin(frame / 90) * 10}% ${30 + Math.cos(frame / 110) * 8}%, rgba(246,211,101,0.16), transparent 45%)`,
          filter: 'blur(30px)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.45) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.12,
          background: `linear-gradient(${120 + frame * 0.03}deg, transparent 20%, rgba(255,255,255,0.06) 45%, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};
