import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationItem } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  navigationItems: NavigationItem[];
  onNavigate: (section: string) => void;
  onClose: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeSection,
  navigationItems,
  onNavigate,
  onClose,
  isMobile = false
}) => {
  if (isMobile && !isOpen) return null;

  const sidebarClasses = isMobile
    ? "fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50"
    : "hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-white lg:shadow-sm lg:flex lg:flex-col";

  return (
    <>
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">CoachPro</h1>
            <p className="text-sm text-gray-500 mt-1 hidden lg:block">Music Coaching Platform</p>
          </div>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;