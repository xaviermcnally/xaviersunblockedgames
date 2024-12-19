/** @type {import('tailwindcss').Config} */
import catppuccin from "@catppuccin/daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        sunset: {
          ...require("daisyui/src/theming/themes")["sunset"],
          primary: "#155e75",
          "--rounded-badge": "1.9rem",
        },
      },
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "halloween",
      {
        lunaar: {
          primary: "rgb(180, 105, 255)",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#3b039c",
          background: "#3b039c", // Matches --bg
          "background-alt": "rgb(69, 9, 174)",
          "logo-color": "#6b09ac",
          "button-color": "rgb(180, 105, 255)",
          "text-color": "#fff",

          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
          "--background-filter": "blur(3px) brightness(80%)",
        },
      },
      // catppuccin("latte"),
      // catppuccin("frappe"),
      // catppuccin("macchiato"),
      // catppuccin("mocha", { primary: "mauve", secondary: "rosewater" }),
    ],
  },
};
