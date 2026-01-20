import React from 'react';

interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, timestamp }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in group mb-2`}>
            <div className={`flex max-w-[90%] sm:max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold shadow-sm mt-1 border select-none
                    ${isUser ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-500/20'}`}>
                    {isUser ? 'YOU' : 'AI'}
                </div>

                {/* Bubble */}
                <div className={`relative px-5 py-3.5 shadow-sm transition-all duration-200
                    ${isUser
                        ? 'bg-blue-600 text-white rounded-[20px] rounded-tr-sm shadow-blue-900/10'
                        : 'bg-slate-800 text-slate-100 rounded-[20px] rounded-tl-sm border border-slate-700/50 shadow-black/20'
                    }`}>
                    <div className="text-sm sm:text-[15px] whitespace-pre-wrap leading-relaxed tracking-normal font-sans">
                        {content}
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
