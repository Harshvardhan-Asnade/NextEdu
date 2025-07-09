"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, BookOpen, CheckCircle2, DollarSign, Megaphone } from "lucide-react";
import { AttendanceChart } from "./charts";
import { Separator } from "../ui/separator";
import type { Student } from "@/context/UserContext";
import { useUser } from "@/context/UserContext";

export function DashboardOverview({ user }: { user: Student }) {
    const { announcements } = useUser();

    const { academicHistory, fees } = user;
    const latestSemKey = `sem${user.semester - 1}`;

    const overallAttendance = academicHistory?.attendance[latestSemKey]?.overall || "N/A";
    const currentCgpa = academicHistory?.results[latestSemKey]?.summary?.cgpa || "N/A";
    const feesDue = fees.summary.reduce((sum, item) => sum + item.outstanding, 0);
    const totalBacklogs = Object.values(academicHistory?.results || {}).reduce((sum, sem) => sum + (sem.summary?.backlogs || 0), 0);
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const relevantAnnouncements = announcements.filter(an => 
        an.scope === 'global' || (an.scope === 'teacher' && an.teacherId === user.teacherId)
    );

    return (
        <div className="space-y-4">
            <Card className="glass-card text-center p-6">
                 <CardTitle className="text-3xl">Welcome back, {user.name.split(' ')[0]}!</CardTitle>
                 <CardDescription>Here's a quick look at your academic dashboard.</CardDescription>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${overallAttendance > 75 ? 'text-success' : 'text-warning'}`}>{overallAttendance}%</div>
                        <p className="text-xs text-muted-foreground">Your attendance is in good standing.</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-success">{currentCgpa}</div>
                        <p className="text-xs text-muted-foreground">Excellent academic performance.</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fees Status</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${feesDue > 0 ? 'text-warning' : 'text-success'}`}>{feesDue > 0 ? formatCurrency(feesDue) + ' Due' : 'Paid'}</div>
                        <p className="text-xs text-muted-foreground">Next due date: 25th July 2024</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Backlogs</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${totalBacklogs > 0 ? 'text-destructive' : ''}`}>{totalBacklogs}</div>
                        <p className="text-xs text-muted-foreground">All subjects cleared.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>An overview of your recent academic activities.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center">
                            <div>
                                <p className="text-sm font-medium leading-none">Semester {user.semester-1} results published</p>
                                <p className="text-sm text-muted-foreground">You have passed all subjects.</p>
                            </div>
                            <div className="ml-auto font-medium"><Badge variant="outline" className="text-success border-success/50">Passed</Badge></div>
                        </div>
                        <Separator />
                         <div className="flex items-center">
                            <div>
                                <p className="text-sm font-medium leading-none">Fee payment received</p>
                                <p className="text-sm text-muted-foreground">Tuition and other fees.</p>
                            </div>
                            <div className="ml-auto font-medium">- {formatCurrency(125500)}</div>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5" /> Announcements</CardTitle>
                        <CardDescription>Latest updates from faculty and administration.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-40 overflow-y-auto pr-2">
                             {relevantAnnouncements.length > 0 ? relevantAnnouncements.map((an) => (
                                <div key={an.id} className='text-sm p-2 rounded-md hover:bg-accent/50'>
                                    <p className='text-muted-foreground'>{an.content}</p>
                                    <p className='text-xs text-right font-medium'>- {an.by}, {an.time}</p>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground text-center">No new announcements.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Attendance Progress (Sem {user.semester-1})</CardTitle>
                    <CardDescription>Your attendance percentage across subjects.</CardDescription>
                </CardHeader>
                <CardContent>
                   <AttendanceChart attendanceData={academicHistory?.attendance[latestSemKey]?.subjects || []} />
                </CardContent>
            </Card>
        </div>
    );
}
