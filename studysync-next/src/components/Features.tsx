"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { FeatureItem } from '@/types';

export default function Features() {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'attendance' | 'academic' | 'ai'>('all');
  const [showAllDirectory, setShowAllDirectory] = useState(false);
  const items: FeatureItem[] = t('features.items');

  const categories = [
    { id: 'all', label: isRTL ? 'جميع القدرات' : 'All Modules' },
    { id: 'attendance', label: isRTL ? 'الحضور والأمان' : 'Attendance & Security' },
    { id: 'academic', label: isRTL ? 'اللوائح والدرجات' : 'Bylaws & GPA' },
    { id: 'ai', label: isRTL ? 'الذكاء الاصطناعي والمسارات' : 'AI & Career' },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#060914] border-t border-slate-800/80" id="features">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-semibold backdrop-blur-md shadow-inner mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Platform Architecture & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('features.sectionTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {t('features.sectionSubtitle')}
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all focus:outline-none ${activeCategory === cat.id
                    ? 'btn-cyan-glow text-white shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:bg-slate-800/80 hover:text-white'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
          {/* Bento Card 1 (Wide 7 cols): Dynamic QR Attendance Engine */}
          {(activeCategory === 'all' || activeCategory === 'attendance') && (
            <div className="lg:col-span-7 bg-[#0d1326]/90 border border-slate-800/80 hover:border-cyan-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 flex items-center justify-center shadow-inner">
                    <Icon name="qr" size={22} color="currentColor" />
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60">
                    ANTI-PROXY ROTATION
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5">
                  {isRTL ? 'منظومة الحضور بالباركود المشفر الديناميكي' : 'Dynamic Cryptographic QR Attendance Engine'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {isRTL
                    ? 'توليد رموز حضور متغيرة كل 15 ثانية مشفرة بهوية الجلسة، مع التحقق من البصمة الرقمية لجهاز الطالب ونطاق شبكة الواي فاي للقاعة لمنع التسجيل عن بُعد كلياً.'
                    : 'Cryptographically rotating QR tokens refreshed every 15 seconds, verified via device hardware fingerprinting and classroom Wi-Fi SSID locking to permanently eliminate proxy attendance.'}
                </p>
              </div>

              {/* Interactive Telemetry Mockup */}
              <div className="p-4 rounded-2xl bg-[#111933]/70 border border-slate-800/80 grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Rotation Cycle
                  </span>
                  <span className="text-sm font-extrabold text-white">15 Seconds</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">✓ In Sync</span>
                </div>
                <div className="flex flex-col border-x border-slate-800 px-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Geofence Lock
                  </span>
                  <span className="text-sm font-extrabold text-white">Wi-Fi + GPS</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">✓ Verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Device Lock
                  </span>
                  <span className="text-sm font-extrabold text-white">1 Device / ID</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">✓ Anti-Fraud</span>
                </div>
              </div>
            </div>
          )}

          {/* Bento Card 2 (Wide 5 cols): Early Warning & Bylaw Exclusion Radar */}
          {(activeCategory === 'all' || activeCategory === 'academic') && (
            <div className="lg:col-span-5 bg-[#0d1326]/90 border border-slate-800/80 hover:border-amber-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/80 text-amber-400 flex items-center justify-center shadow-inner">
                    <Icon name="alert" size={22} color="currentColor" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/60">
                    BYLAW 75% RADAR
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5">
                  {isRTL ? 'رادار الإنذار المبكر لقرارات الحرمان' : 'Early Academic Warning & Bylaw Radar'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {isRTL
                    ? 'مراقبة استباقية لنسب الغياب تحذر الطالب والمرشد الأكاديمي آلياً قبل الوصول لحد الحرمان القانوني (75%) بـ 3 أسابيع.'
                    : 'Continuous policy evaluation flagging students approaching attendance exclusion thresholds (75%) with multi-stage automated warnings.'}
                </p>
              </div>

              {/* Progress Gauge Mini Mockup */}
              <div className="p-4 rounded-2xl bg-[#111933]/70 border border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    {isRTL ? 'توزيع مستويات الخطورة بالكلية:' : 'Cohort Risk Distribution:'}
                  </span>
                  <span className="font-bold text-cyan-400">1,240 Total</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden flex border border-slate-800">
                  <div className="h-full bg-emerald-500" style={{ width: '88%' }} title="Safe (>85%)" />
                  <div className="h-full bg-amber-400" style={{ width: '8.5%' }} title="Warning (75-85%)" />
                  <div className="h-full bg-rose-500" style={{ width: '3.5%' }} title="Critical (<75%)" />
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className="text-emerald-400">● 88% Safe</span>
                  <span className="text-amber-400">● 8.5% Warning</span>
                  <span className="text-rose-400">● 3.5% Flagged</span>
                </div>
              </div>
            </div>
          )}

          {/* Bento Card 3 (4 cols): AI Syllabus & Career Engine */}
          {(activeCategory === 'all' || activeCategory === 'ai') && (
            <div className="lg:col-span-4 bg-[#0d1326]/90 border border-slate-800/80 hover:border-cyan-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 flex items-center justify-center mb-4 shadow-inner">
                  <Icon name="target" size={20} color="currentColor" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isRTL ? 'تحليل المناهج ومسارات التوظيف' : 'Curriculum & Career Alignment'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {isRTL
                    ? 'معالجة نصوص توصيف المقررات لربط مخرجات التعلم مباشرة بالمهارات المطلوبة في سوق العمل الهندسي والتقني.'
                    : 'Natural Language Processing models parsing syllabus outcomes into tangible market engineering competencies.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-900 border border-slate-700 text-cyan-300">
                  Microservices
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-900 border border-slate-700 text-emerald-300">
                  Kubernetes
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-900 border border-slate-700 text-indigo-300">
                  Distributed SQL
                </span>
              </div>
            </div>
          )}

          {/* Bento Card 4 (4 cols): Assessment & GPA Simulator */}
          {(activeCategory === 'all' || activeCategory === 'academic') && (
            <div className="lg:col-span-4 bg-[#0d1326]/90 border border-slate-800/80 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 text-emerald-400 flex items-center justify-center mb-4 shadow-inner">
                  <Icon name="chart" size={20} color="currentColor" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isRTL ? 'رصد الدرجات ومحاكي المعدل التراكمي' : 'Assessments & GPA Simulator'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {isRTL
                    ? 'دفتر درجات مركزي لأعمال السنة والميدتيرم مع محاكاة تأثير الدرجات المتبقية على المعدل التراكمي الفصلي.'
                    : 'Real-time gradebook with cumulative GPA impact projections and what-if assessment scenario simulators.'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#111933]/70 border border-slate-800 flex items-center justify-between text-xs font-bold text-white">
                <span>Predicted GPA: 3.84</span>
                <span className="text-emerald-400 font-mono">+0.12 Projected</span>
              </div>
            </div>
          )}

          {/* Bento Card 5 (4 cols): Timetable & Prerequisite Solver */}
          {(activeCategory === 'all' || activeCategory === 'academic') && (
            <div className="lg:col-span-4 bg-[#0d1326]/90 border border-slate-800/80 hover:border-blue-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 text-blue-400 flex items-center justify-center mb-4 shadow-inner">
                  <Icon name="calendar" size={20} color="currentColor" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isRTL ? 'جدول أكاديمي موحد مانع للتعارض' : 'Conflict-Free Academic Timetable'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {isRTL
                    ? 'مزامنة ذكية لمواعيد المحاضرات والسكاشن وقاعات الامتحانات تمنع أي تضارب زمني للمجموعات الدراسية.'
                    : 'Automated lecture, recitation, and final exam scheduling with zero room or instructor time conflicts.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Icon name="check" size={14} />
                <span>Zero Schedule Collisions Enforced</span>
              </div>
            </div>
          )}
        </div>

        {/* Directory Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowAllDirectory(!showAllDirectory)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-800 bg-[#0d1326] text-slate-300 hover:text-white hover:border-slate-700 font-bold text-xs transition-all shadow-sm"
          >
            <span>
              {showAllDirectory
                ? isRTL ? 'إخفاء دليل الوحدات الكامل' : 'Collapse Full Modules Directory'
                : isRTL ? 'عرض دليل الوحدات الوظيفية بالكامل (12 وحدة)' : 'View Full Modules Directory (12 Modules)'}
            </span>
            <span className={`transform transition-transform ${showAllDirectory ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        {/* Full Directory Accordion */}
        {showAllDirectory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800/80 animate-in fade-in duration-300">
            {Array.isArray(items) &&
              items.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#0d1326]/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center">
                        <Icon name={item.icon} size={16} color="currentColor" />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-slate-500">
                        MOD #{String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
