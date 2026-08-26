import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Monogram } from "@/components/ui/Monogram";

/**
 * Panel fotográfico de marca: foto real en blanco y negro, con degradado
 * Ink opcional para legibilidad y una marca de agua del monograma. Usado
 * como banda ancha entre secciones o como imagen destacada del hero.
 */
export function PhotoPanel({
  src,
  alt,
  className,
  imgClassName,
  overlay = false,
  mark = false,
  priority = false,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  overlay?: boolean;
  mark?: boolean;
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.75rem] bg-surface", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn("object-cover", imgClassName)}
      />
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      ) : null}
      {mark ? (
        <Monogram
          size={120}
          state="active"
          className="pointer-events-none absolute right-[6%] top-[8%] opacity-55"
        />
      ) : null}
      {children}
    </div>
  );
}
