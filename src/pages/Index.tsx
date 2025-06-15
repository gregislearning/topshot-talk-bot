
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, Loader2, Target, BarChart3, LogOut, User } from "lucide-react";
import { useChallenges } from "@/hooks/useChallenges";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { data: challenges, isLoading, error } = useChallenges();
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
          <span className="text-gray-300">Loading...</span>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-900 text-green-200";
      case "Medium": return "bg-yellow-900 text-yellow-200";
      case "Hard": return "bg-red-900 text-red-200";
      default: return "bg-gray-800 text-gray-200";
    }
  };

  const formatDeadline = (countdownFormatted: string | null) => {
    if (!countdownFormatted) return "TBD";
    return countdownFormatted;
  };

  const getCompletionStatus = (analysis: any) => {
    if (!analysis) return { canComplete: false, percentage: 0 };
    return {
      canComplete: analysis.can_complete || false,
      percentage: analysis.completion_percentage || 0
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with user info */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NBA TopShot Challenges
              </h1>
              <p className="text-xl text-gray-300">
                Complete challenges to earn exclusive rewards and boost your collector score
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
            <span className="ml-2 text-gray-300">Loading challenges...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with user info */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NBA TopShot Challenges
              </h1>
              <p className="text-xl text-red-400">
                Error loading challenges. Please try again later.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with user info */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                NBA TopShot Challenges
              </h1>
              <p className="text-xl text-gray-300">
                No active challenges at the moment. Check back soon!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with user info */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NBA TopShot Challenges
            </h1>
            <p className="text-xl text-gray-300">
              Complete challenges to earn exclusive rewards and boost your collector score
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <User className="h-4 w-4" />
              <span className="text-sm">{user.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {challenges.map((challenge) => {
            const requiredCards = challenge.required_cards as any[] || [];
            const { canComplete, percentage } = getCompletionStatus(challenge.analysis);
            const totalCards = requiredCards.length;

            return (
              <Card key={challenge.id} className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-purple-500 bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-gray-100">
                      {challenge.title}
                    </CardTitle>
                    <Badge className={canComplete ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"}>
                      {canComplete ? "Completable" : "Missing Cards"}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    {challenge.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {challenge.analysis && (
                    <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-blue-400" />
                        <span className="font-semibold text-blue-300">Analysis Results</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Completion:</span>
                          <span className="text-blue-200">{percentage}%</span>
                        </div>
                        {challenge.analysis.exact_matches !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Exact Matches:</span>
                            <span className="text-green-200">{challenge.analysis.exact_matches}</span>
                          </div>
                        )}
                        {challenge.analysis.missing_cards !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Missing Cards:</span>
                            <span className="text-red-200">{challenge.analysis.missing_cards}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {totalCards > 0 && (
                    <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-purple-400" />
                        <span className="font-semibold text-purple-300">Required Cards ({totalCards})</span>
                      </div>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {requiredCards.map((card, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300 truncate">{card.title}</span>
                            {card.rarity && (
                              <Badge variant="outline" className="text-xs ml-2 border-gray-500 text-gray-300">
                                {card.rarity}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="h-4 w-4 text-purple-400" />
                      <span className="font-semibold text-purple-300">Reward</span>
                    </div>
                    <p className="text-purple-200">Exclusive Badge + Premium Pack</p>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {formatDeadline(challenge.countdown_formatted)}</span>
                    </div>
                  </div>

                  {challenge.analysis && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-200">Progress</span>
                        <span className="text-gray-400">
                          {percentage}% completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            More challenges coming soon! Keep collecting to stay ahead of the game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
