import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  activeSection: string;
  filteredStudentsCount?: number;
  upcomingLessonsCount: number;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  filteredStudentsCount,
  upcomingLessonsCount,
  onMenuClick
}) => {
  const getPageDescription = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Welcome back! Here\'s what\'s happening with your pickleball coaching business.';
      case 'students':
        return `Manage your ${filteredStudentsCount || 0} students`;
      default:
        return `Manage your ${activeSection} here`;
    }
  };

  return (
    <div className="bg-white shadow-sm border-b px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold capitalize">
              {activeSection === 'dashboard' ? 'Dashboard' : activeSection}
            </h2>
            <p className="text-sm text-gray-500">
              {getPageDescription()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">
            {upcomingLessonsCount} sessions today
          </Badge>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            C
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;