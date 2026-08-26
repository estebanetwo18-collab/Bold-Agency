"use client";

import { useSyncExternalStore } from "react";

function subscribeToMediaQuery(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    subscribeToMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Detecta prefers-reduced-motion (y cambios en vivo) vía
 * useSyncExternalStore, para no disparar setState dentro de un efecto.
 * Todo componente de movimiento en el sitio debe consultarlo y
 * ofrecer una versión estática equivalente cuando sea true.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** true solo en dispositivos con puntero fino (mouse), nunca en touch. */
export function useHasFinePointer() {
  return useMediaQuery("(pointer: fine)");
}

export const easeBold = [0.16, 1, 0.3, 1] as const;
export const easeSnap = [0.65, 0, 0.35, 1] as const;
