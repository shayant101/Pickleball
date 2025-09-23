import { Router, Request, Response } from 'express';
import { SettingsService } from '../services/settingsService';
import { authenticateToken } from '../middleware/auth';

const router: Router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/settings - Get all settings for the authenticated user
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const settings = await SettingsService.getAllSettings(userId);

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch settings'
    });
  }
});

// GET /api/settings/:category - Get settings for a specific category
router.get('/:category', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { category } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category is required'
      });
    }

    const settings = await SettingsService.getSettingsByCategory(userId, category);

    res.status(200).json({
      success: true,
      data: settings,
      category
    });
  } catch (error) {
    console.error('Error fetching category settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category settings'
    });
  }
});

// PUT /api/settings/:category - Update settings for a specific category
router.put('/:category', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { category } = req.params;
    const settings = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category is required'
      });
    }

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Settings object is required'
      });
    }

    // Use typed methods for known categories
    let result;
    switch (category) {
      case 'profile':
        result = await SettingsService.setProfileSettings(userId, settings);
        break;
      case 'business':
        result = await SettingsService.setBusinessSettings(userId, settings);
        break;
      case 'teaching':
        result = await SettingsService.setTeachingSettings(userId, settings);
        break;
      case 'notifications':
        result = await SettingsService.setNotificationSettings(userId, settings);
        break;
      case 'privacy':
        result = await SettingsService.setPrivacySettings(userId, settings);
        break;
      case 'security':
        result = await SettingsService.setSecuritySettings(userId, settings);
        break;
      case 'system':
        result = await SettingsService.setSystemSettings(userId, settings);
        break;
      default:
        result = await SettingsService.setSettingsForCategory(userId, category, settings);
        break;
    }

    // Get updated settings to return
    const updatedSettings = await SettingsService.getSettingsByCategory(userId, category);

    res.status(200).json({
      success: true,
      data: updatedSettings,
      message: `${category} settings updated successfully`
    });
  } catch (error) {
    console.error('Error updating category settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update category settings'
    });
  }
});

// GET /api/settings/:category/:key - Get a specific setting
router.get('/:category/:key', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { category, key } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!category || !key) {
      return res.status(400).json({
        success: false,
        error: 'Category and key are required'
      });
    }

    const value = await SettingsService.getSetting(userId, category, key);

    if (value === null) {
      return res.status(404).json({
        success: false,
        error: 'Setting not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        category,
        key,
        value
      }
    });
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch setting'
    });
  }
});

// PUT /api/settings/:category/:key - Update a specific setting
router.put('/:category/:key', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { category, key } = req.params;
    const { value, type } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!category || !key) {
      return res.status(400).json({
        success: false,
        error: 'Category and key are required'
      });
    }

    if (value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Value is required'
      });
    }

    const setting = await SettingsService.setSetting(userId, category, key, value, type);

    res.status(200).json({
      success: true,
      data: {
        category: setting.category,
        key: setting.key,
        value: value,
        type: setting.type,
        updatedAt: setting.updatedAt
      },
      message: 'Setting updated successfully'
    });
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update setting'
    });
  }
});

// DELETE /api/settings/:category/:key - Delete a specific setting
router.delete('/:category/:key', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { category, key } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!category || !key) {
      return res.status(400).json({
        success: false,
        error: 'Category and key are required'
      });
    }

    const success = await SettingsService.deleteSetting(userId, category, key);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Setting not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Setting deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting setting:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete setting'
    });
  }
});

// DELETE /api/settings/:category - Delete all settings for a category
router.delete('/:category', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { category } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category is required'
      });
    }

    const count = await SettingsService.deleteSettingsForCategory(userId, category);

    res.status(200).json({
      success: true,
      data: { deletedCount: count },
      message: `${count} settings deleted for category ${category}`
    });
  } catch (error) {
    console.error('Error deleting category settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete category settings'
    });
  }
});

// POST /api/settings/initialize - Initialize default settings for user
router.post('/initialize', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    await SettingsService.initializeDefaultSettings(userId);

    const settings = await SettingsService.getAllSettings(userId);

    res.status(201).json({
      success: true,
      data: settings,
      message: 'Default settings initialized successfully'
    });
  } catch (error) {
    console.error('Error initializing settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initialize settings'
    });
  }
});

// POST /api/settings/:category/reset - Reset category settings to defaults
router.post('/:category/reset', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { category } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category is required'
      });
    }

    await SettingsService.resetCategoryToDefaults(userId, category);

    const settings = await SettingsService.getSettingsByCategory(userId, category);

    res.status(200).json({
      success: true,
      data: settings,
      message: `${category} settings reset to defaults successfully`
    });
  } catch (error) {
    console.error('Error resetting category settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset category settings'
    });
  }
});

// TYPED CATEGORY ROUTES (for better API documentation and validation)

// GET /api/settings/profile - Get profile settings
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const settings = await SettingsService.getProfileSettings(userId);

    res.status(200).json({
      success: true,
      data: settings,
      category: 'profile'
    });
  } catch (error) {
    console.error('Error fetching profile settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile settings'
    });
  }
});

// GET /api/settings/business - Get business settings
router.get('/business', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const settings = await SettingsService.getBusinessSettings(userId);

    res.status(200).json({
      success: true,
      data: settings,
      category: 'business'
    });
  } catch (error) {
    console.error('Error fetching business settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch business settings'
    });
  }
});

// GET /api/settings/teaching - Get teaching settings
router.get('/teaching', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const settings = await SettingsService.getTeachingSettings(userId);

    res.status(200).json({
      success: true,
      data: settings,
      category: 'teaching'
    });
  } catch (error) {
    console.error('Error fetching teaching settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch teaching settings'
    });
  }
});

// GET /api/settings/notifications - Get notification settings
router.get('/notifications', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const settings = await SettingsService.getNotificationSettings(userId);

    res.status(200).json({
      success: true,
      data: settings,
      category: 'notifications'
    });
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notification settings'
    });
  }
});

// GET /api/settings/privacy - Get privacy settings
router.get('/privacy', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const settings = await SettingsService.getPrivacySettings(userId);

    res.status(200).json({
      success: true,
      data: settings,
      category: 'privacy'
    });
  } catch (error) {
    console.error('Error fetching privacy settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch privacy settings'
    });
  }
});

// GET /api/settings/security - Get security settings
router.get('/security', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const settings = await SettingsService.getSecuritySettings(userId);

    res.status(200).json({
      success: true,
      data: settings,
      category: 'security'
    });
  } catch (error) {
    console.error('Error fetching security settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch security settings'
    });
  }
});

// GET /api/settings/system - Get system settings
router.get('/system', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const settings = await SettingsService.getSystemSettings(userId);

    res.status(200).json({
      success: true,
      data: settings,
      category: 'system'
    });
  } catch (error) {
    console.error('Error fetching system settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch system settings'
    });
  }
});

export default router;