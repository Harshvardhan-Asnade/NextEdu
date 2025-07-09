"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Download } from "lucide-react";
import { MonthViewChart } from "./charts";
import type { Student } from "@/context/UserContext";

const calculatePercentage = (present: number, conducted: number) => {
    return conducted > 0 ? ((present / conducted) * 100).toFixed(2) : "0.00";
};

const getPercentageColor = (percentage: number) => {
    if (percentage < 75) return "text-destructive";
    if (percentage < 85) return "text-warning";
    return "text-success";
};

export function AttendanceModule({ user }: { user: Student }) {
    const { toast } = useToast();
    const allSemestersData = user.academicHistory.attendance;
    const [activeSem, setActiveSem] = useState(`sem${user.semester-1}`);

    const handleDownload = () => {
        toast({
            title: "Report Download",
            description: "Your attendance report is being generated and will download shortly.",
        });
    };
    
    const renderContent = () => {
        const currentSemData = allSemestersData[activeSem as keyof typeof allSemestersData];
        if (!currentSemData || currentSemData.subjects.length === 0) {
            return (
                <Card className="glass-card mt-4">
                    <CardHeader>
                        <CardTitle>Attendance Data Not Available</CardTitle>
                        <CardDescription>Attendance for this semester has not been updated yet.</CardDescription>
                    </CardHeader>
                </Card>
            );
        }
        
        const subjects = currentSemData.subjects;
        const totalConducted = subjects.reduce((sum, s) => sum + s.conducted, 0);
        const totalPresent = subjects.reduce((sum, s) => sum + s.present, 0);
        const totalAbsent = totalConducted - totalPresent;
        const overallPercentage = parseFloat(calculatePercentage(totalPresent, totalConducted));

        return (
            <div key={activeSem} className="animate-in fade-in-50 duration-500">
                {overallPercentage < 75 && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Low Attendance Warning</AlertTitle>
                        <AlertDescription>
                            Your attendance is below 75%. You may face exam eligibility issues.
                        </AlertDescription>
                    </Alert>
                )}
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
                            <TabsTrigger value="month">Month View Graph</TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleDownload}>
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
                                <CardDescription>Detailed attendance for each subject in the selected semester.</CardDescription>
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
                    <TabsContent value="month">
                         <Card className="glass-card mt-4">
                            <CardHeader><CardTitle>Monthly Attendance Graph</CardTitle></CardHeader>
                            <CardContent>
                                <MonthViewChart />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        );
    }
    
    if (!allSemestersData) return <p>Loading attendance data...</p>;
    
    const availableSems = Object.keys(allSemestersData);

    return (
        <div className="space-y-4">
            <Alert className="glass-card">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    Attendance records are updated daily at 3:00 AM.
                </AlertDescription>
            </Alert>
            
            <Tabs defaultValue={activeSem} onValueChange={setActiveSem}>
                <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-1">
                    {Array.from({ length: 8 }, (_, i) => `sem${i + 1}`).map((semKey) => (
                        <TabsTrigger key={semKey} value={semKey} disabled={!availableSems.includes(semKey)}>
                            Sem {semKey.replace('sem', '')}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="mt-4">
                    {renderContent()}
                </div>
            </Tabs>
        </div>
    );
}
