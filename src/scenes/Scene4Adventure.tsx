import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {ParticleSystem} from '../components/ParticleSystem';
import {COLORS} from '../theme';

export const Scene4Adventure: React.FC<{layout: 'landscape' | 'portrait'}> = ({layout}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const isPortrait = layout === 'portrait' || height > width;

  const fly = interpolate(frame, [0, 330], [0, isPortrait ? 60 : 120], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const scale = interpolate(frame, [0, 330], [1.08, 1.18], {extrapolateRight: 'clamp'});
  const textIn = interpolate(frame, [20, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ctaIn = interpolate(frame, [120, 150], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const mountains = [
    {x: -10, w: 50, h: isPortrait ? 34 : 42, c: '#0e2342', b: 18},
    {x: 30, w: 55, h: isPortrait ? 40 : 48, c: '#12355f', b: 26},
    {x: 60, w: 50, h: isPortrait ? 32 : 40, c: '#0b1f3b', b: 16},
  ];

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `translateX(${-fly * 0.3}px) scale(${scale})`}}>
        <CinematicBackground variant="adventure" intensity={1} />
      </AbsoluteFill>

      {/* cinematic landscape layers */}
      <AbsoluteFill style={{transform: `translateX(${-fly}px)`}}>
        {mountains.map((m, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${m.x}%`, bottom: isPortrait ? '24%' : '18%', width: `${m.w}%`, height: `${m.h}%`,
            background: `linear-gradient(180deg, ${m.c}, #071120)`,
            clipPath: 'polygon(0% 100%, 12% 55%, 25% 70%, 40% 25%, 55% 60%, 70% 20%, 85% 55%, 100% 35%, 100% 100%)',
            opacity: 0.95,
          }} />
        ))}
        {/* forest */}
        {Array.from({length: isPortrait ? 10 : 18}).map((_, i) => {
          const left = (i * (isPortrait ? 10 : 6)) % 100;
          const h = 40 + (i % 5) * 18;
          return (
            <div key={i} style={{position: 'absolute', left: `${left}%`, bottom: isPortrait ? '22%' : '16%', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: `${h}px solid ${i % 2 ? '#0f3d2a' : '#145236'}`, opacity: 0.9, transform: `translateX(${-fly * (0.2 + (i % 3) * 0.05)}px)`}} />
          );
        })}
        {/* grand builds silhouettes */}
        <div style={{position: 'absolute', left: isPortrait ? '18%' : '34%', bottom: isPortrait ? '24%' : '18%', width: isPortrait ? 80 : 120, height: isPortrait ? 90 : 130, background: '#1a2f4f', clipPath: 'polygon(0 100%,0 35%,20% 35%,20% 10%,35% 10%,35% 0,65% 0,65% 10%,80% 10%,80% 35%,100% 35%,100% 100%)', boxShadow: `0 0 40px ${COLORS.warmOrange}22`}} />
        <div style={{position: 'absolute', right: isPortrait ? '12%' : '22%', bottom: isPortrait ? '24%' : '18%', width: isPortrait ? 60 : 90, height: isPortrait ? 70 : 100, background: '#203a2f', clipPath: 'polygon(0 100%,0 45%,50% 0,100% 45%,100% 100%)'}} />

        {/* players/community abstract figures */}
        {[{x: isPortrait ? 30 : 42, c: COLORS.emeraldGlow}, {x: isPortrait ? 45 : 49, c: COLORS.goldBright}, {x: isPortrait ? 60 : 56, c: COLORS.deepBlueLight}].map((p, i) => (
          <div key={i} style={{position: 'absolute', left: `${p.x}%`, bottom: isPortrait ? '23%' : '17%', transform: `translateY(${Math.sin((frame + i * 12) / 10) * 2}px)`}}>
            <div style={{width: 14, height: 14, borderRadius: 7, background: p.c, margin: '0 auto', boxShadow: `0 0 12px ${p.c}88`}} />
            <div style={{width: 16, height: 22, borderRadius: 4, background: p.c, opacity: 0.85, margin: '2px auto 0'}} />
          </div>
        ))}
      </AbsoluteFill>

      <ParticleSystem seed="s4" count={isPortrait ? 18 : 28} colors={[COLORS.emeraldGlow, COLORS.goldBright, '#ffffff']} opacity={0.35} direction="float" />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)'}} />

      <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: isPortrait ? '18%' : '9%', textAlign: 'center', paddingLeft: '8%', paddingRight: '8%'}}>
        <div style={{opacity: textIn}}>
          <div style={{color: COLORS.text, fontSize: isPortrait ? 40 : 52, fontWeight: 800, lineHeight: 1.2, textShadow: '0 8px 30px rgba(0,0,0,0.7)'}}>
            Jelajahi dunia yang luas, ciptakan cerita, dan nikmati petualangan bersama
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: isPortrait ? '16%' : '10%'}}>
        <div style={{
          opacity: ctaIn,
          color: COLORS.goldBright,
          fontSize: isPortrait ? 44 : 58,
          fontWeight: 900,
          letterSpacing: 3,
          textAlign: 'center',
          textShadow: `0 0 24px ${COLORS.gold}66, 0 8px 30px rgba(0,0,0,0.7)`,
          padding: '0 6%',
        }}>
          YOUR ADVENTURE STARTS HERE
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
