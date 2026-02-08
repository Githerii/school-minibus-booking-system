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
        // Primary school colors
        primary: '#3b82f6',
        'primary-foreground': '#ffffff',
        
        // School theme colors
        'school-navy': '#1e3a8a',
        'school-blue': '#3b82f6',
        'school-coral': '#f97316',
        'school-violet': '#8b5cf6',
        'school-teal': '#14b8a6',
        'school-sky': '#0ea5e9',
        
        // Status colors
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        
        // Accent colors
        accent: '#f3f4f6',
        'accent-foreground': '#1f2937',
        background: '#ffffff',
        foreground: '#1f2937',
        'muted-foreground': '#6b7280',
        border: '#e5e7eb',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: []
}
