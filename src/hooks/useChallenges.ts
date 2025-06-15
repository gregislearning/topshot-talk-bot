
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      console.log('Fetching challenges from Supabase...');
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching challenges:', error);
        throw error;
      }

      console.log('Challenges fetched:', data);
      return data;
    },
  });
};
