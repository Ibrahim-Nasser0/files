"use client";

import React from 'react';
import {
  BookOpen,
  QrCode,
  BarChart3,
  Calendar,
  Bell,
  Target,
  Compass,
  Cpu,
  Briefcase,
  Folder,
  AlertTriangle,
  GitBranch,
  User,
  Users,
  GraduationCap,
  Terminal,
  ShieldCheck,
  Database,
  Layers,
  Sparkles,
  Check,
  Download,
  Globe,
  ArrowRight,
  Code2,
  Clock,
  Zap,
  Search,
  CheckCircle2,
  Sun,
  Moon,
  Building2,
  SlidersHorizontal,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  Command,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Activity,
  Smartphone,
  ShieldAlert,
  Server,
  LucideProps,
} from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
}

export function Icon({ name, size = 20, className = '', color = 'currentColor', ...rest }: IconProps) {
  const iconProps = {
    size,
    color,
    className: `inline-block transition-transform duration-200 ${className}`,
    strokeWidth: 1.85,
    ...rest,
  };

  switch (name) {
    case 'book':
      return <BookOpen {...iconProps} />;
    case 'qr':
      return <QrCode {...iconProps} />;
    case 'chart':
      return <BarChart3 {...iconProps} />;
    case 'calendar':
      return <Calendar {...iconProps} />;
    case 'bell':
      return <Bell {...iconProps} />;
    case 'target':
      return <Target {...iconProps} />;
    case 'compass':
      return <Compass {...iconProps} />;
    case 'cpu':
      return <Cpu {...iconProps} />;
    case 'briefcase':
      return <Briefcase {...iconProps} />;
    case 'folder':
      return <Folder {...iconProps} />;
    case 'alert':
      return <AlertTriangle {...iconProps} />;
    case 'git-network':
      return <GitBranch {...iconProps} />;
    case 'user':
      return <User {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    case 'teacher':
    case 'graduation-cap':
      return <GraduationCap {...iconProps} />;
    case 'terminal':
      return <Terminal {...iconProps} />;
    case 'shield':
    case 'shield-check':
      return <ShieldCheck {...iconProps} />;
    case 'shield-alert':
      return <ShieldAlert {...iconProps} />;
    case 'database':
      return <Database {...iconProps} />;
    case 'layers':
      return <Layers {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'download':
      return <Download {...iconProps} />;
    case 'globe':
      return <Globe {...iconProps} />;
    case 'arrow-right':
      return <ArrowRight {...iconProps} />;
    case 'code':
      return <Code2 {...iconProps} />;
    case 'clock':
      return <Clock {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'check-circle':
      return <CheckCircle2 {...iconProps} />;
    case 'sun':
      return <Sun {...iconProps} />;
    case 'moon':
      return <Moon {...iconProps} />;
    case 'building':
      return <Building2 {...iconProps} />;
    case 'sliders':
      return <SlidersHorizontal {...iconProps} />;
    case 'file-text':
      return <FileText {...iconProps} />;
    case 'panel-close':
      return <PanelLeftClose {...iconProps} />;
    case 'panel-open':
      return <PanelLeftOpen {...iconProps} />;
    case 'command':
      return <Command {...iconProps} />;
    case 'chevron-right':
      return <ChevronRight {...iconProps} />;
    case 'chevron-left':
      return <ChevronLeft {...iconProps} />;
    case 'chevron-down':
      return <ChevronDown {...iconProps} />;
    case 'x':
      return <X {...iconProps} />;
    case 'activity':
      return <Activity {...iconProps} />;
    case 'smartphone':
      return <Smartphone {...iconProps} />;
    case 'server':
      return <Server {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
}
