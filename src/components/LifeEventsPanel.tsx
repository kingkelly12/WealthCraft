import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Zap, 
  Heart, 
  TrendingDown, 
  TrendingUp, 
  Gift, 
  AlertTriangle,
  Car,
  Building,
  Briefcase,
  Home,
  DollarSign,
  X,
  Check
} from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';

interface LifeEvent {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'challenge' | 'neutral' | 'emergency';
  impact: {
    cash?: number;
    assets?: string;
    income?: number;
    expenses?: number;
  };
  choices: {
    id: string;
    label: string;
    outcome: string;
    cost?: number;
    benefit?: number;
  }[];
  timeLimit?: number; // in seconds
  icon: any;
}

const lifeEvents: LifeEvent[] = [
  {
    id: 'market_crash',
    title: 'Market Volatility Alert',
    description: 'Stock market experiencing high volatility. Your investment portfolio is affected.',
    type: 'challenge',
    impact: {
      assets: 'Stock values down 15-25%'
    },
    choices: [
      {
        id: 'sell_all',
        label: 'Sell All Stocks',
        outcome: 'Prevent further losses but miss potential recovery',
        cost: 0,
        benefit: 0
      },
      {
        id: 'hold_steady',
        label: 'Hold Position',
        outcome: 'Ride out the volatility, potential for recovery',
        cost: 0,
        benefit: 0
      },
      {
        id: 'buy_dip',
        label: 'Buy the Dip',
        outcome: 'Invest more at lower prices for potential higher returns',
        cost: 10000,
        benefit: 0
      }
    ],
    timeLimit: 60,
    icon: TrendingDown
  },
  {
    id: 'lottery_win',
    title: 'Lottery Windfall!',
    description: 'Congratulations! You won $25,000 in the state lottery.',
    type: 'opportunity',
    impact: {
      cash: 25000
    },
    choices: [
      {
        id: 'invest_all',
        label: 'Invest Everything',
        outcome: 'Put all winnings into diversified portfolio',
        cost: 0,
        benefit: 25000
      },
      {
        id: 'pay_debt',
        label: 'Pay Down Debt',
        outcome: 'Use winnings to eliminate high-interest debt',
        cost: 0,
        benefit: 25000
      },
      {
        id: 'split_money',
        label: 'Split Wisely',
        outcome: 'Half to investments, half to debt reduction',
        cost: 0,
        benefit: 25000
      },
      {
        id: 'splurge',
        label: 'Treat Yourself',
        outcome: 'Enjoy some luxury purchases (lower long-term benefit)',
        cost: 0,
        benefit: 15000
      }
    ],
    timeLimit: 120,
    icon: Gift
  },
  {
    id: 'car_breakdown',
    title: 'Car Emergency',
    description: 'Your car broke down and needs immediate repairs or replacement.',
    type: 'emergency',
    impact: {
      expenses: 8000
    },
    choices: [
      {
        id: 'expensive_repair',
        label: 'Full Repair ($8,000)',
        outcome: 'Keep current car, high reliability',
        cost: 8000,
        benefit: 0
      },
      {
        id: 'cheap_repair',
        label: 'Basic Repair ($2,000)',
        outcome: 'Temporary fix, may break down again',
        cost: 2000,
        benefit: 0
      },
      {
        id: 'buy_used',
        label: 'Buy Used Car ($12,000)',
        outcome: 'More reliable than repair, depreciating asset',
        cost: 12000,
        benefit: 0
      },
      {
        id: 'go_carless',
        label: 'Go Car-Free',
        outcome: 'Use public transport, save on car expenses',
        cost: 0,
        benefit: 500
      }
    ],
    timeLimit: 90,
    icon: Car
  },
  {
    id: 'job_promotion',
    title: 'Promotion Opportunity',
    description: 'Your boss offered you a promotion with a significant salary increase.',
    type: 'opportunity',
    impact: {
      income: 1500
    },
    choices: [
      {
        id: 'accept_promo',
        label: 'Accept Promotion',
        outcome: '+$1,500/month salary, more responsibilities',
        cost: 0,
        benefit: 1500
      },
      {
        id: 'negotiate',
        label: 'Negotiate Terms',
        outcome: 'Try for better package (risk/reward)',
        cost: 0,
        benefit: 2000
      },
      {
        id: 'decline',
        label: 'Decline Offer',
        outcome: 'Stay comfortable, maintain work-life balance',
        cost: 0,
        benefit: 0
      }
    ],
    timeLimit: 180,
    icon: Briefcase
  },
  {
    id: 'real_estate_boom',
    title: 'Real Estate Boom',
    description: 'Property values in your area increased significantly. Great time to sell or refinance.',
    type: 'opportunity',
    impact: {
      assets: 'Property values up 20%'
    },
    choices: [
      {
        id: 'sell_property',
        label: 'Sell Property',
        outcome: 'Realize gains, lose rental income',
        cost: 0,
        benefit: 36000
      },
      {
        id: 'refinance',
        label: 'Refinance Mortgage',
        outcome: 'Lower payments, access equity',
        cost: 3000,
        benefit: 500
      },
      {
        id: 'buy_more',
        label: 'Buy More Property',
        outcome: 'Leverage current equity for more real estate',
        cost: 50000,
        benefit: 0
      },
      {
        id: 'hold_steady',
        label: 'Hold Current Position',
        outcome: 'Keep current investments, wait for more growth',
        cost: 0,
        benefit: 0
      }
    ],
    timeLimit: 240,
    icon: Home
  },
  {
    id: 'health_emergency',
    title: 'Health Emergency',
    description: 'Unexpected medical bills have arrived. Your insurance covers most, but not all.',
    type: 'emergency',
    impact: {
      expenses: 15000
    },
    choices: [
      {
        id: 'emergency_fund',
        label: 'Use Emergency Fund',
        outcome: 'Pay from savings, maintain credit score',
        cost: 15000,
        benefit: 0
      },
      {
        id: 'payment_plan',
        label: 'Payment Plan',
        outcome: 'Monthly payments, some interest charges',
        cost: 16500,
        benefit: 0
      },
      {
        id: 'medical_loan',
        label: 'Medical Loan',
        outcome: 'Lower rate than credit cards, fixed terms',
        cost: 15750,
        benefit: 0
      },
      {
        id: 'credit_card',
        label: 'Credit Card',
        outcome: 'Quick access, high interest if not paid quickly',
        cost: 18000,
        benefit: 0
      }
    ],
    timeLimit: 150,
    icon: Heart
  },
  {
    id: 'startup_investment',
    title: 'Startup Investment Opportunity',
    description: 'A promising tech startup is seeking investors. High risk, high reward.',
    type: 'opportunity',
    impact: {
      cash: -10000
    },
    choices: [
      {
        id: 'invest_full',
        label: 'Invest $10,000',
        outcome: 'Potential for high returns, but risk losing investment',
        cost: 10000,
        benefit: 0
      },
      {
        id: 'invest_partial',
        label: 'Invest $5,000',
        outcome: 'Lower risk, lower potential returns',
        cost: 5000,
        benefit: 0
      },
      {
        id: 'pass',
        label: 'Pass on Investment',
        outcome: 'Keep cash for safer opportunities',
        cost: 0,
        benefit: 0
      }
    ],
    timeLimit: 180,
    icon: Building
  },
  {
    id: 'unexpected_bonus',
    title: 'Unexpected Work Bonus',
    description: 'Your company rewarded you with a surprise bonus this quarter.',
    type: 'opportunity',
    impact: {
      cash: 5000
    },
    choices: [
      {
        id: 'save_bonus',
        label: 'Save Bonus',
        outcome: 'Add to savings account',
        cost: 0,
        benefit: 5000
      },
      {
        id: 'spend_bonus',
        label: 'Spend Bonus',
        outcome: 'Enjoy a nice treat or purchase',
        cost: 0,
        benefit: 0
      },
      {
        id: 'invest_bonus',
        label: 'Invest Bonus',
        outcome: 'Put bonus into stocks or funds',
        cost: 0,
        benefit: 5000
      }
    ],
    timeLimit: 120,
    icon: DollarSign
  },
  {
    id: 'family_reunion_expense',
    title: 'Family Reunion Expense',
    description: 'You decided to host a family reunion, incurring unexpected costs.',
    type: 'challenge',
    impact: {
      expenses: 3000
    },
    choices: [
      {
        id: 'cut_costs',
        label: 'Cut Costs',
        outcome: 'Reduce expenses by simplifying event',
        cost: 0,
        benefit: 0
      },
      {
        id: 'go_all_out',
        label: 'Go All Out',
        outcome: 'Host a lavish event, impress family',
        cost: 3000,
        benefit: 0
      },
      {
        id: 'postpone',
        label: 'Postpone Event',
        outcome: 'Delay reunion to save money',
        cost: 0,
        benefit: 0
      }
    ],
    timeLimit: 90,
    icon: Heart
  },
  {
    id: 'car_insurance_increase',
    title: 'Car Insurance Premium Increase',
    description: 'Your car insurance premium has increased unexpectedly.',
    type: 'challenge',
    impact: {
      expenses: 1200
    },
    choices: [
      {
        id: 'shop_around',
        label: 'Shop Around',
        outcome: 'Look for better insurance deals',
        cost: 0,
        benefit: 0
      },
      {
        id: 'accept_increase',
        label: 'Accept Increase',
        outcome: 'Pay higher premium to maintain coverage',
        cost: 1200,
        benefit: 0
      },
      {
        id: 'reduce_coverage',
        label: 'Reduce Coverage',
        outcome: 'Lower premium but less protection',
        cost: 0,
        benefit: 0
      }
    ],
    timeLimit: 60,
    icon: Car
  },
  {
    id: 'charity_donation',
    title: 'Charity Donation Opportunity',
    description: 'A local charity is seeking donations to support community programs.',
    type: 'opportunity',
    impact: {
      cash: -500
    },
    choices: [
      {
        id: 'donate_full',
        label: 'Donate $500',
        outcome: 'Support community and get tax benefits',
        cost: 500,
        benefit: 0
      },
      {
        id: 'donate_partial',
        label: 'Donate $250',
        outcome: 'Partial support, smaller tax benefits',
        cost: 250,
        benefit: 0
      },
      {
        id: 'decline',
        label: 'Decline Donation',
        outcome: 'Keep cash for other uses',
        cost: 0,
        benefit: 0
      }
    ],
    timeLimit: 120,
    icon: Gift
  }
];

export function LifeEventsPanel() {
  const [currentEvent, setCurrentEvent] = useState<LifeEvent | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [eventHistory, setEventHistory] = useState<Array<{event: LifeEvent, choice: string, timestamp: Date}>>([]);

  // Simulate random events
  useEffect(() => {
    const eventInterval = setInterval(() => {
      if (!currentEvent && Math.random() < 0.3) { // 30% chance every interval
        const randomEvent = lifeEvents[Math.floor(Math.random() * lifeEvents.length)];
        setCurrentEvent(randomEvent);
        setTimeRemaining(randomEvent.timeLimit || 120);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(eventInterval);
  }, [currentEvent]);

  // Timer countdown
  useEffect(() => {
    if (currentEvent && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentEvent && timeRemaining === 0) {
      handleEventChoice('timeout');
    }
  }, [currentEvent, timeRemaining]);

  const handleEventChoice = (choiceId: string) => {
    if (!currentEvent) return;

    // Add to history
    setEventHistory(prev => [...prev, {
      event: currentEvent,
      choice: choiceId,
      timestamp: new Date()
    }]);

    // TODO: Apply the financial impact based on the choice
    console.log('Event choice made:', choiceId, currentEvent);

    // Clear current event
    setCurrentEvent(null);
    setTimeRemaining(0);
  };

  const dismissEvent = () => {
    setCurrentEvent(null);
    setTimeRemaining(0);
  };

  const getEventTypeColor = (type: LifeEvent['type']) => {
    switch (type) {
      case 'opportunity': return 'border-success';
      case 'challenge': return 'border-warning';
      case 'emergency': return 'border-danger';
      default: return 'border-primary';
    }
  };

  const getEventTypeIcon = (type: LifeEvent['type']) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'challenge': return AlertTriangle;
      case 'emergency': return AlertTriangle;
      default: return Zap;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Life Events
        </CardTitle>
        <CardDescription>
          Random events that affect your financial journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentEvent && (
          <Alert className={`${getEventTypeColor(currentEvent.type)} border-2`}>
            <div className="flex items-start justify-between">
              <div className="flex gap-3 flex-1">
                <currentEvent.icon className="h-5 w-5 mt-0.5" />
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{currentEvent.title}</h3>
                  <Badge className={currentEvent.type === 'opportunity' ? buttonVariants({ variant: 'default' }) : buttonVariants({ variant: 'destructive' })}>
                    {currentEvent.type}
                  </Badge>
                    </div>
                    <AlertDescription>{currentEvent.description}</AlertDescription>
                  </div>

                  {/* Impact preview */}
                  <div className="text-sm text-muted-foreground">
                    {currentEvent.impact.cash && (
                      <div>Cash impact: ${currentEvent.impact.cash.toLocaleString()}</div>
                    )}
                    {currentEvent.impact.income && (
                      <div>Monthly income: +${currentEvent.impact.income}/month</div>
                    )}
                    {currentEvent.impact.expenses && (
                      <div>Expenses: ${currentEvent.impact.expenses.toLocaleString()}</div>
                    )}
                    {currentEvent.impact.assets && (
                      <div>Assets: {currentEvent.impact.assets}</div>
                    )}
                  </div>

                  {/* Timer */}
                  {currentEvent.timeLimit && (
                    <div className="flex items-center gap-2 text-sm text-warning">
                      <DollarSign className="h-3 w-3" />
                      <span>Decision needed in {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
                    </div>
                  )}

                  {/* Choices */}
                  <div className="grid gap-2">
                    {currentEvent.choices.map((choice) => (
                    <button
                      key={choice.id}
                      className={`${buttonVariants({ variant: 'outline', size: 'sm' })} justify-start text-left h-auto p-3`}
                      onClick={() => handleEventChoice(choice.id)}
                    >
                      <div>
                        <div className="font-medium">{choice.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{choice.outcome}</div>
                        {choice.cost && (
                          <div className="text-xs text-danger">Cost: ${choice.cost.toLocaleString()}</div>
                        )}
                        {choice.benefit && (
                          <div className="text-xs text-success">Benefit: ${choice.benefit.toLocaleString()}</div>
                        )}
                      </div>
                    </button>
                    ))}
                  </div>
                </div>
              </div>
              <button className={buttonVariants({ variant: 'ghost', size: 'sm' })} onClick={dismissEvent}>
                <X className="h-4 w-4" />
              </button>
            </div>
          </Alert>
        )}

        {/* Event History */}
        {eventHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Recent Events</h4>
            {eventHistory.slice(-3).map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm p-2 bg-muted rounded">
                <Check className="h-3 w-3 text-success" />
                <span className="flex-1">{item.event.title}</span>
                <span className="text-xs text-muted-foreground">
                  {item.timestamp.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {!currentEvent && eventHistory.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No active events. Life is peaceful for now...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}