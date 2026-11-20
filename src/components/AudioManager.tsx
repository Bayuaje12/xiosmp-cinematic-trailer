import React from 'react';
import {Audio, Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';

const SFX: React.FC<{src: string; fromSec: number; durationSec?: number; volume?: number}> = ({
  src,
  fromSec,
  durationSec,
  volume = 0.5,
}) => {
  const {fps} = useVideoConfig();
  const from = Math.round(fromSec * fps);
  const durationInFrames = durationSec ? Math.round(durationSec * fps) : undefined;
  return (
    <Sequence from={from} durationInFrames={durationInFrames}>
      <Audio src={staticFile(src)} volume={volume} />
    </Sequence>
  );
};

export const AudioManager: React.FC = () => {
  const {fps, durationInFrames} = useVideoConfig();

  const bgmVolume = (f: number) => {
    const voWindows = [
      [0.5 * fps, 6.5 * fps],
      [7.3 * fps, 11.5 * fps],
      [14.5 * fps, 26.0 * fps],
      [27.5 * fps, 37.0 * fps],
      [38.3 * fps, 45.2 * fps],
      [46.3 * fps, 53.5 * fps],
      [55.3 * fps, 59.5 * fps],
    ];
    const inVo = voWindows.some(([a, b]) => f >= a && f <= b);
    const base = inVo ? 0.22 : 0.38;
    const intro = interpolate(f, [0, 1.5 * fps], [0, base], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const outro = interpolate(f, [durationInFrames - 2 * fps, durationInFrames], [base, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return Math.min(intro, outro);
  };

  return (
    <>
      {/* Background music - full duration */}
      <Audio src={staticFile('audio/bgm/main.wav')} volume={bgmVolume} />
      {/* Ambient bed */}
      <Audio src={staticFile('audio/sfx/ambient_wind.wav')} volume={0.12} />

      {/* Intro */}
      <SFX src="audio/sfx/riser_intro.wav" fromSec={0.4} durationSec={2} volume={0.35} />
      {/* Scene 2 Logo reveal */}
      <SFX src="audio/sfx/whoosh_impact_logo.wav" fromSec={7.0} durationSec={1.2} volume={0.45} />
      <SFX src="audio/sfx/impact_logo.wav" fromSec={7.25} durationSec={1.5} volume={0.55} />
      <SFX src="audio/sfx/sparkle.wav" fromSec={7.6} durationSec={1.2} volume={0.28} />
      <SFX src="audio/sfx/transition_sweep.wav" fromSec={13.8} durationSec={0.8} volume={0.3} />
      {/* Scene 3 */}
      <SFX src="audio/sfx/transition_sweep.wav" fromSec={26.8} durationSec={0.8} volume={0.28} />
      {/* Scene 4 */}
      <SFX src="audio/sfx/transition_sweep.wav" fromSec={37.8} durationSec={0.8} volume={0.28} />
      {/* Scene 5 */}
      <SFX src="audio/sfx/riser_mid.wav" fromSec={38.0} durationSec={2.5} volume={0.32} />
      <SFX src="audio/sfx/transition_sweep.wav" fromSec={45.8} durationSec={0.8} volume={0.3} />
      {/* Scene 6 */}
      <SFX src="audio/sfx/impact_server.wav" fromSec={46.0} durationSec={1.8} volume={0.5} />
      <SFX src="audio/sfx/transition_sweep.wav" fromSec={54.8} durationSec={0.8} volume={0.28} />
      {/* Scene 7 */}
      <SFX src="audio/sfx/final_hit.wav" fromSec={55.0} durationSec={3.0} volume={0.5} />
    </>
  );
};
