import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {ParticleSystem} from '../components/ParticleSystem';
import {XiosmpLogo} from '../components/XiosmpLogo';
import {COLORS, SERVER} from '../theme';

export const Scene2LogoReveal: React.FC<{layout: 'landscape' | 'portrait'}> = ({layout}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isPortrait = layout === 'portrait' || height > width;

  const impact = spring({frame: frame - 10, fps, config: {damping: 12, stiffness: 120, mass: 0.8}});
  const flash = interpolate(frame, [8, 14, 28], [0, 0.85, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const titleIn = interpolate(frame, [28, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const titleY = interpolate(frame, [28, 60], [30, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const tagIn = interpolate(frame, [55, 85], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const camZoom = interpolate(frame, [0, 210], [1.15, 1.02], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${camZoom})`}}>
        <CinematicBackground variant="logo" intensity={1.1} />
      </AbsoluteFill>

      <ParticleSystem seed="s2-emerald" count={isPortrait ? 30 : 45} colors={[COLORS.emerald, COLORS.emeraldGlow, '#a7f3d0']} opacity={0.6} />
      <ParticleSystem seed="s2-gold" count={isPortrait ? 24 : 36} colors={[COLORS.gold, COLORS.goldBright, '#fff1b8']} opacity={0.55} direction="float" />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: isPortrait ? '8% 8% 12%' : '4% 8%'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isPortrait ? 28 : 22}}>
          <XiosmpLogo
            size={isPortrait ? Math.min(width * 0.62, 520) : 420}
            reveal
            revealFrom={8}
            glow={1.2}
            rotation={interpolate(impact, [0, 1], [-4, 0])}
          />
          <div style={{textAlign: 'center', opacity: titleIn, transform: `translateY(${titleY}px)`}}>
            <div
              style={{
                color: COLORS.text,
                fontSize: isPortrait ? 92 : 110,
                fontWeight: 900,
                letterSpacing: isPortrait ? 6 : 10,
                lineHeight: 1,
                textShadow: `0 0 24px ${COLORS.emerald}88, 0 0 60px ${COLORS.gold}44, 0 10px 40px rgba(0,0,0,0.7)`,
              }}
            >
              {SERVER.name}
            </div>
            <div
              style={{
                marginTop: isPortrait ? 18 : 14,
                color: COLORS.goldBright,
                fontSize: isPortrait ? 30 : 34,
                fontWeight: 700,
                letterSpacing: isPortrait ? 2 : 4,
                opacity: tagIn,
                textShadow: `0 0 20px ${COLORS.gold}66`,
              }}
            >
              {SERVER.tagline}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, ${COLORS.goldBright}66, transparent 45%)`, opacity: flash, mixBlendMode: 'screen'}} />
      <AbsoluteFill style={{backgroundColor: 'white', opacity: interpolate(frame, [9, 12, 20], [0, 0.22, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), mixBlendMode: 'screen'}} />
    </AbsoluteFill>
  );
};
