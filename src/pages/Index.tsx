
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, Loader2 } from "lucide-react";
import { useChallenges } from "@/hooks/useChallenges";

const Index = () => {
  const { data: challenges, isLoading, error } = useChallenges();

  // Helper function to extract difficulty from description or title
  const getDifficulty = (title: string, description: string | null) => {
    const text = `${title} ${description || ''}`.toLowerCase();
    if (text.includes('rookie') || text.includes('easy')) return 'Easy';
    if (text.includes('hard') || text.includes('legendary')) return 'Hard';
    return 'Medium';
  };

  // Helper function to generate mock progress data
  const getProgressData = (id: string) => {
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const progress = Math.abs(hash) % 8 + 1;
    const total = Math.abs(hash) % 20 + 5;
    return { progress: Math.min(progress, total), total };
  };

  // Helper function to generate mock participants
  const getParticipants = (id: string) => {
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash) % 2000 + 500;
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NBA TopShot Challenges
            </h1>
            <p className="text-xl text-gray-300">
              Complete challenges to earn exclusive rewards and boost your collector score
            </p>
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NBA TopShot Challenges
            </h1>
            <p className="text-xl text-red-400">
              Error loading challenges. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!challenges || challenges.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              NBA TopShot Challenges
            </h1>
            <p className="text-xl text-gray-300">
              No active challenges at the moment. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            NBA TopShot Challenges
          </h1>
          <p className="text-xl text-gray-300">
            Complete challenges to earn exclusive rewards and boost your collector score
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {challenges.map((challenge) => {
            const difficulty = getDifficulty(challenge.title, challenge.description);
            const { progress, total } = getProgressData(challenge.id);
            const participants = getParticipants(challenge.id);

            return (
              <Card key={challenge.id} className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-purple-500 bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-gray-100">
                      {challenge.title}
                    </CardTitle>
                    <Badge className={getDifficultyColor(difficulty)}>
                      {difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    {challenge.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
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
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{participants.toLocaleString()} participants</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-200">Progress</span>
                      <span className="text-gray-400">
                        {progress}/{total} completed
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(progress / total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
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
