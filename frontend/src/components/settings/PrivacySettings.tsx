import React, { useState } from 'react';
import { Save, Shield, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { privacySettings } from '@/data/settingsData';

const PrivacySettings: React.FC = () => {
  const [settings, setSettings] = useState(privacySettings);

  const handleSave = () => {
    console.log('Saving privacy settings:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Profile Visibility
          </CardTitle>
          <CardDescription>Control who can see your profile and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            <Select 
              value={settings.profileVisibility} 
              onValueChange={(value: 'public' | 'private' | 'students-only') => 
                setSettings(prev => ({ ...prev, profileVisibility: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can view</SelectItem>
                <SelectItem value="students-only">Students Only - Only your students</SelectItem>
                <SelectItem value="private">Private - Hidden from search</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              {settings.profileVisibility === 'public' && 'Your profile will be visible to anyone and appear in search results'}
              {settings.profileVisibility === 'students-only' && 'Only your current and past students can view your profile'}
              {settings.profileVisibility === 'private' && 'Your profile is hidden and won\'t appear in searches'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Show contact information</Label>
                <p className="text-sm text-muted-foreground">Display your phone and email on your profile</p>
              </div>
              <Switch
                checked={settings.showContactInfo}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showContactInfo: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Show rates</Label>
                <p className="text-sm text-muted-foreground">Display your lesson rates publicly</p>
              </div>
              <Switch
                checked={settings.showRates}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showRates: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Allow student reviews</Label>
                <p className="text-sm text-muted-foreground">Let students leave reviews on your profile</p>
              </div>
              <Switch
                checked={settings.allowStudentReviews}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowStudentReviews: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Data Management
          </CardTitle>
          <CardDescription>Control how your data is stored and used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dataRetention">Data Retention Period</Label>
            <Select 
              value={settings.dataRetentionMonths.toString()} 
              onValueChange={(value) => setSettings(prev => ({ 
                ...prev, 
                dataRetentionMonths: parseInt(value) 
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
                <SelectItem value="36">36 months</SelectItem>
                <SelectItem value="60">5 years</SelectItem>
                <SelectItem value="120">10 years</SelectItem>
                <SelectItem value="-1">Keep indefinitely</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              How long to keep student data after they stop taking lessons
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Share analytics data</Label>
                <p className="text-sm text-muted-foreground">Help improve the platform by sharing anonymous usage data</p>
              </div>
              <Switch
                checked={settings.shareAnalytics}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, shareAnalytics: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing communications</Label>
                <p className="text-sm text-muted-foreground">Receive tips, updates, and promotional content</p>
              </div>
              <Switch
                checked={settings.marketingConsent}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketingConsent: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Export & Deletion */}
      <Card>
        <CardHeader>
          <CardTitle>Data Rights</CardTitle>
          <CardDescription>Export or delete your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Export Your Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download a copy of all your data including students, lessons, and payments.
              </p>
              <Button variant="outline" className="w-full">
                Request Data Export
              </Button>
            </div>
            <div className="p-4 border rounded-lg border-red-200">
              <h4 className="font-medium mb-2 text-red-700">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete your account and all associated data. This cannot be undone.
              </p>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Information</CardTitle>
          <CardDescription>Learn about how we protect your privacy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <span className="text-sm font-medium">Privacy Policy</span>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <span className="text-sm font-medium">Terms of Service</span>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <span className="text-sm font-medium">Data Processing Agreement</span>
              <Button variant="ghost" size="sm">
                View
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

export default PrivacySettings;