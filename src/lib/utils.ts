import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AttendanceSemester, ResultsSemester } from "@/context/UserContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRandomHistory = (currentSemester: number) => {
    const history: {
        attendance: Record<string, AttendanceSemester>;
        results: Record<string, ResultsSemester>;
    } = {
        attendance: {},
        results: {},
    };

    const subjectsBySem: Record<string, string[]> = {
      "sem1": ["Mathematics I", "Physics", "Basic Electrical Engg.", "Problem Solving with C"],
      "sem2": ["Mathematics II", "Chemistry", "Data Structures", "Object Oriented Prog."],
      "sem3": ["Advanced Algorithms", "Database Systems", "Web Development", "Operating Systems"],
      "sem4": ["Computer Networks", "Software Engineering", "AI/ML", "Compiler Design"],
      "sem5": ["Distributed Systems", "Cryptography", "Image Processing", "Project Mgmt"],
      "sem6": ["Cloud Computing", "Big Data Analytics", "IoT", "Mobile Computing"],
      "sem7": ["Deep Learning", "Natural Language Processing", "Cyber Security", "Final Project I"],
      "sem8": ["Final Project II", "Internship", "Ethics in Engineering", "Elective"],
    };
    const grades = ["A+", "A", "B+", "B", "C"];
    const gradePoints: Record<string, number> = { "A+": 10, "A": 9, "B+": 8, "B": 7, "C": 6 };
    let cumulativeCredits = 0;
    let cumulativeGradePoints = 0;

    for (let i = 1; i < currentSemester; i++) {
        const semKey = `sem${i}`;
        const semSubjects = subjectsBySem[semKey] || [];
        if(semSubjects.length === 0) continue;

        // Attendance
        const attendanceSubjects = semSubjects.map(name => {
            const conducted = name.includes("Lab") || name.includes("Project") ? 30 : 60;
            const present = Math.floor(conducted * (0.75 + Math.random() * 0.25)); // 75% to 100%
            return { name, conducted, present, absent: conducted - present, type: 'Theory' as "Theory" | "Practical" };
        });
        const totalConducted = attendanceSubjects.reduce((sum, s) => sum + s.conducted, 0);
        const totalPresent = attendanceSubjects.reduce((sum, s) => sum + s.present, 0);
        history.attendance[semKey] = {
            subjects: attendanceSubjects,
            overall: totalConducted > 0 ? parseFloat(((totalPresent / totalConducted) * 100).toFixed(2)) : 0,
        };

        // Results
        let semTotalCredits = 0;
        let semTotalGradePoints = 0;
        const resultSubjects = semSubjects.map((name, index) => {
            const credits = name.includes("Lab") || name.includes("Project") ? 2 : 4;
            const grade = grades[Math.floor(Math.random() * grades.length)];
            semTotalCredits += credits;
            semTotalGradePoints += gradePoints[grade] * credits;
            return {
                code: `${name.substring(0,2).toUpperCase()}${i}0${index+1}`,
                name,
                credits,
                grade
            };
        });

        const sgpa = semTotalCredits > 0 ? (semTotalGradePoints / semTotalCredits).toFixed(2) : "0.00";
        cumulativeCredits += semTotalCredits;
        cumulativeGradePoints += semTotalGradePoints;
        const cgpa = cumulativeCredits > 0 ? (cumulativeGradePoints / cumulativeCredits).toFixed(2) : "0.00";

        history.results[semKey] = {
            session: i % 2 !== 0 ? `May 20${22 + Math.floor(i/2)}` : `Dec 20${22 + Math.floor((i-1)/2)}`,
            results: resultSubjects,
            summary: { sgpa, cgpa, backlogs: 0, status: 'Passed' }
        };
    }

    return history;
};
