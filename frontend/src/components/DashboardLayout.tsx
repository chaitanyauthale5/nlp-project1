import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, MessageSquare, User, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: FileText, label: 'Resume Analyzer', path: '/dashboard/resume' },
    { icon: Briefcase, label: 'Job Matcher', path: '/dashboard/match' },
    { icon: MessageSquare, label: 'Interview Coach', path: '/dashboard/interview' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r flex flex-col transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="h-16 flex items-center justify-center border-b px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
              AI
            </div>
            {isSidebarOpen && <span className="font-bold text-lg tracking-tight truncate">Campus Copilot</span>}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b bg-card/50 backdrop-blur flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border shadow-sm">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
