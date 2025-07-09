"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, UserPlus, Trash2, Edit, UserCheck, UserX, Megaphone, Send } from "lucide-react";
import { useUser, PendingStudent, Student, Teacher, Announcement } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { generateRandomHistory } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";


export function AdminPanel() {
    const { students, setStudents, teachers, setTeachers, pendingStudents, setPendingStudents, announcements, setAnnouncements, logActivity, activityLog } = useUser();
    const { toast } = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
    const [dialogType, setDialogType] = useState<'student' | 'teacher'>('student');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', roleSpecific: '', avatar: '' });
    const [newAnnouncement, setNewAnnouncement] = useState("");

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<{ user: any, type: 'student' | 'teacher' } | null>(null);

    const openDialog = (mode: 'add' | 'edit', type: 'student' | 'teacher', user: any = null) => {
        setDialogMode(mode);
        setDialogType(type);
        if (mode === 'edit' && user) {
            setSelectedUser(user);
            setFormData({ name: user.name, email: user.email, roleSpecific: user.course || user.department, avatar: user.avatar || '' });
        } else {
            setSelectedUser(null);
            setFormData({ name: '', email: '', roleSpecific: '', avatar: '' });
        }
        setIsDialogOpen(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        if (!formData.name || !formData.email || !formData.roleSpecific) {
            alert("Please fill all fields.");
            return;
        }
        if (dialogMode === 'add') {
            const newUser = {
                id: `${dialogType === 'student' ? 'STU' : 'FAC'}-${String(100 + (dialogType === 'student' ? students.length : teachers.length) + 1).slice(1)}`,
                name: formData.name,
                email: formData.email,
                avatar: formData.avatar || 'https://placehold.co/40x40.png',
                username: formData.name.toLowerCase().replace(' ', '.'),
                password: 'password',
                ...(dialogType === 'student' ? { course: formData.roleSpecific, semester: 1, dob: 'N/A', contact: 'N/A', parentContact: 'N/A', gender: 'N/A', section: 'N/A', city: 'N/A', state: 'N/A', academicHistory: generateRandomHistory(1), fees: {}, teacherId: null, tags: [], notifications: [] } : { department: formData.roleSpecific, subjects: [] })
            };
            if (dialogType === 'student') {
                setStudents(prev => [newUser as Student, ...prev]);
                logActivity("Admin", `Added new student: ${newUser.name}`);
            } else {
                setTeachers(prev => [newUser as Teacher, ...prev]);
                logActivity("Admin", `Added new teacher: ${newUser.name}`);
            }
        } else { // edit mode
            const updatedUser = {
                ...selectedUser,
                name: formData.name,
                email: formData.email,
                avatar: formData.avatar,
                ...(dialogType === 'student'
                    ? { course: formData.roleSpecific }
                    : { department: formData.roleSpecific }
                )
            };
            if (dialogType === 'student') {
                setStudents(prev => prev.map(s => s.id === selectedUser.id ? updatedUser : s));
            } else {
                setTeachers(prev => prev.map(t => t.id === selectedUser.id ? updatedUser : t));
            }
            logActivity("Admin", `Edited user: ${updatedUser.name}`);
        }
        setIsDialogOpen(false);
    };

    const openDeleteAlert = (user: any, type: 'student' | 'teacher') => {
        setUserToDelete({ user, type });
        setIsAlertOpen(true);
    };

    const confirmDelete = () => {
        if (!userToDelete) return;
        if (userToDelete.type === 'student') {
            setStudents(prev => prev.filter(s => s.id !== userToDelete.user.id));
        } else {
            setTeachers(prev => prev.filter(t => t.id !== userToDelete.user.id));
        }
        logActivity("Admin", `Deleted user: ${userToDelete.user.name}`);
        setIsAlertOpen(false);
        setUserToDelete(null);
    };

    const handleApprove = (pendingStudent: PendingStudent) => {
        const newId = `STU-${String(100 + students.length + 1).slice(1)}`;
        const startSemester = 1; // All new students start at semester 1
        const newStudent: Student = {
            id: newId,
            name: pendingStudent.fullName,
            email: pendingStudent.email,
            course: pendingStudent.programName,
            avatar: pendingStudent.profilePhoto || `https://placehold.co/100x100.png?text=${pendingStudent.fullName.split(' ').map(n=>n[0]).join('')}`,
            dob: pendingStudent.dob ? format(pendingStudent.dob, 'dd-MM-yyyy') : 'N/A',
            gender: pendingStudent.gender,
            section: pendingStudent.section,
            city: pendingStudent.city,
            state: pendingStudent.state,
            contact: pendingStudent.studentMobile,
            parentContact: pendingStudent.parentMobile,
            semester: startSemester,
            username: pendingStudent.username,
            password: pendingStudent.password,
            academicHistory: generateRandomHistory(startSemester),
            fees: { summary: [], history: [] },
            teacherId: null,
            tags: [],
            notifications: [],
        };
        setStudents(prev => [newStudent, ...prev]);
        setPendingStudents(prev => prev.filter(s => s.username !== pendingStudent.username));
        logActivity("Admin", `Approved registration for ${newStudent.name}`);
        toast({ title: "Student Approved", description: `${newStudent.name} is now an active student.` });
    };

    const handleReject = (pendingStudent: PendingStudent) => {
        setPendingStudents(prev => prev.filter(s => s.username !== pendingStudent.username));
        logActivity("Admin", `Rejected registration for ${pendingStudent.fullName}`);
        toast({ title: "Request Rejected", description: `The registration for ${pendingStudent.fullName} has been rejected.`, variant: "destructive" });
    };

    const handleAssignTeacher = (studentId: string, teacherId: string) => {
        setStudents(prevStudents => prevStudents.map(s => s.id === studentId ? { ...s, teacherId } : s));
        const studentName = students.find(s=>s.id === studentId)?.name;
        const teacherName = teachers.find(t=>t.id === teacherId)?.name;
        logActivity("Admin", `Assigned ${teacherName} to ${studentName}`);
        toast({ title: "Teacher Assigned", description: `Assigned teacher to student ${studentId}.` });
    };

    const handlePostAnnouncement = () => {
        if (!newAnnouncement.trim()) return;
        const announcement: Announcement = {
            id: Date.now(),
            by: "Admin",
            content: newAnnouncement,
            time: "Just now",
            scope: 'global',
        };
        setAnnouncements(prev => [announcement, ...prev]);
        setNewAnnouncement("");
        logActivity("Admin", `Posted a global announcement.`);
        toast({ title: "Announcement Posted!" });
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Megaphone /> Global Announcements</CardTitle>
                        <CardDescription>Post an announcement for all users.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea placeholder="Type your announcement here..." value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)} />
                        <Button className='w-full' onClick={handlePostAnnouncement}><Send className="mr-2 h-4 w-4"/> Post Announcement</Button>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>A log of recent actions in the system.</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-60 overflow-y-auto pr-2 space-y-2">
                        {activityLog.length > 0 ? activityLog.slice(0, 5).map(log => (
                            <div key={log.id} className="text-sm p-2 rounded-md bg-accent/50">
                                <p><span className="font-semibold">{log.user}</span>: {log.action}</p>
                                <p className="text-xs text-muted-foreground">{format(log.timestamp, "PPP p")}</p>
                            </div>
                        )) : <p className="text-sm text-muted-foreground">No recent activity.</p>}
                    </CardContent>
                </Card>
            </div>


            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Pending Student Approvals</CardTitle>
                    <CardDescription>Review and approve new student registration requests.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-h-[300px] overflow-y-auto pr-2">
                        <Table>
                            <TableHeader className="sticky top-0 bg-card/80 backdrop-blur-sm z-10">
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingStudents.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center h-24">No pending requests.</TableCell>
                                    </TableRow>
                                ) : (
                                    pendingStudents.map((student) => (
                                        <TableRow key={student.username}>
                                            <TableCell className="font-medium">{student.fullName}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{student.programName}</TableCell>
                                            <TableCell className="text-right space-x-1">
                                                <Button variant="outline" size="sm" className="border-success/50 text-success hover:bg-success hover:text-success-foreground" onClick={() => handleApprove(student)}>
                                                    <UserCheck className="h-4 w-4 mr-1" /> Approve
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => handleReject(student)}>
                                                    <UserX className="h-4 w-4 mr-1" /> Reject
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Students</CardTitle>
                        <CardDescription>Add, edit, or remove student profiles and assign mentors.</CardDescription>
                    </div>
                     <Button size="sm" onClick={() => openDialog('add', 'student')}>
                        <UserPlus className="mr-2 h-4 w-4" /> Add Student
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="max-h-[500px] overflow-y-auto pr-2">
                        <Table>
                            <TableHeader className="sticky top-0 bg-card/80 backdrop-blur-sm z-10">
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Assigned Mentor</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="student portrait" />
                                                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{student.name}</div>
                                                    <div className="text-sm text-muted-foreground">{student.id}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{student.course}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={student.teacherId || ''}
                                                onValueChange={(teacherId) => handleAssignTeacher(student.id, teacherId)}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Assign a teacher" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="unassigned">Unassigned</SelectItem>
                                                    {teachers.map(t => (
                                                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right space-x-1">
                                            <Button variant="ghost" size="icon" onClick={() => openDialog('edit', 'student', student)}>
                                                <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => openDeleteAlert(student, 'student')}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Faculty</CardTitle>
                        <CardDescription>Add, edit, or remove teacher profiles from the system.</CardDescription>
                    </div>
                     <Button size="sm" onClick={() => openDialog('add', 'teacher')}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Teacher
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Faculty</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Subjects</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell>
                                         <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={teacher.avatar} alt={teacher.name} data-ai-hint="faculty portrait" />
                                                <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{teacher.name}</div>
                                                <div className="text-sm text-muted-foreground">{teacher.id}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{teacher.department}</TableCell>
                                    <TableCell>{teacher.subjects.join(', ')}</TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <Button variant="ghost" size="icon" onClick={() => openDialog('edit', 'teacher', teacher)}>
                                            <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => openDeleteAlert(teacher, 'teacher')}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] glass-card">
                    <DialogHeader>
                        <DialogTitle>{dialogMode === 'add' ? 'Add' : 'Edit'} {dialogType}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={formData.name} onChange={handleFormChange} className="col-span-3" placeholder="Enter full name"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" type="email" value={formData.email} onChange={handleFormChange} className="col-span-3" placeholder="name@university.edu" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="roleSpecific" className="text-right">{dialogType === 'student' ? 'Course' : 'Department'}</Label>
                            <Input id="roleSpecific" value={formData.roleSpecific} onChange={handleFormChange} className="col-span-3" placeholder={dialogType === 'student' ? 'e.g. B.Tech CSE' : 'e.g. Computer Science'}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="avatar" className="text-right">Avatar URL</Label>
                            <Input id="avatar" value={formData.avatar} onChange={handleFormChange} className="col-span-3" placeholder="https://..."/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent className="glass-card">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user profile for {userToDelete?.user.name}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
