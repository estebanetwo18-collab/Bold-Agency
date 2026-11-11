import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import words from '../data/vo_02_words.json';
import subs from '../data/vo_02_subs.json';
import cues from '../data/cues_02.json';
import {C, FPS, Format, LEAD} from './theme';
import {AudioTrack, EIO, Grain, Layout, Logo, Stage, Subtitles, Txt, arrive, lerp, mixColor, p, resolveCues, safeCY, sp, useLayout} from './lib';
import {House, WINDOWS} from './House';

export const K = resolveCues(words, cues);
const at = (id: string) => K[id] - LEAD;
const wf = (i: number) => Math.round(words[i].start * FPS); // cuadro de la palabra i del guion
const GRIS = '#8A948D';

// ------------------------------------------------------------------ fondo nocturno compartido
const BUILDINGS = [[-180, 210], [-40, 300], [90, 170], [200, 260], [330, 200], [720, 240], [840, 320], [970, 190], [1090, 280], [1210, 220]];
const City: React.FC<{lit: number}> = ({lit}) => (
  <g>
    {BUILDINGS.map(([x, h], i) => (
      <g key={i}>
        <rect x={x} y={900 - h} width={118} height={h} fill="#22302A" />
        {Array.from({length: Math.floor(h / 46)}, (_, r) => [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={x + 16 + c * 34} y={900 - h + 18 + r * 46} width={18} height={22}
            fill={C.sol} opacity={((i * 7 + r * 3 + c) % 4 === 0 ? 0.55 : 0.12) * lit} />
        )))}
      </g>
    ))}
  </g>
);
const NightSky: React.FC<{L: Layout}> = ({L}) => (
  <>
    <defs>
      <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.nocheAlto} />
        <stop offset="1" stopColor={C.noche} />
      </linearGradient>
    </defs>
    <rect width={L.W} height={L.H} fill="url(#night)" />
  </>
);
const Pole: React.FC<{x: number; light: number}> = ({x, light}) => (
  <g>
    <polygon points={`${x + 30},520 ${x + 220},900 ${x - 160},900`} fill={C.sol} opacity={0.13 * light} />
    <rect x={x - 9} y={500} width={18} height={400} fill={C.tinta} />
    <path d={`M${x} 506 Q ${x + 10} 486 ${x + 40} 500`} fill="none" stroke={C.tinta} strokeWidth={8} />
    <rect x={x + 22} y={498} width={36} height={14} rx={5} fill={light > 0.5 ? C.sol : '#3B463F'} />
  </g>
);

// ------------------------------------------------------------------ 1-2 · mito + apagón
const MYTH = [[1, 4], [5, 9], [10, 12]]; // líneas (índices de palabras del guion)
const NightScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const drop = sp(f, 0, 9, 160);
  const fl = f - at('apagon');
  const flick = fl >= 0 && fl < 18 ? [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1][fl] : 1;
  const cityLit = fl < 0 ? 1 : fl < 10 ? flick : 0;
  const shake = fl >= 0 && fl < 16 ? 1 : 0;
  const dx = shake * 3 * Math.sin(f * 2.1), dy = shake * 2 * Math.cos(f * 2.7);
  const winOn = WINDOWS.map(() => mixColor(C.tinta, C.sol, flick));
  return (
    <g transform={`translate(${dx} ${dy})`}>
      <NightSky L={L} />
      <Stage L={L}>
        <circle cx={880} cy={520} r={110} fill={C.crema} opacity={0.06} />
        <circle cx={880} cy={520} r={46} fill={C.crema} opacity={0.55} />
        <City lit={cityLit} />
        <rect x={-3000} y={900} width={7080} height={3000} fill="#16241B" />
        <Pole x={140} light={fl < 0 ? 1 : flick} />
        <House x={560} y={900} scale={0.8} windowColors={winOn} panels={() => ({dy: 0, o: 1})} bodyColor={C.verdeProfundo} roofColor={C.verde} />
        <g transform={`translate(540 ${lerp(-260, 120, drop)})`}>
          <Txt serif fontSize={170} fill={C.sol}>Mito:</Txt>
        </g>
        {MYTH.map(([a, b], li) => (
          <Txt key={li} fontSize={54} w={700} fill={C.crema} x={540} y={225 + li * 68}>
            {words.slice(a, b + 1).map((w, j) => {
              const o = p(f, wf(a + j) - 3, wf(a + j) + 2);
              return <tspan key={j} opacity={o}>{w.word}{j < b - a ? ' ' : ''}</tspan>;
            })}
          </Txt>
        ))}
      </Stage>
    </g>
  );
};

// ------------------------------------------------------------------ 3-4 · dato + se apaga
const DatoScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const wipe = arrive(f, K.dato, LEAD, EIO);
  const t = sp(f, at('dato'), 12, 170);
  const wire = p(f, at('red'), K.red + 12, EIO);
  const nb = sp(f, at('sinbateria'), 10, 220);
  const off = p(f, at('apaga'), K.apaga + 4, EIO);
  const sw = sp(f, at('apaga') - 10, 13, 200);
  const flip = p(f, at('apaga'), K.apaga + 2, EIO);
  const wins = WINDOWS.map((_, i) => mixColor(C.sol, C.tinta, p(f, at('apaga') + i * 3, K.apaga + i * 3)));
  const wireC = mixColor(C.sol, GRIS, off);
  return (
    <>
      {wipe < 1 && <NightScene f={f} L={L} />}
      <rect x={L.W * (1 - wipe)} width={L.W * wipe + 2} height={L.H} fill={C.crema} />
      {wipe > 0.6 && (
        <Stage L={L}>
          <g opacity={p(wipe, 0.6, 1)}>
            <rect x={-3000} y={900} width={7080} height={3000} fill={C.verde} />
            <rect x={161} y={520} width={18} height={380} fill={C.tinta} />
            <line x1={100} y1={560} x2={240} y2={560} stroke={C.tinta} strokeWidth={10} strokeLinecap="round" />
            <House x={620} y={900} scale={0.74} windowColors={wins} panels={() => ({dy: 0, o: 1})} />
            <path d="M232 560 Q 360 600 470 545" fill="none" stroke={wireC} strokeWidth={6} strokeLinecap="round"
              pathLength={1} strokeDasharray={off > 0 ? '0.05 0.03' : '1'} strokeDashoffset={off > 0 ? 0 : 1 - wire} />
            <g transform={`translate(960 820) scale(${nb})`}>
              <rect x={-12} y={-74} width={24} height={10} rx={3} fill={C.tinta} />
              <rect x={-36} y={-64} width={72} height={124} rx={10} fill="none" stroke={C.tinta} strokeWidth={6} />
              <line x1={-56} y1={64} x2={56} y2={-80} stroke={C.tinta} strokeWidth={9} strokeLinecap="round" />
            </g>
            <g transform={`translate(540 ${120 - (1 - t) * 60})`} opacity={Math.min(1, t * 1.4)}>
              <Txt serif fontSize={170} fill={C.verdeProfundo}>Dato:</Txt>
            </g>
            <g transform={`translate(540 290) scale(${sw})`}>
              <rect x={-80} y={-40} width={160} height={80} rx={40} fill={mixColor(C.verdeClaro, GRIS, flip)} />
              <circle cx={lerp(40, -40, flip)} cy={0} r={30} fill={C.crema} />
              <Txt fontSize={36} w={800} fill={C.tinta} x={150} y={13} opacity={flip}>OFF</Txt>
              <Txt fontSize={36} w={800} fill={C.verdeProfundo} x={-140} y={13} opacity={1 - flip}>ON</Txt>
            </g>
          </g>
        </Stage>
      )}
    </>
  );
};

// ------------------------------------------------------------------ 5 · seguridad
const SafetyScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const climb = sp(f, at('seguridad') - 2, 15, 160);
  const sh = sp(f, at('seguridad'), 10, 200);
  const chk = p(f, K.seguridad + 2, K.seguridad + 12, EIO);
  const t1 = sp(f, at('protege'), 13, 190), t2 = sp(f, at('protege') + 5, 13, 190);
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.verdeMedio} />
      <Stage L={L}>
        {[0, 1].map((i) => <path key={i} d={`M-200 ${200 + i * 50} Q 540 ${300 + i * 50} 1280 ${200 + i * 50}`} fill="none" stroke={C.tinta} strokeWidth={4} opacity={0.6} />)}
        <rect x={505} y={150} width={60} height={620} fill={C.tinta} />
        <ellipse cx={540} cy={1290} rx={1100} ry={560} fill={C.crema} />
        <rect x={330} y={226} width={410} height={20} rx={6} fill={C.tinta} />
        {[350, 520, 700].map((x, i) => <rect key={i} x={x} y={198} width={16} height={30} rx={4} fill={C.crema} opacity={0.8} />)}
        <g transform={`translate(0 ${(1 - climb) * 420})`} fill={C.tinta} stroke={C.tinta} strokeLinecap="round">
          <path d="M424 336 a38 38 0 0 1 76 0 Z" />
          <rect x={420} y={332} width={84} height={8} rx={4} />
          <circle cx={462} cy={366} r={26} />
          <rect x={426} y={396} width={74} height={128} rx={26} />
          <line x1={490} y1={420} x2={508} y2={470} strokeWidth={18} />
          <line x1={440} y1={420} x2={505} y2={392} strokeWidth={18} />
          <line x1={446} y1={516} x2={430} y2={610} strokeWidth={20} />
          <line x1={484} y1={516} x2={506} y2={590} strokeWidth={20} />
        </g>
        <g transform={`translate(800 430) scale(${sh})`}>
          <path d="M0 -140 L120 -96 V-4 C120 74 66 122 0 150 C-66 122 -120 74 -120 -4 V-96 Z" fill={C.verdeProfundo} stroke={C.crema} strokeWidth={10} strokeLinejoin="round" />
          <path d="M-48 2 L-12 38 L56 -40" fill="none" stroke={C.verdeClaro} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round"
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - chk} />
        </g>
        <g transform={`translate(540 ${800 + (1 - t1) * 30})`} opacity={Math.min(1, t1 * 1.4)}>
          <Txt fontSize={70} w={800} fill={C.tinta} letterSpacing={-1}>Protege a quien</Txt>
        </g>
        <g transform={`translate(540 ${884 + (1 - t2) * 30})`} opacity={Math.min(1, t2 * 1.4)}>
          <Txt fontSize={70} w={800} fill={C.tinta} letterSpacing={-1}>repara la <tspan fill={C.verde}>red</tspan></Txt>
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 6 · batería: solo lo esencial
const BatteryScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const snap = sp(f, at('bateria'), 7, 230);
  const ess = [0, 3]; // solo algunas ventanas: lo esencial
  const wins = WINDOWS.map((_, i) => {
    const k = ess.indexOf(i);
    return k < 0 ? C.tinta : mixColor(C.tinta, C.sol, p(f, at('esencial') + k * 5, K.esencial + k * 5));
  });
  const glow = p(f, at('esencial'), K.esencial + 10);
  return (
    <>
      <NightSky L={L} />
      <Stage L={L}>
        <circle cx={880} cy={520} r={46} fill={C.crema} opacity={0.55} />
        <City lit={0} />
        <rect x={-3000} y={900} width={7080} height={3000} fill="#16241B" />
        <Pole x={140} light={0} />
        {ess.map((i, k) => {
          const [wx, wy] = WINDOWS[i];
          return <circle key={i} cx={480 + (wx + 40) * 0.8} cy={900 + (wy + 40) * 0.8} r={90} fill={C.sol} opacity={0.16 * p(f, at('esencial') + k * 5, K.esencial + k * 5) * glow} />;
        })}
        <House x={480} y={900} scale={0.8} windowColors={wins} panels={() => ({dy: 0, o: 1})} bodyColor={C.verdeProfundo} roofColor={C.verde} />
        <line x1={712} y1={820} x2={lerp(1200, 760, snap)} y2={820} stroke={C.verdeClaro} strokeWidth={6} opacity={snap > 0.9 ? 1 : 0} />
        <g transform={`translate(${lerp(1300, 800, snap)} 900)`}>
          <rect x={-22} y={-224} width={44} height={16} rx={5} fill={C.crema} />
          <rect x={-62} y={-210} width={124} height={210} rx={18} fill={C.verdeProfundo} stroke={C.verdeClaro} strokeWidth={6} />
          <rect x={-50} y={-150} width={100} height={138} rx={10} fill={C.verdeClaro} />
          <polygon points="8,-136 -26,-76 -2,-76 -12,-30 26,-94 2,-94 12,-136" fill={C.sol} />
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 7 · ¿respaldo de verdad?
const BackupScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const a = sp(f, at('queres'), 13, 200), b = sp(f, at('respaldo'), 10, 220), c = sp(f, wf(51) - LEAD, 13, 200);
  const bat = p(f, at('queres'), K.respaldo + 30, EIO);
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.verdeProfundo} />
      <Stage L={L}>
        <g transform={`translate(540 ${300 - (1 - a) * 40})`} opacity={Math.min(1, a * 1.4)}>
          <rect x={-22} y={-110} width={44} height={16} rx={5} fill={C.crema} />
          <rect x={-60} y={-96} width={120} height={200} rx={18} fill="none" stroke={C.crema} strokeWidth={7} />
          <rect x={-48} y={92 - 176 * bat} width={96} height={176 * bat} rx={8} fill={C.verdeClaro} />
        </g>
        <g transform={`translate(540 ${540 + (1 - a) * 30})`} opacity={Math.min(1, a * 1.4)}>
          <Txt fontSize={104} w={800} fill={C.crema} letterSpacing={-2}>¿QUERÉS</Txt>
        </g>
        <g transform={`translate(540 ${650 + (1 - b) * 30})`} opacity={Math.min(1, b * 1.4)}>
          <Txt fontSize={104} w={800} fill={C.sol} letterSpacing={-2}>RESPALDO</Txt>
        </g>
        <g transform={`translate(540 ${760 + (1 - c) * 30})`} opacity={Math.min(1, c * 1.4)}>
          <Txt fontSize={104} w={800} fill={C.crema} letterSpacing={-2}>DE VERDAD?</Txt>
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 8 · cierre (últimos 2 s)
const CloseScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const a = sp(f, at('cierre'), 13, 200), b = sp(f, at('cierre') + 6, 13, 200);
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.verdeProfundo} />
      <Stage L={L}>
        <g transform={`translate(540 ${safeCY(L) - 200 + (1 - a) * 30})`} opacity={Math.min(1, a * 1.4)}>
          <Txt fontSize={76} w={800} fill={C.crema} letterSpacing={-1}>PREGUNTANOS POR</Txt>
        </g>
        <g transform={`translate(540 ${safeCY(L) - 115 + (1 - b) * 30})`} opacity={Math.min(1, b * 1.4)}>
          <Txt fontSize={76} w={800} fill={C.crema} letterSpacing={-1}>LA <tspan fill={C.sol}>BATERÍA</tspan></Txt>
        </g>
      </Stage>
    </>
  );
};

const SCENES: [string | null, React.FC<{f: number; L: Layout}>][] = [
  [null, NightScene], ['dato', DatoScene], ['seguridad', SafetyScene], ['bateria', BatteryScene],
  ['queres', BackupScene], ['cierre', CloseScene],
];
const startOf = (id: string | null) => (id === null ? 0 : at(id));
export const SCENE_STARTS = SCENES.map(([id]) => ({id: id ?? 'mito', start: startOf(id)}));

export const V2: React.FC<{format: Format}> = ({format}) => {
  const f = useCurrentFrame();
  const L = useLayout(format);
  let idx = 0;
  SCENES.forEach(([id], i) => { if (f >= startOf(id)) idx = i; });
  const Scene = SCENES[idx][1];
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <svg width={L.W} height={L.H} viewBox={`0 0 ${L.W} ${L.H}`} style={{position: 'absolute'}}>
        <Scene f={f} L={L} />
      </svg>
      {f >= at('cierre') && <Logo L={L} f={f} start={at('cierre') + 3} dy={60} />}
      <Subtitles L={L} words={words} subs={subs} hidden={[[0, K.dato], [K.queres, 99999]]} />
      <Grain />
      <AudioTrack vo="audio/vo_02.wav" cues={cues} frames={K} />
    </AbsoluteFill>
  );
};
