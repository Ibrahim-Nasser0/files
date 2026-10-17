"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NavigationContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  toggleMobileOpen: () => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isCollapsed: false,
  setIsCollapsed: () => {},
  toggleCollapsed: () => {},
  isMobileOpen: false,
  setIsMobileOpen: () => {},
  toggleMobileOpen: () => {},
  activeSection: 'hero',
  setActiveSection: () => {},
  isCommandOpen: false,
  setIsCommandOpen: () => {},
  toggleCommandPalette: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  // Restore collapsed preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('studysync-sidebar-collapsed');
      if (saved !== null) {
        setIsCollapsed(saved === 'true');
      }
    } catch {
      // Ignore
    }
  }, []);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('studysync-sidebar-collapsed', String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const toggleMobileOpen = () => setIsMobileOpen((prev) => !prev);
  const toggleCommandPalette = () => setIsCommandOpen((prev) => !prev);

  // Keyboard shortcuts (Cmd+K / Ctrl+K for command palette, [ for sidebar toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isCommandOpen) {
        setIsCommandOpen(false);
      }
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, isMobileOpen]);

  // Section ScrollSpy Observer
  useEffect(() => {
    const sectionIds = [
      'hero',
      'overview',
      'features',
      'users',
      'workflows',
      'ai',
      'architecture',
      'risk',
      'roadmap',
      'team',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        toggleCollapsed,
        isMobileOpen,
        setIsMobileOpen,
        toggleMobileOpen,
        activeSection,
        setActiveSection,
        isCommandOpen,
        setIsCommandOpen,
        toggleCommandPalette,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
