'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Student {
    id: string;
    name: string;
    email: string;
    course: string;
    avatar: string;
    dob: string;
    contact: string;
    parentContact: string;
    semester: number;
}

interface Teacher {
    id: string;
    name:string;
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
    { id: "STU-001", name: "Aarav Patel", email: "aarav.patel@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "12-05-2003", contact: "+91 9876543210", parentContact: "+91 9876543211", semester: 3 },
    { id: "STU-002", name: "Aditi Sharma", email: "aditi.sharma@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "22-08-2003", contact: "+91 9876543212", parentContact: "+91 9876543213", semester: 3 },
    { id: "STU-003", name: "Arjun Kumar", email: "arjun.kumar@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "05-11-2002", contact: "+91 9876543214", parentContact: "+91 9876543215", semester: 4 },
    { id: "STU-004", name: "Diya Singh", email: "diya.singh@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "19-02-2003", contact: "+91 9876543216", parentContact: "+91 9876543217", semester: 3 },
    { id: "STU-005", name: "Ishaan Gupta", email: "ishaan.gupta@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "30-07-2003", contact: "+91 9876543218", parentContact: "+91 9876543219", semester: 3 },
    { id: "STU-006", name: "Kavya Reddy", email: "kavya.reddy@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "14-04-2003", contact: "+91 9876543220", parentContact: "+91 9876543221", semester: 4 },
    { id: "STU-007", name: "Mohammed Khan", email: "mohammed.khan@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "25-09-2002", contact: "+91 9876543222", parentContact: "+91 9876543223", semester: 3 },
    { id: "STU-008", name: "Myra Desai", email: "myra.desai@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "08-12-2003", contact: "+91 9876543224", parentContact: "+91 9876543225", semester: 3 },
    { id: "STU-009", name: "Riya Verma", email: "riya.verma@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "03-01-2004", contact: "+91 9876543226", parentContact: "+91 9876543227", semester: 2 },
    { id: "STU-010", name: "Rohan Mehta", email: "rohan.mehta@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "18-06-2003", contact: "+91 9876543228", parentContact: "+91 9876543229", semester: 3 },
    { id: "STU-011", name: "Saanvi Joshi", email: "saanvi.joshi@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "21-03-2003", contact: "+91 9876543230", parentContact: "+91 9876543231", semester: 3 },
    { id: "STU-012", name: "Vihaan Iyer", email: "vihaan.iyer@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "11-10-2002", contact: "+91 9876543232", parentContact: "+91 9876543233", semester: 4 },
    { id: "STU-013", name: "Zara Begum", email: "zara.begum@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "09-09-2003", contact: "+91 9876543234", parentContact: "+91 9876543235", semester: 3 },
    { id: "STU-014", name: "Advik Nair", email: "advik.nair@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "07-07-2003", contact: "+91 9876543236", parentContact: "+91 9876543237", semester: 2 },
    { id: "STU-015", name: "Ananya Rao", email: "ananya.rao@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "29-05-2003", contact: "+91 9876543238", parentContact: "+91 9876543239", semester: 3 },
    { id: "STU-016", name: "Aryan Mishra", email: "aryan.mishra@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "13-08-2002", contact: "+91 9876543240", parentContact: "+91 9876543241", semester: 4 },
    { id: "STU-017", name: "Ishani Das", email: "ishani.das@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "01-04-2003", contact: "+91 9876543242", parentContact: "+91 9876543243", semester: 3 },
    { id: "STU-018", name: "Kabir Chawla", email: "kabir.chawla@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "23-11-2002", contact: "+91 9876543244", parentContact: "+91 9876543245", semester: 4 },
    { id: "STU-019", name: "Kiara Malhotra", email: "kiara.malhotra@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "10-06-2003", contact: "+91 9876543246", parentContact: "+91 9876543247", semester: 3 },
    { id: "STU-020", name: "Vivaan Jain", email: "vivaan.jain@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "05-02-2004", contact: "+91 9876543248", parentContact: "+91 9876543249", semester: 2 },
    { id: "STU-021", name: "Shanaya Kapoor", email: "shanaya.kapoor@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "28-10-2003", contact: "+91 9876543250", parentContact: "+91 9876543251", semester: 3 },
    { id: "STU-022", name: "Reyansh Tiwari", email: "reyansh.tiwari@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "16-01-2003", contact: "+91 9876543252", parentContact: "+91 9876543253", semester: 4 },
    { id: "STU-023", name: "Anika Reddy", email: "anika.reddy@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "02-09-2003", contact: "+91 9876543254", parentContact: "+91 9876543255", semester: 3 },
    { id: "STU-024", name: "Krish Patel", email: "krish.patel@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "19-07-2002", contact: "+91 9876543256", parentContact: "+91 9876543257", semester: 4 },
    { id: "STU-025", name: "Pari Saxena", email: "pari.saxena@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "27-04-2003", contact: "+91 9876543258", parentContact: "+91 9876543259", semester: 3 },
    { id: "STU-026", name: "Sai Kumar", email: "sai.kumar@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "15-12-2003", contact: "+91 9876543260", parentContact: "+91 9876543261", semester: 2 },
    { id: "STU-027", name: "Tara Menon", email: "tara.menon@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "20-08-2003", contact: "+91 9876543262", parentContact: "+91 9876543263", semester: 3 },
    { id: "STU-028", name: "Yuvraj Singh", email: "yuvraj.singh@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "11-03-2002", contact: "+91 9876543264", parentContact: "+91 9876543265", semester: 4 },
    { id: "STU-029", name: "Aanya Gupta", email: "aanya.gupta@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "06-06-2003", contact: "+91 9876543266", parentContact: "+91 9876543267", semester: 3 },
    { id: "STU-030", name: "Zoya Ali", email: "zoya.ali@university.edu", course: "B.Tech CSE (AI/ML)", avatar: "https://placehold.co/100x100.png", dob: "24-01-2004", contact: "+91 9876543268", parentContact: "+91 9876543269", semester: 2 }
];


const initialTeachers: Teacher[] = [
    { id: "FAC-001", name: "Dr. Meera Iyer", email: "meera.iyer@university.edu", department: "Computer Science", avatar: "https://placehold.co/100x100.png" },
    { id: "FAC-002", name: "Dr. Rajeev Menon", email: "rajeev.menon@university.edu", department: "Artificial Intelligence", avatar: "https://placehold.co/100x100.png" },
    { id: "FAC-003", name: "Prof. Sunita Sharma", email: "sunita.sharma@university.edu", department: "Machine Learning", avatar: "https://placehold.co/100x100.png" },
    { id: "FAC-004", name: "Dr. Anil Kumar", email: "anil.kumar@university.edu", department: "Data Structures", avatar: "https://placehold.co/100x100.png" },
    { id: "FAC-005", name: "Prof. Priya Das", email: "priya.das@university.edu", department: "Algorithms", avatar: "https://placehold.co/100x100.png" },
    { id: "FAC-006", name: "Dr. Sanjay Gupta", email: "sanjay.gupta@university.edu", department: "Database Systems", avatar: "https://placehold.co/100x100.png" },
    { id: "FAC-007", name: "Prof. Geeta Reddy", email: "geeta.reddy@university.edu", department: "Web Development", avatar: "https://placehold.co/100x100.png" },
    { id: "FAC-008", name: "Dr. Ashok Verma", email: "ashok.verma@university.edu", department: "Operating Systems", avatar: "https://placehold.co/100x100.png" },
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
