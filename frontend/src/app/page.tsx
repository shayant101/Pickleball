'use client'

import React, { Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import { useNavigation } from '@/hooks/useNavigation';
import { useStudents } from '@/hooks/useStudents';
import { stats, upcomingSessions, recentActivity } from '@/data/mockData';

// Dynamic imports for better performance - only load when needed
const Students = React.lazy(() => import('@/components/students/Students'));
const CalendarView = React.lazy(() => import('@/components/calendar/CalendarView'));
const Progress = React.lazy(() => import('@/components/progress/Progress'));
const Payments = React.lazy(() => import('@/components/payments/Payments'));
const Messages = React.lazy(() => import('@/components/messages/Messages'));
const Analytics = React.lazy(() => import('@/components/analytics/Analytics'));
const Settings = React.lazy(() => import('@/components/settings/Settings'));
const AttendanceTracker = React.lazy(() => import('@/components/attendance/AttendanceTracker'));
const Placeholder = React.lazy(() => import('@/components/common/Placeholder'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default function HomePage() {
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
        // Dashboard loads immediately (no lazy loading for landing page)
        return (
          <Dashboard
            stats={stats}
            upcomingSessions={upcomingSessions}
            recentActivity={recentActivity}
            onNavigate={navigateTo}
            onAddStudent={openAddStudent}
          />
        );
      case 'students':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Students />
          </Suspense>
        );
      case 'calendar':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <CalendarView />
          </Suspense>
        );
      case 'attendance':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AttendanceTracker />
          </Suspense>
        );
      case 'progress':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Progress />
          </Suspense>
        );
      case 'practice':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Placeholder section="Practice Tracking" />
          </Suspense>
        );
      case 'payments':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Payments />
          </Suspense>
        );
      case 'messages':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Messages />
          </Suspense>
        );
      case 'analytics':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Analytics />
          </Suspense>
        );
      case 'settings':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Settings />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <Placeholder section={activeSection} />
          </Suspense>
        );
    }
  };

  return (
    <Layout
      filteredStudentsCount={filteredStudents.length}
      upcomingSessionsCount={stats.upcomingSessions}
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
}