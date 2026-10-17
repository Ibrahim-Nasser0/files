"use client";

import React from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import Features from "@/components/Features";
import UserRoles from "@/components/UserRoles";
import Workflows from "@/components/Workflows";
import AISection from "@/components/AISection";
import Architecture from "@/components/Architecture";
import RiskDetection from "@/components/RiskDetection";
import Roadmap from "@/components/Roadmap";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060914] text-slate-100 transition-colors duration-200">
      {/* Interactive Command Center (Ctrl+K) */}
      <CommandPalette />

      {/* Sticky High-Converting Product Navbar */}
      <Header />

      {/* Full-Width Landing Page Storytelling Canvas */}
      <main className="flex-1">
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

      {/* Institutional Enterprise Footer */}
      <Footer />

      {/* Floating Back To Top */}
      <BackToTop />
    </div>
  );
}
