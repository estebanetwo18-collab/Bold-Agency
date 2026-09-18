"use client";

import { useRef, useSyncExternalStore } from "react";

type Remaining = { days: number; hours: number; minutes: number } | null;

function getRemaining(endsAt: string): Remaining {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

function sameRemaining(a: Remaining, b: Remaining) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  return a.days === b.days && a.hours === b.hours && a.minutes === b.minutes;
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

/**
 * Vía useSyncExternalStore (mismo patrón que usePrefersReducedMotion en
 * lib/motion.ts) para no disparar setState dentro de un efecto. Ojo:
 * getRemaining() siempre devuelve un objeto nuevo (viene de Date.now()),
 * así que el snapshot se cachea en un ref y solo se reemplaza cuando
 * cambian días/horas/minutos — devolver una referencia nueva en cada
 * llamada hace que React entre en loop infinito de renders.
 */
export function PromoCountdown({
  endsAt,
  prefix,
  dayLabel,
  hourLabel,
  minuteLabel,
  expiredLabel,
  className,
}: {
  endsAt: string;
  prefix: string;
  dayLabel: string;
  hourLabel: string;
  minuteLabel: string;
  expiredLabel: string;
  className?: string;
}) {
  const cacheRef = useRef<{ value: Remaining } | null>(null);

  function getSnapshot(): Remaining {
    const next = getRemaining(endsAt);
    if (cacheRef.current && sameRemaining(cacheRef.current.value, next)) {
      return cacheRef.current.value;
    }
    cacheRef.current = { value: next };
    return next;
  }

  const remaining = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  if (!remaining) {
    return <span className={className}>{expiredLabel}</span>;
  }

  return (
    <span className={className}>
      {prefix} {remaining.days}
      {dayLabel} {remaining.hours}
      {hourLabel} {remaining.minutes}
      {minuteLabel}
    </span>
  );
}
