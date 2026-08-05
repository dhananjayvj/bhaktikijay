/** Site content — timeline days, guest guide */

export const MAPS_KALYANA = 'https://maps.app.goo.gl/p7yrs8a2dHogMKHp9'

export const CELEBRATION_DAYS = [
  {
    id: 'day-1',
    day: 'Day 1 · Thursday, Mar 11',
    title: 'Pre-wedding warmth',
    description:
      'We begin with turmeric blessings and laughter, then settle in for an evening of mehendi and music.',
    venue: 'Prestige Lake Ridge Clubhouse',
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
    description:
      'The baraat brings the groom’s side with drums and colour, followed by a sangeet night of dance and celebration.',
    venue: 'SDM Kalyana Mantapa',
    schedule: [
      { name: 'Baraat', time: '4:00 PM' },
      { name: 'Sangeet', time: '7:00 PM' },
    ],
    mapsHref: MAPS_KALYANA,
    mapsLabel: 'Open directions to SDM Kalyana Mantapa',
  },
  {
    id: 'day-3',
    day: 'Day 3 · Sunday, Mar 14',
    title: 'Sacred union',
    description:
      'The muhurtham seals our vows at the auspicious hour, and we continue with a joyful lunch reception.',
    venue: 'SDM Kalyana Mantapa',
    schedule: [
      { name: 'Muhurtham', time: '8:48 AM' },
      { name: 'Reception', time: '12:30 PM' },
    ],
    mapsHref: MAPS_KALYANA,
    mapsLabel: 'Open directions to SDM Kalyana Mantapa',
  },
]

export const GUEST_GUIDE = {
  eyebrow: 'Getting there',
  title: 'Venue & logistics',
  proTipLabel: 'Pro-tip',
  proTip:
    'Bull Temple Road is easy by auto, cab, or private car. Nearest metro is National College/LalBagh on the Green Line, about 2 km from the hall and roughly 15 to 20 minutes by road in normal traffic. Sundays and peak evenings need extra time. Parking is limited, so come a bit early if you drive.',
  address:
    'Sri Dharmastala Manjunatha Swamy Kalyana Mantapa · Bull Temple Road · Basavanagudi · Bengaluru',
  mapsHref: MAPS_KALYANA,
  calendar: {
    text: 'Bhakti & Dhananjay, Wedding, March 14, 2027',
    dates: '20270314/20270315',
  },
}
