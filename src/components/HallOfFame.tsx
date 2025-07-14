import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp, 
  Calendar, 
  Award,
  Zap,
  Target,
  DollarSign
} from 'lucide-react';

// Mock Hall of Fame data
const hallOfFameData = {
  legends: [
    {
      id: 1,
      name: "The Wealth Wizard",
      realName: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      title: "Legendary Investor",
      achievements: ["First to $10M", "Perfect Credit Master", "Real Estate Empire"],
      peakNetWorth: 15750000,
      seasonsActive: 8,
      totalWins: 12,
      specialBadges: ["Diamond Legend", "Wealth Master", "Investment Guru"]
    },
    {
      id: 2,
      name: "CryptoKing Marcus",
      realName: "Marcus Williams",
      avatar: "/avatars/marcus.jpg",
      title: "Digital Asset Pioneer",
      achievements: ["Crypto Millionaire", "Tech Entrepreneur", "Innovation Leader"],
      peakNetWorth: 8920000,
      seasonsActive: 6,
      totalWins: 8,
      specialBadges: ["Crypto Pioneer", "Tech Visionary", "Risk Taker"]
    },
    {
      id: 3,
      name: "Property Queen",
      realName: "Elena Rodriguez",
      avatar: "/avatars/elena.jpg",
      title: "Real Estate Mogul",
      achievements: ["Property Empire", "Rental Income Champion", "Market Predictor"],
      peakNetWorth: 6340000,
      seasonsActive: 7,
      totalWins: 10,
      specialBadges: ["Property Master", "Rental Royalty", "Market Oracle"]
    }
  ],
  seasonChampions: [
    { season: 2, winner: "Sarah Chen", achievement: "Perfect Season", netWorth: 12500000 },
    { season: 1, winner: "Marcus Williams", achievement: "Crypto Breakthrough", netWorth: 8200000 }
  ],
  recordHolders: [
    { category: "Highest Net Worth", holder: "Sarah Chen", value: "$15.75M", season: 3 },
    { category: "Fastest Millionaire", holder: "David Kim", value: "18 months", season: 2 },
    { category: "Perfect Credit Score", holder: "Elena Rodriguez", value: "850 for 12 months", season: 2 },
    { category: "Most Properties", holder: "Elena Rodriguez", value: "47 properties", season: 3 },
    { category: "Highest Monthly Income", holder: "Marcus Williams", value: "$68,500", season: 2 }
  ]
};

const prestigeBadges = [
  { name: "Diamond Legend", rarity: "Mythical", description: "Achieved legendary status across multiple seasons" },
  { name: "Wealth Master", rarity: "Legendary", description: "Mastered all aspects of wealth building" },
  { name: "Perfect Season", rarity: "Epic", description: "Won every monthly competition in a season" },
  { name: "Innovation Pioneer", rarity: "Rare", description: "First to discover new investment strategies" }
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Mythical': return 'text-purple-500 border-purple-500';
    case 'Legendary': return 'text-yellow-500 border-yellow-500';
    case 'Epic': return 'text-blue-500 border-blue-500';
    case 'Rare': return 'text-green-500 border-green-500';
    default: return 'text-muted-foreground border-muted';
  }
};

export function HallOfFame() {
  const [selectedLegend, setSelectedLegend] = useState<number | null>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          Hall of Fame
        </CardTitle>
        <CardDescription>Legendary players who shaped WealthCraft history</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="legends" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="legends">Legends</TabsTrigger>
            <TabsTrigger value="champions">Champions</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
          </TabsList>

          <TabsContent value="legends" className="space-y-4 mt-4">
            {hallOfFameData.legends.map((legend) => (
              <div 
                key={legend.id}
                className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20 cursor-pointer hover:border-yellow-500/40 transition-colors"
                onClick={() => setSelectedLegend(selectedLegend === legend.id ? null : legend.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-yellow-500">
                      <AvatarImage src={legend.avatar} alt={legend.name} />
                      <AvatarFallback>{legend.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-lg">{legend.name}</div>
                      <div className="text-sm text-muted-foreground">{legend.realName}</div>
                      <Badge variant="outline" className="mt-1 border-yellow-500 text-yellow-500">
                        {legend.title}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">
                      ${(legend.peakNetWorth / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-muted-foreground">Peak Net Worth</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{legend.seasonsActive}</div>
                    <div className="text-xs text-muted-foreground">Seasons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{legend.totalWins}</div>
                    <div className="text-xs text-muted-foreground">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{legend.specialBadges.length}</div>
                    <div className="text-xs text-muted-foreground">Special Badges</div>
                  </div>
                </div>

                {selectedLegend === legend.id && (
                  <div className="mt-4 space-y-3 border-t border-yellow-500/20 pt-3">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        Major Achievements
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {legend.achievements.map((achievement, index) => (
                          <div key={index} className="text-sm flex items-center gap-2">
                            <Star className="h-3 w-3 text-yellow-500" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Special Badges
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {legend.specialBadges.map((badge, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-yellow-500 text-yellow-500">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="champions" className="space-y-4 mt-4">
            <div className="space-y-3">
              {hallOfFameData.seasonChampions.map((champion, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-full">
                      <Crown className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <div className="font-semibold">Season {champion.season} Champion</div>
                      <div className="text-sm text-muted-foreground">{champion.winner}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${(champion.netWorth / 1000000).toFixed(1)}M</div>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {champion.achievement}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-4 mt-4">
            <div className="space-y-3">
              {hallOfFameData.recordHolders.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-md">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{record.category}</div>
                      <div className="text-sm text-muted-foreground">
                        {record.holder} • Season {record.season}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{record.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Prestige Badges Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            Prestige Badges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prestigeBadges.map((badge, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getRarityColor(badge.rarity)} bg-card/50`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{badge.name}</span>
                  <Badge variant="outline" className={getRarityColor(badge.rarity)}>
                    {badge.rarity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}