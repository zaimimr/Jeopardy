import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "brass" | "outline" | "ghost" | "velvet";

const variants: Record<ButtonVariant, string> = {
  brass: "brass-plate font-semibold hover:brightness-110 active:translate-y-px disabled:opacity-50 disabled:hover:brightness-100",
  outline:
    "brass-rim bg-stage-floor/60 text-cream hover:bg-stage-floor active:translate-y-px disabled:opacity-40",
  ghost: "text-cream-dim hover:text-cream hover:bg-white/5 disabled:opacity-40",
  velvet: "velvet text-cream font-semibold hover:brightness-110 active:translate-y-px disabled:opacity-40",
};

const base =
  "tap inline-flex items-center justify-center gap-2 rounded-md px-5 text-[17px] leading-none tracking-wide transition-[transform,filter,background-color,color] duration-200";

export function Button({
  variant = "brass",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button type="button" {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function LinkButton({
  variant = "brass",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm uppercase tracking-[0.18em] text-brass">{label}</span>
      {children}
      {hint ? <span className="text-sm text-cream-dim">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md brass-rim bg-stage-deep/70 px-4 py-3 text-[17px] text-cream placeholder:text-cream-faint focus:bg-stage-deep";

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} className={`${inputClass} min-h-24 resize-y leading-snug ${props.className ?? ""}`} />;
}

export function Plate({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`brass-plate rounded-sm px-4 py-2 font-display text-lg font-semibold tracking-wide ${className}`}>
      {children}
    </div>
  );
}

export function Marquee({ title, subtitle }: { title: string; subtitle?: string | null }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-display text-balance text-4xl font-medium leading-[1.02] tracking-tight text-cream md:text-6xl">
        {title}
      </h1>
      {subtitle ? <p className="font-display text-xl italic text-brass-light md:text-2xl">{subtitle}</p> : null}
    </div>
  );
}
