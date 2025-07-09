"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hexagon, LogIn, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const getRoleDetails = (selectedRole: string) => {
    switch (selectedRole) {
      case 'admin':
        return { label: 'Employee ID', placeholder: 'e.g., ADM123' };
      case 'faculty':
        return { label: 'Faculty ID', placeholder: 'e.g., FAC456' };
      case 'student':
      default:
        return { label: 'Enrollment Number', placeholder: 'e.g., FD2021034' };
    }
  };

  const { label, placeholder } = getRoleDetails(role);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 animate-in fade-in duration-1000">
      <Card className="w-full max-w-md glass-card animate-in fade-in-0 zoom-in-95 duration-700">
        <CardHeader className="text-center p-8">
            <Link
              href="#"
              className="group flex mx-auto h-14 w-14 shrink-0 items-center justify-center gap-2 rounded-full bg-primary/10 border-2 border-primary/50 text-primary mb-4 transition-all duration-300 hover:bg-primary/20 hover:border-primary"
            >
              <Hexagon className="h-7 w-7 transition-all group-hover:scale-110 group-hover:rotate-12" />
              <span className="sr-only">Nexus Dashboard</span>
            </Link>
          <CardTitle className="text-3xl font-bold">
            Welcome to <span className="text-primary">Nexus</span>
          </CardTitle>
          <CardDescription className="pt-1">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 px-8">
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Select defaultValue="student" onValueChange={setRole} disabled={isLoading}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">{label}</Label>
              <Input id="username" type="text" placeholder={placeholder} required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required disabled={isLoading} />
            </div>
          </CardContent>
          <CardFooter className="px-8 pb-8 pt-4">
            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                  <LogIn className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Please wait...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
