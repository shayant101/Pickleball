import React from 'react';
import { TrendingUp, AlertTriangle, Lightbulb, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BusinessInsights } from '@/types/analytics';

interface BusinessInsightsPanelProps {
  insights: BusinessInsights;
}

const BusinessInsightsPanel: React.FC<BusinessInsightsPanelProps> = ({ insights }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'revenue': return <TrendingUp className="h-4 w-4" />;
      case 'students': return <CheckCircle className="h-4 w-4" />;
      case 'operations': return <AlertTriangle className="h-4 w-4" />;
      case 'marketing': return <Lightbulb className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            Business Recommendations
          </CardTitle>
          <CardDescription>AI-powered insights to grow your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.recommendations.map((recommendation) => (
              <div key={recommendation.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(recommendation.category)}
                    <h4 className="font-medium">{recommendation.title}</h4>
                  </div>
                  <Badge className={getPriorityColor(recommendation.priority)}>
                    {recommendation.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Business Alerts
          </CardTitle>
          <CardDescription>Important updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.alerts.map((alert) => (
              <Alert key={alert.id} className={
                alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                alert.type === 'error' ? 'border-red-200 bg-red-50' :
                alert.type === 'success' ? 'border-green-200 bg-green-50' :
                'border-blue-200 bg-blue-50'
              }>
                {getAlertIcon(alert.type)}
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription className="mt-1">
                  {alert.message}
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.date).toLocaleDateString()}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessInsightsPanel;