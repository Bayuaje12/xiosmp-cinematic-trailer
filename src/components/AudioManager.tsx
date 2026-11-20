import React from 'react';
import {Audio, Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {SCENE_TIMINGS} from '../theme';

const sfx = (path: string, fromSeconds: number, volume = 0.5, durationSeconds?: number) => {
  const {fps} = useVideoConfig();
  const from = Math.round(fromSeconds * fps);
  const durationInFrames = durationSeconds ? Math.round(durationSeconds * fps) : undefined;
  return (
    <Sequence from={from} durationInFrames={durationInFrames}>
      <Audio src={staticFile(path)} volume={volume} />
    </Sequence>
  );
};

export const AudioManager: React.FC = () => {
  const {fps, durationInFrames} = useVideoConfig();

  const bgmVolume = (f: number) => {
    // base ~0.55, duck slightly during VO windows
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
      <Audio src={staticFile('audio/bgm/main.wav')} volume={bgmVolume} />
      <Audio src={staticFile('audio/sfx/ambient_wind.wav')} volume={0.12} />

      {/* Intro */}
      {sfx('audio/sfx/riser_intro.wav', 0.4, 0.35, 2)}
      {/* Scene 2 Logo reveal */}
      {sfx('audio/sfx/whoosh_impact_logo.wav', 7.0, 0.45, 1.2)}
      {sfx('audio/sfx/impact_logo.wav', 7.25, 0.55, 1.5)}
      {sfx('audio/sfx/sparkle.wav', 7.6, 0.28, 1.2)}
      {sfx('audio/sfx/transition_sweep.wav', 13.8, 0.3, 0.8)}
      {/* Scene 3 */}
      {sfx('audio/sfx/transition_sweep.wav', 26.8, 0.28, 0.8)}
      {/* Scene 4 */}
      {sfx('audio/sfx/transition_sweep.wav', 37.8, 0.28, 0.8)}
      {/* Scene 5 */}
      {sfx('audio/sfx/riser_mid.wav', 38.0, 0.32, 2.5)}
      {sfx('audio/sfx/transition_sweep.wav', 45.8, 0.3, 0.8)}
      {/* Scene 6 */}
      {sfx('audio/sfx/impact_server.wav', 46.0, 0.5, 1.8)}
      {sfx('audio/sfx/transition_sweep.wav', 54.8, 0.28, 0.8)}
      {/* Scene 7 */}
      {sfx('audio/sfx/final_hit.wav', 55.0, 0.5, 3.0)}
    </>
  );
};
