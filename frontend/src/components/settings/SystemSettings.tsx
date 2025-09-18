import React, { useState } from 'react';
import { Save, Palette, Globe, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { systemPreferences } from '@/data/settingsData';

const SystemSettings: React.FC = () => {
  const [preferences, setPreferences] = useState(systemPreferences);

  const handleSave = () => {
    console.log('Saving system preferences:', preferences);
  };

  return (
    <div className="space-y-6">
      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of your interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select 
              value={preferences.theme} 
              onValueChange={(value: 'light' | 'dark' | 'system') => 
                setPreferences(prev => ({ ...prev, theme: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System (Auto)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Choose your preferred color scheme
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Compact mode</Label>
                <p className="text-sm text-muted-foreground">Use a more condensed layout to fit more content</p>
              </div>
              <Switch
                checked={preferences.compactMode}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, compactMode: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Show tips</Label>
                <p className="text-sm text-muted-foreground">Display helpful tips and tutorials</p>
              </div>
              <Switch
                checked={preferences.showTips}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, showTips: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-save</Label>
                <p className="text-sm text-muted-foreground">Automatically save changes as you work</p>
              </div>
              <Switch
                checked={preferences.autoSave}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoSave: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Language & Region
          </CardTitle>
          <CardDescription>Set your language and regional preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select 
                value={preferences.language} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={preferences.currency} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                  <SelectItem value="AUD">AUD ($)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date & Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Date & Time
          </CardTitle>
          <CardDescription>Configure how dates and times are displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select 
                value={preferences.dateFormat} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (01/25/2024)</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (25/01/2024)</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2024-01-25)</SelectItem>
                  <SelectItem value="MMM DD, YYYY">MMM DD, YYYY (Jan 25, 2024)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeFormat">Time Format</Label>
              <Select 
                value={preferences.timeFormat} 
                onValueChange={(value: '12h' | '24h') => setPreferences(prev => ({ ...prev, timeFormat: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (2:30 PM)</SelectItem>
                  <SelectItem value="24h">24-hour (14:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="startOfWeek">Start of Week</Label>
            <Select 
              value={preferences.startOfWeek} 
              onValueChange={(value: 'sunday' | 'monday') => setPreferences(prev => ({ ...prev, startOfWeek: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Default Views */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Default Views
          </CardTitle>
          <CardDescription>Set your preferred default views and layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="defaultView">Default Landing Page</Label>
            <Select 
              value={preferences.defaultView} 
              onValueChange={(value) => setPreferences(prev => ({ ...prev, defaultView: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="calendar">Calendar</SelectItem>
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="messages">Messages</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              The page you'll see when you first log in
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data & Storage */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Storage</CardTitle>
          <CardDescription>Manage your local data and storage preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Clear Cache</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Clear stored data to free up space and resolve issues.
              </p>
              <Button variant="outline" className="w-full">
                Clear Cache
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Reset Settings</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Reset all settings to their default values.
              </p>
              <Button variant="outline" className="w-full">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;