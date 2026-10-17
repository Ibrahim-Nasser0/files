"use client";

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { WorkflowItem } from '@/types';

export default function Workflows() {
  const { t, isRTL } = useLanguage();
  const [activeWf, setActiveWf] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);

  const items: WorkflowItem[] = t('workflows.items');

  if (!Array.isArray(items) || items.length === 0) return null;

  const wfMeta = [
    { icon: 'book', color: '#2563eb', accent: 'blue' },
    { icon: 'qr', color: '#06b6d4', accent: 'cyan' },
    { icon: 'alert', color: '#f59e0b', accent: 'amber' },
    { icon: 'compass', color: '#8b5cf6', accent: 'purple' },
    { icon: 'calendar', color: '#ec4899', accent: 'pink' },
  ];

  const currentMeta = wfMeta[activeWf] || wfMeta[0];
  const currentWorkflow = items[activeWf] || items[0];

  // Accessible Keyboard Navigation for WAI-ARIA Tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = index;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      targetIndex = isRTL ? (index - 1 + items.length) % items.length : (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      targetIndex = isRTL ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = items.length - 1;
    }

    if (targetIndex !== index) {
      setActiveWf(targetIndex);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      if (buttons && buttons[targetIndex]) {
        buttons[targetIndex].focus();
      }
    }
  };

  const handlePrev = () => {
    setActiveWf((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveWf((prev) => (prev + 1) % items.length);
  };

  return (
    <section 
      className="py-20 lg:py-28 bg-[#060914] border-t border-slate-800/80 relative" 
      id="workflows"
      aria-labelledby="workflows-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4 shadow-sm">
            <Icon name="git-network" size={14} />
            <span>{isRTL ? 'معمارية سير العمليات' : 'Operational Architecture'}</span>
          </div>
          <h2 
            id="workflows-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4"
          >
            {t('workflows.sectionTitle')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed font-normal">
            {t('workflows.sectionSubtitle')}
          </p>
        </div>

        {/* ============================================================== */}
        {/* ACCESSIBLE WORKFLOW NAVIGATION                                 */}
        {/* ============================================================== */}

        {/* 1. Desktop Tab Grid (lg screens up) — 5 Structured Equal Columns */}
        <div 
          ref={tabListRef}
          role="tablist" 
          aria-label={isRTL ? 'قائمة المسارات التشغيلية' : 'Operational workflows list'}
          className="hidden lg:grid grid-cols-5 gap-3 max-w-6xl mx-auto mb-10"
        >
          {items.map((item, i) => {
            const isActive = activeWf === i;
            const meta = wfMeta[i] || wfMeta[0];

            return (
              <button
                key={i}
                role="tab"
                id={`workflow-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`workflow-panel-${i}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveWf(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`flex flex-col justify-between p-4 rounded-2xl text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isRTL ? 'text-right' : 'text-left'
                } ${
                  isActive
                    ? 'bg-gradient-to-b from-[#101b3b] to-[#0b1021] border-2 border-cyan-400 text-white shadow-xl shadow-cyan-500/15 scale-[1.02]'
                    : 'bg-[#0b1021]/80 border border-slate-800/90 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-[#0d1428]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                      isActive 
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' 
                        : 'bg-slate-800/90 text-slate-400'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                    <Icon name={meta.icon} size={16} color="currentColor" />
                  </div>
                </div>
                <span className="text-xs font-bold leading-snug line-clamp-2">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Mobile & Tablet Accessible Controller (< lg screens) */}
        <div className="block lg:hidden mb-8">
          <div className="p-4 rounded-2xl bg-[#0b1021]/90 border border-slate-800/90 backdrop-blur-md shadow-lg">
            {/* Header / Dropdown Selector for full accessibility */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <label htmlFor="mobile-workflow-select" className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                {isRTL ? `المسار 0${activeWf + 1} من 0${items.length}` : `Workflow 0${activeWf + 1} of 0${items.length}`}
              </label>

              {/* Accessible Prev / Next Step Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={isRTL ? 'المسار السابق' : 'Previous workflow'}
                >
                  <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={isRTL ? 'المسار التالي' : 'Next workflow'}
                >
                  <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} size={16} />
                </button>
              </div>
            </div>

            {/* Quick-Jump Step Pills (Large touch targets) */}
            <div 
              role="tablist" 
              aria-label={isRTL ? 'المسارات الأكاديمية' : 'Workflow selector'} 
              className="grid grid-cols-5 gap-2 mb-3"
            >
              {items.map((item, i) => {
                const isActive = activeWf === i;
                const meta = wfMeta[i] || wfMeta[0];
                return (
                  <button
                    key={i}
                    role="tab"
                    id={`mobile-tab-${i}`}
                    aria-selected={isActive}
                    aria-label={`0${i + 1}: ${item.title}`}
                    onClick={() => setActiveWf(i)}
                    className={`h-11 rounded-xl flex items-center justify-center gap-1 font-bold text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700/80 hover:text-white'
                    }`}
                  >
                    <Icon name={meta.icon} size={14} color={isActive ? '#020617' : 'currentColor'} />
                    <span>0{i + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Current Active Title Display */}
            <div className="pt-2.5 border-t border-slate-800/80 flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
              <span className="text-cyan-400 flex-shrink-0">
                <Icon name={currentMeta.icon} size={16} />
              </span>
              <span className="line-clamp-1">{currentWorkflow.title}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ACTIVE WORKFLOW SHOWCASE CONTAINER                             */}
        {/* ============================================================== */}
        {currentWorkflow && (
          <div 
            id={`workflow-panel-${activeWf}`}
            role="tabpanel"
            aria-labelledby={`workflow-tab-${activeWf}`}
            className="p-5 sm:p-8 lg:p-9 bg-[#0b1021]/90 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl"
          >
            {/* Workflow Card Header */}
            <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-slate-800/80">
              <div 
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner border"
                style={{ 
                  backgroundColor: `${currentMeta.color}15`,
                  borderColor: `${currentMeta.color}40`,
                  color: currentMeta.color
                }}
              >
                <Icon name={currentMeta.icon} size={22} color="currentColor" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 block mb-0.5">
                  {isRTL ? `المسار التشغيلي #${activeWf + 1}` : `OPERATIONAL WORKFLOW #${activeWf + 1}`}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentWorkflow.title}
                </h3>
              </div>
            </div>

            {/* ============================================================== */}
            {/* DESKTOP TIMELINE (lg screens up) — Numbers INSIDE Card Outline  */}
            {/* ============================================================== */}
            <div className="hidden lg:grid grid-cols-5 gap-3.5">
              {Array.isArray(currentWorkflow.steps) &&
                currentWorkflow.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative p-5 rounded-2xl bg-[#0d1326]/85 border border-slate-800/80 flex flex-col justify-between transition-all duration-200 hover:border-slate-700 hover:bg-[#0f1730]/90 shadow-sm group"
                  >
                    {/* Top Inside Card: Number Node & Phase Info */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {/* Number INSIDE the card outline */}
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-blue-600/30">
                        {idx + 1}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <span className="text-slate-400">Phase {idx + 1}</span>
                        <span className="text-emerald-400 font-semibold">✓ Verified</span>
                      </div>
                    </div>

                    {/* Step Content */}
                    <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                      {step}
                    </p>

                    {/* Horizontal Connector Arrow Bridging to the Next Card */}
                    {idx < currentWorkflow.steps.length - 1 && (
                      <div 
                        className={`hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#060914] border border-blue-500/50 text-blue-400 shadow-md shadow-blue-500/20 pointer-events-none transition-transform group-hover:scale-110 ${
                          isRTL ? '-left-3.5' : '-right-3.5'
                        }`}
                        aria-hidden="true"
                      >
                        <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} size={12} />
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* ============================================================== */}
            {/* MOBILE & TABLET TIMELINE (< lg) — Numbers INSIDE Card Outline   */}
            {/* Clean, Symmetrical Vertical Timeline without Awkward Spines    */}
            {/* ============================================================== */}
            <div className="block lg:hidden">
              <div className="space-y-0">
                {Array.isArray(currentWorkflow.steps) &&
                  currentWorkflow.steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      {/* Step Card with Number INSIDE */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1326]/85 border border-slate-800/80 shadow-sm">
                        {/* Top Inside Card: Number Node & Phase Info */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            {/* Number INSIDE the card outline */}
                            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-blue-600/30 flex-shrink-0">
                              {idx + 1}
                            </div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                              Phase {idx + 1}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                            ✓ Verified
                          </span>
                        </div>

                        {/* Step Description */}
                        <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                          {step}
                        </p>
                      </div>

                      {/* Clean Vertical Timeline Connector between cards */}
                      {idx < currentWorkflow.steps.length - 1 && (
                        <div className="flex justify-center my-2" aria-hidden="true">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-3 bg-gradient-to-b from-blue-500 to-cyan-500" />
                            <div className="w-5 h-5 rounded-full bg-[#060914] border border-cyan-500/60 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-500/20 -my-0.5">
                              <Icon name="chevron-down" size={11} />
                            </div>
                            <div className="w-0.5 h-3 bg-gradient-to-b from-cyan-500 to-indigo-500" />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
