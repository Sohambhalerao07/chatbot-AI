import React from 'react';

interface ConnectionStatusProps {
    status: 'connected' | 'disconnected' | 'connecting';
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'connected': return 'bg-emerald-500 shadow-emerald-500/50';
            case 'disconnected': return 'bg-rose-500 shadow-rose-500/50';
            case 'connecting': return 'bg-amber-500 shadow-amber-500/50';
            default: return 'bg-slate-500';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'connected': return 'System Online';
            case 'disconnected': return 'System Offline';
            case 'connecting': return 'Reconnecting...';
            default: return 'Unknown';
        }
    };

    return (
        <div className="flex items-center gap-2.5 px-4 py-1.5 bg-[#1E293B]/80 rounded-full border border-slate-700/50 backdrop-blur-md shadow-lg">
            <div className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'connected' ? 'bg-emerald-400' : status === 'connecting' ? 'bg-amber-400' : 'bg-rose-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${getStatusColor()}`}></span>
            </div>
            <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">{getStatusText()}</span>
        </div>
    );
};

export default ConnectionStatus;
