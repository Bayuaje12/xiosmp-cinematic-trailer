import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENE_TIMINGS} from './theme';
import {AudioManager} from './components/AudioManager';
import {VoiceOverManager} from './components/VoiceOverManager';
import {Scene1DarkAwakening} from './scenes/Scene1DarkAwakening';
import {Scene2LogoReveal} from './scenes/Scene2LogoReveal';
import {Scene3Economy} from './scenes/Scene3Economy';
import {Scene4Adventure} from './scenes/Scene4Adventure';
import {Scene5Editions} from './scenes/Scene5Editions';
import {Scene6ServerReveal} from './scenes/Scene6ServerReveal';
import {Scene7FinalLogo} from './scenes/Scene7FinalLogo';

export type TrailerProps = {
  layout: 'landscape' | 'portrait';
};

export const Trailer: React.FC<TrailerProps> = ({layout}) => {
  return (
    <AbsoluteFill style={{backgroundColor: '#02040A', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif'}}>
      <Sequence from={SCENE_TIMINGS.scene1.from} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <Scene1DarkAwakening layout={layout} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2.from} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <Scene2LogoReveal layout={layout} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3.from} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <Scene3Economy layout={layout} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4.from} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <Scene4Adventure layout={layout} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5.from} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <Scene5Editions layout={layout} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6.from} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <Scene6ServerReveal layout={layout} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7.from} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <Scene7FinalLogo layout={layout} />
      </Sequence>
      <AudioManager />
      <VoiceOverManager />
    </AbsoluteFill>
  );
};
