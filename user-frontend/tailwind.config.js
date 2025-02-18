export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#4f46e5',
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1600')"
      }
    },
  },
  plugins: [],
}