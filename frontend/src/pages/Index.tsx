import React from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import Students from '@/components/students/Students';
import CalendarView from '@/components/calendar/CalendarView';
import Progress from '@/components/progress/Progress';
import Placeholder from '@/components/common/Placeholder';
import { useNavigation } from '@/hooks/useNavigation';
import { useStudents } from '@/hooks/useStudents';
import { stats, upcomingLessons, recentActivity } from '@/data/mockData';

const Index: React.FC = () => {
  const { 
    activeSection, 
    sidebarOpen, 
    navigationItems, 
    navigateTo, 
    openSidebar, 
    closeSidebar 
  } = useNavigation();
  
  const { filteredStudents, openAddStudent } = useStudents();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard
            stats={stats}
            upcomingLessons={upcomingLessons}
            recentActivity={recentActivity}
            onNavigate={navigateTo}
            onAddStudent={openAddStudent}
          />
        );
      case 'students':
        return <Students />;
      case 'calendar':
        return <CalendarView />;
      case 'progress':
        return <Progress />;
      default:
        return <Placeholder section={activeSection} />;
    }
  };

  return (
    <Layout
      filteredStudentsCount={filteredStudents.length}
      upcomingLessonsCount={stats.upcomingLessons}
      activeSection={activeSection}
      sidebarOpen={sidebarOpen}
      navigationItems={navigationItems}
      onNavigate={navigateTo}
      onOpenSidebar={openSidebar}
      onCloseSidebar={closeSidebar}
    >
      {renderContent()}
    </Layout>
  );
};

export default Index;