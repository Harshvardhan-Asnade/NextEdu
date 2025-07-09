"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart, Cell } from "recharts";
import type { AttendanceSubject, ResultsSemester, ResultsSubject } from "@/context/UserContext";

const gradeColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--destructive))",
];

const monthAttendanceData = [
    { name: "Jan", percentage: 85 },
    { name: "Feb", percentage: 88 },
    { name: "Mar", percentage: 78 },
    { name: "Apr", percentage: 92 },
    { name: "May", percentage: 90 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      let valueLabel = "";
      if (data.count !== undefined) {
        valueLabel = `${payload[0].value} Student(s)`;
      } else if (data.percentage !== undefined) {
        valueLabel = `${payload[0].value}%`;
      } else if (data.sgpa !== undefined) {
        valueLabel = `SGPA: ${payload[0].value.toFixed(2)}`;
      }

      return (
        <div className="rounded-lg border bg-background/80 backdrop-blur-sm p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {label}
              </span>
              <span className="font-bold text-foreground">
                {valueLabel}
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

export function GradeDistributionChart({ results }: { results: ResultsSubject[] }) {
    const gradeOrder = ['A+', 'A', 'B+', 'B', 'C', 'D', 'Fail'];

    const gradeDistributionData = results.reduce((acc, result) => {
        const grade = result.grade.toUpperCase();
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(gradeDistributionData)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => {
            const indexA = gradeOrder.indexOf(a.name);
            const indexB = gradeOrder.indexOf(b.name);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.2)'}} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={gradeColors[index % gradeColors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}


export function SgpaTrendChart({ resultsData }: { resultsData: Record<string, ResultsSemester> }) {
    const chartData = Object.keys(resultsData)
        .map(semKey => {
            const semData = resultsData[semKey];
            if (!semData || !semData.summary) return null;
            return {
                name: `Sem ${semKey.replace('sem', '')}`,
                sgpa: parseFloat(semData.summary.sgpa),
            };
        })
        .filter((item): item is { name: string; sgpa: number } => item !== null)
        .sort((a, b) => parseInt(a.name.split(' ')[1]) - parseInt(b.name.split(' ')[1]));

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{stroke: 'hsl(var(--accent) / 0.2)', strokeWidth: 1}} />
                    <Line type="monotone" dataKey="sgpa" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
