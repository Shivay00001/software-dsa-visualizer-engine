import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    RotateCcw,
    Plus,
    Minus,
    BarChart2,
    Settings,
    Info,
    ChevronRight,
    Code2
} from 'lucide-react';

// --- Types ---
type Algorithm = 'bubble' | 'selection' | 'insertion' | 'quick';
type Step = {
    array: number[];
    comparing: number[];
    swapping: number[];
    sorted: number[];
};

// --- Utils ---
const generateRandomArray = (size: number) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
};

// --- Algorithms ---
const bubbleSortSteps = (arr: number[]): Step[] => {
    const steps: Step[] = [{ array: [...arr], comparing: [], swapping: [], sorted: [] }];
    const array = [...arr];
    const n = array.length;
    const sortedIndices: number[] = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({ array: [...array], comparing: [j, j + 1], swapping: [], sorted: [...sortedIndices] });
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                steps.push({ array: [...array], comparing: [], swapping: [j, j + 1], sorted: [...sortedIndices] });
            }
        }
        sortedIndices.unshift(n - i - 1);
        steps.push({ array: [...array], comparing: [], swapping: [], sorted: [...sortedIndices] });
    }
    return steps;
};

const App: React.FC = () => {
    const [array, setArray] = useState<number[]>(generateRandomArray(20));
    const [size, setSize] = useState(20);
    const [algorithm, setAlgorithm] = useState<Algorithm>('bubble');
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<Step[]>([]);
    const [speed, setSpeed] = useState(50);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const reset = () => {
        stop();
        const newArray = generateRandomArray(size);
        setArray(newArray);
        setCurrentStep(0);
        setSteps([]);
    };

    const stop = () => {
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const start = () => {
        if (isRunning) {
            stop();
            return;
        }

        let sortSteps: Step[] = [];
        if (algorithm === 'bubble') sortSteps = bubbleSortSteps(array);
        setSteps(sortSteps);
        setIsRunning(true);

        let stepIdx = currentStep;
        timerRef.current = setInterval(() => {
            if (stepIdx < sortSteps.length - 1) {
                stepIdx++;
                setCurrentStep(stepIdx);
            } else {
                stop();
            }
        }, 200 - speed * 1.8);
    };

    const currentDisplay = steps.length > 0 ? steps[currentStep] : {
        array, comparing: [], swapping: [], sorted: []
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            {/* Sidebar Nav */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900/50 border-r border-slate-800 p-6 hidden lg:flex flex-col gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/40">
                        <BarChart2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">DSA.OS</h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Visualizer Core</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Sorting Algorithms</p>
                    {(['bubble', 'selection', 'insertion', 'quick'] as Algorithm[]).map((algo) => (
                        <button
                            key={algo}
                            onClick={() => { setAlgorithm(algo); reset(); }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${algorithm === algo
                                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                                }`}
                        >
                            <span className="capitalize">{algo} Sort</span>
                            {algorithm === algo && <ChevronRight className="w-4 h-4" />}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto bg-slate-800/20 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                        <Info className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Stats</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Complexity</span>
                            <span className="text-indigo-400 font-mono">O(n²)</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Space</span>
                            <span className="text-indigo-400 font-mono">O(1)</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-8 min-h-screen flex flex-col">
                {/* Top Controls */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-wrap items-center gap-8 shadow-xl">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={start}
                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isRunning
                                    ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'
                                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500'
                                }`}
                        >
                            {isRunning ? <div className="w-4 h-4 bg-current rounded-sm" /> : <Play className="w-6 h-6 fill-current" />}
                        </button>
                        <button
                            onClick={reset}
                            className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-800 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-all"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="h-10 w-px bg-slate-800 hidden md:block" />

                    <div className="flex-grow max-w-xs space-y-2">
                        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            <span>Speed</span>
                            <span>{speed}%</span>
                        </div>
                        <input
                            type="range"
                            min="1" max="100"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-slate-800 flex items-center rounded-lg p-1 border border-slate-700">
                            <button onClick={() => { setSize(s => Math.max(10, s - 5)); reset(); }} className="p-2 hover:bg-slate-700 rounded text-slate-400"><Minus className="w-4 h-4" /></button>
                            <span className="px-4 text-xs font-mono w-12 text-center">{size}</span>
                            <button onClick={() => { setSize(s => Math.min(50, s + 5)); reset(); }} className="p-2 hover:bg-slate-700 rounded text-slate-400"><Plus className="w-4 h-4" /></button>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Array Size</span>
                    </div>
                </div>

                {/* Visualizer Area */}
                <div className="flex-grow bg-slate-900/20 border border-slate-800/50 rounded-3xl p-12 flex items-end justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />

                    <div className="flex items-end gap-1.5 w-full max-w-4xl h-full mt-10">
                        {currentDisplay.array.map((val, idx) => {
                            const isComparing = currentDisplay.comparing.includes(idx);
                            const isSwapping = currentDisplay.swapping.includes(idx);
                            const isSorted = currentDisplay.sorted.includes(idx);

                            return (
                                <motion.div
                                    key={`${idx}-${val}`}
                                    layout
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scaleY: 1,
                                        backgroundColor: isSwapping
                                            ? '#ef4444'
                                            : isComparing
                                                ? '#fbbf24'
                                                : isSorted
                                                    ? '#10b981'
                                                    : '#4f46e5'
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    style={{ height: `${val}%` }}
                                    className="flex-grow rounded-t-lg relative group"
                                >
                                    <div className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono transition-opacity ${isRunning ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                                        {val}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Console / Info */}
                <footer className="mt-8 flex justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-600" />
                            <span>Default</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <span>Comparing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span>Swapping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Sorted</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Code2 className="w-4 h-4" />
                        <span>React 18 + Framer Motion 10</span>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default App;
