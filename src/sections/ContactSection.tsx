import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Send,
  FileText,
  UserPlus,
  Terminal,
  Phone,
  MapPin,
} from 'lucide-react';
import { GithubIcon } from '../components/common/Icons';
import type { ProfileData } from '../types/portfolio';
import { SectionHeading } from '../components/common/SectionHeading';
import { useTheme } from '../context/ThemeContext';

interface ContactSectionProps {
  profile: ProfileData;
  onOpenConfigDrawer: () => void;
}

export function ContactSection({ profile, onOpenConfigDrawer }: ContactSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    senderEmail: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleCopyPhone = async () => {
    if (!profile.phone) return;
    try {
      await navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSubject = encodeURIComponent(
      formState.subject || `Inquiry for ${profile.name}: ${formState.name || 'Technical Recruiter'}`
    );
    const bodyContent = `Sender Name: ${formState.name}\nSender Email: ${formState.senderEmail}\n\nMessage:\n${formState.message}`;
    const encodedBody = encodeURIComponent(bodyContent);

    window.location.href = `mailto:${profile.email}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <section id="contact" className="py-14 sm:py-16 border-t relative transition-colors border-slate-200/80 dark:border-slate-800/80 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Initiate Conversation"
          title="Direct Contact & Channels"
          description="Ready for senior full-stack and microservices engineering discussions. Reach out directly via email, phone, or download resume."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Verified Channels Card */}
            <div className={`animate-on-scroll rounded-3xl border p-7 sm:p-8 backdrop-blur-md relative overflow-hidden transition-all duration-300 ${
              isLight
                ? 'bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.03)]'
                : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none ${
                isLight ? 'bg-sky-200/20' : 'bg-sky-500/10'
              }`} />

              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isLight ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  Verified Contact Information
                </span>
              </div>

              <h3 className={`text-xl font-black mb-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {profile.name}
              </h3>
              <p className={`text-xs mb-5 font-mono font-bold ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                {profile.targetRole} • {profile.location}
              </p>

              {/* Email row */}
              <div className="space-y-3 mb-6">
                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 font-mono text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/90 border-slate-800'
                }`}>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                    <a
                      href={`mailto:${profile.email}`}
                      className={`truncate transition-colors font-bold ${
                        isLight ? 'text-slate-900 hover:text-sky-700' : 'text-slate-200 hover:text-sky-300'
                      }`}
                    >
                      {profile.email}
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      isLight
                        ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-sm'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                    }`}
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone row */}
                {profile.phone && (
                  <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 font-mono text-xs ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/90 border-slate-800'
                  }`}>
                    <div className="flex items-center gap-2 truncate">
                      <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                      <a
                        href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                        className={`truncate transition-colors font-bold ${
                          isLight ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-200 hover:text-emerald-300'
                        }`}
                      >
                        {profile.phone}
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                        isLight
                          ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                      }`}
                      title="Copy phone to clipboard"
                      aria-label="Copy phone"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {/* Location row */}
                {profile.location && (
                  <div className={`p-3 rounded-xl border flex items-center gap-2 font-mono text-xs ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950/90 border-slate-800 text-slate-400'
                  }`}>
                    <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Current: {profile.location} (Permanent: Cuttack, Odisha)</span>
                  </div>
                )}
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-md shadow-sky-500/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>

                {profile.resume.available && profile.resume.url && (
                  <a
                    href={profile.resume.url}
                    download={profile.resume.fileName}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download CV</span>
                  </a>
                )}
              </div>
            </div>

            {/* Resume & Social Links Card */}
            <div className={`animate-on-scroll rounded-2xl border p-6 space-y-4 transition-colors ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-800/80'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-bold font-mono uppercase tracking-wider ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Professional Profiles & Resume
                </h4>
                <button
                  type="button"
                  onClick={onOpenConfigDrawer}
                  className={`text-[11px] font-mono hover:underline ${
                    isLight ? 'text-sky-600' : 'text-sky-400'
                  }`}
                >
                  Configure
                </button>
              </div>

              {/* Resume download integration */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                isLight ? 'bg-sky-50/60 border-sky-200' : 'bg-slate-950/70 border-slate-855'
              }`}>
                <div>
                  <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Verified Resume Document
                  </div>
                  <div className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {profile.resume.fileName} (Updated 2026)
                  </div>
                </div>

                {profile.resume.available && profile.resume.url && (
                  <a
                    href={profile.resume.url}
                    download={profile.resume.fileName}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-mono font-semibold shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>

              {/* GitHub */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-955/70 border-slate-800'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                    isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-white'
                  }`}>
                    <GithubIcon className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>GitHub</div>
                    <div className={`text-[11px] font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {profile.socialLinks.github ? profile.socialLinks.github : 'Add username in profile.ts'}
                    </div>
                  </div>
                </div>

                {profile.socialLinks.github ? (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-sm"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ) : (
                  <a
                    href={profile.socialLinks.githubSignup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-sky-600" />
                    <span>Create GitHub</span>
                  </a>
                )}
              </div>

              {/* LinkedIn */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-855'
              }`}>
                <div>
                  <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>LinkedIn</div>
                  <div className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {profile.socialLinks.linkedin ? profile.socialLinks.linkedin : 'Add profile URL in profile.ts'}
                  </div>
                </div>

                {profile.socialLinks.linkedin ? (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-white"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <a
                    href={profile.socialLinks.linkedinSignup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-sky-600" />
                    <span>Create LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Pre-Configured Contact Dispatcher */}
          <div className="lg:col-span-7">
            <div className={`animate-on-scroll rounded-3xl border p-7 sm:p-9 backdrop-blur-md transition-all duration-300 ${
              isLight
                ? 'bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.03)]'
                : 'bg-slate-900/60 border-slate-800'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Terminal className={`w-4 h-4 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
                <h3 className={`text-base font-bold font-mono uppercase tracking-wider ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Send Direct Inquiry to {profile.name}
                </h3>
              </div>
              <p className={`text-xs mb-6 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Fills a verified mailto payload directly addressed to{' '}
                <strong className={isLight ? 'text-slate-900' : 'text-slate-200'}>{profile.email}</strong>.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-sender-name" className={`block text-xs font-mono font-bold mb-1.5 ${
                      isLight ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      Your Name / Organization
                    </label>
                    <input
                      id="contact-sender-name"
                      name="senderName"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Lead Technical Recruiter"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:border-sky-500 ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-950 placeholder-slate-400 shadow-sm'
                          : 'bg-slate-950/80 border-slate-855 text-white placeholder-slate-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-sender-email" className={`block text-xs font-mono font-bold mb-1.5 ${
                      isLight ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      Your Email Address
                    </label>
                    <input
                      id="contact-sender-email"
                      name="senderEmail"
                      type="email"
                      required
                      value={formState.senderEmail}
                      onChange={(e) => setFormState({ ...formState, senderEmail: e.target.value })}
                      placeholder="recruiter@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:border-sky-500 ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-950 placeholder-slate-400 shadow-sm'
                          : 'bg-slate-950/80 border-slate-855 text-white placeholder-slate-600'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className={`block text-xs font-mono font-bold mb-1.5 ${
                    isLight ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    Subject / Role Opportunity
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Full Stack / Java Microservices Opportunity"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:border-sky-500 ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-950 placeholder-slate-400 shadow-sm'
                        : 'bg-slate-950/80 border-slate-855 text-white placeholder-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className={`block text-xs font-mono font-bold mb-1.5 ${
                    isLight ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    Message Body
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hi Rabinarayan, I reviewed your microservices and full-stack engineering portfolio and would like to connect regarding..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-sky-500 resize-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        : 'bg-slate-950/80 border-slate-855 text-white placeholder-slate-600'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via Mail Client</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
