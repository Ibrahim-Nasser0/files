"use client";

import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';

interface SidebarCategory {
  title: string;
  items: {
    id: string;
    label: string;
    icon: string;
    badge?: string;
  }[];
}

export default function Sidebar() {
  const {
    isCollapsed,
    toggleCollapsed,
    isMobileOpen,
    setIsMobileOpen,
    activeSection,
    setActiveSection,
    toggleCommandPalette,
  } = useNavigation();
  const { t, lang, isRTL } = useLanguage();

  const categories: SidebarCategory[] = [
    {
      title: lang === 'ar' ? 'المنصة الأساسية' : 'Core Platform',
      items: [
        { id: 'overview', label: t('nav.overview'), icon: 'building' },
        { id: 'features', label: t('nav.features'), icon: 'layers', badge: '17' },
        { id: 'users', label: t('nav.users'), icon: 'users', badge: 'RBAC' },
        { id: 'workflows', label: t('nav.workflows'), icon: 'git-network' },
      ],
    },
    {
      title: lang === 'ar' ? 'الحوكمة والمخاطر' : 'Governance & Risk',
      items: [
        { id: 'risk', label: t('nav.risk'), icon: 'alert', badge: '75%' },
        { id: 'architecture', label: t('nav.architecture'), icon: 'server' },
      ],
    },
    {
      title: lang === 'ar' ? 'الذكاء الاصطناعي وخارطة الطريق' : 'Intelligence & Deploy',
      items: [
        { id: 'ai', label: t('nav.ai'), icon: 'cpu', badge: 'NLP' },
        { id: 'roadmap', label: t('nav.roadmap'), icon: 'target' },
        { id: 'team', label: t('nav.team'), icon: 'shield-check' },
      ],
    },
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 z-40 flex flex-col bg-[var(--surface)] border-[var(--border)] transition-all duration-300 ease-in-out ${
          isRTL ? 'right-0 border-l' : 'left-0 border-r'
        } ${
          // Desktop sizing
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          // Mobile responsive slide-over
          isMobileOpen
            ? 'translate-x-0 w-72 shadow-2xl'
            : isRTL
            ? 'translate-x-full lg:translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)] flex-shrink-0">
          <a
            href="#hero"
            onClick={() => handleLinkClick('hero')}
            className={`flex items-center gap-3 overflow-hidden group focus:outline-none ${
              isCollapsed ? 'lg:justify-center lg:w-full' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 dark:from-blue-600 dark:to-blue-800 flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <Icon name="graduation-cap" size={20} color="#ffffff" />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-[var(--text-primary)]">
                    StudySync
                  </span>
                  <span className="text-[9px] font-bold tracking-wider uppercase px-1 py-0.2 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                    OS
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-[var(--text-muted)] tracking-wider uppercase truncate">
                  {lang === 'ar' ? 'منظومة الحرم الجامعي' : 'Campus Platform'}
                </span>
              </div>
            )}
          </a>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none"
            aria-label={lang === 'ar' ? 'إغلاق الشريط الجانبي' : 'Close sidebar'}
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Command Search Bar Trigger */}
        <div className="p-3 border-b border-[var(--border)]/60 flex-shrink-0">
          <button
            onClick={toggleCommandPalette}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-blue-500/40 transition-all focus:outline-none ${
              isCollapsed && !isMobileOpen ? 'justify-center px-0' : 'justify-between'
            }`}
            title={lang === 'ar' ? 'البحث في الوحدات والإجراءات (⌘K)' : 'Search modules & actions (⌘K)'}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Icon name="search" size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              {(!isCollapsed || isMobileOpen) && (
                <span className="truncate">{lang === 'ar' ? 'بحث سريع...' : 'Quick search...'}</span>
              )}
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[9px] font-mono text-[var(--text-muted)]">
                ⌘K
              </kbd>
            )}
          </button>
        </div>

        {/* Navigation Categories & Links */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-1">
              {(!isCollapsed || isMobileOpen) && (
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {cat.title}
                </div>
              )}
              {cat.items.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-start transition-all group relative ${
                      isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''
                    } ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]'
                    }`}
                    title={item.label}
                  >
                    <div
                      className={`flex-shrink-0 transition-transform ${
                        isActive ? 'scale-110 text-white' : 'text-[var(--text-muted)] group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}
                    >
                      <Icon name={item.icon} size={17} />
                    </div>

                    {(!isCollapsed || isMobileOpen) && (
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                              isActive
                                ? 'bg-white/25 text-white'
                                : 'bg-[var(--surface-subtle)] text-[var(--text-muted)] border border-[var(--border)]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Active dot indicator for collapsed view */}
                    {isCollapsed && !isMobileOpen && isActive && (
                      <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Telemetry & Rail Toggle */}
        <div className="p-3 border-t border-[var(--border)] bg-[var(--surface-subtle)]/40 flex-shrink-0">
          {(!isCollapsed || isMobileOpen) ? (
            <div className="space-y-2">
              {/* Campus Status Ribbon */}
              <div className="px-2.5 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-[var(--text-secondary)]">
                    {lang === 'ar' ? 'عقدة الحرم' : 'Campus Node'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  99.98%
                </span>
              </div>

              {/* Collapse Toggle Button */}
              <button
                onClick={toggleCollapsed}
                className="hidden lg:flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-all focus:outline-none"
                title={lang === 'ar' ? 'طي الشريط الجانبي' : 'Collapse sidebar rail'}
              >
                <span>{lang === 'ar' ? 'طي الشريط' : 'Collapse Rail'}</span>
                <Icon name={isRTL ? 'chevron-right' : 'panel-close'} size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleCollapsed}
              className="hidden lg:flex w-full items-center justify-center py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition-all focus:outline-none"
              title={lang === 'ar' ? 'توسيع الشريط الجانبي' : 'Expand sidebar rail'}
            >
              <Icon name={isRTL ? 'chevron-left' : 'panel-open'} size={18} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
