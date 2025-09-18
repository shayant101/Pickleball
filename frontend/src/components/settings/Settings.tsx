import React, { useState } from 'react';
import { User, Building, Bell, CreditCard, Shield, Palette, Music, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileSettings from './ProfileSettings';
import BusinessSettings from './BusinessSettings';
import TeachingSettings from './TeachingSettings';
import NotificationSettings from './NotificationSettings';
import PaymentSettings from './PaymentSettings';
import PrivacySettings from './PrivacySettings';
import SystemSettings from './SystemSettings';
import SecuritySettings from './SecuritySettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const settingsTabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Personal information and bio'
    },
    {
      id: 'business',
      label: 'Business',
      icon: Building,
      description: 'Business details and policies'
    },
    {
      id: 'teaching',
      label: 'Teaching',
      icon: Music,
      description: 'Instruments, availability, and preferences'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Email, SMS, and push notifications'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      description: 'Payment methods and billing'
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: Shield,
      description: 'Data privacy and visibility'
    },
    {
      id: 'system',
      label: 'System',
      icon: Palette,
      description: 'Theme, language, and preferences'
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      description: 'Password, 2FA, and login history'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account, business, and platform preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="border-b">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center space-y-1 h-16 lg:h-12 lg:flex-row lg:space-y-0 lg:space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs lg:text-sm">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          <TabsContent value="profile" className="space-y-6">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <BusinessSettings />
          </TabsContent>

          <TabsContent value="teaching" className="space-y-6">
            <TeachingSettings />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <PaymentSettings />
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <PrivacySettings />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemSettings />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecuritySettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;