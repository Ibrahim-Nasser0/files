import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './Overview.css';

export default function Overview() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="section overview" id="overview" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="target" size={14} color="#6366f1" />
            <span>Problem vs. Architecture</span>
          </span>
          <h2 className="section-title">{t('overview.sectionTitle')}</h2>
          <p className="section-subtitle">{t('overview.sectionSubtitle')}</p>
        </div>

        <div className="overview-grid">
          {/* Fragmented State */}
          <div className={`overview-card problem ${isVisible ? 'visible' : ''}`}>
            <div className="overview-card-header">
              <div className="overview-card-icon-box alert-box">
                <Icon name="alert" size={22} color="#ef4444" />
              </div>
              <span className="overview-tag tag-problem">{isRTL ? 'الواقع الحالي' : 'Status Quo'}</span>
            </div>
            <h3 className="overview-card-title">{t('overview.problemTitle')}</h3>
            <p className="overview-card-text">{t('overview.problemText')}</p>

            <div className="overview-visual scatter-visual">
              <div className="scatter-item">
                <Icon name="book" size={14} color="#94a3b8" />
                <span>Isolated Files</span>
              </div>
              <div className="scatter-item">
                <Icon name="bell" size={14} color="#94a3b8" />
                <span>Informal Groups</span>
              </div>
              <div className="scatter-item">
                <Icon name="calendar" size={14} color="#94a3b8" />
                <span>Manual Sheets</span>
              </div>
              <div className="scatter-item">
                <Icon name="chart" size={14} color="#94a3b8" />
                <span>Delayed Grades</span>
              </div>
            </div>
          </div>

          {/* Central Transformation Arrow */}
          <div className="overview-arrow">
            <div className="arrow-pulse-ring">
              <Icon name="arrow-right" size={24} color="#6366f1" />
            </div>
            <span className="arrow-subtext">{isRTL ? 'التحول الرقمي' : 'Unified'}</span>
          </div>

          {/* Unified Solution State */}
          <div className={`overview-card solution ${isVisible ? 'visible' : ''}`}>
            <div className="overview-card-header">
              <div className="overview-card-icon-box success-box">
                <Icon name="check-circle" size={22} color="#10b981" />
              </div>
              <span className="overview-tag tag-solution">{isRTL ? 'منظومة StudySync' : 'StudySync Platform'}</span>
            </div>
            <h3 className="overview-card-title">{t('overview.solutionTitle')}</h3>
            <p className="overview-card-text">{t('overview.solutionText')}</p>

            <div className="unified-visual-network">
              <div className="unified-hub">
                <Icon name="book" size={18} color="#ffffff" />
                <span>StudySync Core</span>
              </div>
              <div className="unified-nodes-row">
                <span className="node-chip">
                  <Icon name="qr" size={12} color="#10b981" /> Dynamic QR
                </span>
                <span className="node-chip">
                  <Icon name="alert" size={12} color="#f59e0b" /> Risk Engine
                </span>
                <span className="node-chip">
                  <Icon name="cpu" size={12} color="#6366f1" /> Career ML
                </span>
                <span className="node-chip">
                  <Icon name="shield" size={12} color="#38bdf8" /> RBAC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
