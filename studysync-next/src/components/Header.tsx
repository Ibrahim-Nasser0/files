"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Icon } from '@/components/common/Icon';

export default function Header() {
  const { t, toggleLang, lang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#overview', label: lang === 'ar' ? 'الرؤية المؤسسية' : 'Platform' },
    { href: '#features', label: lang === 'ar' ? 'الوحدات (17)' : 'Modules' },
    { href: '#workflows', label: lang === 'ar' ? 'التحقق الذكي' : 'Attendance' },
    { href: '#risk', label: lang === 'ar' ? 'لائحة الحرمان (75%)' : 'Bylaw Radar' },
    { href: '#ai', label: lang === 'ar' ? 'الذكاء الاصطناعي' : 'AI Engine' },
    { href: '#users', label: lang === 'ar' ? 'الأدوار (RBAC)' : 'Roles' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-xs py-3'
          : 'bg-transparent border-b border-[var(--border)]/30 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Crest */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-2.5 group focus:outline-none flex-shrink-0"
          aria-label="StudySync Campus OS Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 dark:from-blue-600 dark:to-blue-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Icon name="graduation-cap" size={20} color="#ffffff" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                StudySync
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                CAMPUS OS
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[var(--text-muted)] tracking-wider uppercase">
              {lang === 'ar' ? 'معيار التعليم العالي' : 'Higher Ed Standard'}
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation Pill Bar */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#0d1326]/80 border border-slate-800/80 shadow-2xs backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Operational Status Pill */}
          <div
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold"
            title={lang === 'ar' ? 'حالة النظام التشغيلية: متصل وبكفاءة' : 'System Operational Status: Online'}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>v2.6 LTS</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center justify-center transition-all focus:outline-none"
            aria-label="Toggle Theme Mode"
            title={theme === 'dark' ? (lang === 'ar' ? 'التحويل للوضع الفاتح' : 'Switch to Light Theme') : (lang === 'ar' ? 'التحويل للوضع الداكن' : 'Switch to Dark Theme')}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
          </button>

          {/* Language Switcher Button */}
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800/80 bg-slate-900/60 text-slate-200 hover:bg-slate-800/60 text-xs font-semibold transition-all focus:outline-none"
            aria-label="Toggle Language"
            title={lang === 'ar' ? 'تبديل اللغة إلى الإنجليزية' : 'Switch to Arabic'}
          >
            <Icon name="globe" size={13} />
            <span className="font-semibold">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Primary High-Converting CTA */}
          <button
            onClick={() => window.print()}
            className="btn-cyan-glow hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-bold transition-all shadow-sm hover:shadow-cyan-500/30 focus:outline-none"
          >
            <Icon name="download" size={14} />
            <span>{lang === 'ar' ? 'تحميل التقرير الفني' : 'Export Whitepaper (PDF)'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--surface-subtle)] focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-4 flex flex-col gap-1 items-center">
              <span
                className={`w-full h-0.5 bg-current transition-all ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 mt-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[var(--border)] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.print();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm"
              >
                <Icon name="download" size={14} />
                <span>{lang === 'ar' ? 'تحميل التقرير الفني (PDF)' : 'Export Whitepaper (PDF)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
