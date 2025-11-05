import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Award, BarChart3, Settings, Shield } from "lucide-react";

export function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Complete guide to using the StudentAchieve platform for tracking and managing extracurricular achievements.
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="student">Student Guide</TabsTrigger>
            <TabsTrigger value="admin">Admin Guide</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Welcome to StudentAchieve</CardTitle>
                <CardDescription>
                  Learn how to get started with our comprehensive achievement management platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">What is StudentAchieve?</h3>
                  <p className="text-muted-foreground">
                    StudentAchieve is a comprehensive platform designed to help schools track, manage, and celebrate student extracurricular achievements. 
                    From sports awards to academic competitions, volunteer work to artistic accomplishments, StudentAchieve makes it easy to record and showcase every success.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Student dashboard for viewing personal achievements and progress</li>
                    <li>Admin panel for managing student records and generating reports</li>
                    <li>Achievement tracking across multiple categories and levels</li>
                    <li>Digital portfolios for students to showcase their accomplishments</li>
                    <li>Analytics and reporting tools for administrators</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Quick Start</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Navigate to the Student View or Admin Panel from the top navigation</li>
                    <li>For students: Browse your achievements, view your progress, and explore your digital portfolio</li>
                    <li>For admins: Add new achievements, manage student records, and generate reports</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="student" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-success rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-success-foreground" />
                </div>
                <CardTitle>Student Guide</CardTitle>
                <CardDescription>How to use the student dashboard effectively</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Viewing Your Achievements</h3>
                  <p className="text-muted-foreground mb-2">
                    The student dashboard displays all your recorded achievements in an easy-to-browse format:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>View achievements by category (Sports, Academic, Arts, etc.)</li>
                    <li>Filter by achievement level (School, District, State, National, International)</li>
                    <li>See detailed information about each achievement including date and description</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Understanding Achievement Levels</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li><strong>School:</strong> Recognition within your school</li>
                    <li><strong>District:</strong> Achievement across your school district</li>
                    <li><strong>State:</strong> State-level recognition</li>
                    <li><strong>National:</strong> National-level achievement</li>
                    <li><strong>International:</strong> Global recognition</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tracking Your Progress</h3>
                  <p className="text-muted-foreground">
                    Use the progress tracking section to monitor your growth over time, view your participation in different categories, 
                    and set goals for future achievements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-gold-foreground" />
                </div>
                <CardTitle>Administrator Guide</CardTitle>
                <CardDescription>Managing achievements and generating reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Adding New Achievements</h3>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Click the "Add Achievement" button in the admin panel</li>
                    <li>Select the student from the dropdown</li>
                    <li>Choose the achievement category and level</li>
                    <li>Enter the achievement title and description</li>
                    <li>Set the achievement date</li>
                    <li>Save the achievement to add it to the student's record</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Managing Student Records</h3>
                  <p className="text-muted-foreground mb-2">
                    The Student Management tab allows you to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>View all students and their achievement counts</li>
                    <li>Edit or delete existing achievements</li>
                    <li>View detailed student profiles</li>
                    <li>Track top performers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Generating Reports</h3>
                  <p className="text-muted-foreground">
                    Use the Reports tab to generate comprehensive reports on student achievements, participation trends, 
                    and category distribution. Export reports in various formats for sharing and archiving.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>Achievement Categories</CardTitle>
                <CardDescription>Understanding different types of achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sports & Athletics</h3>
                  <p className="text-muted-foreground">
                    Individual and team sports achievements including competitions, championships, MVPs, and athletic excellence awards.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Academic Excellence</h3>
                  <p className="text-muted-foreground">
                    Academic competitions, honor rolls, subject-specific awards, research achievements, and scholarly recognitions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Arts & Performance</h3>
                  <p className="text-muted-foreground">
                    Music, theater, visual arts, dance, and other performing arts achievements and recognitions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Community Service</h3>
                  <p className="text-muted-foreground">
                    Volunteer work, community engagement, service projects, and leadership in community initiatives.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Leadership & Clubs</h3>
                  <p className="text-muted-foreground">
                    Student government, club leadership positions, organizing events, and demonstrating leadership skills.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">STEM & Technology</h3>
                  <p className="text-muted-foreground">
                    Science fairs, robotics competitions, coding challenges, engineering projects, and technology innovations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-warning-foreground" />
                </div>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Understanding data and generating insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Overview Statistics</h3>
                  <p className="text-muted-foreground">
                    The admin dashboard provides key metrics including total students tracked, achievements recorded, 
                    average achievements per student, and monthly achievement trends.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Available Reports</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Student achievement summary reports</li>
                    <li>Category distribution analysis</li>
                    <li>Achievement level breakdown</li>
                    <li>Participation trends over time</li>
                    <li>Top performers listing</li>
                    <li>Custom date range reports</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Exporting Data</h3>
                  <p className="text-muted-foreground">
                    Export reports in PDF, Excel, or CSV formats for sharing with stakeholders, archiving, or further analysis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-success-foreground" />
                </div>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How do I add a new achievement?</h3>
                  <p className="text-muted-foreground">
                    Administrators can add achievements through the Admin Panel by clicking "Add Achievement" and filling out the required information.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can students add their own achievements?</h3>
                  <p className="text-muted-foreground">
                    Currently, only administrators can add achievements to ensure accuracy and verification. Students can view their achievements through the Student Dashboard.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">How are achievement levels determined?</h3>
                  <p className="text-muted-foreground">
                    Achievement levels (School, District, State, National, International) are based on the scope and reach of the recognition. 
                    Administrators select the appropriate level when adding an achievement.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I edit or delete achievements?</h3>
                  <p className="text-muted-foreground">
                    Yes, administrators can edit or delete achievements from the Recent Achievements table in the Admin Panel.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">How do I generate a report?</h3>
                  <p className="text-muted-foreground">
                    Navigate to the Reports tab in the Admin Panel, select your desired filters and date range, then click "Export Report" to generate and download your report.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">What categories of achievements are supported?</h3>
                  <p className="text-muted-foreground">
                    StudentAchieve supports a wide range of categories including Sports, Academic, Arts, Community Service, Leadership, STEM, and more. 
                    Contact your administrator to add custom categories if needed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
