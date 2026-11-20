import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {ParticleSystem} from '../components/ParticleSystem';
import {XiosmpLogo} from '../components/XiosmpLogo';
import {COLORS, SERVER} from '../theme';

export const Scene7FinalLogo: React.FC<{layout: 'landscape' | 'portrait'}> = ({layout}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const isPortrait = layout === 'portrait' || height > width;

  const zoomOut = interpolate(frame, [0, 150], [1.08, 0.96], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const fadeOutParticles = interpolate(frame, [40, 140], [0.55, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textIn = interpolate(frame, [20, 45], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textY = interpolate(frame, [20, 50], [20, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const light = interpolate(frame, [0, 40, 120], [0.2, 0.7, 0.35], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${zoomOut})`}}>
        <CinematicBackground variant="outro" intensity={1} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: fadeOutParticles}}>
        <ParticleSystem seed="s7-gold" count={isPortrait ? 22 : 34} colors={[COLORS.gold, COLORS.goldBright, '#fff4c2']} opacity={0.55} direction="up" />
        <ParticleSystem seed="s7-emerald" count={isPortrait ? 16 : 24} colors={[COLORS.emeraldGlow, COLORS.emerald]} opacity={0.35} direction="float" />
      </AbsoluteFill>

      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, rgba(246,211,101,${0.25 + light * 0.25}), transparent 45%)`, mixBlendMode: 'screen'}} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: isPortrait ? '10% 8%' : '6% 10%'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isPortrait ? 26 : 22, transform: `scale(${zoomOut})`}}>
          <XiosmpLogo size={isPortrait ? Math.min(width * 0.58, 480) : 380} glow={1.1} />
          <div style={{textAlign: 'center', opacity: textIn, transform: `translateY(${textY}px)`}}>
            <div style={{color: COLORS.text, fontSize: isPortrait ? 54 : 68, fontWeight: 900, letterSpacing: 2, textShadow: `0 0 30px ${COLORS.gold}66, 0 10px 40px rgba(0,0,0,0.7)`}}>
              SEE YOU IN XIOSMP!
            </div>
            <div style={{color: COLORS.goldBright, fontSize: isPortrait ? 28 : 34, fontWeight: 700, marginTop: 14, letterSpacing: isPortrait ? 2 : 4, textShadow: `0 0 20px ${COLORS.gold}55`}}>
              {SERVER.tagline}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.45) 100%)'}} />
    </AbsoluteFill>
  );
};
