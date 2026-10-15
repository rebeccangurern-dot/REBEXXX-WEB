import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, Mail, Copy, Check, Edit3, Inbox, Trash2, ArrowUpRight, ExternalLink } from 'lucide-react';

interface SavedEnquiry {
  id?: string;
  name: string;
  email: string;
  type: string;
  subject: string;
  message: string;
  sentAt: string;
}

export const ContactSection: React.FC = () => {
  // Official contact email initialized with Rebecca's email, editable at any time
  const [contactEmail, setContactEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('rebexxx_official_contact_email') || 'rebecca.ngure.RN@gmail.com';
    } catch {
      return 'rebecca.ngure.RN@gmail.com';
    }
  });

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(contactEmail);
  const [showInbox, setShowInbox] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Live Performance & Bookings',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<SavedEnquiry | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedEnquiryText, setCopiedEnquiryText] = useState(false);

  // Saved inquiries from localStorage
  const [savedEnquiries, setSavedEnquiries] = useState<SavedEnquiry[]>(() => {
    try {
      const stored = localStorage.getItem('rebexxx_enquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const enquiryTypes = [
    'Live Performance & Bookings',
    'Press, Media & Interviews',
    'Creative & Multidisciplinary Collaborations',
    'Creative & Brand Partnerships',
    'General Enquiries & Messages',
  ];

  const handleSaveContactEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setContactEmail(emailInput.trim());
    try {
      localStorage.setItem('rebexxx_official_contact_email', emailInput.trim());
    } catch {}
    setIsEditingEmail(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const newEnquiry: SavedEnquiry = {
      id: `enq-${Date.now()}`,
      ...formData,
      sentAt: new Date().toISOString(),
    };

    const updated = [newEnquiry, ...savedEnquiries];
    setSavedEnquiries(updated);
    try {
      localStorage.setItem('rebexxx_enquiries', JSON.stringify(updated));
    } catch {}

    setLastSubmission(newEnquiry);
    setSubmitted(true);

    // Auto-generate mailto link
    const mailtoSubject = encodeURIComponent(`[REBEXXX Enquiry] ${formData.type}: ${formData.subject || 'New Message'}`);
    const mailtoBody = encodeURIComponent(
      `Sender: ${formData.name}\nEmail: ${formData.email}\nEnquiry Type: ${formData.type}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n`
    );
    const mailtoHref = `mailto:${contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Copy summary to clipboard automatically for easy pasting into Gmail
    const readableSummary = `[REBEXXX Enquiry]\nFrom: ${formData.name} <${formData.email}>\nType: ${formData.type}\nSubject: ${formData.subject}\n\n${formData.message}`;
    try {
      navigator.clipboard.writeText(readableSummary);
      setCopiedEnquiryText(true);
      setTimeout(() => setCopiedEnquiryText(false), 4000);
    } catch {}

    // Open user's default email client pre-filled
    window.location.href = mailtoHref;
  };

  const handleCopyContact = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDeleteEnquiry = (index: number) => {
    const updated = savedEnquiries.filter((_, idx) => idx !== index);
    setSavedEnquiries(updated);
    try {
      localStorage.setItem('rebexxx_enquiries', JSON.stringify(updated));
    } catch {}
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#080808] border-t border-[#C7C9CE]/15">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#243DCC]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#FF1688]">
            <span>CONTACT & ENQUIRIES</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#C7C9CE]/70">DIRECT CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F2EEE9] font-normal leading-tight">
            Connect with REBEXXX.
          </h2>
          <p className="text-base text-[#C7C9CE]/90 font-light leading-relaxed">
            For live bookings, press and media requests, creative visual collaborations, or direct messages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#0c0c0f] border border-[#C7C9CE]/20 p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in">
                <div className="w-14 h-14 bg-[#FF1688]/20 border border-[#FF1688] text-[#FF1688] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F2EEE9]">
                  Enquiry Prepared for REBEXXX.
                </h3>
                <p className="text-sm text-[#C7C9CE]/90 font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#F2EEE9] font-mono">{formData.name}</span>. Your enquiry has been routed directly to <span className="text-[#FF1688] font-mono">{contactEmail}</span>.
                </p>

                {copiedEnquiryText && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    <Check className="w-3.5 h-3.5" />
                    <span>Message details copied to clipboard ready for email</span>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                      `[REBEXXX Enquiry] ${formData.type}: ${formData.subject || 'New Message'}`
                    )}&body=${encodeURIComponent(
                      `Sender: ${formData.name}\nEmail: ${formData.email}\nType: ${formData.type}\n\nMessage:\n${formData.message}`
                    )}`}
                    className="w-full sm:w-auto px-6 py-3 bg-[#FF1688] hover:bg-[#ff2f96] text-white text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>OPEN IN YOUR EMAIL APP</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        type: 'Live Performance & Bookings',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-mono border border-[#C7C9CE]/30 text-[#C7C9CE] hover:text-white transition-colors"
                  >
                    SEND ANOTHER ENQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-[#C7C9CE]/70 mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Elena Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-4 py-3 text-sm text-[#F2EEE9] placeholder-[#C7C9CE]/40 focus:outline-none focus:border-[#FF1688] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-[#C7C9CE]/70 mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="elena@curator.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-4 py-3 text-sm text-[#F2EEE9] placeholder-[#C7C9CE]/40 focus:outline-none focus:border-[#FF1688] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-type" className="block text-xs font-mono text-[#C7C9CE]/70 mb-2">
                    ENQUIRY TYPE *
                  </label>
                  <select
                    id="contact-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-4 py-3 text-sm text-[#F2EEE9] focus:outline-none focus:border-[#FF1688] transition-colors"
                  >
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#080808] text-[#F2EEE9]">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-[#C7C9CE]/70 mb-2">
                    SUBJECT / PROJECT TITLE
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Festival Performance / Editorial Feature"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-4 py-3 text-sm text-[#F2EEE9] placeholder-[#C7C9CE]/40 focus:outline-none focus:border-[#FF1688] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#C7C9CE]/70 mb-2">
                    MESSAGE / DETAILS *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Provide details about dates, venue, concept, publication, or message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-4 py-3 text-sm text-[#F2EEE9] placeholder-[#C7C9CE]/40 focus:outline-none focus:border-[#FF1688] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F2EEE9] text-[#080808] hover:bg-[#FF1688] hover:text-white transition-all text-xs font-mono font-bold tracking-widest flex items-center justify-center gap-2"
                >
                  <span>SEND DIRECT ENQUIRY</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Representation Directory & Official Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#C7C9CE]/20 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono tracking-widest text-[#FF1688]">
                  OFFICIAL CONTACT DIRECTORY
                </div>
                <h3 className="text-xl font-serif text-[#F2EEE9]">Direct Artist Communications</h3>
                <p className="text-xs text-[#C7C9CE]/80 font-light leading-relaxed">
                  All messages sent through this portfolio route directly to REBEXXX&apos;s personal channel:
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#C7C9CE]/10 text-xs font-mono">
                {/* Official Email Item with Edit Action */}
                <div className="bg-[#080808] border border-[#C7C9CE]/20 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-[#C7C9CE]/60">
                    <span>DIRECT INQUIRIES & BOOKINGS</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmailInput(contactEmail);
                        setIsEditingEmail(!isEditingEmail);
                      }}
                      className="text-[#FF1688] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{isEditingEmail ? 'CANCEL' : 'CHANGE EMAIL'}</span>
                    </button>
                  </div>

                  {isEditingEmail ? (
                    <form onSubmit={handleSaveContactEmail} className="space-y-2 pt-1">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="your-email@gmail.com"
                        className="w-full bg-[#0c0c0f] border border-[#FF1688] px-3 py-2 text-xs text-[#F2EEE9] focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-3 py-1 bg-[#FF1688] text-white text-[10px] font-bold"
                        >
                          SAVE EMAIL
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingEmail(false)}
                          className="px-3 py-1 border border-[#C7C9CE]/30 text-[10px] text-[#C7C9CE]"
                        >
                          CANCEL
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-[#F2EEE9] font-mono break-all">{contactEmail}</span>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="p-1.5 text-[#C7C9CE] hover:text-[#FF1688] transition-colors"
                        title="Compose email"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[#C7C9CE]/50 block text-[10px]">CREATIVE DIRECTION & PRESS</span>
                  <div className="flex items-center justify-between mt-1 text-[#F2EEE9]">
                    <span className="font-mono break-all">{contactEmail}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#C7C9CE]/50 block text-[10px]">LOCATION BASE</span>
                  <div className="mt-1 text-[#F2EEE9]">Nairobi, Kenya (EAT / UTC+3)</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-4 border-t border-[#C7C9CE]/10">
                <button
                  type="button"
                  onClick={handleCopyContact}
                  className="w-full py-2.5 border border-[#C7C9CE]/25 hover:border-[#F2EEE9] text-xs font-mono text-[#C7C9CE] hover:text-[#F2EEE9] flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">EMAIL ADDRESS COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY {contactEmail}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${contactEmail}`}
                  className="w-full py-2.5 bg-[#080808] border border-[#FF1688]/40 hover:border-[#FF1688] text-xs font-mono text-[#FF1688] hover:text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>WRITE DIRECT EMAIL</span>
                </a>
              </div>
            </div>

            {/* Inquiries Archive & Private Inbox Viewer */}
            <div className="p-4 sm:p-5 bg-[#0c0c0f] border border-[#C7C9CE]/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#F2EEE9]">
                  <Inbox className="w-4 h-4 text-[#FF1688]" />
                  <span>YOUR INQUIRIES INBOX</span>
                  <span className="px-1.5 py-0.5 bg-[#FF1688]/20 text-[#FF1688] text-[10px]">
                    {savedEnquiries.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInbox(!showInbox)}
                  className="text-xs font-mono text-[#FF1688] hover:underline"
                >
                  {showInbox ? 'HIDE INBOX' : 'VIEW INBOX'}
                </button>
              </div>

              <p className="text-[11px] text-[#C7C9CE]/70 leading-relaxed">
                Messages submitted on this site are automatically preserved here in your browser storage so you can review and respond to them anytime.
              </p>

              {showInbox && (
                <div className="pt-3 border-t border-[#C7C9CE]/10 space-y-3 max-h-80 overflow-y-auto">
                  {savedEnquiries.length === 0 ? (
                    <div className="py-6 text-center text-xs font-mono text-[#C7C9CE]/50">
                      No enquiries received yet. Try sending a test message!
                    </div>
                  ) : (
                    savedEnquiries.map((enq, idx) => (
                      <div
                        key={enq.id || idx}
                        className="p-3 bg-[#080808] border border-[#C7C9CE]/15 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#C7C9CE]/60">
                          <span className="text-[#FF1688] font-semibold">{enq.type}</span>
                          <span>{new Date(enq.sentAt).toLocaleDateString()}</span>
                        </div>
                        <div className="font-serif text-[#F2EEE9] text-sm">
                          {enq.name}{' '}
                          <span className="text-xs font-mono text-[#C7C9CE]/70 font-normal">
                            ({enq.email})
                          </span>
                        </div>
                        {enq.subject && (
                          <div className="text-xs font-mono text-[#C7C9CE]">
                            Subject: {enq.subject}
                          </div>
                        )}
                        <p className="text-xs text-[#C7C9CE]/90 font-light leading-relaxed bg-[#0c0c0f] p-2 border border-[#C7C9CE]/10">
                          {enq.message}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <a
                            href={`mailto:${enq.email}?subject=RE: ${encodeURIComponent(enq.subject || enq.type)}`}
                            className="text-[11px] font-mono text-[#FF1688] hover:underline flex items-center gap-1"
                          >
                            <span>REPLY VIA EMAIL</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDeleteEnquiry(idx)}
                            className="text-[#C7C9CE]/50 hover:text-rose-400 p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Note on representation */}
            <div className="p-4 bg-[#080808] border border-[#C7C9CE]/15 text-xs font-mono text-[#C7C9CE]/60 leading-relaxed">
              * Direct artist management. Formal agency representation and publishing appointments will be published here upon debut release execution.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
