import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Crown, 
  Medal, 
  TrendingUp, 
  CreditCard, 
  DollarSign,
  Star,
  Timer,
  Award
} from 'lucide-react';

// Mock leaderboard data
const leaderboardData = {
  netWorth: [
    { rank: 1, name: "Sarah Chen", avatar: "/avatars/sarah.jpg", value: 2450000, change: "+12.5%", badge: "Millionaire" },
    { rank: 2, name: "Marcus Williams", avatar: "/avatars/marcus.jpg", value: 1890000, change: "+8.2%", badge: "Elite Investor" },
    { rank: 3, name: "Elena Rodriguez", avatar: "/avatars/elena.jpg", value: 1650000, change: "+15.1%", badge: "Real Estate Mogul" },
    { rank: 4, name: "David Kim", avatar: "/avatars/david.jpg", value: 1420000, change: "+6.8%", badge: "Tech Entrepreneur" },
    { rank: 5, name: "Kelly Koome", avatar: "/avatars/kelly.jpg", value: 125750, change: "+7.2%", badge: "Rising Star", isUser: true }
  ],
  income: [
    { rank: 1, name: "Marcus Williams", avatar: "/avatars/marcus.jpg", value: 45000, change: "+22%", badge: "Income King" },
    { rank: 2, name: "Sarah Chen", avatar: "/avatars/sarah.jpg", value: 38500, change: "+18%", badge: "Passive Income Pro" },
    { rank: 3, name: "David Kim", avatar: "/avatars/david.jpg", value: 32000, change: "+25%", badge: "Business Builder" },
    { rank: 4, name: "Elena Rodriguez", avatar: "/avatars/elena.jpg", value: 28750, change: "+12%", badge: "Rental Queen" },
    { rank: 5, name: "Kelly Koome", avatar: "/avatars/kelly.jpg", value: 5800, change: "+7%", badge: "Growing Fast", isUser: true }
  ],
  creditScore: [
    { rank: 1, name: "Elena Rodriguez", avatar: "/avatars/elena.jpg", value: 850, change: "+2", badge: "Credit Master" },
    { rank: 2, name: "Sarah Chen", avatar: "/avatars/sarah.jpg", value: 835, change: "+5", badge: "Financial Guru" },
    { rank: 3, name: "David Kim", avatar: "/avatars/david.jpg", value: 820, change: "+8", badge: "Debt Slayer" },
    { rank: 4, name: "Marcus Williams", avatar: "/avatars/marcus.jpg", value: 795, change: "+3", badge: "Credit Builder" },
    { rank: 5, name: "Kelly Koome", avatar: "/avatars/kelly.jpg", value: 720, change: "+15", badge: "Improving", isUser: true }
  ]
};

const seasonInfo = {
  current: 3,
  timeLeft: "12 days",
  rewards: ["Golden Trophy", "Exclusive Avatar", "Early Access Pass", "Premium Badge"]
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2: return <Medal className="h-5 w-5 text-gray-400" />;
    case 3: return <Medal className="h-5 w-5 text-amber-600" />;
    default: return <span className="text-muted-foreground font-bold">{rank}</span>;
  }
};

const formatValue = (value: number, type: string) => {
  switch (type) {
    case 'netWorth':
    case 'income':
      return `$${value.toLocaleString()}`;
    case 'creditScore':
      return value.toString();
    default:
      return value.toString();
  }
};

export function Leaderboards() {
  const [activeTab, setActiveTab] = useState("netWorth");

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Leaderboards
            </CardTitle>
            <CardDescription>Compete with players worldwide</CardDescription>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-1">Season {seasonInfo.current}</Badge>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {seasonInfo.timeLeft} left
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="netWorth" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Net Worth
            </TabsTrigger>
            <TabsTrigger value="income" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Monthly Income
            </TabsTrigger>
            <TabsTrigger value="creditScore" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Credit Score
            </TabsTrigger>
          </TabsList>

          {Object.entries(leaderboardData).map(([category, players]) => (
            <TabsContent key={category} value={category} className="space-y-3 mt-4">
              {players.map((player, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    player.isUser 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getRankIcon(player.rank)}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className={`font-medium ${player.isUser ? 'text-primary' : ''}`}>
                        {player.name}
                        {player.isUser && <span className="text-xs ml-2">(You)</span>}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {player.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatValue(player.value, category)}
                    </div>
                    <div className="text-sm text-success">
                      {player.change}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Season Rewards */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Season {seasonInfo.current} Rewards</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {seasonInfo.rewards.map((reward, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{reward}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            View Full Rewards
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}