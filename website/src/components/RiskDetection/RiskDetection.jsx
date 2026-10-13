import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './RiskDetection.css';

export default function RiskDetection() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);

  // Interactive Simulator State
  const [attendanceRate, setAttendanceRate] = useState(77);
  const [missedTasks, setMissedTasks] = useState(1);
  const [gpaScore, setGpaScore] = useState(2.8);

  const rules = [
    {
      condition: t('risk.rules.0.condition'),
      status: t('risk.rules.0.status'),
      level: 'safe',
      icon: 'check-circle',
      color: '#10b981',
      badge: 'SAFE',
    },
    {
      condition: t('risk.rules.1.condition'),
      status: t('risk.rules.1.status'),
      level: 'attention',
      icon: 'zap',
      color: '#f59e0b',
      badge: 'ATTENTION',
    },
    {
      condition: t('risk.rules.2.condition'),
      status: t('risk.rules.2.status'),
      level: 'risk',
      icon: 'alert',
      color: '#f97316',
      badge: 'WARNING',
    },
    {
      condition: t('risk.rules.3.condition'),
      status: t('risk.rules.3.status'),
      level: 'critical',
      icon: 'alert',
      color: '#ef4444',
      badge: 'EXCLUSION',
    },
    {
      condition: t('risk.rules.4.condition'),
      status: t('risk.rules.4.status'),
      level: 'risk',
      icon: 'calendar',
      color: '#f97316',
      badge: 'DEFICIT',
    },
    {
      condition: t('risk.rules.5.condition'),
      status: t('risk.rules.5.status'),
      level: 'critical',
      icon: 'chart',
      color: '#ef4444',
      badge: 'PROBATION',
    },
  ];

  // Calculate dynamic simulator status
  const calculateSimStatus = () => {
    if (attendanceRate <= 75 || gpaScore < 2.0) {
      return {
        level: 'critical',
        label: isRTL ? 'حرمان أكاديمي وفق اللائحة' : 'Course Exclusion Triggered',
        color: '#ef4444',
        advice: isRTL
          ? 'تم تجاوز حد الحرمان الرسمي (75%). سيتم رفع كشف الحرمان تلقائياً إلى إدارة الكلية ما لم يُقدَّم عذر رسمي.'
          : 'Attendance has breached the 75% college exclusion cutoff. Course registration flagged for forfeiture.',
      };
    }
    if (attendanceRate <= 80 || missedTasks >= 2) {
      return {
        level: 'risk',
        label: isRTL ? 'إنذار أول (منطقة الخطر 75-80%)' : 'Official Warning Zone (75-80%)',
        color: '#f97316',
        advice: isRTL
          ? 'غياب محاضرة واحدة إضافية سيترتب عليه تجاوز حد الحرمان الأكاديمي فورياً.'
          : 'A single further unexcused absence breaches the institutional exclusion cutoff.',
      };
    }
    if (attendanceRate < 85 || missedTasks === 1) {
      return {
        level: 'attention',
        label: isRTL ? 'تنبيه مبكر (يحتاج متابعة)' : 'Early Advisory (Caution)',
        color: '#f59e0b',
        advice: isRTL
          ? 'سجل الحضور قريب من النطاق الأصفر. يُرجى الحضور المنتظم لتجنب صدور إنذار رسمي.'
          : 'Attendance records nearing yellow threshold. Consistent attendance recommended.',
      };
    }
    return {
      level: 'safe',
      label: isRTL ? 'وضع أكاديمي آمن ومستقر' : 'Good Standing (Safe > 85%)',
      color: '#10b981',
      advice: isRTL
        ? 'سجل الحضور والأعمال الفصلية مستوفٍ لمعايير التفوق واللوائح المعتمدة.'
        : 'All records compliant with college regulations and honor standing thresholds.',
    };
  };

  const sim = calculateSimStatus();

  return (
    <section className="risk-detection" id="risk" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="alert" size={14} color="#f59e0b" />
            <span>Academic Safety Net</span>
          </span>
          <h2 className="section-title">{t('risk.sectionTitle')}</h2>
          <p className="section-subtitle">{t('risk.sectionSubtitle')}</p>
        </div>

        {/* Live Simulator & Warning Showcase */}
        <div className={`risk-interactive-showcase ${isVisible ? 'visible' : ''}`}>
          <div className="sim-panel">
            <div className="sim-header">
              <div className="sim-tag-box">
                <Icon name="terminal" size={16} color="#6366f1" />
                <span className="sim-tag">{isRTL ? 'محاكي لائحة الحرمان التفاعلي' : 'Bylaw Policy Simulator'}</span>
              </div>
              <span className="sim-status-pill" style={{ backgroundColor: `${sim.color}18`, color: sim.color, borderColor: `${sim.color}44` }}>
                {sim.label}
              </span>
            </div>

            <div className="sim-controls">
              {/* Slider 1: Attendance */}
              <div className="sim-control-group">
                <div className="sim-control-top">
                  <label>{isRTL ? 'نسبة الحضور المسجلة' : 'Recorded Attendance Rate'}</label>
                  <span className="control-value" style={{ color: sim.color }}>{attendanceRate}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={attendanceRate}
                  onChange={(e) => setAttendanceRate(Number(e.target.value))}
                  className="sim-slider"
                />
                <div className="slider-ticks">
                  <span>50%</span>
                  <span className="tick-critical">75% {isRTL ? '(حد الحرمان)' : '(Exclusion)'}</span>
                  <span>85%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Slider 2: Missed Tasks */}
              <div className="sim-control-group">
                <div className="sim-control-top">
                  <label>{isRTL ? 'التكليفات والواجبات المتأخرة' : 'Overdue Lab Deliverables'}</label>
                  <span className="control-value">{missedTasks} {isRTL ? 'مهام' : 'tasks'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={missedTasks}
                  onChange={(e) => setMissedTasks(Number(e.target.value))}
                  className="sim-slider"
                />
              </div>

              {/* Slider 3: Current GPA */}
              <div className="sim-control-group">
                <div className="sim-control-top">
                  <label>{isRTL ? 'المعدل التراكمي (GPA)' : 'Cumulative GPA'}</label>
                  <span className="control-value">{gpaScore.toFixed(1)} / 4.0</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={gpaScore}
                  onChange={(e) => setGpaScore(Number(e.target.value))}
                  className="sim-slider"
                />
              </div>
            </div>

            <div className="sim-result-box" style={{ borderLeftColor: isRTL ? 'transparent' : sim.color, borderRightColor: isRTL ? sim.color : 'transparent' }}>
              <div className="sim-result-title">
                <Icon name="bell" size={13} color={sim.color} />
                <span>{isRTL ? 'الإشعار الصادر تلقائياً للطالب والمرشد:' : 'System Action Triggered:'}</span>
              </div>
              <p className="sim-result-text">{sim.advice}</p>
            </div>
          </div>

          {/* Official Advisory Notice Card */}
          <div className="risk-banner-card">
            <div className="notif-card-header">
              <span className="notif-pulse"></span>
              <span className="notif-title">{t('risk.exampleTitle')}</span>
              <span className="notif-time">{isRTL ? 'الآن' : 'Active Notice'}</span>
            </div>
            <div className="notif-card-body">
              <div className="notif-icon-wrap">
                <Icon name="alert" size={24} color="#f97316" />
              </div>
              <div className="notif-content">
                <strong>{isRTL ? 'عمادة شؤون الطلاب · وحدة الرصد' : 'Office of Academic Standing'}</strong>
                <p>{t('risk.exampleText')}</p>
              </div>
            </div>
            <div className="notif-card-footer">
              <span className="notif-badge">
                <Icon name="check-circle" size={12} color="#10b981" />
                <span>{isRTL ? 'تدقيق آلي باللائحة' : 'Deterministic Bylaw Rule'}</span>
              </span>
              <span className="notif-action">{isRTL ? 'سجل الغياب والتظلمات ➔' : 'Absence Log & Appeals ➔'}</span>
            </div>
          </div>
        </div>

        {/* Risk Rules Matrix */}
        <div className={`risk-rules-grid ${isVisible ? 'visible' : ''}`}>
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className={`rule-card level-${rule.level}`}
              style={{ '--rule-color': rule.color }}
            >
              <div className="rule-top">
                <div className="rule-icon-box">
                  <Icon name={rule.icon} size={18} color={rule.color} />
                </div>
                <span className="rule-badge" style={{ backgroundColor: `${rule.color}18`, color: rule.color }}>
                  {rule.badge}
                </span>
              </div>
              <h4 className="rule-condition">{rule.condition}</h4>
              <p className="rule-status">{rule.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
