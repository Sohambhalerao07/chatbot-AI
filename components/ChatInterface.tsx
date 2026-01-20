'use client';

import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

const ChatInterface = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io('http://localhost:4000', {
            transports: ['websocket'],
            reconnectionAttempts: 5,
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            setStatus('connected');
        });

        newSocket.on('disconnect', () => {
            setStatus('disconnected');
        });

        newSocket.on('connect_error', (err) => {
            console.error("Connection error:", err);
            setStatus('disconnected');
        });

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleChunk = (chunk: string) => {
            setIsTyping(false);
            setMessages((prev) => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg && lastMsg.role === 'assistant' && lastMsg.id.startsWith('streaming-')) {
                    return [
                        ...prev.slice(0, -1),
                        { ...lastMsg, content: lastMsg.content + chunk }
                    ];
                } else {
                    return [
                        ...prev,
                        {
                            id: `streaming-${Date.now()}`,
                            role: 'assistant',
                            content: chunk,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                    ];
                }
            });
        };

        const handleComplete = () => {
            setIsTyping(false);
            setMessages((prev) => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg && lastMsg.id.startsWith('streaming-')) {
                    return [
                        ...prev.slice(0, -1),
                        { ...lastMsg, id: `msg-${Date.now()}` }
                    ];
                }
                return prev;
            });
        };

        const handleError = (error: string) => {
            setIsTyping(false);
            setMessages(prev => [
                ...prev,
                {
                    id: `err-${Date.now()}`,
                    role: 'assistant',
                    content: `Error: ${error}`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        };

        socket.off('response-chunk');
        socket.off('response-complete');
        socket.off('error');

        socket.on('response-chunk', handleChunk);
        socket.on('response-complete', handleComplete);
        socket.on('error', handleError);

        return () => {
            socket.off('response-chunk');
            socket.off('response-complete');
            socket.off('error');
            // Remove listeners manually if needed, but off above handles it for re-renders. 
            // Ideally we should just use one set of off/on logic.
            // But this logic is untouched as per requirements.
        }
    }, [socket]);


    const handleSend = (text: string) => {
        if (!socket) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newMessage]);
        setIsTyping(true);

        const apiHistory = messages
            .filter(m => !m.id.startsWith('err-'))
            .map(m => ({ role: m.role, content: m.content }));

        socket.emit('message', { message: text, history: apiHistory });
    };

    return (
        <div className="flex flex-col h-screen w-full mx-auto relative bg-slate-950">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                        <span className="text-white font-bold text-lg">N</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-100 text-lg leading-tight tracking-tight">Nexus AI</h1>
                        <p className="text-xs text-slate-500 font-medium">Real-time Interface</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${status === 'connected'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : status === 'connecting'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                        <span className={`relative flex h-2 w-2`}>
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'connected' ? 'bg-emerald-400' : status === 'connecting' ? 'bg-amber-400' : 'bg-red-400'
                                }`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'connected' ? 'bg-emerald-500' : status === 'connecting' ? 'bg-amber-500' : 'bg-red-500'
                                }`}></span>
                        </span>
                        <span className="text-xs font-medium capitalize">{status}</span>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent w-full">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60 select-none animate-fade-in py-20">
                            <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-xl">
                                <span className="text-4xl">✨</span>
                            </div>
                            <h2 className="text-xl font-semibold text-slate-300 mb-2">Welcome to Nexus AI</h2>
                            <p className="text-sm text-slate-500 max-w-xs text-center">Start a conversation to experience real-time streaming AI responses.</p>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
                    ))}

                    {isTyping && (
                        <div className="flex w-full justify-start animate-fade-in">
                            <div className="flex items-start gap-3 max-w-[85%]">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-md mt-1">
                                    AI
                                </div>
                                <div className="bg-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700/50 flex items-center gap-1.5 h-[46px]">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
                <ChatInput onSend={handleSend} disabled={isTyping || status !== 'connected'} />
                <div className="text-center mt-3">
                    <p className="text-[10px] text-slate-500 font-medium">Powered by Mistral 7B & • AI can make mistakes.</p>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
