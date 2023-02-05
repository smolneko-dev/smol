import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "smol-primary": "#610BEF",
        "smol-dark-primary": "#A996FF",
        "smol-primary-bg": "#EBECFE",
        "smol-primary-bg-strong": "#BFBEFC",
        "smol-header": "#14142B",
        "smol-dark-header": "#FCFCFC",
        "smol-bg": "#F7F7FC",
        "smol-dark-bg": "#14142B",
        "smol-body-bg": "#FCFCFC",
        "smol-dark-body-bg": "#262338",
        "smol-text": "#4E4B66",
        "smol-dark-text": "#D9DBE9",
        "smol-error": "#CA024F",
        "smol-dark-error": "#FF75CB",
        "smol-warning": "#EAAC30",
        "smol-dark-warning": "#FFDF9A",
        "smol-error-strong": "#9E0038",
        "smol-input": "#EFF0F6",
        "smol-line": "#D9DBE9",
        "smol-label": "#6E7191",
      },
    },
  },
  // Experimental
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries
  plugins: [require("@tailwindcss/container-queries")],
};
