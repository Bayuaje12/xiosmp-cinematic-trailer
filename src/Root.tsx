import React from 'react';
import {Composition} from 'remotion';
import {Trailer, TrailerProps} from './Trailer';
import {DURATION_FRAMES, FPS, LANDSCAPE, PORTRAIT} from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="XIOSMP-Landscape"
        component={Trailer}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={LANDSCAPE.width}
        height={LANDSCAPE.height}
        defaultProps={{layout: 'landscape'} satisfies TrailerProps}
      />
      <Composition
        id="XIOSMP-Vertical"
        component={Trailer}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        defaultProps={{layout: 'portrait'} satisfies TrailerProps}
      />
    </>
  );
};
