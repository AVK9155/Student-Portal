import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Documentation } from "@/components/Documentation";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'student' | 'admin' | 'docs'>('home');

  const handleViewChange = (view: 'home' | 'student' | 'admin' | 'docs') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      
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