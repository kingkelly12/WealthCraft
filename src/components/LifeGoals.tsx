import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Home, 
  Plane, 
  GraduationCap, 
  Baby, 
  Car, 
  Briefcase,
  Target,
  Calendar,
  DollarSign,
  Trophy,
  Plus
} from 'lucide-react';

// Mock life goals data
const lifeGoals = [
  {
    id: 1,
    title: "Buy Dream Home",
    description: "Save for a $450,000 house with 20% down payment",
    category: "property",
    icon: Home,
    targetAmount: 90000,
    currentAmount: 23500,
    deadline: "2026-08-15",
    priority: "high",
    rewards: ["Property Master Badge", "500 XP", "Exclusive Home Decor"]
  },
  {
    id: 2,
    title: "European Vacation",
    description: "3-week European adventure for the family",
    category: "travel",
    icon: Plane,
    targetAmount: 15000,
    currentAmount: 8200,
    deadline: "2025-06-01",
    priority: "medium",
    rewards: ["World Traveler Badge", "200 XP", "Travel Photo Album"]
  },
  {
    id: 3,
    title: "Emergency Fund",
    description: "6 months of expenses saved",
    category: "security",
    icon: Target,
    targetAmount: 35000,
    currentAmount: 15400,
    deadline: "2025-12-31",
    priority: "high",
    rewards: ["Safety Net Badge", "300 XP", "Peace of Mind"]
  },
  {
    id: 4,
    title: "Start a Family",
    description: "Prepare financially for a new baby",
    category: "family",
    icon: Baby,
    targetAmount: 25000,
    currentAmount: 5600,
    deadline: "2026-03-01",
    priority: "medium",
    rewards: ["Family First Badge", "400 XP", "Baby Starter Kit"]
  }
];

const familyMembers = [
  { name: "Alex", role: "You", avatar: "/avatars/alex.jpg", age: 28, profession: "Software Developer" },
  { name: "Jordan", role: "Partner", avatar: "/avatars/jordan.jpg", age: 26, profession: "Marketing Manager" },
  { name: "Max", role: "Pet", avatar: "/avatars/dog.jpg", age: 3, profession: "Good Boy" }
];

const retirementGoal = {
  targetAge: 55,
  currentAge: 28,
  targetAmount: 2000000,
  currentAmount: 32000,
  monthlyContribution: 1200
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-500';
    case 'medium': return 'text-yellow-500';
    case 'low': return 'text-green-500';
    default: return 'text-muted-foreground';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'property': return Home;
    case 'travel': return Plane;
    case 'security': return Target;
    case 'family': return Baby;
    case 'education': return GraduationCap;
    case 'career': return Briefcase;
    default: return Target;
  }
};

export function LifeGoals() {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 365) {
      return `${Math.floor(diffDays / 365)} years`;
    } else if (diffDays > 30) {
      return `${Math.floor(diffDays / 30)} months`;
    } else {
      return `${diffDays} days`;
    }
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Virtual Family */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Your Family
          </CardTitle>
          <CardDescription>The people that matter most</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {familyMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{member.profession}</div>
                  <div className="text-xs text-muted-foreground">Age {member.age}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Life Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Life Goals
              </CardTitle>
              <CardDescription>Your dreams and aspirations</CardDescription>
            </div>
            <Button size="sm" variant="outline" onClick={() => console.log('Adding new life goal')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {lifeGoals.map((goal) => {
            const IconComponent = getCategoryIcon(goal.category);
            const progress = getProgress(goal.currentAmount, goal.targetAmount);
            const timeLeft = getTimeRemaining(goal.deadline);
            
            return (
              <div 
                key={goal.id} 
                className="p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-card rounded-md">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{goal.title}</div>
                      <div className="text-sm text-muted-foreground">{goal.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {timeLeft}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {progress.toFixed(1)}% complete
                  </div>
                </div>

                {selectedGoal === goal.id && (
                  <div className="mt-4 p-3 bg-card rounded border-l-4 border-primary">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      Rewards
                    </h4>
                    <div className="space-y-1">
                      {goal.rewards.map((reward, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {reward}
                        </div>
                      ))}
                    </div>
                    <Button size="sm" className="mt-3 w-full" onClick={() => console.log('Contributing to goal:', goal.id)}>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Contribute Now
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Retirement Planning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-500" />
            Early Retirement Goal
          </CardTitle>
          <CardDescription>Financial independence by age {retirementGoal.targetAge}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {retirementGoal.targetAge - retirementGoal.currentAge}
              </div>
              <div className="text-sm text-muted-foreground">Years to go</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-success">
                ${retirementGoal.monthlyContribution.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Monthly saving</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Retirement Fund</span>
              <span className="font-medium">
                ${retirementGoal.currentAmount.toLocaleString()} / ${retirementGoal.targetAmount.toLocaleString()}
              </span>
            </div>
            <Progress 
              value={getProgress(retirementGoal.currentAmount, retirementGoal.targetAmount)} 
              className="h-3" 
            />
            <div className="text-xs text-muted-foreground text-right">
              {getProgress(retirementGoal.currentAmount, retirementGoal.targetAmount).toFixed(1)}% complete
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => console.log('Adjusting retirement plan')}>
            <Briefcase className="h-4 w-4 mr-2" />
            Adjust Retirement Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}