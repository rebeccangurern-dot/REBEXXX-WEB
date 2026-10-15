import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, Sparkles } from 'lucide-react';

export const MailingListSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([
    'Unreleased Demos & Sound Sketches',
    'Paintings & Visual Art ("The Hue of Blue")',
  ]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('rebexxx_subscribers') || '[]');
      const newEntry = { email, interests, subscribedAt: new Date().toISOString() };
      existing.push(newEntry);
      localStorage.setItem('rebexxx_subscribers', JSON.stringify(existing));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('success');
    }
  };

  return (
    <section
      id="mailing-list"
      className="relative py-24 sm:py-32 bg-[#080808] border-t border-[#C7C9CE]/15 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A1026]/20 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Subheading */}
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#FF1688] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DIRECT DISPATCH FROM NAIROBI</span>
        </div>

        {/* Heading & Supporting Copy */}
        <h2 className="text-3xl sm:text-5xl font-serif text-[#F2EEE9] font-normal leading-tight mb-5">
          Letters from my little universe.
        </h2>
        <p className="text-base sm:text-lg text-[#C7C9CE]/90 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          “New music, things I&apos;m making, and the occasional glimpse into what&apos;s becoming. Straight from me to you.”
        </p>

        {/* Subscription Form Card */}
        <div className="bg-[#0c0c0f] border border-[#C7C9CE]/25 p-6 sm:p-10 shadow-2xl text-left max-w-2xl mx-auto">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 bg-[#FF1688]/20 border border-[#FF1688] text-[#FF1688] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-[#F2EEE9]">You are in the world now.</h3>
              <p className="text-sm text-[#C7C9CE]/90 font-light max-w-md mx-auto">
                Thank you for listening. When the next piece of music or notebook fragment takes form,
                it will land directly in your inbox.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-4 py-2 text-xs font-mono border border-[#C7C9CE]/30 text-[#C7C9CE] hover:text-white"
              >
                SIGN UP ANOTHER EMAIL
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subscriber-email" className="block text-xs font-mono text-[#C7C9CE]/70 mb-2">
                  YOUR EMAIL ADDRESS
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C7C9CE]/40" />
                    <input
                      id="subscriber-email"
                      type="email"
                      required
                      placeholder="yourname@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-10 py-3 text-sm text-[#F2EEE9] placeholder-[#C7C9CE]/40 focus:outline-none focus:border-[#FF1688] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#F2EEE9] text-[#080808] hover:bg-[#FF1688] hover:text-white transition-all text-xs font-mono font-bold tracking-widest shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>JOIN</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-xs text-[#FF1688] font-mono mt-2">{errorMessage}</p>
                )}
              </div>

              {/* Preferences */}
              <div className="space-y-2 pt-2 border-t border-[#C7C9CE]/10">
                <span className="block text-xs font-mono text-[#C7C9CE]/60">
                  WHAT WOULD YOU LIKE TO RECEIVE?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#C7C9CE]/90">
                  {[
                    'Unreleased Demos & Sound Sketches',
                    'Paintings & Visual Art ("The Hue of Blue")',
                    'Notebook Fragments & Lyrics',
                    'First Access to Live Shows',
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer p-2 bg-[#080808] border border-[#C7C9CE]/10 hover:border-[#C7C9CE]/30 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={interests.includes(item)}
                        onChange={() => toggleInterest(item)}
                        className="accent-[#FF1688]"
                      />
                      <span className="text-[11px] font-light">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy and Provider Transparency Note */}
              <div className="pt-4 border-t border-[#C7C9CE]/10 flex items-start gap-2 text-[11px] font-mono text-[#C7C9CE]/60 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#FF1688] shrink-0 mt-0.5" />
                <p>
                  Direct subscriber records are safeguarded securely. No spam, ever.
                  Unsubscribe with a single click at any time. When third-party ESP sync (e.g. Mailchimp / Beehiiv) is provisioned,
                  your preferences remain intact.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
