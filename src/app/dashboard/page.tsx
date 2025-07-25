"use client";

import { useEffect, useState } from 'react';
import { BarChart3, CreditCard, GraduationCap, Hexagon, LogOut, PanelLeft, Shield, LayoutGrid, Bell, Sun, Moon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { AttendanceModule } from '@/components/dashboard/attendance-module';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { ExamModule } from '@/components/dashboard/exam-module';
import { FeesModule } from '@/components/dashboard/fees-module';
import { ProfileCard } from '@/components/dashboard/profile-card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { AdminPanel } from '@/components/dashboard/admin-panel';
import { cn } from '@/lib/utils';
import { FacultyDashboard } from '@/components/dashboard/faculty-dashboard';
import { ThemeToggle } from '@/components/theme-toggle';
import { Chatbot } from '@/components/dashboard/chatbot';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.role === 'admin' || parsedUser.role === 'faculty') {
        setActiveView('dashboard');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/');
  };
  
  const userRole = user?.role;

  const renderMainContent = () => {
    if (!user) return null;

    if (userRole === 'faculty') return <FacultyDashboard user={user} />;
    if (userRole === 'admin') return <AdminPanel />;

    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview user={user} />;
      case 'attendance':
        return <AttendanceModule user={user} />;
      case 'exam':
        return <ExamModule user={user} />;
      case 'fees':
        return <FeesModule user={user} />;
      default:
        return <DashboardOverview user={user}/>;
    }
  };

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'attendance', label: 'Attendance', icon: BarChart3 },
    { id: 'exam', label: 'Exam', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: CreditCard },
  ];
  
  const facultyNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid }
  ];

  const adminNavItem = { id: 'admin', label: 'Admin Panel', icon: Shield };

  const getNavItems = () => {
    switch(userRole) {
      case 'admin':
        return [adminNavItem];
      case 'faculty':
        return facultyNavItems;
      case 'student':
      default:
        return studentNavItems;
    }
  }

  const navItems = getNavItems();

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-xl px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="#" className="flex items-center gap-2 font-semibold text-lg md:text-base">
            <Hexagon className="h-6 w-6 text-primary" />
            <span className="text-foreground">NextEdu</span>
          </Link>
          {navItems.map(item => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "transition-colors hover:text-foreground",
                (activeView === item.id || (userRole === 'admin' && item.id === 'admin')) ? "text-foreground font-semibold border-b-2 border-primary rounded-none" : "text-muted-foreground"
              )}
              onClick={() => setActiveView(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs bg-card/80 backdrop-blur-xl">
             <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex items-center gap-2 text-lg font-semibold"
                >
                  <Hexagon className="h-6 w-6 text-primary" />
                  <span className="text-foreground">NextEdu</span>
                </Link>
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={(activeView === item.id || (userRole === 'admin' && item.id === 'admin')) ? 'default' : 'ghost'}
                      className="flex items-center justify-start gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setActiveView(item.id);
                        const trigger = document.querySelector('[data-radix-sheet-trigger]');
                        if (trigger instanceof HTMLElement) trigger.click();
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  ))}
                  <Button
                    variant='ghost'
                    className="flex items-center justify-start gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      handleLogout();
                       const trigger = document.querySelector('[data-radix-sheet-trigger]');
                        if (trigger instanceof HTMLElement) trigger.click();
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
          <ThemeToggle />
          {userRole === 'student' && (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative rounded-full">
                  <Bell className="h-5 w-5" />
                  {user.notifications?.filter((n: any) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.notifications?.length > 0 ? user.notifications.map((n: any) => (
                   <DropdownMenuItem key={n.id} className="flex flex-col items-start whitespace-normal">
                     <p className='font-semibold'>From: {n.from}</p>
                     <p className='text-muted-foreground'>{n.message}</p>
                   </DropdownMenuItem>
                )) : <DropdownMenuItem>No new notifications</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <div className="flex-initial">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "https://placehold.co/100x100.png"} alt="User Avatar" data-ai-hint={userRole === 'admin' ? 'administrator' : userRole === 'faculty' ? 'faculty portrait' : 'student portrait'} />
                      <AvatarFallback>{user.name ? user.name.split(' ').map((n:string) => n[0]).join('') : 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast({ title: "Coming Soon!", description: "Settings page is under construction."})}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Support", description: "Contact support@neoedu.edu for help."})}>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3">
            {!(userRole === 'student' && activeView === 'dashboard') ? (
                <>
                    <div className={cn(
                        "grid auto-rows-max items-start gap-4 md:gap-8",
                        userRole === 'student' ? 'lg:col-span-2' : 'lg:col-span-3'
                    )}>
                        <div key={activeView} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                            {renderMainContent()}
                        </div>
                    </div>
                    {userRole === 'student' && (
                        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
                            <ProfileCard user={user}/>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Welcome Card */}
                    <div className="order-1 lg:col-span-2 lg:order-1">
                        <Card className="glass-card text-center p-6">
                            <CardTitle className="text-3xl">Welcome back, {user.name.split(' ')[0]}!</CardTitle>
                            <CardDescription>Here's a quick look at your academic dashboard.</CardDescription>
                        </Card>
                    </div>
                    
                    {/* Profile Card */}
                    <div className="order-2 lg:col-span-1 lg:row-span-2 lg:order-2">
                        <ProfileCard user={user}/>
                    </div>
                    
                    {/* Rest of Dashboard Content */}
                    <div className="order-3 lg:col-span-2 lg:order-3">
                        <div key={activeView} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                            <DashboardOverview user={user} />
                        </div>
                    </div>
                </>
            )}
        </div>
        {userRole === 'student' && <Chatbot />}
      </main>
    </div>
  );
}
