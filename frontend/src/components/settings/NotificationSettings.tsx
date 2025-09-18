import React, { useState } from 'react';
import { Save, Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { notificationSettings } from '@/data/settingsData';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState(notificationSettings);

  const handleSave = () => {
    console.log('Saving notification settings:', settings);
  };

  const updateEmailSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      email: { ...prev.email, [key]: value }
    }));
  };

  const updateSmsSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      sms: { ...prev.sms, [key]: value }
    }));
  };

  const updatePushSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      push: { ...prev.push, [key]: value }
    }));
  };

  const updateTimingSetting = (key: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      timing: { ...prev.timing, [key]: value }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Email Notifications
          </CardTitle>
          <CardDescription>Choose which email notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Lesson Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming lessons</p>
              </div>
              <Switch
                checked={settings.email.lessonReminders}
                onCheckedChange={(checked) => updateEmailSetting('lessonReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Payment Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders for overdue payments</p>
              </div>
              <Switch
                checked={settings.email.paymentReminders}
                onCheckedChange={(checked) => updateEmailSetting('paymentReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>New Bookings</Label>
                <p className="text-sm text-muted-foreground">When students book new lessons</p>
              </div>
              <Switch
                checked={settings.email.newBookings}
                onCheckedChange={(checked) => updateEmailSetting('newBookings', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Cancellations</Label>
                <p className="text-sm text-muted-foreground">When students cancel lessons</p>
              </div>
              <Switch
                checked={settings.email.cancellations}
                onCheckedChange={(checked) => updateEmailSetting('cancellations', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Progress Updates</Label>
                <p className="text-sm text-muted-foreground">Weekly progress summaries</p>
              </div>
              <Switch
                checked={settings.email.progressUpdates}
                onCheckedChange={(checked) => updateEmailSetting('progressUpdates', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Tips, updates, and promotional content</p>
              </div>
              <Switch
                checked={settings.email.marketingEmails}
                onCheckedChange={(checked) => updateEmailSetting('marketingEmails', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            SMS Notifications
          </CardTitle>
          <CardDescription>Text message notifications for urgent updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Lesson Reminders</Label>
                <p className="text-sm text-muted-foreground">Text reminders for upcoming lessons</p>
              </div>
              <Switch
                checked={settings.sms.lessonReminders}
                onCheckedChange={(checked) => updateSmsSetting('lessonReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Payment Reminders</Label>
                <p className="text-sm text-muted-foreground">SMS for overdue payments</p>
              </div>
              <Switch
                checked={settings.sms.paymentReminders}
                onCheckedChange={(checked) => updateSmsSetting('paymentReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>New Bookings</Label>
                <p className="text-sm text-muted-foreground">Instant SMS for new bookings</p>
              </div>
              <Switch
                checked={settings.sms.newBookings}
                onCheckedChange={(checked) => updateSmsSetting('newBookings', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Cancellations</Label>
                <p className="text-sm text-muted-foreground">SMS for lesson cancellations</p>
              </div>
              <Switch
                checked={settings.sms.cancellations}
                onCheckedChange={(checked) => updateSmsSetting('cancellations', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Emergency Only</Label>
                <p className="text-sm text-muted-foreground">Only urgent notifications via SMS</p>
              </div>
              <Switch
                checked={settings.sms.emergencyOnly}
                onCheckedChange={(checked) => updateSmsSetting('emergencyOnly', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Push Notifications
          </CardTitle>
          <CardDescription>Browser and mobile app notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Lesson Reminders</Label>
                <p className="text-sm text-muted-foreground">Push notifications for upcoming lessons</p>
              </div>
              <Switch
                checked={settings.push.lessonReminders}
                onCheckedChange={(checked) => updatePushSetting('lessonReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>New Messages</Label>
                <p className="text-sm text-muted-foreground">When you receive new messages</p>
              </div>
              <Switch
                checked={settings.push.newMessages}
                onCheckedChange={(checked) => updatePushSetting('newMessages', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>New Bookings</Label>
                <p className="text-sm text-muted-foreground">Instant notifications for bookings</p>
              </div>
              <Switch
                checked={settings.push.newBookings}
                onCheckedChange={(checked) => updatePushSetting('newBookings', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Payment Received</Label>
                <p className="text-sm text-muted-foreground">When payments are received</p>
              </div>
              <Switch
                checked={settings.push.paymentReceived}
                onCheckedChange={(checked) => updatePushSetting('paymentReceived', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Timing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Timing
          </CardTitle>
          <CardDescription>Configure when notifications are sent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="lessonReminderHours">Lesson Reminder (hours before)</Label>
              <Select
                value={settings.timing.lessonReminderHours.toString()}
                onValueChange={(value) => updateTimingSetting('lessonReminderHours', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="48">48 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="paymentReminderDays">Payment Reminder (days before due)</Label>
              <Select
                value={settings.timing.paymentReminderDays.toString()}
                onValueChange={(value) => updateTimingSetting('paymentReminderDays', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="followUpDays">Follow-up Reminder (days after)</Label>
              <Select
                value={settings.timing.followUpDays.toString()}
                onValueChange={(value) => updateTimingSetting('followUpDays', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                </SelectContent>
              </Select>
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

export default NotificationSettings;