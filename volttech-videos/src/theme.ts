// ÚNICO archivo de tema: colores, tipografías y ajustes globales de ambos videos.
export const C = {
  verdeProfundo: '#14532D',
  verde: '#1E7A3C',
  verdeMedio: '#2E9E4F',
  verdeClaro: '#4FCB77',
  tinta: '#0E1A12',
  crema: '#F4F1E8',
  sol: '#F2B33D', // [VALIDAR con la marca] solo sol, luz y energía activa
  noche: '#2B3830', // cielo de apagón (verde grisáceo desaturado)
  nocheAlto: '#1C2620',
};

export const FONTS = {
  serif: 'Instrument Serif',
  sans: 'Inter',
  files: [
    {family: 'Instrument Serif', file: 'fonts/InstrumentSerif-Regular.woff2', weight: '400', style: 'normal'},
    {family: 'Instrument Serif', file: 'fonts/InstrumentSerif-Italic.woff2', weight: '400', style: 'italic'},
    {family: 'Inter', file: 'fonts/Inter-Medium.woff2', weight: '500', style: 'normal'},
    {family: 'Inter', file: 'fonts/Inter-Bold.woff2', weight: '700', style: 'normal'},
    {family: 'Inter', file: 'fonts/Inter-ExtraBold.woff2', weight: '800', style: 'normal'},
  ],
};

export const FPS = 30;
export const LEAD = 4; // cuadros de anticipación antes de la palabra clave
export const TAIL_S = 0.5; // cola después del audio
export const GRAIN_OPACITY = 0.07;
export const HANDLE = '@volttech.cr';

// Zonas seguras por formato (px). 9:16 deja libre la interfaz de Reels/Stories.
export const FORMATS = {
  '9x16': {W: 1080, H: 1920, top: 250, bottom: 340},
  '4x5': {W: 1080, H: 1350, top: 60, bottom: 60},
} as const;
export type Format = keyof typeof FORMATS;
export const SUB_ZONE = 210; // alto reservado para subtítulos dentro de la zona segura
