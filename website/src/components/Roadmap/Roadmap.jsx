import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './Roadmap.css';

export default function Roadmap() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      id: 0,
      phaseNum: 'Phase 01',
      title: t('roadmap.phases.0.title'),
      icon: 'check',
      status: isRTL ? 'مكتمل / الإصدار الأساسي' : 'Production Core / Released',
      color: '#10b981',
      items: [
        t('roadmap.phases.0.items.0'),
        t('roadmap.phases.0.items.1'),
        t('roadmap.phases.0.items.2'),
        t('roadmap.phases.0.items.3'),
        t('roadmap.phases.0.items.4'),
        t('roadmap.phases.0.items.5'),
        t('roadmap.phases.0.items.6'),
      ],
    },
    {
      id: 1,
      phaseNum: 'Phase 02',
      title: t('roadmap.phases.1.title'),
      icon: 'zap',
      status: isRTL ? 'قيد التطوير الفعلي' : 'Active Engineering Sprint',
      color: '#6366f1',
      items: [
        t('roadmap.phases.1.items.0'),
        t('roadmap.phases.1.items.1'),
        t('roadmap.phases.1.items.2'),
        t('roadmap.phases.1.items.3'),
        t('roadmap.phases.1.items.4'),
        t('roadmap.phases.1.items.5'),
      ],
    },
    {
      id: 2,
      phaseNum: 'Phase 03',
      title: t('roadmap.phases.2.title'),
      icon: 'layers',
      status: isRTL ? 'مرحلة التصميم والتخطيط' : 'Design & Planning Review',
      color: '#f59e0b',
      items: [
        t('roadmap.phases.2.items.0'),
        t('roadmap.phases.2.items.1'),
        t('roadmap.phases.2.items.2'),
        t('roadmap.phases.2.items.3'),
        t('roadmap.phases.2.items.4'),
      ],
    },
    {
      id: 3,
      phaseNum: 'Phase 04',
      title: t('roadmap.phases.3.title'),
      icon: 'compass',
      status: isRTL ? 'الرؤية المستقبلية' : 'Future Vision Research',
      color: '#38bdf8',
      items: [
        t('roadmap.phases.3.items.0'),
        t('roadmap.phases.3.items.1'),
        t('roadmap.phases.3.items.2'),
        t('roadmap.phases.3.items.3'),
        t('roadmap.phases.3.items.4'),
      ],
    },
  ];

  return (
    <section className="roadmap" id="roadmap" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="compass" size={14} color="#6366f1" />
            <span>Strategic Milestones</span>
          </span>
          <h2 className="section-title">{t('roadmap.sectionTitle')}</h2>
          <p className="section-subtitle">{t('roadmap.sectionSubtitle')}</p>
        </div>

        {/* Phase Selector Tabs */}
        <div className={`roadmap-tabs ${isVisible ? 'visible' : ''}`}>
          {phases.map((phase) => (
            <button
              key={phase.id}
              className={`roadmap-tab-btn ${activePhase === phase.id ? 'active' : ''}`}
              onClick={() => setActivePhase(phase.id)}
              style={{ '--phase-color': phase.color }}
            >
              <span className="tab-icon-box">
                <Icon name={phase.icon} size={18} />
              </span>
              <span className="tab-text">
                <span className="tab-num">{phase.phaseNum}</span>
                <span className="tab-title">{phase.title}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Active Phase Detailed View */}
        <div className={`roadmap-active-card ${isVisible ? 'visible' : ''}`} style={{ '--phase-color': phases[activePhase].color }}>
          <div className="active-phase-header">
            <div className="phase-badge-group">
              <span className="phase-indicator" style={{ backgroundColor: phases[activePhase].color }}></span>
              <span className="phase-id-label">{phases[activePhase].phaseNum}</span>
              <span className="phase-status-pill">{phases[activePhase].status}</span>
            </div>
            <h3 className="active-phase-title">
              {phases[activePhase].title}
            </h3>
          </div>

          <div className="phase-deliverables-grid">
            {phases[activePhase].items.map((item, idx) => (
              <div key={idx} className="deliverable-item">
                <span className="deliverable-check-icon" style={{ color: phases[activePhase].color }}>
                  <Icon name="check" size={13} />
                </span>
                <span className="deliverable-text">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Timeline Track */}
        <div className={`timeline-track-container ${isVisible ? 'visible' : ''}`}>
          <div className="timeline-track">
            {phases.map((p, index) => (
              <div
                key={p.id}
                className={`timeline-node ${activePhase === index ? 'active' : ''}`}
                onClick={() => setActivePhase(index)}
              >
                <div className="node-marker" style={{ borderColor: p.color }}>
                  <div className="node-inner" style={{ backgroundColor: p.color }}></div>
                </div>
                <div className="node-meta">
                  <span className="node-phase">{p.phaseNum}</span>
                  <span className="node-title">{p.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
