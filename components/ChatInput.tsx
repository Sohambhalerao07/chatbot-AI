import React, { useState, KeyboardEvent, useRef } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    };

    return (
        <div className={`relative w-full bg-slate-800/50 rounded-[26px] border border-slate-700/50 shadow-lg shadow-black/20 transition-all duration-300 ${!disabled && 'focus-within:border-indigo-500/50 focus-within:bg-slate-800 focus-within:ring-1 focus-within:ring-indigo-500/20'}`}>
            <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={disabled ? "Waiting for response..." : "Message Nexus AI..."}
                disabled={disabled}
                rows={1}
                className="w-full bg-transparent text-slate-200 px-5 py-4 pr-14 rounded-[26px] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none max-h-[120px] placeholder:text-slate-500 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 font-sans tracking-wide"
                style={{ minHeight: '56px' }}
            />
            <button
                onClick={handleSend}
                disabled={disabled || !input.trim()}
                className="absolute right-2 bottom-2 h-10 w-10 flex items-center justify-center bg-indigo-600 rounded-full text-white hover:bg-indigo-500 disabled:opacity-0 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
                {disabled ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                )}
            </button>
            {disabled && (
                <div className="absolute right-2 bottom-2 h-10 w-10 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default ChatInput;
