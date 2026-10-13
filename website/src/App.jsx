import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Overview from './components/Overview/Overview';
import Features from './components/Features/Features';
import UserRoles from './components/UserRoles/UserRoles';
import Workflows from './components/Workflows/Workflows';
import AISection from './components/AISection/AISection';
import Architecture from './components/Architecture/Architecture';
import RiskDetection from './components/RiskDetection/RiskDetection';
import Roadmap from './components/Roadmap/Roadmap';
import Team from './components/Team/Team';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Header />

      {/* Main Sections */}
      <main>
        <Hero />
        <Overview />
        <Features />
        <UserRoles />
        <Workflows />
        <AISection />
        <Architecture />
        <RiskDetection />
        <Roadmap />
        <Team />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          className="back-to-top no-print"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to Top"
        >
          ▲
        </button>
      )}
    </div>
  );
}
