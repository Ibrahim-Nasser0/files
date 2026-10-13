import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Icon } from '../common/Icons';
import './Header.css';

export default function Header() {
  const { t, toggleLang, lang, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
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

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#" className="logo">
          <span className="logo-icon-wrapper">
            <Icon name="book" size={20} color="#6366f1" />
          </span>
          <div className="logo-brand-block">
            <span className="logo-text">StudySync</span>
            <span className="logo-edition">CAMPUS OS</span>
          </div>
        </a>

        <nav className={`nav ${mobileOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link" onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="system-live-pill no-print">
            <span className="live-dot"></span>
            <span className="live-text">v2.6 LTS</span>
          </div>

          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle Language" title="Switch Language">
            <Icon name="globe" size={15} />
            <span className="lang-code">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button className="btn btn-primary btn-sm no-print export-btn" onClick={() => window.print()}>
            <Icon name="download" size={15} />
            <span>{t('nav.downloadPdf')}</span>
          </button>

          <button
            className={`hamburger ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
