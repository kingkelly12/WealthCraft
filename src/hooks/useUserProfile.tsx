import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Tables } from '@/integrations/supabase/types';

export type UserProfile = Tables<'profiles'>;
export type UserAsset = Tables<'user_assets'>;
export type UserLiability = Tables<'liabilities'>;
export type UserJob = Tables<'jobs'>;
export type FamilyMember = Tables<'family_members'>;
export type LifeGoal = Tables<'life_goals'>;
export type Course = Tables<'courses'>;
export type UserCourse = Tables<'user_courses'>;

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [assets, setAssets] = useState<UserAsset[]>([]);
  const [liabilities, setLiabilities] = useState<UserLiability[]>([]);
  const [currentJob, setCurrentJob] = useState<UserJob | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>([]);
  const [calculatedNetWorth, setCalculatedNetWorth] = useState<number>(0);
  const [calculatedIncome, setCalculatedIncome] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch all user data in parallel
      const [
        { data: profileData, error: profileError },
        { data: assetsData, error: assetsError },
        { data: liabilitiesData, error: liabilitiesError },
        { data: jobData, error: jobError },
        { data: familyData, error: familyError },
        { data: goalsData, error: goalsError }
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).single(),
        supabase.from('user_assets').select('*').eq('user_id', user.id),
        supabase.from('liabilities').select('*').eq('user_id', user.id),
        supabase.from('jobs').select('*').eq('user_id', user.id).eq('is_current', true).maybeSingle(),
        supabase.from('family_members').select('*').eq('user_id', user.id),
        supabase.from('life_goals').select('*').eq('user_id', user.id)
      ]);

      if (profileError) throw profileError;
      if (assetsError) throw assetsError;
      if (liabilitiesError) throw liabilitiesError;
      if (jobError) throw jobError;
      if (familyError) throw familyError;
      if (goalsError) throw goalsError;

      setProfile(profileData);
      setAssets(assetsData || []);
      setLiabilities(liabilitiesData || []);
      setCurrentJob(jobData);
      setFamilyMembers(familyData || []);
      setLifeGoals(goalsData || []);

      // Calculate net worth and income
      const totalAssets = (assetsData || []).reduce((sum, asset) => sum + Number(asset.value), 0);
      const totalLiabilities = (liabilitiesData || []).reduce((sum, liability) => sum + Number(liability.amount), 0);
      const netWorth = totalAssets - totalLiabilities;
      
      const jobIncome = jobData ? Number(jobData.salary) / 12 : 0;
      const familyIncome = (familyData || []).reduce((sum, member) => sum + Number(member.income), 0);
      const monthlyIncome = jobIncome + familyIncome;

      setCalculatedNetWorth(netWorth);
      setCalculatedIncome(monthlyIncome);

      // Update profile with calculated values
      if (profileData) {
        await supabase
          .from('profiles')
          .update({ 
            net_worth: netWorth,
            monthly_income: monthlyIncome 
          })
          .eq('user_id', user.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const addAsset = async (asset: Omit<UserAsset, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { data, error } = await supabase
        .from('user_assets')
        .insert({ ...asset, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setAssets(prev => [...prev, data]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add asset';
      return { data: null, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const addLiability = async (liability: Omit<UserLiability, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { data, error } = await supabase
        .from('liabilities')
        .insert({ ...liability, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setLiabilities(prev => [...prev, data]);
      await fetchProfile(); // Recalculate net worth
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add liability';
      return { data: null, error: errorMessage };
    }
  };

  return {
    profile,
    assets,
    liabilities,
    currentJob,
    familyMembers,
    lifeGoals,
    calculatedNetWorth,
    calculatedIncome,
    loading,
    error,
    updateProfile,
    addAsset,
    addLiability,
    refetch: fetchProfile
  };
};