import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';
import { useContacts } from '@/hooks/useContacts';
import { Settings, Plus, X, DollarSign, Users, Target, Heart, ContactIcon, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const UserProfileSettings = () => {
  const { profile, updateProfile } = useUserProfile();
  const { toast } = useToast();
  const { contacts, requestPermission, hasPermission } = useContacts();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  // Form states
  const [username, setUsername] = useState(profile?.username || '');
  const [monthlyIncome, setMonthlyIncome] = useState(profile?.monthly_income || 0);
  const [netWorth, setNetWorth] = useState(profile?.net_worth || 0);
  const [retirementGoal, setRetirementGoal] = useState(profile?.retirement_goal || 1000000);
  const [familyMembers, setFamilyMembers] = useState<any[]>(Array.isArray(profile?.family_members) ? profile.family_members : []);
  const [lifeGoals, setLifeGoals] = useState<any[]>(Array.isArray(profile?.life_goals) ? profile.life_goals : []);

  // Family member form
  const [newMember, setNewMember] = useState({ name: '', age: '', relationship: '', phone: '' });
  
  // Life goal form
  const [newGoal, setNewGoal] = useState({ title: '', target_amount: '', deadline: '', priority: 'medium' });

  const handleSave = async () => {
    setLoading(true);
    const { error } = await updateProfile({
      username,
      monthly_income: monthlyIncome,
      net_worth: netWorth,
      retirement_goal: retirementGoal,
      family_members: familyMembers,
      life_goals: lifeGoals,
    });

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
        variant: "default"
      });
      setIsOpen(false);
    }
    setLoading(false);
  };

  const addFamilyMember = async () => {
    if (newMember.name && newMember.age && newMember.relationship) {
      const memberToAdd = { ...newMember, id: Date.now() };
      setFamilyMembers([...familyMembers, memberToAdd]);
      
      // Send SMS invitation if phone number is provided
      if (newMember.phone) {
        try {
          await supabase.functions.invoke('send-family-invite', {
            body: {
              to: newMember.phone,
              familyMemberName: newMember.name,
              inviterName: profile?.username || 'A family member'
            }
          });
          
          toast({
            title: "Family member added!",
            description: `Invitation sent to ${newMember.name}`,
            variant: "default"
          });
        } catch (error) {
          toast({
            title: "Member added",
            description: "SMS invitation could not be sent",
            variant: "destructive"
          });
        }
      }
      
      setNewMember({ name: '', age: '', relationship: '', phone: '' });
    }
  };

  const selectFromContacts = (contact: any) => {
    setNewMember({
      ...newMember,
      name: contact.name,
      phone: contact.phone
    });
    setShowContacts(false);
  };

  const handleContactPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      setShowContacts(true);
    }
  };

  const removeFamilyMember = (id: number) => {
    setFamilyMembers(familyMembers.filter((member: any) => member.id !== id));
  };

  const addLifeGoal = () => {
    if (newGoal.title && newGoal.target_amount) {
      setLifeGoals([...lifeGoals, { ...newGoal, id: Date.now(), target_amount: parseFloat(newGoal.target_amount) }]);
      setNewGoal({ title: '', target_amount: '', deadline: '', priority: 'medium' });
    }
  };

  const removeLifeGoal = (id: number) => {
    setLifeGoals(lifeGoals.filter((goal: any) => goal.id !== id));
  };

  React.useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setMonthlyIncome(Number(profile.monthly_income) || 0);
      setNetWorth(Number(profile.net_worth) || 0);
      setRetirementGoal(Number(profile.retirement_goal) || 1000000);
      setFamilyMembers(Array.isArray(profile.family_members) ? profile.family_members : []);
      setLifeGoals(Array.isArray(profile.life_goals) ? profile.life_goals : []);
    }
  }, [profile]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your profile information, family details, and financial goals.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthly-income">Monthly Income</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="monthly-income"
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
                      placeholder="5000"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="net-worth">Current Net Worth</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="net-worth"
                      type="number"
                      value={netWorth}
                      onChange={(e) => setNetWorth(parseFloat(e.target.value) || 0)}
                      placeholder="50000"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="retirement-goal">Retirement Goal</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="retirement-goal"
                    type="number"
                    value={retirementGoal}
                    onChange={(e) => setRetirementGoal(parseFloat(e.target.value) || 0)}
                    placeholder="1000000"
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Members */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Family Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      onFocus={() => !hasPermission && handleContactPermission()}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={handleContactPermission}
                    >
                      <ContactIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Age"
                    type="number"
                    value={newMember.age}
                    onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                    className="w-20"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Phone (optional)"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    className="flex-1"
                  />
                  <Select value={newMember.relationship} onValueChange={(value) => setNewMember({ ...newMember, relationship: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="Aunt">Aunt</SelectItem>
                      <SelectItem value="Uncle">Uncle</SelectItem>
                      <SelectItem value="Cousin">Cousin</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addFamilyMember} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Contacts List */}
                {showContacts && (
                  <Collapsible open={showContacts} onOpenChange={setShowContacts}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <ContactIcon className="h-4 w-4 mr-2" />
                        Select from Contacts
                        <ChevronDown className="h-4 w-4 ml-auto" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="max-h-40 overflow-y-auto border rounded-md mt-2">
                      {contacts.map((contact, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                          onClick={() => selectFromContacts(contact)}
                        >
                          <div className="font-medium">{contact.name}</div>
                          {contact.phone && (
                            <div className="text-sm text-muted-foreground">{contact.phone}</div>
                          )}
                        </div>
                      ))}
                      {contacts.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">
                          No contacts available
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
              <div className="space-y-2">
                {familyMembers.map((member: any) => (
                  <div key={member.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <span className="font-medium">{member.name} ({member.age}) - {member.relationship}</span>
                      {member.phone && (
                        <div className="text-sm text-muted-foreground">{member.phone}</div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFamilyMember(member.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Life Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                Life Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
                <Input
                  placeholder="Target amount"
                  type="number"
                  value={newGoal.target_amount}
                  onChange={(e) => setNewGoal({ ...newGoal, target_amount: e.target.value })}
                />
                <Input
                  placeholder="Deadline (YYYY-MM-DD)"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
                <div className="flex gap-2">
                  <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({ ...newGoal, priority: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addLifeGoal} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {lifeGoals.map((goal: any) => (
                  <div key={goal.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <span className="font-medium">{goal.title}</span>
                      <div className="text-sm text-muted-foreground">
                        ${goal.target_amount?.toLocaleString()} • {goal.deadline} 
                        <Badge variant="outline" className="ml-2">{goal.priority}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeLifeGoal(goal.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileSettings;