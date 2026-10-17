"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { RiskRule } from '@/types';

export default function RiskDetection() {
  const { t, isRTL } = useLanguage();

  // Interactive Simulator State
  const [attendanceRate, setAttendanceRate] = useState(77);
  const [missedTasks, setMissedTasks] = useState(1);
  const [gpaScore, setGpaScore] = useState(2.8);

  const rules: RiskRule[] = [
    {
      condition: t('risk.rules.0.condition'),
      status: t('risk.rules.0.status'),
      level: 'safe',
      icon: 'check-circle',
      color: '#059669',
      badge: 'SAFE',
    },
    {
      condition: t('risk.rules.1.condition'),
      status: t('risk.rules.1.status'),
      level: 'attention',
      icon: 'zap',
      color: '#d97706',
      badge: 'ATTENTION',
    },
    {
      condition: t('risk.rules.2.condition'),
      status: t('risk.rules.2.status'),
      level: 'risk',
      icon: 'alert',
      color: '#ea580c',
      badge: 'WARNING',
    },
    {
      condition: t('risk.rules.3.condition'),
      status: t('risk.rules.3.status'),
      level: 'critical',
      icon: 'alert',
      color: '#dc2626',
      badge: 'EXCLUSION',
    },
    {
      condition: t('risk.rules.4.condition'),
      status: t('risk.rules.4.status'),
      level: 'risk',
      icon: 'calendar',
      color: '#ea580c',
      badge: 'DEFICIT',
    },
    {
      condition: t('risk.rules.5.condition'),
      status: t('risk.rules.5.status'),
      level: 'critical',
      icon: 'chart',
      color: '#dc2626',
      badge: 'PROBATION',
    },
  ];

  // Dynamic simulation status calculator
  const calculateSimStatus = () => {
    if (attendanceRate <= 75 || gpaScore < 2.0) {
      return {
        level: 'critical',
        label: isRTL ? 'حرمان أكاديمي وفق اللائحة' : 'Course Exclusion Triggered',
        color: '#dc2626',
        bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        advice: isRTL
          ? 'تم تجاوز حد الحرمان الرسمي (75%). سيتم رفع كشف الحرمان تلقائياً إلى إدارة الكلية ما لم يُقدَّم عذر رسمي معتمد.'
          : 'Attendance has breached the 75% college exclusion cutoff. Course registration flagged for forfeiture unless an official petition is filed.',
      };
    }
    if (attendanceRate <= 80 || missedTasks >= 2) {
      return {
        level: 'risk',
        label: isRTL ? 'إنذار أول (منطقة الخطر 75-80%)' : 'Official Warning Zone (75-80%)',
        color: '#ea580c',
        bg: 'bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800',
        advice: isRTL
          ? 'غياب محاضرة واحدة إضافية سيترتب عليه تجاوز حد الحرمان الأكاديمي فورياً.'
          : 'A single further unexcused absence breaches the institutional exclusion cutoff. Advisor meeting requested.',
      };
    }
    if (attendanceRate < 85 || missedTasks === 1) {
      return {
        level: 'attention',
        label: isRTL ? 'تنبيه مبكر (يحتاج متابعة)' : 'Early Advisory (Caution)',
        color: '#d97706',
        bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        advice: isRTL
          ? 'سجل الحضور قريب من النطاق الأصفر. يُرجى الحضور المنتظم لتجنب صدور إنذار رسمي.'
          : 'Attendance records nearing warning threshold. Consistent attendance recommended to maintain standing.',
      };
    }
    return {
      level: 'safe',
      label: isRTL ? 'وضع أكاديمي آمن ومستقر' : 'Good Standing (Safe > 85%)',
      color: '#059669',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      advice: isRTL
        ? 'سجل الحضور والأعمال الفصلية مستوفٍ لمعايير التفوق واللوائح المعتمدة.'
        : 'All records fully compliant with university bylaws and honors standing criteria.',
    };
  };

  const sim = calculateSimStatus();

  return (
    <section className="py-20 lg:py-28 bg-[#060914] border-t border-slate-800/80 relative" id="risk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Icon name="alert" size={14} />
            <span>{isRTL ? 'شبكة الأمان الأكاديمي ولائحة الحرمان' : 'Academic Safety Net & Bylaws'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t('risk.sectionTitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {t('risk.sectionSubtitle')}
          </p>
        </div>

        {/* Live Simulator Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Controls & Output Panel */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0d1326]/90 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 text-cyan-400 flex items-center justify-center">
                    <Icon name="sliders" size={16} color="currentColor" />
                  </div>
                  <span className="font-bold text-base text-white">
                    {isRTL ? 'محاكي لائحة الحرمان التفاعلي' : 'Bylaw Policy Simulator'}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${sim.bg}`}>
                  {sim.label}
                </span>
              </div>

              {/* Slider 1: Attendance */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <label className="text-slate-400">
                    {isRTL ? 'نسبة الحضور المسجلة' : 'Recorded Attendance Rate'}
                  </label>
                  <span className="font-mono font-bold text-sm" style={{ color: sim.color }}>
                    {attendanceRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={attendanceRate}
                  onChange={(e) => setAttendanceRate(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-900 border border-slate-800 appearance-none cursor-pointer accent-cyan-400"
                  aria-label="Attendance Rate Slider"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5 font-semibold">
                  <span>50%</span>
                  <span className="text-rose-400 font-bold">
                    75% {isRTL ? '(حد الحرمان)' : '(Cutoff)'}
                  </span>
                  <span>85%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Slider 2: Missed Tasks */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <label className="text-slate-400">
                    {isRTL ? 'التكليفات والواجبات المتأخرة' : 'Overdue Lab Deliverables'}
                  </label>
                  <span className="font-mono font-bold text-sm text-white">
                    {missedTasks} {isRTL ? 'مهام' : 'tasks'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={missedTasks}
                  onChange={(e) => setMissedTasks(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-900 border border-slate-800 appearance-none cursor-pointer accent-cyan-400"
                  aria-label="Missed Tasks Slider"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5 font-semibold">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
              </div>

              {/* Slider 3: Current GPA */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <label className="text-slate-400">
                    {isRTL ? 'المعدل التراكمي (GPA)' : 'Cumulative GPA'}
                  </label>
                  <span className="font-mono font-bold text-sm text-white">
                    {gpaScore.toFixed(1)} / 4.0
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={gpaScore}
                  onChange={(e) => setGpaScore(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-900 border border-slate-800 appearance-none cursor-pointer accent-cyan-400"
                  aria-label="GPA Score Slider"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5 font-semibold">
                  <span className="text-rose-400 font-bold">1.0 (&lt;2.0 Probation)</span>
                  <span>2.0</span>
                  <span>3.0</span>
                  <span className="text-emerald-400 font-bold">4.0 (Dean's List)</span>
                </div>
              </div>
            </div>

            {/* Live Advice Box */}
            <div
              className="p-4 rounded-2xl bg-[#111933]/70 border border-slate-800"
              style={{
                borderLeftColor: isRTL ? undefined : sim.color,
                borderLeftWidth: isRTL ? undefined : '4px',
                borderRightColor: isRTL ? sim.color : undefined,
                borderRightWidth: isRTL ? '4px' : undefined,
              }}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold mb-1" style={{ color: sim.color }}>
                <Icon name="bell" size={13} color="currentColor" />
                <span>
                  {isRTL ? 'الإشعار الصادر تلقائياً للطالب والمرشد:' : 'Automated System Notice:'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed font-medium">
                {sim.advice}
              </p>
            </div>
          </div>

          {/* Official Advisory Notice Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#0d1326]/90 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  <span className="font-bold text-sm text-white">
                    {t('risk.exampleTitle')}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400">
                  {isRTL ? 'إشعار نشط' : 'Active Notice'}
                </span>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/80 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Icon name="alert" size={22} color="currentColor" />
                </div>
                <div>
                  <strong className="block text-sm text-white font-bold mb-1">
                    {isRTL ? 'عمادة شؤون الطلاب · وحدة الرصد' : 'Office of Academic Standing'}
                  </strong>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {t('risk.exampleText')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Icon name="check-circle" size={13} color="currentColor" />
                <span>{isRTL ? 'تدقيق آلي باللائحة' : 'Deterministic Bylaw Rule'}</span>
              </span>
              <span className="text-cyan-400 font-bold hover:underline cursor-pointer flex items-center gap-1">
                {isRTL ? 'سجل الغياب والتظلمات' : 'Absence Log & Appeals'}{' '}
                <span className={isRTL ? 'rotate-180' : ''}>➔</span>
              </span>
            </div>
          </div>
        </div>

        {/* 6-Rule Policy Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0d1326]/90 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              style={{
                borderTopColor: rule.color,
                borderTopWidth: '3px',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${rule.color}20`,
                      color: rule.color,
                    }}
                  >
                    <Icon name={rule.icon} size={16} color="currentColor" />
                  </div>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                    style={{
                      backgroundColor: `${rule.color}20`,
                      color: rule.color,
                      border: `1px solid ${rule.color}50`,
                    }}
                  >
                    {rule.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">
                  {rule.condition}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {rule.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
