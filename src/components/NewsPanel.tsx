import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Newspaper, 
  TrendingUp, 
  TrendingDown, 
  Building, 
  DollarSign,
  Globe,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  category: 'market' | 'economy' | 'policy' | 'business' | 'crypto' | 'real_estate';
  impact: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  effects: string[];
}

const newsCategories = {
  market: { icon: TrendingUp, label: 'Markets', color: 'text-chart-1' },
  economy: { icon: Globe, label: 'Economy', color: 'text-chart-2' },
  policy: { icon: Building, label: 'Policy', color: 'text-chart-3' },
  business: { icon: DollarSign, label: 'Business', color: 'text-chart-4' },
  crypto: { icon: Zap, label: 'Crypto', color: 'text-chart-5' },
  real_estate: { icon: Building, label: 'Real Estate', color: 'text-purple-500' }
};

const generateRandomNews = (): NewsItem => {
  const newsTemplates = [
    {
      headline: "Tech Stocks Rally on AI Breakthrough",
      summary: "Major tech companies see stock prices surge after announcing new AI capabilities.",
      category: "market" as const,
      impact: "positive" as const,
      effects: ["Tech stocks +5-8%", "AI companies +15%"]
    },
    {
      headline: "Federal Reserve Raises Interest Rates",
      summary: "Central bank increases rates by 0.25% to combat inflation concerns.",
      category: "policy" as const,
      impact: "negative" as const,
      effects: ["Loan rates increase", "Bond yields up", "Real estate cooling"]
    },
    {
      headline: "Cryptocurrency Market Volatility",
      summary: "Bitcoin and major altcoins experience significant price swings amid regulatory news.",
      category: "crypto" as const,
      impact: "negative" as const,
      effects: ["Crypto assets -10-20%", "Increased volatility"]
    },
    {
      headline: "Housing Market Shows Strong Growth",
      summary: "Home values continue to rise in major metropolitan areas despite higher rates.",
      category: "real_estate" as const,
      impact: "positive" as const,
      effects: ["Property values +3-5%", "Rental demand up"]
    },
    {
      headline: "Major Corporation Posts Record Earnings",
      summary: "Fortune 500 company beats expectations with strong quarterly results.",
      category: "business" as const,
      impact: "positive" as const,
      effects: ["Stock buybacks announced", "Dividend increase likely"]
    },
    {
      headline: "Supply Chain Disruptions Continue",
      summary: "Global shipping delays impact manufacturing and retail sectors.",
      category: "economy" as const,
      impact: "negative" as const,
      effects: ["Manufacturing stocks down", "Consumer goods prices up"]
    },
    {
      headline: "Green Energy Investment Surge",
      summary: "Renewable energy projects receive massive funding boost from government and private sectors.",
      category: "business" as const,
      impact: "positive" as const,
      effects: ["Green energy stocks +12%", "Traditional energy -3%"]
    },
    {
      headline: "Banking Sector Stress Test Results",
      summary: "Major banks pass regulatory stress tests with strong capital reserves.",
      category: "market" as const,
      impact: "positive" as const,
      effects: ["Bank stocks +4%", "Lending confidence up"]
    },
    {
      headline: "Trade War Concerns Escalate",
      summary: "New tariff proposals create uncertainty in international markets.",
      category: "economy" as const,
      impact: "negative" as const,
      effects: ["Export companies down", "Import costs rising"]
    },
    {
      headline: "Startup Unicorn IPO Success",
      summary: "Hot new technology company goes public with massive valuation.",
      category: "business" as const,
      impact: "positive" as const,
      effects: ["Tech IPO market heated", "Venture capital active"]
    }
  ];

  const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...template,
    timestamp: new Date()
  };
};

export function NewsPanel() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  // Generate initial news and periodic updates
  useEffect(() => {
    // Generate initial news items
    const initialNews = Array.from({ length: 5 }, generateRandomNews);
    setNewsItems(initialNews);

    // Generate new news every 30 seconds
    const newsInterval = setInterval(() => {
      if (Math.random() < 0.4) { // 40% chance of new news
        const newNews = generateRandomNews();
        setNewsItems(prev => [newNews, ...prev].slice(0, 10)); // Keep only latest 10
      }
    }, 30000);

    return () => clearInterval(newsInterval);
  }, []);

  const getImpactColor = (impact: NewsItem['impact']) => {
    switch (impact) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactIcon = (impact: NewsItem['impact']) => {
    switch (impact) {
      case 'positive': return TrendingUp;
      case 'negative': return TrendingDown;
      default: return AlertTriangle;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          Market News
        </CardTitle>
        <CardDescription>
          Latest economic and market developments affecting your investments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {newsItems.map((news) => {
              const CategoryIcon = newsCategories[news.category].icon;
              const ImpactIcon = getImpactIcon(news.impact);
              
              return (
                <div key={news.id} className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-card rounded">
                        <CategoryIcon className={`h-3 w-3 ${newsCategories[news.category].color}`} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {newsCategories[news.category].label}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <ImpactIcon className={`h-3 w-3 ${getImpactColor(news.impact)}`} />
                        <span className={`text-xs ${getImpactColor(news.impact)}`}>
                          {news.impact}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(news.timestamp)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm leading-tight">{news.headline}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{news.summary}</p>
                  </div>

                  {news.effects.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground">Market Effects:</div>
                      <div className="flex flex-wrap gap-1">
                        {news.effects.map((effect, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}