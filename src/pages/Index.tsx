
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users } from "lucide-react";

const Index = () => {
  const activeChallenges = [
    {
      id: 1,
      title: "Rookie Rising Stars",
      description: "Collect moments from the top rookies of the 2023-24 season",
      reward: "Exclusive Rookie Badge + Pack",
      deadline: "Dec 15, 2024",
      participants: 1247,
      difficulty: "Easy",
      progress: 3,
      total: 5
    },
    {
      id: 2,
      title: "Playoff Legends",
      description: "Gather legendary playoff moments from NBA history",
      reward: "Legendary Pack + 500 Collector Score",
      deadline: "Dec 20, 2024",
      participants: 892,
      difficulty: "Hard",
      progress: 1,
      total: 8
    },
    {
      id: 3,
      title: "Team Spirit",
      description: "Complete a set featuring all 30 NBA teams",
      reward: "Team Spirit Badge + Rare Pack",
      deadline: "Jan 5, 2025",
      participants: 2156,
      difficulty: "Medium",
      progress: 12,
      total: 30
    },
    {
      id: 4,
      title: "Dunk Masters",
      description: "Collect the most spectacular dunks of the season",
      reward: "Dunk Master Trophy + Premium Pack",
      deadline: "Dec 30, 2024",
      participants: 756,
      difficulty: "Medium",
      progress: 2,
      total: 6
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-900 text-green-200";
      case "Medium": return "bg-yellow-900 text-yellow-200";
      case "Hard": return "bg-red-900 text-red-200";
      default: return "bg-gray-800 text-gray-200";
    }
  };

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
          {activeChallenges.map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-purple-500 bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-gray-100">
                    {challenge.title}
                  </CardTitle>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  {challenge.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-4 w-4 text-purple-400" />
                    <span className="font-semibold text-purple-300">Reward</span>
                  </div>
                  <p className="text-purple-200">{challenge.reward}</p>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {challenge.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{challenge.participants.toLocaleString()} participants</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-200">Progress</span>
                    <span className="text-gray-400">
                      {challenge.progress}/{challenge.total} completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
