import type { Config } from "tailwindcss";

// Design system tokens. Locked per BUILD-HANDOFF.md section 3. Do not change.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5EFE3",
        "paper-deep": "#EBE2CE",
        card: "#FDFAF2",
        ink: "#191510",
        "ink-soft": "#6E6353",
        rule: "#D8CCB2",
        green: "#0B7A63",
        "green-deep": "#075C4A",
        red: "#C93A20",
        gold: "#E8B84B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
        signature: ["var(--font-caveat)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
