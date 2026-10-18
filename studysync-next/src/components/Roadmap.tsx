"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { RoadmapPhase } from '@/types';

export default function Roadmap() {
  const { t, isRTL } = useLanguage();
  const [activePhase, setActivePhase] = useState(0);

  const phases: RoadmapPhase[] = [
    {
      id: 0,
      phaseNum: isRTL ? 'المرحلة 01' : 'Phase 01',
      title: t('roadmap.phases.0.title'),
      icon: 'check',
      status: isRTL ? 'مكتمل / الإصدار الأساسي' : 'Production Core / Released',
      color: '#059669',
      items: [
        t('roadmap.phases.0.items.0'),
        t('roadmap.phases.0.items.1'),
        t('roadmap.phases.0.items.2'),
        t('roadmap.phases.0.items.3'),
        t('roadmap.phases.0.items.4'),
        t('roadmap.phases.0.items.5'),
        t('roadmap.phases.0.items.6'),
      ],
    },
    {
      id: 1,
      phaseNum: isRTL ? 'المرحلة 02' : 'Phase 02',
      title: t('roadmap.phases.1.title'),
      icon: 'zap',
      status: isRTL ? 'قيد التطوير الفعلي' : 'Active Engineering Sprint',
      color: '#1e40af',
      items: [
        t('roadmap.phases.1.items.0'),
        t('roadmap.phases.1.items.1'),
        t('roadmap.phases.1.items.2'),
        t('roadmap.phases.1.items.3'),
        t('roadmap.phases.1.items.4'),
        t('roadmap.phases.1.items.5'),
      ],
    },
    {
      id: 2,
      phaseNum: isRTL ? 'المرحلة 03' : 'Phase 03',
      title: t('roadmap.phases.2.title'),
      icon: 'layers',
      status: isRTL ? 'مرحلة التصميم والتخطيط' : 'Design & Planning Review',
      color: '#d97706',
      items: [
        t('roadmap.phases.2.items.0'),
        t('roadmap.phases.2.items.1'),
        t('roadmap.phases.2.items.2'),
        t('roadmap.phases.2.items.3'),
        t('roadmap.phases.2.items.4'),
      ],
    },
    {
      id: 3,
      phaseNum: isRTL ? 'المرحلة 04' : 'Phase 04',
      title: t('roadmap.phases.3.title'),
      icon: 'compass',
      status: isRTL ? 'الرؤية المستقبلية' : 'Future Vision Research',
      color: '#2563eb',
      items: [
        t('roadmap.phases.3.items.0'),
        t('roadmap.phases.3.items.1'),
        t('roadmap.phases.3.items.2'),
        t('roadmap.phases.3.items.3'),
        t('roadmap.phases.3.items.4'),
      ],
    },
  ];

  const current = phases[activePhase] || phases[0];

  return (
    <section className="py-20 lg:py-28 bg-[#060914] border-t border-slate-800/80 relative" id="roadmap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Icon name="compass" size={14} />
            <span>{isRTL ? 'المراحل الاستراتيجية والتوسع' : 'Strategic Milestones'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t('roadmap.sectionTitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {t('roadmap.sectionSubtitle')}
          </p>
        </div>

        {/* Phase Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {phases.map((p) => {
            const isActive = activePhase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePhase(p.id)}
                className={`p-4 rounded-2xl text-start transition-all border ${
                  isActive
                    ? 'bg-[#0d1326] border-cyan-400 shadow-lg shadow-cyan-950/30 translate-y-[-2px]'
                    : 'bg-[#0d1326]/80 hover:bg-[#111933] border-slate-800/80 shadow-xs'
                }`}
                style={{
                  borderTopColor: isActive ? p.color : undefined,
                  borderTopWidth: isActive ? '3px' : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold" style={{ color: p.color }}>
                    {p.phaseNum}
                  </span>
                  <Icon name={p.icon} size={15} color={p.color} />
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)] line-clamp-1">{p.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Detailed View */}
        <div className="campus-card p-6 sm:p-9 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border)] mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: current.color }} />
                <span className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  {current.phaseNum}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-bold"
                  style={{
                    backgroundColor: `${current.color}15`,
                    color: current.color,
                  }}
                >
                  {current.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{current.title}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {current.items.map((item, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]"
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5"
                  style={{
                    backgroundColor: `${current.color}15`,
                    color: current.color,
                  }}
                >
                  ✓
                </span>
                <span className="font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
