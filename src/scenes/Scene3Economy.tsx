import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CinematicBackground} from '../components/CinematicBackground';
import {ParticleSystem} from '../components/ParticleSystem';
import {COLORS} from '../theme';

const Card: React.FC<{title: string; subtitle: string; accent: string; x: number; y: number; w: number; delay: number; icon: React.ReactNode}> = ({
  title, subtitle, accent, x, y, w, delay, icon,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const float = Math.sin((frame + delay) / 30) * 4;
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        padding: '18px 18px',
        borderRadius: 18,
        background: 'linear-gradient(160deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
        border: `1px solid ${accent}55`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.35), 0 0 30px ${accent}22`,
        backdropFilter: 'blur(4px)',
        opacity: p,
        transform: `translateY(${(1 - p) * 30 + float}px) scale(${0.96 + p * 0.04})`,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 46, height: 46, borderRadius: 12, background: `${accent}22`, border: `1px solid ${accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, fontSize: 22, fontWeight: 800, boxShadow: `0 0 18px ${accent}33`}}>
          {icon}
        </div>
        <div>
          <div style={{color: COLORS.text, fontSize: 22, fontWeight: 700, letterSpacing: 1}}>{title}</div>
          <div style={{color: COLORS.muted, fontSize: 14, marginTop: 4}}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export const Scene3Economy: React.FC<{layout: 'landscape' | 'portrait'}> = ({layout}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const isPortrait = layout === 'portrait' || height > width;

  const titleIn = interpolate(frame, [10, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const keywordsIn = interpolate(frame, [120, 150, 360, 385], [0, 1, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pan = interpolate(frame, [0, 390], [0, -20], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `translateX(${pan}px) scale(1.05)`}}>
        <CinematicBackground variant="economy" intensity={1} />
      </AbsoluteFill>
      <ParticleSystem seed="s3-emerald" count={isPortrait ? 22 : 35} colors={[COLORS.emerald, COLORS.emeraldGlow]} opacity={0.4} />

      {/* marketplace / medieval shop silhouettes */}
      <AbsoluteFill style={{opacity: 0.35}}>
        <div style={{position: 'absolute', left: isPortrait ? '-5%' : '5%', bottom: isPortrait ? '18%' : '12%', width: isPortrait ? '50%' : '28%', height: isPortrait ? '18%' : '28%', background: 'linear-gradient(180deg, #2a1d12, #120d08)', clipPath: 'polygon(0 100%, 0 35%, 15% 35%, 15% 15%, 50% 0, 85% 15%, 85% 35%, 100% 35%, 100% 100%)'}} />
        <div style={{position: 'absolute', right: isPortrait ? '-5%' : '8%', bottom: isPortrait ? '18%' : '12%', width: isPortrait ? '46%' : '24%', height: isPortrait ? '16%' : '24%', background: 'linear-gradient(180deg, #1e2a38, #0a1018)', clipPath: 'polygon(0 100%, 0 40%, 20% 40%, 20% 20%, 50% 0, 80% 20%, 80% 40%, 100% 40%, 100% 100%)'}} />
      </AbsoluteFill>

      {/* animated economy elements */}
      <div style={{position: 'absolute', left: isPortrait ? '10%' : '18%', top: isPortrait ? '30%' : '34%', width: 54, height: 54, background: COLORS.emerald, transform: `rotate(${frame * 0.8}deg)`, boxShadow: `0 0 30px ${COLORS.emeraldGlow}88`, borderRadius: 8, opacity: 0.9}} />
      <div style={{position: 'absolute', right: isPortrait ? '14%' : '22%', top: isPortrait ? '26%' : '28%', width: 70, height: 46, borderRadius: 8, background: `linear-gradient(180deg, ${COLORS.goldBright}, ${COLORS.goldDeep})`, boxShadow: `0 0 30px ${COLORS.gold}66`}} />
      <div style={{position: 'absolute', right: isPortrait ? '12%' : '20%', top: isPortrait ? '28%' : '30%', width: 70, height: 16, borderRadius: 4, background: COLORS.gold, opacity: 0.9}} />

      {isPortrait ? (
        <>
          <Card title="Trading" subtitle="Jual beli & nilai sumber daya" accent={COLORS.emerald} x={8} y={34} w={84} delay={20} icon="◆" />
          <Card title="Chest & Resources" subtitle="Kumpulkan dan kelola hasil" accent={COLORS.gold} x={8} y={48} w={84} delay={40} icon="▣" />
          <Card title="Medieval Shops" subtitle="Suasana pasar kerajaan" accent={COLORS.warmOrange} x={8} y={62} w={84} delay={60} icon="⌂" />
        </>
      ) : (
        <>
          <Card title="Trading" subtitle="Jual beli & nilai sumber daya" accent={COLORS.emerald} x={8} y={38} w={26} delay={20} icon="◆" />
          <Card title="Chest & Resources" subtitle="Kumpulkan dan kelola hasil" accent={COLORS.gold} x={37} y={30} w={26} delay={40} icon="▣" />
          <Card title="Medieval Shops" subtitle="Suasana pasar kerajaan" accent={COLORS.warmOrange} x={66} y={42} w={26} delay={60} icon="⌂" />
        </>
      )}

      <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: isPortrait ? '18%' : '8%', textAlign: 'center'}}>
        <div style={{opacity: titleIn, padding: '0 8%'}}>
          <div style={{color: COLORS.muted, fontSize: isPortrait ? 22 : 24, letterSpacing: 3, marginBottom: 10}}>ECONOMY SURVIVAL MULTIPLAYER</div>
          <div style={{color: COLORS.text, fontSize: isPortrait ? 40 : 50, fontWeight: 800, lineHeight: 1.15, textShadow: `0 6px 30px rgba(0,0,0,0.6)`}}>
            Kumpulkan sumber daya, kembangkan kekayaan, bangun kerajaan impianmu
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: isPortrait ? '16%' : '10%'}}>
        <div style={{opacity: keywordsIn, display: 'flex', gap: isPortrait ? 14 : 26, flexWrap: 'wrap', justifyContent: 'center', padding: '0 6%'}}>
          {['TRADE.', 'EARN.', 'BUILD YOUR EMPIRE.'].map((t, i) => (
            <div key={t} style={{
              color: i === 2 ? COLORS.goldBright : COLORS.text,
              fontSize: isPortrait ? 34 : 46,
              fontWeight: 900,
              letterSpacing: 2,
              textShadow: `0 0 20px ${i === 2 ? COLORS.gold : COLORS.emerald}66`,
              transform: `translateY(${Math.sin((frame + i * 20) / 18) * 3}px)`
            }}>{t}</div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
