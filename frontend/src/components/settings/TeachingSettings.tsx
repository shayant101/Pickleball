import React, { useState } from 'react';
import { Save, Plus, X, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { teachingPreferences } from '@/data/settingsData';

const TeachingSettings: React.FC = () => {
  const [preferences, setPreferences] = useState(teachingPreferences);

  const handleSave = () => {
    console.log('Saving teaching preferences:', preferences);
  };

  const toggleInstrument = (instrument: string) => {
    setPreferences(prev => ({
      ...prev,
      instruments: prev.instruments.includes(instrument)
        ? prev.instruments.filter(i => i !== instrument)
        : [...prev.instruments, instrument]
    }));
  };

  const toggleLevel = (level: string) => {
    setPreferences(prev => ({
      ...prev,
      levels: prev.levels.includes(level)
        ? prev.levels.filter(l => l !== level)
        : [...prev.levels, level]
    }));
  };

  const toggleAgeGroup = (ageGroup: string) => {
    setPreferences(prev => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(ageGroup)
        ? prev.ageGroups.filter(a => a !== ageGroup)
        : [...prev.ageGroups, ageGroup]
    }));
  };

  const updateAvailability = (day: string, field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day as keyof typeof prev.availability],
          [field]: value
        }
      }
    }));
  };

  const addTimeSlot = (day: string) => {
    const newSlot = { startTime: '09:00', endTime: '10:00' };
    setPreferences(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day as keyof typeof prev.availability],
          timeSlots: [...prev.availability[day as keyof typeof prev.availability].timeSlots, newSlot]
        }
      }
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setPreferences(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day as keyof typeof prev.availability],
          timeSlots: prev.availability[day as keyof typeof prev.availability].timeSlots.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const updateTimeSlot = (day: string, index: number, field: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day as keyof typeof prev.availability],
          timeSlots: prev.availability[day as keyof typeof prev.availability].timeSlots.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
          )
        }
      }
    }));
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const availableInstruments = ['Piano', 'Guitar', 'Voice', 'Violin', 'Drums', 'Bass', 'Flute', 'Saxophone', 'Trumpet'];
  const availableLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const availableAgeGroups = ['Children (5-12)', 'Teens (13-17)', 'Adults (18+)', 'Seniors (65+)'];

  return (
    <div className="space-y-6">
      {/* Instruments */}
      <Card>
        <CardHeader>
          <CardTitle>Instruments</CardTitle>
          <CardDescription>Select the instruments you teach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableInstruments.map((instrument) => (
              <Badge
                key={instrument}
                variant={preferences.instruments.includes(instrument) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleInstrument(instrument)}
              >
                {instrument}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Student Levels</CardTitle>
          <CardDescription>Select the skill levels you teach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableLevels.map((level) => (
              <Badge
                key={level}
                variant={preferences.levels.includes(level) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleLevel(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Age Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Age Groups</CardTitle>
          <CardDescription>Select the age groups you prefer to teach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableAgeGroups.map((ageGroup) => (
              <Badge
                key={ageGroup}
                variant={preferences.ageGroups.includes(ageGroup) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleAgeGroup(ageGroup)}
              >
                {ageGroup}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teaching Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Teaching Preferences</CardTitle>
          <CardDescription>Configure your teaching preferences and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxStudents">Max Students Per Day</Label>
              <Input
                id="maxStudents"
                type="number"
                value={preferences.maxStudentsPerDay}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  maxStudentsPerDay: parseInt(e.target.value) || 0
                }))}
              />
            </div>
            <div>
              <Label htmlFor="lessonDuration">Preferred Lesson Duration (minutes)</Label>
              <Select
                value={preferences.preferredLessonDuration.toString()}
                onValueChange={(value) => setPreferences(prev => ({
                  ...prev,
                  preferredLessonDuration: parseInt(value)
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="travelRadius">Travel Radius (miles)</Label>
            <Input
              id="travelRadius"
              type="number"
              value={preferences.travelRadius}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                travelRadius: parseInt(e.target.value) || 0
              }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Availability</CardTitle>
          <CardDescription>Set your available teaching hours for each day</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {daysOfWeek.map((day) => {
            const dayAvailability = preferences.availability[day.key as keyof typeof preferences.availability];
            return (
              <div key={day.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">{day.label}</Label>
                  <Switch
                    checked={dayAvailability.available}
                    onCheckedChange={(checked) => updateAvailability(day.key, 'available', checked)}
                  />
                </div>
                
                {dayAvailability.available && (
                  <div className="ml-4 space-y-2">
                    {dayAvailability.timeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => updateTimeSlot(day.key, index, 'startTime', e.target.value)}
                          className="w-32"
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateTimeSlot(day.key, index, 'endTime', e.target.value)}
                          className="w-32"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTimeSlot(day.key, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addTimeSlot(day.key)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Time Slot
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Booking Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Settings</CardTitle>
          <CardDescription>Configure how students can book lessons with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="advanceBooking">Advance Booking (days)</Label>
              <Input
                id="advanceBooking"
                type="number"
                value={preferences.bookingSettings.advanceBookingDays}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  bookingSettings: {
                    ...prev.bookingSettings,
                    advanceBookingDays: parseInt(e.target.value) || 0
                  }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="cancellationHours">Cancellation Notice (hours)</Label>
              <Input
                id="cancellationHours"
                type="number"
                value={preferences.bookingSettings.cancellationHours}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  bookingSettings: {
                    ...prev.bookingSettings,
                    cancellationHours: parseInt(e.target.value) || 0
                  }
                }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Auto-confirm bookings</Label>
              <Switch
                checked={preferences.bookingSettings.autoConfirmBookings}
                onCheckedChange={(checked) => setPreferences(prev => ({
                  ...prev,
                  bookingSettings: { ...prev.bookingSettings, autoConfirmBookings: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow online bookings</Label>
              <Switch
                checked={preferences.bookingSettings.allowOnlineBookings}
                onCheckedChange={(checked) => setPreferences(prev => ({
                  ...prev,
                  bookingSettings: { ...prev.bookingSettings, allowOnlineBookings: checked }
                }))}
              />
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

export default TeachingSettings;