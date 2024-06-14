import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Azul oscuro
        secondary: '#D97706', // Naranja oscuro
        accent: '#10B981', // Verde
        neutral: '#3D4451', // Gris oscuro
        'base-100': '#FFFFFF', // Blanco
        info: '#2094f3', // Azul claro
        success: '#009485', // Verde oscuro
        warning: '#ff9900', // Naranja
        error: '#ff5724', // Rojo
      },
    },
  },
  plugins: [],
};
export default config;
