import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as fs from "fs";
import * as path from "path";

// Parse .env.local manually to populate process.env
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
        if (key) {
          process.env[key] = val;
        }
      }
    });
  }
} catch (err) {
  console.warn("Could not load .env.local manually", err);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key-for-build",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Simple representation of Solutions static data corresponding to solutionsDb.tsx content
const solutionsToSeed = [
  {
    id: "pos",
    slug: "pos",
    shortLabel: "Multi-Channel POS",
    icon: "pos",
    title: "Billing & Order Management POS Engine",
    badge: "BILLING & ORDERS",
    subtitle: "Speed up counter service, table orders, and aggregators",
    description: "Digitory POS integrates front-of-house billing with kitchen screens and supply trackers, handling peak rushes without lag.",
    ctaText: "Request a Demo",
    trustText: "Trusted by Indian restaurants, cafés, and cloud kitchens.",
    whyChoose: [
      { title: "5-Second Checkout", desc: "Process bills in less than five seconds with keyboard shortcuts and search parameters." },
      { title: "Unified Aggregators", desc: "Bring together Zomato, Swiggy, and direct web orders into a single screen." }
    ],
    featuresTitle: "POS Features",
    features: [
      { title: "Split billing", desc: "Easily split bills by items or cover counts." },
      { title: "Offline operations", desc: "Continue billing when the internet is down; syncs automatically when online." }
    ],
    businessTypes: [
      { name: "Fine dining", desc: "Manage table bookings, KOT modifications, and guest tabs." }
    ],
    integrations: [
      { title: "Aggregators", items: "Swiggy, Zomato, Magicpin" }
    ],
    opsTitle: "Streamline Counter Operations",
    opsParagraph: "Manage everything from billing options to cash registers in real time.",
    opsHighlights: "99.9% POS Uptime · Zero Lag Billing",
    ctaBlock: { title: "Ready to scale your billing?", desc: "Get started with Digitory POS today." },
    layerTitle: "POS Integration Architecture",
    layerDesc: "Connect POS billing directly with KDS screens.",
    metricsTitle: "POS Performance Impact",
    metricsItems: [
      { value: "5s", label: "Average checkout time", desc: "Faster bills mean higher table turnover rates." }
    ],
    faqs: [
      { question: "Does it support offline billing?", answer: "Yes, billing functions work offline and auto-sync when connection restores." }
    ],
    businessTypesTitle: "Suitable Outlets",
    businessTypesDesc: "Tailored solutions for different food business formats."
  },
  {
    id: "kds",
    slug: "kds",
    shortLabel: "Kitchen Display (KDS)",
    icon: "kds",
    title: "Smart Kitchen Display Systems (KDS)",
    badge: "KITCHEN DESK",
    subtitle: "Coordinate food prep, track times, and eliminate paper KOTs",
    description: "Digitory KDS routes orders from counters and tables to correct preparation stations instantly.",
    ctaText: "Request a Demo",
    trustText: "Trusted by high-volume kitchens and quick-service brands.",
    whyChoose: [
      { title: "Zero Missed Orders", desc: "KOTs appear on screen instantly, ending manual order loss." }
    ],
    featuresTitle: "KDS Capabilities",
    features: [
      { title: "Color-coded timers", desc: "Alerts prep staff when prep times cross standard limits." }
    ],
    businessTypes: [
      { name: "QSRs", desc: "Fast order routing for high-volume quick-service setups." }
    ],
    integrations: [
      { title: "Printers", items: "Epson, Star Micronics" }
    ],
    opsTitle: "Increase Kitchen Throughput",
    opsParagraph: "Track preparation statistics per station and chef shift to spot bottlenecks.",
    opsHighlights: "Zero Paper KOTs · Instant Routing",
    ctaBlock: { title: "Ready to digitalize your kitchen?", desc: "Equip your chefs with Digitory KDS." },
    layerTitle: "KDS Routing Map",
    layerDesc: "Route POS and online orders to prep lines.",
    metricsTitle: "KDS Efficiency Gains",
    metricsItems: [
      { value: "30%", label: "Prep speed improvement", desc: "Immediate routing reduces lag between ordering and prep." }
    ],
    faqs: [
      { question: "Can I route items to different stations?", answer: "Yes, you can configure item-level routing to specific kitchen stations." }
    ],
    businessTypesTitle: "Kitchen Formats",
    businessTypesDesc: "Optimized for fast-paced kitchens."
  },
  {
    id: "inventory",
    slug: "inventory",
    shortLabel: "Inventory Control",
    icon: "inventory",
    title: "Real-Time Stock & Inventory Tracker",
    badge: "INVENTORY",
    subtitle: "Track raw materials, calculate yields, and set reorder alerts",
    description: "Digitory Inventory links stock levels with standard recipes to auto-deduct ingredients.",
    ctaText: "Request a Demo",
    trustText: "Reducing wastage by up to 25% across microbreweries and restaurant chains.",
    whyChoose: [
      { title: "Wastage Control", desc: "Identify portion deviations and material leakage in real time." }
    ],
    featuresTitle: "Inventory Tools",
    features: [
      { title: "Recipe costing", desc: "Calculate recipe yields and raw ingredient costs automatically." }
    ],
    businessTypes: [
      { name: "Microbreweries", desc: "Track barrel depletion and raw material batches." }
    ],
    integrations: [
      { title: "Suppliers", items: "Direct supplier ERP sync integrations" }
    ],
    opsTitle: "Optimize Cost of Goods Sold",
    opsParagraph: "Receive low-stock warnings and generate purchase orders automatically.",
    opsHighlights: "Real-Time Stock Deduction · Yield Audits",
    ctaBlock: { title: "Unlock higher growth margins?", desc: "Start tracking inventory with Digitory." },
    layerTitle: "Inventory Supply Flow",
    layerDesc: "Purchase order to stock depletion path.",
    metricsTitle: "Wastage Impact",
    metricsItems: [
      { value: "25%", label: "Wastage reduction", desc: "Strict recipe matching avoids material leakage." }
    ],
    faqs: [
      { question: "Does it support nested recipes?", answer: "Yes, you can track semi-prep recipes and base ingredients." }
    ],
    businessTypesTitle: "Inventory Outlets",
    businessTypesDesc: "Suitable for microbreweries, bars, and central kitchens."
  },
  {
    id: "control-system",
    slug: "control-system",
    shortLabel: "Owner Dashboard",
    icon: "controlSystem",
    title: "Multi-Outlet Owner Control Center",
    badge: "CONTROL SYSTEM",
    subtitle: "Consolidate outlet sales, view reports, and manage settings",
    description: "Digitory Dashboard aggregates business sales metrics from all your outlets.",
    ctaText: "Request a Demo",
    trustText: "Providing real-time business intelligence to restaurant founders.",
    whyChoose: [
      { title: "Unified Analytics", desc: "View sales figures across multiple cities and formats from one tab." }
    ],
    featuresTitle: "Analytics Features",
    features: [
      { title: "Busy hour heatmaps", desc: "Identify peak order times to adjust staff scheduling." }
    ],
    businessTypes: [
      { name: "Chain outlets", desc: "Consolidated views for multi-unit restaurant operators." }
    ],
    integrations: [
      { title: "Accounting", items: "Tally, QuickBooks, Zoho Books" }
    ],
    opsTitle: "Centralized Management Control",
    opsParagraph: "Manage menus, pricing, and staff roles centrally and push updates live in seconds.",
    opsHighlights: "Consolidated Sales Hub · Real-Time Reports",
    ctaBlock: { title: "Ready for smart business insights?", desc: "Access the owner control deck now." },
    layerTitle: "Analytics Flow",
    layerDesc: "Sales aggregation across outlets.",
    metricsTitle: "Operational Visibility",
    metricsItems: [
      { value: "100%", label: "Real-time visibility", desc: "Instantly track every transaction across all stores." }
    ],
    faqs: [
      { question: "Can I manage menus remotely?", answer: "Yes, you can push menu changes to any outlet instantly from the dashboard." }
    ],
    businessTypesTitle: "Supported Formats",
    businessTypesDesc: "For restaurant groups and growing chains."
  },
  {
    id: "event-management",
    slug: "event-management",
    shortLabel: "Multi-Outlet Analytics",
    icon: "eventManagement",
    title: "Enterprise Multi-Unit Analytics Deck",
    badge: "ENTERPRISE",
    subtitle: "Scale operations with AI prep recommendations & regional settings",
    description: "Digitory Enterprise handles complex menu configurations and regional outlet tracking.",
    ctaText: "Request a Demo",
    trustText: "Empowering scaling food brands with automated operational metrics.",
    whyChoose: [
      { title: "Enterprise Scaling", desc: "Robust database performance designed to track 100+ active outlets." }
    ],
    featuresTitle: "Enterprise Features",
    features: [
      { title: "Regional tax groups", desc: "Configure tax profiles and pricing zones per store cluster." }
    ],
    businessTypes: [
      { name: "Franchise networks", desc: "Verify royalties and brand compliance across franchise chains." }
    ],
    integrations: [
      { title: "Logistics", items: "Shadowfax, Dunzo, Borzo" }
    ],
    opsTitle: "Enterprise-Grade Performance",
    opsParagraph: "Generate customized regional sales reports and compare outlet margins.",
    opsHighlights: "Region Configurations · Franchise Trackers",
    ctaBlock: { title: "Scale your food brand efficiently?", desc: "Schedule an enterprise consultation." },
    layerTitle: "Enterprise Sync Architecture",
    layerDesc: "Aggregating regional pricing datasets.",
    metricsTitle: "Brand Compliance Metrics",
    metricsItems: [
      { value: "0%", label: "Franchise report error rate", desc: "Automated calculations eliminate manual audit mistakes." }
    ],
    faqs: [
      { question: "Does it support regional menu variations?", answer: "Yes, regional pricing and menu visibility filters are supported." }
    ],
    businessTypesTitle: "Scale Formats",
    businessTypesDesc: "For large franchise operators and brand conglomerates."
  }
];

async function seed() {
  console.log("Starting Solutions bootstrap seeding...");
  
  for (let idx = 0; idx < solutionsToSeed.length; idx++) {
    const item = solutionsToSeed[idx];
    const docRef = doc(db, "solutions", item.id);
    
    const rawPayload = {
      ...item,
      order: idx,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Strip undefined properties
    const payload = JSON.parse(JSON.stringify(rawPayload));
    
    await setDoc(docRef, payload);
    console.log(`Successfully seeded Solution: ${item.id} (Order: ${idx})`);
  }
  
  console.log("Bootstrap seeding completed successfully!");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
