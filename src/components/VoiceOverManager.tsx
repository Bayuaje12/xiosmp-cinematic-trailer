import React from 'react';
import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';

/**
 * Voice-over manager.
 * TTS laki-laki Bahasa Indonesia belum tersedia sebagai file audio di lingkungan ini.
 * Jika file rekaman ditambahkan ke public/audio/vo/scene{n}.mp3 (atau .wav),
 * komponen ini akan memuatnya sesuai timestamp.
 *
 * Status: no bundled VO audio generated automatically.
 */
const VO_FILES: Array<{file: string; fromSec: number; durSec: number; volume?: number}> = [
  {file: 'audio/vo/scene1.mp3', fromSec: 0.5, durSec: 6.0, volume: 1},
  {file: 'audio/vo/scene2.mp3', fromSec: 7.3, durSec: 4.2, volume: 1},
  {file: 'audio/vo/scene3.mp3', fromSec: 14.5, durSec: 11.5, volume: 1},
  {file: 'audio/vo/scene4.mp3', fromSec: 27.5, durSec: 9.5, volume: 1},
  {file: 'audio/vo/scene5.mp3', fromSec: 38.3, durSec: 6.9, volume: 1},
  {file: 'audio/vo/scene6.mp3', fromSec: 46.3, durSec: 7.2, volume: 1},
  {file: 'audio/vo/scene7.mp3', fromSec: 55.3, durSec: 4.2, volume: 1},
];

export const VoiceOverManager: React.FC = () => {
  const {fps} = useVideoConfig();
  // Remotion will error on missing staticFile during render if referenced unconditionally in some setups,
  // so we keep this as a documented hook point. Users can uncomment entries after adding files.
  // To make it safe by default without files, we render nothing here.
  // When files are present, replace `null` block with mapped <Sequence><Audio/></Sequence>.
  void VO_FILES;
  void fps;
  void Sequence;
  void Audio;
  void staticFile;
  return null;
};
