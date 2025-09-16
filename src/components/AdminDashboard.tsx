import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  Download,
  BarChart3,
  Award,
  Star
} from "lucide-react";

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const overviewStats = {
    totalStudents: 1250,
    totalAchievements: 4500,
    thisMonthAchievements: 345,
    averagePerStudent: 3.6
  };

  const recentAchievements = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentId: "ST2024001",
      achievement: "Science Fair Winner",
      category: "Academic Competition",
      level: "Gold",
      date: "2024-03-15",
      addedBy: "Prof. Smith"
    },
    {
      id: 2,
      studentName: "Mike Chen",
      studentId: "ST2024002",
      achievement: "Basketball MVP",
      category: "Sports",
      level: "Gold",
      date: "2024-03-12",
      addedBy: "Coach Wilson"
    },
    {
      id: 3,
      studentName: "Emma Davis",
      studentId: "ST2024003",
      achievement: "Volunteer of the Month",
      category: "Community Service",
      level: "Silver",
      date: "2024-03-10",
      addedBy: "Ms. Rodriguez"
    },
    {
      id: 4,
      studentName: "Alex Thompson",
      studentId: "ST2024004",
      achievement: "Debate Team Captain",
      category: "Leadership",
      level: "Leadership",
      date: "2024-03-08",
      addedBy: "Mr. Brown"
    }
  ];

  const topPerformers = [
    { name: "Sarah Johnson", id: "ST2024001", achievements: 15, points: 450 },
    { name: "Mike Chen", id: "ST2024002", achievements: 12, points: 380 },
    { name: "Emma Davis", id: "ST2024003", achievements: 11, points: 340 },
    { name: "Alex Thompson", id: "ST2024004", achievements: 10, points: 320 },
    { name: "Lisa Wang", id: "ST2024005", achievements: 9, points: 295 }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold': return 'bg-gold text-gold-foreground';
      case 'Silver': return 'bg-muted text-muted-foreground';
      case 'Leadership': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage student achievements and track performance</p>
        </div>
        <div className="flex space-x-3">
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Achievement</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Total Students</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{overviewStats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-success mt-1">+12% from last semester</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Total Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gold">{overviewStats.totalAchievements.toLocaleString()}</div>
            <p className="text-xs text-success mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>This Month</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{overviewStats.thisMonthAchievements}</div>
            <p className="text-xs text-success mt-1">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Avg per Student</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{overviewStats.averagePerStudent}</div>
            <p className="text-xs text-success mt-1">+0.3 from last semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recent">Recent Achievements</TabsTrigger>
          <TabsTrigger value="students">Student Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Latest achievements added to the system</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search achievements..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAchievements.map((achievement) => (
                    <TableRow key={achievement.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{achievement.studentName}</div>
                          <div className="text-sm text-muted-foreground">{achievement.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{achievement.achievement}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{achievement.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLevelColor(achievement.level)}>
                          {achievement.level}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(achievement.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-muted-foreground">{achievement.addedBy}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>Manage student records and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Student management interface would be implemented here</p>
                    <Button variant="outline" className="mt-4">
                      Add New Student
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-gold" />
                    <span>Top Performers</span>
                  </CardTitle>
                  <CardDescription>Students with most achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.id}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{student.achievements}</div>
                          <div className="text-xs text-muted-foreground">{student.points}pts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Achievement trends and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Analytics charts and visualizations would be implemented here</p>
                <Button variant="outline" className="mt-4">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Report Generation</CardTitle>
              <CardDescription>Create comprehensive achievement reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Report generation tools would be implemented here</p>
                <div className="flex justify-center space-x-2 mt-4">
                  <Button variant="outline">Weekly Report</Button>
                  <Button variant="outline">Monthly Report</Button>
                  <Button variant="outline">Annual Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}