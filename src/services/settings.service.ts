import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';

export interface SettingsData {
  branding: {
    logo: string;
    logoWhite: string;
    companyName: string;
  };
  solutionsGridTitle: string;
  solutionsGridDesc: string;
  customCategories?: string[];
}

const DEFAULT_SETTINGS: SettingsData = {
  branding: {
    logo: '/digitory-black.png',
    logoWhite: '/digitory-white.png',
    companyName: 'Digitory'
  },
  solutionsGridTitle: 'Twelve powerful features to help your restaurant run better',
  solutionsGridDesc: 'Click on any feature card below to open its full specifications and details on a new page.',
  customCategories: []
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
        settingsCache = {
          branding: {
            logo: data.branding?.logo || DEFAULT_SETTINGS.branding.logo,
            logoWhite: data.branding?.logoWhite || DEFAULT_SETTINGS.branding.logoWhite,
            companyName: data.branding?.companyName || DEFAULT_SETTINGS.branding.companyName
          },
          solutionsGridTitle: data.solutionsGridTitle || DEFAULT_SETTINGS.solutionsGridTitle,
          solutionsGridDesc: data.solutionsGridDesc || DEFAULT_SETTINGS.solutionsGridDesc,
          customCategories: data.customCategories || DEFAULT_SETTINGS.customCategories
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
        companyName: payload.branding?.companyName || current.branding.companyName
      },
      solutionsGridTitle: payload.solutionsGridTitle || current.solutionsGridTitle,
      solutionsGridDesc: payload.solutionsGridDesc || current.solutionsGridDesc,
      customCategories: payload.customCategories || current.customCategories || []
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
