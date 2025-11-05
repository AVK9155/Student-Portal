import { useState, useEffect } from "react";
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
  Search, 
  Filter,
  Download,
  BarChart3,
  Award,
  Star
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AddAchievementDialog } from "./AddAchievementDialog";

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("achievement_date", { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load achievements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const overviewStats = {
    totalStudents: new Set(achievements.map(a => a.student_id)).size,
    totalAchievements: achievements.length,
    thisMonthAchievements: achievements.filter(a => {
      const date = new Date(a.achievement_date);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    averagePerStudent: (achievements.length / Math.max(new Set(achievements.map(a => a.student_id)).size, 1)).toFixed(1)
  };

  const filteredAchievements = achievements.filter(achievement =>
    achievement.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.achievement_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ["Student Name", "Student ID", "Achievement", "Category", "Level", "Date", "Added By"];
    const rows = achievements.map(a => [
      a.student_name,
      a.student_id,
      a.achievement_title,
      a.category,
      a.level,
      new Date(a.achievement_date).toLocaleDateString(),
      a.added_by
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `achievements-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Report exported successfully",
    });
  };

  const topPerformers = [...new Set(achievements.map(a => a.student_id))]
    .map(studentId => {
      const studentAchievements = achievements.filter(a => a.student_id === studentId);
      return {
        id: studentId,
        name: studentAchievements[0]?.student_name || "",
        achievements: studentAchievements.length,
        points: studentAchievements.length * 30
      };
    })
    .sort((a, b) => b.achievements - a.achievements)
    .slice(0, 5);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'International': return 'bg-gold text-gold-foreground';
      case 'National': return 'bg-primary text-primary-foreground';
      case 'State': return 'bg-accent text-accent-foreground';
      case 'District': return 'bg-success text-success-foreground';
      case 'School': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
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
          <AddAchievementDialog onAchievementAdded={fetchAchievements} />
          <Button variant="outline" className="flex items-center space-x-2" onClick={exportToCSV}>
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
            <p className="text-xs text-muted-foreground mt-1">Active students</p>
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
            <p className="text-xs text-muted-foreground mt-1">All time</p>
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
            <p className="text-xs text-muted-foreground mt-1">New achievements</p>
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
            <p className="text-xs text-muted-foreground mt-1">Achievement average</p>
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Loading achievements...
                      </TableCell>
                    </TableRow>
                  ) : filteredAchievements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No achievements found. Add your first achievement to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAchievements.map((achievement) => (
                      <TableRow key={achievement.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{achievement.student_name}</div>
                            <div className="text-sm text-muted-foreground">{achievement.student_id}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{achievement.achievement_title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{achievement.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getLevelColor(achievement.level)}>
                            {achievement.level}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(achievement.achievement_date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-muted-foreground">{achievement.added_by}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
                    {topPerformers.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No achievements yet</p>
                    ) : (
                      topPerformers.map((student, index) => (
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
                      ))
                    )}
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
