"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import { Eye, EyeOff, Calendar as CalendarIcon, ArrowLeft } from "lucide-react";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function StudentRegistrationPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        dob: undefined as Date | undefined,
        gender: '',
        profilePhoto: null as File | null,
        studentMobile: '',
        parentMobile: '',
        email: '',
        programName: '',
        section: '',
        city: '',
        state: '',
        username: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const router = useRouter();
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({ ...prev, profilePhoto: e.target.files![0] }));
        }
    };
    
    const handleReset = () => {
        setFormData({
            fullName: '', dob: undefined, gender: '', profilePhoto: null,
            studentMobile: '', parentMobile: '', email: '',
            programName: '', section: '', city: '', state: '',
            username: '', password: '', confirmPassword: '', agreeTerms: false,
        });
        setStep(1);
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    
    const calculatePasswordStrength = () => {
        const { password } = formData;
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25; // Bonus for special char
        return Math.min(strength, 100);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast({ variant: "destructive", title: "Error", description: "Passwords do not match." });
            return;
        }
        if (!formData.agreeTerms) {
            toast({ variant: "destructive", title: "Error", description: "You must agree to the terms and conditions." });
            return;
        }
        console.log("Form Submitted:", formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <Card className="w-full max-w-lg glass-card text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl">Registration Successful!</CardTitle>
                        <CardDescription>Your request has been sent for admin approval.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>You will be notified via email once your account is activated. Thank you for your patience.</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => router.push('/')}>Back to Login</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-2xl glass-card">
                 <CardHeader>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                           <ArrowLeft />
                        </Button>
                        <div>
                           <CardTitle className="text-2xl">Student Registration</CardTitle>
                           <CardDescription>Fill out the form to create your account.</CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                        <Progress value={(step / 3) * 100} className="w-full" />
                        <span className="text-sm font-medium text-muted-foreground">Step {step} of 3</span>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in-50">
                                <h3 className="font-semibold">Personal Details</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label htmlFor="fullName">Full Name</Label><Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></div>
                                    <div className="space-y-2"><Label>Date of Birth</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !formData.dob && "text-muted-foreground")}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />{formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={formData.dob} onSelect={(date) => setFormData(p => ({...p, dob: date}))} initialFocus /></PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className="space-y-2"><Label>Gender</Label>
                                    <RadioGroup name="gender" onValueChange={(val) => setFormData(p => ({...p, gender: val}))} value={formData.gender} className="flex gap-4">
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other">Other</Label></div>
                                    </RadioGroup>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label htmlFor="studentMobile">Student Mobile No.</Label><Input id="studentMobile" name="studentMobile" type="tel" value={formData.studentMobile} onChange={handleInputChange} required /></div>
                                    <div className="space-y-2"><Label htmlFor="parentMobile">Parent/Guardian Mobile No.</Label><Input id="parentMobile" name="parentMobile" type="tel" value={formData.parentMobile} onChange={handleInputChange} required /></div>
                                </div>
                                <div className="space-y-2"><Label htmlFor="profilePhoto">Profile Photo</Label><Input id="profilePhoto" name="profilePhoto" type="file" onChange={handleFileChange} accept="image/*" /></div>
                            </div>
                        )}
                        {step === 2 && (
                             <div className="space-y-4 animate-in fade-in-50">
                                <h3 className="font-semibold">Academic & Contact Details</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email ID</Label>
                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label htmlFor="programName">Program Name</Label><Input id="programName" name="programName" value={formData.programName} onChange={handleInputChange} required /></div>
                                    <div className="space-y-2"><Label htmlFor="section">Section/Batch</Label><Input id="section" name="section" value={formData.section} onChange={handleInputChange} required /></div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" name="city" value={formData.city} onChange={handleInputChange} required /></div>
                                    <div className="space-y-2"><Label htmlFor="state">State</Label><Input id="state" name="state" value={formData.state} onChange={handleInputChange} required /></div>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                             <div className="space-y-4 animate-in fade-in-50">
                                <h3 className="font-semibold">Account Credentials</h3>
                                <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" name="username" value={formData.username} onChange={handleInputChange} required /></div>
                                <div className="space-y-2 relative">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} required />
                                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-6 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button>
                                </div>
                                <div className="space-y-2">
                                    <Label>Password Strength</Label>
                                    <div className="flex items-center gap-2">
                                        <Progress value={calculatePasswordStrength()} className="h-2" />
                                        <span className="text-xs">{calculatePasswordStrength()}%</span>
                                    </div>
                                </div>
                                <div className="space-y-2 relative">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleInputChange} required />
                                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-6 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff /> : <Eye />}</Button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onCheckedChange={(checked) => setFormData(p => ({...p, agreeTerms: !!checked}))} />
                                    <Label htmlFor="agreeTerms" className="text-sm font-normal">I agree to the terms and conditions</Label>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div>
                           {step > 1 && <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>}
                        </div>
                        <div className="flex gap-2">
                           <Button type="button" variant="secondary" onClick={handleReset}>Reset</Button>
                           {step < 3 && <Button type="button" onClick={nextStep}>Next</Button>}
                           {step === 3 && <Button type="submit">Submit</Button>}
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
