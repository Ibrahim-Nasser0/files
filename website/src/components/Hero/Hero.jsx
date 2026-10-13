import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './Hero.css';

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [qrToken, setQrToken] = useState('SEC-8419-X');
  const [countdown, setCountdown] = useState(12);
  const [verified, setVerified] = useState(false);

  // Rotate QR token every 15s to simulate real cryptographic dynamic QR
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

  const handleSimulateScan = () => {
    setVerified(true);
    setTimeout(() => setVerified(false), 3500);
  };

  const stats = [
    { value: t('hero.stat1'), label: t('hero.stat1Label'), icon: 'layers' },
    { value: t('hero.stat2'), label: t('hero.stat2Label'), icon: 'shield' },
    { value: t('hero.stat3'), label: t('hero.stat3Label'), icon: 'check-circle' },
    { value: t('hero.stat4'), label: t('hero.stat4Label'), icon: 'target' },
  ];

  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Subtle Refined Background */}
      <div className="hero-bg">
        <div className="hero-ambient hero-ambient-primary"></div>
        <div className="hero-ambient hero-ambient-emerald"></div>
        <div className="hero-grid-pattern"></div>
      </div>

      <div className="container hero-content">
        <div className={`hero-text ${isVisible ? 'visible' : ''}`}>
          <div className="hero-badge">
            <span className="badge-indicator"></span>
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>

          <div className="hero-buttons">
            <a href="#features" className="btn btn-primary">
              <Icon name="compass" size={17} />
              <span>{t('hero.cta1')}</span>
            </a>
            <button className="btn btn-secondary no-print" onClick={() => window.print()}>
              <Icon name="download" size={17} />
              <span>{t('hero.cta2')}</span>
            </button>
          </div>
        </div>

        {/* High-Fidelity Realistic Campus Portal Mockup */}
        <div className={`hero-visual ${isVisible ? 'visible' : ''}`}>
          <div className="portal-mockup-frame">
            {/* Window Header */}
            <div className="mockup-window-bar">
              <div className="window-dots">
                <span className="window-dot dot-close"></span>
                <span className="window-dot dot-minimize"></span>
                <span className="window-dot dot-maximize"></span>
              </div>
              <div className="mockup-window-title">
                <Icon name="book" size={13} color="#94a3b8" />
                <span>StudySync Campus Portal · Spring Semester 2026</span>
              </div>
              <div className="mockup-window-search">
                <Icon name="search" size={12} color="#64748b" />
                <span>Ctrl + K</span>
              </div>
            </div>

            {/* Portal App Body */}
            <div className="mockup-body">
              {/* Student Header Bar */}
              <div className="student-profile-strip">
                <div className="student-avatar-box">
                  <span className="avatar-initials">OK</span>
                  <div className="student-info-meta">
                    <span className="student-name">{isRTL ? 'عمر خالد المنشاوي' : 'Omar K. Al-Manshawi'}</span>
                    <span className="student-sub">{isRTL ? 'هندسة حاسبات · السنة الرابعة' : 'Computer Engineering · Level 4'}</span>
                  </div>
                </div>

                <div className="student-badges-cluster">
                  <div className="academic-metric-pill">
                    <span className="metric-tag">GPA</span>
                    <span className="metric-val">3.84 / 4.0</span>
                  </div>
                  <div className="academic-metric-pill">
                    <span className="metric-tag">{isRTL ? 'الساعات' : 'Credits'}</span>
                    <span className="metric-val">98 / 134 Cr</span>
                  </div>
                </div>
              </div>

              {/* Main Interactive Grid */}
              <div className="portal-modules-grid">
                {/* Active Lecture Box */}
                <div className="portal-card active-course-card">
                  <div className="card-top-label">
                    <span className="status-live-badge">{isRTL ? 'المحاضرة الحالية' : 'Live Lecture'}</span>
                    <span className="course-code-tag">CS304</span>
                  </div>
                  <h4 className="course-name">{isRTL ? 'نظم الحوسبة الموزعة والسحابية' : 'Distributed Cloud Systems'}</h4>
                  <div className="course-hall-info">
                    <Icon name="calendar" size={14} color="#94a3b8" />
                    <span>{isRTL ? 'مدرج ب2 · 10:30 ص - 12:00 م' : 'Hall B2 · 10:30 AM - 12:00 PM'}</span>
                  </div>

                  <div className="attendance-safety-bar">
                    <div className="safety-bar-header">
                      <span>{isRTL ? 'نسبة الحضور الحالية:' : 'Course Attendance:'}</span>
                      <strong className="text-safe">94% ({isRTL ? 'آمن > 75%' : 'Safe > 75%'})</strong>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Rotating Dynamic QR Simulation */}
                <div className="portal-card qr-checkin-card">
                  <div className="card-top-label">
                    <span className="qr-security-badge">
                      <Icon name="shield" size={13} color="#10b981" />
                      <span>Dynamic QR</span>
                    </span>
                    <span className="token-timer-pill">
                      <Icon name="clock" size={12} color="#f59e0b" />
                      <span>{countdown}s</span>
                    </span>
                  </div>

                  <div className="qr-center-box">
                    <div className="qr-graphic-frame">
                      <Icon name="qr" size={72} color="#6366f1" />
                    </div>
                    <div className="token-code-display">{qrToken}</div>
                  </div>

                  <button
                    className={`btn-scan-sim ${verified ? 'verified' : ''}`}
                    onClick={handleSimulateScan}
                  >
                    {verified ? (
                      <>
                        <Icon name="check-circle" size={16} color="#10b981" />
                        <span>{isRTL ? 'تم تأكيد الحضور بنجاح' : 'Attendance Verified!'}</span>
                      </>
                    ) : (
                      <>
                        <Icon name="zap" size={15} />
                        <span>{isRTL ? 'محاكاة مسح الكود' : 'Simulate QR Check-in'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Copilot Bottom Banner */}
              <div className="portal-copilot-banner">
                <div className="copilot-icon">
                  <Icon name="sparkles" size={16} color="#6366f1" />
                </div>
                <div className="copilot-text">
                  <strong>{isRTL ? 'مساعد الدراسة الذكي:' : 'Curriculum Copilot:'}</strong>
                  <span>
                    {isRTL
                      ? 'تم تلخيص المحاضرة السابعة بنجاح وتجهيز 12 سؤالاً تدريبياً.'
                      : 'Lecture 7 structured summary generated with 12 practice questions ready.'}
                  </span>
                </div>
                <span className="copilot-action-tag">{isRTL ? 'عرض ➔' : 'View ➔'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`hero-stats ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-icon-wrapper">
                  <Icon name={stat.icon} size={20} color="#6366f1" />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
