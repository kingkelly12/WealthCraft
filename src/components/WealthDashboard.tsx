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
import { useUserProfile } from '@/hooks/useUserProfile';
import UserProfileSettings from './UserProfileSettings';
import P2PLendingForm from './P2PLendingForm';
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


export function WealthDashboard() {
  const { 
    profile, 
    assets, 
    liabilities, 
    currentJob, 
    familyMembers, 
    lifeGoals,
    calculatedNetWorth,
    calculatedIncome,
    loading 
  } = useUserProfile();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your wealth dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate totals from user's actual data
  const totalAssets = assets.reduce((sum, asset) => sum + Number(asset.value), 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + Number(liability.amount), 0);
  const netWorth = calculatedNetWorth;
  const monthlyIncome = calculatedIncome;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-wealth bg-clip-text text-transparent">
              WealthCraft
            </h1>
            <p className="text-muted-foreground">Welcome back, {profile?.username || 'Player'}</p>
          </div>
          <div className="flex items-center gap-4">
            <UserProfileSettings />
            <P2PLendingForm />
            <Badge variant="outline" className="text-sm">Level {profile?.level || 1}</Badge>
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
                  ${netWorth.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Track your progress
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">updated live</span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm text-muted-foreground">Monthly Income</div>
                <div className="text-xl font-semibold text-success">
                  ${monthlyIncome.toLocaleString()}
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
                  <CardTitle className="text-sm font-medium text-muted-foreground">Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {profile?.credit_score || 650}
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
                {assets.length > 0 ? assets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-card rounded-md">
                        {asset.asset_type === 'stocks' && <TrendingUp className="h-4 w-4 text-chart-1" />}
                        {asset.asset_type === 'property' && <Home className="h-4 w-4 text-chart-2" />}
                        {asset.asset_type === 'cash' && <DollarSign className="h-4 w-4 text-chart-3" />}
                        {asset.asset_type === 'retirement' && <Target className="h-4 w-4 text-chart-4" />}
                        {asset.asset_type === 'bonds' && <CreditCard className="h-4 w-4 text-chart-5" />}
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {asset.asset_type} • Qty: {asset.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${Number(asset.value).toLocaleString()}</div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No assets yet. Start building your portfolio!</p>
                  </div>
                )}
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
                {liabilities.length > 0 ? liabilities.map((liability) => (
                  <div key={liability.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-card rounded-md">
                        <CreditCard className="h-4 w-4 text-danger" />
                      </div>
                      <div>
                        <div className="font-medium">{liability.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {Number(liability.interest_rate)}% APR • ${Number(liability.monthly_payment)}/month
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-danger">
                        ${Number(liability.amount).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No liabilities yet. Keep it that way!</p>
                  </div>
                )}
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
                {currentJob ? (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Current Role</span>
                      <span className="font-medium">{currentJob.title}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Company</span>
                      <span className="font-medium">{currentJob.company || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium">{currentJob.level}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Next Promotion</span>
                        <span className="font-medium">{currentJob.promotion_progress}%</span>
                      </div>
                      <Progress value={currentJob.promotion_progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Annual Salary</span>
                      <span className="font-medium">${Number(currentJob.salary).toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No current job. Add your career details!</p>
                  </div>
                )}
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