import React, { useState } from 'react';
import { Save, CreditCard, Link, Unlink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { paymentSettings } from '@/data/settingsData';

const PaymentSettings: React.FC = () => {
  const [settings, setSettings] = useState(paymentSettings);

  const handleSave = () => {
    console.log('Saving payment settings:', settings);
  };

  const togglePaymentMethod = (method: string) => {
    setSettings(prev => ({
      ...prev,
      acceptedMethods: prev.acceptedMethods.includes(method)
        ? prev.acceptedMethods.filter(m => m !== method)
        : [...prev.acceptedMethods, method]
    }));
  };

  const updateInvoiceSetting = (key: string, value: boolean | string | number) => {
    setSettings(prev => ({
      ...prev,
      invoiceSettings: { ...prev.invoiceSettings, [key]: value }
    }));
  };

  const availablePaymentMethods = ['Cash', 'Check', 'Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal', 'Venmo', 'Zelle'];

  return (
    <div className="space-y-6">
      {/* Accepted Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Accepted Payment Methods</CardTitle>
          <CardDescription>Select which payment methods you accept from students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availablePaymentMethods.map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <Checkbox
                  id={method}
                  checked={settings.acceptedMethods.includes(method)}
                  onCheckedChange={() => togglePaymentMethod(method)}
                />
                <Label htmlFor={method} className="text-sm font-medium cursor-pointer">
                  {method}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Terms</CardTitle>
          <CardDescription>Configure your default payment terms and late fees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="paymentTerms">Default Payment Terms</Label>
            <Select 
              value={settings.defaultPaymentTerms} 
              onValueChange={(value) => setSettings(prev => ({ ...prev, defaultPaymentTerms: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Due at time of service">Due at time of service</SelectItem>
                <SelectItem value="Due within 7 days">Due within 7 days</SelectItem>
                <SelectItem value="Due within 15 days">Due within 15 days</SelectItem>
                <SelectItem value="Due within 30 days">Due within 30 days</SelectItem>
                <SelectItem value="Monthly in advance">Monthly in advance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lateFeePercentage">Late Fee Percentage</Label>
              <div className="flex">
                <Input
                  id="lateFeePercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.lateFeePercentage}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    lateFeePercentage: parseFloat(e.target.value) || 0 
                  }))}
                  className="rounded-r-none"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  %
                </span>
              </div>
            </div>
            <div>
              <Label htmlFor="lateFeeGraceDays">Grace Period (days)</Label>
              <Input
                id="lateFeeGraceDays"
                type="number"
                min="0"
                value={settings.lateFeeGraceDays}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  lateFeeGraceDays: parseInt(e.target.value) || 0 
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Settings</CardTitle>
          <CardDescription>Configure how invoices are generated and sent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-send invoices</Label>
                <p className="text-sm text-muted-foreground">Automatically send invoices when lessons are scheduled</p>
              </div>
              <Switch
                checked={settings.invoiceSettings.autoSendInvoices}
                onCheckedChange={(checked) => updateInvoiceSetting('autoSendInvoices', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Include late fees</Label>
                <p className="text-sm text-muted-foreground">Automatically add late fees to overdue invoices</p>
              </div>
              <Switch
                checked={settings.invoiceSettings.includeLateFees}
                onCheckedChange={(checked) => updateInvoiceSetting('includeLateFees', checked)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invoiceTemplate">Invoice Template</Label>
              <Select 
                value={settings.invoiceSettings.invoiceTemplate} 
                onValueChange={(value) => updateInvoiceSetting('invoiceTemplate', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentTermsDays">Payment Terms (days)</Label>
              <Input
                id="paymentTermsDays"
                type="number"
                min="1"
                value={settings.invoiceSettings.paymentTermsDays}
                onChange={(e) => updateInvoiceSetting('paymentTermsDays', parseInt(e.target.value) || 30)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Integrations</CardTitle>
          <CardDescription>Connect with payment processors for online payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stripe Integration */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Stripe</h4>
                <p className="text-sm text-muted-foreground">
                  Accept credit cards and online payments
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {settings.stripeSettings?.connected ? (
                <>
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                  <Button variant="outline" size="sm">
                    <Unlink className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button size="sm">
                  <Link className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              )}
            </div>
          </div>

          {/* PayPal Integration */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">PayPal</h4>
                <p className="text-sm text-muted-foreground">
                  Accept PayPal payments from students
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {settings.paypalSettings?.connected ? (
                <>
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                  <Button variant="outline" size="sm">
                    <Unlink className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button size="sm">
                  <Link className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              )}
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

export default PaymentSettings;