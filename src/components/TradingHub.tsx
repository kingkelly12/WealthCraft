import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  ArrowUpDown, 
  Clock, 
  Gavel,
  MessageSquare,
  User,
  TrendingUp,
  DollarSign,
  Timer,
  Crown,
  Star
} from 'lucide-react';

interface TradeOffer {
  id: string;
  seller: string;
  asset: string;
  category: string;
  originalPrice: number;
  askingPrice: number;
  description: string;
  timeLeft: string;
  bids: number;
  topBid?: number;
  isAuction: boolean;
  sellerRating: number;
  negotiable: boolean;
}

interface ActiveBid {
  id: string;
  asset: string;
  yourBid: number;
  currentHigh: number;
  timeLeft: string;
  status: 'winning' | 'outbid' | 'pending';
}

const tradeOffers: TradeOffer[] = [
  {
    id: 'trade_1',
    seller: 'InvestorPro',
    asset: 'Downtown Condo Unit 4B',
    category: 'Real Estate',
    originalPrice: 280000,
    askingPrice: 265000,
    description: 'Fully renovated 2BR/2BA with city views. Tenant occupied until Dec 2024.',
    timeLeft: '2d 14h',
    bids: 8,
    topBid: 258000,
    isAuction: true,
    sellerRating: 4.8,
    negotiable: false
  },
  {
    id: 'trade_2',
    seller: 'CryptoKing',
    asset: 'Ethereum Mining Rig',
    category: 'Crypto Equipment',
    originalPrice: 45000,
    askingPrice: 38000,
    description: 'High-efficiency mining setup with 6 RTX 4090s. ROI 18 months.',
    timeLeft: '1d 8h',
    bids: 12,
    topBid: 35500,
    isAuction: true,
    sellerRating: 4.6,
    negotiable: true
  },
  {
    id: 'trade_3',
    seller: 'BusinessMaven',
    asset: 'Coffee Shop Franchise Rights',
    category: 'Business',
    originalPrice: 150000,
    askingPrice: 140000,
    description: 'Established location with 3-year lease. $8K monthly revenue.',
    timeLeft: '5d 2h',
    bids: 3,
    isAuction: false,
    sellerRating: 4.9,
    negotiable: true
  },
  {
    id: 'trade_4',
    seller: 'LuxuryDealer',
    asset: '2020 Tesla Model S Plaid',
    category: 'Luxury Vehicle',
    originalPrice: 120000,
    askingPrice: 85000,
    description: 'Low mileage, fully loaded. Perfect for premium ride-sharing.',
    timeLeft: '3h 22m',
    bids: 15,
    topBid: 82000,
    isAuction: true,
    sellerRating: 4.7,
    negotiable: false
  },
  {
    id: 'trade_5',
    seller: 'TechInvestor',
    asset: 'AI Startup Equity (5%)',
    category: 'Business',
    originalPrice: 75000,
    askingPrice: 70000,
    description: 'Pre-Series A startup, strong team, AI-powered analytics platform.',
    timeLeft: '6d 10h',
    bids: 6,
    isAuction: false,
    sellerRating: 4.4,
    negotiable: true
  }
];

const activeBids: ActiveBid[] = [
  {
    id: 'bid_1',
    asset: 'Beachfront Villa Share',
    yourBid: 425000,
    currentHigh: 430000,
    timeLeft: '4h 15m',
    status: 'outbid'
  },
  {
    id: 'bid_2',
    asset: 'Tech Stock Portfolio',
    yourBid: 65000,
    currentHigh: 65000,
    timeLeft: '1d 3h',
    status: 'winning'
  },
  {
    id: 'bid_3',
    asset: 'Food Truck Business',
    yourBid: 48000,
    currentHigh: 48000,
    timeLeft: '2d 8h',
    status: 'pending'
  }
];

export function TradingHub() {
  const [bidAmount, setBidAmount] = useState<{ [key: string]: string }>({});
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const handleBid = (offerId: string) => {
    const amount = bidAmount[offerId];
    if (!amount) return;
    
    // TODO: Implement bidding logic
    console.log('Placing bid:', offerId, amount);
    setBidAmount(prev => ({ ...prev, [offerId]: '' }));
  };

  const handleNegotiate = (offerId: string) => {
    // TODO: Implement negotiation chat
    console.log('Starting negotiation:', offerId);
  };

  const getStatusColor = (status: ActiveBid['status']) => {
    switch (status) {
      case 'winning': return 'text-success';
      case 'outbid': return 'text-danger';
      default: return 'text-warning';
    }
  };

  const getStatusBadge = (status: ActiveBid['status']) => {
    switch (status) {
      case 'winning': return 'default';
      case 'outbid': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Trading Hub
        </CardTitle>
        <CardDescription>
          Trade assets with other players, participate in auctions, and negotiate deals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="marketplace" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="auctions">Auctions</TabsTrigger>
            <TabsTrigger value="my-bids">My Bids ({activeBids.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {tradeOffers.filter(offer => !offer.isAuction).map((offer) => (
                  <div key={offer.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{offer.asset}</h3>
                          <Badge variant="outline">{offer.category}</Badge>
                          {offer.negotiable && (
                            <Badge variant="secondary">Negotiable</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{offer.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{offer.seller}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{offer.sellerRating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="space-y-1">
                          <div className="text-lg font-bold">
                            ${offer.askingPrice.toLocaleString()}
                          </div>
                          {offer.originalPrice > offer.askingPrice && (
                            <div className="text-xs text-muted-foreground line-through">
                              ${offer.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleNegotiate(offer.id)}>
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm">
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="auctions" className="space-y-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {tradeOffers.filter(offer => offer.isAuction).map((offer) => (
                  <div key={offer.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Gavel className="h-4 w-4 text-primary" />
                          <h3 className="font-semibold">{offer.asset}</h3>
                          <Badge variant="outline">{offer.category}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{offer.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{offer.seller}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{offer.sellerRating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-warning">
                            <Timer className="h-3 w-3" />
                            <span>{offer.timeLeft}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{offer.bids} bids</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-3">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Current High</div>
                          <div className="text-lg font-bold">
                            ${offer.topBid?.toLocaleString() || offer.askingPrice.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Starting: ${offer.askingPrice.toLocaleString()}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              placeholder="Bid amount"
                              value={bidAmount[offer.id] || ''}
                              onChange={(e) => setBidAmount(prev => ({ 
                                ...prev, 
                                [offer.id]: e.target.value 
                              }))}
                              className="w-24 text-sm"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => handleBid(offer.id)}
                              disabled={!bidAmount[offer.id]}
                            >
                              Bid
                            </Button>
                          </div>
                          <Button size="sm" variant="outline" className="w-full">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Ask Seller
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="my-bids" className="space-y-4">
            <div className="space-y-4">
              {activeBids.map((bid) => (
                <div key={bid.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{bid.asset}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>Your bid: ${bid.yourBid.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>High: ${bid.currentHigh.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-warning">
                          <Clock className="h-3 w-3" />
                          <span>{bid.timeLeft}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <Badge variant={getStatusBadge(bid.status)}>
                        {bid.status === 'winning' && <Crown className="h-3 w-3 mr-1" />}
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </Badge>
                      {bid.status === 'outbid' && (
                        <Button size="sm" variant="outline">
                          Increase Bid
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {activeBids.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Gavel className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No active bids. Start bidding on assets to see them here!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}