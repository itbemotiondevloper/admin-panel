'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { settingsService } from '@/services/settings.service';

export default function AnalyticsScripts() {
  const [analytics, setAnalytics] = useState<{
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    customHeadScripts?: string;
    customBodyScripts?: string;
  } | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const s = await settingsService.getSettings();
        if (s.analytics) {
          setAnalytics(s.analytics);
        }
      } catch (err) {
        console.warn('Failed to load analytics settings:', err);
      }
    };

    loadAnalytics();
  }, []);

  if (!analytics) return null;

  const gaId = analytics.googleAnalyticsId?.trim();
  const fbPixelId = analytics.facebookPixelId?.trim();

  return (
    <>
      {/* Google Analytics 4 (GA4) */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Meta / Facebook Pixel */}
      {fbPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
