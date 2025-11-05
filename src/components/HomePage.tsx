import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, BarChart3, Award, Star, TrendingUp, Shield, Zap } from "lucide-react";

interface HomePageProps {
  onViewChange: (view: 'student' | 'admin') => void;
}

export function HomePage({ onViewChange }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-primary-foreground mb-6">
                Track Every Achievement,
                <br />
                Celebrate Every Success
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                A comprehensive platform for managing student extracurricular achievements. 
                Record awards, track participation, and showcase accomplishments beyond academics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => onViewChange('student')}
                  className="flex items-center space-x-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Student Dashboard</span>
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => onViewChange('admin')}
                  className="flex items-center space-x-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Admin Panel</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Manage Student Achievements
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools for administrators and intuitive interfaces for students to showcase their growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 gradient-success rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-success-foreground" />
                </div>
                <CardTitle className="text-xl">Achievement Tracking</CardTitle>
                <CardDescription>
                  Record and manage all types of extracurricular achievements, awards, and recognitions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-gold-foreground" />
                </div>
                <CardTitle className="text-xl">Digital Portfolios</CardTitle>
                <CardDescription>
                  Students can showcase their accomplishments in beautiful, shareable digital portfolios.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Analytics & Reports</CardTitle>
                <CardDescription>
                  Generate comprehensive reports on student participation and achievement trends.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Multi-User Access</CardTitle>
                <CardDescription>
                  Separate interfaces for administrators, teachers, and students with appropriate permissions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-warning-foreground" />
                </div>
                <CardTitle className="text-xl">Recognition System</CardTitle>
                <CardDescription>
                  Built-in badge and recognition system to motivate and celebrate student achievements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-success-foreground" />
                </div>
                <CardTitle className="text-xl">Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor student growth and participation trends over time with detailed analytics.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,250+</div>
              <div className="text-muted-foreground">Students Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">4,500+</div>
              <div className="text-muted-foreground">Achievements Recorded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold mb-2">85+</div>
              <div className="text-muted-foreground">Activity Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Transform Achievement Management?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the power of comprehensive student achievement tracking with our intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onViewChange('student')}
              className="flex items-center space-x-2"
            >
              <Trophy className="w-5 h-5" />
              <span>View Student Dashboard</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onViewChange('admin')}
              className="flex items-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>Explore Admin Features</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}