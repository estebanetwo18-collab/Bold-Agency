"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Variant = "volt" | "ink" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  volt: "bg-volt text-ink hover:bg-ink hover:text-paper",
  ink: "bg-ink text-paper hover:bg-volt hover:text-ink",
  ghost: "bg-transparent text-inherit border border-current",
};

export function MagneticButton({
  href,
  onClick,
  type = "button",
  variant = "volt",
  children,
  className,
  strength = 18,
}: {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setOffset({
      x: (relX / rect.width) * strength,
      y: (relY / rect.height) * strength,
    });
  }

  function handleLeave() {
    setOffset({ x: 0, y: 0 });
    setPressed(false);
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      animate={{ x: offset.x, y: offset.y, scale: pressed ? 0.96 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className="inline-block"
    >
      <span
        className={cn(
          "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide transition-colors duration-300",
          VARIANT_CLASSES[variant],
          className,
        )}
      >
        {children}
        <ArrowIcon />
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
      aria-hidden="true"
    >
      <path
        d="M4 12L12 4M12 4H5M12 4V11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
