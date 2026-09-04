import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';

export interface SettingsData {
  branding: {
    logo: string;
    logoWhite: string;
    footerLogo?: string;
    companyName: string;
    siteTitle?: string;
    favicon?: string;
  };
  solutionsGridTitle: string;
  solutionsGridDesc: string;
  customCategories?: string[];
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
}

const DEFAULT_SETTINGS: SettingsData = {
  branding: {
    logo: '/logo1.png',
    logoWhite: '/logo2.png',
    footerLogo: '/logo2.png',
    companyName: 'Quest For Tech',
    siteTitle: 'Quest For Tech - Digital Solutions',
    favicon: '/favicon1.png'
  },
  solutionsGridTitle: 'Twelve powerful features to help your restaurant run better',
  solutionsGridDesc: 'Click on any feature card below to open its full specifications and details on a new page.',
  customCategories: [],
  desktopVideoUrl: '/Digitory.mp4',
  mobileVideoUrl: '/mobile.mp4'
};

let settingsCache: SettingsData | null = null;

export const settingsService = {
  // Read settings (with in-memory cache to prevent N+1 layout reads)
  async getSettings(bypassCache = false): Promise<SettingsData> {
    if (settingsCache && !bypassCache) {
      return settingsCache;
    }

    try {
      const docRef = doc(db, 'settings', 'general');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as Partial<SettingsData>;
        const companyName = data.branding?.companyName || DEFAULT_SETTINGS.branding.companyName;
        settingsCache = {
          branding: {
            logo: data.branding?.logo || DEFAULT_SETTINGS.branding.logo,
            logoWhite: data.branding?.logoWhite || DEFAULT_SETTINGS.branding.logoWhite,
            footerLogo: data.branding?.footerLogo || data.branding?.logoWhite || DEFAULT_SETTINGS.branding.footerLogo,
            companyName,
            siteTitle: data.branding?.siteTitle || `${companyName} - Restaurant Operating System`,
            favicon: data.branding?.favicon || DEFAULT_SETTINGS.branding.favicon
          },
          solutionsGridTitle: data.solutionsGridTitle || DEFAULT_SETTINGS.solutionsGridTitle,
          solutionsGridDesc: data.solutionsGridDesc || DEFAULT_SETTINGS.solutionsGridDesc,
          customCategories: data.customCategories || DEFAULT_SETTINGS.customCategories,
          desktopVideoUrl: data.desktopVideoUrl || DEFAULT_SETTINGS.desktopVideoUrl,
          mobileVideoUrl: data.mobileVideoUrl || DEFAULT_SETTINGS.mobileVideoUrl
        };
        return settingsCache;
      }
    } catch (e) {
      console.error('Failed to fetch settings from Firestore:', e);
    }

    return DEFAULT_SETTINGS;
  },

  // Save settings
  async saveSettings(payload: Partial<SettingsData>) {
    const current = await this.getSettings(true);
    const docRef = doc(db, 'settings', 'general');
    
    const updated = {
      branding: {
        logo: payload.branding?.logo || current.branding.logo,
        logoWhite: payload.branding?.logoWhite || current.branding.logoWhite,
        footerLogo: payload.branding?.footerLogo || current.branding.footerLogo || payload.branding?.logoWhite || current.branding.logoWhite || '/logo2.png',
        companyName: payload.branding?.companyName || current.branding.companyName,
        siteTitle: payload.branding?.siteTitle !== undefined ? payload.branding.siteTitle : (current.branding.siteTitle || `${current.branding.companyName} - Restaurant Operating System`),
        favicon: payload.branding?.favicon || current.branding.favicon || '/favicon1.png'
      },
      solutionsGridTitle: payload.solutionsGridTitle || current.solutionsGridTitle,
      solutionsGridDesc: payload.solutionsGridDesc || current.solutionsGridDesc,
      customCategories: payload.customCategories || current.customCategories || [],
      desktopVideoUrl: payload.desktopVideoUrl || current.desktopVideoUrl || '/Digitory.mp4',
      mobileVideoUrl: payload.mobileVideoUrl || current.mobileVideoUrl || '/mobile.mp4'
    };

    await setDoc(docRef, updated, { merge: true });
    settingsCache = updated; // Invalidate/update cache
    return updated;
  },

  // Storage upload helper for logo branding files
  async uploadBrandingLogo(file: File, filename: string): Promise<string> {
    const uformData = new FormData();
    uformData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uformData,
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Upload failed");
    }

    const { url } = await res.json();
    return url;
  },

  // Storage cleanup helper (noop for Cloudinary)
  async deleteBrandingLogo(url: string) {
    // Left as noop
  }
};
