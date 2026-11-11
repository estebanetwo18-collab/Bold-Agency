import React from 'react';
import {C} from './theme';
import {SolarPanel, lerp, poly, quadPt} from './lib';

// Casa minimalista en bloques. Origen = centro del suelo. Coordenadas del escenario 1080.
export const ROOF = [[-210, -480], [210, -480], [340, -300], [-340, -300]];
export const WINDOWS = [[-240, -260], [160, -260], [-240, -140], [160, -140]];

export const panelQuad = (i: number, roof = ROOF) => {
  const r = Math.floor(i / 4), c = i % 4;
  const u0 = 0.07 + c * 0.215 + 0.012, u1 = u0 + 0.215 - 0.024;
  const v0 = 0.12 + r * 0.39 + 0.03, v1 = v0 + 0.39 - 0.06;
  return [quadPt(roof, u0, v0), quadPt(roof, u1, v0), quadPt(roof, u1, v1), quadPt(roof, u0, v1)];
};

type Props = {
  x: number; y: number; scale?: number;
  roofColor?: string; bodyColor?: string;
  windowColors?: string[]; // por ventana
  panels?: (i: number) => {dy: number; o: number; glint?: number} | null;
  ghostPanels?: number; // 0..1 contornos punteados (potencial)
  bodyRise?: number; // 0..1
  roofQuad?: number[][]; // permite el morph del cono de luz al techo
};

export const House: React.FC<Props> = ({x, y, scale = 1, roofColor = C.verdeMedio, bodyColor = C.verdeProfundo,
  windowColors, panels, ghostPanels = 0, bodyRise = 1, roofQuad}) => {
  const roof = roofQuad ?? ROOF;
  const wc = windowColors ?? WINDOWS.map(() => C.crema);
  const bh = 300 * bodyRise;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={4} rx={360} ry={22} fill={C.tinta} opacity={0.18} />
      <g>
        <rect x={-290} y={-bh} width={580} height={bh} fill={bodyColor} />
        {bodyRise > 0.98 && (
          <>
            {WINDOWS.map(([wx, wy], i) => <rect key={i} x={wx} y={wy} width={80} height={80} rx={6} fill={wc[i]} />)}
            <rect x={-40} y={-150} width={80} height={150} rx={4} fill={C.tinta} />
          </>
        )}
      </g>
      <polygon points={poly(roof)} fill={roofColor} />
      {panels && Array.from({length: 8}, (_, i) => {
        const st = panels(i);
        if (!st || st.o <= 0) return null;
        const q = panelQuad(i).map(([a, b]) => [a, b + st.dy]);
        return <g key={i} opacity={st.o}><SolarPanel q={q} glint={st.glint ?? 0} /></g>;
      })}
      {ghostPanels > 0 && Array.from({length: 8}, (_, i) => {
        const o = Math.min(1, Math.max(0, ghostPanels * 8 - i));
        return <polygon key={i} points={poly(panelQuad(i))} fill="none" stroke={C.crema} strokeWidth={4} strokeDasharray="12 9" opacity={o} />;
      })}
    </g>
  );
};

export const lerpQuad = (a: number[][], b: number[][], t: number) => a.map((pt, i) => [lerp(pt[0], b[i][0], t), lerp(pt[1], b[i][1], t)]);
