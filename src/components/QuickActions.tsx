import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  CreditCard, 
  Users,
  Plus
} from 'lucide-react';

const quickActions = [
  {
    id: 'job',
    title: 'Get Job',
    description: 'Find new opportunities',
    icon: Briefcase,
    variant: 'financial' as const,
    disabled: false
  },
  {
    id: 'course',
    title: 'Take Course',
    description: 'Improve your skills',
    icon: GraduationCap,
    variant: 'success' as const,
    disabled: false
  },
  {
    id: 'invest',
    title: 'Invest',
    description: 'Grow your wealth',
    icon: TrendingUp,
    variant: 'default' as const,
    disabled: false
  },
  {
    id: 'loan',
    title: 'Borrow Loan',
    description: 'Access capital',
    icon: CreditCard,
    variant: 'warning' as const,
    disabled: false
  },
  {
    id: 'trade',
    title: 'Trade',
    description: 'Multiplayer market',
    icon: Users,
    variant: 'outline' as const,
    disabled: true // Disabled for solo mode
  }
];

export function QuickActions() {
  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'job':
        // TODO: Navigate to job application or create job record
        console.log('Getting job...');
        break;
      case 'course':
        // TODO: Navigate to course selection or enroll in course
        console.log('Taking course...');
        break;
      case 'invest':
        // TODO: Navigate to investment options or make investment
        console.log('Making investment...');
        break;
      case 'loan':
        // TODO: Navigate to loan application or create loan request
        console.log('Applying for loan...');
        break;
      case 'trade':
        // TODO: Navigate to trading hub
        console.log('Trading...');
        break;
      default:
        console.log(`Action triggered: ${actionId}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            className="w-full justify-start h-auto p-4"
            onClick={() => handleAction(action.id)}
            disabled={action.disabled}
          >
            <div className="flex items-center gap-3 w-full">
              <action.icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs opacity-75">{action.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}