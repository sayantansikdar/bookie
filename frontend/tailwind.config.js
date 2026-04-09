/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      "colors": {
        "on-secondary-fixed-variant": "#2d4e37",
        "surface-tint": "#4e6071",
        "surface": "#fef9f1",
        "on-secondary-container": "#4a6c53",
        "error-container": "#ffdad6",
        "surface-container-high": "#ece8e0",
        "surface-bright": "#fef9f1",
        "tertiary-fixed": "#f1e1c4",
        "inverse-surface": "#32302b",
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "primary-fixed": "#d1e5f9",
        "primary-container": "#2c3e4e",
        "on-tertiary-fixed-variant": "#504630",
        "on-error-container": "#93000a",
        "secondary-container": "#c6eccd",
        "surface-variant": "#e7e2da",
        "surface-dim": "#ded9d2",
        "on-tertiary-fixed": "#221b09",
        "inverse-primary": "#b6c9dd",
        "secondary-fixed-dim": "#aad0b2",
        "error": "#ba1a1a",
        "primary": "#162837",
        "outline": "#74777c",
        "inverse-on-surface": "#f5f0e8",
        "primary-fixed-dim": "#b6c9dd",
        "on-background": "#1d1c17",
        "tertiary-container": "#453b27",
        "on-surface-variant": "#43474c",
        "tertiary": "#2e2513",
        "on-tertiary": "#ffffff",
        "outline-variant": "#c3c7cc",
        "surface-container-low": "#f8f3eb",
        "on-primary-container": "#96a9bc",
        "on-tertiary-container": "#b3a58b",
        "on-primary-fixed-variant": "#374959",
        "tertiary-fixed-dim": "#d4c5a9",
        "on-secondary": "#ffffff",
        "secondary": "#44664e",
        "secondary-fixed": "#c6eccd",
        "surface-container-lowest": "#ffffff",
        "surface-container": "#f2ede5",
        "on-surface": "#1d1c17",
        "on-primary-fixed": "#091d2c",
        "background": "#fef9f1",
        "surface-container-highest": "#e7e2da",
        "on-secondary-fixed": "#00210e"
      },
      "borderRadius": {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      fontFamily: {
        headline: ["Noto Serif", "serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
        clock: ["Cormorant Garamond", "serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms')
  ],
}
