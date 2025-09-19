import {
  UserProfile,
  BusinessSettings,
  TeachingPreferences,
  NotificationSettings,
  PaymentSettings,
  PrivacySettings,
  SystemPreferences,
  SecuritySettings,
  WeeklyAvailability,
  ConnectedDevice,
  LoginHistory
} from '@/types/settings';

export const userProfile: UserProfile = {
  id: 1,
  firstName: 'Sarah',
  lastName: 'Mitchell',
  email: 'sarah.mitchell@email.com',
  phone: '(555) 123-4567',
  bio: 'Passionate pickleball coach with over 10 years of experience teaching players of all skill levels. I believe in developing both technical skills and strategic thinking.',
  title: 'Professional Pickleball Coach',
  experience: 10,
  specializations: ['Singles Strategy', 'Doubles Play', 'Tournament Preparation', 'Beginner Fundamentals'],
  certifications: ['USA Pickleball Certified Coach', 'PPR Certified Professional', 'First Aid/CPR Certified'],
  languages: ['English', 'Spanish', 'French'],
  timezone: 'America/New_York',
  website: 'https://sarahmitchellpickleball.com',
  socialMedia: {
    facebook: 'https://facebook.com/sarahmitchellpickleball',
    instagram: '@sarahmitchellpickleball',
    youtube: 'https://youtube.com/sarahmitchellpickleball'
  }
};

export const businessSettings: BusinessSettings = {
  businessName: 'Sarah Mitchell Pickleball Academy',
  businessType: 'individual',
  address: {
    street: '123 Court Lane',
    city: 'Pickleball Hills',
    state: 'CA',
    zipCode: '90210',
    country: 'United States'
  },
  contactInfo: {
    phone: '(555) 123-4567',
    email: 'info@sarahmitchellpickleball.com',
    website: 'https://sarahmitchellpickleball.com'
  },
  taxInfo: {
    taxId: '12-3456789',
    businessLicense: 'BL-2024-001'
  },
  policies: {
    cancellationPolicy: '24-hour cancellation notice required. Late cancellations will be charged 50% of session fee.',
    makeupPolicy: 'Makeup sessions available for cancellations with 24+ hours notice, subject to schedule availability.',
    paymentPolicy: 'Payment due at time of session or monthly in advance. Late payments subject to $10 fee after 7 days.',
    latePolicyMinutes: 15,
    refundPolicy: 'Refunds available for unused sessions with 30-day notice. Processing fee may apply.'
  },
  rates: {
    defaultHourlyRate: 75,
    currency: 'USD',
    packageDiscounts: [
      { id: 1, name: '4-Session Package', lessonsCount: 4, discountPercentage: 5 },
      { id: 2, name: '8-Session Package', lessonsCount: 8, discountPercentage: 10 },
      { id: 3, name: '12-Session Package', lessonsCount: 12, discountPercentage: 15 }
    ]
  }
};

export const teachingPreferences: TeachingPreferences = {
  instruments: ['Singles Play', 'Doubles Strategy', 'Tournament Prep', 'Recreational Play'],
  levels: ['Beginner', 'Intermediate', 'Advanced'],
  ageGroups: ['Youth (8-17)', 'Adults (18-54)', 'Seniors (55+)'],
  lessonTypes: ['Individual', 'Group', 'Clinic', 'Tournament Prep'],
  maxStudentsPerDay: 8,
  preferredLessonDuration: 60,
  travelRadius: 15,
  teachingLocations: ['Indoor Courts', 'Outdoor Courts', 'Private Courts'],
  availability: {
    monday: {
      available: true,
      timeSlots: [
        { startTime: '09:00', endTime: '12:00' },
        { startTime: '14:00', endTime: '18:00' }
      ]
    },
    tuesday: {
      available: true,
      timeSlots: [
        { startTime: '09:00', endTime: '12:00' },
        { startTime: '14:00', endTime: '18:00' }
      ]
    },
    wednesday: {
      available: true,
      timeSlots: [
        { startTime: '09:00', endTime: '12:00' },
        { startTime: '14:00', endTime: '18:00' }
      ]
    },
    thursday: {
      available: true,
      timeSlots: [
        { startTime: '09:00', endTime: '12:00' },
        { startTime: '14:00', endTime: '18:00' }
      ]
    },
    friday: {
      available: true,
      timeSlots: [
        { startTime: '09:00', endTime: '12:00' },
        { startTime: '14:00', endTime: '17:00' }
      ]
    },
    saturday: {
      available: true,
      timeSlots: [
        { startTime: '10:00', endTime: '16:00' }
      ]
    },
    sunday: {
      available: false,
      timeSlots: []
    }
  },
  bookingSettings: {
    advanceBookingDays: 30,
    cancellationHours: 24,
    autoConfirmBookings: true,
    allowOnlineBookings: true
  }
};

export const notificationSettings: NotificationSettings = {
  email: {
    lessonReminders: true,
    paymentReminders: true,
    newBookings: true,
    cancellations: true,
    progressUpdates: false,
    marketingEmails: false
  },
  sms: {
    lessonReminders: true,
    paymentReminders: false,
    newBookings: true,
    cancellations: true,
    emergencyOnly: false
  },
  push: {
    lessonReminders: true,
    newMessages: true,
    newBookings: true,
    paymentReceived: true
  },
  timing: {
    lessonReminderHours: 24,
    paymentReminderDays: 3,
    followUpDays: 7
  }
};

export const paymentSettings: PaymentSettings = {
  acceptedMethods: ['Cash', 'Check', 'Credit Card', 'Bank Transfer'],
  defaultPaymentTerms: 'Due at time of service',
  lateFeePercentage: 5,
  lateFeeGraceDays: 7,
  invoiceSettings: {
    autoSendInvoices: true,
    invoiceTemplate: 'professional',
    paymentTermsDays: 30,
    includeLateFees: true
  },
  stripeSettings: {
    connected: false
  },
  paypalSettings: {
    connected: false
  }
};

export const privacySettings: PrivacySettings = {
  profileVisibility: 'students-only',
  showContactInfo: true,
  showRates: false,
  allowStudentReviews: true,
  dataRetentionMonths: 24,
  shareAnalytics: false,
  marketingConsent: false
};

export const systemPreferences: SystemPreferences = {
  theme: 'light',
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  currency: 'USD',
  startOfWeek: 'sunday',
  defaultView: 'dashboard',
  compactMode: false,
  showTips: true,
  autoSave: true
};

export const securitySettings: SecuritySettings = {
  twoFactorEnabled: false,
  loginNotifications: true,
  sessionTimeout: 60,
  passwordLastChanged: '2024-01-15',
  connectedDevices: [
    {
      id: '1',
      deviceName: 'MacBook Pro',
      deviceType: 'Desktop',
      lastUsed: '2024-01-25T10:30:00Z',
      location: 'Los Angeles, CA',
      current: true
    },
    {
      id: '2',
      deviceName: 'iPhone 15',
      deviceType: 'Mobile',
      lastUsed: '2024-01-24T18:45:00Z',
      location: 'Los Angeles, CA',
      current: false
    }
  ],
  loginHistory: [
    {
      id: '1',
      timestamp: '2024-01-25T10:30:00Z',
      device: 'MacBook Pro',
      location: 'Los Angeles, CA',
      ipAddress: '192.168.1.100',
      success: true
    },
    {
      id: '2',
      timestamp: '2024-01-24T18:45:00Z',
      device: 'iPhone 15',
      location: 'Los Angeles, CA',
      ipAddress: '192.168.1.101',
      success: true
    }
  ]
};