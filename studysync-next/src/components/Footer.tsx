"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { NavLink } from '@/types';

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const links: NavLink[] = [
    { href: '#overview', label: t('nav.overview') },
    { href: '#features', label: t('nav.features') },
    { href: '#users', label: t('nav.users') },
    { href: '#workflows', label: t('nav.workflows') },
    { href: '#ai', label: t('nav.ai') },
    { href: '#architecture', label: t('nav.architecture') },
    { href: '#risk', label: t('nav.risk') },
    { href: '#roadmap', label: t('nav.roadmap') },
    { href: '#team', label: t('nav.team') },
  ];

  return (
    <footer className="pt-20 pb-12 border-t border-slate-800/80 bg-[#04060d] no-print relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <a href="#hero" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Icon name="graduation-cap" size={18} color="#ffffff" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  StudySync
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/60">
                  CAMPUS OS
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d1326]/80 border border-slate-800 text-slate-300 font-medium">
                <Icon name="shield-check" size={13} color="#10b981" />
                <span>Higher Ed Standard</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d1326]/80 border border-slate-800 text-slate-300 font-medium">
                <Icon name="cpu" size={13} color="#06b6d4" />
                <span>Curriculum ML</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d1326]/80 border border-slate-800 text-slate-300 font-medium">
                <Icon name="globe" size={13} color="#3b82f6" />
                <span>Native Bilingual</span>
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 hover:text-cyan-400 font-medium transition-colors py-1 inline-block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact / Actions Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              {t('footer.contact')}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {isRTL
                ? 'بنية برمجية معتمدة لإدارة الحرم الجامعي، تسجيل الحضور المشفر، وحماية المسار الأكاديمي للطلاب.'
                : 'Institutional university software architecture for encrypted attendance, records integrity, and curriculum modeling.'}
            </p>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full btn-cyan-glow text-white text-xs font-bold transition-all"
            >
              <Icon name="download" size={14} />
              <span>{t('nav.downloadPdf')}</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>{t('footer.systemStatus')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
