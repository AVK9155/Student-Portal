import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Documentation } from "@/components/Documentation";
import type { User } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'home' | 'student' | 'admin' | 'docs'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);

      // Fetch user role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (roleData) {
        setUserRole(roleData.role as 'student' | 'admin');
      }

      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      } else if (session) {
        setUser(session.user);
        
        // Fetch user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (roleData) {
          setUserRole(roleData.role as 'student' | 'admin');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleViewChange = (view: 'home' | 'student' | 'admin' | 'docs') => {
    setCurrentView(view);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={handleViewChange} userRole={userRole} />
      
      {currentView === 'home' && (
        <HomePage onViewChange={handleViewChange} />
      )}
      
      {currentView === 'student' && (
        <StudentDashboard />
      )}
      
      {currentView === 'admin' && (
        <AdminDashboard />
      )}
      
      {currentView === 'docs' && (
        <Documentation />
      )}
    </div>
  );
};

export default Index;