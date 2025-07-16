import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { HandCoins, DollarSign } from 'lucide-react';

const P2PLendingForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    interest_rate: '',
    term_months: '',
    purpose: '',
    monthly_payment: ''
  });

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(formData.amount) || 0;
    const monthlyRate = (parseFloat(formData.interest_rate) || 0) / 100 / 12;
    const numPayments = parseInt(formData.term_months) || 1;
    
    if (principal > 0 && monthlyRate > 0) {
      const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1);
      setFormData(prev => ({ ...prev, monthly_payment: monthlyPayment.toFixed(2) }));
    }
  };

  React.useEffect(() => {
    calculateMonthlyPayment();
  }, [formData.amount, formData.interest_rate, formData.term_months]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('loans')
        .insert({
          lender_id: user.id,
          amount: parseFloat(formData.amount),
          interest_rate: parseFloat(formData.interest_rate),
          term_months: parseInt(formData.term_months),
          purpose: formData.purpose,
          monthly_payment: parseFloat(formData.monthly_payment),
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Loan Listed Successfully",
        description: "Your loan offer has been posted to the marketplace.",
        variant: "default"
      });

      setFormData({
        amount: '',
        interest_rate: '',
        term_months: '',
        purpose: '',
        monthly_payment: ''
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create loan offer",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="financial" className="w-full">
          <HandCoins className="h-4 w-4 mr-2" />
          Create Loan Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>P2P Lending Offer</DialogTitle>
          <DialogDescription>
            Create a loan offer for other players to borrow from you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Loan Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="10000"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="interest_rate">Interest Rate (%)</Label>
              <Input
                id="interest_rate"
                type="number"
                step="0.01"
                value={formData.interest_rate}
                onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                placeholder="5.50"
                required
              />
            </div>
            <div>
              <Label htmlFor="term_months">Term (Months)</Label>
              <Select value={formData.term_months} onValueChange={(value) => setFormData({ ...formData, term_months: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                  <SelectItem value="48">48 months</SelectItem>
                  <SelectItem value="60">60 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debt_consolidation">Debt Consolidation</SelectItem>
                <SelectItem value="home_improvement">Home Improvement</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="auto">Auto Purchase</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.monthly_payment && (
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Estimated Monthly Payment</div>
                  <div className="text-2xl font-bold text-success">${formData.monthly_payment}</div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Offer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default P2PLendingForm;