'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Student {
    id: string;
    name: string;
    email: string;
    course: string;
    avatar: string;
}

interface Teacher {
    id: string;
    name: string;
    email: string;
    department: string;
    avatar: string;
}

interface UserContextType {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

const initialStudents: Student[] = [
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

const initialTeachers: Teacher[] = [
    { id: "FAC-001", name: "Dr. Meera Iyer", email: "meera.iyer@university.edu", department: "Computer Science", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-002", name: "Dr. Rajeev Menon", email: "rajeev.menon@university.edu", department: "Artificial Intelligence", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-003", name: "Prof. Sunita Sharma", email: "sunita.sharma@university.edu", department: "Machine Learning", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-004", name: "Dr. Anil Kumar", email: "anil.kumar@university.edu", department: "Data Structures", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-005", name: "Prof. Priya Das", email: "priya.das@university.edu", department: "Algorithms", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-006", name: "Dr. Sanjay Gupta", email: "sanjay.gupta@university.edu", department: "Database Systems", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-007", name: "Prof. Geeta Reddy", email: "geeta.reddy@university.edu", department: "Web Development", avatar: "https://placehold.co/40x40.png" },
    { id: "FAC-008", name: "Dr. Ashok Verma", email: "ashok.verma@university.edu", department: "Operating Systems", avatar: "https://placehold.co/40x40.png" },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

    return (
        <UserContext.Provider value={{ students, setStudents, teachers, setTeachers }}>
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