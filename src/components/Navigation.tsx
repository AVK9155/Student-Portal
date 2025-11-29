import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Trophy, Users, BarChart3, BookOpen, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavigationProps {
  currentView: 'home' | 'student' | 'admin' | 'docs';
  onViewChange: (view: 'home' | 'student' | 'admin' | 'docs') => void;
  userRole: 'student' | 'admin' | null;
}

export function Navigation({ currentView, onViewChange, userRole }: NavigationProps) {
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <nav className="bg-card border-b shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">StudentAchieve</h1>
              <p className="text-xs text-muted-foreground">Extracurricular Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={currentView === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('home')}
              className="flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Home</span>
            </Button>
            
            <Button
              variant={currentView === 'student' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('student')}
              className="flex items-center space-x-2"
            >
              <Trophy className="w-4 h-4" />
              <span>Student View</span>
            </Button>
            
            {userRole === 'admin' && (
              <Button
                variant={currentView === 'admin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('admin')}
                className="flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Admin Panel</span>
              </Button>
            )}
            
            <Button
              variant={currentView === 'docs' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('docs')}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 ml-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}