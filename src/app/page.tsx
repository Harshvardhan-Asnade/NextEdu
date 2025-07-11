"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Key, Shield, Briefcase } from 'lucide-react';
import { LoadingScreen } from '@/components/loading-screen';
import { useUser } from '@/context/UserContext';
import { cn } from '@/lib/utils';

const Illustration = () => (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-purple-800 p-8">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-white/10 rounded-full animate-pulse animation-delay-2000" />
        <svg viewBox="0 0 512 512" className="relative w-full h-auto max-w-lg text-white z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="256" cy="160" r="48" fill="rgba(255,255,255,0.2)"/>
            <path d="M160 384c0-53.02 42.98-96 96-96h0c53.02 0 96 42.98 96 96V416H160V384Z" fill="rgba(255,255,255,0.2)"/>
            <rect x="80" y="384" width="352" height="16" rx="8" fill="rgba(255,255,255,0.25)" />
            <rect x="144" y="272" width="224" height="112" rx="12" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <rect x="224" y="384" width="64" height="24" fill="rgba(0,0,0,0.2)" />
            <path d="M160 384 L 160 288" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <path d="M352 384 L 352 288" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            <g className="animate-pulse" style={{ animationDelay: '0.5s' }}>
                <path d="M96 128L80 144l16 16" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                <path d="m112 144 16-16" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </g>
            <g className="animate-pulse" style={{ animationDelay: '0.7s' }}>
                <path d="M416 192a24 24 0 1 0 0-48 24 24 0 0 0 0 48Z" stroke="currentColor" strokeWidth="6" opacity="0.6"/>
                <path d="M416 156v24m-12-12h24" stroke="currentColor" strokeWidth="6" opacity="0.6"/>
            </g>
            <rect x="80" y="240" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="6" opacity="0.5" className="animate-spin-slow"/>
            <circle cx="432" cy="300" r="16" fill="currentColor" opacity="0.4" className="animate-pulse" style={{animationDelay: '0.2s'}} />
            <circle cx="432" cy="300" r="8" fill="rgba(0,0,0,0.2)" />
            <path d="M384 80L352 48L320 80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" className="animate-pulse" />
        </svg>
    </div>
);

export default function ModernLoginPage() {
    const [role, setRole] = useState('student');
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { students, teachers } = useUser();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            let userToLogin: any = null;
            let loginSuccess = false;

            if (role === 'admin') {
                if (username === 'admin' && password === 'admin') {
                    loginSuccess = true;
                    userToLogin = { role: 'admin', name: 'Admin', password: 'admin', avatar: 'https://placehold.co/100x100.png' }; 
                } else {
                    setError('Invalid Admin credentials. Please try again.');
                }
            } else if (role === 'student') {
                const foundStudent = students.find(s => (s.id === username || s.username === username) && s.password === password);
                if (foundStudent) {
                    userToLogin = { ...foundStudent, role: 'student' };
                    loginSuccess = true;
                } else {
                    setError('Invalid credentials or your account is not yet approved by the admin.');
                }
            } else if (role === 'faculty') {
                const foundFaculty = teachers.find(t => (t.id === username || t.username === username) && t.password === password);
                if (foundFaculty) {
                    userToLogin = { ...foundFaculty, role: 'faculty' };
                    loginSuccess = true;
                } else {
                    setError('Invalid credentials or you are not an authorized faculty member.');
                }
            }

            if (loginSuccess && userToLogin) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('loggedInUser', JSON.stringify(userToLogin));
                }
                router.push('/dashboard');
            } else {
                setIsLoading(false);
                if (!error) {
                    setError('Invalid username or password.');
                }
            }
        }, 1500);
    };

    const handleDemoLogin = () => {
        setIsLoading(true);
        setError('');
        const demoStudent = students.find(s => s.id === 'STU-DEMO');
        
        if (demoStudent) {
             setTimeout(() => {
                localStorage.setItem('loggedInUser', JSON.stringify({ ...demoStudent, role: 'student' }));
                router.push('/dashboard');
            }, 1000);
        } else {
            setError('Demo user not found. Please contact support.');
            setIsLoading(false);
        }
    };

    const handleFacultyDemoLogin = () => {
        setIsLoading(true);
        setError('');
        const demoFaculty = teachers.find(t => t.id === 'FAC-DEMO');
        
        if (demoFaculty) {
             setTimeout(() => {
                localStorage.setItem('loggedInUser', JSON.stringify({ ...demoFaculty, role: 'faculty' }));
                router.push('/dashboard');
            }, 1000);
        } else {
            setError('Demo faculty user not found. Please contact support.');
            setIsLoading(false);
        }
    };
    
    const welcomeText = `Welcome ${role.charAt(0).toUpperCase() + role.slice(1)}`;

    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-background animate-in fade-in duration-500">
            {isLoading && <LoadingScreen />}
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground text-center">
                            {welcomeText}
                        </h1>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                           Sign in to your dashboard
                        </p>
                    </div>

                    <Tabs defaultValue="student" onValueChange={(newRole) => { setRole(newRole); setError(''); setUsername(''); setPassword(''); }} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="student">Student</TabsTrigger>
                            <TabsTrigger value="faculty">Faculty</TabsTrigger>
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <Label htmlFor="username">
                                {role === 'admin' ? 'Admin Username' : (role === 'student' ? 'Username or Enrollment No.' : 'Username or Faculty ID')}
                            </Label>
                            {role === 'admin' ? (
                                <div className="relative">
                                     <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                     <Input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter admin username" disabled={isLoading} className="pl-10" />
                                </div>
                            ) : (
                                <Input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder={role === 'student' ? 'e.g. aarav.patel or STU-001' : 'e.g. meera.iyer or FAC-001'} disabled={isLoading} />
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" disabled={isLoading} />
                        </div>
                        
                        {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                        {role !== 'admin' && (
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember-me" name="remember-me" disabled={isLoading} />
                                    <Label htmlFor="remember-me" className="text-muted-foreground font-normal">
                                        Remember me
                                    </Label>
                                </div>
                                <Link href="#" className="font-medium text-primary hover:text-primary/90">
                                    Forgot password?
                                </Link>
                            </div>
                        )}
                        
                        <Button type="submit" className={cn("w-full h-11", role !== 'admin' && 'btn-gradient')} disabled={isLoading}>
                            Sign In
                        </Button>
                        
                    </form>
                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or try a demo login
                            </span>
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full" onClick={handleDemoLogin} disabled={isLoading}>
                            <Key className="mr-2 h-4 w-4" />
                            Demo Student
                        </Button>
                        <Button variant="outline" className="w-full" onClick={handleFacultyDemoLogin} disabled={isLoading}>
                            <Briefcase className="mr-2 h-4 w-4" />
                            Demo Faculty
                        </Button>
                    </div>
                    <div className="text-center text-sm mt-4">
                        <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href="/register">Don't have an account? Register here</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                 <Illustration />
            </div>
        </div>
    );
}
