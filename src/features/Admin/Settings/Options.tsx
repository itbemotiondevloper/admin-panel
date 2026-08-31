'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { settingsService } from '@/services/settings.service';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface OptionsProps {
  className?: string;
}

export default function Options({ className }: OptionsProps) {
  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Settings variables
  const [logoBlackUrl, setLogoBlackUrl] = useState('/digitory-black.png');
  const [logoWhiteUrl, setLogoWhiteUrl] = useState('/digitory-white.png');
  const [companyName, setCompanyName] = useState('Digitory');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const s = await settingsService.getSettings(true);
        if (s.branding) {
          if (s.branding.logo) setLogoBlackUrl(s.branding.logo);
          if (s.branding.logoWhite) setLogoWhiteUrl(s.branding.logoWhite);
          if (s.branding.companyName) setCompanyName(s.branding.companyName);
        }
      } catch (err) {
        console.error('Failed to load branding settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, target: 'black' | 'white') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setMessage('Uploading...');
      const url = await settingsService.uploadBrandingLogo(file, file.name);
      
      if (target === 'black') {
        // Clean up previous custom logo if dynamic
        if (logoBlackUrl.includes('firebasestorage')) {
          await settingsService.deleteBrandingLogo(logoBlackUrl);
        }
        setLogoBlackUrl(url);
        localStorage.setItem('branding_logo_black', url);
      } else {
        if (logoWhiteUrl.includes('firebasestorage')) {
          await settingsService.deleteBrandingLogo(logoWhiteUrl);
        }
        setLogoWhiteUrl(url);
        localStorage.setItem('branding_logo_white', url);
      }
      window.dispatchEvent(new Event('branding_logo_update'));
      setMessage('✅ Logo uploaded successfully!');
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('❌ Failed to upload logo image');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await settingsService.saveSettings({
        branding: {
          logo: logoBlackUrl,
          logoWhite: logoWhiteUrl,
          companyName
        }
      });
      setMessage('✅ Branding settings updated successfully!');
      
      localStorage.setItem('branding_logo_black', logoBlackUrl);
      localStorage.setItem('branding_logo_white', logoWhiteUrl);
      window.dispatchEvent(new Event('branding_logo_update'));
    } catch (err: any) {
      console.error(err);
      setMessage('❌ ' + (err.message || 'Failed to update branding settings'));
    } finally {
      setSaving(false);
    }
  };

  const logOutHandler = async () => {
    setLoggingOut(true);
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-zinc-400">
        <div className="w-6 h-6 border-2 border-[#FF4F18] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading settings...
      </div>
    );
  }

  return (
    <div className={clsx("space-y-8 max-w-4xl", className)}>
      <form onSubmit={handleSaveSettings} className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white mb-1">Navbar Logo & Branding Settings</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Upload custom logo assets for the admin panel header layout.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Light Mode (Black Logo) */}
          <div className="p-5 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-850 rounded-2xl space-y-4">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-zinc-400 mb-1">Logo (Light Theme)</h3>
              <p className="text-[10px] text-zinc-550 leading-tight">Image displayed inside Sidebar navigation on light mode screens.</p>
            </div>
            
            <div className="h-16 w-full flex items-center justify-center bg-white rounded-xl border border-zinc-150 p-2">
              <img src={logoBlackUrl} alt="Light Mode Logo Preview" className="h-8 max-w-full object-contain" onError={(e) => { e.currentTarget.src = '/digitory-black.png'; }} />
            </div>

            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[#FF4F18]/50 px-4 py-3 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-zinc-900 transition-colors text-xs font-semibold">
              <Upload size={14} className="text-zinc-400" />
              <span>Upload Light Theme Logo</span>
              <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e, 'black')} className="hidden" />
            </label>
          </div>

          {/* Logo Dark Mode (White Logo) */}
          <div className="p-5 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-850 rounded-2xl space-y-4">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-zinc-400 mb-1">Logo (Dark Theme)</h3>
              <p className="text-[10px] text-zinc-550 leading-tight">Image displayed inside Sidebar navigation on dark mode screens.</p>
            </div>

            <div className="h-16 w-full flex items-center justify-center bg-zinc-900 rounded-xl border border-zinc-800 p-2">
              <img src={logoWhiteUrl} alt="Dark Mode Logo Preview" className="h-8 max-w-full object-contain" onError={(e) => { e.currentTarget.src = '/digitory-white.png'; }} />
            </div>

            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[#FF4F18]/50 px-4 py-3 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-zinc-900 transition-colors text-xs font-semibold">
              <Upload size={14} className="text-zinc-400" />
              <span>Upload Dark Theme Logo</span>
              <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e, 'white')} className="hidden" />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-zinc-500">Company / Brand Name</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full max-w-md px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF4F18]"
            placeholder="Digitory"
          />
        </div>

        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between gap-4">
          {message && (
            <p className={clsx("text-xs font-bold flex items-center gap-1.5", message.startsWith('✅') ? 'text-green-600 dark:text-green-400' : 'text-red-650 dark:text-red-400')}>
              {message.startsWith('✅') ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span>{message}</span>
            </p>
          )}
          <Button type="submit" disabled={saving} className="bg-[#FF4F18] text-white hover:bg-[#E03F0D] font-extrabold px-6 py-2.5 rounded-xl text-xs ml-auto shrink-0 shadow-xs cursor-pointer">
            {saving ? 'Saving...' : 'Save Branding Changes'}
          </Button>
        </div>
      </form>

      <div className="bg-red-50/30 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/20 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-extrabold text-red-600 dark:text-red-500 mb-0.5">Logout from Console</h3>
          <p className="text-xs text-zinc-500">Sign out of active admin sessions and return to the secure login gateway page.</p>
        </div>
        <Button
          disabled={loggingOut}
          variant="destructive"
          onClick={logOutHandler}
          className="font-extrabold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-xs shrink-0"
        >
          {loggingOut ? 'Logging out...' : 'Logout Session'}
        </Button>
      </div>
    </div>
  );
}
