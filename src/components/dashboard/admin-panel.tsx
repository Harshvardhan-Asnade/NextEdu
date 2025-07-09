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
import { PlusCircle, UserPlus, Trash2, Edit } from "lucide-react";

const initialStudents = [
    { id: "STU-001", name: "Aarav Patel", email: "aarav.patel@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-002", name: "Aditi Sharma", email: "aditi.sharma@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-003", name: "Arjun Kumar", email: "arjun.kumar@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-004", name: "Diya Singh", email: "diya.singh@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-005", name: "Ishaan Gupta", email: "ishaan.gupta@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-006", name: "Kavya Reddy", email: "kavya.reddy@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-007", name: "Mohammed Khan", email: "mohammed.khan@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-008", name: "Myra Desai", email: "myra.desai@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-009", name: "Riya Verma", email: "riya.verma@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-010", name: "Rohan Mehta", email: "rohan.mehta@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-011", name: "Saanvi Joshi", email: "saanvi.joshi@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-012", name: "Vihaan Iyer", email: "vihaan.iyer@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-013", name: "Zara Begum", email: "zara.begum@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-014", name: "Advik Nair", email: "advik.nair@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-015", name: "Ananya Rao", email: "ananya.rao@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-016", name: "Aryan Mishra", email: "aryan.mishra@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-017", name: "Ishani Das", email: "ishani.das@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-018", name: "Kabir Chawla", email: "kabir.chawla@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-019", name: "Kiara Malhotra", email: "kiara.malhotra@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-020", name: "Vivaan Jain", email: "vivaan.jain@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-021", name: "Shanaya Kapoor", email: "shanaya.kapoor@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-022", name: "Reyansh Tiwari", email: "reyansh.tiwari@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-023", name: "Anika Reddy", email: "anika.reddy@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-024", name: "Krish Patel", email: "krish.patel@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-025", name: "Pari Saxena", email: "pari.saxena@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-026", name: "Sai Kumar", email: "sai.kumar@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-027", name: "Tara Menon", email: "tara.menon@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-028", name: "Yuvraj Singh", email: "yuvraj.singh@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-029", name: "Aanya Gupta", email: "aanya.gupta@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
    { id: "STU-030", name: "Zoya Ali", email: "zoya.ali@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/40x40.png" },
];

const initialTeachers = [
    { id: "FAC-001", name: "Dr. Meera Iyer", email: "meera.iyer@university.edu", department: "Computer Science", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-002", name: "Dr. Rajeev Menon", email: "rajeev.menon@university.edu", department: "Artificial Intelligence", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-003", name: "Prof. Sunita Sharma", email: "sunita.sharma@university.edu", department: "Machine Learning", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-004", name: "Dr. Anil Kumar", email: "anil.kumar@university.edu", department: "Data Structures", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-005", name: "Prof. Priya Das", email: "priya.das@university.edu", department: "Algorithms", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-006", name: "Dr. Sanjay Gupta", email: "sanjay.gupta@university.edu", department: "Database Systems", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-007", name: "Prof. Geeta Reddy", email: "geeta.reddy@university.edu", department: "Web Development", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-008", name: "Dr. Ashok Verma", email: "ashok.verma@university.edu", department: "Operating Systems", avatar: "https://placehold.co/40x40.png" },
];

export function AdminPanel() {
    const [students, setStudents] = useState(initialStudents);
    const [teachers, setTeachers] = useState(initialTeachers);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
    const [dialogType, setDialogType] = useState<'student' | 'teacher'>('student');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', roleSpecific: '', avatar: '' });

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
                id: `${dialogType === 'student' ? 'STU' : 'FAC'}-${Math.floor(100 + Math.random() * 900)}`,
                name: formData.name,
                email: formData.email,
                avatar: formData.avatar || 'https://placehold.co/40x40.png',
                ...(dialogType === 'student' ? { course: formData.roleSpecific } : { department: formData.roleSpecific })
            };
            if (dialogType === 'student') {
                setStudents(prev => [newUser, ...prev]);
            } else {
                setTeachers(prev => [newUser, ...prev]);
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
        setIsAlertOpen(false);
        setUserToDelete(null);
    };

    const renderDialog = () => (
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
    );
    
    const renderDeleteAlert = () => (
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
    );

    return (
        <div className="space-y-8">
            {renderDialog()}
            {renderDeleteAlert()}
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Students</CardTitle>
                        <CardDescription>Add, edit, or remove student profiles from the system.</CardDescription>
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
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="font-medium">{student.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="student portrait" />
                                                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div className="font-medium">{student.name}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.course}</TableCell>
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
                                <TableHead>Faculty ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell className="font-medium">{teacher.id}</TableCell>
                                    <TableCell>
                                         <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={teacher.avatar} alt={teacher.name} data-ai-hint="faculty portrait" />
                                                <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="font-medium">{teacher.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell>{teacher.department}</TableCell>
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
        </div>
    );
}
