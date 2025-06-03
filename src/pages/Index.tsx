
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
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            NBA TopShot Challenges
          </h1>
          <p className="text-xl text-gray-600">
            Complete challenges to earn exclusive rewards and boost your collector score
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {activeChallenges.map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {challenge.title}
                  </CardTitle>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600">
                  {challenge.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-purple-900">Reward</span>
                  </div>
                  <p className="text-purple-800">{challenge.reward}</p>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
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
                    <span className="font-medium">Progress</span>
                    <span className="text-gray-600">
                      {challenge.progress}/{challenge.total} completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
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
          <p className="text-gray-500">
            More challenges coming soon! Keep collecting to stay ahead of the game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
