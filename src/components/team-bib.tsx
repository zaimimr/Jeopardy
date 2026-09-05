import type { BibColor } from "@/lib/types";

export const bibVar: Record<BibColor, string> = {
  yellow: "var(--bib-yellow)",
  green: "var(--bib-green)",
  red: "var(--bib-red)",
  blue: "var(--bib-blue)",
  white: "var(--bib-white)",
  purple: "var(--bib-purple)",
};

export const bibLabel: Record<BibColor, string> = {
  yellow: "Gul",
  green: "Grønn",
  red: "Rød",
  blue: "Blå",
  white: "Hvit",
  purple: "Lilla",
};

export function BibDot({ color, size = 14, className = "" }: { color: BibColor; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.75), ${bibVar[color]} 55%, rgba(0,0,0,0.35))`,
        boxShadow: `0 0 ${size}px ${bibVar[color]}66`,
      }}
    />
  );
}
