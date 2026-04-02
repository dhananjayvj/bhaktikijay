/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        terra: '#E2725B',
        cream: '#FCF9F1',
        gold: '#D4AF37',
        'gold-light': '#F0D060',
        'gold-dark': '#A8861A',
        brown: '#3B1F0A',
        /** Invitation / first-screen palette (high contrast, no gold-on-ivory monograms) */
        'invite-night': '#0c0e14',
        'invite-night-mid': '#141822',
        'invite-ivory': '#f5f1ea',
        'invite-paper': '#faf7f2',
        'invite-ink': '#1a1522',
        'invite-ink-soft': '#3d3548',
        'invite-wine': '#7a2e3f',
        'invite-wine-light': '#9a4a5c',
        'invite-mauve': '#8b6b7a',
        'invite-blush': '#e9d8dd',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel Decorative"', 'Georgia', 'serif'],
        lato: ['"Lato"', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        hand: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}

