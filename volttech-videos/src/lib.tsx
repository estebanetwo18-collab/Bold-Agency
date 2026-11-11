import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, Sequence, continueRender, delayRender, interpolate,
  spring, staticFile, useCurrentFrame,
} from 'remotion';
import {C, FONTS, FORMATS, FPS, Format, GRAIN_OPACITY, LEAD, SUB_ZONE} from './theme';

export type Word = {word: string; start: number; end: number};
export type CueDef = {id: string; word: string; occ?: number; sfx?: string};
export type Sub = {start: number; end: number; words: number[]};

// ---------------------------------------------------------------- tiempos
export const norm = (w: string) =>
  w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');

/** Cuadro de la pose principal de cada cue (= inicio de su palabra clave). */
export const resolveCues = (words: Word[], cues: CueDef[]) => {
  const out: Record<string, number> = {};
  for (const c of cues) {
    let seen = 0;
    const w = words.find((x) => norm(x.word) === norm(c.word) && ++seen === (c.occ ?? 1));
    if (!w) throw new Error(`Cue sin palabra: ${c.id} (${c.word})`);
    out[c.id] = Math.round(w.start * FPS);
  }
  return out;
};

export const EO = Easing.bezier(0.22, 1, 0.36, 1); // salida suave (expo)
export const EIO = Easing.bezier(0.65, 0, 0.35, 1); // entrada-salida
export const EI = Easing.bezier(0.55, 0, 1, 0.45);

/** 0→1 entre dos cuadros con easing (sin linealidad). */
export const p = (f: number, a: number, b: number, ease = EO) =>
  interpolate(f, [a, b], [0, 1], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
/** Llega a la pose exactamente en `pose`, empezando LEAD cuadros antes. */
export const arrive = (f: number, pose: number, len = LEAD, ease = EO) => p(f, pose - len, pose, ease);
export const sp = (f: number, start: number, damping = 12, stiffness = 170) =>
  spring({frame: f - start, fps: FPS, config: {damping, stiffness, mass: 0.8}});
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const mixColor = (a: string, b: string, t: number) => {
  const h = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [x, y] = [h(a), h(b)];
  return '#' + x.map((v, i) => Math.round(lerp(v, y[i], Math.min(1, Math.max(0, t)))).toString(16).padStart(2, '0')).join('');
};

// ---------------------------------------------------------------- layout
export const useLayout = (format: Format) => {
  const F = FORMATS[format];
  const avail = F.H - F.top - F.bottom - SUB_ZONE;
  const s = Math.min(1, avail / 1080);
  const size = 1080 * s;
  return {
    ...F, s, size,
    sx: (F.W - size) / 2,
    sy: F.top + (avail - size) / 2,
    subY: F.H - F.bottom - SUB_ZONE / 2, // centro vertical del bloque de subtítulo
  };
};
export type Layout = ReturnType<typeof useLayout>;

/** Grupo con el escenario de 1080×1080 escalado dentro de la zona segura. */
export const Stage: React.FC<{L: Layout; children: React.ReactNode}> = ({L, children}) => (
  <g transform={`translate(${L.sx} ${L.sy}) scale(${L.s})`}>{children}</g>
);

// ---------------------------------------------------------------- tipografías
export const FontLoader: React.FC = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(
      FONTS.files.map((f) =>
        new FontFace(f.family, `url(${staticFile(f.file)})`, {weight: f.weight, style: f.style}).load().then((ff) => {
          document.fonts.add(ff);
        }),
      ),
    ).then(() => continueRender(handle));
  }, [handle]);
  return null;
};

// ---------------------------------------------------------------- grano
export const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: GRAIN_OPACITY, pointerEvents: 'none'}}>
      <Img src={staticFile(`grain/g${f % 8}.png`)} style={{width: '100%', height: '100%', imageRendering: 'pixelated'}} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- subtítulos
export const Subtitles: React.FC<{L: Layout; words: Word[]; subs: Sub[]; hidden?: [number, number][]}> = ({L, words, subs, hidden = []}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (hidden.some(([a, b]) => f >= a && f < b)) return null;
  const b = subs.find((s) => t >= s.start - 2 / FPS && t < s.end);
  if (!b) return null;
  const k = subs.indexOf(b);
  const inP = p(f, Math.round(b.start * FPS) - 3, Math.round(b.start * FPS) + 2);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: L.subY, transform: `translateY(-50%) translateY(${(1 - inP) * 14}px)`, display: 'flex', justifyContent: 'center', opacity: inP}}>
      <div key={k} style={{
        maxWidth: L.W - 160, padding: '16px 30px', borderRadius: 22, background: 'rgba(14,26,18,0.86)',
        fontFamily: FONTS.sans, fontWeight: 800, fontSize: 52, lineHeight: 1.18, letterSpacing: -0.5,
        color: C.crema, textAlign: 'center',
      }}>
        {b.words.map((i, j) => {
          const w = words[i];
          const next = words[i + 1];
          const active = t >= w.start - 1 / FPS && t < (next && b.words.includes(i + 1) ? next.start : b.end);
          return (
            <span key={i} style={{color: active ? C.sol : C.crema}}>
              {w.word}{j < b.words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- audio
export const AudioTrack: React.FC<{vo: string; cues: CueDef[]; frames: Record<string, number>}> = ({vo, cues, frames}) => (
  <>
    <Audio src={staticFile(vo)} />
    {cues.filter((c) => c.sfx).map((c) => (
      <Sequence key={c.id} from={Math.max(0, frames[c.id] - LEAD)} durationInFrames={40}>
        <Audio src={staticFile(`sfx/${c.sfx}.wav`)} volume={0.22} />
      </Sequence>
    ))}
  </>
);

// ---------------------------------------------------------------- piezas comunes
export const Txt: React.FC<React.SVGProps<SVGTextElement> & {serif?: boolean; w?: number}> = ({serif, w = 700, children, ...r}) => (
  <text fontFamily={serif ? FONTS.serif : FONTS.sans} fontWeight={serif ? 400 : w} textAnchor="middle" {...r}>{children}</text>
);

/** Panel solar en un cuadrilátero (bilineal), con rejilla de celdas. */
export const quadPt = (q: number[][], u: number, v: number) => {
  const top = [lerp(q[0][0], q[1][0], u), lerp(q[0][1], q[1][1], u)];
  const bot = [lerp(q[3][0], q[2][0], u), lerp(q[3][1], q[2][1], u)];
  return [lerp(top[0], bot[0], v), lerp(top[1], bot[1], v)];
};
export const poly = (pts: number[][]) => pts.map((x) => x.join(',')).join(' ');
export const SolarPanel: React.FC<{q: number[][]; cols?: number; rows?: number; glint?: number}> = ({q, cols = 4, rows = 3, glint = 0}) => {
  const lines = [];
  for (let i = 1; i < cols; i++) lines.push([quadPt(q, i / cols, 0), quadPt(q, i / cols, 1)]);
  for (let j = 1; j < rows; j++) lines.push([quadPt(q, 0, j / rows), quadPt(q, 1, j / rows)]);
  return (
    <g>
      <polygon points={poly(q)} fill={C.tinta} stroke={C.verdeClaro} strokeWidth={2.5} strokeLinejoin="round" />
      {lines.map((l, i) => <line key={i} x1={l[0][0]} y1={l[0][1]} x2={l[1][0]} y2={l[1][1]} stroke={C.verdeMedio} strokeWidth={1.4} opacity={0.8} />)}
      {glint > 0 && <polygon points={poly(q)} fill={C.crema} opacity={glint * 0.35} />}
    </g>
  );
};

/** Centro vertical de la zona segura completa (cuadro), y su equivalente en coordenadas del escenario. */
export const safeCenter = (L: Layout) => (L.top + L.H - L.bottom) / 2;
export const safeCY = (L: Layout) => (safeCenter(L) - L.sy) / L.s;

/** Logo + @handle. `dy`: desplazamiento del centro del logo respecto del centro de la zona segura (px del escenario). */
export const Logo: React.FC<{L: Layout; f: number; start: number; dy?: number}> = ({L, f, start, dy = -50}) => {
  const a = sp(f, start, 14, 120);
  const h = p(f, start + 6, start + 16);
  const cy = safeCenter(L) + dy * L.s;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: cy, transform: `translateY(-50%) scale(${0.85 + 0.15 * a})`, opacity: Math.min(1, a * 1.4), display: 'flex', justifyContent: 'center'}}>
        <Img src={staticFile('logo_volttech.png')} style={{width: 760 * L.s}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: cy + 140 * L.s, textAlign: 'center', fontFamily: FONTS.sans, fontWeight: 700, fontSize: 46, letterSpacing: 1, color: C.crema, opacity: h, transform: `translateY(${(1 - h) * 16}px)`}}>
        {'@volttech.cr'}
      </div>
    </AbsoluteFill>
  );
};
