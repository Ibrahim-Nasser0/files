"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';

export default function Overview() {
  const { t, isRTL } = useLanguage();

  const legacyPoints = [
    {
      title: isRTL ? 'كشوفات التوقيع الورقية' : 'Manual Paper Attendance Rosters',
      desc: isRTL
        ? 'سهولة تسجيل الغائبين بالنيابة، وأخطاء رصد متكررة، وانعدام التحقق الجغرافي داخل المدرج.'
        : 'High proxy signing fraud, frequent manual calculation errors, and zero geofence presence validation.',
    },
    {
      title: isRTL ? 'رصد الدرجات المنفصل في جداول غير مركزية' : 'Siloed Spreadsheet Gradebooks',
      desc: isRTL
        ? 'درجات أعمال السنة محبوسة في ملفات متفرقة دون ربط موحد مع إدارة الكلية وشؤون الطلاب.'
        : 'Coursework grades locked in decentralized spreadsheets, preventing timely Dean-level intervention.',
    },
    {
      title: isRTL ? 'حرمان مفاجئ في نهاية الفصل الدراسي' : 'Abrupt End-of-Term Exclusions',
      desc: isRTL
        ? 'تفاجؤ الطلاب بقرار الحرمان عند الامتحانات النهائية لغياب الإنذار المبكر التلقائي.'
        : 'Students only discover they breached the 75% limit when barred from finals without prior alerts.',
    },
    {
      title: isRTL ? 'غياب التوجيه المهني للمواد الاختيارية' : 'Opaque Coursework Career Relevance',
      desc: isRTL
        ? 'اختيار المقررات الاختيارية عشوائياً دون فهم لمتطلبات سوق العمل البرمجي المعاصر.'
        : 'Students pick electives blindly without insight into how credits map to market engineering roles.',
    },
  ];

  const platformPoints = [
    {
      title: isRTL ? 'كود حضور ديناميكي مشفر كل 15 ثانية' : 'Cryptographic 15s Dynamic QR Engine',
      desc: isRTL
        ? 'تدوير فوري للرموز مع قفل البصمة الرقمية للجهاز ونطاق الواي فاي المعتمد للقاعة.'
        : 'Rapid rotating tokens bound to hardware fingerprints and verified campus Wi-Fi beacons.',
    },
    {
      title: isRTL ? 'رادار الإنذار المبكر للائحة الحرمان (75%)' : 'Automated Bylaw Early-Warning Radar',
      desc: isRTL
        ? 'تنبيه آلي استباقي للطلاب والمرشد الأكاديمي عند بلوغ 85% و80% قبل صدور قرار الحرمان.'
        : 'Multi-stage alerts sent to students and advisors at 85% and 80% before reaching the 75% limit.',
    },
    {
      title: isRTL ? 'بوابات متزامنة لكل أطراف المنظومة' : 'Synchronized Stakeholder Governance',
      desc: isRTL
        ? 'صلاحيات دقيقة تربط العميد، ورئيس القسم، وأستاذ المادة، والمعيد، والطالب في بيئة واحدة.'
        : 'Role-based access controls connecting Dean, Department Chair, Doctor, TA, and Student.',
    },
    {
      title: isRTL ? 'تحليل ذكاء اصطناعي للمناهج وسوق العمل' : 'AI Curriculum & Competency Engine',
      desc: isRTL
        ? 'نماذج معالجة لغة طبيعية تحلل توصيف المقررات وتربطها بالمهارات الوظيفية المطلوبة عالمياً.'
        : 'NLP models evaluate syllabus outcomes and align student competencies with market job benchmarks.',
    },
  ];

  const impactMetrics = [
    { num: '98%', label: isRTL ? 'انخفاض في تزوير الحضور' : 'Proxy Attendance Reduction' },
    { num: '3 Wks', label: isRTL ? 'تدخل استباقي أبكر للطلاب المتعثرين' : 'Earlier At-Risk Intervention' },
    { num: '100%', label: isRTL ? 'مطابقة مع لوائح الجامعات' : 'Audit-Ready Bylaw Compliance' },
    { num: '4.2x', label: isRTL ? 'تسريع اعتماد رصد الدرجات' : 'Faster Gradebook Sync' },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#060914]" id="overview">
      {/* Seamless Grid Gradient Dissolve from Hero into Deep Space */}
      <div className="absolute inset-x-0 top-0 h-[550px] cosmic-grid-fadeout pointer-events-none" />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Icon name="shield-check" size={14} />
            <span>{isRTL ? 'التحول المؤسسي الأكاديمي' : 'Institutional Transformation'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t('overview.sectionTitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {t('overview.sectionSubtitle')}
          </p>
        </div>

        {/* 2-Column Comparative Architecture Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Status Quo Card */}
          <div className="p-6 sm:p-8 bg-[#0d1326]/90 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Icon name="alert" size={20} color="currentColor" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block font-mono">
                    {isRTL ? 'التحدي المؤسسي الحالي' : 'Status Quo Challenges'}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {t('overview.problemTitle')}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed pb-5 mb-5 border-b border-slate-800/80">
                {t('overview.problemText')}
              </p>

              <div className="space-y-4">
                {legacyPoints.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✕
                    </span>
                    <div>
                      <strong className="text-slate-200 font-bold block mb-0.5">
                        {item.title}
                      </strong>
                      <p className="text-xs text-slate-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* StudySync Architecture Card */}
          <div className="p-6 sm:p-8 bg-[#0d1326]/90 border border-cyan-500/20 hover:border-cyan-500/40 transition-all rounded-3xl backdrop-blur-xl shadow-xl shadow-cyan-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-blue-950/50 border border-cyan-500/40 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Icon name="shield-check" size={20} color="currentColor" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 block font-mono">
                    {isRTL ? 'منظومة StudySync المتكاملة' : 'StudySync Operating Architecture'}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {t('overview.solutionTitle')}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed pb-5 mb-5 border-b border-slate-800/80">
                {t('overview.solutionText')}
              </p>

              <div className="space-y-4">
                {platformPoints.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-[var(--text-primary)] font-bold block mb-0.5">
                        {item.title}
                      </strong>
                      <p className="text-xs text-[var(--text-secondary)] leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Impact Strip */}
        <div className="campus-card p-6 sm:p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] mb-5">
            <Icon name="chart" size={17} color="#1e40af" />
            <span>
              {isRTL
                ? 'الأثر المؤسسي الموثق على كفاءة الكليات والجامعات:'
                : 'Quantified Institutional Impact on Campus Efficiency:'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactMetrics.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] flex flex-col gap-1"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
                  {item.num}
                </span>
                <span className="text-xs font-semibold text-[var(--text-secondary)] leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
