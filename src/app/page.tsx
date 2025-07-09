"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const Illustration = () => (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-purple-800 p-8">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-white/10 rounded-full animate-pulse animation-delay-2000" />
        <svg viewBox="0 0 512 512" className="relative w-full h-auto max-w-lg text-white z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 288c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96Z" fill="rgba(255,255,255,0.2)"/>
            <path d="M128 416c0-57.9 46.1-104 104-104h48c57.9 0 104 46.1 104 104v16H128v-16Z" fill="rgba(255,255,255,0.2)"/>
            <rect x="100" y="280" width="312" height="160" rx="16" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
            <path d="M80 440h352" stroke="rgba(255,255,255,0.3)" strokeWidth="4" strokeLinecap="round"/>
            <rect x="116" y="296" width="280" height="128" rx="8" fill="rgba(0,0,0,0.2)"/>
            <path d="M80 160 120 200l-40 40" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
            <path d="M432 160 392 200l40 40" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.7s' }}/>
            <circle cx="90" cy="90" r="10" fill="currentColor" opacity="0.5" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
            <circle cx="420" cy="300" r="14" fill="currentColor" opacity="0.5" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
            <rect x="380" y="80" width="40" height="40" rx="8" stroke="currentColor" strokeWidth="8" opacity="0.5" className="animate-spin-slow"/>
            <path d="M128 350h50" stroke="hsl(190, 80%, 70%)" strokeWidth="6" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.1s'}}/>
            <path d="M128 365h80" stroke="hsl(300, 80%, 70%)" strokeWidth="6" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
            <path d="M128 380h30" stroke="hsl(50, 80%, 70%)" strokeWidth="6" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
        </svg>
    </div>
);

export default function ModernLoginPage() {
    const [role, setRole] = useState('student');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };
    
    const welcomeText = `Welcome ${role.charAt(0).toUpperCase() + role.slice(1)}`;

    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-background animate-in fade-in duration-500">
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

                    <Tabs defaultValue="student" onValueChange={setRole} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="student">Student</TabsTrigger>
                            <TabsTrigger value="faculty">Faculty</TabsTrigger>
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="name@example.com" disabled={isLoading} className="transition-shadow duration-300 focus:shadow-lg focus:shadow-primary/20" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••" disabled={isLoading} className="transition-shadow duration-300 focus:shadow-lg focus:shadow-primary/20" />
                        </div>

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
                        
                        <Button type="submit" className="w-full h-11 transition-all duration-300" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
                        </Button>
                        
                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="#" className="font-medium text-primary hover:text-primary/90">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block">
                 <Illustration />
            </div>
        </div>
    );
}
