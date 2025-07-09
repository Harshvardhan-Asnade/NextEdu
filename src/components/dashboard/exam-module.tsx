"use client";

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Download, XCircle } from "lucide-react";
import type { Student } from '@/context/UserContext';
import { GradeDistributionChart, SgpaTrendChart } from './charts';

export function ExamModule({ user }: { user: Student }) {
    const { toast } = useToast();
    const allResultsData = user.academicHistory.results;
    const [activeSem, setActiveSem] = useState(`sem${user.semester - 1}`);

    const handleDownload = () => {
        toast({
            title: "Marksheet Download",
            description: "Your marksheet is being generated and will download shortly.",
        });
    };

    const renderContent = () => {
        const currentData = allResultsData[activeSem as keyof typeof allResultsData];

        if (!currentData || !currentData.summary) {
            return (
                <Card className="glass-card mt-4">
                    <CardHeader>
                        <CardTitle>Results Not Available</CardTitle>
                        <CardDescription>Results for this semester have not been published yet.</CardDescription>
                    </CardHeader>
                </Card>
            );
        }

        const totalBacklogs = Object.values(user.academicHistory.results).reduce((sum, sem) => sum + (sem.summary?.backlogs || 0), 0);

        return (
            <div key={activeSem} className="space-y-4 animate-in fade-in-50 duration-500">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Visual Overview</TabsTrigger>
                        <TabsTrigger value="details">Detailed Marksheet</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="glass-card">
                                <CardHeader><CardTitle>Result Summary</CardTitle></CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <div><p className="text-sm text-muted-foreground">Enrollment No.</p><p className="font-semibold">{user.id}</p></div>
                                    <div><p className="text-sm text-muted-foreground">Name</p><p className="font-semibold">{user.name}</p></div>
                                    <div><p className="text-sm text-muted-foreground">Semester Backlogs</p><p className="font-semibold">{currentData.summary.backlogs}</p></div>
                                    <div><p className="text-sm text-muted-foreground">Total Backlogs</p><p className="font-semibold">{totalBacklogs}</p></div>
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
                                <Button onClick={handleDownload}>
                                    <Download className="mr-2 h-4 w-4" /> Download Marksheet
                                </Button>
                            </Card>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>SGPA Trend</CardTitle>
                                    <CardDescription>Your SGPA progression across all semesters.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SgpaTrendChart resultsData={allResultsData} />
                                </CardContent>
                            </Card>
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>Grade Distribution (Sem {activeSem.replace('sem','')})</CardTitle>
                                    <CardDescription>A breakdown of your grades in the selected semester.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <GradeDistributionChart results={currentData.results} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="details" className="mt-4">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>Detailed Marksheet</CardTitle>
                                <CardDescription>Marks for each subject in Semester {activeSem.replace('sem', '')}.</CardDescription>
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
                    </TabsContent>
                </Tabs>
            </div>
        );
    }

    if (!allResultsData) return <p>Loading exam data...</p>;
    const availableSems = Object.keys(allResultsData).filter(semKey => allResultsData[semKey]?.summary);

    return (
        <div className="space-y-4">
            <Card className="glass-card">
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Exam Results</CardTitle>
                        <CardDescription>View your performance in past examinations.</CardDescription>
                    </div>
                    <Select defaultValue={activeSem} onValueChange={setActiveSem}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select Exam Session" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableSems.map((semKey) => (
                                <SelectItem key={semKey} value={semKey} disabled={!allResultsData[semKey]?.session}>
                                    Semester {semKey.replace('sem', '')} {allResultsData[semKey]?.session ? `(${allResultsData[semKey].session})` : ''}
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
