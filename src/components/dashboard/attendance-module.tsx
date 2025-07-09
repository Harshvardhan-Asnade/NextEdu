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

const allSemestersData = {
  "sem1": {
    subjects: [
      { name: "Mathematics I", type: "Theory", conducted: 60, present: 55, absent: 5 },
      { name: "Physics", type: "Theory", conducted: 60, present: 58, absent: 2 },
      { name: "Basic Electrical Engg.", type: "Practical", conducted: 40, present: 35, absent: 5 },
      { name: "Problem Solving with C", type: "Theory", conducted: 60, present: 52, absent: 8 },
      { name: "Engineering Graphics", type: "Practical", conducted: 30, present: 28, absent: 2 },
    ],
    overall: 90.74
  },
  "sem2": {
    subjects: [
      { name: "Mathematics II", type: "Theory", conducted: 60, present: 54, absent: 6 },
      { name: "Chemistry", type: "Theory", conducted: 60, present: 51, absent: 9 },
      { name: "Data Structures", type: "Practical", conducted: 40, present: 39, absent: 1 },
      { name: "Object Oriented Prog.", type: "Theory", conducted: 60, present: 57, absent: 3 },
    ],
    overall: 91.50
  },
  "sem3": {
    subjects: [
      { name: "Advanced Algorithms", type: "Theory", conducted: 60, present: 52, absent: 8 },
      { name: "Database Systems", type: "Theory", conducted: 60, present: 56, absent: 4 },
      { name: "Web Development", type: "Practical", conducted: 40, present: 37, absent: 3 },
      { name: "Operating Systems", type: "Theory", conducted: 60, present: 49, absent: 11 },
      { name: "Intro to AI/ML", type: "Theory", conducted: 30, present: 28, absent: 2 },
    ],
    overall: 88.46
  },
  "sem4": { subjects: [], overall: "N/A" },
  "sem5": { subjects: [], overall: "N/A" },
  "sem6": { subjects: [], overall: "N/A" },
  "sem7": { subjects: [], overall: "N/A" },
  "sem8": { subjects: [], overall: "N/A" },
};

const calculatePercentage = (present: number, conducted: number) => {
    return conducted > 0 ? ((present / conducted) * 100).toFixed(2) : "0.00";
};

const getPercentageColor = (percentage: number) => {
    if (percentage < 75) return "text-destructive";
    if (percentage < 85) return "text-warning";
    return "text-success";
};

export function AttendanceModule() {
    const [activeSem, setActiveSem] = useState("sem3");
    const { toast } = useToast();

    const handleDownload = () => {
        toast({
            title: "Report Download",
            description: "Your attendance report is being generated and will download shortly.",
        });
    };

    const currentSemData = allSemestersData[activeSem as keyof typeof allSemestersData];
    const subjects = currentSemData.subjects;

    const totalConducted = subjects.reduce((sum, s) => sum + s.conducted, 0);
    const totalPresent = subjects.reduce((sum, s) => sum + s.present, 0);
    const totalAbsent = totalConducted - totalPresent;
    const overallPercentage = parseFloat(calculatePercentage(totalPresent, totalConducted));

    const renderContent = () => {
        if (subjects.length === 0) {
            return (
                <Card className="glass-card mt-4">
                    <CardHeader>
                        <CardTitle>Attendance Data Not Available</CardTitle>
                        <CardDescription>Attendance for this semester has not been updated yet.</CardDescription>
                    </CardHeader>
                </Card>
            );
        }

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

    return (
        <div className="space-y-4">
            <Alert className="glass-card">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    Attendance records are updated daily at 3:00 AM.
                </AlertDescription>
            </Alert>
            
            <Tabs defaultValue="sem3" onValueChange={setActiveSem}>
                <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-1">
                    {Object.entries(allSemestersData).map(([semKey, data]) => (
                        <TabsTrigger key={semKey} value={semKey} disabled={data.overall === "N/A"}>
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
