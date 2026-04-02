import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Defensive cleanup: if legacy static HTML is accidentally still present in the DOM,
// remove everything except the React mount node before mounting.
// This avoids legacy CSS/JS overriding the Tailwind + Framer Motion implementation.
const existingRoot = document.getElementById('root')
if (!existingRoot) {
  throw new Error('Missing #root element')
}

// Remove legacy inline styles and scripts if they exist in the document head.
const legacyStyleMarkers = [
  'glass-nav',
  'kolam-bg',
  'invite-card',
  'float-wrap',
  'btn-gold',
  'timeline-rail',
  'rsvp-doodle-section',
  'gear-slow',
]
for (const styleEl of Array.from(document.head.querySelectorAll('style'))) {
  const txt = styleEl.textContent || ''
  if (legacyStyleMarkers.some((m) => txt.includes(m))) styleEl.remove()
}

for (const scriptEl of Array.from(document.head.querySelectorAll('script, script[type="module"]'))) {
  const src = scriptEl.getAttribute('src') || ''
  if (src.includes('cdn.tailwindcss.com')) scriptEl.remove()
  const txt = scriptEl.textContent || ''
  if (txt.includes('tailwind.config') && txt.includes('theme')) scriptEl.remove()
}

// Remove only legacy DOM nodes; keep Vite-injected tags (STYLE/LINK/SCRIPT) so CSS still applies.
const keepBodyTags = new Set(['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT', 'META'])
for (const child of Array.from(document.body.children)) {
  if (child === existingRoot) continue
  if (keepBodyTags.has(child.tagName)) continue
  child.remove()
}

// Ensure #root stays attached to body.
if (!existingRoot.parentElement || existingRoot.parentElement !== document.body) {
  document.body.appendChild(existingRoot)
}

ReactDOM.createRoot(existingRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

