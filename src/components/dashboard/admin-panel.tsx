"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, UserPlus } from "lucide-react";

const students = [
    { id: "STU-001", name: "Alex Doe", email: "alex.doe@university.edu", course: "B.Tech CSE (AI/ML)" },
    { id: "STU-002", name: "Jane Smith", email: "jane.smith@university.edu", course: "B.Tech CSE (AI/ML)" },
    { id: "STU-003", name: "Sam Wilson", email: "sam.wilson@university.edu", course: "B.Tech CSE (AI/ML)" },
];

const teachers = [
    { id: "FAC-001", name: "Dr. Alan Turing", email: "alan.turing@university.edu", department: "Computer Science" },
    { id: "FAC-002", name: "Dr. Ada Lovelace", email: "ada.lovelace@university.edu", department: "Computer Science" },
];

export function AdminPanel() {
    const { toast } = useToast();

    const handleAdd = (type: string) => {
        toast({
            title: `Add New ${type}`,
            description: `The form to add a new ${type} would appear here. This is for demonstration.`,
        });
    };

    const handleRemove = (type: string, name: string) => {
        toast({
            title: `Remove ${type}`,
            description: `${name} has been removed. This is a mock action.`,
            variant: "destructive",
        });
    };

    return (
        <div className="space-y-8">
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Students</CardTitle>
                        <CardDescription>Add or remove student profiles from the system.</CardDescription>
                    </div>
                     <Button size="sm" onClick={() => handleAdd('Student')}>
                        <UserPlus className="mr-2 h-4 w-4" /> Add Student
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
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
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleRemove('Student', student.name)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Faculty</CardTitle>
                        <CardDescription>Add or remove teacher profiles from the system.</CardDescription>
                    </div>
                     <Button size="sm" onClick={() => handleAdd('Teacher')}>
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
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell>{teacher.department}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleRemove('Teacher', teacher.name)}>
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
