"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { UserRole } from '@/types';

export default function UserRoles() {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const roles: UserRole[] = t('users.roles');

  if (!Array.isArray(roles)) return null;

  return (
    <section className="py-20 lg:py-28 bg-[#060914] border-t border-slate-800/80 relative" id="users">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Icon name="shield-check" size={14} />
            <span>{isRTL ? 'إدارة الصلاحيات والأدوار (RBAC)' : 'Multi-Role Governance'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t('users.sectionTitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            {t('users.sectionSubtitle')}
          </p>
        </div>

        {/* Roles Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {roles.map((role, i) => {
            const isActive = activeTab === i;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all focus:outline-none ${
                  isActive
                    ? 'btn-cyan-glow text-white shadow-md'
                    : 'bg-[#0d1326]/80 text-slate-300 border border-slate-800/80 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon
                  name={role.icon}
                  size={16}
                  color={isActive ? '#ffffff' : 'currentColor'}
                />
                <span>{role.title}</span>
              </button>
            );
          })}
        </div>

        {/* Role Active Panel with 2-Column Interactive Preview */}
        {roles[activeTab] && (
          <div className="p-6 sm:p-9 bg-[#0d1326]/90 border border-slate-800/80 rounded-3xl backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Role Details & Capabilities */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                      <Icon name={roles[activeTab].icon} size={22} color="currentColor" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 block">
                        {roles[activeTab].badge}
                      </span>
                      <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                        {roles[activeTab].title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {roles[activeTab].desc}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    {isRTL
                      ? 'الصلاحيات والعمليات المصرح بها في النظام:'
                      : 'Authorized Operational Capabilities & RBAC Scopes:'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {Array.isArray(roles[activeTab].capabilities) &&
                      roles[activeTab].capabilities.map((cap, j) => (
                        <div
                          key={j}
                          className="p-3 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] flex items-start gap-2.5 text-xs text-[var(--text-primary)]"
                        >
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                            ✓
                          </span>
                          <span className="leading-snug">{cap}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Tailored Live Role Dashboard Preview */}
              <div className="lg:col-span-5 bg-[var(--surface-subtle)] p-5 rounded-xl border border-[var(--border)] flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] text-xs font-bold text-[var(--text-primary)]">
                  <span className="flex items-center gap-1.5">
                    <Icon name="terminal" size={14} color="#1e40af" />
                    <span>{isRTL ? 'معاينة البوابة الحية' : 'Live Portal Interface'}</span>
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    {isRTL ? '● تدفق بيانات لحظي' : '● Real-Time Feed'}
                  </span>
                </div>

                {/* Role Specific Mock View */}
                {activeTab === 0 && (
                  /* Student View */
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
                      <span className="text-[11px] font-semibold text-[var(--text-muted)] block">
                        {isRTL ? 'مؤشر الحضور التراكمي' : 'Cumulative Attendance Standing'}
                      </span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-lg font-extrabold text-[var(--text-primary)]">
                          {isRTL ? '94.2% · وضع آمن ومستقر' : '94.2% · Good Standing'}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {isRTL ? 'أعلى من حد اللائحة (75%)' : 'Above 75% Bylaw'}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[var(--text-primary)] block">
                          {isRTL ? 'محاضرة مباشرة CS-402' : 'CS-402 Live Lecture'}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {isRTL ? 'قاعة B-104 · تسجيل الحضور نشط' : 'Hall B-104 · QR Check-in Active'}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold text-[11px]">
                        {isRTL ? 'مسح الباركود' : 'Scan QR'}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  /* Doctor / Faculty View */
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
                      <span className="text-[11px] font-semibold text-[var(--text-muted)] block">
                        {isRTL ? 'منصة بث كود حضور المحاضرة' : 'Lecture QR Broadcast Console'}
                      </span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-base font-extrabold text-[var(--text-primary)]">
                          CS-402 {isRTL ? '(قاعة B-104)' : '(Hall B-104)'}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {isRTL ? 'تدوير كل 15 ث' : 'Rotating 15s'}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[var(--text-primary)] block">
                          {isRTL ? 'كشف الطلاب المهددين بالحرمان' : 'Course Exclusion Roster'}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {isRTL ? 'طالبان تحت حد الـ 75%' : '2 students flagged below 75%'}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold text-[11px]">
                        {isRTL ? 'مراجعة الكشف' : 'Review Roster'}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  /* TA View */
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
                      <span className="text-[11px] font-semibold text-[var(--text-muted)] block">
                        {isRTL ? 'جلسة المعمل التطبيقي' : 'Lab Section Recitation'}
                      </span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-base font-extrabold text-[var(--text-primary)]">
                          {isRTL ? 'معمل 3B · قواعد البيانات الموزعة' : 'Lab 3B · Distributed SQL'}
                        </span>
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                          {isRTL ? '24 من 25 حاضرون' : '24/25 Present'}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[var(--text-primary)] block">
                          {isRTL ? 'قائمة تصحيح التكليفات' : 'Assignment Grading Queue'}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {isRTL ? '6 تسليمات بانتظار الاعتماد' : '6 Lab Submissions Pending Review'}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold text-[11px]">
                        {isRTL ? 'رصد الدرجات' : 'Grade Tasks'}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  /* Admin / Dean View */
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
                      <span className="text-[11px] font-semibold text-[var(--text-muted)] block">
                        {isRTL ? 'مؤشر التزام الكلية بنسب الحضور' : 'College Attendance Compliance Index'}
                      </span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-lg font-extrabold text-[var(--text-primary)]">
                          {isRTL ? '91.4% المعدل العام' : '91.4% Overall'}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {isRTL ? 'مطابق للاعتماد' : 'Accredited'}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[var(--text-primary)] block">
                          {isRTL ? 'التماسات وأعذار الحرمان الأكاديمي' : 'Bylaw Exclusion Petitions'}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {isRTL ? '3 طلبات أعذار طبية قيد الدراسة' : '3 Medical Excuse Requests Pending'}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold text-[11px]">
                        {isRTL ? 'إجراء العمادة' : 'Dean Action'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
