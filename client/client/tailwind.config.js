/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        'primary-foreground': '#ffffff',
        accent: '#f3f4f6',
        'accent-foreground': '#1f2937',
        background: '#ffffff',
        foreground: '#1f2937',
        'muted-foreground': '#6b7280',
        border: '#e5e7eb',
      },
    },
  },
  plugins: []
}