import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Calendar, Star, Download, Eye, TrendingUp } from "lucide-react";

export function StudentDashboard() {
  const achievements = [
    {
      id: 1,
      title: "Science Fair Winner",
      category: "Academic Competition",
      date: "2024-03-15",
      level: "Gold",
      description: "First place in Regional Science Fair with innovative renewable energy project"
    },
    {
      id: 2,
      title: "Debate Team Captain",
      category: "Leadership",
      date: "2024-02-01",
      level: "Leadership",
      description: "Led the school debate team to victory in the inter-school championship"
    },
    {
      id: 3,
      title: "Community Service Award",
      category: "Volunteer Work",
      date: "2024-01-20",
      level: "Silver",
      description: "Completed 100+ hours of community service at local food bank"
    },
    {
      id: 4,
      title: "Basketball MVP",
      category: "Sports",
      date: "2023-12-10",
      level: "Gold",
      description: "Most Valuable Player in the regional basketball tournament"
    }
  ];

  const stats = {
    totalAchievements: 12,
    goldAwards: 5,
    silverAwards: 4,
    participationPoints: 350
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold': return 'bg-gold text-gold-foreground';
      case 'Silver': return 'bg-muted text-muted-foreground';
      case 'Leadership': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic Competition': return <Trophy className="w-4 h-4" />;
      case 'Leadership': return <Star className="w-4 h-4" />;
      case 'Volunteer Work': return <Award className="w-4 h-4" />;
      case 'Sports': return <TrendingUp className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Achievement Portfolio</h1>
        <p className="text-muted-foreground">Track your extracurricular accomplishments and showcase your growth</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalAchievements}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gold Awards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gold">{stats.goldAwards}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Silver Awards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{stats.silverAwards}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Participation Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.participationPoints}</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="mb-8 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Annual Progress</span>
          </CardTitle>
          <CardDescription>Your achievement progress for the academic year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Leadership Activities</span>
                <span>3/5 Goal</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Community Service Hours</span>
                <span>120/150 Hours</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Academic Competitions</span>
                <span>4/3 Goal</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Recent Achievements</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Portfolio</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Public View</span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="shadow-card hover:shadow-achievement transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 gradient-success rounded-lg flex items-center justify-center">
                      {getCategoryIcon(achievement.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getLevelColor(achievement.level)}>
                    {achievement.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{achievement.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{achievement.category}</Badge>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <Button size="lg" className="mr-4">
          View All Achievements
        </Button>
        <Button variant="outline" size="lg">
          Share Portfolio
        </Button>
      </div>
    </div>
  );
}