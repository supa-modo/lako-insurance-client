/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          50: "#fef5e7",
          100: "#fdebd0",
          200: "#fbd7a1",
          300: "#f9c372",
          400: "#f7af43",
          500: "#f69023", // Main primary color (teal)
          600: "#e07b13",
          700: "#b5640f",
          800: "#8a4c0b",
          900: "#5f3407",
        },
        primary: {
          50: "#e8f6f6",
          100: "#d1eded",
          200: "#a3dbdb",
          300: "#75c9c9",
          400: "#47b7b7",
          500: "#2d9f9b", // New primary color
          600: "#247f7c",
          700: "#1b5f5d",
          800: "#123f3e",
          900: "#091f1f",
        },
        neutral: {
          50: "#fcfbfa",
          100: "#f9f7f5",
          200: "#f3efeb",
          300: "#ede8e4", // Main neutral color (cream)
          400: "#dfd7d0",
          500: "#c5baaf",
          600: "#a79889",
          700: "#8c7a68",
          800: "#6c5e4f",
          900: "#433a31",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        paytone: ["Paytone One", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px 0 rgba(0, 0, 0, 0.05)",
        card: "0 4px 20px 0 rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
