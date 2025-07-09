"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, BookOpen, CheckCircle2, DollarSign, Megaphone } from "lucide-react";
import { AttendanceChart } from "./charts";
import { Separator } from "../ui/separator";

const announcements = [
    { id: 1, by: "Dr. Rajeev Menon", content: "Reminder: The deadline for the Final Project Proposal is approaching. Please submit it via the portal by August 25th.", time: "2h ago" },
    { id: 2, by: "Dr. Meera Iyer", content: "I've uploaded the notes for today's lecture on NP-Completeness. You can find them in the study materials section.", time: "8h ago" },
    { id: 3, by: "University Admin", content: "The university will be closed on August 15th for Independence Day.", time: "1d ago" },
]

export function DashboardOverview() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-success">84.2%</div>
                        <p className="text-xs text-muted-foreground">Your attendance is in good standing.</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-success">8.75</div>
                        <p className="text-xs text-muted-foreground">Excellent academic performance.</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fees Status</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-warning">₹2,500 Due</div>
                        <p className="text-xs text-muted-foreground">Next due date: 25th July 2024</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Backlogs</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
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
                                <p className="text-sm font-medium leading-none">Semester 3 results published</p>
                                <p className="text-sm text-muted-foreground">You have passed all subjects.</p>
                            </div>
                            <div className="ml-auto font-medium"><Badge variant="outline" className="text-success border-success/50">Passed</Badge></div>
                        </div>
                        <Separator />
                        <div className="flex items-center">
                            <div>
                                <p className="text-sm font-medium leading-none">Fee payment received</p>
                                <p className="text-sm text-muted-foreground">₹1,25,500 paid for tuition and other fees.</p>
                            </div>
                            <div className="ml-auto font-medium">- ₹1,25,500.00</div>
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
                             {announcements.map((an) => (
                                <div key={an.id} className='text-sm p-2 rounded-md hover:bg-accent/50'>
                                    <p className='text-muted-foreground'>{an.content}</p>
                                    <p className='text-xs text-right font-medium'>- {an.by}, {an.time}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Attendance Progress</CardTitle>
                    <CardDescription>Your attendance percentage across subjects.</CardDescription>
                </CardHeader>
                <CardContent>
                   <AttendanceChart />
                </CardContent>
            </Card>
        </div>
    );
}
