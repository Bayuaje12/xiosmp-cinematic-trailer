import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {ParticleSystem} from '../components/ParticleSystem';
import {XiosmpLogo} from '../components/XiosmpLogo';
import {COLORS, SERVER} from '../theme';

const TypeText: React.FC<{text: string; start: number; speed?: number; style?: React.CSSProperties}> = ({text, start, speed = 0.6, style}) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(interpolate(frame, [start, start + text.length / speed], [0, text.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const cursorOn = Math.floor(frame / 8) % 2 === 0;
  const done = chars >= text.length;
  return (
    <span style={style}>
      {text.slice(0, chars)}
      <span style={{opacity: done ? (cursorOn ? 0.8 : 0.2) : 1, color: COLORS.goldBright}}>|</span>
    </span>
  );
};

export const Scene6ServerReveal: React.FC<{layout: 'landscape' | 'portrait'}> = ({layout}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const isPortrait = layout === 'portrait' || height > width;

  const inMain = interpolate(frame, [0, 25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const panelIn = interpolate(frame, [20, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const glowPulse = 0.7 + 0.3 * Math.sin(frame / 10);
  const ipGlow = 0.6 + 0.4 * Math.sin(frame / 8);

  return (
    <AbsoluteFill>
      <CinematicBackground variant="reveal" intensity={1.15} />
      {/* kingdom silhouette feel */}
      <AbsoluteFill style={{opacity: 0.3}}>
        <div style={{position: 'absolute', bottom: isPortrait ? '14%' : '8%', left: '5%', right: '5%', height: isPortrait ? '18%' : '28%', background: 'linear-gradient(180deg, #1c2740, #090d16)', clipPath: 'polygon(0 100%,0 60%,6% 60%,6% 35%,10% 35%,10% 50%,16% 50%,16% 20%,22% 20%,22% 45%,30% 45%,30% 10%,35% 0,40% 10%,40% 45%,50% 45%,50% 25%,56% 25%,56% 55%,64% 55%,64% 30%,70% 15%,76% 30%,76% 55%,84% 55%,84% 40%,90% 40%,90% 60%,100% 60%,100% 100%)'}} />
      </AbsoluteFill>
      <ParticleSystem seed="s6-emerald" count={isPortrait ? 26 : 40} colors={[COLORS.emerald, COLORS.emeraldGlow]} opacity={0.5} />
      <ParticleSystem seed="s6-gold" count={isPortrait ? 18 : 28} colors={[COLORS.gold, COLORS.goldBright]} opacity={0.45} direction="float" />

      <AbsoluteFill style={{padding: isPortrait ? '10% 6% 8%' : '5% 8%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: isPortrait ? 'column' : 'row', alignItems: 'center', gap: isPortrait ? 18 : 28, opacity: inMain}}>
          <XiosmpLogo size={isPortrait ? Math.min(width * 0.34, 240) : 170} glow={glowPulse} />
          <div style={{textAlign: isPortrait ? 'center' : 'left'}}>
            <div style={{color: COLORS.text, fontSize: isPortrait ? 54 : 72, fontWeight: 900, letterSpacing: 3, textShadow: `0 0 30px ${COLORS.emerald}66`}}>
              JOIN XIOSMP NOW!
            </div>
            <div style={{color: COLORS.muted, fontSize: isPortrait ? 22 : 26, marginTop: 6, letterSpacing: 2}}>Satu server, lebih banyak petualangan</div>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: isPortrait ? 900 : 1100,
            borderRadius: 28,
            padding: isPortrait ? '28px 20px' : '30px 36px',
            background: 'linear-gradient(160deg, rgba(16,185,129,0.12), rgba(212,175,55,0.10) 45%, rgba(11,27,58,0.55))',
            border: `1px solid ${COLORS.gold}66`,
            boxShadow: `0 20px 80px rgba(0,0,0,0.55), 0 0 50px ${COLORS.emerald}22`,
            opacity: panelIn,
            transform: `translateY(${(1 - panelIn) * 24}px)`,
          }}
        >
          <div style={{display: 'grid', gridTemplateColumns: isPortrait ? '1fr' : '1.3fr 0.7fr', gap: isPortrait ? 18 : 24, alignItems: 'center'}}>
            <div style={{textAlign: isPortrait ? 'center' : 'left'}}>
              <div style={{color: COLORS.muted, fontSize: isPortrait ? 20 : 22, letterSpacing: 3, marginBottom: 8}}>IP</div>
              <div style={{
                color: COLORS.text,
                fontSize: isPortrait ? Math.min(width * 0.072, 54) : 58,
                fontWeight: 900,
                letterSpacing: 1,
                lineHeight: 1.1,
                wordBreak: 'break-word',
                textShadow: `0 0 ${18 * ipGlow}px ${COLORS.emeraldGlow}, 0 0 ${36 * ipGlow}px ${COLORS.emerald}66`,
                padding: isPortrait ? '4px 2px' : '4px 0',
              }}>
                <TypeText text={SERVER.ip} start={35} speed={0.9} />
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: isPortrait ? 'row' : 'column', gap: 16, justifyContent: 'center'}}>
              <div style={{flex: 1, textAlign: 'center', padding: '14px 12px', borderRadius: 16, background: 'rgba(0,0,0,0.25)', border: `1px solid ${COLORS.gold}55`}}>
                <div style={{color: COLORS.muted, fontSize: 18, letterSpacing: 3}}>PORT</div>
                <div style={{color: COLORS.goldBright, fontSize: isPortrait ? 44 : 50, fontWeight: 900, marginTop: 4, textShadow: `0 0 18px ${COLORS.gold}88`}}>{SERVER.port}</div>
              </div>
              <div style={{flex: 1, textAlign: 'center', padding: '14px 12px', borderRadius: 16, background: 'rgba(0,0,0,0.25)', border: `1px solid ${COLORS.emerald}55`}}>
                <div style={{color: COLORS.muted, fontSize: 18, letterSpacing: 3}}>EDITION</div>
                <div style={{color: COLORS.emeraldGlow, fontSize: isPortrait ? 28 : 30, fontWeight: 800, marginTop: 10, textShadow: `0 0 16px ${COLORS.emerald}88`}}>{SERVER.editions}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{textAlign: 'center', opacity: interpolate(frame, [60, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          <div style={{color: COLORS.text, fontSize: isPortrait ? 24 : 28, letterSpacing: 2}}>
            Jangan tunggu lebih lama. Bergabunglah sekarang di <span style={{color: COLORS.goldBright, fontWeight: 700}}>{SERVER.name}</span>!
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
