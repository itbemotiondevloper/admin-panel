import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface SolutionsPageData {
  hero: {
    title: string;
    desc: string;
    trustText: string;
  };
  commandCenter: {
    title: string;
    desc: string;
    modules: {
      id: string;
      label: string;
      sublabel: string;
      inspectorTitle: string;
      inspectorDesc: string;
      metricValue: string;
      metricLabel: string;
    }[];
  };
  stats: {
    value: string;
    label: string;
  }[];
  controlDeck: {
    title: string;
    desc: string;
    outlets: {
      key: string;
      title: string;
      statusBadge: string;
      revenue: string;
      metricLabel: string;
    }[];
  };
  integrations: {
    title: string;
    desc: string;
    items: {
      id: string;
      name: string;
      subtext: string;
    }[];
  };
  calculator: {
    title: string;
    desc: string;
    factorOrders: number;
    factorOutlets: number;
    factorHoursOrders: number;
    factorHoursOutlets: number;
  };
}

export const DEFAULT_SOLUTIONS_PAGE_DATA: SolutionsPageData = {
  hero: {
    title: "Spend more time *serving customers.*",
    desc: "Running a restaurant is busy enough. Digitory brings billing, orders, inventory, kitchen management, and reports into one simple system, so your team can work faster and with fewer mistakes.",
    trustText: "Trusted by 500+ restaurants, cafés, bars, and cloud kitchens across India."
  },
  commandCenter: {
    title: "Everything your restaurant needs, *in one place*",
    desc: "Digitory connects every part of your restaurant, from the front counter to the kitchen and from inventory to business reports. With everything working together, your daily operations become simpler and easier to manage.",
    modules: [
      {
        id: "pos",
        label: "POS & Billing",
        sublabel: "15s Billing Counter",
        inspectorTitle: "POS & Billing Hub",
        inspectorDesc: "Ultra-fast counter POS, visual table management, QR digital menus, and split billing in 15 seconds.",
        metricValue: "15 sec",
        metricLabel: "Avg Checkout Time"
      },
      {
        id: "kds",
        label: "Kitchen KDS",
        sublabel: "35% Faster Prep",
        inspectorTitle: "Kitchen KDS Hub",
        inspectorDesc: "Direct routing from orders to specific kitchen displays. Eliminates paper tickets, coordinates prep stages, and minimizes communication errors.",
        metricValue: "35%",
        metricLabel: "Faster Food Prep"
      },
      {
        id: "inventory",
        label: "Smart Inventory",
        sublabel: "Recipe Auto-Deduct",
        inspectorTitle: "Smart Inventory Hub",
        inspectorDesc: "Tracks raw ingredients and auto-deducts them based on recipe configurations. Sends proactive alerts before items run out of stock.",
        metricValue: "98%",
        metricLabel: "Inventory Accuracy"
      },
      {
        id: "multioutlet",
        label: "Multi-Outlet Hub",
        sublabel: "Global Menu Push",
        inspectorTitle: "Multi-Outlet Hub",
        inspectorDesc: "Push menu updates globally, manage multi-store configurations, sync pricing tiers, and monitor centralized reports without logging into separate accounts.",
        metricValue: "1-Click",
        metricLabel: "Global Menu Sync"
      },
      {
        id: "ai",
        label: "AI Forecast BI",
        sublabel: "Real-Time Reports",
        inspectorTitle: "AI Forecast BI Engine",
        inspectorDesc: "Anticipate customer demands, optimize staff shifts, and reduce raw ingredient spoilage through predictive AI and live dashboard widgets.",
        metricValue: "92%",
        metricLabel: "Forecasting Precision"
      },
      {
        id: "integrations",
        label: "Swiggy & Zomato",
        sublabel: "2-Way Sync Engine",
        inspectorTitle: "Swiggy & Zomato Engine",
        inspectorDesc: "Eliminate manual entries on separate tablets. Real-time direct integrations map online orders directly into your billing terminal and kitchen setup.",
        metricValue: "0 min",
        metricLabel: "Manual Order Delay"
      }
    ]
  },
  stats: [
    { value: "22%", label: "Faster Table Turnover" },
    { value: "32%", label: "Less Raw Wastage" },
    { value: "98%", label: "Order Kitchen Accuracy" },
    { value: "15 hrs", label: "Saved Weekly per Manager" }
  ],
  controlDeck: {
    title: "One Dashboard. *Every location in sync.*",
    desc: "Monitor revenue, stock transfers, and store health across cities directly from your smartphone.",
    outlets: [
      {
        key: "Chain Overview",
        title: "Chain Overview (4 Outlets)",
        statusBadge: "4 / 4 Outlets Online",
        revenue: "₹ 14,85,200",
        metricLabel: "↑ Consolidated Real-Time Sync"
      },
      {
        key: "Mumbai Flagship",
        title: "Mumbai Flagship Outlet",
        statusBadge: "Online",
        revenue: "₹ 5,42,800",
        metricLabel: "↑ 12% increase from yesterday"
      },
      {
        key: "Delhi QSR",
        title: "Delhi QSR Outlet",
        statusBadge: "Online",
        revenue: "₹ 4,12,400",
        metricLabel: "↑ Peak hour sales active"
      },
      {
        key: "Bangalore Cloud",
        title: "Bangalore Cloud Kitchen",
        statusBadge: "Online",
        revenue: "₹ 5,30,000",
        metricLabel: "↑ High order volume"
      }
    ]
  },
  integrations: {
    title: "Connects with *your favorite apps.*",
    desc: "1-click setup with Swiggy, Zomato, Razorpay, Paytm, Tally, WhatsApp, and POS hardware.",
    items: [
      { id: "swiggy", name: "Swiggy Direct", subtext: "2-way menu & order sync." },
      { id: "razorpay", name: "Razorpay", subtext: "UPI & Card reconciliation." },
      { id: "zomato", name: "Zomato Connect", subtext: "Auto-accept & instant toggles." },
      { id: "tally", name: "Tally Prime", subtext: "Automated daily sales entries." },
      { id: "paytm", name: "Paytm", subtext: "Instant QR payments." },
      { id: "whatsapp", name: "WhatsApp", subtext: "Automated billing alerts." }
    ]
  },
  calculator: {
    title: "See how much *you can save*",
    desc: "Use our interactive calculator to see exactly how much Digitory can help you save by reducing food waste, optimizing staff hours, and increasing your daily margins.",
    factorOrders: 15.5,
    factorOutlets: 12550,
    factorHoursOrders: 0.008,
    factorHoursOutlets: 4
  }
};

let pageDataCache: SolutionsPageData | null = null;

export const solutionsPageService = {
  async getPageData(bypassCache = false): Promise<SolutionsPageData> {
    if (pageDataCache && !bypassCache) return pageDataCache;
    try {
      const docRef = doc(db, 'settings', 'solutionsPage');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as Partial<SolutionsPageData>;
        pageDataCache = {
          hero: {
            title: data.hero?.title || DEFAULT_SOLUTIONS_PAGE_DATA.hero.title,
            desc: data.hero?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.hero.desc,
            trustText: data.hero?.trustText || DEFAULT_SOLUTIONS_PAGE_DATA.hero.trustText
          },
          commandCenter: {
            title: data.commandCenter?.title || DEFAULT_SOLUTIONS_PAGE_DATA.commandCenter.title,
            desc: data.commandCenter?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.commandCenter.desc,
            modules: data.commandCenter?.modules || DEFAULT_SOLUTIONS_PAGE_DATA.commandCenter.modules
          },
          stats: data.stats || DEFAULT_SOLUTIONS_PAGE_DATA.stats,
          controlDeck: {
            title: data.controlDeck?.title || DEFAULT_SOLUTIONS_PAGE_DATA.controlDeck.title,
            desc: data.controlDeck?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.controlDeck.desc,
            outlets: data.controlDeck?.outlets || DEFAULT_SOLUTIONS_PAGE_DATA.controlDeck.outlets
          },
          integrations: {
            title: data.integrations?.title || DEFAULT_SOLUTIONS_PAGE_DATA.integrations.title,
            desc: data.integrations?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.integrations.desc,
            items: data.integrations?.items || DEFAULT_SOLUTIONS_PAGE_DATA.integrations.items
          },
          calculator: {
            title: data.calculator?.title || DEFAULT_SOLUTIONS_PAGE_DATA.calculator.title,
            desc: data.calculator?.desc || DEFAULT_SOLUTIONS_PAGE_DATA.calculator.desc,
            factorOrders: typeof data.calculator?.factorOrders === 'number' ? data.calculator.factorOrders : DEFAULT_SOLUTIONS_PAGE_DATA.calculator.factorOrders,
            factorOutlets: typeof data.calculator?.factorOutlets === 'number' ? data.calculator.factorOutlets : DEFAULT_SOLUTIONS_PAGE_DATA.calculator.factorOutlets,
            factorHoursOrders: typeof data.calculator?.factorHoursOrders === 'number' ? data.calculator.factorHoursOrders : DEFAULT_SOLUTIONS_PAGE_DATA.calculator.factorHoursOrders,
            factorHoursOutlets: typeof data.calculator?.factorHoursOutlets === 'number' ? data.calculator.factorHoursOutlets : DEFAULT_SOLUTIONS_PAGE_DATA.calculator.factorHoursOutlets
          }
        };
        return pageDataCache;
      }
    } catch (e) {
      console.error('Failed to get solutions landing page data:', e);
    }
    return DEFAULT_SOLUTIONS_PAGE_DATA;
  },

  async savePageData(payload: SolutionsPageData) {
    const docRef = doc(db, 'settings', 'solutionsPage');
    await setDoc(docRef, payload, { merge: true });
    pageDataCache = payload;
    return payload;
  }
};
