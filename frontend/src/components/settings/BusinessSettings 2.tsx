import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { businessSettings } from '@/data/settingsData';

const BusinessSettings: React.FC = () => {
  const [settings, setSettings] = useState(businessSettings);

  const handleSave = () => {
    console.log('Saving business settings:', settings);
  };

  const addPackageDiscount = () => {
    const newDiscount = {
      id: Date.now(),
      name: '',
      lessonsCount: 4,
      discountPercentage: 5
    };
    setSettings(prev => ({
      ...prev,
      rates: {
        ...prev.rates,
        packageDiscounts: [...prev.rates.packageDiscounts, newDiscount]
      }
    }));
  };

  const removePackageDiscount = (id: number) => {
    setSettings(prev => ({
      ...prev,
      rates: {
        ...prev.rates,
        packageDiscounts: prev.rates.packageDiscounts.filter(pkg => pkg.id !== id)
      }
    }));
  };

  const updatePackageDiscount = (id: number, field: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      rates: {
        ...prev.rates,
        packageDiscounts: prev.rates.packageDiscounts.map(pkg =>
          pkg.id === id ? { ...pkg, [field]: value } : pkg
        )
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Basic details about your music teaching business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={settings.businessName}
              onChange={(e) => setSettings(prev => ({ ...prev, businessName: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="businessType">Business Type</Label>
            <Select 
              value={settings.businessType} 
              onValueChange={(value: 'individual' | 'studio' | 'school') => 
                setSettings(prev => ({ ...prev, businessType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Instructor</SelectItem>
                <SelectItem value="studio">Music Studio</SelectItem>
                <SelectItem value="school">Music School</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input
                id="businessPhone"
                value={settings.contactInfo.phone}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, phone: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                type="email"
                value={settings.contactInfo.email}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, email: e.target.value }
                }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="businessWebsite">Website</Label>
            <Input
              id="businessWebsite"
              value={settings.contactInfo.website || ''}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, website: e.target.value }
              }))}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Address */}
      <Card>
        <CardHeader>
          <CardTitle>Business Address</CardTitle>
          <CardDescription>Your teaching location or studio address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={settings.address.street}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                address: { ...prev.address, street: e.target.value }
              }))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={settings.address.city}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={settings.address.state}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  address: { ...prev.address, state: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={settings.address.zipCode}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  address: { ...prev.address, zipCode: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rates and Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Rates and Pricing</CardTitle>
          <CardDescription>Set your lesson rates and package discounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hourlyRate">Default Hourly Rate</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={settings.rates.defaultHourlyRate}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    rates: { ...prev.rates, defaultHourlyRate: parseFloat(e.target.value) || 0 }
                  }))}
                  className="rounded-l-none"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={settings.rates.currency} 
                onValueChange={(value) => setSettings(prev => ({
                  ...prev,
                  rates: { ...prev.rates, currency: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Package Discounts</Label>
              <Button onClick={addPackageDiscount} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Package
              </Button>
            </div>
            <div className="space-y-3">
              {settings.rates.packageDiscounts.map((pkg) => (
                <div key={pkg.id} className="flex items-center gap-2 p-3 border rounded">
                  <Input
                    placeholder="Package name"
                    value={pkg.name}
                    onChange={(e) => updatePackageDiscount(pkg.id, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Lessons"
                    value={pkg.lessonsCount}
                    onChange={(e) => updatePackageDiscount(pkg.id, 'lessonsCount', parseInt(e.target.value) || 0)}
                    className="w-20"
                  />
                  <Input
                    type="number"
                    placeholder="Discount %"
                    value={pkg.discountPercentage}
                    onChange={(e) => updatePackageDiscount(pkg.id, 'discountPercentage', parseFloat(e.target.value) || 0)}
                    className="w-24"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePackageDiscount(pkg.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Business Policies</CardTitle>
          <CardDescription>Set your cancellation, payment, and other policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
            <Textarea
              id="cancellationPolicy"
              value={settings.policies.cancellationPolicy}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                policies: { ...prev.policies, cancellationPolicy: e.target.value }
              }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="makeupPolicy">Makeup Lesson Policy</Label>
            <Textarea
              id="makeupPolicy"
              value={settings.policies.makeupPolicy}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                policies: { ...prev.policies, makeupPolicy: e.target.value }
              }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="paymentPolicy">Payment Policy</Label>
            <Textarea
              id="paymentPolicy"
              value={settings.policies.paymentPolicy}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                policies: { ...prev.policies, paymentPolicy: e.target.value }
              }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="latePolicyMinutes">Late Arrival Grace Period (minutes)</Label>
            <Input
              id="latePolicyMinutes"
              type="number"
              value={settings.policies.latePolicyMinutes}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                policies: { ...prev.policies, latePolicyMinutes: parseInt(e.target.value) || 0 }
              }))}
            />
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

export default BusinessSettings;