"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const feeSummary = [
    { head: "Tuition Fee", toPay: 2500, paid: 2500, inProcess: 0, outstanding: 0, dueDate: "10-07-2024" },
    { head: "Exam Fee", toPay: 500, paid: 0, inProcess: 0, outstanding: 500, dueDate: "25-07-2024" },
    { head: "Library Fee", toPay: 100, paid: 100, inProcess: 0, outstanding: 0, dueDate: "10-07-2024" },
];

const transactionHistory = [
    { date: "08-07-2024", year: "2024-25", sem: 3, mode: "Card", amount: 2600, status: "Success", txnId: "T2024070812345" },
    { date: "15-01-2024", year: "2023-24", sem: 2, mode: "UPI", amount: 2600, status: "Success", txnId: "T2024011509876" },
];

export function FeesModule() {
    const totalOutstanding = feeSummary.reduce((sum, item) => sum + item.outstanding, 0);

    const handlePayNow = () => {
        toast({
            title: "Payment Gateway",
            description: "Redirecting to payment gateway...",
        });
    };

    return (
        <div className="space-y-4">
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 text-red-400">
                <AlertCircle className="h-4 w-4 !text-red-400" />
                <AlertTitle>Important Notes</AlertTitle>
                <AlertDescription>
                    You will be redirected to a secure payment gateway. Do not refresh the page during the transaction.
                </AlertDescription>
            </Alert>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Fee Summary</CardTitle>
                    <CardDescription>Overview of your fee components and their status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fee Head</TableHead>
                                <TableHead>Fee to Pay</TableHead>
                                <TableHead>Paid</TableHead>
                                <TableHead>Outstanding</TableHead>
                                <TableHead>Due Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feeSummary.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.head}</TableCell>
                                    <TableCell>${item.toPay}</TableCell>
                                    <TableCell className="text-green-400">${item.paid}</TableCell>
                                    <TableCell className={item.outstanding > 0 ? "text-red-400" : ""}>${item.outstanding}</TableCell>
                                    <TableCell>{item.dueDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end items-center mt-4 gap-4">
                        <div className="text-right">
                            <p className="text-muted-foreground">Total Outstanding</p>
                            <p className="text-xl font-bold text-red-400">${totalOutstanding.toFixed(2)}</p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                               <Button className="bg-primary/80 hover:bg-primary text-white">
                                    <CreditCard className="mr-2 h-4 w-4"/> Pay Now
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="glass-card">
                                <DialogHeader>
                                    <DialogTitle>Select Payment Method</DialogTitle>
                                    <DialogDescription>
                                        Choose your preferred payment gateway.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                   <Button variant="outline" onClick={handlePayNow}>UPI</Button>
                                   <Button variant="outline" onClick={handlePayNow}>Credit/Debit Card</Button>
                                   <Button variant="outline" onClick={handlePayNow}>Netbanking</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Your past payment records.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Payment Date</TableHead>
                                <TableHead>Academic Year</TableHead>
                                <TableHead>Sem</TableHead>
                                <TableHead>Mode</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Transaction ID</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactionHistory.map((txn, index) => (
                                <TableRow key={index}>
                                    <TableCell>{txn.date}</TableCell>
                                    <TableCell>{txn.year}</TableCell>
                                    <TableCell>{txn.sem}</TableCell>
                                    <TableCell>{txn.mode}</TableCell>
                                    <TableCell>${txn.amount}</TableCell>
                                    <TableCell><Badge className={txn.status === 'Success' ? 'bg-green-500/20 text-green-400 border-green-500/20' : ''} variant="outline">{txn.status}</Badge></TableCell>
                                    <TableCell>{txn.txnId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
