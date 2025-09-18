import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { NavigationItem } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  filteredStudentsCount?: number;
  upcomingLessonsCount: number;
  activeSection: string;
  sidebarOpen: boolean;
  navigationItems: NavigationItem[];
  onNavigate: (section: string) => void;
  onOpenSidebar: () => void;
  onCloseSidebar: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  filteredStudentsCount, 
  upcomingLessonsCount,
  activeSection,
  sidebarOpen,
  navigationItems,
  onNavigate,
  onOpenSidebar,
  onCloseSidebar
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        activeSection={activeSection}
        navigationItems={navigationItems}
        onNavigate={onNavigate}
        onClose={onCloseSidebar}
        isMobile={true}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        isOpen={true}
        activeSection={activeSection}
        navigationItems={navigationItems}
        onNavigate={onNavigate}
        onClose={onCloseSidebar}
        isMobile={false}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        <Header
          activeSection={activeSection}
          filteredStudentsCount={filteredStudentsCount}
          upcomingLessonsCount={upcomingLessonsCount}
          onMenuClick={onOpenSidebar}
        />
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;