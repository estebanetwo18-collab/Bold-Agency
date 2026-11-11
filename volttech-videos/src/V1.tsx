import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import words from '../data/vo_01_words.json';
import subs from '../data/vo_01_subs.json';
import cues from '../data/cues_01.json';
import {C, Format, LEAD} from './theme';
import {
  AudioTrack, EI, EIO, EO, Grain, Layout, Logo, Stage, Subtitles, Txt, arrive, lerp, mixColor, p, poly,
  resolveCues, safeCY, sp, useLayout,
} from './lib';
import {House, ROOF, lerpQuad, panelQuad} from './House';

export const K = resolveCues(words, cues);
// orden de escenas: cada una arranca LEAD cuadros antes de su palabra clave
const at = (id: string) => K[id] - LEAD;

// ------------------------------------------------------------------ 1-3 · lámpara → techo
const CONE = [[330, 520], [750, 520], [860, 900], [220, 900]];
const HOUSE_X = 540, HOUSE_Y = 860;
const ROOF_ABS = ROOF.map(([x, y]) => [x + HOUSE_X, y + HOUSE_Y]);

const Lamp: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const on = f < 3 ? 0 : f < 5 ? 1 : f < 7 ? 0.25 : 1; // flicker al encender
  const morph = p(f, K.paneles - 8, K.paneles, EIO);
  const fade = 1 - p(f, K.paneles - 8, K.paneles - 3);
  const cable = p(f, at('dedonde'), K.dedonde + 12, EIO);
  const q = sp(f, at('dedonde'), 11, 200);
  const cone = lerpQuad(CONE, ROOF_ABS, morph);
  const bg = mixColor(C.tinta, C.crema, morph);
  const pulse = 1 + 0.06 * Math.sin(f / 5);
  return (
    <>
      <rect width={L.W} height={L.H} fill={bg} />
      <Stage L={L}>
        <defs>
          <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.sol} stopOpacity={lerp(0.95, 1, morph)} />
            <stop offset="1" stopColor={C.sol} stopOpacity={lerp(0.18, 1, morph)} />
          </linearGradient>
        </defs>
        <ellipse cx={540} cy={900} rx={330 * pulse} ry={42} fill={C.sol} opacity={0.55 * on * fade} />
        <polygon points={poly(cone)} fill={morph > 0 ? mixColor(C.sol, C.verdeMedio, morph) : 'url(#cone)'} opacity={morph > 0 ? 1 : on} />
        <g opacity={fade}>
          <path d="M600 845 C 690 870, 720 790, 800 800 S 880 800, 900 770" fill="none" stroke={C.verdeClaro} strokeWidth={6}
            strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - cable} />
          <rect x={874} y={690} width={52} height={86} rx={10} fill="none" stroke={C.crema} strokeWidth={5} opacity={cable} />
          <rect x={892} y={760} width={16} height={22} fill={C.verdeClaro} opacity={cable} />
          <polygon points="440,300 640,300 750,520 330,520" fill={C.crema} />
          <rect x={530} y={520} width={20} height={300} fill={C.verdeMedio} />
          <rect x={455} y={818} width={170} height={36} rx={8} fill={C.verdeProfundo} />
          <g transform={`translate(540 ${170 + (1 - q) * -60})`} opacity={Math.min(1, q * 1.5)}>
            <Txt serif fontSize={128} fill={C.crema} y={0}>¿De dónde sale?</Txt>
          </g>
        </g>
      </Stage>
    </>
  );
};

const HouseScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const rise = p(f, K.paneles - 2, K.paneles + 9, EO);
  // zoom continuo al panel → celda
  const zp = p(f, at('cada'), K.fotovoltaicas - 6, Easing.bezier(0.3, 0, 0.2, 1));
  const z = Math.pow(16, zp);
  const target = panelQuad(5).reduce((a, b) => [a[0] + b[0] / 4, a[1] + b[1] / 4], [0, 0]);
  const tx = lerp(540, target[0] + HOUSE_X, Math.min(1, zp * 1.25));
  const ty = lerp(560, target[1] + HOUSE_Y, Math.min(1, zp * 1.25));
  const panels = (i: number) => {
    const s0 = at('techo') + 2 * i;
    if (f < s0) return null;
    const fall = p(f, s0, s0 + LEAD, EI);
    const bounce = f > s0 + LEAD ? Math.sin(p(f, s0 + LEAD, s0 + LEAD + 6) * Math.PI) * -10 : 0;
    return {dy: (1 - fall) * -360 + bounce, o: Math.min(1, fall * 3)};
  };
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.crema} />
      <Stage L={L}>
        <g transform={`translate(540 560) scale(${z}) translate(${-tx} ${-ty})`}>
          <rect x={-3000} y={HOUSE_Y} width={7080} height={3000} fill={C.verde} />
          <House x={HOUSE_X} y={HOUSE_Y} bodyRise={rise} panels={panels} />
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 4 · celda fotovoltaica
const Stripes: React.FC<{id: string; r: number; shift: number}> = ({id, r, shift}) => (
  <g clipPath={`url(#${id})`}>
    <rect x={-r} y={-r} width={2 * r} height={2 * r} fill={C.tinta} />
    {Array.from({length: 15}, (_, i) => {
      const x = -r + ((i * (2 * r)) / 14 + shift) % (2 * r);
      return <rect key={i} x={x} y={-r} width={i % 3 === 0 ? 14 : 7} height={2 * r} fill={`url(#${id}g)`} />;
    })}
    <rect x={-r} y={-r * 0.12} width={2 * r} height={6} fill={C.verdeClaro} opacity={0.5} />
  </g>
);

const Cell: React.FC<{cx: number; cy: number; r: number; m?: number; shift: number; id: string}> = ({cx, cy, r, m = 1, shift, id}) => {
  const rx = lerp(r * 0.08, r, m);
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <defs>
        <clipPath id={id}><rect x={-r} y={-r} width={2 * r} height={2 * r} rx={rx} /></clipPath>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.verdeClaro} />
          <stop offset="1" stopColor={C.verde} />
        </linearGradient>
      </defs>
      <rect x={-r + 16} y={-r - 8} width={2 * r} height={2 * r} rx={rx} fill="none" stroke={C.crema} strokeWidth={4} opacity={0.85 * m} />
      <Stripes id={id} r={r} shift={shift} />
    </g>
  );
};

const CellScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const m = p(f, at('fotovoltaicas') - 2, K.fotovoltaicas, EIO);
  const s = sp(f, at('fotovoltaicas'), 13, 180);
  const r = lerp(380, 250, m);
  const lab = arrive(f, K.fotovoltaicas + 8, 6);
  return (
    <>
      <defs>
        <linearGradient id="bgCell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.verdeProfundo} />
          <stop offset="1" stopColor={C.verdeMedio} />
        </linearGradient>
      </defs>
      <rect width={L.W} height={L.H} fill="url(#bgCell)" />
      <Stage L={L}>
        <ellipse cx={540} cy={850} rx={300 * s} ry={30} fill={C.tinta} opacity={0.4} />
        <ellipse cx={540} cy={850} rx={380 * s} ry={44} fill="none" stroke={C.verdeClaro} strokeWidth={3} opacity={0.6 * s} />
        <Cell cx={540} cy={500 - 20 * Math.sin(f / 14)} r={r} m={m} shift={(f - K.fotovoltaicas) * 0.8} id="c1" />
        <Txt fontSize={38} w={500} fill={C.crema} x={540} y={960 + (1 - lab) * 18} opacity={lab} letterSpacing={3}>CELDA FOTOVOLTAICA</Txt>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 5 · foto / voltaico
const SunOutline: React.FC<{c: string; k: number}> = ({c, k}) => (
  <g stroke={c} strokeWidth={6} fill="none" strokeLinecap="round">
    <circle r={72} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
    {Array.from({length: 12}, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <line key={i} x1={Math.cos(a) * 100} y1={Math.sin(a) * 100} x2={Math.cos(a) * (100 + 34 * k)} y2={Math.sin(a) * (100 + 34 * k)} opacity={k} />;
    })}
  </g>
);
const Bolt: React.FC<{c: string; k: number}> = ({c, k}) => (
  <polygon points="22,-120 -60,18 -4,18 -26,120 62,-24 6,-24 30,-120" fill="none" stroke={c} strokeWidth={6} strokeLinejoin="round"
    pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
);

const SplitScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const a = arrive(f, K.foto, LEAD, EIO);
  const b = arrive(f, K.voltaico, LEAD, EIO);
  const leftW = lerp(0, L.W, a) - (L.W / 2) * b;
  const rightX = lerp(L.W, L.W / 2, b);
  const cy = L.sy + 500 * L.s;
  const sa = sp(f, at('foto'), 12, 170), sb = sp(f, at('voltaico'), 12, 170);
  const l1 = arrive(f, K.luz, LEAD), l2 = arrive(f, K.electricidad, LEAD);
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.verdeClaro} />
      <rect width={leftW} height={L.H} fill={C.verdeClaro} />
      <g transform={`translate(${leftW / 2 + (L.W / 2) * b * 0} ${cy}) scale(${L.s * lerp(1, 0.82, b)})`}>
        <g transform="translate(0 -170)"><SunOutline c={C.tinta} k={sa} /></g>
        <Txt serif fontSize={190} fill={C.tinta} y={110} opacity={Math.min(1, sa * 1.4)}>foto</Txt>
        <Txt fontSize={42} w={700} fill={C.tinta} y={190} opacity={l1} letterSpacing={6}>LUZ</Txt>
      </g>
      <rect x={rightX} width={L.W - rightX + 2} height={L.H} fill={C.verdeProfundo} />
      <g transform={`translate(${rightX + L.W / 4} ${cy}) scale(${L.s * 0.82})`} opacity={b > 0 ? 1 : 0}>
        <g transform="translate(0 -170)"><Bolt c={C.crema} k={sb} /></g>
        <Txt serif fontSize={150} fill={C.crema} y={110} opacity={Math.min(1, sb * 1.4)}>voltaico</Txt>
        <Txt fontSize={42} w={700} fill={C.crema} y={190} opacity={l2} letterSpacing={6}>ELECTRICIDAD</Txt>
      </g>
    </>
  );
};

// ------------------------------------------------------------------ 6-8 · sol pega → electrones → corriente continua
const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const FlowScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const sun = sp(f, at('sol'), 12, 160);
  const rays = arrive(f, K.sol, LEAD);
  const el = sp(f, at('electrones'), 14, 200);
  const cc = sp(f, at('continua'), 16, 180);
  const house = sp(f, at('casa'), 12, 180);
  const R = lerp(230, 190, cc);
  const cx = lerp(560, 300, cc), cy = lerp(640, 540, cc);
  const lineEnd = lerp(cx + R, house > 0.01 ? 830 : 1010, cc);
  const N = 30;
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.crema} />
      <Stage L={L}>
        <ellipse cx={cx} cy={cy + R + 60} rx={R * 1.1} ry={22} fill={C.tinta} opacity={0.18} />
        <g opacity={1 - cc * 0.999}>
          <g transform={`translate(${lerp(-120, 230, sun)} ${lerp(-120, 200, sun)})`}>
            <circle r={88} fill={C.sol} />
          </g>
          {[0, 1, 2].map((i) => {
            const sx = 230 + 70 * Math.cos(0.5 + i * 0.32), sy = 200 + 70 * Math.sin(0.5 + i * 0.32);
            const ex = 470 + i * 70, ey = 450 + (2 - i) * 25;
            return <line key={i} x1={sx} y1={sy} x2={lerp(sx, ex, rays)} y2={lerp(sy, ey, rays)} stroke={C.sol} strokeWidth={9}
              strokeLinecap="round" strokeDasharray="34 18" strokeDashoffset={-f * 4} />;
          })}
        </g>
        <Cell cx={cx} cy={cy} r={R} shift={0} id="c2" />
        {/* electrones: van en una sola dirección y luego forman la línea de CC */}
        <defs><clipPath id="disk"><rect x={cx - R} y={cy - R} width={2 * R} height={2 * R} rx={R} /></clipPath></defs>
        <g>
          {Array.from({length: N}, (_, i) => {
            const yy = (rnd(i) * 2 - 1) * R * 0.8;
            const half = Math.sqrt(Math.max(1, R * R - yy * yy));
            const span = 2 * half;
            const t = (rnd(i + 50) * span + (f - K.electrones) * (6 + rnd(i + 9) * 3)) % span;
            const inX = cx - half + t;
            // en línea: viajan por y = cy hacia la derecha
            const lineSpan = lineEnd - cx;
            const lx = cx + ((rnd(i + 80) * lineSpan + (f - K.continua) * 9) % Math.max(1, lineSpan));
            const x = lerp(inX, lx, cc), y = lerp(cy + yy, cy, cc);
            return <circle key={i} cx={x} cy={y} r={7} fill={C.sol} opacity={el} clipPath={cc < 0.05 ? 'url(#disk)' : undefined} />;
          })}
        </g>
        <line x1={cx + R * 0.2} y1={cy} x2={lerp(cx + R * 0.2, lineEnd, cc)} y2={cy} stroke={C.sol} strokeWidth={8} strokeLinecap="round" opacity={cc} />
        <g opacity={cc} transform={`translate(${cx + R + 215} ${cy + 84 + (1 - cc) * 20})`}>
          <Txt fontSize={34} w={800} fill={C.tinta} x={0}>CC · corriente continua</Txt>
        </g>
        <g transform={`translate(910 ${cy + 40}) scale(${house})`} opacity={Math.min(1, house * 2)}>
          <polygon points="-80,0 80,0 80,-110 0,-180 -80,-110" fill="none" stroke={C.tinta} strokeWidth={7} strokeLinejoin="round" />
          <rect x={-20} y={-60} width={40} height={60} fill={C.tinta} />
          <g transform="translate(-118 -40)" stroke={C.verdeProfundo} strokeWidth={7} strokeLinecap="round">
            <line x1={-16} y1={-16} x2={16} y2={16} /><line x1={16} y1={-16} x2={-16} y2={16} />
          </g>
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 9-10 · inversor → electrodomésticos
const sinePath = (x0: number, x1: number, y: number, amp: number, ph: number) => {
  let d = `M${x0} ${y}`;
  for (let x = x0; x <= x1; x += 6) d += ` L${x} ${y + amp * Math.sin((x - x0) / 34 + ph)}`;
  return d;
};
const Icon: React.FC<{k: number; on: number}> = ({k, on}) => {
  const c = mixColor(C.crema, C.sol, on);
  const sw = {stroke: c, strokeWidth: 6, fill: on > 0.5 ? 'rgba(242,179,61,0.16)' : 'none', strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
  if (k === 0) return <g {...sw}><rect x={-46} y={-72} width={92} height={144} rx={10} /><line x1={-46} y1={-20} x2={46} y2={-20} /><line x1={-30} y1={-52} x2={-30} y2={-36} /><line x1={-30} y1={0} x2={-30} y2={26} /></g>;
  if (k === 1) return <g {...sw}><rect x={-72} y={-52} width={144} height={92} rx={8} /><line x1={0} y1={40} x2={0} y2={60} /><line x1={-34} y1={62} x2={34} y2={62} /></g>;
  if (k === 2) return <g {...sw}><polygon points="-34,-60 34,-60 56,-6 -56,-6" /><line x1={0} y1={-6} x2={0} y2={56} /><line x1={-28} y1={60} x2={28} y2={60} /></g>;
  return <g {...sw}><rect x={-60} y={-56} width={120} height={78} rx={6} /><polygon points="-76,30 76,30 88,48 -88,48" /></g>;
};

const InverterScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const push = sp(f, at('inversor'), 15, 190);
  const wave = p(f, at('inversor'), K.inversor + 18, EO);
  const e = sp(f, at('electrodomesticos'), 15, 170);
  const bx = lerp(540, 130, e), by = lerp(540, 300, e), bs = lerp(1, 0.55, e);
  const sx0 = bx + 120 * bs, sx1 = lerp(1080, 1040, e);
  const front = lerp(sx0, sx1 + 60, p(f, at('electrodomesticos'), K.electrodomesticos + 26, EIO));
  const curEnd = e > 0 ? lerp(lerp(sx0, sx1, wave), front, Math.min(1, e * 3)) : lerp(sx0, sx1, wave);
  const XS = [310, 510, 710, 910];
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.tinta} />
      <Stage L={L}>
        <g transform={`translate(${(1 - push) * 900} 0)`}>
          <line x1={-200} y1={by} x2={bx - 120 * bs} y2={by} stroke={C.sol} strokeWidth={8} strokeLinecap="round" />
          <path d={sinePath(sx0, Math.max(sx0, curEnd), by, 34 * lerp(1, 0.8, e), -f * 0.35)} fill="none" stroke={C.sol} strokeWidth={8} strokeLinecap="round" />
          <g transform={`translate(${bx} ${by}) scale(${bs})`}>
            <rect x={-120} y={-150} width={240} height={300} rx={26} fill={C.verdeProfundo} stroke={C.verdeClaro} strokeWidth={5} />
            <line x1={-60} y1={-50} x2={-10} y2={-50} stroke={C.crema} strokeWidth={6} strokeLinecap="round" />
            <path d={sinePath(10, 64, 50, 14, 0)} fill="none" stroke={C.crema} strokeWidth={6} strokeLinecap="round" />
            <line x1={-60} y1={60} x2={60} y2={-60} stroke={C.verdeClaro} strokeWidth={4} />
          </g>
          <g opacity={1 - e}>
            <Txt fontSize={44} w={800} fill={C.crema} x={220} y={by - 60}>CC</Txt>
            <Txt fontSize={44} w={800} fill={C.sol} x={870} y={by - 80} opacity={wave}>CA</Txt>
            <Txt serif fontSize={96} fill={C.crema} x={540} y={by + 290}>inversor</Txt>
          </g>
          {e > 0 && XS.map((x, i) => {
            const on = p(f, 0, 1) * (front > x ? p(front, x, x + 40) : 0);
            const y0 = by + 30;
            return (
              <g key={i} opacity={Math.min(1, e * 2)}>
                <line x1={x} y1={y0} x2={x} y2={lerp(y0, 560, Math.min(1, e * 1.3))} stroke={mixColor(C.verdeMedio, C.sol, on)} strokeWidth={5} strokeDasharray="10 10" />
                <g transform={`translate(${x} ${lerp(760, 680, e)})`}>
                  <circle r={120} fill={C.sol} opacity={0.12 * on} />
                  <Icon k={i} on={on} />
                </g>
              </g>
            );
          })}
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 11 · baterías
const BatteryScene: React.FC<{f: number; L: Layout}> = ({f, L}) => (
  <>
    <rect width={L.W} height={L.H} fill={C.verdeProfundo} />
    <Stage L={L}>
      <ellipse cx={540} cy={720} rx={430} ry={30} fill={C.tinta} opacity={0.35} />
      {[0, 1, 2, 3].map((i) => {
        const s = sp(f, at('guardarse') + 2 * i, 13, 190);
        const fill = p(f, at('bateria') + i * 4, K.bateria + 22 + i * 4, EO);
        const x = 540 + (i - 1.5) * 210;
        return (
          <g key={i} transform={`translate(${x} ${lerp(1100, 560, s)})`}>
            <defs><clipPath id={`b${i}`}><rect x={-64} y={-124} width={128} height={244} rx={14} /></clipPath></defs>
            <rect x={-24} y={-150} width={48} height={20} rx={5} fill={C.crema} />
            <rect x={-70} y={-130} width={140} height={256} rx={20} fill={C.tinta} stroke={C.crema} strokeWidth={6} />
            <rect x={-64} y={120 - 244 * fill} width={128} height={244} fill={C.verdeClaro} clipPath={`url(#b${i})`} />
            <polygon points="8,-50 -26,10 -2,10 -12,54 26,-8 2,-8 12,-50" fill={C.sol} opacity={p(fill, 0.85, 1)} />
          </g>
        );
      })}
    </Stage>
  </>
);

// ------------------------------------------------------------------ 12 · red
const GridScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const s = sp(f, at('salir'), 13, 180);
  const arrow = p(f, at('salir'), K.red, EIO);
  const pulse = ((f - at('red')) / 22) % 1;
  const path = 'M330 600 C 420 380, 640 330, 800 470';
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.crema} />
      <Stage L={L}>
        <rect x={-3000} y={760} width={7080} height={3000} fill={C.verde} />
        <g transform={`translate(0 ${(1 - s) * 400})`}>
          <House x={260} y={760} scale={0.42} panels={() => ({dy: 0, o: 1})} />
        </g>
        <g transform={`translate(0 ${(1 - sp(f, at('salir') + 3, 13, 180)) * 500})`}>
          <polygon points="800,760 880,760 852,380 828,380" fill={C.tinta} />
          {[420, 480].map((y, i) => <line key={i} x1={760} y1={y} x2={920} y2={y} stroke={C.tinta} strokeWidth={10} strokeLinecap="round" />)}
          {[0, 1].map((i) => <path key={i} d={`M920 ${420 + i * 60} Q 1010 ${470 + i * 60}, 1120 ${430 + i * 60}`} fill="none" stroke={C.tinta} strokeWidth={3} />)}
        </g>
        <path d={path} fill="none" stroke={C.sol} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - arrow} />
        {arrow > 0.98 && <polygon points="0,-18 34,0 0,18" fill={C.sol} transform="translate(800 470) rotate(38)" />}
        {f >= at('red') && <path d={path} fill="none" stroke={C.crema} strokeWidth={14} strokeLinecap="round" pathLength={1}
          strokeDasharray="0.08 0.92" strokeDashoffset={-pulse} opacity={0.9} />}
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 13 · de día
const DayScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const k = p(f, at('dedia'), K.dependes, EIO);
  const a = lerp(Math.PI * 0.95, Math.PI * 0.32, k);
  const sx = 540 + 470 * Math.cos(a), sy = 640 - 470 * Math.sin(a);
  const sky = mixColor(C.crema, C.verdeClaro, p(f, at('dedia'), K.dedia + 40, EIO));
  const prod = p(f, at('produce'), K.produce + 6);
  const enter = sp(f, at('dedia'), 14, 170);
  return (
    <>
      <rect width={L.W} height={L.H} fill={sky} />
      <Stage L={L}>
        <path d={`M ${540 - 470} 640 A 470 470 0 0 1 ${540 + 470} 640`} fill="none" stroke={C.crema} strokeWidth={3} strokeDasharray="6 14" opacity={0.7} />
        <circle cx={sx} cy={sy} r={78 * enter} fill={C.sol} />
        <rect x={-3000} y={900} width={7080} height={3000} fill={C.verde} />
        <House x={540} y={900} scale={0.9} panels={(i) => ({dy: 0, o: 1, glint: prod * (0.5 + 0.5 * Math.sin(f / 4 + i))})} />
        {prod > 0 && Array.from({length: 10}, (_, i) => {
          const t = ((f - K.produce) / 30 + rnd(i)) % 1;
          return <circle key={i} cx={360 + rnd(i + 3) * 360} cy={500 - t * 220} r={6} fill={C.sol} opacity={prod * (1 - t)} />;
        })}
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 14 · tarifa (sin cifras)
const Bill: React.FC<{dim?: number}> = ({dim = 0}) => {
  let zig = 'M-210 240';
  for (let i = 0; i <= 14; i++) zig += ` L${-210 + i * 30} ${i % 2 ? 262 : 240}`;
  return (
    <g>
      <path d={`M-210 -300 L210 -300 L210 240 ${zig.replace('M-210 240', '')} L-210 240 Z`} fill={mixColor(C.crema, C.verdeMedio, dim * 0.45)} />
      <circle cx={-150} cy={-240} r={26} fill={C.verdeProfundo} />
      <polygon points="-146,-258 -162,-236 -150,-236 -154,-220 -138,-244 -150,-244" fill={C.crema} />
      <rect x={-104} y={-252} width={180} height={22} rx={6} fill={C.tinta} opacity={0.75} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-160} y={-160 + i * 52} width={i % 2 ? 210 : 290} height={14} rx={7} fill={C.tinta} opacity={0.22} />)}
      <rect x={-160} y={150} width={320} height={46} rx={10} fill={C.tinta} opacity={0.12} />
    </g>
  );
};

const BillScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const e = sp(f, at('dependes'), 13, 170);
  const away = sp(f, at('tarifa'), 18, 140);
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.verdeMedio} />
      <Stage L={L}>
        <ellipse cx={540} cy={lerp(900, 800, away)} rx={lerp(260, 140, away)} ry={24} fill={C.tinta} opacity={0.25} />
        <g transform={`translate(540 ${lerp(1300, 520, e) - 40 * away}) rotate(${lerp(-12, -4, e) + 4 * away}) scale(${lerp(1, 0.55, away)})`} opacity={lerp(1, 0.5, away)}>
          <Bill dim={away} />
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ ¿el tuyo?
const YoursScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const e = sp(f, at('queres'), 14, 170);
  const g = p(f, at('queres') + 4, K.queres + 30, EIO);
  const t = sp(f, at('tuyo'), 11, 200);
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.verdeProfundo} />
      <Stage L={L}>
        <rect x={-3000} y={900} width={7080} height={3000} fill={C.verde} />
        <g transform={`translate(0 ${(1 - e) * 500})`}>
          <House x={540} y={900} scale={0.95} roofColor={C.verdeMedio} bodyColor={C.tinta} ghostPanels={g} />
        </g>
        <g transform={`translate(540 ${200 - (1 - t) * 50})`} opacity={Math.min(1, t * 1.5)}>
          <Txt serif fontSize={140} fill={C.crema}>¿Y el <tspan fill={C.sol} fontStyle="italic">tuyo</tspan>?</Txt>
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ 15 · escribinos con tu factura
const ChatScene: React.FC<{f: number; L: Layout}> = ({f, L}) => {
  const b = sp(f, at('escribinos'), 13, 180);
  const c = sp(f, at('escribinos') + 4, 11, 200);
  const t1 = sp(f, at('escribinos'), 14, 200);
  const t2 = sp(f, K.escribinos + 14, 14, 200);
  return (
    <>
      <rect width={L.W} height={L.H} fill={C.verdeProfundo} />
      <Stage L={L}>
        {/* bloque centrado en la zona segura (su centro original estaba en x 582, y 567) */}
        <g transform={`translate(-42 ${safeCY(L) - 567})`}>
        <g transform={`translate(${lerp(-300, 360, b)} 400) rotate(-9) scale(0.6)`}><Bill /></g>
        <g transform={`translate(720 ${lerp(600, 330, c)}) scale(${c})`}>
          <path d="M-170 -110 H170 a40 40 0 0 1 40 40 V70 a40 40 0 0 1 -40 40 H-60 L-120 160 L-110 110 H-170 a40 40 0 0 1 -40 -40 V-70 a40 40 0 0 1 40 -40 Z" fill={C.verdeClaro} />
          {[0, 1, 2].map((i) => <circle key={i} cx={-70 + i * 70} cy={0 - 10 * Math.max(0, Math.sin(f / 4 - i * 0.9))} r={18} fill={C.tinta} />)}
        </g>
        <g opacity={Math.min(1, t1 * 1.4)} transform={`translate(582 ${800 + (1 - t1) * 40})`}>
          <Txt fontSize={86} w={800} fill={C.crema} letterSpacing={-1}>ESCRIBINOS CON</Txt>
        </g>
        <g opacity={Math.min(1, t2 * 1.4)} transform={`translate(582 ${905 + (1 - t2) * 40})`}>
          <Txt fontSize={86} w={800} fill={C.crema} letterSpacing={-1}>TU <tspan fill={C.sol}>FACTURA</tspan></Txt>
        </g>
        </g>
      </Stage>
    </>
  );
};

// ------------------------------------------------------------------ composición
const SCENES: [string | null, React.FC<{f: number; L: Layout}>][] = [
  [null, Lamp], ['paneles', HouseScene], ['fotovoltaicas', CellScene], ['foto', SplitScene], ['sol', FlowScene],
  ['inversor', InverterScene], ['guardarse', BatteryScene], ['salir', GridScene], ['dedia', DayScene],
  ['dependes', BillScene], ['queres', YoursScene], ['escribinos', ChatScene], ['volttech', () => null],
];
// la lámpara se transforma en el techo: el cambio de escena ocurre al terminar el morph
const startOf = (id: string | null) => (id === null ? 0 : id === 'paneles' ? K.paneles : id === 'fotovoltaicas' ? at('fotovoltaicas') - 2 : at(id));
export const SCENE_STARTS = SCENES.map(([id]) => ({id: id ?? 'encendes', start: startOf(id)}));

export const V1: React.FC<{format: Format}> = ({format}) => {
  const f = useCurrentFrame();
  const L = useLayout(format);
  let idx = 0;
  SCENES.forEach(([id], i) => { if (f >= startOf(id)) idx = i; });
  const Scene = SCENES[idx][1];
  const closing = f >= at('volttech');
  return (
    <AbsoluteFill style={{background: C.tinta}}>
      <svg width={L.W} height={L.H} viewBox={`0 0 ${L.W} ${L.H}`} style={{position: 'absolute'}}>
        {closing ? <rect width={L.W} height={L.H} fill={C.verdeProfundo} /> : <Scene f={f} L={L} />}
      </svg>
      {closing && <Logo L={L} f={f} start={at('volttech')} />}
      <Subtitles L={L} words={words} subs={subs} hidden={[[at('escribinos'), 99999]]} />
      <Grain />
      <AudioTrack vo="audio/vo_01.wav" cues={cues} frames={K} />
    </AbsoluteFill>
  );
};
