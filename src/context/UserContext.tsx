'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { generateRandomHistory } from '@/lib/utils';

export interface PendingStudent {
    fullName: string;
    dob: Date | undefined;
    gender: string;
    profilePhoto: string | null;
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

export interface Announcement {
    id: number;
    by: string;
    content: string;
    time: string;
    scope: 'global' | 'teacher';
    teacherId?: string;
}

export interface Activity {
    id: number;
    user: string;
    action: string;
    timestamp: Date;
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
    gender: string;
    section: string;
    city: string;
    state: string;
    contact: string;
    parentContact: string;
    semester: number;
    username: string;
    password: string;
    teacherId: string | null;
    tags: string[];
    notifications: { id: number, message: string, read: boolean, from: string, timestamp: Date }[];
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
    subjects: string[];
}

interface UserContextType {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    pendingStudents: PendingStudent[];
    setPendingStudents: React.Dispatch<React.SetStateAction<PendingStudent[]>>;
    announcements: Announcement[];
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
    activityLog: Activity[];
    logActivity: (user: string, action: string) => void;
}

export const feeData = {
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

const tomHollandAcademicHistory = {
    attendance: generateRandomHistory(4).attendance,
    results: {
        sem1: {
            session: "May 2023",
            results: [
                { code: "MA101", name: "Mathematics I", credits: 4, grade: "B" },
                { code: "PH101", name: "Physics", credits: 4, grade: "A" },
                { code: "EE101", name: "Basic Electrical Engg.", credits: 4, grade: "B" },
                { code: "CS101", name: "Problem Solving with C", credits: 4, grade: "B+" },
            ],
            summary: { sgpa: "7.80", cgpa: "7.80", backlogs: 0, status: "Passed" as "Passed" }
        },
        sem2: {
            session: "Dec 2023",
            results: [
                { code: "MA201", name: "Mathematics II", credits: 4, grade: "A+" },
                { code: "CH201", name: "Chemistry", credits: 4, grade: "A" },
                { code: "CS201", name: "Data Structures", credits: 4, grade: "A" },
                { code: "CS202", name: "Object Oriented Prog.", credits: 4, grade: "A" },
            ],
            summary: { sgpa: "9.10", cgpa: "8.45", backlogs: 0, status: "Passed" as "Passed" }
        },
        sem3: {
            session: "May 2024",
            results: [
                { code: "CS301", name: "Advanced Algorithms", credits: 4, grade: "C" },
                { code: "CS302", name: "Database Systems", credits: 4, grade: "B" },
                { code: "CS303", name: "Web Development", credits: 4, grade: "C" },
                { code: "CS304", name: "Operating Systems", credits: 4, grade: "B+" },
            ],
            summary: { sgpa: "6.90", cgpa: "7.93", backlogs: 0, status: "Passed" as "Passed" }
        }
    }
};

const tomHollandFeeData = {
    summary: [
        { head: "Tuition Fee", toPay: 125000, paid: 120000, inProcess: 0, outstanding: 5000, dueDate: "10-07-2024" },
        { head: "Exam Fee", toPay: 2500, paid: 0, inProcess: 0, outstanding: 2500, dueDate: "25-07-2024" },
        { head: "Library Fee", toPay: 500, paid: 500, inProcess: 0, outstanding: 0, dueDate: "10-07-2024" },
        { head: "Hostel Fee", toPay: 40000, paid: 40000, inProcess: 0, outstanding: 0, dueDate: "05-07-2024" },
    ],
    history: feeData.history
};

const initialStudentsRaw = [
    { id: "STU-DEMO", name: "Tom Holland", email: "tom.holland@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJnTwDDHJj8WLO4tNt0mCN6EPMhfFiLePcFw&s", dob: "01-06-1996", contact: "+44 1234567890", parentContact: "+44 1234567891", semester: 4, username: 'tom.holland', password: 'demo', gender: 'male', section: 'A', city: 'London', state: 'UK', teacherId: 'FAC-DEMO', tags: ['Needs Help'], notifications: [{id: 1, from: "Admin", message: "Welcome to the new NextEdu portal!", read: false, timestamp: new Date()}] },
    { id: "STU-001", name: "Aarav Patel", email: "aarav.patel@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png?text=AP", dob: "12-05-2003", contact: "+91 9876543210", parentContact: "+91 9876543211", semester: 4, username: 'aarav.patel', password: 'password', gender: 'male', section: 'A', city: 'Mumbai', state: 'Maharashtra', teacherId: 'FAC-001', tags: [], notifications: [] },
    { id: "STU-002", name: "Aditi Sharma", email: "aditi.sharma@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png?text=AS", dob: "22-08-2003", contact: "+91 9876543212", parentContact: "+91 9876543213", semester: 4, username: 'aditi.sharma', password: 'password', gender: 'female', section: 'B', city: 'Delhi', state: 'Delhi', teacherId: 'FAC-001', tags: [], notifications: [] },
];

const initialStudents: Student[] = initialStudentsRaw.map(student => {
    if (student.id === 'STU-DEMO') {
        return {
            ...student,
            academicHistory: tomHollandAcademicHistory,
            fees: tomHollandFeeData,
        };
    }
    return {
        ...student,
        academicHistory: generateRandomHistory(student.semester),
        fees: feeData,
        tags: student.tags || [],
        notifications: student.notifications || [],
    };
});


const initialTeachers: Teacher[] = [
    { id: "FAC-DEMO", name: "Dr. Robert Downey", email: "robert.downey@university.edu", department: "Computer Science", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF34FgqdPjOKDhT-eSnttr_uUM33MT3DMbEJhzbD3brtHdZrGp7K_xJquf45K6btyihOs&usqp=CAU", username: 'robert.downey', password: 'demo', subjects: ['CS-301', 'CS-302'] },
    { id: "FAC-001", name: "Dr. Meera Iyer", email: "meera.iyer@university.edu", department: "Computer Science", avatar: "https://placehold.co/100x100.png?text=MI", username: 'meera.iyer', password: 'password', subjects: ['CS-303L', 'CS-304'] },
    { id: "FAC-002", name: "Dr. Rajeev Menon", email: "rajeev.menon@university.edu", department: "Artificial Intelligence", avatar: "https://placehold.co/100x100.png?text=RM", username: 'rajeev.menon', password: 'password', subjects: ['AI-401'] },
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
        agreeTerms: true,
    }
]

const initialAnnouncements: Announcement[] = [
    {
        id: 1,
        by: 'Admin',
        content: 'The final examination schedule for the current semester has been released. Please check the exam portal.',
        time: '1 day ago',
        scope: 'global',
    },
    {
        id: 2,
        by: 'Admin',
        content: "The annual university hackathon 'Hack-a-Next' is scheduled for next month. Registrations are now open!",
        time: '2 days ago',
        scope: 'global',
    },
    {
        id: 3,
        by: 'Library Dept.',
        content: 'The central library will be open 24/7 during the upcoming examination period. Good luck with your studies!',
        time: '3 days ago',
        scope: 'global',
    },
    {
        id: 4,
        by: 'CSE Department',
        content: 'A guest lecture on "The Future of Artificial Intelligence" by a distinguished speaker will be held this Friday.',
        time: '4 days ago',
        scope: 'global',
    },
    {
        id: 5,
        by: 'Admin',
        content: 'Welcome to the new NextEdu portal! We are excited to have you here.',
        time: '5 days ago',
        scope: 'global',
    }
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
        const [storedValue, setStoredValue] = useState<T>(() => {
            if (typeof window === 'undefined') return initialValue;
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item, (k, v) => k === 'dob' || k === 'timestamp' ? new Date(v) : v) : initialValue;
            } catch (error) {
                console.error(error);
                return initialValue;
            }
        });

        useEffect(() => {
            try {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.error(`Error setting localStorage key “${key}”:`, error);
            }
        }, [key, storedValue]);

        return [storedValue, setStoredValue];
    };
    
    const [students, setStudents] = useLocalStorage<Student[]>('students', initialStudents);
    const [teachers, setTeachers] = useLocalStorage<Teacher[]>('teachers', initialTeachers);
    const [pendingStudents, setPendingStudents] = useLocalStorage<PendingStudent[]>('pendingStudents', initialPendingStudents);
    const [announcements, setAnnouncements] = useLocalStorage<Announcement[]>('announcements', initialAnnouncements);
    const [activityLog, setActivityLog] = useLocalStorage<Activity[]>('activityLog', []);

    const logActivity = (user: string, action: string) => {
        const newActivity: Activity = { id: Date.now(), user, action, timestamp: new Date() };
        setActivityLog(prev => [newActivity, ...prev]);
    };


    return (
        <UserContext.Provider value={{ students, setStudents, teachers, setTeachers, pendingStudents, setPendingStudents, announcements, setAnnouncements, activityLog, logActivity }}>
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
