import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
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

interface QuickActionsProps {
  onNavigateToBankLoans?: () => void;
}

export function QuickActions({ onNavigateToBankLoans }: QuickActionsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAction = async (actionId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue",
        variant: "destructive"
      });
      return;
    }

    try {
      switch (actionId) {
        case 'job':
          await handleGetJob();
          break;
        case 'course':
          await handleTakeCourse();
          break;
        case 'invest':
          await handleInvest();
          break;
        case 'loan':
          if (onNavigateToBankLoans) {
            onNavigateToBankLoans();
          } else {
            await handleLoan();
          }
          break;
        case 'trade':
          toast({
            title: "Trading Hub",
            description: "Navigate to Trading Hub section to start trading"
          });
          break;
        default:
          console.log(`Action triggered: ${actionId}`);
      }
    } catch (error) {
      console.error('Action failed:', error);
      toast({
        title: "Action Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleGetJob = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        title: 'New Position',
        company: 'Tech Corp',
        salary: 75000,
        level: 'mid',
        experience_months: 24
      });

    if (error) throw error;
    
    toast({
      title: "Job Applied!",
      description: "You've successfully applied for a new position with $75,000 salary"
    });
  };

  const handleTakeCourse = async () => {
    navigate('/virtual-academy');
  };

  const handleInvest = async () => {
    try {
      navigate('/asset-marketplace');
    } catch (error) {
      toast({
        title: "Navigation Failed",
        description: "Unable to navigate to Asset Marketplace. Please try again.",
        variant: "destructive"
      });
      console.error(error);
    }
  };

  const handleLoan = async () => {
    navigate('/banking-system', { state: { tab: 'bank' } });
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