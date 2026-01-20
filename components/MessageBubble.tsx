import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, timestamp }) => {
    const isUser = role === 'user';
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in group mb-2`}>
            <div className={`flex max-w-[90%] sm:max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold shadow-sm mt-1 border select-none
                    ${isUser ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-500/20'}`}>
                    {isUser ? 'YOU' : 'AI'}
                </div>

                {/* Bubble */}
                <div className={`relative px-5 py-3.5 shadow-sm transition-all duration-200 group/bubble
                    ${isUser
                        ? 'bg-blue-600 text-white rounded-[20px] rounded-tr-sm shadow-blue-900/10'
                        : 'bg-slate-800 text-slate-100 rounded-[20px] rounded-tl-sm border border-slate-700/50 shadow-black/20'
                    }`}>

                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className={`absolute -top-3 ${isUser ? '-left-3' : '-right-3'} p-1.5 rounded-full bg-slate-700/80 text-slate-300 opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 hover:bg-slate-600 border border-slate-600 shadow-sm z-10`}
                        title="Copy message"
                    >
                        {copied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-green-400">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117.622 6.622V15.75a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5V3.5z" />
                                <path d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2h-2v2H4V7h2V5H4z" />
                            </svg>
                        )}
                    </button>

                    <div className={`text-sm sm:text-[15px] leading-relaxed tracking-normal font-sans ${!isUser && 'markdown-content'}`}>
                        {isUser ? (
                            <span className="whitespace-pre-wrap">{content}</span>
                        ) : (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                        )}
                    </div>
                    <div className={`text-[10px] font-medium tracking-wide mt-2 select-none ${isUser ? 'text-blue-200/70 text-right' : 'text-slate-500 text-left'}`}>
                        {timestamp}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
