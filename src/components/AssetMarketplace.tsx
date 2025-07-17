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
  {
    id: 'house_3',
    name: 'Suburban Family Home',
    category: 'real_estate',
    price: 320000,
    priceChange: 1500,
    priceChangePercent: 0.47,
    monthlyIncome: 1500,
    description: 'Comfortable home in a growing neighborhood',
    riskLevel: 'low',
    roi: 7.0,
    timeToReturn: '3-4 years',
    availability: 4,
    totalSupply: 10
  },
  {
    id: 'house_4',
    name: 'Downtown Loft',
    category: 'real_estate',
    price: 450000,
    priceChange: 3000,
    priceChangePercent: 0.67,
    monthlyIncome: 2000,
    description: 'Modern loft in the city center',
    riskLevel: 'medium',
    roi: 6.5,
    timeToReturn: '4-5 years',
    availability: 2,
    totalSupply: 5
  },
  {
    id: 'house_5',
    name: 'Mountain Cabin',
    category: 'real_estate',
    price: 280000,
    priceChange: 1200,
    priceChangePercent: 0.43,
    monthlyIncome: 1100,
    description: 'Cozy cabin with scenic views',
    riskLevel: 'medium',
    roi: 6.8,
    timeToReturn: '4-6 years',
    availability: 3,
    totalSupply: 7
  },
  {
    id: 'house_6',
    name: 'Urban Studio',
    category: 'real_estate',
    price: 220000,
    priceChange: 900,
    priceChangePercent: 0.41,
    monthlyIncome: 900,
    description: 'Compact studio apartment in a vibrant area',
    riskLevel: 'low',
    roi: 7.2,
    timeToReturn: '3-4 years',
    availability: 5,
    totalSupply: 12
  },
  {
    id: 'house_7',
    name: 'Country Estate',
    category: 'real_estate',
    price: 950000,
    priceChange: 8000,
    priceChangePercent: 0.85,
    monthlyIncome: 5000,
    description: 'Spacious estate with large grounds',
    riskLevel: 'medium',
    roi: 5.5,
    timeToReturn: '5-7 years',
    availability: 1,
    totalSupply: 2
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
  {
    id: 'biz_3',
    name: 'Local Restaurant',
    category: 'business',
    price: 90000,
    priceChange: 1200,
    priceChangePercent: 1.35,
    monthlyIncome: 2800,
    description: 'Popular neighborhood dining spot',
    riskLevel: 'medium',
    roi: 28.0,
    timeToReturn: '3-4 years',
    availability: 3,
    totalSupply: 10
  },
  {
    id: 'biz_4',
    name: 'Online Retail Store',
    category: 'business',
    price: 75000,
    priceChange: 900,
    priceChangePercent: 1.22,
    monthlyIncome: 2500,
    description: 'E-commerce business with steady growth',
    riskLevel: 'medium',
    roi: 30.0,
    timeToReturn: '3 years',
    availability: 4,
    totalSupply: 12
  },
  {
    id: 'biz_5',
    name: 'Fitness Center',
    category: 'business',
    price: 110000,
    priceChange: 1300,
    priceChangePercent: 1.19,
    monthlyIncome: 3500,
    description: 'Well-established gym with loyal members',
    riskLevel: 'medium',
    roi: 33.0,
    timeToReturn: '3 years',
    availability: 3,
    totalSupply: 8
  },
  {
    id: 'biz_6',
    name: 'Mobile App Development',
    category: 'business',
    price: 65000,
    priceChange: 1100,
    priceChangePercent: 1.72,
    monthlyIncome: 2200,
    description: 'Growing software development company',
    riskLevel: 'medium',
    roi: 40.0,
    timeToReturn: '2-3 years',
    availability: 5,
    totalSupply: 15
  },
  {
    id: 'biz_7',
    name: 'Boutique Hotel',
    category: 'business',
    price: 400000,
    priceChange: 5000,
    priceChangePercent: 1.27,
    monthlyIncome: 8000,
    description: 'Luxury hotel with high occupancy rates',
    riskLevel: 'medium',
    roi: 20.0,
    timeToReturn: '4-6 years',
    availability: 1,
    totalSupply: 3
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
  {
    id: 'car_3',
    name: 'Electric Sedan',
    category: 'vehicle',
    price: 40000,
    priceChange: 1500,
    priceChangePercent: 3.9,
    monthlyIncome: 400,
    description: 'Eco-friendly vehicle with low running costs',
    riskLevel: 'low',
    roi: 10.0,
    availability: 6,
    totalSupply: 20
  },
  {
    id: 'car_4',
    name: 'Motorcycle',
    category: 'vehicle',
    price: 15000,
    priceChange: 500,
    priceChangePercent: 3.45,
    monthlyIncome: 200,
    description: 'Compact and efficient for urban transport',
    riskLevel: 'low',
    roi: 15.0,
    availability: 8,
    totalSupply: 25
  },
  {
    id: 'car_5',
    name: 'Luxury Convertible',
    category: 'vehicle',
    price: 120000,
    priceChange: 3000,
    priceChangePercent: 2.56,
    description: 'Stylish car for premium rentals and events',
    riskLevel: 'medium',
    roi: 13.0,
    availability: 2,
    totalSupply: 5
  },
  {
    id: 'car_6',
    name: 'Delivery Van',
    category: 'vehicle',
    price: 35000,
    priceChange: 800,
    priceChangePercent: 2.34,
    monthlyIncome: 600,
    description: 'Reliable van for logistics and delivery services',
    riskLevel: 'low',
    roi: 12.5,
    availability: 5,
    totalSupply: 10
  },
  {
    id: 'car_7',
    name: 'Sports Motorcycle',
    category: 'vehicle',
    price: 18000,
    priceChange: 900,
    priceChangePercent: 5.26,
    description: 'High-performance bike for enthusiasts',
    riskLevel: 'medium',
    roi: 14.0,
    availability: 3,
    totalSupply: 7
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
  {
    id: 'stock_3',
    name: 'Healthcare Innovators',
    category: 'stocks',
    price: 8000,
    priceChange: 300,
    priceChangePercent: 3.9,
    monthlyIncome: 40,
    description: 'Stocks in leading healthcare companies',
    riskLevel: 'medium',
    roi: 12.0,
    availability: 150,
    totalSupply: 600
  },
  {
    id: 'stock_4',
    name: 'Renewable Energy Fund',
    category: 'stocks',
    price: 7000,
    priceChange: 250,
    priceChangePercent: 3.7,
    monthlyIncome: 35,
    description: 'Investments in clean energy companies',
    riskLevel: 'medium',
    roi: 13.5,
    availability: 120,
    totalSupply: 500
  },
  {
    id: 'stock_5',
    name: 'Financial Sector ETF',
    category: 'stocks',
    price: 6000,
    priceChange: 200,
    priceChangePercent: 3.45,
    monthlyIncome: 30,
    description: 'Exchange-traded fund focused on finance',
    riskLevel: 'medium',
    roi: 11.0,
    availability: 130,
    totalSupply: 550
  },
  {
    id: 'stock_6',
    name: 'Consumer Goods Index',
    category: 'stocks',
    price: 5500,
    priceChange: 180,
    priceChangePercent: 3.38,
    monthlyIncome: 28,
    description: 'Index fund of major consumer goods companies',
    riskLevel: 'low',
    roi: 9.5,
    availability: 140,
    totalSupply: 600
  },
  {
    id: 'stock_7',
    name: 'Tech Startup Fund',
    category: 'stocks',
    price: 12000,
    priceChange: 600,
    priceChangePercent: 5.26,
    monthlyIncome: 50,
    description: 'Fund investing in early-stage tech startups',
    riskLevel: 'high',
    roi: 20.0,
    availability: 80,
    totalSupply: 300
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
  {
    id: 'crypto_3',
    name: 'Ripple Investment',
    category: 'crypto',
    price: 5000,
    priceChange: 200,
    priceChangePercent: 4.17,
    description: 'Investment in XRP tokens',
    riskLevel: 'high',
    roi: 18.0,
    availability: 40,
    totalSupply: 100
  },
  {
    id: 'crypto_4',
    name: 'Litecoin Bundle',
    category: 'crypto',
    price: 4000,
    priceChange: 150,
    priceChangePercent: 3.9,
    description: 'Bundle of LTC tokens',
    riskLevel: 'high',
    roi: 14.0,
    availability: 35,
    totalSupply: 90
  },
  {
    id: 'crypto_5',
    name: 'Cardano Stake Pool',
    category: 'crypto',
    price: 3500,
    priceChange: 100,
    priceChangePercent: 2.94,
    monthlyIncome: 100,
    description: 'Staked ADA with monthly rewards',
    riskLevel: 'high',
    roi: 10.0,
    availability: 25,
    totalSupply: 60
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
  },
  {
    id: 'luxury_2',
    name: 'Luxury Yacht',
    category: 'luxury',
    price: 1200000,
    priceChange: 15000,
    priceChangePercent: 1.27,
    monthlyIncome: 6000,
    description: 'High-end yacht with charter income potential',
    riskLevel: 'high',
    roi: 6.0,
    availability: 1,
    totalSupply: 2
  },
  {
    id: 'luxury_3',
    name: 'Helicopter Share (1/6)',
    category: 'luxury',
    price: 800000,
    priceChange: 10000,
    priceChangePercent: 1.28,
    monthlyIncome: 4000,
    description: 'Fractional ownership with rental income',
    riskLevel: 'high',
    roi: 7.0,
    availability: 1,
    totalSupply: 1
  },
  {
    id: 'luxury_4',
    name: 'Luxury Cruise Ship',
    category: 'luxury',
    price: 5000000,
    priceChange: 25000,
    priceChangePercent: 0.5,
    monthlyIncome: 20000,
    description: 'Large cruise ship with high rental demand',
    riskLevel: 'high',
    roi: 5.0,
    availability: 1,
    totalSupply: 1
  },
  {
    id: 'luxury_5',
    name: 'Mega Yacht',
    category: 'luxury',
    price: 3500000,
    priceChange: 20000,
    priceChangePercent: 0.57,
    monthlyIncome: 15000,
    description: 'Spacious yacht with luxury amenities',
    riskLevel: 'high',
    roi: 5.5,
    availability: 1,
    totalSupply: 1
  },
  {
    id: 'luxury_6',
    name: 'Private Helicopter',
    category: 'luxury',
    price: 1500000,
    priceChange: 12000,
    priceChangePercent: 0.8,
    monthlyIncome: 7000,
    description: 'Personal helicopter with rental potential',
    riskLevel: 'high',
    roi: 6.5,
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
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAssets = selectedCategory === 'all' 
    ? marketAssets 
    : marketAssets.filter(asset => asset.category === selectedCategory);

  const handleBuyAsset = async (asset: Asset) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase assets",
        variant: "destructive"
      });
      return;
    }

    try {
      // Add asset to user's portfolio
      const { data: assetData, error: assetError } = await supabase
        .from('user_assets')
        .insert({
          user_id: user.id,
          name: asset.name,
          asset_type: asset.category,
          value: asset.price,
          purchase_price: asset.price
        });

      if (assetError) throw assetError;

      // Create transaction record
      const { data: transactionData, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'purchase',
          category: asset.category,
          amount: -asset.price,
          description: `Purchased ${asset.name}`
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Asset Purchased!",
        description: `Successfully purchased ${asset.name} for $${asset.price.toLocaleString()}`
      });
    } catch (error) {
      console.error('Purchase failed:', error);
      toast({
        title: "Purchase Failed",
        description: "Could not complete purchase. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBidAsset = async (asset: Asset) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place bids",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create transaction record for bid
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'bid',
          category: asset.category,
          amount: asset.price * 0.9, // Bid 90% of asking price
          description: `Bid placed on ${asset.name}`
        });

      if (error) throw error;

      toast({
        title: "Bid Placed!",
        description: `Your bid of $${(asset.price * 0.9).toLocaleString()} on ${asset.name} has been placed`
      });
    } catch (error) {
      console.error('Bid failed:', error);
      toast({
        title: "Bid Failed",
        description: "Could not place bid. Please try again.",
        variant: "destructive"
      });
    }
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