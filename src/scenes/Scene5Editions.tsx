import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {ParticleSystem} from '../components/ParticleSystem';
import {COLORS} from '../theme';

const EditionPanel: React.FC<{title: string; subtitle: string; color: string; side: 'left' | 'right' | 'top' | 'bottom'; progress: number; isPortrait: boolean}> = ({
  title, subtitle, color, side, progress, isPortrait,
}) => {
  const offset = (1 - progress) * 120;
  let transform = '';
  if (isPortrait) {
    transform = side === 'top' ? `translateY(${-offset}px)` : `translateY(${offset}px)`;
  } else {
    transform = side === 'left' ? `translateX(${-offset}px)` : `translateX(${offset}px)`;
  }
  const style: React.CSSProperties = isPortrait
    ? {position: 'absolute', left: '6%', right: '6%', top: side === 'top' ? '12%' : '52%', height: '34%', borderRadius: 24}
    : {position: 'absolute', top: '12%', bottom: '22%', left: side === 'left' ? '6%' : '52%', width: '42%', borderRadius: 24};

  return (
    <div
      style={{
        ...style,
        transform,
        opacity: progress,
        background: `linear-gradient(160deg, ${color}33, rgba(255,255,255,0.04))`,
        border: `1px solid ${color}88`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), inset 0 0 60px ${color}22`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 20%, ${color}44, transparent 55%)`}} />
      <div style={{fontSize: isPortrait ? 54 : 64, fontWeight: 900, color: COLORS.text, letterSpacing: 3, textShadow: `0 0 30px ${color}88`}}>{title}</div>
      <div style={{marginTop: 12, fontSize: isPortrait ? 22 : 26, color: COLORS.muted, letterSpacing: 2}}>{subtitle}</div>
      <div style={{marginTop: 22, width: isPortrait ? '70%' : '60%', height: 10, borderRadius: 999, background: `${color}55`, boxShadow: `0 0 20px ${color}88`}} />
      <div style={{marginTop: 12, width: isPortrait ? '50%' : '40%', height: 10, borderRadius: 999, background: `${color}33`}} />
    </div>
  );
};

export const Scene5Editions: React.FC<{layout: 'landscape' | 'portrait'}> = ({layout}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isPortrait = layout === 'portrait' || height > width;

  const leftIn = spring({frame: frame - 5, fps, config: {damping: 14, stiffness: 90}});
  const rightIn = spring({frame: frame - 12, fps, config: {damping: 14, stiffness: 90}});
  const merge = interpolate(frame, [150, 210], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const flash = interpolate(frame, [150, 165, 190], [0, 0.8, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textIn = interpolate(frame, [40, 70, 210, 235], [0, 1, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const oneCommunity = interpolate(frame, [180, 210], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <CinematicBackground variant="edition" intensity={1} />
      <ParticleSystem seed="s5" count={isPortrait ? 20 : 30} colors={[COLORS.emeraldGlow, COLORS.goldBright, '#7dd3fc']} opacity={0.35} direction="float" />

      <EditionPanel title="JAVA EDITION" subtitle="PC Experience" color={COLORS.warmOrange} side={isPortrait ? 'top' : 'left'} progress={leftIn} isPortrait={isPortrait} />
      <EditionPanel title="BEDROCK EDITION" subtitle="Cross-Device Play" color={COLORS.emeraldGlow} side={isPortrait ? 'bottom' : 'right'} progress={rightIn} isPortrait={isPortrait} />

      {/* merge beam */}
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
        <div
          style={{
            width: isPortrait ? '70%' : 8 + merge * 260,
            height: isPortrait ? 8 + merge * 220 : '50%',
            borderRadius: 999,
            background: `linear-gradient(${isPortrait ? 180 : 90}deg, ${COLORS.warmOrange}00, ${COLORS.goldBright}cc, ${COLORS.emeraldGlow}00)`,
            opacity: interpolate(frame, [120, 150, 230], [0, 0.9, 0.2], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            boxShadow: `0 0 60px ${COLORS.goldBright}88`,
            filter: 'blur(1px)',
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: isPortrait ? '8%' : '5%', textAlign: 'center'}}>
        <div style={{opacity: textIn, color: COLORS.text, fontSize: isPortrait ? 34 : 40, fontWeight: 700, letterSpacing: 2, padding: '0 8%', textShadow: '0 6px 24px rgba(0,0,0,0.6)'}}>
          Mainkan bersama Java maupun Bedrock
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: isPortrait ? '10%' : '8%', textAlign: 'center'}}>
        <div style={{opacity: oneCommunity, transform: `scale(${0.95 + oneCommunity * 0.05})`}}>
          <div style={{color: COLORS.goldBright, fontSize: isPortrait ? 44 : 54, fontWeight: 900, letterSpacing: 4, textShadow: `0 0 30px ${COLORS.gold}88`}}>ONE COMMUNITY</div>
          <div style={{color: COLORS.muted, fontSize: isPortrait ? 22 : 24, marginTop: 8, letterSpacing: 2}}>Satu server, lebih banyak petualangan</div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${COLORS.goldBright}88, transparent 45%)`, opacity: flash, mixBlendMode: 'screen'}} />
    </AbsoluteFill>
  );
};
