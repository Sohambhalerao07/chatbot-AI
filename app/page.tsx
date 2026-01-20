import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-indigo-500/30">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-[#0F172A]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <span className="text-white font-bold text-lg">N</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">Nexus AI</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                        <a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hidden sm:flex text-slate-400 hover:text-white transition-colors">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 012.5-.34c.85.004 1.7.115 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                            </svg>
                        </a>
                        <Link href="/chat" className="bg-white text-[#0F172A] px-5 py-2 rounded-full font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10">
                            Try Live Demo
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0F172A] to-[#0F172A] z-0 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Now Available
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Real-Time AI Chat,<br />Built for Speed
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Experience the next generation of conversational interfaces.
                        Powered by WebSockets and LLM streaming for instant, token-by-token responses.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <Link href="/chat" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 group">
                            Start Chatting
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-slate-200 rounded-full font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center gap-2">
                            View on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 bg-slate-900/50 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Engineered for Performance</h2>
                        <p className="text-slate-400">Built with modern frontend architecture to ensure minimal latency.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-indigo-500/50 transition-colors group">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Real-Time Streaming</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Responses are streamed token-by-token using WebSockets, reducing perceived latency to near zero.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="p-8 rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-blue-500/50 transition-colors group">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">WebSocket Powered</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Bi-directional communication ensures instant message delivery and robust connection handling.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="p-8 rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-emerald-500/50 transition-colors group">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
                            <p className="text-slate-400 leading-relaxed">
                                A mobile-first approach using Tailwind CSS ensuring a seamless experience across all devices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section id="tech-stack" className="py-20 border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold mb-10 text-slate-300">Built with Modern Technologies</h2>
                    <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Next.js */}
                        <div className="group flex flex-col items-center gap-2">
                            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                                <svg viewBox="0 0 180 180" className="w-6 h-6 fill-black" xmlns="http://www.w3.org/2000/svg"><path d="M90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0ZM150.844 133.585L120.763 94.7077V132.89H107.5V47.1098H120.763L150.844 85.9877V133.585ZM69.2372 132.89H55.9744V47.1098H69.2372V132.89Z" /></svg>
                            </div>
                            <span className="text-xs font-semibold text-slate-500 group-hover:text-white transition-colors">Next.js</span>
                        </div>
                        {/* React */}
                        <div className="group flex flex-col items-center gap-2">
                            <div className="h-10 w-10 flex items-center justify-center">
                                <svg viewBox="-10.5 -9.45 21 18.9" className="w-8 h-8 text-[#61DAFB] fill-current" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
                            </div>
                            <span className="text-xs font-semibold text-slate-500 group-hover:text-white transition-colors">React</span>
                        </div>
                        {/* Tailwind */}
                        <div className="group flex flex-col items-center gap-2">
                            <div className="h-10 w-10 flex items-center justify-center">
                                <svg viewBox="0 0 54 33" className="w-8 h-8 text-[#38BDF8] fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"></path></svg>
                            </div>
                            <span className="text-xs font-semibold text-slate-500 group-hover:text-white transition-colors">Tailwind</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-[#0F172A] border-t border-slate-800 text-center text-slate-500 text-sm">
                <p className="mb-2">Designed & Built by [Your Name]</p>
                <p>Frontend Engineering Assignment • 2026</p>
            </footer>
        </div>
    );
}
