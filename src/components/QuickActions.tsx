import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
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
  const { user } = useAuth();
  const { toast } = useToast();

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
          await handleLoan();
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
    // Get a random course
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .limit(1);

    if (coursesError || !courses?.length) {
      toast({
        title: "No Courses Available",
        description: "Please try again later",
        variant: "destructive"
      });
      return;
    }

    const course = courses[0];
    
    const { data, error } = await supabase
      .from('user_courses')
      .insert({
        user_id: user.id,
        course_id: course.id,
        progress: 0
      });

    if (error) throw error;
    
    toast({
      title: "Course Enrolled!",
      description: `You've enrolled in ${course.title} for $${course.cost}`
    });
  };

  const handleInvest = async () => {
    const { data, error } = await supabase
      .from('user_assets')
      .insert({
        user_id: user.id,
        name: 'Tech Stock Portfolio',
        asset_type: 'stocks',
        value: 10000,
        quantity: 100
      });

    if (error) throw error;
    
    toast({
      title: "Investment Made!",
      description: "You've invested $10,000 in a tech stock portfolio"
    });
  };

  const handleLoan = async () => {
    const { data, error } = await supabase
      .from('loans')
      .insert({
        lender_id: user.id,
        amount: 25000,
        interest_rate: 8.5,
        term_months: 36,
        purpose: 'Business expansion',
        status: 'pending'
      });

    if (error) throw error;
    
    toast({
      title: "Loan Application Submitted!",
      description: "Your application for $25,000 at 8.5% APR has been submitted"
    });
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