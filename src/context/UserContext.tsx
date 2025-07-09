'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateRandomHistory } from '@/lib/utils';

export interface PendingStudent {
    fullName: string;
    dob: Date | undefined;
    gender: string;
    profilePhoto: File | null;
    studentMobile: string;
    parentMobile: string;
    email: string;
    programName: string;
    section: string;
    city: string;
    state: string;
    username: string;
    password: string;
    agreeTerms: boolean;
}

export interface AttendanceSubject {
    name: string;
    type: "Theory" | "Practical";
    conducted: number;
    present: number;
    absent: number;
}

export interface AttendanceSemester {
    subjects: AttendanceSubject[];
    overall: number | "N/A";
}

export interface ResultsSubject {
    code: string;
    name: string;
    credits: number;
    grade: string;
}

export interface ResultsSemester {
    session: string;
    results: ResultsSubject[];
    summary: {
        sgpa: string;
        cgpa: string;
        backlogs: number;
        status: "Passed" | "Failed" | "Withheld";
    } | null;
}

export interface FeeItem {
    head: string;
    toPay: number;
    paid: number;
    inProcess: number;
    outstanding: number;
    dueDate: string;
}

export interface Transaction {
    date: string;
    year: string;
    sem: number;
    mode: string;
    amount: number;
    status: "Success" | "Failed" | "Pending";
    txnId: string;
}
export interface Student {
    id: string;
    name: string;
    email: string;
    course: string;
    avatar: string;
    dob: string;
    contact: string;
    parentContact: string;
    semester: number;
    username: string;
    password: string;
    academicHistory: {
        attendance: Record<string, AttendanceSemester>;
        results: Record<string, ResultsSemester>;
    };
    fees: {
        summary: FeeItem[];
        history: Transaction[];
    };
}

export interface Teacher {
    id: string;
    name:string;
    email: string;
    department: string;
    avatar: string;
    username: string;
    password: string;
}

interface UserContextType {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    pendingStudents: PendingStudent[];
    setPendingStudents: React.Dispatch<React.SetStateAction<PendingStudent[]>>;
}

const feeData = {
    summary: [
        { head: "Tuition Fee", toPay: 125000, paid: 125000, inProcess: 0, outstanding: 0, dueDate: "10-07-2024" },
        { head: "Exam Fee", toPay: 2500, paid: 0, inProcess: 0, outstanding: 2500, dueDate: "25-07-2024" },
        { head: "Library Fee", toPay: 500, paid: 500, inProcess: 0, outstanding: 0, dueDate: "10-07-2024" },
        { head: "Hostel Fee", toPay: 40000, paid: 40000, inProcess: 0, outstanding: 0, dueDate: "05-07-2024" },
        { head: "Transport Fee", toPay: 10000, paid: 10000, inProcess: 0, outstanding: 0, dueDate: "05-07-2024" },
    ],
    history: [
        { date: "08-07-2024", year: "2024-25", sem: 3, mode: "Card", amount: 125500, status: "Success", txnId: "T2024070812345" },
        { date: "04-07-2024", year: "2024-25", sem: 3, mode: "Netbanking", amount: 50000, status: "Success", txnId: "T2024070409876" },
        { date: "15-01-2024", year: "2023-24", sem: 2, mode: "UPI", amount: 125500, status: "Success", txnId: "T2024011509876" },
        { date: "10-01-2024", year: "2023-24", sem: 2, mode: "Card", amount: 50000, status: "Success", txnId: "T2024011012345" },
        { date: "09-08-2023", year: "2023-24", sem: 1, mode: "Card", amount: 125500, status: "Success", txnId: "T2023080954321" },
        { date: "05-08-2023", year: "2023-24", sem: 1, mode: "UPI", amount: 50000, status: "Success", txnId: "T2023080567890" },
    ]
};


const initialStudentsRaw = [
    { id: "STU-001", name: "Aarav Patel", email: "aarav.patel@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "12-05-2003", contact: "+91 9876543210", parentContact: "+91 9876543211", semester: 4, username: 'aarav.patel', password: 'password' },
    { id: "STU-002", name: "Aditi Sharma", email: "aditi.sharma@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "22-08-2003", contact: "+91 9876543212", parentContact: "+91 9876543213", semester: 4, username: 'aditi.sharma', password: 'password' },
    { id: "STU-003", name: "Arjun Kumar", email: "arjun.kumar@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "05-11-2002", contact: "+91 9876543214", parentContact: "+91 9876543215", semester: 4, username: 'arjun.kumar', password: 'password' },
    { id: "STU-004", name: "Diya Singh", email: "diya.singh@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "19-02-2003", contact: "+91 9876543216", parentContact: "+91 9876543217", semester: 3, username: 'diya.singh', password: 'password' },
    { id: "STU-005", name: "Ishaan Gupta", email: "ishaan.gupta@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "30-07-2003", contact: "+91 9876543218", parentContact: "+91 9876543219", semester: 3, username: 'ishaan.gupta', password: 'password' },
    { id: "STU-006", name: "Kavya Reddy", email: "kavya.reddy@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "14-04-2003", contact: "+91 9876543220", parentContact: "+91 9876543221", semester: 4, username: 'kavya.reddy', password: 'password' },
    { id: "STU-007", name: "Mohammed Khan", email: "mohammed.khan@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "25-09-2002", contact: "+91 9876543222", parentContact: "+91 9876543223", semester: 3, username: 'mohammed.khan', password: 'password' },
    { id: "STU-008", name: "Myra Desai", email: "myra.desai@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "08-12-2003", contact: "+91 9876543224", parentContact: "+91 9876543225", semester: 3, username: 'myra.desai', password: 'password' },
    { id: "STU-009", name: "Riya Verma", email: "riya.verma@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "03-01-2004", contact: "+91 9876543226", parentContact: "+91 9876543227", semester: 2, username: 'riya.verma', password: 'password' },
    { id: "STU-010", name: "Rohan Mehta", email: "rohan.mehta@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "18-06-2003", contact: "+91 9876543228", parentContact: "+91 9876543229", semester: 3, username: 'rohan.mehta', password: 'password' },
];

const initialStudents: Student[] = initialStudentsRaw.map(student => ({
    ...student,
    academicHistory: generateRandomHistory(student.semester),
    fees: feeData,
}));

const initialTeachers: Teacher[] = [
    { id: "FAC-001", name: "Dr. Meera Iyer", email: "meera.iyer@university.edu", department: "Computer Science", avatar: "https://placehold.co/100x100.png", username: 'meera.iyer', password: 'password' },
    { id: "FAC-002", name: "Dr. Rajeev Menon", email: "rajeev.menon@university.edu", department: "Artificial Intelligence", avatar: "https://placehold.co/100x100.png", username: 'rajeev.menon', password: 'password' },
    { id: "FAC-003", name: "Prof. Sunita Sharma", email: "sunita.sharma@university.edu", department: "Machine Learning", avatar: "https://placehold.co/100x100.png", username: 'sunita.sharma', password: 'password' },
];

const initialPendingStudents: PendingStudent[] = [
    {
        fullName: 'Priya Chauhan',
        dob: new Date('2004-05-20'),
        gender: 'female',
        profilePhoto: null,
        studentMobile: '9876512345',
        parentMobile: '9876512346',
        email: 'priya.chauhan@example.com',
        programName: 'B.Tech CSE (AI/ML)',
        section: 'A',
        city: 'Mumbai',
        state: 'Maharashtra',
        username: 'priya.chauhan',
        password: 'password123',
        confirmPassword: 'password123',
        agreeTerms: true,
    }
]

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
    const [pendingStudents, setPendingStudents] = useState<PendingStudent[]>(initialPendingStudents);

    return (
        <UserContext.Provider value={{ students, setStudents, teachers, setTeachers, pendingStudents, setPendingStudents }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
