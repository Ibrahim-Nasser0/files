import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './Features.css';

export default function Features() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);
  const items = t('features.items');

  return (
    <section className="section features" id="features" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="layers" size={14} color="#6366f1" />
            <span>Platform Capabilities</span>
          </span>
          <h2 className="section-title">{t('features.sectionTitle')}</h2>
          <p className="section-subtitle">{t('features.sectionSubtitle')}</p>
        </div>

        <div className="features-grid">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <div
                key={i}
                className={`feature-card ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="feature-top-row">
                  <div className="feature-icon-wrapper">
                    <Icon name={item.icon} size={22} color="#6366f1" />
                  </div>
                  <span className="feature-module-index">MOD #{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
                <div className="feature-bottom-line"></div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
