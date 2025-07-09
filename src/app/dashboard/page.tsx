"use client";

import { useEffect, useState } from 'react';
import { BarChart3, CreditCard, GraduationCap, Hexagon, Home as HomeIcon, LogOut, PanelLeft, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { AttendanceModule } from '@/components/dashboard/attendance-module';
import { Chatbot } from '@/components/dashboard/chatbot';
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

export default function DashboardPage() {
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
      if (role === 'admin') {
        setActiveView('admin');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'attendance':
        return <AttendanceModule />;
      case 'exam':
        return <ExamModule />;
      case 'fees':
        return <FeesModule />;
      case 'admin':
        return userRole === 'admin' ? <AdminPanel /> : <DashboardOverview />;
      default:
        return <DashboardOverview />;
    }
  };

  const baseNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'attendance', label: 'Attendance', icon: BarChart3 },
    { id: 'exam', label: 'Exam', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: CreditCard },
  ];

  const adminNavItem = { id: 'admin', label: 'Admin Panel', icon: Shield };

  const navItems = userRole === 'admin' ? [adminNavItem, ...baseNavItems.filter(item => item.id !== 'dashboard')] : baseNavItems;

  if (!userRole) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full bg-transparent animate-in fade-in duration-500">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-card/60 backdrop-blur-xl border-white/10 sm:flex">
          <nav className="flex h-full flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Hexagon className="h-5 w-5 transition-all group-hover:scale-110 group-hover:rotate-12" />
              <span className="sr-only">NeoEdu</span>
            </Link>
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeView === item.id ? 'default' : 'ghost'}
                      size="icon"
                      className={`rounded-lg w-10 h-10 transition-colors ${activeView === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                      onClick={() => setActiveView(item.id)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="mt-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size="icon"
                    className='rounded-lg w-10 h-10 transition-colors text-muted-foreground'
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </div>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/60 backdrop-blur-xl px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs bg-card/80 backdrop-blur-xl">
                <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
                >
                  <Hexagon className="h-6 w-6 transition-all group-hover:scale-110 group-hover:rotate-12" />
                  <span className="sr-only">NeoEdu</span>
                </Link>
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeView === item.id ? 'default' : 'ghost'}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
            <h1 className="text-xl font-semibold capitalize">{activeView === 'admin' ? 'Admin Panel' : activeView}</h1>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint={userRole === 'admin' ? 'administrator' : 'student portrait'} />
                        <AvatarFallback>{userRole === 'admin' ? 'AD' : 'SD'}</AvatarFallback>
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
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className={cn(
              "grid auto-rows-max items-start gap-4 md:gap-8",
              userRole === 'admin' ? "lg:col-span-3" : "lg:col-span-2"
            )}>
              {renderContent()}
            </div>
            {userRole !== 'admin' && (
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
                <ProfileCard />
              </div>
            )}
          </main>
        </div>
        {userRole !== 'admin' && <Chatbot />}
      </div>
    </TooltipProvider>
  );
}
