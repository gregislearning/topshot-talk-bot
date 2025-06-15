
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      console.log('Fetching challenges with related data from Supabase...');
      
      // Fetch challenges with their required cards using the view
      const { data: challengesData, error: challengesError } = await supabase
        .from('challenges_with_cards')
        .select('*')
        .order('created_at', { ascending: false });

      if (challengesError) {
        console.error('Error fetching challenges:', challengesError);
        throw challengesError;
      }

      // Fetch latest analysis data for each challenge
      const { data: analysisData, error: analysisError } = await supabase
        .from('latest_challenge_analysis')
        .select('*');

      if (analysisError) {
        console.error('Error fetching challenge analysis:', analysisError);
        // Don't throw here, analysis data is optional
      }

      // Combine the data
      const challengesWithAnalysis = challengesData?.map(challenge => {
        const analysis = analysisData?.find(a => a.challenge_id === challenge.id);
        return {
          ...challenge,
          analysis
        };
      });

      console.log('Challenges with related data fetched:', challengesWithAnalysis);
      return challengesWithAnalysis || [];
    },
  });
};
