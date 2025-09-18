export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  bio: string;
  title: string;
  experience: number;
  specializations: string[];
  certifications: string[];
  languages: string[];
  timezone: string;
  website?: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}

export interface BusinessSettings {
  businessName: string;
  businessType: 'individual' | 'studio' | 'school';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  taxInfo: {
    taxId?: string;
    businessLicense?: string;
  };
  policies: {
    cancellationPolicy: string;
    makeupPolicy: string;
    paymentPolicy: string;
    latePolicyMinutes: number;
    refundPolicy: string;
  };
  rates: {
    defaultHourlyRate: number;
    currency: string;
    packageDiscounts: PackageDiscount[];
  };
}

export interface PackageDiscount {
  id: number;
  name: string;
  lessonsCount: number;
  discountPercentage: number;
}

export interface TeachingPreferences {
  instruments: string[];
  levels: string[];
  ageGroups: string[];
  lessonTypes: string[];
  maxStudentsPerDay: number;
  preferredLessonDuration: number;
  travelRadius: number;
  teachingLocations: string[];
  availability: WeeklyAvailability;
  bookingSettings: {
    advanceBookingDays: number;
    cancellationHours: number;
    autoConfirmBookings: boolean;
    allowOnlineBookings: boolean;
  };
}

export interface WeeklyAvailability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

export interface DayAvailability {
  available: boolean;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface NotificationSettings {
  email: {
    lessonReminders: boolean;
    paymentReminders: boolean;
    newBookings: boolean;
    cancellations: boolean;
    progressUpdates: boolean;
    marketingEmails: boolean;
  };
  sms: {
    lessonReminders: boolean;
    paymentReminders: boolean;
    newBookings: boolean;
    cancellations: boolean;
    emergencyOnly: boolean;
  };
  push: {
    lessonReminders: boolean;
    newMessages: boolean;
    newBookings: boolean;
    paymentReceived: boolean;
  };
  timing: {
    lessonReminderHours: number;
    paymentReminderDays: number;
    followUpDays: number;
  };
}

export interface PaymentSettings {
  acceptedMethods: string[];
  defaultPaymentTerms: string;
  lateFeePercentage: number;
  lateFeeGraceDays: number;
  invoiceSettings: {
    autoSendInvoices: boolean;
    invoiceTemplate: string;
    paymentTermsDays: number;
    includeLateFees: boolean;
  };
  stripeSettings?: {
    connected: boolean;
    accountId?: string;
  };
  paypalSettings?: {
    connected: boolean;
    email?: string;
  };
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'students-only';
  showContactInfo: boolean;
  showRates: boolean;
  allowStudentReviews: boolean;
  dataRetentionMonths: number;
  shareAnalytics: boolean;
  marketingConsent: boolean;
}

export interface SystemPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: string;
  startOfWeek: 'sunday' | 'monday';
  defaultView: string;
  compactMode: boolean;
  showTips: boolean;
  autoSave: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
  passwordLastChanged: string;
  connectedDevices: ConnectedDevice[];
  loginHistory: LoginHistory[];
}

export interface ConnectedDevice {
  id: string;
  deviceName: string;
  deviceType: string;
  lastUsed: string;
  location: string;
  current: boolean;
}

export interface LoginHistory {
  id: string;
  timestamp: string;
  device: string;
  location: string;
  ipAddress: string;
  success: boolean;
}