import { PrismaClient, Settings } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateSettingData {
  category: string;
  key: string;
  value: string;
  type?: string;
  userId: number;
}

export interface UpdateSettingData {
  value: string;
  type?: string;
}

export interface SettingsGroup {
  category: string;
  settings: {
    key: string;
    value: any;
    type: string;
    updatedAt: Date;
  }[];
}

export interface ProfileSettings {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  timezone?: string;
  language?: string;
}

export interface BusinessSettings {
  businessName?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessWebsite?: string;
  taxId?: string;
  currency?: string;
  businessHours?: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
}

export interface TeachingSettings {
  defaultSessionDuration?: number;
  defaultSessionPrice?: number;
  cancellationPolicy?: string;
  reschedulePolicy?: string;
  paymentTerms?: string;
  autoConfirmBookings?: boolean;
  requirePaymentUpfront?: boolean;
  allowOnlinePayments?: boolean;
}

export interface NotificationSettings {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  sessionReminders?: boolean;
  paymentReminders?: boolean;
  newStudentAlerts?: boolean;
  cancellationAlerts?: boolean;
  reminderTiming?: number; // hours before session
}

export interface PrivacySettings {
  profileVisibility?: 'public' | 'private' | 'students-only';
  shareContactInfo?: boolean;
  allowStudentReviews?: boolean;
  dataRetentionPeriod?: number; // months
  allowAnalytics?: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled?: boolean;
  sessionTimeout?: number; // minutes
  passwordExpiryDays?: number;
  loginNotifications?: boolean;
  allowedIpAddresses?: string[];
}

export interface SystemSettings {
  theme?: 'light' | 'dark' | 'auto';
  dateFormat?: string;
  timeFormat?: '12h' | '24h';
  firstDayOfWeek?: number; // 0 = Sunday, 1 = Monday
  autoBackup?: boolean;
  backupFrequency?: 'daily' | 'weekly' | 'monthly';
}

export class SettingsService {
  // Get all settings for a user grouped by category
  static async getAllSettings(userId: number): Promise<SettingsGroup[]> {
    const settings = await prisma.settings.findMany({
      where: { userId },
      orderBy: [
        { category: 'asc' },
        { key: 'asc' }
      ]
    });

    // Group settings by category
    const grouped = new Map<string, SettingsGroup>();
    
    settings.forEach(setting => {
      if (!grouped.has(setting.category)) {
        grouped.set(setting.category, {
          category: setting.category,
          settings: []
        });
      }
      
      const group = grouped.get(setting.category)!;
      group.settings.push({
        key: setting.key,
        value: this.parseSettingValue(setting.value, setting.type),
        type: setting.type,
        updatedAt: setting.updatedAt
      });
    });

    return Array.from(grouped.values());
  }

  // Get settings for a specific category
  static async getSettingsByCategory(userId: number, category: string): Promise<{ [key: string]: any }> {
    const settings = await prisma.settings.findMany({
      where: {
        userId,
        category
      }
    });

    const result: { [key: string]: any } = {};
    settings.forEach(setting => {
      result[setting.key] = this.parseSettingValue(setting.value, setting.type);
    });

    return result;
  }

  // Get a specific setting
  static async getSetting(userId: number, category: string, key: string): Promise<any> {
    const setting = await prisma.settings.findUnique({
      where: {
        userId_category_key: {
          userId,
          category,
          key
        }
      }
    });

    if (!setting) return null;
    return this.parseSettingValue(setting.value, setting.type);
  }

  // Set a single setting
  static async setSetting(userId: number, category: string, key: string, value: any, type?: string): Promise<Settings> {
    const settingType = type || this.inferType(value);
    const stringValue = this.stringifySettingValue(value, settingType);

    return await prisma.settings.upsert({
      where: {
        userId_category_key: {
          userId,
          category,
          key
        }
      },
      update: {
        value: stringValue,
        type: settingType
      },
      create: {
        userId,
        category,
        key,
        value: stringValue,
        type: settingType
      }
    });
  }

  // Set multiple settings for a category
  static async setSettingsForCategory(
    userId: number, 
    category: string, 
    settings: { [key: string]: any }
  ): Promise<Settings[]> {
    const results: Settings[] = [];

    for (const [key, value] of Object.entries(settings)) {
      const result = await this.setSetting(userId, category, key, value);
      results.push(result);
    }

    return results;
  }

  // Delete a setting
  static async deleteSetting(userId: number, category: string, key: string): Promise<boolean> {
    try {
      await prisma.settings.delete({
        where: {
          userId_category_key: {
            userId,
            category,
            key
          }
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Delete all settings for a category
  static async deleteSettingsForCategory(userId: number, category: string): Promise<number> {
    const result = await prisma.settings.deleteMany({
      where: {
        userId,
        category
      }
    });

    return result.count;
  }

  // TYPED SETTING METHODS

  // Profile Settings
  static async getProfileSettings(userId: number): Promise<ProfileSettings> {
    return await this.getSettingsByCategory(userId, 'profile') as ProfileSettings;
  }

  static async setProfileSettings(userId: number, settings: ProfileSettings): Promise<Settings[]> {
    return await this.setSettingsForCategory(userId, 'profile', settings);
  }

  // Business Settings
  static async getBusinessSettings(userId: number): Promise<BusinessSettings> {
    return await this.getSettingsByCategory(userId, 'business') as BusinessSettings;
  }

  static async setBusinessSettings(userId: number, settings: BusinessSettings): Promise<Settings[]> {
    return await this.setSettingsForCategory(userId, 'business', settings);
  }

  // Teaching Settings
  static async getTeachingSettings(userId: number): Promise<TeachingSettings> {
    return await this.getSettingsByCategory(userId, 'teaching') as TeachingSettings;
  }

  static async setTeachingSettings(userId: number, settings: TeachingSettings): Promise<Settings[]> {
    return await this.setSettingsForCategory(userId, 'teaching', settings);
  }

  // Notification Settings
  static async getNotificationSettings(userId: number): Promise<NotificationSettings> {
    return await this.getSettingsByCategory(userId, 'notifications') as NotificationSettings;
  }

  static async setNotificationSettings(userId: number, settings: NotificationSettings): Promise<Settings[]> {
    return await this.setSettingsForCategory(userId, 'notifications', settings);
  }

  // Privacy Settings
  static async getPrivacySettings(userId: number): Promise<PrivacySettings> {
    return await this.getSettingsByCategory(userId, 'privacy') as PrivacySettings;
  }

  static async setPrivacySettings(userId: number, settings: PrivacySettings): Promise<Settings[]> {
    return await this.setSettingsForCategory(userId, 'privacy', settings);
  }

  // Security Settings
  static async getSecuritySettings(userId: number): Promise<SecuritySettings> {
    return await this.getSettingsByCategory(userId, 'security') as SecuritySettings;
  }

  static async setSecuritySettings(userId: number, settings: SecuritySettings): Promise<Settings[]> {
    return await this.setSettingsForCategory(userId, 'security', settings);
  }

  // System Settings
  static async getSystemSettings(userId: number): Promise<SystemSettings> {
    return await this.getSettingsByCategory(userId, 'system') as SystemSettings;
  }

  static async setSystemSettings(userId: number, settings: SystemSettings): Promise<Settings[]> {
    return await this.setSettingsForCategory(userId, 'system', settings);
  }

  // UTILITY METHODS

  // Parse setting value based on type
  private static parseSettingValue(value: string, type: string): any {
    switch (type) {
      case 'boolean':
        return value === 'true';
      case 'number':
        return parseFloat(value);
      case 'json':
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      case 'string':
      default:
        return value;
    }
  }

  // Convert value to string for storage
  private static stringifySettingValue(value: any, type: string): string {
    switch (type) {
      case 'boolean':
        return value ? 'true' : 'false';
      case 'number':
        return value.toString();
      case 'json':
        return JSON.stringify(value);
      case 'string':
      default:
        return value.toString();
    }
  }

  // Infer type from value
  private static inferType(value: any): string {
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'object' && value !== null) return 'json';
    return 'string';
  }

  // Get default settings for a new user
  static async initializeDefaultSettings(userId: number): Promise<void> {
    const defaultSettings = [
      // Profile defaults
      { category: 'profile', key: 'timezone', value: 'UTC', type: 'string' },
      { category: 'profile', key: 'language', value: 'en', type: 'string' },
      
      // Business defaults
      { category: 'business', key: 'currency', value: 'USD', type: 'string' },
      
      // Teaching defaults
      { category: 'teaching', key: 'defaultSessionDuration', value: '60', type: 'number' },
      { category: 'teaching', key: 'autoConfirmBookings', value: 'false', type: 'boolean' },
      { category: 'teaching', key: 'requirePaymentUpfront', value: 'false', type: 'boolean' },
      
      // Notification defaults
      { category: 'notifications', key: 'emailNotifications', value: 'true', type: 'boolean' },
      { category: 'notifications', key: 'sessionReminders', value: 'true', type: 'boolean' },
      { category: 'notifications', key: 'reminderTiming', value: '24', type: 'number' },
      
      // Privacy defaults
      { category: 'privacy', key: 'profileVisibility', value: 'students-only', type: 'string' },
      { category: 'privacy', key: 'allowAnalytics', value: 'true', type: 'boolean' },
      
      // Security defaults
      { category: 'security', key: 'twoFactorEnabled', value: 'false', type: 'boolean' },
      { category: 'security', key: 'sessionTimeout', value: '480', type: 'number' }, // 8 hours
      
      // System defaults
      { category: 'system', key: 'theme', value: 'light', type: 'string' },
      { category: 'system', key: 'dateFormat', value: 'MM/DD/YYYY', type: 'string' },
      { category: 'system', key: 'timeFormat', value: '12h', type: 'string' },
      { category: 'system', key: 'firstDayOfWeek', value: '0', type: 'number' }
    ];

    for (const setting of defaultSettings) {
      await prisma.settings.upsert({
        where: {
          userId_category_key: {
            userId,
            category: setting.category,
            key: setting.key
          }
        },
        update: {}, // Don't update if exists
        create: {
          userId,
          category: setting.category,
          key: setting.key,
          value: setting.value,
          type: setting.type
        }
      });
    }
  }

  // Reset settings to defaults for a category
  static async resetCategoryToDefaults(userId: number, category: string): Promise<void> {
    // Delete existing settings for category
    await this.deleteSettingsForCategory(userId, category);
    
    // Reinitialize defaults (this will only create settings for the specified category)
    await this.initializeDefaultSettings(userId);
  }
}