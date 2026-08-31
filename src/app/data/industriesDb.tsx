import React from 'react';

export interface IndustryFeatureItem {
  title: string;
  desc: string;
  linkText?: string;
  linkHref?: string;
}

export interface IndustryData {
  id: string;
  slug?: string;
  shortLabel: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  trustText: string;
  featuresTitle: string;
  features: IndustryFeatureItem[];
  whyChooseTitle?: string;
  whyChoose?: string[];
  ctaBlock: {
    title: string;
    desc: string;
  };
  heroImage?: string;
  image?: string;
  heroTitle?: string;
  badge?: string;
  ctaText?: string;
  gridTitle?: string;
  gridDesc?: string;
  opsTitle?: string;
  opsParagraph?: string;
  opsHighlights?: string;

  legacyTitle?: string;
  legacyItems?: { title: string; body: string; stat: string; statLabel: string }[];

  workflowTitle?: string;
  workflowDesc?: string;
  workflowItems?: { n: string; title: string; desc: string }[];

  controlTitle?: string;
  controlDesc?: string;
  controlItems?: { title: string; desc: string }[];

  efficiencyTitle?: string;
  efficiencyItems?: { value: string; label: string; desc: string }[];
  faqs?: { question: string; answer: string }[];
}

const icons = {
  barsRestaurants: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  nightclubs: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  breweries: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
      <path d="M9 12v6" />
      <path d="M13 12v6" />
      <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 5 0c.92 0 1.5-.5 2.5-.5s1.58.5 2.5.5a2.5 2.5 0 0 1 5 0c-.78 0-1.5-.5-2.5-.5S15 7.5 14 7.5z" />
      <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
    </svg>
  ),
  qsr: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z" />
      <path d="M3 14h18" />
      <path d="M4 18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
      <path d="M4 16h16" />
    </svg>
  ),
  cloudKitchens: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  pizzeriasCafes: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  ),
  fineDining: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8" />
      <path d="M12 15v7" />
      <path d="M12 15a7.5 7.5 0 0 0 7.5-7.5V3H4.5v4.5A7.5 7.5 0 0 0 12 15Z" />
      <path d="M4.5 8h15" />
    </svg>
  ),
  hybrid: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  ),
  foodTrucks: (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
};

export const industriesDb: Record<string, IndustryData> = {
  "bars-restaurants": {
    id: "bars-restaurants",
    shortLabel: "Bars & Restaurants",
    icon: icons.barsRestaurants,
    title: "Bars & Restaurants",
    subtitle: "Everything your bar or restaurant needs to run smoothly",
    description: "Running a bar or restaurant isn't easy. You have to manage orders, staff, inventory, payments, tables, and customers, all at the same time. Digitory brings everything together in one simple system. From billing and kitchen management to inventory and reports, you can manage your entire business with less effort and fewer mistakes. Spend less time solving problems and more time serving great food and drinks.",
    trustText: "Trusted by restaurants, bars, breweries, cafés, and pubs across India.",
    featuresTitle: "Built for busy bars and restaurants",
    features: [
      { title: "Manage busy hours with ease", desc: "When your restaurant gets crowded, every second matters. Digitory helps you manage orders, tables, and service smoothly, even during your busiest hours." },
      { title: "Faster billing and payments", desc: "Accept payments quickly and reduce billing mistakes. Automatic payment tracking also makes end-of-day reconciliation faster and easier." },
      { title: "Smart inventory management", desc: "Always know what's in stock. Track ingredients and liquor in real time, get low-stock alerts, and avoid running out of important items during service." },
      { title: "Better kitchen planning", desc: "Plan food preparation in advance and keep your kitchen organized. Reduce delays, improve teamwork, and serve every order on time." },
      { title: "Track liquor accurately", desc: "Monitor every bottle with detailed inventory tracking. Reduce wastage, prevent theft, and know exactly how much stock you have at any time." },
      { title: "Faster kitchen communication", desc: "Orders move instantly from the billing counter to the kitchen display. No paper tickets. No shouting. No confusion. Your kitchen can prepare orders faster and more accurately." },
      { title: "Keep recipes organized", desc: "Store all your recipes in one place. Track ingredients, maintain food quality, and make sure every chef prepares dishes the same way." },
      { title: "Easy table reservations", desc: "Accept table bookings online and manage walk-ins without confusion. Reduce waiting time and make the dining experience smoother for every guest." },
      { title: "Handle custom orders easily", desc: "Customers often ask for extra cheese, less spice, or no onions. Digitory lets your staff add special instructions so every order reaches the kitchen exactly as requested." },
      { title: "Live updates across your restaurant", desc: "Every team sees the latest information in real time. Orders, payments, inventory, and table status stay updated automatically, helping your restaurant run without delays." }
    ],
    whyChooseTitle: "Why choose Digitory?",
    whyChoose: [
      "One system for billing, inventory, kitchen, and reports",
      "Faster service during busy hours",
      "Better control over food and liquor inventory",
      "Easier table management and reservations",
      "Simple reports to track daily performance",
      "Built for Indian restaurants and bars"
    ],
    ctaBlock: {
      title: "Grow your business with Digitory",
      desc: "Whether you run a neighbourhood restaurant, a premium bar, or a multi-outlet chain, Digitory helps you save time, reduce mistakes, and improve customer service. With one connected system, your team works faster, your operations stay organized, and your guests enjoy a better dining experience."
    }
  },
  "nightclubs": {
    id: "nightclubs",
    shortLabel: "Nightclubs & Dance Floors",
    icon: icons.nightclubs,
    title: "Nightclubs & Dance Floors",
    subtitle: "Everything you need to run a better nightlife venue",
    description: "A great nightclub is more than good music. Behind every successful night are fast entries, quick bar service, smooth payments, and well-managed operations. Digitory helps you manage your nightclub with one connected system. From guest entry and bar billing to inventory and table bookings, everything works together to keep your nights running smoothly. Spend less time managing operations and more time creating unforgettable experiences.",
    trustText: "Trusted by bars, breweries, nightclubs, restaurants, and entertainment venues across India.",
    featuresTitle: "Built for busy nightlife venues",
    features: [
      { title: "Faster guest entry", desc: "Long queues can spoil the experience before the party even starts. Digitory helps you manage guest entry quickly with cashless check-ins and digital access, so guests spend less time waiting and more time enjoying the night." },
      { title: "Quick order taking", desc: "Your staff can take orders faster using mobile POS devices and QR ordering. Less waiting at the bar means happier guests and faster service throughout the venue." },
      { title: "Smart inventory management", desc: "Know exactly what's in stock throughout the night. Track liquor, mixers, and ingredients in real time, receive low-stock alerts, and avoid running out of popular drinks." },
      { title: "Consistent drink preparation", desc: "Store all cocktail recipes in one place. Help your bartenders prepare every drink the same way, every time, while keeping ingredient usage accurate." },
      { title: "Easy VIP table bookings", desc: "Manage reservations without confusion. Handle VIP tables, private bookings, and walk-in guests from one system while making the best use of your seating space." },
      { title: "Faster stock replenishment", desc: "Never run out of your best-selling drinks. Digitory helps you reorder stock quickly using smart inventory tracking and supplier management." },
      { title: "Faster payments", desc: "Accept digital payments quickly and reduce queues at the bar. Automatic payment tracking also makes end-of-day reconciliation simple and accurate." },
      { title: "Live updates across your venue", desc: "Every team stays connected in real time. Bar staff, managers, cash counters, and inventory teams always have the latest information, helping your venue run smoothly even on your busiest nights." }
    ],
    whyChooseTitle: "Why nightlife venues choose Digitory",
    whyChoose: [
      "One system for entry, billing, inventory, and reports",
      "Faster guest entry and quicker bar service",
      "Better control over liquor inventory",
      "Easy VIP table reservation management",
      "Faster digital payments and reconciliation",
      "Built for busy bars, pubs, and nightclubs"
    ],
    ctaBlock: {
      title: "Make every night run smoothly",
      desc: "Whether you manage a nightclub, dance floor, lounge, or entertainment venue, Digitory helps you serve guests faster, reduce operational errors, and stay in complete control. With one connected platform, your team works better, your service becomes faster, and your guests enjoy a seamless nightlife experience."
    }
  },
  "micro-breweries": {
    id: "micro-breweries",
    shortLabel: "Micro Breweries",
    icon: icons.breweries,
    title: "Micro Breweries",
    subtitle: "Everything you need to run a better brewery",
    description: "Brewing great beer takes skill. Running a successful brewery takes the right system. Digitory helps you manage your brewery from one place. Track ingredients, manage production, handle orders, control inventory, and serve guests faster without adding extra work. Spend less time managing operations and more time creating great beer and memorable experiences.",
    trustText: "Trusted by breweries, bars, restaurants, cafés, and pubs across India.",
    featuresTitle: "Built for modern breweries",
    features: [
      { title: "Faster service during busy hours", desc: "Whether it's a weekend rush or a brewery event, your team needs to move quickly. Digitory sends orders directly to the kitchen and service stations, helping your team prepare and serve orders without confusion." },
      { title: "Simple billing and payments", desc: "Accept payments quickly and reduce billing errors. Automatic payment tracking makes daily reconciliation faster and keeps your accounts accurate." },
      { title: "Smart inventory management", desc: "Always know what's available. Track grains, hops, yeast, ingredients, food items, and beverages in real time. Get low-stock alerts before supplies run out." },
      { title: "Better production planning", desc: "Plan every brewing batch with confidence. Schedule production, organize resources, and prepare in advance so every batch is made on time and with consistent quality." },
      { title: "Better liquor and inventory control", desc: "Track every keg, bottle, and ingredient accurately. Reduce wastage, prevent stock losses, and always know where your inventory stands." },
      { title: "Faster kitchen communication", desc: "Orders move instantly from the POS to the kitchen display. This reduces mistakes, improves communication, and helps your kitchen serve guests faster." },
      { title: "Keep recipes organized", desc: "Store all brewing recipes and food recipes in one place. Maintain consistency, track ingredient usage, and make sure every batch and every dish meets your quality standards." },
      { title: "Easy table reservations", desc: "Manage table bookings and walk-in guests from one system. Reduce waiting time and make every brewery visit smooth and enjoyable." },
      { title: "Handle custom orders easily", desc: "Guests often have special requests. Digitory lets your team add custom instructions to every order so nothing gets missed during preparation." },
      { title: "Live updates across your brewery", desc: "Every department stays connected with real-time information. Orders, inventory, production, billing, and reports update automatically, helping your brewery run more efficiently." },
      { title: "Faster stock replenishment", desc: "Never run out of your most-used ingredients. Digitory helps you reorder supplies at the right time, keeping production and service running without interruptions." }
    ],
    whyChooseTitle: "Why breweries choose Digitory",
    whyChoose: [
      "One system for billing, production, inventory, and reports",
      "Better control over brewing ingredients and stock",
      "Faster kitchen and service operations",
      "Easier table booking management",
      "Live reports for better business decisions",
      "Built for Indian breweries and taprooms"
    ],
    ctaBlock: {
      title: "Brew better. Manage smarter.",
      desc: "Whether you run a microbrewery, taproom, or brewery restaurant, Digitory helps you stay organized, reduce waste, and improve every part of your operation. With one connected platform, your team works faster, production stays on track, and your guests enjoy a better brewery experience every time."
    }
  },
  "qsr": {
    id: "qsr",
    shortLabel: "Quick Service Restaurants (QSR)",
    icon: icons.qsr,
    title: "Quick Service Restaurants (QSR)",
    subtitle: "Everything you need to run a faster QSR",
    description: "In a quick service restaurant, speed matters. Customers expect fast ordering, quick service, and accurate deliveries every time. Digitory helps you manage your entire QSR from one simple platform. Take orders faster, manage inventory, control recipes, and track your business in real time. Spend less time managing operations and more time serving customers.",
    trustText: "Trusted by restaurants, cafés, QSRs, cloud kitchens, and food chains across India.",
    featuresTitle: "Built for fast-moving QSRs",
    features: [
      { title: "Faster order management", desc: "Take orders quickly through mobile or desktop POS systems. Whether it's dine-in, takeaway, or delivery, every order reaches the right team without delays." },
      { title: "Keep recipes organized", desc: "Store all recipes in one place. Maintain consistent taste, track ingredient usage, and help your kitchen prepare every order the same way." },
      { title: "Smart inventory management", desc: "Track stock in real time and never run out of your best-selling items. Receive low-stock alerts and reorder ingredients before they affect your service." },
      { title: "Manage all orders in one place", desc: "Accept orders from your counter, QR codes, Swiggy, Zomato, and your own website through one system. No switching between different apps." },
      { title: "Easy menu and pricing updates", desc: "Update menu prices, offers, and promotions across all channels from one place. Keep pricing accurate and avoid confusion for customers and staff." },
      { title: "One POS for every sale", desc: "Handle customised meals, combo offers, and retail products from one billing system. Faster billing means shorter queues and happier customers." },
      { title: "Live reports and business insights", desc: "Track sales, orders, inventory, and outlet performance in real time. Use simple reports to understand what sells best and make better business decisions." }
    ],
    whyChooseTitle: "Why QSRs choose Digitory",
    whyChoose: [
      "One system for billing, inventory, recipes, and reports",
      "Faster order processing across all sales channels",
      "Better stock control with automated inventory tracking",
      "Easy menu and pricing management",
      "Real-time business reports",
      "Built for Indian QSRs and food chains"
    ],
    ctaBlock: {
      title: "Serve faster. Grow smarter.",
      desc: "Whether you run a burger outlet, pizza chain, sandwich shop, fried chicken brand, or any other quick service restaurant, Digitory helps you serve customers faster while keeping operations simple. With one connected platform, your team works more efficiently, your customers spend less time waiting, and your business is ready to grow."
    }
  },
  "cloud-kitchens": {
    id: "cloud-kitchens",
    shortLabel: "Cloud Kitchens",
    icon: icons.cloudKitchens,
    title: "Cloud Kitchens",
    subtitle: "Everything you need to run a smarter cloud kitchen",
    description: "Running a cloud kitchen is all about speed, accuracy, and efficiency. Managing orders from different delivery platforms, keeping inventory updated, and ensuring every order reaches customers on time can be challenging. Digitory brings everything together in one connected platform. Manage orders, inventory, production, recipes, and reports without switching between multiple systems. Spend less time managing operations and more time growing your business.",
    trustText: "Trusted by cloud kitchens, restaurants, cafés, QSRs, and food brands across India.",
    featuresTitle: "Built for modern cloud kitchens",
    features: [
      { title: "Better production planning", desc: "Plan your kitchen operations in advance. Organize batches, manage resources, and prepare for busy hours so your kitchen can handle more orders without delays." },
      { title: "Manage all delivery orders in one place", desc: "Receive orders from Swiggy, Zomato, your website, QR ordering, and other platforms in one system. No more switching between different apps to manage incoming orders." },
      { title: "Faster kitchen operations", desc: "Orders move directly from the POS to the Kitchen Display System (KDS). Your kitchen team receives every order instantly, reducing mistakes and helping food reach customers faster." },
      { title: "Easy menu and pricing updates", desc: "Update menu prices, offers, and promotions from one place. Keep pricing consistent across every delivery platform and avoid manual changes." },
      { title: "Smart inventory management", desc: "Track ingredients in real time and receive low-stock alerts before items run out. Automatic inventory updates help reduce waste and prevent stock shortages." },
      { title: "Live reports and business insights", desc: "Monitor sales, orders, inventory, and kitchen performance from one dashboard. Use real-time reports to understand your business and make decisions." },
      { title: "Better purchase control", desc: "Manage purchase approvals with ease. Reduce unnecessary spending, prevent unauthorized purchases, and keep your inventory under control." },
      { title: "Real-time order updates", desc: "Every order is updated instantly across your POS, kitchen, and reports. Your entire team stays in sync, helping your kitchen work faster and with fewer errors." },
      { title: "Keep recipes organized", desc: "Store all recipes in one place and standardize food preparation. Track ingredient usage, maintain food quality, and ensure every order meets the same standards." }
    ],
    whyChooseTitle: "Why cloud kitchens choose Digitory",
    whyChoose: [
      "One system for orders, inventory, recipes, and reports",
      "Manage all delivery platforms from one dashboard",
      "Faster kitchen communication with KDS",
      "Better production and inventory planning",
      "Live reports for smarter business decisions",
      "Built for Indian cloud kitchens"
    ],
    ctaBlock: {
      title: "Grow your cloud kitchen with confidence",
      desc: "Whether you run one delivery kitchen or multiple cloud kitchen brands, Digitory helps you stay organized, reduce mistakes, and improve every stage of your operation. With one connected platform, your team works faster, orders are managed more efficiently, and your customers receive a better experience every time."
    }
  },
  "pizzerias-cafes": {
    id: "pizzerias-cafes",
    shortLabel: "Pizzerias, cafés & ice cream",
    icon: icons.pizzeriasCafes,
    title: "Pizzerias, cafés & ice cream parlours",
    subtitle: "Built for businesses that serve smiles every day",
    description: "Whether you run a pizza place, a café, or an ice cream shop, Digitory helps you manage your daily operations with less effort. From taking orders and managing recipes to tracking stock and sales, everything works together in one simple system. You focus on your food. We'll help with the rest.",
    trustText: "Trusted by cafés, ice cream parlours, and pizzerias across India.",
    featuresTitle: "Everything you need to serve smiles",
    features: [
      { title: "Easy order customization", desc: "Let customers add extra toppings, choose flavours, or make special requests without slowing down your staff.", linkText: "Learn more about Multi-Channel POS", linkHref: "/solutions/pos" },
      { title: "Live order tracking", desc: "Customers can see when their order is being prepared and when it's ready, reducing unnecessary questions and improving their experience.", linkText: "Learn more about Kitchen Display System (KDS)", linkHref: "/solutions/kds" },
      { title: "Kitchen Display System (KDS)", desc: "Orders go straight to the kitchen screen, helping your team prepare food faster while reducing mistakes.", linkText: "Learn more about Kitchen Display System (KDS)", linkHref: "/solutions/kds" },
      { title: "Recipe management", desc: "Store all your recipes in one place so every pizza, coffee, or dessert tastes the same, no matter who prepares it.", linkText: "Learn more about Recipe Management", linkHref: "/solutions/recipe-management" },
      { title: "Smart inventory management", desc: "Track ingredient usage in real time and receive low-stock alerts before items run out.", linkText: "Learn more about Automated Inventory Management", linkHref: "/solutions/inventory" },
      { title: "Multi-channel ordering", desc: "Bring together orders from your counter, QR codes, Swiggy, Zomato, and other platforms into one dashboard.", linkText: "Learn more about Multi-Channel POS", linkHref: "/solutions/pos" },
      { title: "Flexible pricing", desc: "Schedule offers, seasonal prices, and discounts without making manual changes every day.", linkText: "Learn more about Menu Engineering", linkHref: "/solutions/menu-engineering" },
      { title: "Faster billing", desc: "Bill custom orders and ready-to-sell products from the same POS, making checkout quick and simple.", linkText: "Learn more about Multi-Channel POS", linkHref: "/solutions/pos" },
      { title: "Reports and analytics", desc: "View sales, popular items, busy hours, and business performance with easy-to-read reports.", linkText: "Learn more about Analytics & Reports", linkHref: "/solutions/reports" }
    ],
    ctaBlock: {
      title: "Let's grow your business together",
      desc: "Whether you're running one outlet or planning to expand, Digitory gives you the tools to serve customers faster, manage operations better, and grow with confidence."
    }
  },
  "casual-dining": {
    id: "casual-dining",
    shortLabel: "Casual & fine dining",
    icon: icons.fineDining,
    title: "Casual & fine dining",
    subtitle: "Deliver a better dining experience every day",
    description: "Great food deserves great service. Digitory helps you manage reservations, kitchen operations, billing, inventory, and reports from one simple platform. Spend less time handling daily tasks and more time creating memorable dining experiences.",
    trustText: "Trusted by premium restaurants, dining halls, and fine dining outlets.",
    featuresTitle: "Deliver better service with premium tools",
    features: [
      { title: "Easy order customization", desc: "Add special instructions, dietary preferences, and custom requests directly to every order, so your kitchen gets it right every time.", linkText: "Learn more about Multi-Channel POS", linkHref: "/solutions/pos" },
      { title: "Smart table management", desc: "Assign, transfer, and track tables in real time to reduce waiting and keep service running smoothly.", linkText: "Learn more about Table Reservation", linkHref: "/solutions/booking" },
      { title: "Reports and analytics", desc: "See your sales, popular dishes, customer trends, and outlet performance in easy-to-understand reports.", linkText: "Learn more about Analytics & Reports", linkHref: "/solutions/reports" },
      { title: "Table booking system", desc: "Manage bookings, walk-ins, and table availability from one place to give every guest a smooth arrival experience.", linkText: "Learn more about Table Reservation", linkHref: "/solutions/booking" },
      { title: "Kitchen Display System (KDS)", desc: "Send orders directly to the kitchen, reduce communication mistakes, and serve meals faster.", linkText: "Learn more about Kitchen Display System (KDS)", linkHref: "/solutions/kds" },
      { title: "Recipe management", desc: "Store recipes in one place so every chef follows the same ingredients, portions, and preparation steps.", linkText: "Learn more about Recipe Management", linkHref: "/solutions/recipe-management" },
      { title: "Automatic payment reconciliation", desc: "Match payments automatically at the end of the day, reducing manual work and billing errors.", linkText: "Learn more about Cashless Event & Entry Management", linkHref: "/solutions/event-management" },
      { title: "Smart inventory management", desc: "Track stock in real time, receive low-stock alerts, and make sure your kitchen always has the ingredients it needs.", linkText: "Learn more about Automated Inventory Management", linkHref: "/solutions/inventory" }
    ],
    ctaBlock: {
      title: "Let's grow your restaurant together",
      desc: "Whether you run a neighbourhood restaurant or a premium dining destination, Digitory helps you deliver service, manage operations with confidence, and grow your business."
    }
  },
  "hybrid": {
    id: "hybrid",
    shortLabel: "Restaurant & retail hybrid",
    icon: icons.hybrid,
    title: "Restaurant & retail hybrid",
    subtitle: "Manage your restaurant and retail business from one place",
    description: "If your business serves food and also sells products, Digitory helps you manage both without switching between different systems. Track sales, inventory, billing, and customer orders from one easy-to-use platform.",
    trustText: "Trusted by bakeries, gourmet retail shops, and hybrid food outlets.",
    featuresTitle: "Manage dual-business operations smoothly",
    features: [
      { title: "Integrated POS", desc: "Manage restaurant orders and retail sales together. Bill food, beverages, and retail products from the same system with complete accuracy.", linkText: "Learn more about Multi-Channel POS", linkHref: "/solutions/pos" },
      { title: "Smart inventory tracking", desc: "Monitor ingredients and retail products in real time. Get stock updates automatically so you never run out of important items.", linkText: "Learn more about Automated Inventory Management", linkHref: "/solutions/inventory" },
      { title: "Recipe management", desc: "Store recipes in one place and standardize preparation across your kitchen for consistent taste and quality.", linkText: "Learn more about Recipe Management", linkHref: "/solutions/recipe-management" },
      { title: "Flexible pricing", desc: "Schedule price changes for happy hours, seasonal offers, or special events so prices update automatically when needed.", linkText: "Learn more about Menu Engineering", linkHref: "/solutions/menu-engineering" },
      { title: "Reports and analytics", desc: "Track restaurant sales, retail sales, customer trends, and business performance with clear, real-time reports.", linkText: "Learn more about Analytics & Reports", linkHref: "/solutions/reports" },
      { title: "Table reservation system", desc: "Manage reservations, walk-ins, and table availability from one dashboard to provide a smooth dining experience.", linkText: "Learn more about Table Reservation", linkHref: "/solutions/booking" }
    ],
    ctaBlock: {
      title: "Grow both sides of your business",
      desc: "Whether you run a bakery with a café, a brewery with a retail store, or any food and retail combination, Digitory helps you manage everything more efficiently from one platform."
    }
  },
  "food-trucks": {
    id: "food-trucks",
    shortLabel: "Pop-ups & food trucks",
    icon: icons.foodTrucks,
    title: "Pop-up restaurants & food trucks",
    subtitle: "Run your mobile food business with ease",
    description: "Whether you operate a food truck or a pop-up restaurant, Digitory helps you stay organized wherever you serve. Manage orders, track inventory, accept payments, and monitor sales from one simple platform.",
    trustText: "Trusted by food trucks, festival pop-ups, and mobile kitchens.",
    featuresTitle: "Everything your mobile kitchen needs",
    features: [
      { title: "Mobile POS", desc: "Use a phone or tablet to take orders quickly and bill customers with ease, even during busy hours.", linkText: "Learn more about Multi-Channel POS", linkHref: "/solutions/pos" },
      { title: "Smart inventory management", desc: "Track stock in real time and get alerts before ingredients run low, so you're always ready to serve.", linkText: "Learn more about Automated Inventory Management", linkHref: "/solutions/inventory" },
      { title: "Flexible pricing", desc: "Schedule prices for special events, festivals, or different locations so your menu stays updated automatically.", linkText: "Learn more about Menu Engineering", linkHref: "/solutions/menu-engineering" },
      { title: "Contactless payments", desc: "Let customers pay using cards, UPI, or digital wallets for a quicker and smoother checkout experience.", linkText: "Learn more about Cashless Event & Entry Management", linkHref: "/solutions/event-management" },
      { title: "Kitchen Display System (KDS)", desc: "Send orders directly to the kitchen screen to reduce mistakes and speed up food preparation.", linkText: "Learn more about Kitchen Display System (KDS)", linkHref: "/solutions/kds" },
      { title: "Recipe management", desc: "Store recipes in one place so every meal is prepared the same way, no matter who is cooking.", linkText: "Learn more about Recipe Management", linkHref: "/solutions/recipe-management" },
      { title: "Reports and analytics", desc: "Monitor sales, popular items, and daily performance with simple reports that help you make better business decisions.", linkText: "Learn more about Analytics & Reports", linkHref: "/solutions/reports" }
    ],
    ctaBlock: {
      title: "Grow your business wherever you go",
      desc: "From local food trucks to travelling pop-up kitchens, Digitory gives you the tools to serve faster, manage better, and grow with confidence."
    }
  }
};
