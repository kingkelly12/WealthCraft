import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Briefcase, 
  GraduationCap, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'job' | 'course' | 'payment' | 'achievement' | 'warning';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'job',
    title: 'Job Offer Available',
    description: 'Senior Developer position at TechCorp - $95k/year',
    timestamp: '2 hours ago',
    priority: 'high',
    actionable: true
  },
  {
    id: '2',
    type: 'course',
    title: 'Course Completed',
    description: 'Advanced JavaScript certification earned',
    timestamp: '1 day ago',
    priority: 'medium',
    actionable: false
  },
  {
    id: '3',
    type: 'payment',
    title: 'Loan Payment Due',
    description: 'Student loan payment of $320 due in 3 days',
    timestamp: '3 days ago',
    priority: 'high',
    actionable: true
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Milestone Reached',
    description: 'Congratulations! You reached $100k net worth',
    timestamp: '5 days ago',
    priority: 'low',
    actionable: false
  },
  {
    id: '5',
    type: 'warning',
    title: 'High Credit Utilization',
    description: 'Credit card usage above 70% - consider paying down',
    timestamp: '1 week ago',
    priority: 'medium',
    actionable: true
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'job':
      return <Briefcase className="h-4 w-4" />;
    case 'course':
      return <GraduationCap className="h-4 w-4" />;
    case 'payment':
      return <DollarSign className="h-4 w-4" />;
    case 'achievement':
      return <CheckCircle className="h-4 w-4" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: Notification['priority']) => {
  switch (priority) {
    case 'high':
      return 'text-danger';
    case 'medium':
      return 'text-warning';
    case 'low':
      return 'text-success';
    default:
      return 'text-muted-foreground';
  }
};

export function NotificationsPanel() {
  const handleNotificationAction = (notificationId: string) => {
    // TODO: Implement notification action handlers
    console.log(`Notification action triggered: ${notificationId}`);
  };

  const handleDismiss = (notificationId: string) => {
    // TODO: Implement notification dismissal
    console.log(`Notification dismissed: ${notificationId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </div>
          <Badge variant="secondary" className="text-xs">
            {notifications.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            <div className={`p-1 rounded-full ${getPriorityColor(notification.priority)}`}>
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleDismiss(notification.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              {notification.actionable && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 h-7 text-xs"
                  onClick={() => handleNotificationAction(notification.id)}
                >
                  Take Action
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No new notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}