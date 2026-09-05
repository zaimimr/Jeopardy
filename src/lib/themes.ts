import type { CSSProperties } from "react";

export const THEME_IDS = ["midnatt", "skifer", "burgunder", "skog", "lys", "monokrom", "studio"] as const;
export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME: ThemeId = "midnatt";

type ThemeVars = {
  stage: string;
  stageDeep: string;
  stageFloor: string;
  velvet: string;
  velvetDeep: string;
  brass: string;
  brassLight: string;
  brassDark: string;
  brassInk: string;
  cream: string;
  creamDim: string;
  creamFaint: string;
  lamp: string;
  lampGlow: string;
  glowSize: string;
  panelFg: string;
  panelA: string;
  panelB: string;
  panelUnlit: string;
  plateA: string;
  plateB: string;
  plateC: string;
  plateShadow: string;
  spot: string;
  wash: string;
  colorScheme: "dark" | "light";
};

export type Theme = {
  id: ThemeId;
  label: string;
  description: string;
  swatch: [string, string, string];
  vars: ThemeVars;
};

const dark = (fg: string, dim: string, faint: string) => ({ cream: fg, creamDim: dim, creamFaint: faint });

export const THEMES: Record<ThemeId, Theme> = {
  midnatt: {
    id: "midnatt",
    label: "Midnatt og sølv",
    description: "Dyp marineblå, sølvplater, kjølig hvitt.",
    swatch: ["#0b1220", "#cfd7e6", "#16223a"],
    vars: {
      stage: "#0b1220", stageDeep: "#070b16", stageFloor: "#121c31", velvet: "#1a2742", velvetDeep: "#111a2e",
      brass: "#cfd7e6", brassLight: "#eef2f8", brassDark: "#8b96ab", brassInk: "#101a2c",
      ...dark("#eef2f8", "rgba(238,242,248,0.68)", "rgba(238,242,248,0.34)"),
      lamp: "#f4f7fb", lampGlow: "rgba(160,180,220,0.22)", glowSize: "0px", panelFg: "#f4f7fb", panelA: "#1b2a45", panelB: "#13203a", panelUnlit: "#0e1628",
      plateA: "#eef2f8", plateB: "#cfd7e6", plateC: "#b3bfd3", plateShadow: "none", spot: "rgba(120,150,210,0.16)", wash: "rgba(20,40,80,0.35)", colorScheme: "dark",
    },
  },
  skifer: {
    id: "skifer",
    label: "Skifer og kobber",
    description: "Kullgrå, matt kobber, varm hvit.",
    swatch: ["#15181c", "#b87352", "#22262b"],
    vars: {
      stage: "#15181c", stageDeep: "#0e1012", stageFloor: "#1e2227", velvet: "#3a2a24", velvetDeep: "#2a1e1a",
      brass: "#b87352", brassLight: "#d9a27f", brassDark: "#7d4a32", brassInk: "#1a120c",
      ...dark("#f2ede6", "rgba(242,237,230,0.68)", "rgba(242,237,230,0.32)"),
      lamp: "#f6efe6", lampGlow: "rgba(184,115,82,0.22)", glowSize: "0px", panelFg: "#f6efe6", panelA: "#262a30", panelB: "#1c2025", panelUnlit: "#191c20",
      plateA: "#c98b6a", plateB: "#b87352", plateC: "#9a5e40", plateShadow: "none", spot: "rgba(184,115,82,0.10)", wash: "rgba(0,0,0,0.4)", colorScheme: "dark",
    },
  },
  burgunder: {
    id: "burgunder",
    label: "Burgunder og krem",
    description: "Vinrød bunn, lyse kremfliser med mørke tall.",
    swatch: ["#2a1218", "#f6eee4", "#e0c49a"],
    vars: {
      stage: "#2a1218", stageDeep: "#1c0b10", stageFloor: "#36181f", velvet: "#4a1e28", velvetDeep: "#36141c",
      brass: "#e0c49a", brassLight: "#f3e9d8", brassDark: "#9c7a4a", brassInk: "#3a1a22",
      ...dark("#f6eee4", "rgba(246,238,228,0.68)", "rgba(246,238,228,0.32)"),
      lamp: "#3a1a22", lampGlow: "rgba(0,0,0,0.25)", glowSize: "0px", panelFg: "#3a1a22", panelA: "#fbf5ea", panelB: "#efe3d2", panelUnlit: "#3a1c24",
      plateA: "#f8f0e2", plateB: "#f3e9d8", plateC: "#e0c49a", plateShadow: "none", spot: "rgba(224,196,154,0.10)", wash: "rgba(0,0,0,0.35)", colorScheme: "dark",
    },
  },
  skog: {
    id: "skog",
    label: "Skog og dempet messing",
    description: "Dyp grønn, tynn messinglinje, krem.",
    swatch: ["#0f1f1a", "#cdb37a", "#2a3f36"],
    vars: {
      stage: "#0f1f1a", stageDeep: "#0a1512", stageFloor: "#163027", velvet: "#24362e", velvetDeep: "#1a2822",
      brass: "#cdb37a", brassLight: "#e2cd9a", brassDark: "#8a7548", brassInk: "#eef3ee",
      ...dark("#eef3ee", "rgba(238,243,238,0.68)", "rgba(238,243,238,0.32)"),
      lamp: "#f3f0e6", lampGlow: "rgba(205,179,122,0.2)", glowSize: "0px", panelFg: "#f3f0e6", panelA: "#1c382e", panelB: "#142a22", panelUnlit: "#12241e",
      plateA: "#33493f", plateB: "#2a3f36", plateC: "#21332b", plateShadow: "none", spot: "rgba(205,179,122,0.10)", wash: "rgba(0,0,0,0.35)", colorScheme: "dark",
    },
  },
  lys: {
    id: "lys",
    label: "Lys scene",
    description: "Lys papirbunn, mørke tall, én mørk plate.",
    swatch: ["#f4efe6", "#1d1a16", "#ffffff"],
    vars: {
      stage: "#f4efe6", stageDeep: "#ebe4d8", stageFloor: "#ffffff", velvet: "#d9c9a8", velvetDeep: "#c9b58e",
      brass: "#7a5a1e", brassLight: "#a07a2e", brassDark: "#4d3810", brassInk: "#f4efe6",
      cream: "#1d1a16", creamDim: "rgba(29,26,22,0.68)", creamFaint: "rgba(29,26,22,0.34)",
      lamp: "#1d1a16", lampGlow: "rgba(0,0,0,0.08)", glowSize: "0px", panelFg: "#1d1a16", panelA: "#ffffff", panelB: "#f7f2ea", panelUnlit: "#e6dfd2",
      plateA: "#2a2622", plateB: "#1d1a16", plateC: "#14120f", plateShadow: "none", spot: "rgba(255,255,255,0.6)", wash: "rgba(122,90,30,0.08)", colorScheme: "light",
    },
  },
  monokrom: {
    id: "monokrom",
    label: "Monokrom",
    description: "Nesten svart, grå plater, hvite tall.",
    swatch: ["#0d0d0f", "#b8b8b0", "#1e1e22"],
    vars: {
      stage: "#0d0d0f", stageDeep: "#070708", stageFloor: "#16161a", velvet: "#26262b", velvetDeep: "#1c1c20",
      brass: "#b8b8b0", brassLight: "#e6e6e0", brassDark: "#6f6f68", brassInk: "#f5f5f2",
      ...dark("#f5f5f2", "rgba(245,245,242,0.68)", "rgba(245,245,242,0.3)"),
      lamp: "#f5f5f2", lampGlow: "rgba(255,255,255,0.08)", glowSize: "0px", panelFg: "#f5f5f2", panelA: "#1a1a1e", panelB: "#131316", panelUnlit: "#101012",
      plateA: "#26262b", plateB: "#1e1e22", plateC: "#16161a", plateShadow: "none", spot: "rgba(255,255,255,0.05)", wash: "rgba(0,0,0,0.4)", colorScheme: "dark",
    },
  },
  studio: {
    id: "studio",
    label: "Studio",
    description: "Mørk scene, messing og glødende paneler.",
    swatch: ["#120d0a", "#d4a648", "#3a2612"],
    vars: {
      stage: "#120d0a", stageDeep: "#070403", stageFloor: "#1d140e", velvet: "#8b1e2d", velvetDeep: "#56111c",
      brass: "#d4a648", brassLight: "#f3dc93", brassDark: "#7d5a1c", brassInk: "#2a1c08",
      ...dark("#fff2d6", "rgba(255,242,214,0.64)", "rgba(255,242,214,0.36)"),
      lamp: "#ffe2a3", lampGlow: "rgba(255,196,105,0.45)", glowSize: "28px", panelFg: "#fff2d6", panelA: "#3a2612", panelB: "#22160c", panelUnlit: "#1a120d",
      plateA: "#f6e2a4", plateB: "#d4a648", plateC: "#b98a30", plateShadow: "0 1px 0 rgba(255,245,215,0.55)", spot: "rgba(255,226,163,0.22)", wash: "rgba(139,30,45,0.35)", colorScheme: "dark",
    },
  },
};

export const themeList = THEME_IDS.map((id) => THEMES[id]);

export const isThemeId = (value: unknown): value is ThemeId => typeof value === "string" && (THEME_IDS as readonly string[]).includes(value);

export const themeStyle = (id: ThemeId | undefined): CSSProperties => {
  const v = THEMES[id ?? DEFAULT_THEME].vars;
  return {
    "--stage": v.stage,
    "--stage-deep": v.stageDeep,
    "--stage-floor": v.stageFloor,
    "--velvet": v.velvet,
    "--velvet-deep": v.velvetDeep,
    "--brass": v.brass,
    "--brass-light": v.brassLight,
    "--brass-dark": v.brassDark,
    "--brass-ink": v.brassInk,
    "--cream": v.cream,
    "--cream-dim": v.creamDim,
    "--cream-faint": v.creamFaint,
    "--lamp": v.lamp,
    "--lamp-glow": v.lampGlow,
    "--glow-size": v.glowSize,
    "--panel-fg": v.panelFg,
    "--panel-a": v.panelA,
    "--panel-b": v.panelB,
    "--panel-unlit": v.panelUnlit,
    "--plate-a": v.plateA,
    "--plate-b": v.plateB,
    "--plate-c": v.plateC,
    "--plate-shadow": v.plateShadow,
    "--spot": v.spot,
    "--wash": v.wash,
    colorScheme: v.colorScheme,
  } as CSSProperties;
};
