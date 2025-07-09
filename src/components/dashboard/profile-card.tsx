"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Download } from "lucide-react";

export function ProfileCard() {
    return (
        <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-col items-center gap-4 text-center p-6">
                <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Student Avatar" data-ai-hint="student portrait" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">Alex Doe</CardTitle>
                    <CardDescription>Enrollment No: FD2021034</CardDescription>
                </div>
                <div className="flex gap-2">
                     <Badge variant="secondary">B.Tech CSE</Badge>
                     <Badge variant="secondary">Sem 3</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="flex justify-between">
                    <span>Date of Birth</span>
                    <span className="font-medium">15-08-2003</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between">
                    <span>Email</span>
                    <span className="font-medium">alex.doe@university.edu</span>
                </div>
                 <Separator className="my-3" />
                <div className="flex justify-between">
                    <span>Contact</span>
                    <span className="font-medium">+1 234 567 890</span>
                </div>
                 <Separator className="my-3" />
                <div className="flex justify-between">
                    <span>Parent's Contact</span>
                    <span className="font-medium">+1 098 765 432</span>
                </div>
                <Separator className="my-3" />
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <div>
                        <p className="font-bold">Attendance Warning</p>
                        <p className="text-xs">Overall attendance is at 74%</p>
                    </div>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center justify-between">
                    <label htmlFor="mobile-app" className="font-medium">Mobile App Activation</label>
                    <Switch id="mobile-app" />
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <div className="w-full space-y-2">
                    <p className="text-sm font-medium">Certificate Request</p>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select certificate type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bonafide">Bonafide Certificate</SelectItem>
                            <SelectItem value="transfer">Transfer Certificate</SelectItem>
                            <SelectItem value="character">Character Certificate</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="w-full">
                        <Download className="mr-2 h-4 w-4"/> Request Certificate
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
