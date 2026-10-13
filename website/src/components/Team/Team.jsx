import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './Team.css';

export default function Team() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);
  const members = t('team.members');

  const memberColors = ['#6366f1', '#10b981', '#38bdf8', '#f59e0b'];

  if (!Array.isArray(members)) return null;

  return (
    <section className="team" id="team" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="user" size={14} color="#6366f1" />
            <span>Engineering Group</span>
          </span>
          <h2 className="section-title">{t('team.sectionTitle')}</h2>
          <p className="section-subtitle">{t('team.sectionSubtitle')}</p>
        </div>

        <div className={`team-grid ${isVisible ? 'visible' : ''}`}>
          {members.map((member, i) => {
            const color = memberColors[i % memberColors.length];
            return (
              <div
                key={i}
                className="team-card"
                style={{ '--member-color': color, animationDelay: `${i * 0.1}s` }}
              >
                <div className="team-avatar-wrapper">
                  <div className="team-avatar-glow" style={{ background: color }}></div>
                  <div className="team-avatar">
                    <Icon name={member.icon || 'user'} size={28} color={color} />
                  </div>
                </div>

                <h3 className="team-name">{member.name}</h3>
                <span className="team-role" style={{ color: color }}>{member.role}</span>
                <p className="team-bio">{member.bio}</p>

                <div className="team-tags">
                  {Array.isArray(member.tags) &&
                    member.tags.map((tag, idx) => (
                      <span key={idx} className="team-tag">
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
