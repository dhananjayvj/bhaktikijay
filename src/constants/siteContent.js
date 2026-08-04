/** Site content — timeline days, guest guide */

export const MAPS_KALYANA = 'https://maps.app.goo.gl/p7yrs8a2dHogMKHp9'

export const CELEBRATION_DAYS = [
  {
    id: 'day-1',
    day: 'Day 1 · Thursday, Mar 11',
    title: 'Pre-wedding warmth',
    venue: 'Prestige Lake Ridge Clubhouse',
    tone: 'Intimate, colourful, and relaxed — arrive in comfortable festive wear.',
    dressCode: 'Wear yellow for Haldi.',
    schedule: [
      { name: 'Haldi', time: '3:30 PM' },
      { name: 'Mehendi', time: '5:30 PM' },
    ],
    mapsHref: 'https://maps.app.goo.gl/vyDCL9iZnM9jVQpb9',
    mapsLabel: 'Open directions to Prestige Lake Ridge',
  },
  {
    id: 'day-2',
    day: 'Day 2 · Saturday, Mar 13',
    title: 'Music & procession',
    venue: 'SDM Kalyana Mantapa',
    tone: 'An afternoon of music and dance, followed by the baraat procession in the evening.',
    schedule: [
      { name: 'Sangeet', time: '2:00 PM' },
      { name: 'Baraat', time: '5:00 PM' },
    ],
    mapsHref: MAPS_KALYANA,
    mapsLabel: 'Open directions to SDM Kalyana Mantapa',
  },
  {
    id: 'day-3',
    day: 'Day 3 · Sunday, Mar 14',
    title: 'Sacred union',
    venue: 'SDM Kalyana Mantapa',
    tone: 'Traditional ceremony followed by a celebratory lunch reception.',
    schedule: [
      { name: 'Muhurtham', time: '8:48 AM' },
      { name: 'Reception', time: '12:30 PM' },
    ],
    mapsHref: MAPS_KALYANA,
    mapsLabel: 'Open directions to SDM Kalyana Mantapa',
  },
]

export const GUEST_GUIDE = {
  eyebrow: 'For our guests',
  title: 'Guest guide',
  sections: [
    {
      title: 'Dress code',
      body: 'Wear yellow for Haldi. Festive Indian attire is warmly encouraged for all other events.',
    },
    {
      title: 'Arrival & timing',
      body: 'Please plan to arrive 15–20 minutes before each event start time. Sunday muhurtham is time-sensitive — we request guests to be seated by 8:30 AM. Parking near SDM is limited on weekends; cabs and autos are the easiest option.',
    },
  ],
  venue: {
    eyebrow: 'Getting there',
    title: 'Venue & logistics',
    proTipLabel: 'Pro-tip',
    proTip:
      'Bull Temple Road is easy by auto, cab, or private car. Nearest metro is National College/LalBagh on the Green Line, about 2 km from the hall and roughly 15 to 20 minutes by road in normal traffic. Sundays and peak evenings need extra time. Parking is limited, so come a bit early if you drive.',
    address:
      'Sri Dharmastala Manjunatha Swamy Kalyana Mantapa · Bull Temple Road · Basavanagudi · Bengaluru',
    mapsHref: MAPS_KALYANA,
    calendar: {
      text: 'Bhakti & Dhananjay — Wedding, March 14, 2027',
      dates: '20270314/20270315',
    },
  },
}
