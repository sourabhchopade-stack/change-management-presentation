/** Flora-adjacent colour ramps used by the deck (public, no private packages). */
export const PALETTE = {
  black: "#000",
  white: "#ffffff",
  grey: {
    100: "#f7f7f7",
    200: "#eae9e8",
    300: "#dcdcda",
    400: "#b7b7b3",
    500: "#999b97",
    600: "#8b8e89",
    700: "#646864",
    800: "#404241",
    900: "#2f3130",
  },
  blue: {
    100: "#f3f6fb",
    400: "#a3b7df",
    600: "#698cd3",
    700: "#406cc4",
  },
  red: {
    700: "#c63f46",
  },
  yellow: {
    800: "#4c4207",
  },
  green: {
    600: "#649c28",
    700: "#4b7d04",
  },
} as const;
