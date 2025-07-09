"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Download } from "lucide-react";
import { MonthViewChart } from "./charts";

const subjects = [
    { name: "Advanced Algorithms", type: "Theory", conducted: 60, present: 50, absent: 10 },
    { name: "Database Systems", type: "Theory", conducted: 60, present: 55, absent: 5 },
    { name: "Web Development", type: "Practical", conducted: 40, present: 38, absent: 2 },
    { name: "Operating Systems", type: "Theory", conducted: 60, present: 40, absent: 20 },
    { name: "Project Management", type: "Theory", conducted: 30, present: 29, absent: 1 },
];

const calculatePercentage = (present: number, conducted: number) => {
    return conducted > 0 ? ((present / conducted) * 100).toFixed(2) : "0.00";
};

const getPercentageColor = (percentage: number) => {
    if (percentage < 75) return "text-destructive";
    if (percentage < 85) return "text-warning";
    return "text-success";
};

export function AttendanceModule() {
    const totalConducted = subjects.reduce((sum, s) => sum + s.conducted, 0);
    const totalPresent = subjects.reduce((sum, s) => sum + s.present, 0);
    const totalAbsent = totalConducted - totalPresent;
    const overallPercentage = parseFloat(calculatePercentage(totalPresent, totalConducted));

    return (
        <div className="space-y-4">
            {overallPercentage < 75 && (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Low Attendance Warning</AlertTitle>
                    <AlertDescription>
                        Your attendance is below 75%. You may face exam eligibility issues.
                    </AlertDescription>
                </Alert>
            )}

            <Alert className="glass-card">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    Attendance records are updated daily at 3:00 AM.
                </AlertDescription>
            </Alert>
            
            <Tabs defaultValue="sem3">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="sem1">Semester 1 (88%)</TabsTrigger>
                    <TabsTrigger value="sem2">Semester 2 (92%)</TabsTrigger>
                    <TabsTrigger value="sem3">Semester 3 ({overallPercentage}%)</TabsTrigger>
                </TabsList>
                <TabsContent value="sem3">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="glass-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalConducted}</div>
                            </CardContent>
                        </Card>
                        <Card className="glass-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Present</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-success">{totalPresent}</div>
                            </CardContent>
                        </Card>
                         <Card className="glass-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Absent</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-destructive">{totalAbsent}</div>
                            </CardContent>
                        </Card>
                         <Card className="glass-card">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Percentage</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold ${getPercentageColor(overallPercentage)}`}>{overallPercentage}%</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="summary" className="mt-4">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="summary">Attendance Summary</TabsTrigger>
                                <TabsTrigger value="absent">Absent Days</TabsTrigger>
                                <TabsTrigger value="month">Month View Graph</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                    <Download className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Download Report
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <TabsContent value="summary">
                            <Card className="glass-card mt-4">
                                <CardHeader>
                                    <CardTitle>Subject-wise Attendance</CardTitle>
                                    <CardDescription>Detailed attendance for each subject in the current semester.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Sr. No.</TableHead>
                                                <TableHead>Subject Name</TableHead>
                                                <TableHead>Slot Type</TableHead>
                                                <TableHead>Conducted</TableHead>
                                                <TableHead>Present</TableHead>
                                                <TableHead>Absent</TableHead>
                                                <TableHead>%</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {subjects.map((subject, index) => {
                                                const percentage = parseFloat(calculatePercentage(subject.present, subject.conducted));
                                                return (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{subject.name}</TableCell>
                                                    <TableCell>{subject.type}</TableCell>
                                                    <TableCell>{subject.conducted}</TableCell>
                                                    <TableCell>{subject.present}</TableCell>
                                                    <TableCell>{subject.absent}</TableCell>
                                                    <TableCell className={`font-semibold ${getPercentageColor(percentage)}`}>{percentage}%</TableCell>
                                                </TableRow>
                                            )})}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="absent">
                            <Card className="glass-card mt-4">
                                <CardHeader><CardTitle>Absent Days</CardTitle></CardHeader>
                                <CardContent>
                                    <p>Calendar view for absent days will be implemented here.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="month">
                             <Card className="glass-card mt-4">
                                <CardHeader><CardTitle>Monthly Attendance Graph</CardTitle></CardHeader>
                                <CardContent>
                                    <MonthViewChart />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </TabsContent>
            </Tabs>
        </div>
    );
}
