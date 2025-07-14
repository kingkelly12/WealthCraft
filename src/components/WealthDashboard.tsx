import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Home, 
  Car, 
  CreditCard,
  Briefcase,
  GraduationCap,
  PieChart,
  Bell,
  ChevronUp,
  Plus,
  Target
} from 'lucide-react';
import { NetWorthChart } from './NetWorthChart';
import { QuickActions } from './QuickActions';
import { NotificationsPanel } from './NotificationsPanel';
import { AssetMarketplace } from './AssetMarketplace';
import { LifeEventsPanel } from './LifeEventsPanel';
import { NewsPanel } from './NewsPanel';
import { TradingHub } from './TradingHub';
import VirtualAcademy from './VirtualAcademy';
import BankingSystem from './BankingSystem';
import { Leaderboards } from './Leaderboards';
import { LifeGoals } from './LifeGoals';
import { HallOfFame } from './HallOfFame';

// Mock data for the dashboard
const playerData = {
  name: "Kelly Koome",
  netWorth: 125750,
  netWorthChange: 8420,
  changePercentage: 7.2,
  cash: 15400,
  monthlyIncome: 5800,
  assets: [
    { name: "Emergency Fund", value: 10000, type: "cash", growth: 0 },
    { name: "Stock Portfolio", value: 45000, type: "stocks", growth: 12.5 },
    { name: "Real Estate", value: 180000, type: "property", growth: 4.2 },
    { name: "401k Retirement", value: 32000, type: "retirement", growth: 8.1 }
  ],
  liabilities: [
    { name: "Student Loan", value: 28000, rate: 4.5, payment: 320 },
    { name: "Car Loan", value: 18400, rate: 3.2, payment: 420 },
    { name: "Credit Card", value: 3250, rate: 18.9, payment: 150 }
  ],
  currentJob: "Software Developer",
  jobLevel: "Mid-Level",
  nextPromotion: 75
};

export function WealthDashboard() {
  const totalAssets = playerData.assets.reduce((sum, asset) => sum + asset.value, 0) + playerData.cash;
  const totalLiabilities = playerData.liabilities.reduce((sum, liability) => sum + liability.value, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-wealth bg-clip-text text-transparent">
              WealthCraft
            </h1>
            <p className="text-muted-foreground">Welcome back, {playerData.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">Season 3</Badge>
            <Button size="sm" variant="outline">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Net Worth Overview */}
        <Card className="bg-gradient-card shadow-financial">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Net Worth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground">
                  ${playerData.netWorth.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`flex items-center gap-1 ${playerData.netWorthChange > 0 ? 'text-success' : 'text-danger'}`}>
                    {playerData.netWorthChange > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      ${Math.abs(playerData.netWorthChange).toLocaleString()} ({playerData.changePercentage}%)
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">this month</span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm text-muted-foreground">Monthly Income</div>
                <div className="text-xl font-semibold text-success">
                  ${playerData.monthlyIncome.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Assets & Liabilities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">
                    ${totalAssets.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Liabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-danger">
                    ${totalLiabilities.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Available Cash</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    ${playerData.cash.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Net Worth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Net Worth Growth</CardTitle>
                <CardDescription>Your financial journey over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <NetWorthChart />
              </CardContent>
            </Card>

            {/* Assets Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Assets Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {playerData.assets.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-card rounded-md">
                        {asset.type === 'stocks' && <TrendingUp className="h-4 w-4 text-chart-1" />}
                        {asset.type === 'property' && <Home className="h-4 w-4 text-chart-2" />}
                        {asset.type === 'cash' && <DollarSign className="h-4 w-4 text-chart-3" />}
                        {asset.type === 'retirement' && <Target className="h-4 w-4 text-chart-4" />}
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {asset.growth > 0 ? `+${asset.growth}%` : 'Stable'} YTD
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${asset.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Liabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-danger" />
                  Liabilities & Debt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {playerData.liabilities.map((liability, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-card rounded-md">
                        <CreditCard className="h-4 w-4 text-danger" />
                      </div>
                      <div>
                        <div className="font-medium">{liability.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {liability.rate}% APR • ${liability.payment}/month
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-danger">
                        ${liability.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions & Notifications */}
          <div className="space-y-6">
            {/* Career Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Career Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Current Role</span>
                    <span className="font-medium">{playerData.currentJob}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">{playerData.jobLevel}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Promotion</span>
                      <span className="font-medium">{playerData.nextPromotion}%</span>
                    </div>
                    <Progress value={playerData.nextPromotion} className="h-2" />
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Take Course
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <QuickActions />

            {/* Notifications */}
            <NotificationsPanel />

            {/* Life Events */}
            <LifeEventsPanel />

            {/* Market News */}
            <NewsPanel />
          </div>
        </div>

        {/* Additional Game Mechanics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {/* Asset Marketplace */}
          <AssetMarketplace />
          
          {/* Trading Hub */}
          <TradingHub />
        </div>

        {/* Phase 2 Features */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {/* Virtual Academy */}
          <VirtualAcademy />
          
          {/* Banking System */}
          <BankingSystem />
        </div>

        {/* Phase 3 Features - Competitive & Social */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          {/* Leaderboards */}
          <Leaderboards />
          
          {/* Life Goals */}
          <LifeGoals />
          
          {/* Hall of Fame */}
          <HallOfFame />
        </div>
      </div>
    </div>
  );
}