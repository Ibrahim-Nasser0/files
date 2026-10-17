"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Icon } from '@/components/common/Icon';
import { TeamMember } from '@/types';

export default function Team() {
  const { t } = useLanguage();
  const members: TeamMember[] = t('team.members');

  const memberAccents = ['#1e40af', '#059669', '#2563eb', '#d97706'];

  if (!Array.isArray(members)) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-[#060914] border-t border-slate-800/80" id="team">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-semibold backdrop-blur-md shadow-inner mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Engineering & Research Group</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('team.sectionTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {t('team.sectionSubtitle')}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, i) => {
            const accent = memberAccents[i % memberAccents.length];
            return (
              <div
                key={i}
                className="group relative bg-[#0d1326]/90 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)]"
              >
                <div>
                  {/* Clean Avatar Badge */}
                  <div className="w-14 h-14 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 mb-5 shadow-inner group-hover:scale-105 transition-transform">
                    <Icon name={member.icon || 'user'} size={24} color="currentColor" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <span
                    className="text-xs font-bold block mb-3 text-cyan-400"
                  >
                    {member.role}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {Array.isArray(member.tags) &&
                    member.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800"
                      >
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
