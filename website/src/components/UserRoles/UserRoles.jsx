import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './UserRoles.css';

export default function UserRoles() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [activeTab, setActiveTab] = useState(0);
  const roles = t('users.roles');

  if (!Array.isArray(roles)) return null;

  return (
    <section className="section user-roles" id="users" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="shield" size={14} color="#6366f1" />
            <span>Multi-Role Governance</span>
          </span>
          <h2 className="section-title">{t('users.sectionTitle')}</h2>
          <p className="section-subtitle">{t('users.sectionSubtitle')}</p>
        </div>

        {/* Roles Tab Selector */}
        <div className={`roles-tabs ${isVisible ? 'visible' : ''}`}>
          {roles.map((role, i) => (
            <button
              key={i}
              className={`role-tab ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <span className="role-tab-icon-wrapper">
                <Icon name={role.icon} size={18} />
              </span>
              <span className="role-tab-label">{role.title}</span>
            </button>
          ))}
        </div>

        {/* Role Active Panel */}
        <div className={`role-content ${isVisible ? 'visible' : ''}`}>
          {roles.map((role, i) => (
            <div key={i} className={`role-panel ${activeTab === i ? 'active' : ''}`}>
              <div className="role-header-banner">
                <div className="role-icon-box">
                  <Icon name={role.icon} size={32} color="#6366f1" />
                </div>
                <div className="role-meta-info">
                  <span className="role-badge-tag">{role.badge}</span>
                  <h3 className="role-name">{role.title}</h3>
                  <p className="role-desc">{role.desc}</p>
                </div>
              </div>

              <div className="capabilities-wrapper">
                <div className="capabilities-label">
                  {isRTL ? 'الصلاحيات والعمليات المصرح بها:' : 'Authorized Operational Capabilities:'}
                </div>
                <div className="role-capabilities-grid">
                  {Array.isArray(role.capabilities) &&
                    role.capabilities.map((cap, j) => (
                      <div key={j} className="capability-item">
                        <span className="capability-check-icon">
                          <Icon name="check" size={13} color="#10b981" />
                        </span>
                        <span className="capability-text">{cap}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
