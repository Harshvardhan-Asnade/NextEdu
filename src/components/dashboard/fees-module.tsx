"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CreditCard } from "lucide-react";
import type { Student } from "@/context/UserContext";

export function FeesModule({ user }: { user: Student }) {
    const { toast } = useToast();
    const { summary: feeSummary, history: transactionHistory } = user.fees;
    
    const totalOutstanding = feeSummary.reduce((sum, item) => sum + item.outstanding, 0);

    const handlePayNow = (method: string) => {
        toast({
            title: "Payment Gateway",
            description: `Redirecting to ${method} gateway...`,
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <div className="space-y-4">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
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
                                    <TableCell>{formatCurrency(item.toPay)}</TableCell>
                                    <TableCell className="text-success">{formatCurrency(item.paid)}</TableCell>
                                    <TableCell className={item.outstanding > 0 ? "text-destructive" : ""}>{formatCurrency(item.outstanding)}</TableCell>
                                    <TableCell>{item.dueDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end items-center mt-4 gap-4">
                        <div className="text-right">
                            <p className="text-muted-foreground">Total Outstanding</p>
                            <p className="text-xl font-bold text-destructive">{formatCurrency(totalOutstanding)}</p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                               <Button className="bg-primary/80 hover:bg-primary text-white" disabled={totalOutstanding <= 0}>
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
                                   <Button variant="outline" onClick={() => handlePayNow('Paytm')}>Paytm/UPI</Button>
                                   <Button variant="outline" onClick={() => handlePayNow('Card')}>Credit/Debit Card</Button>
                                   <Button variant="outline" onClick={() => handlePayNow('Netbanking')}>Netbanking</Button>
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
                                    <TableCell>{formatCurrency(txn.amount)}</TableCell>
                                    <TableCell><Badge className={txn.status === 'Success' ? 'bg-success/20 text-success border-success/20' : ''} variant="outline">{txn.status}</Badge></TableCell>
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
