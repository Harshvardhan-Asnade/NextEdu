"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Bot, Send, User } from "lucide-react";
import { chat, type ChatInput } from "@/ai/flows/chat-flow";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";

interface Message {
    role: 'user' | 'model';
    content: string;
}

export function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if(isOpen && messages.length === 0){
             const initialMessage: Message = { role: 'model', content: "Hello! How can I help you today with questions about NextEdu University?" };
             setMessages([initialMessage]);
        }
    }, [isOpen, messages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const chatInput: ChatInput = {
                history: messages,
                question: input,
            };
            const result = await chat(chatInput);
            const modelMessage: Message = { role: 'model', content: result.answer };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error calling chat flow:", error);
            const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Bot className="mr-2 h-4 w-4" />
                    AI Chatbot
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] h-[70vh] flex flex-col glass-card p-0">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle>NextEdu Chatbot</DialogTitle>
                    <DialogDescription>
                        Your AI assistant for university-related questions.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1">
                   <div className="p-4 space-y-4" ref={scrollAreaRef}>
                        {messages.map((m, i) => (
                            <div key={i} className={cn("flex items-start gap-3", m.role === 'user' ? 'justify-end' : 'justify-start')}>
                                {m.role === 'model' && (
                                    <Avatar className="h-8 w-8 bg-background">
                                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "p-3 rounded-lg max-w-sm prose prose-sm",
                                    m.role === 'user'
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {m.content}
                                    </ReactMarkdown>
                                </div>
                                {m.role === 'user' && (
                                    <Avatar className="h-8 w-8 bg-background">
                                        <AvatarFallback><User size={20}/></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                               <Avatar className="h-8 w-8 bg-background">
                                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                                </Avatar>
                                <div className="p-3 rounded-lg bg-muted">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="h-2 w-2 bg-foreground rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <form onSubmit={handleSubmit} className="p-4 border-t bg-background/80">
                    <div className="relative">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about admissions, fees, exams..."
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
