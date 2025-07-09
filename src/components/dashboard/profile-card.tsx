"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Download, Bell, UserSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser, Teacher } from "@/context/UserContext";

export function ProfileCard({ user }: { user: any }) {
    const { toast } = useToast();
    const { teachers } = useUser();
    const [selectedCertificate, setSelectedCertificate] = useState("");
    const [mentor, setMentor] = useState<Teacher | null>(null);

     useEffect(() => {
        if (user?.teacherId) {
            const assignedMentor = teachers.find(t => t.id === user.teacherId);
            setMentor(assignedMentor || null);
        }
    }, [user, teachers]);

    const handleRequestCertificate = () => {
        if (!selectedCertificate) {
            toast({
                title: "No Certificate Selected",
                description: "Please select a certificate type to request.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Certificate Requested",
            description: `Your request for a ${selectedCertificate.replace(/([A-Z])/g, ' $1').trim()} has been submitted.`,
        });
    };

    if (!user) {
        return (
             <Card className="glass-card overflow-hidden">
                <CardHeader className="flex flex-col items-center gap-4 text-center p-6">
                    <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarFallback>...</AvatarFallback>
                    </Avatar>
                </CardHeader>
             </Card>
        )
    }

    return (
        <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-col items-center gap-4 text-center p-6">
                <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src={user.avatar} alt="Student Avatar" data-ai-hint="student portrait" />
                    <AvatarFallback>{user.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <CardDescription>Enrollment No: {user.id}</CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                     <Badge variant="secondary">{user.course}</Badge>
                     <Badge variant="secondary">Sem {user.semester}</Badge>
                     <Badge variant="secondary">Sec {user.section}</Badge>
                </div>
                {user.tags?.length > 0 && (
                    <div className="flex gap-1 flex-wrap justify-center pt-2">
                        {user.tags.map((tag: string) => <Badge key={tag} variant="destructive">{tag}</Badge>)}
                    </div>
                )}
            </CardHeader>
            <CardContent className="p-6 text-sm">
                {mentor && (
                    <>
                        <div className="flex justify-between items-center">
                             <span className="font-medium flex items-center gap-2"><UserSquare className="h-4 w-4" /> Assigned Mentor</span>
                            <span className="font-medium">{mentor.name}</span>
                        </div>
                        <Separator className="my-3" />
                    </>
                )}
                <div className="flex justify-between">
                    <span>Date of Birth</span>
                    <span className="font-medium">{user.dob}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between">
                    <span>Gender</span>
                    <span className="font-medium capitalize">{user.gender}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between">
                    <span>Contact</span>
                    <span className="font-medium">{user.contact}</span>
                </div>
                 <Separator className="my-3" />
                <div className="flex justify-between">
                    <span>Parent's Contact</span>
                    <span className="font-medium">{user.parentContact}</span>
                </div>
                <Separator className="my-3" />
                 <div className="flex justify-between">
                    <span>Email</span>
                    <span className="font-medium">{user.email}</span>
                </div>
                 <Separator className="my-3" />
                 <div className="flex justify-between">
                    <span>Address</span>
                    <span className="font-medium">{user.city}, {user.state}</span>
                </div>
                <Separator className="my-3" />
                 <div className="flex items-center justify-between">
                    <label htmlFor="notifications" className="font-medium flex items-center gap-2">
                        <Bell className="h-4 w-4" /> Push Notifications
                    </label>
                    <Switch id="notifications" defaultChecked />
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <div className="w-full space-y-2">
                    <p className="text-sm font-medium">Certificate Request</p>
                    <Select onValueChange={setSelectedCertificate}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select certificate type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BonafideCertificate">Bonafide Certificate</SelectItem>
                            <SelectItem value="TransferCertificate">Transfer Certificate</SelectItem>
                            <SelectItem value="CharacterCertificate">Character Certificate</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="w-full" onClick={handleRequestCertificate}>
                        <Download className="mr-2 h-4 w-4"/> Request Certificate
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
