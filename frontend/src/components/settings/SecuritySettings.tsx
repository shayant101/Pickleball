import React, { useState } from 'react';
import { Save, Shield, Smartphone, Key, Monitor, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { securitySettings } from '@/data/settingsData';

const SecuritySettings: React.FC = () => {
  const [settings, setSettings] = useState(securitySettings);

  const handleSave = () => {
    console.log('Saving security settings:', settings);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Password Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="h-5 w-5 mr-2" />
            Password Security
          </CardTitle>
          <CardDescription>Manage your password and account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Password</h4>
                <p className="text-sm text-muted-foreground">
                  Last changed: {new Date(settings.passwordLastChanged).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline">
                Change Password
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-1">Password Requirements</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Include at least one number</li>
              <li>• Include at least one special character</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">
                {settings.twoFactorEnabled 
                  ? 'Your account is protected with 2FA' 
                  : 'Add extra security to your account'
                }
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {settings.twoFactorEnabled ? (
                <>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  <Button variant="outline" size="sm">
                    Disable
                  </Button>
                </>
              ) : (
                <Button size="sm">
                  Enable 2FA
                </Button>
              )}
            </div>
          </div>

          {!settings.twoFactorEnabled && (
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-yellow-900">Recommended Security Enhancement</h5>
                  <p className="text-sm text-yellow-800 mt-1">
                    Enable two-factor authentication to significantly improve your account security.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Control your login sessions and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Select 
                value={settings.sessionTimeout.toString()} 
                onValueChange={(value) => setSettings(prev => ({ 
                  ...prev, 
                  sessionTimeout: parseInt(value) 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="480">8 hours</SelectItem>
                  <SelectItem value="-1">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Login notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified of new logins</p>
              </div>
              <Switch
                checked={settings.loginNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, loginNotifications: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Monitor className="h-5 w-5 mr-2" />
            Connected Devices
          </CardTitle>
          <CardDescription>Manage devices that have access to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {settings.connectedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Monitor className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{device.deviceName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {device.location} • Last used {formatDate(device.lastUsed)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {device.current && (
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  )}
                  {!device.current && (
                    <Button variant="outline" size="sm">
                      Revoke Access
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>Recent login attempts and activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {settings.loginHistory.map((login) => (
              <div key={login.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{login.device}</h4>
                    {login.success ? (
                      <Badge className="bg-green-100 text-green-800">Success</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">Failed</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {login.location} • {formatDate(login.timestamp)}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {login.ipAddress}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Security Actions</CardTitle>
          <CardDescription>Additional security measures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Sign Out All Devices</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Sign out of all devices except this one for security.
              </p>
              <Button variant="outline" className="w-full">
                Sign Out All Devices
              </Button>
            </div>
            <div className="p-4 border rounded-lg border-red-200">
              <h4 className="font-medium mb-2 text-red-700">Download Security Report</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get a detailed report of your account security activity.
              </p>
              <Button variant="outline" className="w-full">
                Download Report
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

export default SecuritySettings;