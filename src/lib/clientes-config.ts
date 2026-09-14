// Fuente única de verdad para el marquee infinito "Clientes y partners" (§3c).
// Más amplia que portfolio-config: incluye toda marca/cliente con la que ha
// trabajado BOLD, no solo los 8 casos con detalle en profundidad.
// Si no hay logo real disponible, `logo` queda null y el componente debe
// renderizar el nombre en tipografía de marca — nunca dejar un hueco vacío.

export type ClienteItem = {
  nombre: string;
  logo: string | null;
};

export const clientesConfig: ClienteItem[] = [
  { nombre: "Toyota", logo: null },
  { nombre: "Ford", logo: null },
  { nombre: "Lexus", logo: null },
  { nombre: "Swarovski", logo: null },
  { nombre: "Grupo Purdy", logo: null },
  { nombre: "Euromobilia", logo: null },
  { nombre: "Nouvell", logo: null },
  { nombre: "RentCars", logo: null },
  { nombre: "Cushman & Wakefield", logo: null },
  { nombre: "Daoro", logo: null },
  { nombre: "Ingo", logo: null },
  { nombre: "Volt Tech", logo: null },
];
