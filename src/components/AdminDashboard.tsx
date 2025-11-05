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
  Calendar, 
  Plus, 
  Search, 
  Filter,
  Download,
  BarChart3,
  Award,
  Star,
  Trash2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AddAchievementDialog } from "./AddAchievementDialog";

interface Achievement {
  id: string;
  student_name: string;
  student_id: string;
  achievement_title: string;
  category: string;
  level: string;
  achievement_date: string;
  description: string | null;
  added_by: string;
}

export function AdminDashboard() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("achievement_date", { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      toast({
        title: "Error",
        description: "Failed to load achievements",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    try {
      const { error } = await supabase
        .from("achievements")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Achievement deleted successfully"
      });
      fetchAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive"
      });
    }
  };

  const handleExportReport = () => {
    const csvContent = [
      ["Student Name", "Student ID", "Achievement", "Category", "Level", "Date", "Added By"],
      ...achievements.map(a => [
        a.student_name,
        a.student_id,
        a.achievement_title,
        a.category,
        a.level,
        new Date(a.achievement_date).toLocaleDateString(),
        a.added_by
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `achievements-report-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Report exported successfully"
    });
  };

  const uniqueStudents = new Set(achievements.map(a => a.student_id)).size;
  const thisMonth = new Date();
  thisMonth.setDate(1);
  const thisMonthCount = achievements.filter(a => 
    new Date(a.achievement_date) >= thisMonth
  ).length;

  const overviewStats = {
    totalStudents: uniqueStudents,
    totalAchievements: achievements.length,
    thisMonthAchievements: thisMonthCount,
    averagePerStudent: uniqueStudents > 0 ? (achievements.length / uniqueStudents).toFixed(1) : "0"
  };

  const filteredAchievements = achievements.filter(a =>
    a.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.achievement_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topPerformers = [
    { name: "Sarah Johnson", id: "ST2024001", achievements: 15, points: 450 },
    { name: "Mike Chen", id: "ST2024002", achievements: 12, points: 380 },
    { name: "Emma Davis", id: "ST2024003", achievements: 11, points: 340 },
    { name: "Alex Thompson", id: "ST2024004", achievements: 10, points: 320 },
    { name: "Lisa Wang", id: "ST2024005", achievements: 9, points: 295 }
  ];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'international': return 'bg-gold text-gold-foreground';
      case 'national': return 'bg-warning text-warning-foreground';
      case 'state': return 'bg-success text-success-foreground';
      case 'district': return 'bg-accent text-accent-foreground';
      case 'school': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <>
      <AddAchievementDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSuccess={fetchAchievements}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage student achievements and track performance</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              className="flex items-center space-x-2"
              onClick={() => setAddDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Add Achievement</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={handleExportReport}
              disabled={achievements.length === 0}
            >
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
            <p className="text-xs text-muted-foreground mt-1">Per student average</p>
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
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading achievements...</div>
              ) : filteredAchievements.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No achievements found</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setAddDialogOpen(true)}
                  >
                    Add First Achievement
                  </Button>
                </div>
              ) : (
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
                    {filteredAchievements.map((achievement) => (
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
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteAchievement(achievement.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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
    </>
  );
}