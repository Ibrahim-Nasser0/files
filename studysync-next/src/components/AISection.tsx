"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { AITool, ExampleResult, RecFactor } from '@/types';

export default function AISection() {
  const { t, isRTL } = useLanguage();
  const tools: AITool[] = t('ai.tools');
  const exampleResults: ExampleResult[] = t('ai.exampleResults');
  const recPhase1Steps: string[] = t('ai.recPhase1Steps');
  const recFactors: RecFactor[] = t('ai.recFactors');

  return (
    <section className="py-20 lg:py-28 bg-[#060914] border-t border-slate-800/80 relative" id="ai">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Icon name="cpu" size={14} />
            <span>{isRTL ? 'الذكاء الاصطناعي للمناهج الأكاديمية' : 'Curriculum Intelligence'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t('ai.sectionTitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {t('ai.sectionSubtitle')}
          </p>
        </div>

        {/* ML Model Card & Real Inference Showcase */}
        <div className="p-6 sm:p-9 bg-[#0d1326]/90 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Model Specs */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-950/70 border border-indigo-700/60 text-indigo-300 font-mono">
                  NLP Curriculum Classifier
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  ● Verified Pipeline
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t('ai.mlTitle')}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {t('ai.mlDesc')}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#111933]/70 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Model Architecture
                  </span>
                  <span className="text-xs font-bold text-white">
                    {t('ai.mlType')}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#111933]/70 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Input Ingestion
                  </span>
                  <span className="text-xs font-bold text-white">
                    {t('ai.mlInput')}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#111933]/70 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Prediction Target
                  </span>
                  <span className="text-xs font-bold text-white">
                    {t('ai.mlOutput')}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Governance Gate
                  </span>
                  <span className="text-xs font-bold text-emerald-300">
                    {t('ai.mlReview')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Inference Simulator */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111933]/70 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs font-bold text-white">
                    {t('ai.exampleTitle')}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                  Syllabus Ingestion
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 text-xs text-cyan-300 font-bold mb-5 shadow-inner">
                <Icon name="book" size={16} color="currentColor" />
                <span className="text-white font-bold">{t('ai.exampleCourse')}</span>
              </div>

              <div className="space-y-4">
                {Array.isArray(exampleResults) &&
                  exampleResults.map((r, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-200">{r.track}</span>
                        <span className="font-mono text-cyan-400">
                          {r.score}% Match
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-700"
                          style={{ width: `${r.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 AI Tools Grid */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-white mb-6">
            {t('ai.toolsTitle')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.isArray(tools) &&
              tools.map((tool, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#0d1326]/90 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 flex items-center justify-center mb-4 shadow-inner">
                      <Icon name={tool.icon} size={20} color="currentColor" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 2-Phase Recommendation Engine */}
        <div className="p-6 sm:p-9 bg-[#0d1326]/90 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
              Constraint-Satisfaction Engine
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-8">
            {t('ai.recTitle')}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Phase 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111933]/70 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{t('ai.recPhase1')}</span>
              </h4>
              <div className="space-y-2.5">
                {Array.isArray(recPhase1Steps) &&
                  recPhase1Steps.map((step, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200"
                    >
                      <span className="w-5 h-5 rounded-md bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-semibold">{step}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111933]/70 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{t('ai.recPhase2')}</span>
              </h4>
              <div className="space-y-3">
                {Array.isArray(recFactors) &&
                  recFactors.map((f, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-200">{f.name}</span>
                        <span className="font-mono text-emerald-400">{f.weight}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: f.weight }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
