"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function RequestAccessDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Request Sent",
            description: "Your request for access has been sent to the admin for approval.",
        });
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="p-0 h-auto">
                    Don't have access? Request here
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass-card">
                <DialogHeader>
                    <DialogTitle>Request Access</DialogTitle>
                    <DialogDescription>
                        Fill in your details. An admin will review your request and add you to the system.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Full Name</Label>
                            <Input id="name" required className="col-span-3" placeholder="Your full name" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="enrollment" className="text-right">Enrollment No.</Label>
                            <Input id="enrollment" required className="col-span-3" placeholder="Your university ID" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contact" className="text-right">Contact No.</Label>
                            <Input id="contact" type="tel" required className="col-span-3" placeholder="Your phone number" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit Request</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
