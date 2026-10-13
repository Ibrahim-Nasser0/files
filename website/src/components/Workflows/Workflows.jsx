import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './Workflows.css';

export default function Workflows() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [activeWf, setActiveWf] = useState(0);
  const items = t('workflows.items');

  if (!Array.isArray(items)) return null;

  const wfMeta = [
    { icon: 'book', color: '#6366f1' },
    { icon: 'qr', color: '#10b981' },
    { icon: 'alert', color: '#ef4444' },
    { icon: 'compass', color: '#f59e0b' },
    { icon: 'calendar', color: '#8b5cf6' },
  ];

  return (
    <section className="section workflows" id="workflows" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="git-network" size={14} color="#6366f1" />
            <span>Operational Architecture</span>
          </span>
          <h2 className="section-title">{t('workflows.sectionTitle')}</h2>
          <p className="section-subtitle">{t('workflows.sectionSubtitle')}</p>
        </div>

        {/* Workflow Tab Selector */}
        <div className={`wf-selector ${isVisible ? 'visible' : ''}`}>
          {items.map((item, i) => {
            const meta = wfMeta[i] || wfMeta[0];
            return (
              <button
                key={i}
                className={`wf-btn ${activeWf === i ? 'active' : ''}`}
                onClick={() => setActiveWf(i)}
                style={{ '--wf-color': meta.color }}
              >
                <Icon name={meta.icon} size={16} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Workflow Steps Horizontal Pipeline */}
        <div className={`wf-display ${isVisible ? 'visible' : ''}`}>
          {items.map((item, wfi) => {
            const meta = wfMeta[wfi] || wfMeta[0];
            return (
              <div key={wfi} className={`wf-steps ${activeWf === wfi ? 'active' : ''}`}>
                {Array.isArray(item.steps) &&
                  item.steps.map((step, si) => (
                    <div key={si} className="wf-step-node" style={{ animationDelay: `${si * 0.1}s` }}>
                      <div className="wf-node-top">
                        <span className="wf-step-number" style={{ background: meta.color }}>
                          {si + 1}
                        </span>
                        <span className="wf-phase-tag">STEP 0{si + 1}</span>
                      </div>
                      <div className="wf-step-box">
                        <p className="wf-step-text">{step}</p>
                      </div>
                      {si < item.steps.length - 1 && (
                        <div className="wf-arrow-connector">➔</div>
                      )}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
