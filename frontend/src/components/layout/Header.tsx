import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  activeSection: string;
  filteredStudentsCount?: number;
  upcomingSessionsCount: number;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  filteredStudentsCount,
  upcomingSessionsCount,
  onMenuClick
}) => {
  const { user, logout } = useAuth();
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
            {upcomingSessionsCount} sessions today
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0) || 'C'}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;