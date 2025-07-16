import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, Clock, DollarSign, TrendingUp, Briefcase, Home, Zap } from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: string;
  duration: number; // weeks
  cost: number;
  expectedROI: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  unlocks: string[];
  progress?: number;
  enrolled?: boolean;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Stock Market Fundamentals',
    category: 'Investing',
    duration: 4,
    cost: 2500,
    expectedROI: 15,
    difficulty: 'Beginner',
    skills: ['Financial Analysis', 'Risk Assessment'],
    unlocks: ['Advanced Trading', 'Portfolio Management']
  },
  {
    id: '2',
    title: 'Real Estate Investment',
    category: 'Real Estate',
    duration: 6,
    cost: 4500,
    expectedROI: 25,
    difficulty: 'Intermediate',
    skills: ['Property Valuation', 'Market Analysis'],
    unlocks: ['Commercial Real Estate', 'REITs Trading']
  },
  {
    id: '3',
    title: 'Cryptocurrency Trading',
    category: 'Crypto',
    duration: 3,
    cost: 1800,
    expectedROI: 40,
    difficulty: 'Advanced',
    skills: ['Technical Analysis', 'Blockchain Technology'],
    unlocks: ['DeFi Protocols', 'NFT Trading']
  },
  {
    id: '4',
    title: 'Business Management',
    category: 'Business',
    duration: 8,
    cost: 6000,
    expectedROI: 30,
    difficulty: 'Intermediate',
    skills: ['Leadership', 'Operations Management'],
    unlocks: ['Franchise Ownership', 'Startup Investment']
  },
  {
    id: '5',
    title: 'Advanced Programming',
    category: 'Technology',
    duration: 12,
    cost: 8500,
    expectedROI: 50,
    difficulty: 'Advanced',
    skills: ['Software Development', 'AI/ML'],
    unlocks: ['Tech Startup', 'Freelance Consulting'],
    progress: 35,
    enrolled: true
  }
];

export default function VirtualAcademy() {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['5']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Investing', 'Real Estate', 'Crypto', 'Business', 'Technology'];
  
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const handleEnroll = (courseId: string) => {
    // TODO: Implement course enrollment with database
    console.log('Enrolling in course:', courseId);
    setEnrolledCourses(prev => [...prev, courseId]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success';
      case 'Intermediate': return 'bg-warning';
      case 'Advanced': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Investing': return TrendingUp;
      case 'Real Estate': return Home;
      case 'Business': return Briefcase;
      case 'Technology': return Zap;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Virtual Academy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-6 w-full">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-4">
              {/* Enrolled Courses */}
              {enrolledCourses.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-accent" />
                    My Courses
                  </h3>
                  {courses
                    .filter(course => enrolledCourses.includes(course.id))
                    .map((course) => (
                      <Card key={course.id} className="border-accent/30">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">{course.category}</p>
                            </div>
                            <Badge className={getDifficultyColor(course.difficulty)}>
                              {course.difficulty}
                            </Badge>
                          </div>
                          
                          {course.progress && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}

              {/* Available Courses */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Available Courses</h3>
                <div className="grid gap-4">
                  {filteredCourses
                    .filter(course => !enrolledCourses.includes(course.id))
                    .map((course) => {
                      const Icon = getCategoryIcon(course.category);
                      return (
                        <Card key={course.id} className="hover:border-primary/40 transition-colors">
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-start gap-3">
                                <Icon className="w-5 h-5 text-primary mt-1" />
                                <div>
                                  <h4 className="font-medium">{course.title}</h4>
                                  <p className="text-sm text-muted-foreground mb-2">{course.category}</p>
                                  
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {course.skills.map((skill) => (
                                      <Badge key={skill} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <Badge className={getDifficultyColor(course.difficulty)}>
                                {course.difficulty}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{course.duration}w</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                <span>${course.cost.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-success" />
                                <span>+{course.expectedROI}% ROI</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Unlocks:</p>
                              <div className="flex flex-wrap gap-1">
                                {course.unlocks.map((unlock) => (
                                  <Badge key={unlock} variant="secondary" className="text-xs">
                                    {unlock}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button 
                              onClick={() => handleEnroll(course.id)}
                              className="w-full mt-4"
                              variant="premium"
                            >
                              Enroll - ${course.cost.toLocaleString()}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}