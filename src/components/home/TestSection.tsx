'use client';

import React from 'react';

export default function TestSection() {
  interface Step {
    num: number;
    title: string;
    desc: string;
    highlighted: boolean;
    isGreen?: boolean;
  }

  const steps: Step[] = [
    {
      num: 1,
      title: 'Orders synced',
      desc: 'Every order is updated instantly.',
      highlighted: false,
    },
    {
      num: 2,
      title: 'Inventory updated',
      desc: 'Always know what\'s in stock.',
      highlighted: false,
    },
    {
      num: 3,
      title: 'Live sales',
      desc: "See what's selling in real time.",
      highlighted: false,
    },
    {
      num: 4,
      title: 'Kitchen status',
      desc: 'Track every order from start to finish.',
      highlighted: false,
    },
    {
      num: 5,
      title: 'Digitory brings it all together',
      desc: 'Orders. Inventory. Sales. Operations.',
      highlighted: true,
    },
  ];

  const [messages, setMessages] = React.useState<any[]>([
    {
      role: 'Chef',
      text: "Table 12's order isn't showing in the kitchen. 🍳",
      time: '7:42 PM',
      avatarColor: 'bg-emerald-100 text-emerald-700',
      avatarLabel: '👨‍🍳',
    }
  ]);

  const [typedMessage, setTypedMessage] = React.useState('');
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  const presetMessages = [
    {
      role: 'Inventory',
      text: "We're out of paneer. Please stop taking paneer orders. 📦",
      time: '7:45 PM',
      avatarColor: 'bg-orange-100 text-orange-700',
      avatarLabel: '📦',
    },
    {
      role: 'Cashier',
      text: 'Billing has stopped. Customers are waiting. 🧾',
      time: '7:48 PM',
      avatarColor: 'bg-blue-100 text-blue-700',
      avatarLabel: '💵',
    },
    {
      role: 'Manager',
      text: "Can you share today's sales till now? 👔",
      time: '7:52 PM',
      avatarColor: 'bg-amber-100 text-amber-700',
      avatarLabel: '👔',
    },
    {
      role: 'Captain',
      text: 'Three orders are delayed. Guests are asking. ⏱️',
      time: '7:53 PM',
      avatarColor: 'bg-indigo-100 text-indigo-700',
      avatarLabel: '🤵',
    },
  ];

  React.useEffect(() => {
    let active = true;
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (!active) return;
      if (currentIdx < presetMessages.length) {
        const nextMsg = presetMessages[currentIdx];
        setMessages(prev => {
          if (prev.some(m => m.text === nextMsg.text)) {
            return prev;
          }
          return [...prev, nextMsg];
        });
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      {
        role: 'You',
        text: typedMessage,
        time: timeStr,
        avatarColor: 'bg-[#FFF3EF] text-[#FF4F18]',
        avatarLabel: '👤',
        isOutgoing: true,
      }
    ]);
    setTypedMessage('');
  };

  return (
    <div className="w-full">
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-16">
        {/* Section Heading */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-[44px] font-[850] tracking-tight text-[#111111] leading-[1.15] mb-10 md:mb-12">
          Can your restaurant handle a busy          <br />
          <span className="text-[#FF4F18]">saturday night?</span>
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12 items-center">

          {/* Left: WhatsApp Mockup Image */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-[440px] rounded-[32px] bg-[#F0EBE3] shadow-2xl overflow-hidden relative">
              <style dangerouslySetInnerHTML={{
                __html: `
                .dark-map .bg-white {
                  background-color: #1a1a1c !important;
                }
                .dark-map .text-zinc-800 {
                  color: #ffffff !important;
                }
                .dark .bg-\\[\\#D9FDD3\\] {
                  background-color: #1f1f22 !important;
                  color: #ffffff !important;
                }
                .dark .bg-\\[\\#D9FDD3\\] p {
                  color: #ffffff !important;
                }
                .dark .bg-\\[\\#D9FDD3\\] span {
                  color: #FF4F18 !important;
                }
                /* Mute outgoing message time span color to match other bubble elements */
                .dark .bg-\\[\\#D9FDD3\\] span.absolute {
                  color: #71717a !important;
                }
              `}} />

              {/* Phone Header */}
              <div className="bg-[#005C4B] px-4 py-4 flex items-center justify-between text-white select-none">
                <div className="flex items-center gap-3">
                  {/* Back Arrow */}
                  <svg className="h-5 w-5 opacity-90 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>

                  {/* Group Avatar */}
                  <div className="h-10 w-10 rounded-full bg-[#CFEBE7] dark:bg-[#003c34] flex items-center justify-center shrink-0 border border-white/20 select-none">
                    <svg
                      className="h-6 w-6 text-[#008070] dark:text-[#00e6cc]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>

                  {/* Header Information */}
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Restaurant Operations</h3>
                    <span className="text-[11px] text-emerald-100/80">12 members, 3 online</span>
                  </div>
                </div>

                {/* Call/Menu Icons */}
                <div className="flex items-center gap-4 text-white/95">
                  <svg className="h-5 w-5 cursor-pointer hover:opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                  </svg>
                  <svg className="h-5 w-5 cursor-pointer hover:opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a.987.987 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.7 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z" />
                  </svg>
                  <svg className="h-5 w-5 cursor-pointer hover:opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
              </div>

              {/* Chat Area */}
              <div ref={chatContainerRef} className="p-4 space-y-4 h-[400px] overflow-y-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                {/* Date Separator */}
                <div className="flex justify-center my-2">
                  <span className="bg-white/80 backdrop-blur-xs text-[11px] text-zinc-500 font-medium px-3 py-1 rounded-md shadow-xs select-none">
                    Today
                  </span>
                </div>

                {/* Chat Messages */}
                {messages.map((msg, index) => {
                  const isOutgoing = msg.role === 'You' || msg.isOutgoing;
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-2.5 transition-all duration-300 hover:translate-x-1 animate-[fadeIn_0.3s_ease-out] ${
                        isOutgoing ? 'flex-row-reverse justify-start' : ''
                      }`}
                    >
                      {/* Avatar */}
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-xs shrink-0 text-sm select-none ${msg.avatarColor}`}>
                        {msg.avatarLabel}
                      </div>

                      {/* Message Bubble */}
                      <div className={`rounded-2xl px-3.5 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.08)] max-w-[82%] relative flex flex-col ${
                        isOutgoing 
                          ? 'bg-[#D9FDD3] dark:bg-zinc-850 text-zinc-900 dark:text-white rounded-tr-none' 
                          : 'bg-white dark:bg-zinc-800/90 rounded-tl-none text-zinc-850 dark:text-zinc-100'
                      }`}>
                        <span className={`text-[11px] font-bold mb-0.5 leading-none ${
                          isOutgoing ? 'text-[#00a884]' : 'text-[#FF4F18]'
                        }`}>
                          {msg.role}
                        </span>
                        <p className="text-[13px] leading-snug pr-8 py-0.5 whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                        <span className="text-[9px] text-zinc-400 absolute bottom-1 right-2 leading-none">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mock Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="bg-[#F0F2F5] px-3 py-3 border-t border-zinc-200/50 flex items-center gap-2 select-none">
                <div className="flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5 flex-1 shadow-xs border border-zinc-200/20">
                  {/* Emoji Icon */}
                  <svg className="h-5.5 w-5.5 text-zinc-500 cursor-pointer shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  {/* Text Field input */}
                  <input
                    type="text"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-transparent text-zinc-800 text-xs focus:outline-none placeholder-zinc-400"
                  />

                  {/* Attachment Icon */}
                  <svg className="h-5 w-5 text-zinc-500 cursor-pointer -rotate-45 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </div>

                {/* Send/Microphone Button */}
                <button 
                  type="submit"
                  className="bg-[#00a884] h-9 w-9 rounded-full flex items-center justify-center text-white shadow-sm shrink-0 active:scale-95 transition-transform cursor-pointer"
                >
                  {typedMessage.trim() ? (
                    <svg className="h-5 w-5 fill-current text-white pl-0.5" viewBox="0 0 24 24">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                  ) : (
                    <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </button>
              </form>

            </div>
          </div>

          {/* Right: Steps Timeline */}
          <div className="lg:col-span-6 w-full max-w-[480px] mx-auto lg:ml-auto">
            <div className="relative pl-16 space-y-8 py-4">

              {/* Vertical timeline line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-[#FF4F18]" />

              {steps.map((step) => (
                <div key={step.num} className="relative flex items-start group">

                  {/* Number Circle */}
                  <div className="absolute -left-16 flex items-center justify-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-bold text-base transition-all duration-300 ${
                        step.isGreen
                          ? 'bg-[#13B257] border-[#13B257] text-white shadow-[0_4px_12px_rgba(19,178,87,0.35)]'
                          : step.highlighted
                          ? 'bg-[#FF4F18] border-[#FF4F18] text-white shadow-[0_4px_12px_rgba(255,79,24,0.35)]'
                          : 'bg-white border-[#FF4F18] text-zinc-800'
                      }`}
                    >
                      {step.num}
                    </div>
                  </div>

                  {/* Step Text Info */}
                  <div className="w-full pb-5 border-b border-[#FF4F18]/25">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-zinc-950 leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-zinc-550 text-xs sm:text-sm mt-1 leading-normal">
                      {step.desc}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
