/** Site content — timeline days, guest guide */

export const MAPS_KALYANA = 'https://maps.app.goo.gl/p7yrs8a2dHogMKHp9'

export const CELEBRATION_DAYS = [
  {
    id: 'day-1',
    day: 'Thursday · 11 March 2027',
    title: 'Pre-wedding warmth',
    description:
      'We begin with turmeric blessings and laughter, then settle in for an evening of mehendi and music.',
    venue: 'Prestige Lake Ridge Clubhouse',
    address: 'Yadalam Nagar, Uttarahalli, Bengaluru',
    schedule: [
      {
        name: 'Haldi',
        time: '3:30 PM',
        wearTip: "Wear yellow and choose something you don't mind getting a little turmeric on.",
      },
      {
        name: 'Mehendi',
        time: '5:30 PM',
        wearTip: 'Bright festive colours — sleeves that roll up are a smart move.',
      },
    ],
    mapsHref: 'https://maps.app.goo.gl/vyDCL9iZnM9jVQpb9',
    mapsLabel: 'Open directions to Prestige Lake Ridge',
  },
  {
    id: 'day-2',
    day: 'Saturday · 13 March 2027',
    title: 'Music & procession',
    description:
      'The baraat brings the groom’s side with drums and colour, followed by a sangeet night of dance and celebration.',
    venue: 'SDM Kalyana Mantapa',
    address: 'Bull Temple Road, Basavanagudi, Bengaluru',
    schedule: [
      { name: 'Baraat', time: '4:00 PM' },
      {
        name: 'Sangeet',
        time: '7:00 PM',
        wearTip: 'Comfortable shoes for a whole evening of dancing.',
      },
    ],
    mapsHref: MAPS_KALYANA,
    mapsLabel: 'Open directions to SDM Kalyana Mantapa',
  },
  {
    id: 'day-3',
    day: 'Sunday · 14 March 2027',
    title: 'Sacred union',
    description:
      'The muhurtham seals our vows at the auspicious hour, and we continue with a joyful lunch reception.',
    venue: 'SDM Kalyana Mantapa',
    address: 'Bull Temple Road, Basavanagudi, Bengaluru',
    schedule: [
      {
        name: 'Muhurtham',
        time: '8:48 AM',
        wearTip: 'Your finest traditional outfit, ready for photos at 8:48 AM sharp!',
      },
      { name: 'Reception', time: '12:30 PM' },
    ],
    mapsHref: MAPS_KALYANA,
    mapsLabel: 'Open directions to SDM Kalyana Mantapa',
  },
]

export const GUEST_GUIDE = {
  eyebrow: 'Getting there',
  title: 'Venue & logistics',
  proTipLabel: 'Plan your arrival',
  proTip:
    'The nearest Green Line stations are National College and Lalbagh, about 2 km from the hall. Weekend parking is limited; consider a cab or auto, and check live travel time before leaving.',
  venueName: 'Sri Dharmastala Manjunatha Swamy Kalyana Mantapa',
  venueAddress: 'Bull Temple Road · Basavanagudi · Bengaluru',
  mapsHref: MAPS_KALYANA,
  calendar: {
    text: 'Bhakti & Dhananjay, Wedding, March 14, 2027',
    dates: '20270314/20270315',
  },
}
