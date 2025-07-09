"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User, Loader } from "lucide-react";
import { chat } from '@/ai/flows/chat-flow';
import { useToast } from '@/hooks/use-toast';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ sender: 'bot', text: "Hello! I'm NextEdu Helper. How can I assist you today?" }]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        // Auto-scroll to bottom
        if (scrollAreaRef.current) {
            const scrollableView = scrollAreaRef.current.querySelector('div');
            if (scrollableView) {
                scrollableView.scrollTop = scrollableView.scrollHeight;
            }
        }
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chat({ message: input });
            const botMessage: Message = { sender: 'bot', text: result.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chatbot error:", error);
            toast({
                title: "Error",
                description: "The chatbot is currently unavailable. Please try again later.",
                variant: "destructive"
            });
            const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
                        size="icon"
                        onClick={() => setIsOpen(true)}
                    >
                        <Bot className="h-8 w-8" />
                        <span className="sr-only">Open Chatbot</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] glass-card p-0 flex flex-col h-[70vh]">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle className="flex items-center gap-2"><Bot /> NextEdu Helper</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.sender === 'bot' && <Bot className="w-6 h-6 shrink-0 text-primary" />}
                                    <div
                                        className={`rounded-lg px-3 py-2 max-w-[80%] break-words ${
                                            message.sender === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                    {message.sender === 'user' && <User className="w-6 h-6 shrink-0" />}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-end gap-2 justify-start">
                                    <Bot className="w-6 h-6 shrink-0 text-primary" />
                                    <div className="bg-muted rounded-lg px-3 py-2">
                                        <Loader className="w-5 h-5 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t">
                        <div className="relative">
                            <Input
                                placeholder="Ask a question..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                disabled={isLoading}
                                className="pr-12"
                            />
                            <Button
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                onClick={handleSend}
                                disabled={isLoading}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
