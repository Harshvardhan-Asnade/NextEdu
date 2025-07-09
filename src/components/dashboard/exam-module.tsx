"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Download } from "lucide-react";

const results = [
    { code: "CS301", name: "Advanced Algorithms", credits: 4, grade: "A" },
    { code: "CS302", name: "Database Systems", credits: 4, grade: "A+" },
    { code: "CS303", name: "Web Development", credits: 3, grade: "A" },
    { code: "CS304", name: "Operating Systems", credits: 4, grade: "B+" },
    { code: "MG301", name: "Project Management", credits: 3, grade: "A" },
];

export function ExamModule() {
    return (
        <div className="space-y-4">
            <Card className="glass-card">
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Exam Results</CardTitle>
                        <CardDescription>View your performance in past examinations.</CardDescription>
                    </div>
                    <Select defaultValue="may2024">
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Exam Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="may2024">May 2024</SelectItem>
                            <SelectItem value="dec2023">December 2023</SelectItem>
                            <SelectItem value="may2023">May 2023</SelectItem>
                        </SelectContent>
                    </Select>
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
                            {results.map((result, index) => (
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
                    <CardHeader>
                        <CardTitle>Result Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Seat Number</p>
                            <p className="font-semibold">FD2021034</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-semibold">Alex Doe</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Current Backlogs</p>
                            <p className="font-semibold">0</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Total Backlogs</p>
                            <p className="font-semibold">0</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">SGPA</p>
                            <p className="font-semibold text-primary">8.9</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">CGPA</p>
                            <p className="font-semibold text-primary">8.75</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card flex flex-col items-center justify-center p-6 text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                    <p className="text-lg font-semibold text-green-400">You have passed all subjects.</p>
                    <p className="text-muted-foreground text-sm mb-4">Congratulations on your excellent performance.</p>
                     <Button>
                        <Download className="mr-2 h-4 w-4" /> Download Marksheet
                    </Button>
                </Card>
            </div>
        </div>
    );
}
