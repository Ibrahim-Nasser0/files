import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './Architecture.css';

export default function Architecture() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [activeLayer, setActiveLayer] = useState('frontend');

  const layers = [
    {
      id: 'frontend',
      icon: 'code',
      name: t('architecture.layers.0.title'),
      badge: t('architecture.layers.0.badge'),
      desc: t('architecture.layers.0.desc'),
      tags: ['React 19', 'Vite', 'Bilingual (RTL/LTR)', 'Zero CSS Libs', 'PWA Offline'],
      color: '#6366f1',
    },
    {
      id: 'gateway',
      icon: 'shield',
      name: t('architecture.layers.1.title'),
      badge: t('architecture.layers.1.badge'),
      desc: t('architecture.layers.1.desc'),
      tags: ['RS256 JWT Tokens', 'RBAC Scopes', 'Leaky Bucket Rate Limiter', 'mTLS / SSL', 'Unified Gateway'],
      color: '#10b981',
    },
    {
      id: 'services',
      icon: 'cpu',
      name: t('architecture.layers.2.title'),
      badge: t('architecture.layers.2.badge'),
      desc: t('architecture.layers.2.desc'),
      tags: ['Course Microservice', 'Dynamic QR Validator', 'University Bylaw Engine', 'ML Classifier API', 'Event Bus'],
      color: '#f59e0b',
    },
    {
      id: 'data',
      icon: 'database',
      name: t('architecture.layers.3.title'),
      badge: t('architecture.layers.3.badge'),
      desc: t('architecture.layers.3.desc'),
      tags: ['PostgreSQL Relational DB', 'Redis Cluster Cache', 'AES-256 Storage', 'Automated Replication'],
      color: '#38bdf8',
    },
  ];

  const highlights = [
    { icon: 'zap', title: t('architecture.highlights.0.title'), desc: t('architecture.highlights.0.desc') },
    { icon: 'shield', title: t('architecture.highlights.1.title'), desc: t('architecture.highlights.1.desc') },
    { icon: 'cpu', title: t('architecture.highlights.2.title'), desc: t('architecture.highlights.2.desc') },
    { icon: 'layers', title: t('architecture.highlights.3.title'), desc: t('architecture.highlights.3.desc') },
  ];

  const currentLayer = layers.find((l) => l.id === activeLayer) || layers[0];

  return (
    <section className="architecture" id="architecture" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="layers" size={14} color="#6366f1" />
            <span>Infrastructure Core</span>
          </span>
          <h2 className="section-title">{t('architecture.sectionTitle')}</h2>
          <p className="section-subtitle">{t('architecture.sectionSubtitle')}</p>
        </div>

        {/* Interactive Architecture Stack */}
        <div className={`arch-grid ${isVisible ? 'visible' : ''}`}>
          <div className="arch-stack">
            {layers.map((layer, index) => {
              const isSelected = activeLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  className={`arch-layer-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setActiveLayer(layer.id)}
                  style={{ '--layer-color': layer.color, animationDelay: `${index * 0.1}s` }}
                >
                  <div className="arch-layer-icon">
                    <Icon name={layer.icon} size={24} color={layer.color} />
                  </div>
                  <div className="arch-layer-info">
                    <div className="arch-layer-top">
                      <span className="arch-layer-name">{layer.name}</span>
                      <span className="arch-layer-badge">{layer.badge}</span>
                    </div>
                    <div className="arch-layer-bar">
                      <div className="arch-layer-pulse" style={{ background: layer.color }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Layer Detail Inspector */}
          <div className="arch-details-panel">
            <div className="panel-header">
              <div className="panel-badge" style={{ backgroundColor: `${currentLayer.color}18`, color: currentLayer.color, border: `1px solid ${currentLayer.color}33` }}>
                <Icon name={currentLayer.icon} size={15} color={currentLayer.color} />
                <span>{currentLayer.badge}</span>
              </div>
              <h3 className="panel-title">{currentLayer.name}</h3>
            </div>
            <p className="panel-desc">{currentLayer.desc}</p>

            <div className="panel-tags-group">
              <span className="panel-tags-title">
                {isRTL ? 'التقنيات والموديولات التشغيلية:' : 'Core Technologies & Modules:'}
              </span>
              <div className="panel-tags">
                {currentLayer.tags.map((tag, i) => (
                  <span key={i} className="arch-tag">
                    <span className="tag-dot" style={{ background: currentLayer.color }}></span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel-flow-preview">
              <div className="flow-badge">
                <Icon name="check-circle" size={13} color="#10b981" />
                <span>Deterministic Data Flow</span>
              </div>
              <div className="flow-graphic">
                <span>Client App</span>
                <span className="flow-arrow">➔</span>
                <span>JWT Auth Gateway</span>
                <span className="flow-arrow">➔</span>
                <span>Microservice Pipeline</span>
                <span className="flow-arrow">➔</span>
                <span>Redis / SQL Core</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Highlights */}
        <div className={`arch-highlights-grid ${isVisible ? 'visible' : ''}`}>
          {highlights.map((h, i) => (
            <div key={i} className="arch-highlight-card">
              <div className="highlight-icon-box">
                <Icon name={h.icon} size={22} color="#6366f1" />
              </div>
              <h4 className="highlight-title">{h.title}</h4>
              <p className="highlight-desc">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
