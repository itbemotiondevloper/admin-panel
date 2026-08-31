import React from 'react';

export interface WhyChooseItem {
  title: string;
  desc: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  speed?: string;
  accuracy?: string;
}

export interface BusinessTypeItem {
  name: string;
  desc: string;
  icon?: React.ReactNode;
}

export interface IntegrationCategory {
  title: string;
  items: string;
}

export interface SolutionData {
  id: string;
  slug?: string;
  category?: string;
  shortLabel: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  ctaText: string;
  trustText: string;
  whyChoose: WhyChooseItem[];
  featuresTitle: string;
  features: FeatureItem[];
  businessTypes: BusinessTypeItem[];
  integrations?: IntegrationCategory[];
  extraGrowth?: {
    title: string;
    desc: string;
  };
  extraOwnersChoice?: {
    title: string;
    desc: string;
  };
  supportItems?: string[];
  securityItems?: string[];
  opsTitle?: string;
  opsParagraph?: string;
  opsHighlights?: string;
  ctaBlock: {
    title: string;
    desc: string;
  };

  layerTitle?: string;
  layerDesc?: string;
  metricsTitle?: string;
  metricsItems?: { value: string; label: string; desc: string }[];
  faqs?: { question: string; answer: string }[];
  businessTypesTitle?: string;
  businessTypesDesc?: string;
}

const icons = {
  pos: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  kds: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  ),
  inventory: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  controlSystem: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
  reports: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0017.75 3.75H6.25A2.25 2.25 0 004 6v12A2.25 2.25 0 006.25 20.25z" />
    </svg>
  ),
  eventManagement: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  booking: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  production: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2h-2" />
    </svg>
  ),
  menu: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  recipe: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  loyalty: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
};

export const solutionsDb: Record<string, SolutionData> = {
  pos: {
    id: "pos",
    shortLabel: "Multi-channel integrated POS",
    icon: icons.pos,
    badge: "01 • Multi-channel integrated POS",
    title: "Multi-channel integrated POS",
    subtitle: "Restaurant POS software built for real restaurant work",
    description: "Digitory helps restaurants, cafés, bars, breweries, and cloud kitchens manage their daily operations with one simple system. Take orders, create bills, track inventory, manage staff, and view business reports, all from one platform. Whether you have one outlet or many, Digitory helps you save time, reduce mistakes, and run your business with confidence.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, and breweries across India.",
    whyChoose: [
      {
        title: "Built for Indian restaurants",
        desc: "Running a restaurant in India comes with unique challenges. Online orders, GST, busy weekends, multiple outlets, and changing menus can quickly become difficult to manage. Digitory is designed to handle these everyday challenges so your team can work faster and more efficiently."
      },
      {
        title: "Everything in one place",
        desc: "There's no need for separate software for billing, inventory, online orders, or reports. Digitory brings everything together into one easy-to-use system. Fewer app switches mean fewer mistakes and more time for your customers."
      },
      {
        title: "Manage your business from anywhere",
        desc: "Keep an eye on your restaurant even when you're away. View sales, orders, inventory, and reports in real time from your phone or computer. No matter where you are, you'll always know how your business is performing."
      }
    ],
    featuresTitle: "Everything you need to run your restaurant",
    features: [
      {
        title: "Smart billing and order management",
        desc: "Take orders for dine-in, takeaway, delivery, and online platforms from one screen. Split bills, merge tables, apply discounts, and complete billing quickly."
      },
      {
        title: "Easy menu management",
        desc: "Update your menu once and apply the changes across all your outlets and online ordering platforms. You can also schedule offers, happy hours, and special menus in advance."
      },
      {
        title: "Inventory made simple",
        desc: "Track ingredients automatically whenever an order is placed. Get low-stock alerts, reduce food waste, and always know what needs to be reordered."
      },
      {
        title: "Staff management",
        desc: "Track staff attendance, sales performance, work shifts, and user permissions from one dashboard. Keep your team organised and your operations running smoothly."
      },
      {
        title: "Connect with the tools you already use",
        desc: "Digitory works with many of the platforms restaurants use every day, including Swiggy, Zomato, QR code ordering, Kitchen Display System (KDS), Self-order kiosks, Delivery management systems, CRM and ERP software."
      },
      {
        title: "Reports that help you make better decisions",
        desc: "See what's selling the most, monitor sales trends, track inventory, and compare outlet performance with easy-to-read reports. Instead of guessing, you can make decisions based on real numbers."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Manage tables, route kitchen orders, customise bills, and collect customer feedback." },
      { name: "Bars", desc: "Manage bar tabs, track liquor inventory, monitor recipes, and improve service speed." },
      { name: "Breweries", desc: "Track brewing batches, manage tap sales, and reward loyal customers with custom loyalty programs." },
      { name: "Pubs", desc: "Run happy hour offers, manage promotions, reward regular customers, and handle event billing with ease." },
      { name: "Cafés", desc: "Handle busy rush hours with fast billing, combo offers, mobile POS, and quick counter service." },
      { name: "Bakeries, Dessert Shops & Ice Cream Parlours", desc: "Manage item-wise or weight-based billing, monitor expiry dates, and increase sales with smart product recommendations." }
    ],
    extraGrowth: {
      title: "Grow your business with confidence",
      desc: "Whether you have one outlet or a growing chain, Digitory grows with you. Manage all your locations from one dashboard. Keep menus consistent, update prices, manage franchises, and control outlet-specific offers with ease."
    },
    integrations: [
      { title: "Accounting", items: "Tally, Zoho Books, QuickBooks" },
      { title: "Payments", items: "Razorpay, Paytm, Google Pay, UPI, Credit Cards" },
      { title: "Online Ordering", items: "Swiggy, Zomato, DotPe, Thrive, and more" },
      { title: "Customer Engagement", items: "WhatsApp automation, SMS campaigns, loyalty programs, and CRM tools" }
    ],
    extraOwnersChoice: {
      title: "Why restaurant owners choose Digitory",
      desc: "Restaurants using Digitory have reduced food waste, improved inventory control, expanded to multiple locations more easily, and simplified their daily operations. Our goal is simple: help restaurant owners spend less time solving problems and more time growing their business."
    },
    supportItems: [
      "Training for your team",
      "Quick onboarding",
      "Phone, chat, and email support",
      "Compatibility with printers, cash drawers, and POS hardware",
      "Custom dashboards for owners, managers, accountants, chefs, and staff"
    ],
    securityItems: [
      "Secure cloud storage",
      "Automatic backups",
      "GST-compliant billing and reports",
      "User access controls",
      "Activity logs for better security"
    ],
    ctaBlock: {
      title: "Ready to simplify your restaurant operations?",
      desc: "Digitory helps restaurants save time, reduce manual work, and stay in control of every part of the business. From neighbourhood cafés to multi-outlet restaurant chains, restaurants across India trust Digitory to help them grow."
    }
  },
  kds: {
    id: "kds",
    shortLabel: "Kitchen display system",
    icon: icons.kds,
    badge: "02 • Kitchen display system",
    title: "Kitchen display system",
    subtitle: "Kitchen Display System (KDS) for faster, smarter kitchens",
    description: "A busy kitchen needs more than skilled chefs. It needs a system that keeps every order organised. Digitory's Kitchen Display System (KDS) sends orders directly from the billing counter to the kitchen screen in real time. No paper tickets, no confusion, and no missed orders. Whether you run a restaurant, café, bar, brewery, or cloud kitchen, Digitory helps your team prepare food faster and serve customers on time.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, and breweries across India.",
    whyChoose: [
      {
        title: "Orders reach the kitchen instantly",
        desc: "The moment an order is placed, it appears on the kitchen screen. Your chefs can start preparing food immediately without waiting for printed tickets."
      },
      {
        title: "Fewer mistakes",
        desc: "Digital orders are clear and easy to read. Special instructions like \"less spicy,\" \"no onions,\" or allergy requests are displayed clearly, helping your team prepare every order correctly."
      },
      {
        title: "Live updates for everyone",
        desc: "The front desk and kitchen stay connected. As an order moves from preparation to serving, everyone sees the latest status in real time."
      },
      {
        title: "Faster kitchen operations",
        desc: "Similar orders are grouped together, making it easier for chefs to prepare multiple dishes at once. This saves time, especially during lunch and dinner rush."
      }
    ],
    featuresTitle: "Why every modern restaurant needs a KDS",
    features: [
      {
        title: "No more lost paper tickets",
        desc: "Paper KOTs can get misplaced, damaged, or forgotten during busy hours. With Digitory KDS, every order appears instantly on the kitchen screen, so nothing gets missed."
      },
      {
        title: "Faster preparation and quicker service",
        desc: "Chefs can clearly see which orders need to be prepared first. This helps reduce waiting time and allows tables to be served faster."
      },
      {
        title: "Save money and reduce waste",
        desc: "By replacing printed kitchen tickets with digital screens, restaurants can reduce paper usage and lower printing costs. It's better for your business and better for the environment."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Manage multiple kitchen stations, course timing, and large order volumes with ease." },
      { name: "Cafés", desc: "Prepare beverages and food together while keeping every order organised during peak hours." },
      { name: "Bars", desc: "Separate drink orders from food orders so every station knows exactly what to prepare." },
      { name: "Breweries", desc: "Send different parts of the same order to the right kitchen stations, whether it's the grill, pizza oven, or bar." },
      { name: "Pubs", desc: "Handle busy evenings and happy hours without overwhelming your kitchen. The system helps balance incoming orders and reduce delays." },
      { name: "Cloud Kitchens", desc: "Manage delivery orders from multiple platforms in one place and keep preparation running smoothly." }
    ],
    extraGrowth: {
      title: "Better insights for better decisions",
      desc: "Digitory helps you understand how your kitchen performs every day. You can find dishes that take the longest to prepare, identify your busiest hours, plan staff schedules more efficiently, and improve menu performance using real kitchen data."
    },
    integrations: [
      { title: "Sync Modules", items: "Digitory POS, Swiggy, Zomato, ONDC, Inventory Management, ERP Software, Accounting Systems" }
    ],
    extraOwnersChoice: {
      title: "What makes Digitory KDS different?",
      desc: "Digitory is built for the way Indian restaurants actually work. From weekend rushes to online delivery spikes, it helps kitchens stay organised even during the busiest hours. It supports instant order updates from POS, QR ordering, Swiggy, and Zomato, along with batch cooking, clear special instructions, prep time tracking, off-line reliability, and kitchen performance reports."
    },
    ctaBlock: {
      title: "Make your kitchen faster and more organised",
      desc: "A great kitchen isn't just about cooking good food. It's about preparing every order accurately, reducing delays, and keeping your team working together. Digitory's Kitchen Display System helps restaurants do exactly that, every single day."
    }
  },
  inventory: {
    id: "inventory",
    shortLabel: "Automated inventory management",
    icon: icons.inventory,
    badge: "03 • Automated inventory management",
    title: "Automated inventory management",
    subtitle: "Automated inventory management for restaurants",
    description: "Good food starts with good inventory management. If you don't know what you have in stock, you can end up wasting food, running out of ingredients, or spending more than you should. Digitory's automated Inventory Management System helps you track every ingredient automatically, so you always know what's available and what needs to be reordered.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "Why inventory management matters",
        desc: "Managing inventory manually takes time and often leads to mistakes. Stock can run out unexpectedly, food can expire before it's used, ingredients can be over-ordered. All of this affects your profits. Digitory helps you avoid these problems by keeping your inventory updated in real time."
      },
      {
        title: "Automatic inventory tracking",
        desc: "Every time an order is billed, the required ingredients are automatically deducted from your inventory. No manual updates. No guesswork. Just accurate stock levels at all times."
      },
      {
        title: "Know what's in stock",
        desc: "See your inventory anytime, from anywhere. Check what's available, what's running low, and what needs to be ordered from one simple dashboard."
      },
      {
        title: "Reduce food waste",
        desc: "Track expiry dates and monitor ingredient usage so you can use stock before it goes to waste. Buying the right quantity at the right time helps reduce unnecessary losses."
      },
      {
        title: "Never run out of important ingredients",
        desc: "Digitory sends low-stock alerts before ingredients finish. The system also recommends when it's time to reorder based on your daily usage."
      }
    ],
    featuresTitle: "Better control over every ingredient",
    features: [
      {
        title: "Recipe connection",
        desc: "Every recipe is connected to your inventory. When you sell a pizza, coffee, dosa, or cocktail, the exact ingredients used are updated automatically. This helps you track ingredient usage, maintain consistent portions, and understand food costs."
      },
      {
        title: "Manage multiple outlets with ease",
        desc: "Whether you have one restaurant or many locations, Digitory keeps all your inventory connected. View stock across all outlets, transfer inventory between locations, track your central kitchen, and manage supplier deliveries."
      },
      {
        title: "Reduce stock loss and theft",
        desc: "Inventory losses don't always happen because of wastage. Digitory helps you spot unusual stock differences, compare sales with inventory usage, and control who can access inventory data."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Track ingredients automatically, monitor suppliers, and manage changing menus with confidence." },
      { name: "Bars", desc: "Track liquor by volume, monitor bottle usage, record breakages, and manage stock more accurately." },
      { name: "Breweries", desc: "Manage raw materials, brewing batches, packaging stock, and production planning from one system." },
      { name: "Cafés", desc: "Track fast-moving ingredients, connect with your central kitchen, and stay prepared for busy hours." },
      { name: "Cloud Kitchens", desc: "Manage inventory across multiple brands and delivery locations while keeping stock updated in real time." }
    ],
    extraGrowth: {
      title: "Make better business decisions",
      desc: "Digitory gives you simple reports that help you understand your inventory. See your most-used ingredients, fast-moving stock, slow-moving stock, food wastage, purchase history, stock value, and inventory trends to make smarter purchasing decisions."
    },
    extraOwnersChoice: {
      title: "Easy to use. Easy to grow with.",
      desc: "Whether you're opening your first café or managing a growing restaurant chain, Digitory grows with your business. As your operations become bigger, your inventory stays organised and easy to manage."
    },
    ctaBlock: {
      title: "Spend less time counting stock",
      desc: "Inventory shouldn't be stressful. Digitory helps you reduce manual work, lower food waste, avoid stock shortages, and keep every ingredient under control. That means you can spend less time managing inventory and more time running your restaurant."
    }
  },
  "control-system": {
    id: "control-system",
    shortLabel: "Food & liquor control system",
    icon: icons.controlSystem,
    badge: "04 • Food & liquor control system",
    title: "Food & liquor control system",
    subtitle: "Managing food and liquor stock shouldn't be difficult",
    description: "Digitory's Food & Liquor Control System helps you keep track of every ingredient and every bottle with accuracy. Know what you have in stock, reduce waste, and make better business decisions with real-time updates. Whether you run a restaurant, bar, brewery, pub, or café, Digitory helps you stay in control every day.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, bars, breweries, and cafés across India.",
    whyChoose: [
      {
        title: "Track every bottle and ingredient accurately",
        desc: "Know exactly how much stock you have at any time. Track food ingredients and liquor inventory with precision to reduce losses and avoid costly mistakes."
      },
      {
        title: "See live inventory updates",
        desc: "Your inventory updates automatically as items are sold. You always know what's available, what's running low, and what needs to be reordered."
      },
      {
        title: "Save time with automatic reports",
        desc: "No more manual stock calculations. Digitory creates inventory reports automatically, helping you understand your stock without spending hours on paperwork."
      },
      {
        title: "Keep complete inventory records",
        desc: "Every stock movement is recorded automatically. This makes it easy to check inventory history, review transactions, and stay prepared for audits whenever needed."
      }
    ],
    featuresTitle: "Everything you need to manage food and liquor inventory",
    features: [
      {
        title: "Accurate liquor tracking",
        desc: "Track liquor inventory with greater accuracy to reduce stock differences and improve control over your bar. Know exactly what's available and identify losses."
      },
      {
        title: "Real-time stock management",
        desc: "Every sale updates your inventory instantly. This helps your team restock on time, avoid shortages, and keep service running smoothly."
      },
      {
        title: "Automatic inventory reports",
        desc: "Get clear reports on stock levels, usage, purchases, and inventory movement. Spend less time creating reports."
      },
      {
        title: "Better inventory control",
        desc: "Monitor every item coming in and going out. With complete inventory records, it's easier to find errors, prevent losses, and keep operations organised."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Keep ingredients organised, reduce food waste, and manage inventory with confidence." },
      { name: "Bars", desc: "Track liquor stock accurately, reduce bottle losses, and improve inventory control." },
      { name: "Breweries", desc: "Manage raw materials, finished products, and daily stock movement from one system." },
      { name: "Pubs", desc: "Handle busy service hours while keeping food and liquor inventory updated automatically." },
      { name: "Cafés", desc: "Track fast-moving ingredients and always know what's available during peak hours." }
    ],
    extraGrowth: {
      title: "How Digitory helps your business",
      desc: "Reduce food and liquor waste, improve profits, save time, and stay organised. Smarter decisions are made easy using simple reports on stock usage, buying patterns, and sales performance."
    },
    extraOwnersChoice: {
      title: "Easy to use. Easy to grow with.",
      desc: "Whether you have one outlet or a growing chain, Digitory helps you manage inventory without making things more complicated. As your business grows, your stock stays organised, accurate, and easy to manage from one place."
    },
    ctaBlock: {
      title: "Take control of your inventory",
      desc: "When you know exactly what's happening in your kitchen and bar, running your business becomes much easier. Digitory's Food & Liquor Control System helps you reduce waste, improve accuracy, save time, and keep your inventory under control every day."
    }
  },
  reports: {
    id: "reports",
    shortLabel: "Analytics & reports",
    icon: icons.reports,
    badge: "05 • Analytics & reports",
    title: "Analytics & reports",
    subtitle: "Dashboard & reports system for smarter restaurant decisions",
    description: "Sales, orders, inventory, customer visits, and staff performance all tell you how your business is doing. Digitory brings all this information together in one place, so you can understand your restaurant better and make smarter decisions. Whether you have one outlet or many, Digitory gives you the insights you need to grow your business.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "See your business in one dashboard",
        desc: "View your sales, orders, inventory, and other important numbers from one simple dashboard. Instead of checking different reports, everything you need is available in one place."
      },
      {
        title: "Get live updates",
        desc: "Your dashboard updates in real time. Check sales, orders, and restaurant performance as they happen, so you can respond quickly whenever needed."
      },
      {
        title: "Reports that fit your business",
        desc: "Every restaurant is different. Digitory lets you create reports based on the information that matters most to your business."
      },
      {
        title: "Compare all your outlets",
        desc: "Running multiple locations becomes much easier. View each outlet's performance from one dashboard and quickly identify which locations are doing well."
      }
    ],
    featuresTitle: "Understand your restaurant better",
    features: [
      {
        title: "Track your sales",
        desc: "See how much your restaurant earns every day, week, or month. Understand which days are busiest and monitor your business growth over time."
      },
      {
        title: "Learn how customers spend",
        desc: "Find out the average amount customers spend on each visit and on every order. This helps you create better offers and improve your menu."
      },
      {
        title: "Understand what sells best",
        desc: "See which dishes and drinks are your top performers. Use this information to improve your menu and focus on items that bring in more revenue."
      },
      {
        title: "Monitor taxes and revenue",
        desc: "View your total sales, taxes, service charges, and overall revenue in clear, easy-to-read reports. Everything is organised."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Track sales, customer preferences, and staff performance to improve daily operations." },
      { name: "Quick Service Restaurants (QSRs)", desc: "Monitor high-volume sales, improve pricing, and keep inventory under control." },
      { name: "Cafés", desc: "Understand customer buying habits, track popular products, and build stronger customer loyalty." },
      { name: "Bars & Pubs", desc: "Monitor food and liquor sales, identify peak business hours, and improve inventory planning." },
      { name: "Multi-outlet restaurant chains", desc: "Manage reports from all your outlets in one place and compare performance across locations with ease." }
    ],
    extraGrowth: {
      title: "Make better business decisions",
      desc: "Digitory's reports help you answer important questions like: Which dishes sell the most? Which outlet performs best? When are your busiest hours? Which products generate the highest revenue? How is your inventory performing? How are your staff members performing? With the right information, making decisions becomes much easier."
    },
    extraOwnersChoice: {
      title: "Grow with confidence",
      desc: "Whether you're opening your first restaurant or managing a growing chain, Digitory grows with your business. Your reports stay organised, your data stays connected, and your team always has the information they need."
    },
    ctaBlock: {
      title: "Turn your data into better decisions",
      desc: "Running a successful restaurant isn't about guessing. It's about understanding what's working and improving what isn't. Digitory's Analytics & Reporting System gives you clear insights into your business, helping you increase sales, improve efficiency, and make better decisions every day."
    }
  },
  "event-management": {
    id: "event-management",
    shortLabel: "Cashless Event & Entry Management System",
    icon: icons.eventManagement,
    badge: "06 • Cashless Event & Entry System",
    title: "Cashless Event & Entry Management System",
    subtitle: "Managing events should be simple, even when the crowd is large",
    description: "Digitory's Cashless Event & Entry Management System helps you manage guest entry, payments, registrations, and event operations from one simple platform. Guests can enter quickly, pay digitally, and enjoy a smooth event experience without long queues. Whether you're hosting a private party, a live concert, a brewery event, or a nightclub night, Digitory helps your team stay organised from start to finish.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, bars, breweries, cafés, and event venues across India.",
    whyChoose: [
      {
        title: "Fast and secure check-ins",
        desc: "Guests can check in quickly using RFID cards, NFC bands, QR codes, or digital passes. This helps reduce waiting time and keeps entry moving smoothly."
      },
      {
        title: "Quick cashless payments",
        desc: "Guests can make payments without carrying cash. Digital payments are faster, safer, and help your team serve customers more efficiently."
      },
      {
        title: "Easy registration",
        desc: "Register guests in just a few steps. Reduce manual work, avoid errors, and make the entry process simple for both your staff and your guests."
      },
      {
        title: "Better crowd management",
        desc: "Manage large crowds without confusion. Track guest entry, monitor event capacity, and keep everything organised from one dashboard."
      }
    ],
    featuresTitle: "Everything you need to run successful events",
    features: [
      {
        title: "Contactless guest entry",
        desc: "Allow guests to enter the event quickly with secure digital check-ins. No paper tickets. No unnecessary delays."
      },
      {
        title: "Smooth cashless payments",
        desc: "Guests can pay for food, drinks, and other purchases using digital payment methods. This reduces cash handling and speeds up service across the venue."
      },
      {
        title: "Faster event operations",
        desc: "Digitory connects guest registration, entry management, billing, and payments into one system. Your team spends less time managing operations and more time serving guests."
      },
      {
        title: "Better bar and counter management",
        desc: "Handle busy food and beverage counters with faster billing and quicker order processing. Serve more guests while reducing waiting time during peak hours."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Manage birthday parties, anniversaries, corporate events, and private functions with ease." },
      { name: "Bars & Nightclubs", desc: "Control guest entry, manage busy crowds, and handle cashless payments throughout the night." },
      { name: "Cafés", desc: "Host workshops, live music events, and pop-up experiences with faster registrations and digital payments." },
      { name: "Multi-outlet businesses", desc: "Manage events across different locations while viewing reports and performance from one dashboard." }
    ],
    extraGrowth: {
      title: "Benefits for your business",
      desc: "Improve the guest experience with shorter queues, run events more efficiently to reduce manual work, increase event revenue through quick payments, and track guest activity via reports to make smarter future event planning decisions."
    },
    extraOwnersChoice: {
      title: "Easy to connect with your existing systems",
      desc: "Digitory works with your existing POS system, payment gateways, loyalty programs, and ticketing platforms. Everything stays connected, making event management simple for your team."
    },
    ctaBlock: {
      title: "Make every event smooth from start to finish",
      desc: "A successful event starts with a great guest experience. When entry is fast, payments are easy, and your team stays organised, everyone enjoys the event more. Digitory's Cashless Event & Entry Management System helps you manage events with confidence while giving every guest a faster and smoother experience."
    }
  },
  booking: {
    id: "booking",
    shortLabel: "Table Booking & Reservation",
    icon: icons.booking,
    badge: "07 • Table Booking & Reservation System",
    title: "Table Booking & Reservation System",
    subtitle: "A great dining experience starts before your guests even walk through the door",
    description: "Digitory's Table Booking & Reservation System helps you manage reservations, walk-ins, and table availability from one place. Seat guests faster, reduce waiting time, and make better use of every table in your restaurant. Whether you run a café, fine dining restaurant, bar, or a multi-outlet chain, Digitory helps you deliver a smooth experience for both your guests and your staff.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "Manage tables more efficiently",
        desc: "See which tables are available, occupied, or reserved in real time. This helps you seat guests faster and make the best use of your restaurant space."
      },
      {
        title: "Reduce waiting time",
        desc: "Manage reservations and walk-in guests from one system. Your team can quickly assign tables and keep guests informed, creating a better dining experience."
      },
      {
        title: "Stay updated in real time",
        desc: "Get instant updates whenever a reservation is made, changed, or cancelled. Your staff always knows the latest table status."
      },
      {
        title: "Connect everything together",
        desc: "Digitory works with your POS and kitchen systems, so reservations, orders, and billing stay connected. This keeps your restaurant running smoothly from start to finish."
      }
    ],
    featuresTitle: "Everything you need to manage reservations",
    features: [
      {
        title: "Smart table allocation",
        desc: "Assign tables based on availability, group size, and reservations. Use your dining space more efficiently and reduce empty tables during busy hours."
      },
      {
        title: "Easy reservation management",
        desc: "Manage online bookings and walk-ins from one simple dashboard. View upcoming reservations, update bookings, and handle cancellations in just a few clicks."
      },
      {
        title: "Instant reservation updates",
        desc: "Whenever a booking changes, your team sees the update immediately. This helps avoid confusion and keeps service running smoothly."
      },
      {
        title: "Faster billing and payments",
        desc: "Once guests finish their meal, billing and payment can be handled quickly through the connected POS system. This helps reduce delays and prepares tables for the next guests faster."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Manage reservations, walk-ins, and table assignments with ease while delivering a better dining experience." },
      { name: "Fine Dining", desc: "Offer a premium guest experience with organised reservations and smooth table management." },
      { name: "Cafés", desc: "Handle quick table turnover while serving both walk-in customers and advance bookings efficiently." },
      { name: "Bars & Breweries", desc: "Manage busy evenings and weekend reservations while keeping tables available for incoming guests." },
      { name: "Multi-outlet restaurant chains", desc: "View reservations across all your locations and manage bookings from one central dashboard." }
    ],
    extraGrowth: {
      title: "Benefits for your restaurant",
      desc: "Give guests a better experience with faster seating, make better use of every table to improve table turnover, reduce missed bookings, and improve daily operations through connected systems."
    },
    extraOwnersChoice: {
      title: "Works with your existing systems",
      desc: "Digitory connects with your POS system, kitchen management, CRM, and other restaurant tools. Everything works together, helping your team provide faster service with fewer manual tasks."
    },
    ctaBlock: {
      title: "Make every guest feel welcome",
      desc: "Good table management means shorter waits, happier guests, and smoother restaurant operations. Digitory's Table Booking & Reservation System helps you organise reservations, manage tables more efficiently, and give every guest a better dining experience from the moment they book until they leave."
    }
  },
  "production-planning": {
    id: "production-planning",
    shortLabel: "Production Planning",
    icon: icons.production,
    badge: "08 • Production Planning System",
    title: "Production Planning System",
    subtitle: "Running a busy kitchen is easier when everything is planned in advance",
    description: "Digitory's Production Planning System helps you manage ingredients, organize recipes, plan food production, and control costs from one simple platform. Your kitchen stays prepared, your team works faster, and every dish is made with the same quality. Whether you run a restaurant, café, cloud kitchen, bakery, or brewery, Digitory helps you plan better every day.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "Track ingredients easily",
        desc: "Know exactly how much stock you have and how much is being used in every recipe. This helps reduce waste and keeps your inventory under control."
      },
      {
        title: "Plan production in advance",
        desc: "Prepare the right quantity of food before busy hours. Good planning reduces delays and helps your kitchen serve customers faster."
      },
      {
        title: "Keep food quality consistent",
        desc: "Store standard recipes in one place so every chef follows the same process. Your customers get the same great taste every time they visit."
      },
      {
        title: "Improve with real-time data",
        desc: "Use reports and analytics to understand ingredient usage, food costs, and kitchen performance. Small improvements every day can lead to better profits."
      }
    ],
    featuresTitle: "Everything you need for smarter production",
    features: [
      {
        title: "Manage recipes in one place",
        desc: "Store recipes and sub-recipes digitally so your kitchen team can access them anytime. This keeps food preparation simple and consistent."
      },
      {
        title: "Prepare batches with confidence",
        desc: "Plan production based on expected demand instead of guessing. Cook enough to meet customer demand while reducing unnecessary food waste."
      },
      {
        title: "Save time in the kitchen",
        desc: "Automate routine tasks and simplify daily kitchen operations. Your team spends less time managing paperwork and more time preparing food."
      },
      {
        title: "Control food costs",
        desc: "Compare expected ingredient costs with actual usage. Identify waste, improve portion control, and increase your restaurant's profitability."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Plan daily food production, manage recipes, and reduce ingredient waste." },
      { name: "Cloud Kitchens", desc: "Prepare for high delivery volumes while maintaining speed and consistency." },
      { name: "Cafés", desc: "Manage fresh food preparation throughout the day and reduce leftovers." },
      { name: "Bakeries", desc: "Schedule baking batches, organise recipes, and control ingredient usage." },
      { name: "Breweries", desc: "Plan production efficiently while managing raw materials and stock from one system." }
    ],
    extraGrowth: {
      title: "Smarter purchasing and ordering",
      desc: "Digitory suggests when it's time to reorder ingredients based on stock levels and daily usage. You can also place supplier orders from one system and track deliveries to reduce ordering mistakes."
    },
    extraOwnersChoice: {
      title: "Better control over your kitchen",
      desc: "Plan ingredients and food production based on expected orders. Set manager approval steps before purchase orders are placed, and allow chefs to send ingredient requests directly to the store team."
    },
    ctaBlock: {
      title: "Plan better. Cook smarter. Grow faster.",
      desc: "A well-planned kitchen wastes less, serves faster, and delivers better quality. Digitory's Production Planning System helps you organise production, reduce food costs, improve consistency, and keep your kitchen running smoothly as your business grows."
    }
  },
  "menu-engineering": {
    id: "menu-engineering",
    shortLabel: "Menu Engineering",
    icon: icons.menu,
    badge: "09 • Menu Engineering System",
    title: "Menu Engineering System",
    subtitle: "A good menu doesn't just offer great food. It also helps your restaurant earn more",
    description: "Digitory's Menu Engineering System helps you understand which dishes sell the most, which ones make the highest profit, and which items need improvement. Use real sales data to build a menu that your customers love and your business benefits from. Whether you run a restaurant, café, bar, brewery, or cloud kitchen, Digitory helps you make smarter menu decisions.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "Understand what sells best",
        desc: "See which dishes are ordered the most and which ones are your best performers. This helps you focus on the items your customers enjoy the most."
      },
      {
        title: "Make smarter menu decisions",
        desc: "Use real sales data to update your menu, improve pricing, and introduce new dishes with confidence. No more guessing what works."
      },
      {
        title: "Improve your profits",
        desc: "Compare ingredient costs with selling prices to find the dishes that give you the best returns. Focus on items that increase your restaurant's profitability."
      },
      {
        title: "Track menu performance",
        desc: "Monitor every menu item over time. See how customer preferences change and keep your menu updated with confidence."
      }
    ],
    featuresTitle: "Everything you need to build a better menu",
    features: [
      {
        title: "Analyze sales data",
        desc: "Understand which dishes are popular, which ones sell slowly, and which items bring in the most revenue. Use these insights to improve your menu."
      },
      {
        title: "Compare food costs",
        desc: "Track the cost of ingredients for every dish and compare it with the selling price. This helps you identify opportunities to improve margins."
      },
      {
        title: "Know which dishes perform best",
        desc: "Digitory groups your menu items based on their popularity and profitability. This makes it easier to decide which dishes to promote, improve, or remove."
      },
      {
        title: "Keep your menu fresh",
        desc: "Regularly review your menu using real business data. Replace slow-moving dishes with better options and keep your menu exciting for your customers."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Understand customer favourites, improve pricing, and create a stronger menu." },
      { name: "Cafes", desc: "Track popular beverages and snacks while introducing new seasonal items with confidence." },
      { name: "Bars & Breweries", desc: "Find your best-selling drinks, improve beverage pricing, and promote high-margin items." },
      { name: "Cloud Kitchens", desc: "Optimize delivery menus based on ordering trends and customer preferences." },
      { name: "Multi-outlet businesses", desc: "Compare menu performance across different outlets and maintain consistency throughout your brand." }
    ],
    extraGrowth: {
      title: "Benefits for your restaurant",
      desc: "Increase profits by focusing on high-margin dishes, set prices based on real ingredient costs, reduce food waste by removing slow sellers, and improve customer satisfaction with optimized menus."
    },
    extraOwnersChoice: {
      title: "Increase every order",
      desc: "Recommend food and drink combinations that go well together. Suggesting complementary items can increase the average bill while giving guests a better dining experience."
    },
    ctaBlock: {
      title: "Build a menu that works harder for your business",
      desc: "Every menu tells a story. The right menu keeps customers happy while helping your restaurant grow. Digitory's Menu Engineering System gives you the insights you need to improve pricing, increase profits, reduce waste, and create a menu that performs better every day."
    }
  },
  "recipe-management": {
    id: "recipe-management",
    shortLabel: "Recipe Management",
    icon: icons.recipe,
    badge: "10 • Recipe Management System",
    title: "Recipe Management System",
    subtitle: "Every great dish starts with a great recipe",
    description: "Digitory's Recipe Management System helps you store, manage, and update all your recipes in one place. Follow the same recipes, track usage, control food costs, and make sure every dish is prepared the right way every time. Whether you run one restaurant or a growing chain, Digitory helps you maintain consistency.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "Store recipes digitally",
        desc: "Keep all your recipes in one secure digital library. Your team can quickly find the latest recipe whenever they need it."
      },
      {
        title: "Maintain consistent quality",
        desc: "Every outlet follows the same recipe, measurements, and cooking process. This helps every customer enjoy the same great taste every time they visit."
      },
      {
        title: "Track ingredients accurately",
        desc: "Connect recipes with your inventory to know exactly how much of every ingredient is being used. This helps reduce waste and keeps stock levels accurate."
      },
      {
        title: "Scale recipes easily",
        desc: "Need to prepare food for more customers? Digitory automatically adjusts ingredient quantities for different batch sizes, saving time and improving accuracy."
      }
    ],
    featuresTitle: "Everything you need to manage recipes",
    features: [
      {
        title: "Keep recipes organized",
        desc: "Store recipes, sub-recipes, ingredients, and cooking instructions in one place. Your kitchen team can easily access everything they need."
      },
      {
        title: "Manage ingredient costs",
        desc: "Track ingredient prices and calculate the cost of every recipe. This helps you understand food costs and improve profitability."
      },
      {
        title: "Update recipes with confidence",
        desc: "Whenever you change a recipe, the latest version is saved automatically. Every outlet and every chef always works with the newest recipe."
      },
      {
        title: "Easy step-by-step instructions",
        desc: "Add detailed cooking instructions for every dish. This helps new staff learn faster and ensures every recipe is prepared correctly."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Standardize recipes across every outlet and maintain consistent food quality." },
      { name: "Cafés", desc: "Keep beverage and food recipes organised while ensuring every item is prepared the same way." },
      { name: "Bars & Breweries", desc: "Manage cocktail recipes, ingredient quantities, and drink preparation with complete accuracy." },
      { name: "Cloud Kitchens", desc: "Share recipes across multiple brands and kitchens while maintaining consistency." },
      { name: "Multi-outlet restaurant chains", desc: "Update recipes once and make them available across all your locations instantly." }
    ],
    extraGrowth: {
      title: "Connect recipes with your POS",
      desc: "Digitory links recipes with your POS system. When an order is billed, the required ingredients are automatically deducted from your inventory, keeping stock accurate without extra work."
    },
    extraOwnersChoice: {
      title: "Benefits for your restaurant",
      desc: "Deliver consistent food quality, reduce ingredient waste through accurate measurements, control food costs, train new staff faster, and improve kitchen efficiency by saving search time."
    },
    ctaBlock: {
      title: "Keep every recipe consistent",
      desc: "Recipes are the foundation of every successful restaurant. When every kitchen follows the same standards, food quality improves, waste goes down, and operations become much easier. Digitory's Recipe Management System helps you organise recipes, manage ingredients, control costs, and deliver the same great experience to every customer."
    }
  },
  loyalty: {
    id: "loyalty",
    shortLabel: "CRM & Loyalty",
    icon: icons.loyalty,
    badge: "11 • CRM & Loyalty Software",
    title: "CRM & Loyalty Software for Restaurants",
    subtitle: "Turn first-time customers into regular customers",
    description: "Great food brings people in. A great experience brings them back. Digitory's CRM & Loyalty Software helps you build better relationships with your customers. Reward loyal guests, stay connected through WhatsApp and SMS, collect feedback, and encourage repeat visits, all from one easy platform. Whether you own one cafe or manage many outlets, Digitory helps you keep customers coming back.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "Made for restaurants",
        desc: "Digitory is built for the food and beverage industry. It understands dine-in, takeaway, delivery, walk-ins, and online orders, so you don't have to adjust a generic CRM to fit your business."
      },
      {
        title: "Know every customer",
        desc: "Every visit, order, and interaction is saved in one customer profile. See favourite dishes, order history, spending habits, and visit frequency so you can serve every customer better."
      },
      {
        title: "Reward loyalty",
        desc: "Create loyalty programs that customers actually enjoy. Reward them with points, free dishes, discounts, birthday offers, or special memberships that encourage repeat visits."
      },
      {
        title: "Listen to your customers",
        desc: "Collect feedback after every order through WhatsApp or simple surveys. Find problems early, improve service, and encourage happy customers to leave online reviews."
      }
    ],
    featuresTitle: "Everything you need in one CRM",
    features: [
      {
        title: "One customer database",
        desc: "Bring together customer details from dine-in, delivery apps, QR ordering, websites, and online orders into one place. No duplicate records."
      },
      {
        title: "Flexible loyalty programs",
        desc: "Build loyalty programs that suit your restaurant. Reward customers based on money spent, number of visits, membership levels, referrals, or special campaigns."
      },
      {
        title: "WhatsApp, SMS & Email",
        desc: "Send personalised messages based on customer behaviour. Share offers, rewards, reminders, and updates with the right customers at the right time."
      },
      {
        title: "Smart customer groups",
        desc: "Create customer groups such as regulars, high spenders, new customers, inactive customers, and birthday month customers to run better marketing campaigns."
      }
    ],
    businessTypes: [
      { name: "Restaurants", desc: "Reward regular guests, remember customer preferences, and encourage repeat dining." },
      { name: "Bars", desc: "Promote events, reward loyal customers, and keep guests coming back." },
      { name: "Breweries", desc: "Create loyalty programs for beer lovers, launch seasonal offers, and reward repeat visitors." },
      { name: "Pubs", desc: "Run birthday offers, happy hour promotions, and event campaigns with ease." },
      { name: "Cafés", desc: "Offer digital stamp cards, student offers, and seasonal rewards to increase repeat visits." },
      { name: "Ice Cream Parlours & Dessert Shops", desc: "Create family rewards, birthday offers, and loyalty programs that work across multiple outlets." }
    ],
    extraGrowth: {
      title: "Marketing that runs automatically",
      desc: "Stay connected without extra effort. Automatically send birthday wishes, 'We Miss You' offers, reward notifications, event invitations, and special discounts."
    },
    extraOwnersChoice: {
      title: "Why restaurants choose Digitory CRM",
      desc: "Digitory works with your POS, KDS, delivery apps, and online ordering. It is a cloud-based system accessible from anywhere, easy to use with minimal training, built for Indian restaurants, and proven to increase repeat customers."
    },
    ctaBlock: {
      title: "Build your loyal customer base",
      desc: "Stop relying on third-party platforms. Build direct relationships with your diners and reward them for choosing you with Digitory CRM."
    }
  }
};
