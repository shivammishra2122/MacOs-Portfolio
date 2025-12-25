import React, { useState, useRef, useEffect } from 'react';

const COMMANDS = {
    help: 'Available commands: about, skills, experience, projects, clear',
    about: 'I am a passionate developer...',
    skills: 'React, TypeScript, Node.js, Go, Python, Docker...',
    experience: 'Senior Softare Engineer at Google...',
    projects: 'Check out the Safari app to see my projects!',
    clear: 'CLEAR',
};

export const Terminal = () => {
    const [history, setHistory] = useState<string[]>([
        'Last login: ' + new Date().toDateString(),
        'Welcome to MyResume OS v1.0.0',
        'Type "help" to see available commands.',
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const output = COMMANDS[cmd as keyof typeof COMMANDS];

            if (cmd === 'clear') {
                setHistory([]);
            } else if (output) {
                setHistory(prev => [...prev, `$ ${input}`, output]);
            } else if (cmd) {
                setHistory(prev => [...prev, `$ ${input}`, `Command not found: ${cmd}`]);
            } else {
                setHistory(prev => [...prev, '$ ']);
            }

            setInput('');
        }
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] text-green-400 font-mono text-sm p-4 overflow-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
            {history.map((line, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
            ))}
            <div className="flex">
                <span className="mr-2 text-green-500">$</span>
                <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none border-none text-green-400"
                    autoFocus
                    autoComplete="off"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};
