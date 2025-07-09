"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, BookOpen, CheckCircle2, DollarSign } from "lucide-react";
import { AttendanceChart } from "./charts";

export function DashboardOverview() {
    const summaryData = {
        attendance: { value: "84.2%", status: "Good", icon: CheckCircle2, color: "text-success" },
        cgpa: { value: "8.75", status: "Excellent", icon: CheckCircle2, color: "text-success" },
        fees: { value: "$500 Due", status: "Pending", icon: AlertTriangle, color: "text-warning" },
        backlogs: { value: "0", status: "Cleared", icon: BookOpen, color: "text-success" }
    };
    
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
                        <div className="text-2xl font-bold text-warning">$500 Due</div>
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
                    <div className="flex items-center">
                        <div>
                            <p className="text-sm font-medium leading-none">Fee payment received</p>
                            <p className="text-sm text-muted-foreground">$2500 paid for tuition fees.</p>
                        </div>
                        <div className="ml-auto font-medium">-$2,500.00</div>
                    </div>
                </CardContent>
            </Card>

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
