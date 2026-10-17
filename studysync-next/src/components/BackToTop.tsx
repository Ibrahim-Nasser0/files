"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to Top"
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-md flex items-center justify-center transition-all hover:-translate-y-1 active:scale-95 no-print"
    >
      <ArrowUp size={16} strokeWidth={2.2} />
    </button>
  );
}
