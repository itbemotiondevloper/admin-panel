'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import FooterPage from '../../components/Footer';
import { leadsService } from '@/services/leads.service';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    category: '',
    purpose: 'Restaurant OS',
    message: '',
  });

  const categories = [
    'Pop-up restaurant & food truck',
    'Restaurant & retail hybrid',
    'Casual & fine dining',
    'Pizzeria, café & ice cream parlour',
    'Cloud Kitchen',
    'Quick Service Restaurant (QSR)',
    'Micro Brewery',
    'Nightclub & dance floor',
    'Bar & restaurant',
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await leadsService.submitContactMessage({
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
        businessName: formState.businessName,
        category: formState.category || '',
        purpose: formState.purpose,
        message: formState.message,
      });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormState({
        name: '',
        phone: '',
        email: '',
        businessName: '',
        category: '',
        purpose: 'Restaurant OS',
        message: '',
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#08080a] transition-colors duration-300 flex flex-col font-sans relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="flex-1 w-full bg-[#fafafa] dark:bg-[#08080a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">

        {/* Cinematic Video Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[80vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
            {/* Desktop Version */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="hidden md:block w-full h-full object-cover scale-[1.01]"
            >
              <source src="/Digitory.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Mobile Version */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="block md:hidden w-full h-full object-cover scale-[1.01]"
            >
              <source src="/mobile.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* Form and Info Section */}
        <section id="contact-content" className="pt-6 pb-16 md:pt-8 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

            {/* Left Column (Cards and Map) */}
            <div className="lg:col-span-5 flex flex-col gap-6 h-full">

              {/* Phone and Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Phone Card */}
                <a 
                  href="tel:+917022511122" 
                  className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-[#0F1015] border border-zinc-200 dark:border-zinc-800/80 shadow-md hover:border-[#FF4F18]/50 hover:shadow-[0_8px_30px_rgba(255,79,24,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,79,24,0.15)] transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-[#FF4F18]/10 flex items-center justify-center text-[#FF4F18] mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[15px] font-bold text-[#FF4F18] uppercase tracking-wider mb-1">Phone</span>
                  <span className="text-zinc-800 dark:text-zinc-100 font-semibold text-center text-sm break-all">+91 70225 11122</span>
                </a>

                {/* Email Card */}
                <a 
                  href="mailto:info@digitory.com" 
                  className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-[#0F1015] border border-zinc-200 dark:border-zinc-800/80 shadow-md hover:border-[#FF4F18]/50 hover:shadow-[0_8px_30px_rgba(255,79,24,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,79,24,0.15)] transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-[#FF4F18]/10 flex items-center justify-center text-[#FF4F18] mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[15px] font-bold text-[#FF4F18] uppercase tracking-wider mb-1">Email</span>
                  <span className="text-zinc-800 dark:text-zinc-100 font-semibold text-center text-sm break-all">info@digitory.com</span>
                </a>

              </div>

              {/* Address Card */}
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-[#0F1015] border border-zinc-200 dark:border-zinc-800/80 shadow-md hover:border-[#FF4F18]/50 hover:shadow-[0_8px_30px_rgba(255,79,24,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,79,24,0.15)] transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-[#FF4F18]/10 flex items-center justify-center text-[#FF4F18] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[15px] font-bold text-[#FF4F18] uppercase tracking-wider mb-1">Address</span>
                <span className="text-zinc-800 dark:text-zinc-100 font-semibold text-center text-sm leading-relaxed max-w-sm">
                  DIGITORY SOLUTIONS PRIVATE LIMITED
                  <br />
                  #85, 1st Floor, Vaibhav Bldg Gandhi Bazaar Main Road, Basavangudi, Bangalore - 560004
                </span>
              </div>

              {/* Map Card */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200/80 shadow-md min-h-[320px] flex-1 w-full group">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Vaibhav+Bldg+Gandhi+Bazaar+Main+Road+Basavangudi+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 z-10 bg-white dark:bg-[#121318] text-blue-600 dark:text-blue-400 px-3.5 py-2 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-[0.97]"
                >
                  Open in Maps
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <iframe
                  src="https://maps.google.com/maps?q=Vaibhav%20Bldg%20Gandhi%20Bazaar%20Main%20Road,%20Basavangudi,%20Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 dark-map"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

            {/* Right Column (Form) */}
            <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0F1015] border border-zinc-200 dark:border-zinc-800/80 p-8 sm:p-10 shadow-md flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#08080a] px-4 py-3.5 text-sm text-zinc-950 dark:text-white placeholder-zinc-400 focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#08080a] px-4 py-3.5 text-sm text-zinc-950 dark:text-white placeholder-zinc-400 focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#08080a] px-4 py-3.5 text-sm text-zinc-950 dark:text-white placeholder-zinc-400 focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Business Name */}
                  <div className="space-y-2">
                    <label htmlFor="businessName" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Business Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      value={formState.businessName}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#08080a] px-4 py-3.5 text-sm text-zinc-955 dark:text-white placeholder-zinc-400 focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Choose Category */}
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Choose Category
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        value={formState.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#08080a] px-4 py-3.5 text-sm text-zinc-950 dark:text-white focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] outline-none transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select Category</option>
                        {categories.map((cat, idx) => (
                          <option key={cat + '-' + idx} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="space-y-2">
                    <label htmlFor="purpose" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Purpose
                    </label>
                    <div className="relative">
                      <select
                        id="purpose"
                        name="purpose"
                        value={formState.purpose}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#08080a] px-4 py-3.5 text-sm text-zinc-950 dark:text-white focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] outline-none transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="Restaurant OS">Restaurant OS</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Query">Query</option>
                        <option value="Others">Others</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Message"
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#08080a] px-4 py-3.5 text-sm text-zinc-950 dark:text-white placeholder-zinc-400 focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] outline-none transition-all duration-200 resize-none"
                    />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {/* Status Indicator */}
                  {submitStatus === 'success' && (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4 flex gap-3 text-emerald-800 dark:text-emerald-400 text-sm">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="font-bold">Message sent successfully!</span> Thank you for reaching out. We will get back to you shortly.
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center items-center text-center rounded-full bg-[#FF4F18] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#E03F0D] shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] active:scale-[0.98] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
