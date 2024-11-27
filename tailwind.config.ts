import type { Config } from "tailwindcss";


const config: Config = {
 content: [
   "./pages/**/*.{js,ts,jsx,tsx,mdx}",
   "./components/**/*.{js,ts,jsx,tsx,mdx}",
   "./app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
   extend: {
     colors: {
       background: "var(--background)",
       foreground: "var(--foreground)",
     },
   },
   colors: {
     primary: "#64ffda",
     secondary: "#0a192f",
     tertiary: "#112240",
     text: "#8892b0",
     heading: "#ccd6f6",
   },
 },
 plugins: [],
};
export default config;
