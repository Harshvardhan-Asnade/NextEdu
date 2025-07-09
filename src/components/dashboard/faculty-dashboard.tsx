"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart2, Bell, BookUser, CalendarClock, ClipboardList, FolderUp, Megaphone, UserCheck, Video } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { GradeDistributionChart } from './charts';
import { Separator } from '../ui/separator';

const upcomingClasses = [
    { time: "10:00 AM - 11:00 AM", subject: "Advanced Algorithms", class: "CS-301", type: "Theory" },
    { time: "11:00 AM - 12:00 PM", subject: "Database Systems", class: "CS-302", type: "Theory" },
    { time: "01:00 PM - 03:00 PM", subject: "Web Development Lab", class: "CS-303L", type: "Practical" },
];

const studentAttendance = [
    { roll: "STU-001", name: "Aarav Patel", status: "Present" },
    { roll: "STU-002", name: "Aditi Sharma", status: "Present" },
    { roll: "STU-003", name: "Arjun Kumar", status: "Absent" },
    { roll: "STU-004", name: "Diya Singh", status: "Present" },
];

const assignments = [
    { title: "Algorithm Analysis Report", due: "2024-08-15", submissions: "42/46" },
    { title: "Database Normalization Task", due: "2024-08-18", submissions: "38/46" },
    { title: "Final Project Proposal", due: "2024-08-25", submissions: "15/46" },
];

const studyMaterials = [
    { title: "Lecture 5 - NP-Completeness.pdf", course: "CS-301" },
    { title: "SQL Injection Prevention Guide.docx", course: "CS-302" },
    { title: "React Hooks Cheatsheet.pdf", course: "CS-303L" },
];

const announcements = [
    { by: "Dr. Rajeev Menon", content: "Reminder: The deadline for the Final Project Proposal is approaching. Please submit it via the portal by August 25th.", time: "2h ago" },
    { by: "Dr. Meera Iyer", content: "I've uploaded the notes for today's lecture on NP-Completeness. You can find them in the study materials section.", time: "8h ago" },
]

export function FacultyDashboard() {
    const { toast } = useToast();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card className="glass-card">
                    <CardHeader className='flex-row items-center justify-between'>
                        <div>
                            <CardTitle className='flex items-center gap-2'><CalendarClock className="w-5 h-5" /> Today's Schedule</CardTitle>
                            <CardDescription>Your classes for today, August 5, 2024.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">View Full Timetable</Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className='text-right'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {upcomingClasses.map((c, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{c.time}</TableCell>
                                        <TableCell className="font-medium">{c.subject}</TableCell>
                                        <TableCell>{c.class}</TableCell>
                                        <TableCell><Badge variant="secondary">{c.type}</Badge></TableCell>
                                        <TableCell className='text-right'>
                                            <Button size="sm"><Video className="mr-2 h-4 w-4" /> Start Class</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'><UserCheck className="w-5 h-5" /> Attendance Management</CardTitle>
                            <CardDescription>Quick view for today's first class (CS-301).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead className='text-right'>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {studentAttendance.map((s, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{s.name}</TableCell>
                                            <TableCell className='text-right'>
                                                <Badge variant={s.status === 'Present' ? 'outline' : 'destructive'} className={s.status === 'Present' ? 'text-success border-success' : ''}>{s.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button className='w-full mt-4' variant="outline">Take Attendance</Button>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'><ClipboardList className="w-5 h-5" /> Assignments</CardTitle>
                            <CardDescription>Overview of active assignments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead className='text-right'>Submissions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assignments.map((a, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <div className="font-medium">{a.title}</div>
                                                <div className="text-xs text-muted-foreground">Due: {a.due}</div>
                                            </TableCell>
                                            <TableCell className='text-right font-mono'>{a.submissions}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                             <Button className='w-full mt-4' variant="outline">Create New Assignment</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <Card className="glass-card text-center">
                    <CardHeader className="items-center">
                        <Avatar className="h-24 w-24 border-2 border-primary mb-2">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Faculty Avatar" data-ai-hint="faculty portrait" />
                            <AvatarFallback>RM</AvatarFallback>
                        </Avatar>
                        <CardTitle>Dr. Rajeev Menon</CardTitle>
                        <CardDescription>Associate Professor, Artificial Intelligence</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'><BarChart2 className="w-5 h-5" /> Class Analytics</CardTitle>
                        <CardDescription>Grade distribution for CS-201 (previous sem).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GradeDistributionChart />
                    </CardContent>
                </Card>

                <Card className="glass-card">
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'><Megaphone className="w-5 h-5" /> Post Announcement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea placeholder="Type your announcement here..." />
                        <Button className='w-full' onClick={() => toast({ title: "Announcement Posted!" })}>Post to Students</Button>
                         <Separator />
                        <div className='space-y-4'>
                            {announcements.map((an, i) => (
                                <div key={i} className='text-sm'>
                                    <p className='text-muted-foreground'>{an.content}</p>
                                    <p className='text-xs text-right font-medium'>- {an.by}, {an.time}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'><FolderUp className="w-5 h-5" /> Study Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button className='w-full' variant="outline" onClick={() => toast({ title: "File upload clicked" })}>Upload New File</Button>
                        <Separator className='my-4'/>
                        <div className='space-y-2'>
                            {studyMaterials.map((m, i) => (
                                <div key={i} className='flex items-center justify-between p-2 rounded-md hover:bg-accent'>
                                    <div>
                                        <p className='text-sm font-medium'>{m.title}</p>
                                        <p className='text-xs'><Badge variant="secondary">{m.course}</Badge></p>
                                    </div>
                                    <Button variant="ghost" size="sm">Download</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
