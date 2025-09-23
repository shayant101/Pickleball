import { Router, Request, Response } from 'express';
import { AnalyticsService } from '../services/analyticsService';
import { authenticateToken } from '../middleware/auth';

const router: Router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/analytics/overview - Get analytics overview
router.get('/overview', async (req: Request, res: Response) => {
  try {
    const overview = await AnalyticsService.getOverview();

    res.status(200).json({
      success: true,
      data: overview
    });
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics overview'
    });
  }
});

// GET /api/analytics/revenue - Get revenue analytics
router.get('/revenue', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, groupBy } = req.query;

    // Default to last 30 days if no dates provided
    const end = endDate ? new Date(endDate as string) : new Date();
    const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const grouping = (groupBy as 'day' | 'week' | 'month') || 'day';

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DD)'
      });
    }

    if (start > end) {
      return res.status(400).json({
        success: false,
        error: 'Start date must be before end date'
      });
    }

    const revenueData = await AnalyticsService.getRevenueAnalytics(start, end, grouping);

    res.status(200).json({
      success: true,
      data: revenueData,
      count: revenueData.length,
      meta: {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        groupBy: grouping
      }
    });
  } catch (error) {
    console.error('Error fetching revenue analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch revenue analytics'
    });
  }
});

// GET /api/analytics/students - Get student growth analytics
router.get('/students', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, groupBy } = req.query;

    // Default to last 90 days if no dates provided
    const end = endDate ? new Date(endDate as string) : new Date();
    const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const grouping = (groupBy as 'day' | 'week' | 'month') || 'week';

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DD)'
      });
    }

    if (start > end) {
      return res.status(400).json({
        success: false,
        error: 'Start date must be before end date'
      });
    }

    const studentData = await AnalyticsService.getStudentGrowthAnalytics(start, end, grouping);

    res.status(200).json({
      success: true,
      data: studentData,
      count: studentData.length,
      meta: {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        groupBy: grouping
      }
    });
  } catch (error) {
    console.error('Error fetching student analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch student analytics'
    });
  }
});

// GET /api/analytics/sessions - Get session analytics
router.get('/sessions', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, groupBy } = req.query;

    // Default to last 30 days if no dates provided
    const end = endDate ? new Date(endDate as string) : new Date();
    const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const grouping = (groupBy as 'day' | 'week' | 'month') || 'day';

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DD)'
      });
    }

    if (start > end) {
      return res.status(400).json({
        success: false,
        error: 'Start date must be before end date'
      });
    }

    const sessionData = await AnalyticsService.getSessionAnalytics(start, end, grouping);

    res.status(200).json({
      success: true,
      data: sessionData,
      count: sessionData.length,
      meta: {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        groupBy: grouping
      }
    });
  } catch (error) {
    console.error('Error fetching session analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch session analytics'
    });
  }
});

// GET /api/analytics/top-students - Get top performing students
router.get('/top-students', async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const limitNum = limit ? parseInt(limit as string) : 10;

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Limit must be a number between 1 and 100'
      });
    }

    const topStudents = await AnalyticsService.getTopPerformingStudents(limitNum);

    res.status(200).json({
      success: true,
      data: topStudents,
      count: topStudents.length
    });
  } catch (error) {
    console.error('Error fetching top students:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch top performing students'
    });
  }
});

// POST /api/analytics/snapshots - Store analytics snapshot
router.post('/snapshots', async (req: Request, res: Response) => {
  try {
    const { metric, value, metadata } = req.body;

    // Validate required fields
    if (!metric || value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: metric, value'
      });
    }

    if (typeof value !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Value must be a number'
      });
    }

    await AnalyticsService.storeAnalyticsSnapshot(metric, value, metadata);

    res.status(201).json({
      success: true,
      message: 'Analytics snapshot stored successfully'
    });
  } catch (error) {
    console.error('Error storing analytics snapshot:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to store analytics snapshot'
    });
  }
});

// GET /api/analytics/snapshots/:metric - Get analytics snapshots for a metric
router.get('/snapshots/:metric', async (req: Request, res: Response) => {
  try {
    const metric = req.params.metric;
    const { startDate, endDate } = req.query;

    if (!metric) {
      return res.status(400).json({
        success: false,
        error: 'Metric parameter is required'
      });
    }

    // Default to last 30 days if no dates provided
    const end = endDate ? new Date(endDate as string) : new Date();
    const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DD)'
      });
    }

    if (start > end) {
      return res.status(400).json({
        success: false,
        error: 'Start date must be before end date'
      });
    }

    const snapshots = await AnalyticsService.getAnalyticsSnapshots(metric, start, end);

    res.status(200).json({
      success: true,
      data: snapshots,
      count: snapshots.length,
      meta: {
        metric,
        startDate: start.toISOString(),
        endDate: end.toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching analytics snapshots:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics snapshots'
    });
  }
});

// GET /api/analytics/export - Export analytics data
router.get('/export', async (req: Request, res: Response) => {
  try {
    const { type, startDate, endDate, format } = req.query;

    // Default to last 30 days if no dates provided
    const end = endDate ? new Date(endDate as string) : new Date();
    const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const exportFormat = (format as string) || 'json';

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DD)'
      });
    }

    if (start > end) {
      return res.status(400).json({
        success: false,
        error: 'Start date must be before end date'
      });
    }

    let data: any = {};

    // Get different types of analytics data based on type parameter
    switch (type) {
      case 'overview':
        data = await AnalyticsService.getOverview();
        break;
      case 'revenue':
        data = await AnalyticsService.getRevenueAnalytics(start, end, 'day');
        break;
      case 'students':
        data = await AnalyticsService.getStudentGrowthAnalytics(start, end, 'day');
        break;
      case 'sessions':
        data = await AnalyticsService.getSessionAnalytics(start, end, 'day');
        break;
      case 'all':
        data = {
          overview: await AnalyticsService.getOverview(),
          revenue: await AnalyticsService.getRevenueAnalytics(start, end, 'day'),
          students: await AnalyticsService.getStudentGrowthAnalytics(start, end, 'day'),
          sessions: await AnalyticsService.getSessionAnalytics(start, end, 'day'),
          topStudents: await AnalyticsService.getTopPerformingStudents(10)
        };
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid export type. Use: overview, revenue, students, sessions, or all'
        });
    }

    if (exportFormat === 'csv') {
      // For CSV export, we'll need to flatten the data
      // This is a simplified CSV export - in production you might want to use a proper CSV library
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="analytics-${type}-${start.toISOString().split('T')[0]}-${end.toISOString().split('T')[0]}.csv"`);
      
      if (Array.isArray(data)) {
        const csv = convertToCSV(data);
        res.send(csv);
      } else {
        res.status(400).json({
          success: false,
          error: 'CSV export only available for array data types'
        });
      }
    } else {
      // JSON export
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="analytics-${type}-${start.toISOString().split('T')[0]}-${end.toISOString().split('T')[0]}.json"`);
      
      res.status(200).json({
        success: true,
        data,
        meta: {
          type,
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          exportedAt: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    console.error('Error exporting analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export analytics data'
    });
  }
});

// Helper function to convert array data to CSV
function convertToCSV(data: any[]): string {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      // Escape commas and quotes in CSV
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );

  return [csvHeaders, ...csvRows].join('\n');
}

export default router;