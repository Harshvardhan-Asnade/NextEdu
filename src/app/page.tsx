"use client";

import { useState } from 'react';
import { BarChart3, Bot, CreditCard, GraduationCap, Home as HomeIcon, PanelLeft, User } from 'lucide-react';

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

export default function DashboardPage() {
  const [activeView, setActiveView] = useState('dashboard');

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
      default:
        return <DashboardOverview />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'attendance', label: 'Attendance', icon: BarChart3 },
    { id: 'exam', label: 'Exam', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: CreditCard },
  ];

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full bg-transparent">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-black/30 backdrop-blur-lg sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-all group-hover:scale-110"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"/><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"/><path d="M15 2v5h5"/></svg>
              <span className="sr-only">Nexus Dashboard</span>
            </Link>
            {navItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeView === item.id ? 'default' : 'ghost'}
                    size="icon"
                    className={`rounded-lg w-10 h-10 ${activeView === item.id ? 'bg-primary/80 text-primary-foreground' : 'text-muted-foreground'}`}
                    onClick={() => setActiveView(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-72 w-full">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-black/30 backdrop-blur-lg px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs bg-black/50 backdrop-blur-lg">
                <nav className="grid gap-6 text-lg font-medium">
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
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold capitalize">{activeView}</h1>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              {renderContent()}
            </div>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
              <ProfileCard />
            </div>
          </main>
        </div>
        <Chatbot />
      </div>
    </TooltipProvider>
  );
}
