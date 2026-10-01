// Everything a visitor reads lives in this file. Edit the text here and the
// site updates — no need to touch the components.
//
// Facts (address, phone, hours, features, reviews, menu items and prices) come
// from the owner. Headlines and short connecting sentences are draft copy.

import { asset } from './lib/asset'

export const brand = {
  name: 'Plumeria',
  descriptor: 'Kitchen • Espresso',
  logo: asset('/images/logo.webp'),
  currency: '₹',
}

// Background music. Leave `src` empty to use the built-in generated café loop,
// or put an audio file in /public/audio and point to it, e.g. asset('/audio/music.mp3').
export const music = {
  src: '',
}

export const nav = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Hours', href: '#hours' },
  { label: 'Guests', href: '#guests' },
  { label: 'Location', href: '#location' },
]

export const hero = {
  // How long the visitor scrolls through the frame sequence, in screen heights.
  scrollLength: 5,
  stages: [
    {
      eyebrow: 'Kitchen • Espresso',
      title: 'Where every plate blooms.',
    },
    {
      eyebrow: 'Café & bistro · Since 2023',
      title: 'Good food. Great coffee.',
    },
    {
      eyebrow: 'Open every day · 12 – 11 pm',
      title: 'Your table is waiting.',
    },
  ],
  primaryCta: { label: 'Contact us', href: '#contact' },
  secondaryCta: { label: 'See the menu', href: '#menu' },
}

export const marquee = [
  'Great coffee',
  'Pizza & burgers',
  'Great desserts',
  'Live music',
  'Outdoor seating',
  'Summer coolers',
  'Free Wi-Fi',
]

export const story = {
  eyebrow: 'Our story',
  title: 'A cosy corner of Habra, serving since 2023.',
  paragraphs: [
    'Plumeria is a women-owned café and bistro on Jessore Road: a kitchen on one side, an espresso bar on the other, and tables both indoors and out front.',
    'Come for a quick bite or a long dinner, a birthday with the kids or a quiet coffee on your own. The room is casual and cosy, there is live music, and the Wi-Fi is free.',
  ],
  cta: { label: 'See the menu', href: '#menu' },
  photos: [
    {
      src: asset('/images/courtyard.webp'),
      alt: 'The Plumeria storefront at night, with guests at the fenced outdoor tables under the lit sign',
      label: 'Courtyard photo',
    },
    {
      src: asset('/images/kitchen.webp'),
      alt: 'Inside Plumeria: booth seating, patterned floor tiles and the counter under a pink neon sign',
      label: 'Kitchen photo',
    },
  ],
}

// Shown in filename order: /public/images/gallery/dish-01.jpg, dish-02.jpg, ...
export const gallery = {
  eyebrow: 'Gallery',
  title: 'Straight from our kitchen.',
  photos: [
    'Chocolate shake topped with whipped cream and chocolate shavings',
    'Crispy fried cutlet on a bed of salad',
    'Fried chicken wings drizzled with sauce, with a dip',
    'Grilled sandwich with fries',
    'Stuffed chicken with sautéed vegetables and a dip',
    'Chocolate-drizzled dessert pizza slices',
    'White sauce penne pasta with garlic toast',
    'Chilli chicken with peppers and sesame',
    'Club sandwich with fries',
    'Latte with rosetta art',
    'Pizza with a white sauce drizzle',
    'Grilled sandwich with fries, close up',
    'French fries with a dip',
    'Wrap with fries',
  ].map((alt, i) => ({ src: asset(`/images/gallery/dish-${String(i + 1).padStart(2, '0')}.jpg`), alt })),
}

export const features = {
  eyebrow: 'Why guests come back',
  title: 'Known for coffee, dessert and live music.',
  items: [
    {
      icon: 'coffee',
      title: 'Great coffee',
      text: 'Espresso is half our name. There is a good tea selection too.',
    },
    {
      icon: 'cake',
      title: 'Great dessert',
      text: 'The part of the meal guests mention most, and a favourite for birthdays.',
    },
    {
      icon: 'music',
      title: 'Live music',
      text: 'A casual, cosy room that suits a quiet catch-up as well as a night out.',
    },
  ],
  detailsTitle: 'Good to know',
  details: [
    {
      icon: 'bag',
      title: 'Ways to order',
      list: [
        'Dine-in with table service',
        'Outdoor seating',
        'Takeaway',
        'Delivery and no-contact delivery',
        'Kerbside pickup',
      ],
    },
    {
      icon: 'utensils',
      title: 'On offer',
      list: [
        'Brunch, lunch, dinner and dessert',
        'Quick bites and small plates',
        'Healthy options',
        'Happy-hour food',
        'All you can eat',
      ],
    },
    {
      icon: 'users',
      title: 'Good for',
      list: ['Groups and university students', 'Solo dining', 'Kids and kids’ birthdays'],
    },
    {
      icon: 'accessibility',
      title: 'Accessibility',
      list: ['Wheelchair-accessible entrance', 'Wheelchair-accessible seating', 'Restroom'],
    },
    {
      icon: 'car',
      title: 'Parking',
      list: ['Free parking garage', 'Free parking lot', 'Free street parking'],
    },
    {
      icon: 'card',
      title: 'Wi-Fi and payments',
      list: ['Free Wi-Fi', 'Credit and debit cards', 'NFC mobile payments'],
    },
  ],
}

// Transcribed from the printed menu cards in /public/images/menu.
// `spicy: true` shows the chilli marker used on the cards.
// An item has either `price` or `prices` (one per entry in the group's `sizes`).
export const menu = {
  eyebrow: 'The menu',
  title: 'From quick bites to a full table.',
  note: 'Around ₹200–400 per person. Tap the card to see it full size.',
  categories: [
    {
      name: 'Starters & chicken',
      card: { src: asset('/images/menu/starter.webp'), alt: 'Plumeria menu card: starters and chicken entrée' },
      groups: [
        {
          title: 'Starter',
          items: [
            { name: 'French Fries', price: 89 },
            { name: 'Peri Peri French Fries', price: 99, spicy: true },
            { name: 'Commando French Fries', price: 150 },
            { name: 'Corn Croquette Balls', price: 150 },
            { name: 'Sautéed Vegetables', price: 150 },
            { name: 'Nachos with Salsa', price: 170 },
            { name: 'Corn Pepper Salt', price: 180 },
            { name: 'Crispy Chilli Baby Corn', price: 180, spicy: true },
            { name: 'Pan Fried Chilli Mushroom', price: 200, spicy: true },
          ],
        },
        {
          title: 'Chicken entrée',
          items: [
            { name: 'Chicken Lollipop', price: 180 },
            { name: 'Chicken Nuggets with French Fries', price: 180 },
            { name: 'Chicken Fried Wontons', price: 200 },
            { name: 'Chicken Pan Fried Wontons', price: 220, spicy: true },
            { name: 'Chicken Drums of Heaven', price: 210, spicy: true },
            { name: 'Barbeque Wings', price: 220 },
            { name: 'Buffalo Wings', price: 220 },
            { name: 'Peri Peri Wings', price: 220, spicy: true },
            { name: 'Chicken Tacos', price: 220 },
            { name: 'Crispy Konjee Chicken', price: 220, spicy: true },
            { name: 'Hunan Chicken', price: 220, spicy: true },
            { name: 'Chicken and Chips', price: 230 },
            { name: 'Chicken Cheese Croquette Balls', price: 240 },
            { name: 'Dry Chilli Chicken', price: 250, spicy: true },
            { name: 'Pepper Garlic Chicken', price: 260 },
            { name: 'Kung Pao Chicken', price: 260 },
            { name: 'Chicken & Mushroom in Oyster Sauce', price: 280 },
          ],
        },
      ],
    },
    {
      name: 'Pizza, burger & sandwich',
      card: { src: asset('/images/menu/pizza.webp'), alt: 'Plumeria menu card: pizza, burger and sandwich' },
      groups: [
        {
          title: 'Pizza',
          note: 'Crust can be customised.',
          sizes: ['8 inch', '12 inch'],
          items: [
            { name: 'Mixed Veg Pizza', prices: [235, 270] },
            { name: 'Margherita Pizza', prices: [185, 250] },
            { name: 'Cheesy Delight Pizza', prices: [210, 290] },
            { name: 'BBQ Chicken Pizza', prices: [235, 360] },
            { name: 'Peri Peri Chicken Pizza', prices: [235, 360] },
            { name: 'Chicken Pepperoni Pizza', prices: [235, 360] },
            { name: 'Chicken Hawaiian Pizza', prices: [280, 390] },
            { name: 'Mushroom & Chicken Pizza', prices: [280, 390] },
            {
              name: 'Plumeria Special Pizza',
              text: 'Overloaded with veggies and chicken chunks',
              prices: [280, 390],
            },
          ],
        },
        {
          title: 'Burger',
          items: [
            { name: 'Veg Cheese Burger', price: 200 },
            { name: 'Cheese Chicken Burger', price: 230 },
            {
              name: 'Plumeria Special Doubledecker Chicken Burger',
              text: 'Two chicken patties, Plumeria special cheese sauce, lettuce, mayonnaise, egg, fried onion',
              price: 280,
            },
          ],
        },
        {
          title: 'Sandwich',
          items: [
            { name: 'Vegetable & Cheese Sandwich', text: 'Served with French fries', price: 140 },
            { name: 'Classic Grilled Chicken Sandwich', text: 'Served with French fries', price: 160 },
            { name: 'Club Sandwich', text: 'Toasted', price: 200 },
          ],
        },
      ],
    },
    {
      name: 'Beverages',
      card: {
        src: asset('/images/menu/beverages.webp'),
        alt: 'Plumeria beverages menu card: mocktails, frappe and summer coolers',
      },
      groups: [
        {
          title: 'Mocktails',
          items: [
            { name: 'Soft Drink by Glass', text: 'Coke / Sprite', price: 70 },
            { name: 'Masala Cola', text: 'A refreshing, spiced Indian summer drink', price: 80 },
            { name: 'Fresh Lime Soda', text: 'Classic or sugar. Refreshing lemon soda drink', price: 90 },
            { name: 'Virgin Mojito', text: 'Soda with mint leaves and mojito syrup', price: 100 },
            {
              name: 'Blackcurrant with Lemon Pop',
              text: 'Crushed blackcurrant with citrus juice of lemon, topped with soda',
              price: 100,
            },
            { name: 'Blue Lagoon', text: 'Refreshing blue curaçao with soda and mint leaves', price: 100 },
          ],
        },
        {
          title: 'Frappe',
          items: [
            {
              name: 'Dark Choco Explosion Frappe',
              text: 'Dark chocolate ganache, chocolate powder and ice cream blended in a thick drink, served with a dollop of whipped cream',
              price: 190,
            },
            {
              name: 'Banana & Peanut Butter Frappe',
              text: 'Banana powder, ice cream and peanut butter, blended and served with whipped cream',
              price: 190,
            },
            {
              name: 'Oreo Frappe with Kit-Kat',
              text: 'Oreo biscuit and Kit-Kat blended with ice cream, topped with whipped cream',
              price: 220,
            },
            {
              name: 'Hot Chocolate',
              text: 'Steamy molten chocolate served with whipped cream. Churros add-on available',
              price: 160,
            },
          ],
        },
        {
          title: 'Summer coolers',
          note: 'Soda-based, refreshing fizzy drinks.',
          items: [
            { name: 'Mango Cooler', price: 120 },
            { name: 'Kiwi Cooler', price: 120 },
            { name: 'Watermelon Cooler', price: 120 },
            { name: 'Green Apple Cooler', price: 120 },
            { name: 'Orange Cooler', price: 120 },
            { name: 'Pineapple Cooler', price: 120 },
            { name: 'Strawberry Cooler', price: 120 },
          ],
        },
      ],
    },
  ],
}

export const hours = {
  eyebrow: 'Visit us',
  title: 'Open every day, noon to eleven.',
  rows: [
    { days: 'Monday – Sunday', time: '12:00 pm – 11:00 pm' },
    { days: 'Average spend', time: '₹200–400 per person' },
  ],
  note: 'Hours may differ on public holidays.',
  address: 'Jessore Rd, beside Pabrai’s Ice-Cream Parlour, Habra, West Bengal 743268',
  mapUrl:
    'https://www.google.com/maps/place/Plumeria+Cafe+%26+Bistro/@22.8375991,88.6464727,17z/data=!4m6!3m5!1s0x39f8b109bc4042af:0xd3e1a2326e3cff4e!8m2!3d22.8374484!4d88.6465379!16s%2Fg%2F11l5j8c4d5',
  phone: '091639 27354',
  phoneHref: 'tel:+919163927354',
}

export const stats = [
  { value: 2023, label: 'Serving Habra since', plain: true },
  { value: 50, suffix: '+', label: 'Dishes and drinks' },
  { value: 7, label: 'Days a week' },
  { value: 11, label: 'Hours open, every day' },
]

// Excerpts from guests' Google reviews, wording unchanged ("…" marks a cut).
export const testimonials = {
  eyebrow: 'Kind words',
  title: 'What guests say about us.',
  items: [
    {
      quote:
        'I am a regular here and I absolutely love this place. The service is amazing, the food is a tiny bit pricey but its worth the money. The atmosphere is cozy and the cleanliness is great.',
      name: 'Niko',
      detail: 'Local Guide · Google review',
      rating: 5,
    },
    {
      quote:
        'Great! I ordered like a pizza, burgers and a meaty french fries. All tastes great but tbh,the meaty french fries tastes exeptionally better! I will come back soon!',
      name: 'Dipayan Hazra',
      detail: 'Local Guide · Google review',
      rating: 4.5,
    },
    {
      quote:
        'I recently celebrated my birthday at this café, and it turned out to be the perfect choice. The atmosphere was warm and welcoming, with a cozy vibe that made the day feel extra special. … The food and drinks were delicious, especially the desserts, which felt like a real birthday treat.',
      name: 'Sweety Sardar',
      detail: 'Local Guide · Google review',
      rating: 5,
    },
    {
      quote:
        'Feels more like a home than a cafe – really welcoming atmosphere. … The espresso has a rich, taste – perfectly bold and balanced. Foods are really good in taste and portion.',
      name: 'Avijit Deb',
      detail: 'Local Guide · Google review',
      rating: 4.8,
    },
  ],
}

export const contact = {
  eyebrow: 'Contact us',
  title: 'Questions or a party to plan? Talk to us.',
  background: asset('/images/kitchen.webp'),
  text: 'Call, message us on WhatsApp, or fill in the form and it will open WhatsApp with your message ready to send.',
  businessName: 'Plumeria',
  phone: hours.phone,
  phoneHref: hours.phoneHref,
  // The owner's WhatsApp number in international format, digits only.
  whatsapp: '919163927354',
  whatsappDisplay: '+91 91639 27354',
  // Leave empty to hide the email row.
  email: '',
}

export const location = {
  eyebrow: 'Locate us',
  title: 'Find us on Jessore Road, Habra.',
  placeName: 'Plumeria Cafe & Bistro',
  embedUrl: 'https://www.google.com/maps?q=22.8374484,88.6465379&z=17&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=22.8374484,88.6465379',
}

export const footer = {
  blurb: 'Café and bistro on Jessore Road, Habra. Kitchen, espresso and a cosy table since 2023.',
  socials: [{ label: 'Find us on Google Maps', href: hours.mapUrl }],
}
