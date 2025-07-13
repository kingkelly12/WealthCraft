import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  Building, 
  Car, 
  TrendingUp, 
  Coins, 
  Factory,
  Plane,
  Ship,
  ChevronUp,
  ChevronDown,
  DollarSign,
  Percent,
  Timer,
  Users
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  category: 'real_estate' | 'business' | 'vehicle' | 'stocks' | 'crypto' | 'luxury';
  price: number;
  priceChange: number;
  priceChangePercent: number;
  monthlyIncome?: number;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  roi?: number;
  timeToReturn?: string;
  availability: number;
  totalSupply: number;
}

const marketAssets: Asset[] = [
  // Real Estate
  {
    id: 'house_1',
    name: 'Downtown Apartment',
    category: 'real_estate',
    price: 180000,
    priceChange: 2400,
    priceChangePercent: 1.35,
    monthlyIncome: 1200,
    description: 'Prime location rental property with steady cash flow',
    riskLevel: 'low',
    roi: 8.0,
    timeToReturn: '2-3 years',
    availability: 3,
    totalSupply: 12
  },
  {
    id: 'house_2',
    name: 'Beachfront Villa',
    category: 'real_estate',
    price: 850000,
    priceChange: -12000,
    priceChangePercent: -1.39,
    monthlyIncome: 4200,
    description: 'Luxury vacation rental with high seasonal demand',
    riskLevel: 'medium',
    roi: 5.9,
    timeToReturn: '3-5 years',
    availability: 1,
    totalSupply: 3
  },
  // Businesses
  {
    id: 'biz_1',
    name: 'Coffee Shop Franchise',
    category: 'business',
    price: 120000,
    priceChange: 800,
    priceChangePercent: 0.67,
    monthlyIncome: 3200,
    description: 'Established franchise with proven business model',
    riskLevel: 'medium',
    roi: 32.0,
    timeToReturn: '3 years',
    availability: 5,
    totalSupply: 20
  },
  {
    id: 'biz_2',
    name: 'Tech Startup (20% Equity)',
    category: 'business',
    price: 50000,
    priceChange: 15000,
    priceChangePercent: 42.86,
    description: 'High-growth potential AI startup',
    riskLevel: 'high',
    roi: 150.0,
    timeToReturn: '5-7 years',
    availability: 2,
    totalSupply: 5
  },
  // Vehicles
  {
    id: 'car_1',
    name: 'Luxury SUV',
    category: 'vehicle',
    price: 85000,
    priceChange: -1200,
    priceChangePercent: -1.39,
    monthlyIncome: 800,
    description: 'Premium vehicle for ride-sharing or rental business',
    riskLevel: 'medium',
    roi: 11.3,
    availability: 4,
    totalSupply: 15
  },
  {
    id: 'car_2',
    name: 'Classic Sports Car',
    category: 'vehicle',
    price: 150000,
    priceChange: 8000,
    priceChangePercent: 5.63,
    description: 'Appreciating collectible with event rental potential',
    riskLevel: 'high',
    roi: 12.0,
    availability: 1,
    totalSupply: 2
  },
  // Stocks
  {
    id: 'stock_1',
    name: 'Tech Growth Portfolio',
    category: 'stocks',
    price: 10000,
    priceChange: 450,
    priceChangePercent: 4.71,
    monthlyIncome: 25,
    description: 'Diversified tech stocks with dividend yield',
    riskLevel: 'medium',
    roi: 15.2,
    availability: 100,
    totalSupply: 1000
  },
  {
    id: 'stock_2',
    name: 'Blue Chip Dividend Fund',
    category: 'stocks',
    price: 5000,
    priceChange: 50,
    priceChangePercent: 1.01,
    monthlyIncome: 180,
    description: 'Stable dividend-paying stocks',
    riskLevel: 'low',
    roi: 8.5,
    availability: 200,
    totalSupply: 500
  },
  // Crypto
  {
    id: 'crypto_1',
    name: 'Bitcoin Package',
    category: 'crypto',
    price: 25000,
    priceChange: -2800,
    priceChangePercent: -10.07,
    description: '0.5 BTC at current market price',
    riskLevel: 'high',
    roi: 45.0,
    availability: 50,
    totalSupply: 100
  },
  {
    id: 'crypto_2',
    name: 'Ethereum Staking Pool',
    category: 'crypto',
    price: 15000,
    priceChange: 900,
    priceChangePercent: 6.38,
    monthlyIncome: 150,
    description: 'Staked ETH with monthly rewards',
    riskLevel: 'high',
    roi: 12.0,
    availability: 30,
    totalSupply: 75
  },
  // Luxury
  {
    id: 'luxury_1',
    name: 'Private Jet Share (1/8)',
    category: 'luxury',
    price: 450000,
    priceChange: 5000,
    priceChangePercent: 1.12,
    monthlyIncome: 2800,
    description: 'Fractional ownership with charter income potential',
    riskLevel: 'high',
    roi: 7.5,
    availability: 1,
    totalSupply: 1
  }
];

const categoryConfig = {
  real_estate: { icon: Home, label: 'Real Estate', color: 'text-chart-1' },
  business: { icon: Building, label: 'Businesses', color: 'text-chart-2' },
  vehicle: { icon: Car, label: 'Vehicles', color: 'text-chart-3' },
  stocks: { icon: TrendingUp, label: 'Stocks', color: 'text-chart-4' },
  crypto: { icon: Coins, label: 'Crypto', color: 'text-chart-5' },
  luxury: { icon: Plane, label: 'Luxury', color: 'text-purple-500' }
};

const riskColors = {
  low: 'text-success',
  medium: 'text-warning',
  high: 'text-danger'
};

export function AssetMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAssets = selectedCategory === 'all' 
    ? marketAssets 
    : marketAssets.filter(asset => asset.category === selectedCategory);

  const handleBuyAsset = (asset: Asset) => {
    // TODO: Implement purchase logic
    console.log('Buying asset:', asset);
  };

  const handleBidAsset = (asset: Asset) => {
    // TODO: Implement bidding logic
    console.log('Bidding on asset:', asset);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="h-5 w-5 text-primary" />
          Asset Marketplace
        </CardTitle>
        <CardDescription>
          Buy, sell, and trade assets to build your wealth portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-1">
                <config.icon className="h-3 w-3" />
                <span className="hidden sm:inline">{config.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid gap-4">
              {filteredAssets.map((asset) => {
                const CategoryIcon = categoryConfig[asset.category].icon;
                return (
                  <div key={asset.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="p-3 bg-card rounded-md">
                          <CategoryIcon className={`h-5 w-5 ${categoryConfig[asset.category].color}`} />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{asset.name}</h3>
                            <Badge variant="outline" className={riskColors[asset.riskLevel]}>
                              {asset.riskLevel} risk
                            </Badge>
                            {asset.availability <= 3 && (
                              <Badge variant="destructive">Limited</Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground">{asset.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              <span>${asset.price.toLocaleString()}</span>
                            </div>
                            
                            {asset.monthlyIncome && (
                              <div className="flex items-center gap-1 text-success">
                                <Timer className="h-3 w-3" />
                                <span>${asset.monthlyIncome}/month</span>
                              </div>
                            )}
                            
                            {asset.roi && (
                              <div className="flex items-center gap-1">
                                <Percent className="h-3 w-3" />
                                <span>{asset.roi}% ROI</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{asset.availability}/{asset.totalSupply} available</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-3">
                        <div className="space-y-1">
                          <div className="text-xl font-bold">
                            ${asset.price.toLocaleString()}
                          </div>
                          <div className={`flex items-center gap-1 text-sm ${
                            asset.priceChange > 0 ? 'text-success' : 'text-danger'
                          }`}>
                            {asset.priceChange > 0 ? (
                              <ChevronUp className="h-3 w-3" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            )}
                            <span>{Math.abs(asset.priceChangePercent)}%</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleBidAsset(asset)}
                          >
                            Bid
                          </Button>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleBuyAsset(asset)}
                            disabled={asset.availability === 0}
                          >
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}