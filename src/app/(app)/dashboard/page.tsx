'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Users } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const attendanceData = [
  { name: "Jan", total: Math.floor(Math.random() * 100) + 85 },
  { name: "Feb", total: Math.floor(Math.random() * 100) + 85 },
  { name: "Mar", total: Math.floor(Math.random() * 100) + 85 },
  { name: "Apr", total: Math.floor(Math.random() * 100) + 85 },
  { name: "May", total: Math.floor(Math.random() * 100) + 85 },
  { name: "Jun", total: Math.floor(Math.random() * 100) + 85 },
]

const recentViolations = [
    { id: "V001", student: "Alex Ray", date: "2023-10-26", issue: "No Tie" },
    { id: "V002", student: "Jordan Lee", date: "2023-10-25", issue: "Improper Shoes" },
    { id: "V003", student: "Taylor Kim", date: "2023-10-25", issue: "Not in uniform" },
    { id: "V004", student: "Casey Smith", date: "2023-10-24", issue: "No ID Card" },
]

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <Card className={`bg-card/50 backdrop-blur-lg border-border/30 shadow-lg ${className}`}>
        {children}
    </Card>
);

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </GlassCard>
        <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                    >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">92.8%</div>
                <p className="text-xs text-muted-foreground">+1.2% from yesterday</p>
            </CardContent>
        </GlassCard>
        <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dress Code Violations</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                    >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">in last 24 hours</p>
            </CardContent>
        </GlassCard>
        <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Leave Requests</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                    >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
        </GlassCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <GlassCard className="col-span-4">
            <CardHeader>
                <CardTitle className='font-headline'>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={attendanceData}>
                        <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        />
                        <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </GlassCard>
        <GlassCard className="col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle className='font-headline'>Recent Dress Code Violations</CardTitle>
                <CardDescription>
                    4 violations in the last 7 days.
                </CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentViolations.map((violation) => (
                    <TableRow key={violation.id}>
                        <TableCell>
                        <div className="font-medium">{violation.student}</div>
                        </TableCell>
                        <TableCell>
                        <Badge variant="destructive">{violation.issue}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{violation.date}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </CardContent>
             <CardFooter className="flex justify-end">
                <Button asChild size="sm" variant="outline" className="gap-1">
                <Link href="#">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
                </Button>
            </CardFooter>
        </GlassCard>
      </div>
    </div>
  );
}
