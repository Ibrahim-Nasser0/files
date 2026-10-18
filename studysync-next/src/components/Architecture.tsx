"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { ArchitectureHighlight, ArchitectureLayer } from '@/types';

export default function Architecture() {
  const { t, isRTL } = useLanguage();
  const [activeLayer, setActiveLayer] = useState('frontend');

  const layers: ArchitectureLayer[] = [
    {
      id: 'frontend',
      icon: 'code',
      name: t('architecture.layers.0.title'),
      badge: t('architecture.layers.0.badge'),
      desc: t('architecture.layers.0.desc'),
      tags: t('architecture.layers.0.tags') || ['Next.js 15+ App Router', 'TypeScript Strict', 'Tailwind CSS v4', 'Bilingual (RTL/LTR)', 'PWA Offline Sync'],
      color: '#1e40af',
    },
    {
      id: 'gateway',
      icon: 'shield',
      name: t('architecture.layers.1.title'),
      badge: t('architecture.layers.1.badge'),
      desc: t('architecture.layers.1.desc'),
      tags: t('architecture.layers.1.tags') || ['RS256 JWT Signed Tokens', 'Granular RBAC Scopes', 'Leaky Bucket Rate Limiter', 'mTLS / Zero-Trust', 'API Gateway'],
      color: '#059669',
    },
    {
      id: 'services',
      icon: 'cpu',
      name: t('architecture.layers.2.title'),
      badge: t('architecture.layers.2.badge'),
      desc: t('architecture.layers.2.desc'),
      tags: t('architecture.layers.2.tags') || ['Course Enrollment Service', 'Cryptographic QR Validator', 'University Bylaw Engine', 'Curriculum ML API', 'Event Bus'],
      color: '#d97706',
    },
    {
      id: 'data',
      icon: 'database',
      name: t('architecture.layers.3.title'),
      badge: t('architecture.layers.3.badge'),
      desc: t('architecture.layers.3.desc'),
      tags: t('architecture.layers.3.tags') || ['PostgreSQL Relational DB', 'Redis Low-Latency Cache', 'AES-256 Encrypted Records', 'Immutable Audit Trails'],
      color: '#2563eb',
    },
  ];

  const highlights: ArchitectureHighlight[] = [
    { icon: 'zap', title: t('architecture.highlights.0.title'), desc: t('architecture.highlights.0.desc') },
    { icon: 'shield', title: t('architecture.highlights.1.title'), desc: t('architecture.highlights.1.desc') },
    { icon: 'cpu', title: t('architecture.highlights.2.title'), desc: t('architecture.highlights.2.desc') },
    { icon: 'layers', title: t('architecture.highlights.3.title'), desc: t('architecture.highlights.3.desc') },
  ];

  const currentLayer = layers.find((l) => l.id === activeLayer) || layers[0];

  return (
    <section className="py-20 lg:py-28 bg-[#060914] border-t border-slate-800/80 relative" id="architecture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Icon name="layers" size={14} />
            <span>{isRTL ? 'البنية التحتية والأنظمة الموزعة' : 'Infrastructure Core'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t('architecture.sectionTitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {t('architecture.sectionSubtitle')}
          </p>
        </div>

        {/* Interactive Architecture Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Stack Layers List */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((layer) => {
              const isSelected = activeLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#0d1326] border-cyan-400 shadow-lg shadow-cyan-950/30 translate-x-1'
                      : 'bg-[#0d1326]/80 hover:bg-[#111933] border-slate-800/80 shadow-xs'
                  }`}
                  style={{
                    borderLeftColor: isSelected ? layer.color : undefined,
                    borderLeftWidth: isSelected ? '4px' : undefined,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${layer.color}15`,
                      color: layer.color,
                    }}
                  >
                    <Icon name={layer.icon} size={20} color="currentColor" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                        {layer.name}
                      </span>
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded font-bold"
                        style={{
                          backgroundColor: `${layer.color}15`,
                          color: layer.color,
                        }}
                      >
                        {layer.badge}
                      </span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: isSelected ? '100%' : '25%',
                          backgroundColor: layer.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Layer Detail Inspector */}
          <div className="lg:col-span-7 campus-card p-6 sm:p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-bold font-mono px-2.5 py-1 rounded"
                style={{
                  backgroundColor: `${currentLayer.color}15`,
                  color: currentLayer.color,
                }}
              >
                {currentLayer.badge}
              </span>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                {currentLayer.name}
              </h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {currentLayer.desc}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              {isRTL ? 'الحزمة التقنية ومعايير الأمان المعتمدة:' : 'Technical Stack & Security Guardrails:'}
            </h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {Array.isArray(currentLayer.tags) && currentLayer.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-[var(--surface-subtle)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[var(--border)]">
              <div className="p-3 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] text-xs">
                <span className="text-[var(--text-muted)] block text-[11px] font-bold">
                  {isRTL ? 'زمن الاستجابة المستهدف' : 'Target Latency'}
                </span>
                <span className="font-bold text-[var(--text-primary)]">
                  {isRTL ? '< 85ms للتسجيل' : '< 85ms Check-in'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] text-xs">
                <span className="text-[var(--text-muted)] block text-[11px] font-bold">
                  {isRTL ? 'معيار التدقيق الأمني' : 'Audit Standard'}
                </span>
                <span className="font-bold text-[var(--text-primary)]">
                  {isRTL ? 'مطابق لـ ISO 27001' : 'ISO 27001 Aligned'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architecture Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Icon name={h.icon} size={18} color="currentColor" />
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{h.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
