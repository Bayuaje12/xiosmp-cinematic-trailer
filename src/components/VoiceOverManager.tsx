import React from 'react';
import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';

/**
 * Voice-over manager (male Indonesian).
 * VO audio generated via edge-tts (id-ID-ArdiNeural) and placed in public/audio/vo/.
 * Files are loaded at scene-aligned timestamps. Replace with human male recordings for best quality.
 */
const VO_TRACKS: Array<{file: string; fromSec: number; volume?: number}> = [
  {file: 'audio/vo/scene1.mp3', fromSec: 0.5, volume: 1},
  {file: 'audio/vo/scene2.mp3', fromSec: 7.3, volume: 1},
  {file: 'audio/vo/scene3.mp3', fromSec: 14.5, volume: 1},
  {file: 'audio/vo/scene4.mp3', fromSec: 27.5, volume: 1},
  {file: 'audio/vo/scene5.mp3', fromSec: 38.3, volume: 1},
  {file: 'audio/vo/scene6.mp3', fromSec: 46.3, volume: 1},
  {file: 'audio/vo/scene7.mp3', fromSec: 55.3, volume: 1},
];

export const VoiceOverManager: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <>
      {VO_TRACKS.map((track, i) => (
        <Sequence key={i} from={Math.round(track.fromSec * fps)}>
          <Audio src={staticFile(track.file)} volume={track.volume ?? 1} />
        </Sequence>
      ))}
    </>
  );
};
