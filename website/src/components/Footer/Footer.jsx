import { useLanguage } from '../../context/LanguageContext';
import { Icon } from '../common/Icons';
import './Footer.css';

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const links = [
    { href: '#overview', label: t('nav.overview') },
    { href: '#features', label: t('nav.features') },
    { href: '#users', label: t('nav.users') },
    { href: '#workflows', label: t('nav.workflows') },
    { href: '#ai', label: t('nav.ai') },
    { href: '#architecture', label: t('nav.architecture') },
    { href: '#risk', label: t('nav.risk') },
    { href: '#roadmap', label: t('nav.roadmap') },
    { href: '#team', label: t('nav.team') },
  ];

  return (
    <footer className="footer no-print">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo">
            <span className="logo-icon-wrapper">
              <Icon name="book" size={18} color="#6366f1" />
            </span>
            <div className="logo-brand-block">
              <span className="logo-text">StudySync</span>
              <span className="logo-edition">CAMPUS OS</span>
            </div>
          </a>
          <p className="footer-tagline">{t('footer.tagline')}</p>
          <div className="footer-pills">
            <span className="pill">
              <Icon name="shield" size={12} color="#10b981" />
              <span>Higher Ed Standard</span>
            </span>
            <span className="pill">
              <Icon name="cpu" size={12} color="#6366f1" />
              <span>Curriculum ML</span>
            </span>
            <span className="pill">
              <Icon name="globe" size={12} color="#38bdf8" />
              <span>Native Bilingual</span>
            </span>
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">{t('footer.quickLinks')}</h4>
          <div className="footer-nav-grid">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-actions-col">
          <h4 className="footer-heading">{t('footer.contact')}</h4>
          <p className="footer-contact-text">
            {isRTL
              ? 'بنية برمجية معتمدة لإدارة الحرم الجامعي، تسجيل الحضور المشفر، وحماية المسار الأكاديمي للطلاب.'
              : 'Institutional university software architecture for encrypted attendance, records integrity, and curriculum modeling.'}
          </p>
          <button className="btn btn-primary btn-sm footer-btn" onClick={() => window.print()}>
            <Icon name="download" size={15} />
            <span>{t('nav.downloadPdf')}</span>
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">{t('footer.rights')}</p>
          <div className="footer-status-indicator">
            <span className="status-dot"></span>
            <span>{t('footer.systemStatus')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
