import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'student' | 'admin'>('home');

  const handleViewChange = (view: 'home' | 'student' | 'admin') => {
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
    </div>
  );
};

export default Index;