import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigation } from '@/hooks/useNavigation';

interface LayoutProps {
  children: React.ReactNode;
  filteredStudentsCount?: number;
  upcomingLessonsCount: number;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  filteredStudentsCount, 
  upcomingLessonsCount 
}) => {
  const {
    activeSection,
    sidebarOpen,
    navigationItems,
    navigateTo,
    openSidebar,
    closeSidebar
  } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        activeSection={activeSection}
        navigationItems={navigationItems}
        onNavigate={navigateTo}
        onClose={closeSidebar}
        isMobile={true}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        isOpen={true}
        activeSection={activeSection}
        navigationItems={navigationItems}
        onNavigate={navigateTo}
        onClose={closeSidebar}
        isMobile={false}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        <Header
          activeSection={activeSection}
          filteredStudentsCount={filteredStudentsCount}
          upcomingLessonsCount={upcomingLessonsCount}
          onMenuClick={openSidebar}
        />
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;