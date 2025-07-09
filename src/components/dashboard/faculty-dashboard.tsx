
"use client";

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart2, Bell, BookUser, CalendarClock, ClipboardList, FolderUp, Megaphone, UserCheck, Video, Upload, Trash2, FilePlus, Download, MessageSquare, Tag, Send } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { GradeDistributionChart } from './charts';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useUser, Teacher, Student, Announcement } from '@/context/UserContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const initialUpcomingClasses = [
    { time: "10:00 AM - 11:00 AM", subject: "Advanced Algorithms", class: "CS-301", type: "Theory" },
    { time: "11:00 AM - 12:00 PM", subject: "Database Systems", class: "CS-302", type: "Theory" },
    { time: "01:00 PM - 03:00 PM", subject: "Web Development Lab", class: "CS-303L", type: "Practical" },
];

const initialAssignments = [
    { id: 1, title: "Algorithm Analysis Report", due: "2024-08-15", submissions: "42/46" },
    { id: 2, title: "Database Normalization Task", due: "2024-08-18", submissions: "38/46" },
    { id: 3, title: "Final Project Proposal", due: "2024-08-25", submissions: "15/46" },
];

const initialStudyMaterials = [
    { id: 1, title: "Lecture 5 - NP-Completeness.pdf", course: "CS-301" },
    { id: 2, title: "SQL Injection Prevention Guide.docx", course: "CS-302" },
    { id: 3, title: "React Hooks Cheatsheet.pdf", course: "CS-303L" },
];

export function FacultyDashboard({ user }: { user: Teacher }) {
    const { students, setStudents, announcements, setAnnouncements, logActivity } = useUser();
    const { toast } = useToast();
    
    const [assignedStudents, setAssignedStudents] = useState<Student[]>([]);
    const [assignments, setAssignments] = useState(initialAssignments);
    const [studyMaterials, setStudyMaterials] = useState(initialStudyMaterials);
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const [attendanceList, setAttendanceList] = useState<any[]>([]);

    const [isNoteDialogOpen, setNoteDialogOpen] = useState(false);
    const [isTagDialogOpen, setTagDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [noteContent, setNoteContent] = useState('');
    const [tagContent, setTagContent] = useState('');

    useEffect(() => {
        const myStudents = students.filter(s => s.teacherId === user.id);
        setAssignedStudents(myStudents);
        setAttendanceList(
            myStudents.map(student => ({ ...student, present: Math.random() > 0.2 }))
        );
    }, [students, user.id]);

    function handlePostAnnouncement() {
        if (!newAnnouncement.trim()) return;
        const announcement: Announcement = {
            id: Date.now(),
            by: user.name,
            content: newAnnouncement,
            time: "Just now",
            scope: 'teacher',
            teacherId: user.id,
        };
        setAnnouncements(prev => [announcement, ...prev]);
        setNewAnnouncement("");
        logActivity(user.name, `Posted announcement for their students.`);
        toast({ title: "Announcement Posted!", description: "Your announcement is now live for your students." });
    };

    function handleDeleteAssignment(id: number) {
        setAssignments(prev => prev.filter(a => a.id !== id));
        toast({ title: "Assignment Removed", variant: "destructive", description: "The assignment has been successfully deleted." });
    };

    function handleDeleteMaterial(id: number) {
        setStudyMaterials(prev => prev.filter(m => m.id !== id));
        toast({ title: "Material Removed", variant: "destructive", description: "The study material has been successfully deleted." });
    };

    function handleCreateAssignment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newAssignment = {
            id: Date.now(),
            title: formData.get('title') as string,
            due: formData.get('due') as string,
            submissions: `0/${assignedStudents.length}`
        };
        setAssignments([...assignments, newAssignment]);
        toast({ title: "Assignment Created", description: `The assignment "${newAssignment.title}" has been created.` });
        document.getElementById('close-assignment-dialog')?.click();
    };

    function handleUploadMaterial(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newMaterial = {
            id: Date.now(),
            title: formData.get('title') as string,
            course: formData.get('course') as string,
        };
        setStudyMaterials([...studyMaterials, newMaterial]);
        toast({ title: "Material Uploaded", description: `"${newMaterial.title}" is now available to students.` });
        document.getElementById('close-material-dialog')?.click();
    }

    function openNoteDialog(student: Student) {
        setSelectedStudent(student);
        setNoteContent('');
        setNoteDialogOpen(true);
    }

    function openTagDialog(student: Student) {
        setSelectedStudent(student);
        setTagContent('');
        setTagDialogOpen(true);
    }

    function handleSendNote() {
        if (!selectedStudent || !noteContent.trim()) return;
        setStudents(prev => prev.map(s => s.id === selectedStudent.id ? {
            ...s,
            notifications: [...s.notifications, {
                id: Date.now(),
                from: user.name,
                message: noteContent,
                read: false,
                timestamp: new Date()
            }]
        } : s));
        logActivity(user.name, `Sent a note to ${selectedStudent.name}`);
        toast({ title: "Note Sent!", description: `Your note has been sent to ${selectedStudent.name}.`});
        setNoteDialogOpen(false);
    }

    function handleAddTag() {
        if (!selectedStudent || !tagContent.trim()) return;
        setStudents(prev => prev.map(s => s.id === selectedStudent.id ? {
            ...s,
            tags: [...s.tags, tagContent]
        } : s));
        logActivity(user.name, `Tagged ${selectedStudent.name} with "${tagContent}"`);
        toast({ title: "Tag Added!", description: `${selectedStudent.name} has been tagged.`});
        setTagDialogOpen(false);
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card className="glass-card">
                    <CardHeader className='flex-row items-center justify-between'>
                        <div>
                            <CardTitle className='flex items-center gap-2'><CalendarClock className="w-5 h-5" /> Today's Schedule</CardTitle>
                            <CardDescription>Your classes for today, August 5, 2024.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => toast({ title: "Feature Coming Soon!" })}>View Full Timetable</Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead><TableHead>Subject</TableHead><TableHead>Class</TableHead><TableHead>Type</TableHead><TableHead className='text-right'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {initialUpcomingClasses.map((c, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{c.time}</TableCell>
                                        <TableCell className="font-medium">{c.subject}</TableCell>
                                        <TableCell>{c.class}</TableCell>
                                        <TableCell><Badge variant="secondary">{c.type}</Badge></TableCell>
                                        <TableCell className='text-right'>
                                            <Button size="sm" onClick={() => toast({ title: "Joining Class", description: "Redirecting to virtual classroom..."})}><Video className="mr-2 h-4 w-4" /> Start Class</Button>
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
                            <CardTitle className='flex items-center gap-2'><UserCheck className="w-5 h-5" /> Assigned Students</CardTitle>
                            <CardDescription>Manage and interact with your students.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-h-60 overflow-y-auto pr-2">
                                <Table>
                                    <TableBody>
                                        {assignedStudents.length > 0 ? assignedStudents.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell className="font-medium">{s.name}</TableCell>
                                                <TableCell className='text-right'>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">Actions</Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem onClick={() => openNoteDialog(s)}><MessageSquare className="mr-2 h-4 w-4"/>Send Note</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => openTagDialog(s)}><Tag className="mr-2 h-4 w-4"/>Add Tag</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={2} className="text-center text-muted-foreground p-4">
                                                    No students assigned yet.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className='w-full mt-4' variant="outline">Take Full Attendance</Button>
                                </DialogTrigger>
                                <DialogContent className="glass-card max-w-2xl">
                                    <DialogHeader><DialogTitle>Mark Attendance for CS-301</DialogTitle></DialogHeader>
                                    <div className="max-h-[60vh] overflow-y-auto space-y-2 p-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {attendanceList.map((student, index) => (
                                            <div key={student.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                                                <Label htmlFor={`att-${student.id}`} className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={student.avatar} data-ai-hint="student portrait" />
                                                        <AvatarFallback>{student.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    {student.name}
                                                </Label>
                                                <Switch id={`att-${student.id}`} checked={student.present} onCheckedChange={(checked) => {
                                                    const newStudents = [...attendanceList];
                                                    newStudents[index].present = checked;
                                                    setAttendanceList(newStudents);
                                                }} />
                                            </div>
                                        ))}
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={() => toast({ title: "Attendance Saved Successfully" })}>Save Changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'><ClipboardList className="w-5 h-5" /> Assignments</CardTitle>
                            <CardDescription>Overview of active assignments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="max-h-60 overflow-y-auto pr-2">
                                 <Table>
                                    <TableHeader>
                                        <TableRow><TableHead>Title</TableHead><TableHead className='text-right'>Submissions</TableHead></TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {assignments.map((a) => (
                                            <TableRow key={a.id}>
                                                <TableCell>
                                                    <div className="font-medium">{a.title}</div>
                                                    <div className="text-xs text-muted-foreground">Due: {a.due}</div>
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <div className="flex items-center justify-end">
                                                        <span className="font-mono">{a.submissions}</span>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteAssignment(a.id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </div>
                             <Dialog>
                                <DialogTrigger asChild><Button className='w-full mt-4' variant="outline">Create New Assignment</Button></DialogTrigger>
                                <DialogContent className="glass-card">
                                    <DialogHeader><DialogTitle>Create New Assignment</DialogTitle></DialogHeader>
                                    <form onSubmit={handleCreateAssignment} className="space-y-4">
                                        <div><Label htmlFor="title">Assignment Title</Label><Input id="title" name="title" required /></div>
                                        <div><Label htmlFor="due">Due Date</Label><Input id="due" name="due" type="date" required /></div>
                                        <DialogFooter>
                                            <Button type="submit">Create</Button>
                                        </DialogFooter>
                                    </form>
                                    <button id="close-assignment-dialog" style={{ display: 'none' }} onClick={(e) => (e.target as HTMLElement).closest('[data-radix-dialog-content]')?.parentElement?.querySelector('[data-radix-dialog-overlay]')?.click()}></button>
                                </DialogContent>
                             </Dialog>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <Card className="glass-card text-center">
                    <CardHeader className="items-center">
                        <Avatar className="h-24 w-24 border-2 border-primary mb-2">
                            <AvatarImage src={user.avatar} alt="Faculty Avatar" data-ai-hint="faculty portrait" />
                            <AvatarFallback>{user.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{user.name}</CardTitle>
                        <CardDescription>{user.department}</CardDescription>
                    </CardHeader>
                </Card>

                 <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'><Megaphone className="w-5 h-5" /> Post Announcement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea placeholder="Type your announcement for your students..." value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)} />
                        <Button className='w-full' onClick={handlePostAnnouncement}>Post to Students</Button>
                    </CardContent>
                </Card>
                
                <Card className="glass-card">
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'><FolderUp className="w-5 h-5" /> Study Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Dialog>
                            <DialogTrigger asChild><Button className='w-full' variant="outline"><FilePlus className='mr-2 h-4 w-4'/>Upload New File</Button></DialogTrigger>
                            <DialogContent className="glass-card">
                                <DialogHeader><DialogTitle>Upload Study Material</DialogTitle></DialogHeader>
                                <form onSubmit={handleUploadMaterial} className="space-y-4">
                                    <div><Label htmlFor="title">File Title</Label><Input id="title" name="title" required /></div>
                                    <div><Label htmlFor="course">Course Code</Label><Input id="course" name="course" placeholder="e.g., CS-301" required /></div>
                                    <div><Label htmlFor="file">File</Label><Input id="file" name="file" type="file" required /></div>
                                    <DialogFooter>
                                        <Button type="submit">Upload</Button>
                                    </DialogFooter>
                                </form>
                                <button id="close-material-dialog" style={{ display: 'none' }} onClick={(e) => (e.target as HTMLElement).closest('[data-radix-dialog-content]')?.parentElement?.querySelector('[data-radix-dialog-overlay]')?.click()}></button>
                            </DialogContent>
                         </Dialog>
                        <Separator className='my-4'/>
                        <div className='space-y-2 max-h-40 overflow-y-auto pr-2'>
                            {studyMaterials.map((m) => (
                                <div key={m.id} className='flex items-center justify-between p-2 rounded-md hover:bg-accent'>
                                    <div>
                                        <p className='text-sm font-medium'>{m.title}</p>
                                        <div className='text-xs'><Badge variant="secondary">{m.course}</Badge></div>
                                    </div>
                                    <div className="flex items-center">
                                        <Button variant="ghost" size="icon" onClick={() => toast({title: "Downloading File..."})}>
                                            <Download className='h-4 w-4' />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteMaterial(m.id)}>
                                            <Trash2 className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            {/* Dialogs for teacher actions */}
            <Dialog open={isNoteDialogOpen} onOpenChange={setNoteDialogOpen}>
                <DialogContent className="glass-card">
                    <DialogHeader><DialogTitle>Send a Note to {selectedStudent?.name}</DialogTitle></DialogHeader>
                    <Textarea placeholder="Type your private message here..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
                    <DialogFooter><Button onClick={handleSendNote}>Send Note</Button></DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isTagDialogOpen} onOpenChange={setTagDialogOpen}>
                 <DialogContent className="glass-card">
                    <DialogHeader><DialogTitle>Add a Tag for {selectedStudent?.name}</DialogTitle></DialogHeader>
                    <Input placeholder="e.g., Needs Help, Backlog" value={tagContent} onChange={(e) => setTagContent(e.target.value)} />
                    <DialogFooter><Button onClick={handleAddTag}>Add Tag</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

    