"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart, Cell } from "recharts";
import type { AttendanceSubject } from "@/context/UserContext";


const monthAttendanceData = [
    { name: "Jan", percentage: 85 },
    { name: "Feb", percentage: 88 },
    { name: "Mar", percentage: 78 },
    { name: "Apr", percentage: 92 },
    { name: "May", percentage: 90 },
];

const gradeDistributionData = [
    { name: 'A+', count: 8 },
    { name: 'A', count: 15 },
    { name: 'B+', count: 12 },
    { name: 'B', count: 7 },
    { name: 'C', count: 3 },
    { name: 'Fail', count: 1 },
];

const gradeColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--destructive))",
]


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isGradeChart = payload[0].payload.count !== undefined;
      const isAttendanceChart = payload[0].payload.percentage !== undefined;

      return (
        <div className="rounded-lg border bg-background/80 backdrop-blur-sm p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {label}
              </span>
              <span className="font-bold text-muted-foreground">
                {isGradeChart 
                    ? `${payload[0].value} Students`
                    : isAttendanceChart
                    ? `${payload[0].value}%`
                    : ''
                }
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
};


export function AttendanceChart({ attendanceData }: { attendanceData: AttendanceSubject[] }) {
    const chartData = attendanceData.map(subject => ({
        name: subject.name.split(' ').map(w => w[0]).join(''),
        percentage: subject.conducted > 0 ? parseFloat(((subject.present / subject.conducted) * 100).toFixed(2)) : 0
    }));

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.2)'}} />
                    <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function MonthViewChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} cursor={{stroke: 'hsl(var(--accent) / 0.2)', strokeWidth: 1}} />
                    <Line type="monotone" dataKey="percentage" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function GradeDistributionChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistributionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.2)'}} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {gradeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={gradeColors[index % gradeColors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
