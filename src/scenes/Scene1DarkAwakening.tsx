import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {FogLayer, ParticleSystem} from '../components/ParticleSystem';
import {COLORS} from '../theme';

export const Scene1DarkAwakening: React.FC<{layout: 'landscape' | 'portrait'}> = ({layout}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const isPortrait = layout === 'portrait' || height > width;

  const reveal = interpolate(frame, [0, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const worldY = interpolate(frame, [20, 180], [isPortrait ? 120 : 80, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const cameraScale = interpolate(frame, [0, 210], [1.12, 1], {extrapolateRight: 'clamp'});
  const textOpacity = interpolate(frame, [70, 110, 180, 205], [0, 1, 1, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textY = interpolate(frame, [70, 120], [20, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});

  const hills = [
    {color: '#0b1424', h: isPortrait ? 0.28 : 0.32, y: 0.62, blur: 2},
    {color: '#10213d', h: isPortrait ? 0.24 : 0.28, y: 0.68, blur: 1},
    {color: '#123524', h: isPortrait ? 0.22 : 0.25, y: 0.74, blur: 0},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.midnightDeep}}>
      <AbsoluteFill style={{opacity: 0.15 + reveal * 0.85, transform: `scale(${cameraScale})`}}>
        <CinematicBackground variant="intro" intensity={0.8} />
      </AbsoluteFill>

      {/* cinematic world silhouette reveal */}
      <AbsoluteFill style={{transform: `translateY(${worldY}px) scale(${cameraScale})`, opacity: reveal}}>
        {hills.map((hill, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '-10%',
              right: '-10%',
              bottom: `${(1 - hill.y - hill.h) * 100}%`,
              height: `${hill.h * 100}%`,
              background: `linear-gradient(180deg, ${hill.color} 0%, rgba(0,0,0,0.9) 100%)`,
              borderTopLeftRadius: '50% 30%',
              borderTopRightRadius: '50% 30%',
              filter: `blur(${hill.blur}px)`,
              boxShadow: i === 2 ? `0 -20px 80px ${COLORS.emerald}22` : undefined,
            }}
          />
        ))}
        {/* blocky "voxel" hints */}
        <div style={{position: 'absolute', left: isPortrait ? '12%' : '20%', bottom: isPortrait ? '20%' : '23%', width: isPortrait ? 44 : 60, height: isPortrait ? 44 : 60, background: '#1f6b45', opacity: 0.8, boxShadow: `0 0 20px ${COLORS.emerald}33`, transform: 'rotate(8deg)'}} />
        <div style={{position: 'absolute', right: isPortrait ? '15%' : '28%', bottom: isPortrait ? '22%' : '25%', width: isPortrait ? 34 : 46, height: isPortrait ? 34 : 46, background: '#204f7a', opacity: 0.75, transform: 'rotate(-6deg)'}} />
        <div style={{position: 'absolute', left: isPortrait ? '40%' : '48%', bottom: isPortrait ? '18%' : '20%', width: isPortrait ? 26 : 34, height: isPortrait ? 70 : 90, background: '#4a3518', opacity: 0.8}} />
        <div style={{position: 'absolute', left: isPortrait ? '39%' : '47.2%', bottom: isPortrait ? '24%' : '28%', width: isPortrait ? 56 : 72, height: isPortrait ? 28 : 34, background: '#1d5a3a', opacity: 0.85, borderRadius: 6}} />
      </AbsoluteFill>

      <FogLayer opacity={0.28} speed={0.35} />
      <ParticleSystem seed="scene1-gold" count={28} colors={[COLORS.gold, COLORS.goldBright, '#fff3bf']} direction="up" opacity={0.55} />
      <ParticleSystem seed="scene1-emerald" count={22} colors={[COLORS.emerald, COLORS.emeraldGlow]} direction="float" opacity={0.45} />

      <AbsoluteFill
        style={{
          justifyContent: isPortrait ? 'flex-end' : 'center',
          alignItems: 'center',
          padding: isPortrait ? '0 10% 22%' : '0 12%',
          textAlign: 'center',
        }}
      >
        <div style={{opacity: textOpacity, transform: `translateY(${textY}px)`}}>
          <div
            style={{
              color: COLORS.text,
              fontSize: isPortrait ? 54 : 64,
              fontWeight: 700,
              letterSpacing: isPortrait ? 2 : 4,
              lineHeight: 1.15,
              textShadow: `0 0 30px ${COLORS.emerald}55, 0 8px 30px rgba(0,0,0,0.8)`,
              textTransform: 'uppercase',
            }}
          >
            A NEW WORLD IS WAITING
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{backgroundColor: '#000', opacity: interpolate(frame, [0, 25], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}} />
    </AbsoluteFill>
  );
};
