"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Icon } from '@/components/common/Icon';

interface CommandItem {
  id: string;
  title: string;
  category: 'NAVIGATION' | 'ACTIONS' | 'SYSTEM';
  description: string;
  icon: string;
  shortcut?: string;
  perform: () => void;
}

export default function CommandPalette() {
  const { isCommandOpen, setIsCommandOpen, setActiveSection, toggleCollapsed } = useNavigation();
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandOpen]);

  const commands: CommandItem[] = useMemo(() => {
    const jumpTo = (id: string) => {
      setIsCommandOpen(false);
      setActiveSection(id);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return [
      // Navigation
      {
        id: 'nav-overview',
        title: lang === 'ar' ? 'نظرة عامة على النظام المؤسسي' : 'Platform Overview & Institutional Vision',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'مقارنة التحول المؤسسي وحل الصوامع المنعزلة' : 'Institutional transformation & fragmented silo resolution',
        icon: 'building',
        shortcut: 'G O',
        perform: () => jumpTo('overview'),
      },
      {
        id: 'nav-features',
        title: lang === 'ar' ? 'الوحدات الوظيفية الـ 17' : 'All 17 Functional Modules & Directory',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'سجل المحاضرات، الحضور، الدرجات والمكتبة' : 'Lecture repository, dynamic attendance, grading engine',
        icon: 'layers',
        shortcut: 'G M',
        perform: () => jumpTo('features'),
      },
      {
        id: 'nav-users',
        title: lang === 'ar' ? 'أدوار النظام والصلاحيات (RBAC)' : 'Roles & Access Matrix (Dean, Faculty, TA, Student)',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'بوابات تفاعلية ومصفوفة حماية متعددة المستويات' : '4-tier operational portals with granular RBAC permissions',
        icon: 'users',
        shortcut: 'G R',
        perform: () => jumpTo('users'),
      },
      {
        id: 'nav-workflows',
        title: lang === 'ar' ? 'سير العمليات الأكاديمية' : 'End-to-End Operational Workflows',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'من توليد الرمز إلى التدقيق والإنذارات المبكرة' : 'Lecture session init to real-time bylaw radar',
        icon: 'git-network',
        shortcut: 'G W',
        perform: () => jumpTo('workflows'),
      },
      {
        id: 'nav-risk',
        title: lang === 'ar' ? 'محاكي كشف المخاطر ولائحة الحرمان (75%)' : 'Academic Bylaw Exclusion Simulator (75% Rule)',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'ضبط المعايير ومراقبة تصنيف الطلاب في الوقت الفعلي' : 'Interactive threshold slider & live standing calculation',
        icon: 'alert',
        shortcut: 'G B',
        perform: () => jumpTo('risk'),
      },
      {
        id: 'nav-ai',
        title: lang === 'ar' ? 'محرك الذكاء الاصطناعي والمسارات المهنية' : 'AI Curriculum Engine & Career Pathway Modeling',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'تحليل المقررات ومطابقتها مع معايير سوق العمل' : 'Syllabus NLP vector analysis with market skill gaps',
        icon: 'cpu',
        shortcut: 'G A',
        perform: () => jumpTo('ai'),
      },
      {
        id: 'nav-architecture',
        title: lang === 'ar' ? 'البنية التقنية للنظام (4 مستويات)' : 'System Architecture (4-Tier Enterprise Stack)',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'الواجهة، طبقة الأعمال، الذكاء الاصطناعي، وقواعد البيانات' : 'Client tier, business logic, AI microservices, persistence',
        icon: 'server',
        shortcut: 'G S',
        perform: () => jumpTo('architecture'),
      },
      {
        id: 'nav-roadmap',
        title: lang === 'ar' ? 'خارطة الطريق المؤسسية' : 'Campus Deployment Roadmap & Milestones',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'مراحل التطوير من v1.0 إلى v3.0' : 'Multi-campus federation and enterprise rollout schedule',
        icon: 'target',
        shortcut: 'G M',
        perform: () => jumpTo('roadmap'),
      },
      {
        id: 'nav-team',
        title: lang === 'ar' ? 'فريق الحوكمة والهندسة' : 'Engineering & Architectural Governance Team',
        category: 'NAVIGATION',
        description: lang === 'ar' ? 'مطورو النظام ومعماريو البرمجيات' : 'Core platform architects and systems engineering leads',
        icon: 'shield-check',
        shortcut: 'G T',
        perform: () => jumpTo('team'),
      },

      // Actions
      {
        id: 'act-theme',
        title: theme === 'dark' ? (lang === 'ar' ? 'التحويل للوضع النهاري' : 'Switch to Light Mode') : (lang === 'ar' ? 'التحويل للوضع الليلي' : 'Switch to Dark Mode'),
        category: 'ACTIONS',
        description: lang === 'ar' ? 'تغيير مظهر واجهة النظام' : 'Toggle between executive light and midnight slate dark mode',
        icon: theme === 'dark' ? 'sun' : 'moon',
        perform: () => {
          toggleTheme();
          setIsCommandOpen(false);
        },
      },
      {
        id: 'act-lang',
        title: lang === 'en' ? 'التبديل إلى العربية (RTL)' : 'Switch to English (LTR)',
        category: 'ACTIONS',
        description: lang === 'ar' ? 'تغيير لغة العرض واتجاه النصوص' : 'Switch interface locale and typography',
        icon: 'globe',
        perform: () => {
          toggleLang();
          setIsCommandOpen(false);
        },
      },
      {
        id: 'act-sidebar',
        title: lang === 'ar' ? 'تبديل حجم شريط التنقل الجانبي' : 'Toggle Sidebar Rail (Expanded / Compact)',
        category: 'ACTIONS',
        description: lang === 'ar' ? 'طي أو توسيع شريط التنقل الأيسر' : 'Toggle command rail width between 260px and 68px',
        icon: 'panel-close',
        shortcut: '[',
        perform: () => {
          toggleCollapsed();
          setIsCommandOpen(false);
        },
      },
      {
        id: 'act-export',
        title: lang === 'ar' ? 'تصدير التقرير الفني المعتمد (PDF)' : 'Export Technical Whitepaper & Audit Report (PDF)',
        category: 'ACTIONS',
        description: lang === 'ar' ? 'توليد مستند الحوكمة الأكاديمية والمواصفات' : 'Trigger browser print preview for technical whitepaper',
        icon: 'download',
        shortcut: '⌘P',
        perform: () => {
          setIsCommandOpen(false);
          setTimeout(() => window.print(), 100);
        },
      },
    ];
  }, [lang, theme, toggleTheme, toggleLang, toggleCollapsed, setIsCommandOpen, setActiveSection]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase().trim();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].perform();
      }
    }
  };

  if (!isCommandOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setIsCommandOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        className="relative w-full max-w-2xl bg-[#0a0e1e]/95 border border-slate-700/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.15)] overflow-hidden z-10 animate-in zoom-in-95 duration-150 backdrop-blur-xl"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800/80 bg-[#070a16]/80">
          <Icon name="search" size={18} className="text-cyan-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'ar' ? 'ابحث في وحدات النظام، اللوائح، أو الإجراءات السريعة...' : 'Search campus modules, bylaws, or quick actions...'}
            className="flex-1 bg-transparent text-sm font-medium text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded border border-slate-700 bg-slate-900 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2.5 divide-y divide-transparent space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              {lang === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching modules or actions found'}
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-start transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-900/80 text-cyan-400 border border-slate-700/80'
                      }`}
                    >
                      <Icon name={cmd.icon} size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                          {cmd.title}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-semibold ${
                            isSelected
                              ? 'bg-white/25 text-white'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {cmd.category === 'NAVIGATION'
                            ? lang === 'ar' ? 'تنقل' : 'NAVIGATION'
                            : cmd.category === 'ACTIONS'
                            ? lang === 'ar' ? 'إجراء' : 'ACTIONS'
                            : lang === 'ar' ? 'نظام' : 'SYSTEM'}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {cmd.description}
                      </p>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <kbd
                      className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono flex-shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-5 py-2.5 border-t border-slate-800/80 bg-[#070a16]/90 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono me-1 text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono me-1 text-slate-300">↓</kbd>
              {lang === 'ar' ? 'للتنقل' : 'to navigate'}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono me-1 text-slate-300">↵</kbd>
              {lang === 'ar' ? 'للاختيار' : 'to select'}
            </span>
          </div>
          <span className="font-mono text-[10px] text-cyan-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {lang === 'ar' ? 'أوامر StudySync OS' : 'StudySync Command OS'}
          </span>
        </div>
      </div>
    </div>
  );
}
