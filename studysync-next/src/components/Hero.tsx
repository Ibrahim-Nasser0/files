"use client";

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigation } from '@/context/NavigationContext';
import { Icon } from '@/components/common/Icon';

export default function Hero() {
  const { t, isRTL, lang } = useLanguage();
  const { toggleCommandPalette } = useNavigation();

  const [activePersona, setActivePersona] = useState<'student' | 'faculty' | 'dean'>('student');
  const [qrToken, setQrToken] = useState('SEC-7743-A');
  const [countdown, setCountdown] = useState(1);
  const [verified, setVerified] = useState(false);
  const [attendancePercent, setAttendancePercent] = useState(94);
  const [facultyCheckedIn, setFacultyCheckedIn] = useState(49);
  const [deanNoticeDispatched, setDeanNoticeDispatched] = useState(false);

  // Dynamic QR countdown and token rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const chars = '0123456789ABCDEF';
          let newToken = 'SEC-';
          for (let i = 0; i < 4; i++) newToken += chars[Math.floor(Math.random() * chars.length)];
          newToken += '-';
          newToken += chars[Math.floor(Math.random() * chars.length)];
          setQrToken(newToken);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateCheckin = () => {
    setVerified(true);
    setAttendancePercent(96);
    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#06b6d4', '#3b82f6', '#10b981'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      setVerified(false);
    }, 3500);
  };

  const handleFacultyRefresh = () => {
    setFacultyCheckedIn((prev) => (prev < 52 ? prev + 1 : 52));
    const chars = '0123456789ABCDEF';
    let newToken = 'SEC-';
    for (let i = 0; i < 4; i++) newToken += chars[Math.floor(Math.random() * chars.length)];
    newToken += '-';
    newToken += chars[Math.floor(Math.random() * chars.length)];
    setQrToken(newToken);
    setCountdown(15);
  };

  const handleDispatchDeanNotice = () => {
    setDeanNoticeDispatched(true);
    setTimeout(() => setDeanNoticeDispatched(false), 4000);
  };

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden cosmic-grid-bg" id="hero">
      {/* Radial Atmospheric Lighting Beams (Behind Content) */}
      <div
        className="absolute top-1/4 left-10 w-[550px] h-[450px] bg-indigo-600/12 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[600px] h-[500px] bg-cyan-500/12 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16">
          {/* Left Column: Headline, Value Proposition & CTA Cluster */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            {/* Accreditation Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-slate-200 text-xs font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8] animate-pulse" />
              <span>{isRTL ? 'منصة التعليم العالي المؤسسية v2.6 · معيار معتمد' : 'Institutional Academic Platform v2.6 · Higher Ed Standard'}</span>
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.12] mb-6">
              {isRTL ? (
                <>المنصة الرقمية الموحدة لإدارة الجامعات</>
              ) : (
                <>The Unified Digital Platform for University Management</>
              )}
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl font-normal">
              {isRTL
                ? 'بيئة تشغيلية متكاملة تربط سجلات الطلاب، والحضور بالباركود المشفر الديناميكي، والكشف التلقائي عن مخاطر الحرمان، ونماذج المسارات المهنية المدعومة بالذكاء الاصطناعي.'
                : 'An integrated operating environment connecting student records, dynamic QR attendance, automated risk detection, and machine-learning-driven career pathway modeling.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6 w-full sm:w-auto">
              <a
                href="#features"
                onClick={scrollToFeatures}
                className="btn-cyan-glow inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white font-bold text-sm shadow-lg hover:shadow-cyan-500/30 transition-all focus:outline-none"
              >
                <Icon name="compass" size={17} />
                <span>{isRTL ? 'استعراض إمكانيات المنصة' : 'Explore Platform Capabilities'}</span>
              </a>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-slate-700/80 bg-slate-900/50 hover:bg-slate-800/80 hover:border-slate-600 text-slate-200 font-bold text-sm transition-all focus:outline-none"
              >
                <Icon name="download" size={16} />
                <span>{isRTL ? 'تصدير التقرير الفني (PDF)' : 'Export Technical Whitepaper (PDF)'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Flagship Campus Portal Terminal Preview (Interactive Multi-Persona Showcase) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-800/90 bg-[#0d1326]/90 backdrop-blur-xl shadow-2xl p-6 sm:p-7 transition-all">
              {/* Window Top Title Bar with Persona Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
                </div>

                {/* Persona Switcher Pill Tabs */}
                <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <button
                    onClick={() => setActivePersona('student')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activePersona === 'student'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isRTL ? '🎓 حساب الطالب' : '🎓 Student'}
                  </button>
                  <button
                    onClick={() => setActivePersona('faculty')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activePersona === 'faculty'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isRTL ? '👨‍🏫 عضو التدريس' : '👨‍🏫 Faculty'}
                  </button>
                  <button
                    onClick={() => setActivePersona('dean')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activePersona === 'dean'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isRTL ? '🏛️ رادار العمادة' : '🏛️ Dean Radar'}
                  </button>
                </div>

                {/* Quick Search Shortcut Badge */}
                <button
                  onClick={toggleCommandPalette}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-[11px] font-mono text-slate-400 hover:text-white transition-colors focus:outline-none"
                  title={isRTL ? 'البحث السريع (Ctrl + K)' : 'Search portal (Ctrl + K)'}
                >
                  <Icon name="search" size={11} />
                  <span>Ctrl + K</span>
                </button>
              </div>

              {/* View 1: Student Persona (Exact Reference Target) */}
              {activePersona === 'student' && (
                <div className="animate-in fade-in duration-200">
                  {/* Student Profile Header Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#111933]/60 border border-slate-800/80 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                        {isRTL ? 'عم' : 'OK'}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          {isRTL ? 'عمر خالد المنشاوي' : 'Omar K. Al-Manshawi'}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isRTL ? 'هندسة الحاسب · المستوى الرابع' : 'Computer Engineering · Level 4'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-xs font-bold text-slate-300">
                        {isRTL ? 'المعدل ' : 'GPA '}
                        <span className="text-cyan-400 font-mono">3.84 / 4.0</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-xs font-bold text-slate-300">
                        {isRTL ? 'الساعات ' : 'Credits '}
                        <span className="text-cyan-400 font-mono">
                          {isRTL ? '98 من 134 س.م' : '98 / 134 Cr'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Two Column Grid: Course Card & Dynamic QR Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-5">
                    {/* Left: Active Course Info */}
                    <div className="sm:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#111933]/70 border border-slate-800/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {isRTL ? 'محاضرة مباشرة' : 'Live Lecture'}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">CS304</span>
                        </div>

                        <h4 className="text-base font-extrabold text-white mb-2 leading-snug">
                          {isRTL ? 'النظم السحابية الموزعة' : 'Distributed Cloud Systems'}
                        </h4>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
                          <Icon name="calendar" size={13} className="text-slate-400" />
                          <span>{isRTL ? 'قاعة B2 · 10:30 ص - 12:00 م' : 'Hall B2 · 10:30 AM - 12:00 PM'}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-slate-400 font-medium">
                            {isRTL ? 'نسبة حضور المقرر:' : 'Course Attendance:'}
                          </span>
                          <span className="font-mono font-bold text-emerald-400">
                            {attendancePercent}% {isRTL ? '(آمن > 75%)' : '(Safe > 75%)'}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${attendancePercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right: Dynamic QR Code Box */}
                    <div className="sm:col-span-5 p-4 rounded-2xl bg-[#111933]/70 border border-slate-800/80 flex flex-col items-center justify-between text-center">
                      <div className="flex items-center justify-between w-full mb-3 text-xs">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-400 text-xs">
                          <Icon name="shield-check" size={13} />
                          <span>{isRTL ? 'كود ديناميكي' : 'Dynamic QR'}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-400 text-xs">
                          <Icon name="clock" size={12} />
                          <span>{countdown}{isRTL ? ' ث' : 's'}</span>
                        </span>
                      </div>

                      {/* Stylized Modern QR Icon Container */}
                      <div className="w-24 h-24 p-2 rounded-2xl bg-[#090d1c] border border-slate-800 flex items-center justify-center mb-2 shadow-inner group">
                        <svg viewBox="0 0 48 48" className="w-16 h-16" fill="none" aria-label={isRTL ? 'رمز الاستجابة السريعة الديناميكي' : 'Dynamic QR Code'}>
                          <rect x="4" y="4" width="16" height="16" rx="4" fill="#3b82f6" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.5" />
                          <rect x="8" y="8" width="8" height="8" rx="2" fill="#38bdf8" />
                          <rect x="28" y="4" width="16" height="16" rx="4" fill="#3b82f6" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.5" />
                          <rect x="32" y="8" width="8" height="8" rx="2" fill="#38bdf8" />
                          <rect x="4" y="28" width="16" height="16" rx="4" fill="#3b82f6" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.5" />
                          <rect x="8" y="32" width="8" height="8" rx="2" fill="#38bdf8" />
                          <rect x="28" y="28" width="6" height="6" rx="1.5" fill="#38bdf8" />
                          <rect x="38" y="28" width="6" height="6" rx="1.5" fill="#818cf8" />
                          <rect x="28" y="38" width="6" height="6" rx="1.5" fill="#818cf8" />
                          <rect x="38" y="38" width="6" height="6" rx="1.5" fill="#38bdf8" />
                        </svg>
                      </div>

                      {/* Cryptographic Session Token */}
                      <span className="font-mono text-xs font-bold text-slate-300 mb-3 tracking-wider">
                        {qrToken}
                      </span>

                      {/* Simulate Check-in Button */}
                      <button
                        onClick={handleSimulateCheckin}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                          verified
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        {verified ? (
                          <>
                            <Icon name="check-circle" size={13} color="#ffffff" />
                            <span>{isRTL ? '✓ تم التحقق بنجاح!' : '✓ Verified!'}</span>
                          </>
                        ) : (
                          <>
                            <Icon name="zap" size={13} />
                            <span>{isRTL ? 'محاكاة تسجيل الحضور (QR)' : 'Simulate QR Check-in'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bottom Curriculum Copilot Strip */}
                  <div className="p-3.5 rounded-2xl bg-[#111933]/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-indigo-950/80 border border-indigo-700/60 text-indigo-400 flex items-center justify-center flex-shrink-0">
                        <Icon name="sparkles" size={14} />
                      </div>
                      <p className="text-slate-300 truncate text-[11px] sm:text-xs">
                        <span className="font-bold text-white">
                          {isRTL ? 'المساعد الذكي للمقرر:' : 'Curriculum Copilot:'}
                        </span>{' '}
                        {isRTL
                          ? 'تم توليد ملخص هيكلي للمحاضرة السابعة مع 12 سؤالاً تدريبياً جاهزاً.'
                          : 'Lecture 7 structured summary generated with 12 practice questions ready.'}
                      </p>
                    </div>
                    <a
                      href="#ai"
                      className="font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 flex-shrink-0 text-xs"
                    >
                      <span>{isRTL ? 'عرض' : 'View'}</span>
                      <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} size={12} />
                    </a>
                  </div>
                </div>
              )}

              {/* View 2: Faculty Persona (Professor Console) */}
              {activePersona === 'faculty' && (
                <div className="animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#111933]/60 border border-slate-800/80 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                        {isRTL ? 'طح' : 'TH'}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          {isRTL ? 'د. طارق الحسيني' : 'Dr. Tariq Al-Husseini'}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isRTL ? 'أستاذ المقرر · قسم النظم الموزعة' : 'Professor · Distributed Systems Department'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {isRTL ? 'الجلسة نشطة الآن' : 'Session Active'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-5">
                    <div className="sm:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#111933]/70 border border-slate-800/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {isRTL ? 'CS304 · الشعبة (أ)' : 'CS304 · Section A'}
                          </span>
                          <span className="text-xs text-slate-400">
                            {isRTL ? 'قاعة B2' : 'Hall B2'}
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-white mb-2 leading-snug">
                          {isRTL ? 'بث كشف الحضور والطلاب اللحظي' : 'Live Roster & Attendance Broadcast'}
                        </h4>
                        <p className="text-xs text-slate-400 mb-5">
                          {isRTL
                            ? 'بث مفتاح التشفير لجلسة الحضور لـ 52 طالباً مسجلاً في الشعبة.'
                            : 'Cryptographic session key broadcasting to 52 enrolled engineering students.'}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-slate-400 font-medium">
                            {isRTL ? 'الطلاب الحاضرون:' : 'Checked-in Roster:'}
                          </span>
                          <span className="font-mono font-bold text-cyan-400">
                            {facultyCheckedIn} / 52 {isRTL ? 'طالب' : 'Students'} ({Math.round((facultyCheckedIn / 52) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                            style={{ width: `${(facultyCheckedIn / 52) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-5 p-4 rounded-2xl bg-[#111933]/70 border border-slate-800/80 flex flex-col items-center justify-between text-center">
                      <div className="w-full text-xs flex items-center justify-between mb-2">
                        <span className="text-slate-400">
                          {isRTL ? 'رمز البث المؤقت' : 'Broadcast Token'}
                        </span>
                        <span className="text-amber-400 font-mono font-bold">{countdown}{isRTL ? ' ث' : 's'}</span>
                      </div>
                      <div className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-cyan-300 mb-3">
                        {qrToken}
                      </div>
                      <button
                        onClick={handleFacultyRefresh}
                        className="w-full py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm mb-2"
                      >
                        <Icon name="refresh" size={13} />
                        <span>{isRTL ? 'تدوير الرمز وإضافة حضور' : 'Rotate Token & Add Check-in'}</span>
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="w-full py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/80 transition-all"
                      >
                        {isRTL ? 'تصدير كشف الحضور (PDF)' : 'Export Attendance Sheet'}
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#111933]/70 border border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {isRTL ? 'مزامنة فورية للائحة مع إدارة الكلية وشؤون الطلاب.' : 'Auto-Bylaw sync with University Registrar active.'}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {isRTL ? 'مشفر بنسبة 100%' : '100% Encrypted'}
                    </span>
                  </div>
                </div>
              )}

              {/* View 3: Dean Persona (Compliance & Risk Radar) */}
              {activePersona === 'dean' && (
                <div className="animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#111933]/60 border border-slate-800/80 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                        {isRTL ? 'سع' : 'SO'}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          {isRTL ? 'د. سارة العمري' : 'Dr. Sarah Al-Omari'}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isRTL ? 'عميدة الشؤون الأكاديمية · تطبيق اللوائح' : 'Dean of Academic Affairs · Bylaw Enforcement'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-rose-950/70 border border-rose-700/60 text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                        {isRTL ? '3 طلاب مهددون بالحرمان (75%)' : '3 Students at 75% Risk'}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#111933]/70 border border-slate-800/80 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">
                        {isRTL ? 'رادار مراقبة حدود الحرمان الأكاديمي للكلية' : 'Campus Academic Risk Threshold Radar'}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {isRTL ? '99.8% حالة اسمية' : '99.8% Nominal'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      {isRTL
                        ? 'تنص المادة 14 من اللائحة الجامعية على إحالة أي طالب تقل نسبة حضوره عن 75% تلقائياً إلى العمادة مع إرسال إنذار رسمي.'
                        : 'University Article 14 states any student with attendance falling below 75% is automatically flagged for Dean review and electronic notice delivery.'}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                        <span className="text-slate-300 font-medium">
                          {isRTL ? 'طالب رقم #2024-8839 (CS304)' : 'Student ID #2024-8839 (CS304)'}
                        </span>
                        <span className="font-mono font-bold text-rose-400">
                          72.4% {isRTL ? '(تجاوز حد الحرمان)' : '(Threshold Breached)'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                        <span className="text-slate-300 font-medium">
                          {isRTL ? 'طالب رقم #2023-1102 (ENG201)' : 'Student ID #2023-1102 (ENG201)'}
                        </span>
                        <span className="font-mono font-bold text-amber-400">
                          74.8% {isRTL ? '(في منطقة الخطر)' : '(At Risk Warning)'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleDispatchDeanNotice}
                      className="w-full py-2 px-4 rounded-xl btn-cyan-glow text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Icon name="bell" size={13} />
                      <span>
                        {deanNoticeDispatched
                          ? isRTL
                            ? '✓ تم إرسال إشعارات المادة 14 الرسمية عبر SMS و SIS!'
                            : '✓ Clause 14 Official Notices Dispatched via SMS & SIS!'
                          : isRTL
                          ? 'إرسال إنذارات المادة 14 التلقائية (SMS / تيليجرام)'
                          : 'Dispatch Automated Article 14 Warnings (Telegram / SMS)'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Metrics Capsule (Exact match to reference) */}
        <div className="rounded-3xl border border-slate-800/80 bg-[#0d1326]/80 backdrop-blur-xl p-6 sm:p-7 shadow-2xl mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {/* Metric 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/70 border border-indigo-800/60 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Icon name="layers" size={22} />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block">17+</span>
                <span className="text-xs font-semibold text-slate-400 block">{t('hero.stat1Label')}</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/70 border border-indigo-800/60 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Icon name="shield-check" size={22} />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block">4</span>
                <span className="text-xs font-semibold text-slate-400 block">{t('hero.stat2Label')}</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/70 border border-indigo-800/60 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Icon name="check-circle" size={22} />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block">99.8%</span>
                <span className="text-xs font-semibold text-slate-400 block">{t('hero.stat3Label')}</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/70 border border-indigo-800/60 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Icon name="target" size={22} />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block">100%</span>
                <span className="text-xs font-semibold text-slate-400 block">{t('hero.stat4Label')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Campus Activity Pulse Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 rounded-2xl bg-[#090d1c]/80 border border-slate-800/70 backdrop-blur-md text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-bold font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {isRTL ? 'نبض مباشر' : 'LIVE PULSE'}
            </span>
            <span className="text-slate-300 font-medium">
              {isRTL
                ? 'قاعة B2 (CS304): تم تأكيد جلسة الحضور المشفرة بالباركود المتجدد · 0 حالات انتحال أو تزوير'
                : 'Hall B2 (CS304): Cryptographic dynamic attendance session confirmed · 0 proxy discrepancies'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px] font-mono">
            <span>{isRTL ? 'الاستجابة: ' : 'Latency: '}<strong className="text-cyan-400">28ms</strong></span>
            <span>{isRTL ? 'الاستقرار: ' : 'Uptime: '}<strong className="text-emerald-400">99.99%</strong></span>
            <span>{isRTL ? 'التشفير: ' : 'Enc: '}<strong className="text-slate-300">AES-256</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
