import React from 'react';
import {Composition} from 'remotion';
import {FontLoader} from './lib';
import {FORMATS, FPS, Format, TAIL_S} from './theme';
import {V1} from './V1';
import {V2} from './V2';
import m1 from '../data/vo_01_meta.json';
import m2 from '../data/vo_02_meta.json';

// duración = audio de la voz + cola de 0,5 s
const frames = (s: number) => Math.ceil((s + TAIL_S) * FPS);
const withFonts = (C: React.FC<{format: Format}>) => (props: {format: Format}) => (<><FontLoader /><C {...props} /></>);
const V1F = withFonts(V1), V2F = withFonts(V2);

export const Root: React.FC = () => (
  <>
    {(['9x16', '4x5'] as Format[]).map((fmt) => (
      <React.Fragment key={fmt}>
        <Composition id={`V1-${fmt}`} component={V1F} durationInFrames={frames(m1.audio_s)} fps={FPS}
          width={FORMATS[fmt].W} height={FORMATS[fmt].H} defaultProps={{format: fmt}} />
        <Composition id={`V2-${fmt}`} component={V2F} durationInFrames={frames(m2.audio_s)} fps={FPS}
          width={FORMATS[fmt].W} height={FORMATS[fmt].H} defaultProps={{format: fmt}} />
      </React.Fragment>
    ))}
  </>
);
