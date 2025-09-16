import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Trophy, Users, BarChart3 } from "lucide-react";

interface NavigationProps {
  currentView: 'home' | 'student' | 'admin';
  onViewChange: (view: 'home' | 'student' | 'admin') => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
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
            
            <Button
              variant={currentView === 'admin' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('admin')}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Admin Panel</span>
              <Badge variant="secondary" className="ml-1">
                Demo
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}