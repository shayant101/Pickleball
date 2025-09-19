import { useState } from 'react';
import { Calendar, Users, DollarSign, BarChart3, Settings, MessageSquare, BookOpen, Home, ClipboardCheck, Music } from 'lucide-react';
import { NavigationItem } from '@/types';

export const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'progress', label: 'Progress', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Music },
  { id: 'payments', label: 'Payments', icon: DollarSign },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigateTo = (section: string) => {
    setActiveSection(section);
    closeSidebar();
  };

  return {
    activeSection,
    sidebarOpen,
    navigationItems,
    setActiveSection,
    setSidebarOpen,
    closeSidebar,
    openSidebar,
    toggleSidebar,
    navigateTo
  };
};