'use client';

import React, { useState } from 'react';
import { leadsService } from '@/services/leads.service';

const COUNTRY_OPTIONS = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
];

const LOOKING_FOR_OPTIONS_COL1 = [
  'Website Development',
  'Performance Marketing',
  'Content',
  'Other',
];

const LOOKING_FOR_OPTIONS_COL2 = [
  'SEO / GEO',
  'Design',
  'Software Development',
];

export default function ScanForm() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    countryCode: '+91',
    email: '',
    companyName: '',
    lookingFor: [] as string[],
    otherText: '',
  });

  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [lookingForError, setLookingForError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      if (emailTouched) {
        setEmailError(!validateEmail(value));
      }
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (formState.email.trim() && !validateEmail(formState.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const toggleLookingFor = (option: string) => {
    setLookingForError(false);
    setFormState(prev => {
      const exists = prev.lookingFor.includes(option);
      const updated = exists
        ? prev.lookingFor.filter(item => item !== option)
        : [...prev.lookingFor, option];
      return { ...prev, lookingFor: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);

    if (!formState.email || !validateEmail(formState.email)) {
      setEmailError(true);
      return;
    }

    if (formState.lookingFor.length === 0) {
      setLookingForError(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const finalLookingFor = formState.lookingFor.map(item => {
      if (item === 'Other' && formState.otherText.trim()) {
        return `Other: ${formState.otherText.trim()}`;
      }
      return item;
    });

    try {
      await leadsService.submitScanRequest({
        name: formState.name,
        phone: `${formState.countryCode} ${formState.phone.trim()}`,
        email: formState.email.trim(),
        companyName: formState.companyName.trim(),
        lookingFor: finalLookingFor,
        countryCode: formState.countryCode,
      });

      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormState({
        name: '',
        phone: '',
        countryCode: '+91',
        email: '',
        companyName: '',
        lookingFor: [],
        otherText: '',
      });
      setEmailTouched(false);
      setEmailError(false);
    } catch (err) {
      console.error('Scan form submission error:', err);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  return (
    <section id="scan-content" className="pt-6 pb-16 md:pt-8 md:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
      {/* 2-Column Grid Layout with Balanced Height */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* Left Column (Contact Cards & Map) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Phone and Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone Card */}
            <a 
              href="tel:+917022511122" 
              className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0F1015] border border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:border-[#8B5CF6]/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-[#8B5CF6] mb-2.5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[13px] font-bold text-[#8B5CF6] uppercase tracking-wider mb-0.5">Phone</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold text-center text-xs break-all">+91 70225 11122</span>
            </a>

            {/* Email Card */}
            <a 
              href="mailto:info@digitory.com" 
              className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0F1015] border border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:border-[#8B5CF6]/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-[#8B5CF6] mb-2.5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[13px] font-bold text-[#8B5CF6] uppercase tracking-wider mb-0.5">Email</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold text-center text-xs break-all">info@digitory.com</span>
            </a>
            
          </div>

          {/* Address Card */}
          <div className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0F1015] border border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:border-[#8B5CF6]/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] transition-all duration-300 transform hover:-translate-y-0.5 group text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-[#8B5CF6] mb-2.5 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-[13px] font-bold text-[#8B5CF6] uppercase tracking-wider mb-0.5">Address</span>
            <span className="text-zinc-800 dark:text-zinc-200 font-semibold text-center text-xs leading-relaxed max-w-xs">
              DIGITORY SOLUTIONS PRIVATE LIMITED
              <br />
              #85, 1st Floor, Vaibhav Bldg Gandhi Bazaar Main Road, Basavangudi, Bangalore - 560004
            </span>
          </div>

          {/* Map Card */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex-1 min-h-[220px] w-full group">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Vaibhav+Bldg+Gandhi+Bazaar+Main+Road+Basavangudi+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 z-10 bg-white/95 dark:bg-[#121318]/95 backdrop-blur-sm text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold flex items-center gap-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-[0.97]"
            >
              Open in Maps
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <iframe
              src="https://maps.google.com/maps?q=Vaibhav%20Bldg%20Gandhi%20Bazaar%20Main%20Road,%20Basavangudi,%20Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 min-h-[220px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* Right Column (Form Card styled cleanly with light/dark adaptive theme) */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0F1015] border border-zinc-200/90 dark:border-zinc-800/90 p-6 sm:p-7 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
          
          {submitStatus === 'success' ? (
            <div className="text-center py-10 space-y-4 animate-[fadeIn_0.3s_ease-out] my-auto">
              <div className="w-14 h-14 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 text-[#8B5CF6] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Form Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Thank you! Your details have been received. Our team will review your requirements and get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus('idle')}
                className="mt-3 px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                Submit Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Fill in the Form
                  </h2>
                </div>

                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full bg-[#FAFAFA] dark:bg-[#08080a] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                    />
                  </div>

                  {/* Phone with Country selector */}
                  <div className="flex bg-[#FAFAFA] dark:bg-[#08080a] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden focus-within:border-[#8B5CF6] focus-within:ring-1 focus-within:ring-[#8B5CF6] transition-colors">
                    <div className="relative flex items-center pl-3 pr-1 shrink-0 border-r border-zinc-200 dark:border-zinc-800">
                      <select
                        aria-label="Country Code"
                        value={formState.countryCode}
                        onChange={(e) => setFormState(prev => ({ ...prev, countryCode: e.target.value }))}
                        className="bg-transparent text-xs text-zinc-700 dark:text-zinc-300 font-medium cursor-pointer focus:outline-none appearance-none pr-4"
                      >
                        {COUNTRY_OPTIONS.map((c) => (
                          <option key={c.name} value={c.code} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-1 text-[9px] text-zinc-400">▼</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      className="w-full bg-transparent px-3 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="space-y-1">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    onBlur={handleEmailBlur}
                    placeholder="Email"
                    className={`w-full bg-[#FAFAFA] dark:bg-[#08080a] border rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none transition-colors ${
                      emailError
                        ? 'border-red-600 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]'
                    }`}
                  />
                  {emailError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500 pt-0.5 animate-[fadeIn_0.2s_ease-out]">
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-red-500 text-[9px] font-bold">
                        !
                      </span>
                      <span>Enter an email address like example@mysite.com.</span>
                    </div>
                  )}
                </div>

                {/* Row 3: Company Name */}
                <div>
                  <input
                    type="text"
                    name="companyName"
                    value={formState.companyName}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className="w-full bg-[#FAFAFA] dark:bg-[#08080a] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                  />
                </div>

                {/* Section: Looking For? */}
                <div className="pt-1 space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Looking For?
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {/* Column 1 */}
                    <div className="space-y-2">
                      {LOOKING_FOR_OPTIONS_COL1.map((opt) => {
                        const checked = formState.lookingFor.includes(opt);
                        return (
                          <label
                            key={opt}
                            className="flex items-center gap-2.5 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white cursor-pointer select-none group"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleLookingFor(opt)}
                              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[#7C3AED] focus:ring-0 cursor-pointer accent-[#7C3AED]"
                            />
                            <span className="transition-colors group-hover:text-zinc-950 dark:group-hover:text-white">
                              {opt}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-2">
                      {LOOKING_FOR_OPTIONS_COL2.map((opt) => {
                        const checked = formState.lookingFor.includes(opt);
                        return (
                          <label
                            key={opt}
                            className="flex items-center gap-2.5 text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white cursor-pointer select-none group"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleLookingFor(opt)}
                              className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[#7C3AED] focus:ring-0 cursor-pointer accent-[#7C3AED]"
                            />
                            <span className="transition-colors group-hover:text-zinc-950 dark:group-hover:text-white">
                              {opt}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Other text input if Other is checked */}
                  {formState.lookingFor.includes('Other') && (
                    <div className="pt-1.5 animate-[fadeIn_0.2s_ease-out]">
                      <input
                        type="text"
                        name="otherText"
                        value={formState.otherText}
                        onChange={handleInputChange}
                        placeholder="Please specify other requirement..."
                        className="w-full bg-[#FAFAFA] dark:bg-[#08080a] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  )}

                  {lookingForError && (
                    <p className="text-xs text-red-500 pt-0.5">
                      Please select at least one option under Looking For.
                    </p>
                  )}
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl text-xs text-red-600 dark:text-red-400">
                    Something went wrong while submitting. Please try again.
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center items-center py-3 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold shadow-md shadow-purple-600/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
