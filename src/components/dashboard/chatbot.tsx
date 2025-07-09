"use client";

import { chatbotStudentQueries } from "@/ai/flows/chatbot-student-queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, Send, User, X } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I am the NextEdu assistant. How can I help you today regarding admissions, exams, or fees?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await chatbotStudentQueries({ query: input });
            const botMessage: Message = { id: Date.now() + 1, text: response.answer, sender: "bot" };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting. Please try again later.", sender: "bot" };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            scrollToBottom();
        }
    };
    
    const scrollToBottom = () => {
        setTimeout(() => {
            const scrollArea = scrollAreaRef.current;
            if (scrollArea) {
              const viewport = scrollArea.querySelector('div');
              if (viewport) {
                viewport.scroll({ top: viewport.scrollHeight, behavior: 'smooth' });
              }
            }
        }, 100);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="rounded-full w-14 h-14 bg-primary/80 hover:bg-primary shadow-lg backdrop-blur-md">
                    {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                </Button>
            </div>
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-40">
                    <Card className="w-[350px] h-[500px] flex flex-col glass-card shadow-2xl">
                        <CardHeader className="flex flex-row items-center p-4">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="https://placehold.co/40x40.png" alt="Bot Avatar" data-ai-hint="robot" />
                                    <AvatarFallback>NA</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">NextEdu Assistant</p>
                                    <p className="text-sm text-muted-foreground">AI Powered</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 flex-grow overflow-hidden">
                            <ScrollArea className="h-full" ref={scrollAreaRef}>
                                <div className="space-y-4 pr-4">
                                    {messages.map((message) => (
                                        <div key={message.id} className={cn("flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm", message.sender === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted")}>
                                            {message.text}
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex items-center space-x-2">
                                            <Avatar className="h-8 w-8">
                                                 <AvatarImage src="https://placehold.co/40x40.png" alt="Bot Avatar" data-ai-hint="robot" />
                                                <AvatarFallback>NA</AvatarFallback>
                                            </Avatar>
                                            <div className="flex items-center gap-1">
                                                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"></span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <CardFooter className="p-4 border-t">
                             <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                                <Input
                                    id="message"
                                    placeholder="Type your message..."
                                    className="flex-1"
                                    autoComplete="off"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}
