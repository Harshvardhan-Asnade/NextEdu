"use client";

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Download, XCircle } from "lucide-react";

const allResultsData = {
  "sem1": {
    session: "May 2023",
    results: [
      { code: "MA101", name: "Mathematics I", credits: 4, grade: "B" },
      { code: "PH101", name: "Physics", credits: 4, grade: "A" },
      { code: "EE101", name: "Basic Electrical Engg.", credits: 3, grade: "B+" },
      { code: "CS101", name: "Problem Solving with C", credits: 4, grade: "A+" },
      { code: "ME101", name: "Engineering Graphics", credits: 3, grade: "C" },
    ],
    summary: { sgpa: "8.10", cgpa: "8.10", backlogs: 0, status: "Passed" }
  },
  "sem2": {
    session: "December 2023",
    results: [
      { code: "MA201", name: "Mathematics II", credits: 4, grade: "A" },
      { code: "CH201", name: "Chemistry", credits: 4, grade: "A+" },
      { code: "CS201", name: "Data Structures", credits: 4, grade: "A" },
      { code: "CS202", name: "Object Oriented Prog.", credits: 4, grade: "B+" },
    ],
    summary: { sgpa: "9.10", cgpa: "8.60", backlogs: 0, status: "Passed" }
  },
  "sem3": {
    session: "May 2024",
    results: [
      { code: "CS301", name: "Advanced Algorithms", credits: 4, grade: "A" },
      { code: "CS302", name: "Database Systems", credits: 4, grade: "A+" },
      { code: "CS303", name: "Web Development", credits: 3, grade: "A" },
      { code: "CS304", name: "Operating Systems", credits: 4, grade: "B+" },
      { code: "AI301", name: "Intro to AI/ML", credits: 3, grade: "A" },
    ],
    summary: { sgpa: "8.90", cgpa: "8.75", backlogs: 0, status: "Passed" }
  },
  "sem4": { session: "December 2024", results: [], summary: null },
  "sem5": { session: "May 2025", results: [], summary: null },
  "sem6": { session: "December 2025", results: [], summary: null },
  "sem7": { session: "May 2026", results: [], summary: null },
  "sem8": { session: "December 2026", results: [], summary: null },
};

export function ExamModule() {
    const [activeSem, setActiveSem] = useState("sem3");

    const currentData = allResultsData[activeSem as keyof typeof allResultsData];

    const renderContent = () => {
        if (!currentData.summary) {
            return (
                <Card className="glass-card mt-4">
                    <CardHeader>
                        <CardTitle>Results Not Available</CardTitle>
                        <CardDescription>Results for this semester have not been published yet.</CardDescription>
                    </CardHeader>
                </Card>
            );
        }

        return (
            <div key={activeSem} className="space-y-4 animate-in fade-in-50 duration-500">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Result Details</CardTitle>
                        <CardDescription>Detailed marksheet for the selected semester.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sr. No.</TableHead>
                                    <TableHead>Subject Code</TableHead>
                                    <TableHead>Subject Name</TableHead>
                                    <TableHead>Credits</TableHead>
                                    <TableHead>Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentData.results.map((result, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{result.code}</TableCell>
                                        <TableCell>{result.name}</TableCell>
                                        <TableCell>{result.credits}</TableCell>
                                        <TableCell><Badge variant="secondary">{result.grade}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="glass-card">
                        <CardHeader><CardTitle>Result Summary</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div><p className="text-sm text-muted-foreground">Seat Number</p><p className="font-semibold">FD2021034</p></div>
                            <div><p className="text-sm text-muted-foreground">Name</p><p className="font-semibold">Alex Doe</p></div>
                            <div><p className="text-sm text-muted-foreground">Current Backlogs</p><p className="font-semibold">{currentData.summary.backlogs}</p></div>
                            <div><p className="text-sm text-muted-foreground">Total Backlogs</p><p className="font-semibold">0</p></div>
                            <div><p className="text-sm text-muted-foreground">SGPA</p><p className="font-semibold text-primary">{currentData.summary.sgpa}</p></div>
                            <div><p className="text-sm text-muted-foreground">CGPA</p><p className="font-semibold text-primary">{currentData.summary.cgpa}</p></div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card flex flex-col items-center justify-center p-6 text-center">
                        {currentData.summary.status === "Passed" ? (
                            <>
                                <CheckCircle2 className="w-16 h-16 text-success mb-4" />
                                <p className="text-lg font-semibold text-success">You have passed all subjects.</p>
                                <p className="text-muted-foreground text-sm mb-4">Congratulations on your excellent performance.</p>
                            </>
                        ) : (
                            <>
                                <XCircle className="w-16 h-16 text-destructive mb-4" />
                                <p className="text-lg font-semibold text-destructive">Result Withheld</p>
                                <p className="text-muted-foreground text-sm mb-4">Please contact the administration.</p>
                            </>
                        )}
                        <Button>
                            <Download className="mr-2 h-4 w-4" /> Download Marksheet
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }
    
    return (
        <div className="space-y-4">
            <Card className="glass-card">
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Exam Results</CardTitle>
                        <CardDescription>View your performance in past examinations.</CardDescription>
                    </div>
                    <Select defaultValue="sem3" onValueChange={setActiveSem}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select Exam Session" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(allResultsData).map(([semKey, data]) => (
                                <SelectItem key={semKey} value={semKey}>
                                    Semester {semKey.replace('sem', '')} ({data.session})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
            </Card>
            <div className='mt-4'>
                {renderContent()}
            </div>
        </div>
    );
}
