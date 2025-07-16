import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Building2, 
  CreditCard, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Shield,
  AlertTriangle,
  DollarSign,
  Users,
  Calendar
} from "lucide-react";

interface Loan {
  id: string;
  type: 'personal' | 'business' | 'mortgage' | 'auto';
  amount: number;
  interestRate: number;
  term: number; // months
  monthlyPayment: number;
  totalInterest: number;
  creditRequired: number;
  status: 'available' | 'applied' | 'approved' | 'active';
  collateral?: string;
}

interface LoanApplication {
  amount: number;
  purpose: string;
  term: number;
  creditScore: number;
}

const bankLoans: Loan[] = [
  {
    id: '1',
    type: 'personal',
    amount: 10000,
    interestRate: 8.5,
    term: 36,
    monthlyPayment: 315,
    totalInterest: 1340,
    creditRequired: 650,
    status: 'available'
  },
  {
    id: '2',
    type: 'business',
    amount: 50000,
    interestRate: 6.2,
    term: 60,
    monthlyPayment: 967,
    totalInterest: 8020,
    creditRequired: 700,
    status: 'available',
    collateral: 'Business Assets'
  },
  {
    id: '3',
    type: 'mortgage',
    amount: 300000,
    interestRate: 4.8,
    term: 360,
    monthlyPayment: 1581,
    totalInterest: 269160,
    creditRequired: 720,
    status: 'available',
    collateral: 'Property'
  },
  {
    id: '4',
    type: 'auto',
    amount: 25000,
    interestRate: 5.9,
    term: 60,
    monthlyPayment: 483,
    totalInterest: 3980,
    creditRequired: 600,
    status: 'available',
    collateral: 'Vehicle'
  }
];

const p2pLoans = [
  {
    id: 'p1',
    lender: 'Alex_Investor',
    amount: 15000,
    interestRate: 7.2,
    term: 24,
    purpose: 'Business Expansion',
    creditRequired: 680,
    timeLeft: '2d 4h'
  },
  {
    id: 'p2',
    lender: 'Sarah_Capital',
    amount: 8000,
    interestRate: 9.1,
    term: 18,
    purpose: 'Real Estate Down Payment',
    creditRequired: 640,
    timeLeft: '1d 12h'
  }
];

export default function BankingSystem() {
  const [currentTab, setCurrentTab] = useState('apply');
  const [loanAmount, setLoanAmount] = useState([25000]);
  const [loanTerm, setLoanTerm] = useState([36]);
  const [selectedLoanType, setSelectedLoanType] = useState('personal');
  const [creditScore] = useState(685); // Mock credit score

  const calculateMonthlyPayment = (principal: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                   (Math.pow(1 + monthlyRate, term) - 1);
    return payment;
  };

  const estimatedPayment = calculateMonthlyPayment(loanAmount[0], 8.5, loanTerm[0]);
  const totalInterest = (estimatedPayment * loanTerm[0]) - loanAmount[0];

  const getLoanTypeIcon = (type: string) => {
    switch (type) {
      case 'personal': return CreditCard;
      case 'business': return Building2;
      case 'mortgage': return Building2;
      case 'auto': return CreditCard;
      default: return CreditCard;
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-success';
    if (score >= 700) return 'text-warning';
    return 'text-destructive';
  };

  const getCreditScoreStatus = (score: number) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="space-y-6">
      {/* Credit Score Card */}
      <Card className="border-primary/20 bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Credit Profile
            </div>
            <Badge variant={creditScore >= 700 ? "default" : "destructive"}>
              {getCreditScoreStatus(creditScore)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">
                <span className={getCreditScoreColor(creditScore)}>{creditScore}</span>
                <span className="text-sm text-muted-foreground ml-2">/ 850</span>
              </div>
              <Progress value={(creditScore / 850) * 100} className="h-3" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment History:</span>
                <span className="text-success">Excellent</span>
              </div>
              <div className="flex justify-between">
                <span>Credit Utilization:</span>
                <span className="text-warning">25%</span>
              </div>
              <div className="flex justify-between">
                <span>Available Credit:</span>
                <span>$45,000</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banking & Loans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Banking & Loans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
              <TabsTrigger value="bank">Bank Loans</TabsTrigger>
              <TabsTrigger value="p2p">P2P Lending</TabsTrigger>
            </TabsList>

            <TabsContent value="apply" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="loan-amount">Loan Amount</Label>
                    <div className="mt-2">
                      <Slider
                        value={loanAmount}
                        onValueChange={setLoanAmount}
                        max={500000}
                        min={1000}
                        step={1000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>$1,000</span>
                        <span className="font-medium">${loanAmount[0].toLocaleString()}</span>
                        <span>$500,000</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loan-term">Loan Term (months)</Label>
                    <div className="mt-2">
                      <Slider
                        value={loanTerm}
                        onValueChange={setLoanTerm}
                        max={360}
                        min={6}
                        step={6}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>6 months</span>
                        <span className="font-medium">{loanTerm[0]} months</span>
                        <span>30 years</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Input 
                      id="purpose" 
                      placeholder="Business expansion, real estate, etc."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="border-accent/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Loan Estimate</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span className="font-medium">${loanAmount[0].toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Rate:</span>
                        <span className="font-medium">8.5% APR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Payment:</span>
                        <span className="font-medium text-primary">${Math.round(estimatedPayment).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Interest:</span>
                        <span className="font-medium text-destructive">${Math.round(totalInterest).toLocaleString()}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex justify-between font-medium">
                          <span>Total Cost:</span>
                          <span>${Math.round(loanAmount[0] + totalInterest).toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full" variant="premium" onClick={() => console.log('Applying for loan with amount:', loanAmount[0])}>
                    Apply for Loan
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bank" className="space-y-4">
              {bankLoans.map((loan) => {
                const Icon = getLoanTypeIcon(loan.type);
                const qualified = creditScore >= loan.creditRequired;
                
                return (
                  <Card key={loan.id} className={`${qualified ? 'border-success/30' : 'border-destructive/30'}`}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-primary" />
                          <div>
                            <h4 className="font-medium capitalize">{loan.type} Loan</h4>
                            <p className="text-sm text-muted-foreground">
                              ${loan.amount.toLocaleString()} • {loan.interestRate}% APR
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={qualified ? "default" : "destructive"}>
                            {qualified ? 'Qualified' : 'Not Qualified'}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Credit: {loan.creditRequired}+
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Monthly Payment</span>
                          <p className="font-medium">${loan.monthlyPayment}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Term</span>
                          <p className="font-medium">{loan.term} months</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Interest</span>
                          <p className="font-medium text-destructive">${loan.totalInterest.toLocaleString()}</p>
                        </div>
                      </div>

                      {loan.collateral && (
                        <div className="flex items-center gap-2 mb-4 text-sm">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          <span>Requires collateral: {loan.collateral}</span>
                        </div>
                      )}

                      <Button 
                        className="w-full" 
                        disabled={!qualified}
                        variant={qualified ? "default" : "outline"}
                        onClick={() => qualified && console.log('Applying for bank loan:', loan.id)}
                      >
                        {qualified ? 'Apply Now' : 'Improve Credit Score'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="p2p" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Peer-to-Peer Lending</h3>
              </div>

              {p2pLoans.map((loan) => (
                <Card key={loan.id} className="border-accent/30">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium">{loan.lender}</h4>
                        <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-warning">
                          <Clock className="w-3 h-3" />
                          <span>{loan.timeLeft}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Amount</span>
                        <p className="font-medium">${loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rate</span>
                        <p className="font-medium">{loan.interestRate}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Term</span>
                        <p className="font-medium">{loan.term}m</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Required</span>
                        <p className="font-medium">{loan.creditRequired}+</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => console.log('Negotiating terms for loan:', loan.id)}>
                        Negotiate Terms
                      </Button>
                      <Button variant="default" className="flex-1" onClick={() => console.log('Applying for P2P loan:', loan.id)}>
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-primary/20 bg-gradient-subtle">
                <CardContent className="pt-4 text-center">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium mb-2">Become a Lender</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Earn 8-15% returns by lending to other players
                  </p>
                  <Button variant="premium" onClick={() => console.log('Starting lending process')}>
                    Start Lending
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}