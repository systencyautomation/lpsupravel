"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const models = [
    {
        id: 't-series',
        name: 'Série T Compacta',
        type: 'Transpaleteira Elétrica',
        capacity: '1.5t - 2.0t',
        voltage: '24V/48V',
        chargeTime: '2h',
        baseSavings: 1200 // Base savings per unit per year
    },
    {
        id: 'r-series',
        name: 'Série R Retrátil',
        type: 'Empilhadeira Retrátil',
        capacity: '1.6t - 2.5t',
        voltage: '48V/80V',
        chargeTime: '1.5h',
        baseSavings: 1800
    },
    {
        id: 'x-series',
        name: 'Série X Contrapeso',
        type: 'Elétrica Interna/Externa',
        capacity: '3.0t - 5.0t',
        voltage: '80V',
        chargeTime: '1h',
        baseSavings: 2500
    },
    {
        id: 'v-series',
        name: 'Série V VNA',
        type: 'Corredor Estreito (VNA)',
        capacity: '1.0t - 1.5t',
        voltage: '48V/80V',
        chargeTime: '2h',
        baseSavings: 2200
    }
];

export default function ROICalculator() {
    const [fleetSize, setFleetSize] = useState(24);
    const [shiftHours, setShiftHours] = useState(12);
    const [selectedModelId, setSelectedModelId] = useState('t-series');
    const [includeMaintenance, setIncludeMaintenance] = useState(true);
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const graphRef = useRef<SVGSVGElement>(null);

    const [results, setResults] = useState({
        annualSavings: 0,
        roiBreakEven: 0,
        co2Reduction: 0,
        cumulativeData: [] as number[]
    });

    const selectedModel = models.find(m => m.id === selectedModelId) || models[0];

    useEffect(() => {
        // Calculation Logic
        const maintenanceFactor = includeMaintenance ? 1.2 : 1.0;
        const shiftFactor = shiftHours / 8; // Normalized to 8h shift

        // Annual Savings Calculation
        const savings = Math.round(
            fleetSize * selectedModel.baseSavings * shiftFactor * maintenanceFactor
        );

        // ROI Break-even (in months) - simulated logic
        const totalCostDiff = fleetSize * 5000;
        const monthlySavings = savings / 12;
        const roi = monthlySavings > 0 ? (totalCostDiff / monthlySavings).toFixed(1) : "0";

        // CO2 Reduction (tons/year) - simulated
        const co2 = (fleetSize * 0.8 * shiftFactor).toFixed(1);

        // Generate Cumulative Savings Data for Graph (5 Years)
        const cumulative = [];
        let currentTotal = 0;
        for (let i = 0; i <= 5; i++) {
            cumulative.push(currentTotal);
            currentTotal += savings;
        }

        setResults({
            annualSavings: savings,
            roiBreakEven: parseFloat(roi),
            co2Reduction: parseFloat(co2),
            cumulativeData: cumulative
        });

    }, [fleetSize, shiftHours, selectedModelId, includeMaintenance]);

    // Graph helper functions
    const getGraphCoordinates = (index: number, value: number) => {
        const x = (index / 5) * 100;
        const maxY = results.cumulativeData[5] || 1; // Avoid division by zero
        const y = 100 - (value / maxY) * 80; // Keep some padding on top (80% height usage)
        return { x, y };
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (!graphRef.current) return;
        const rect = graphRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const index = Math.round((x / width) * 5); // 5 intervals

        if (index >= 0 && index <= 5) {
            setHoveredPoint(index);
            // Snap cursor visual to the point
            const coords = getGraphCoordinates(index, results.cumulativeData[index]);
            setCursorPosition({ x: coords.x, y: coords.y });
        }
    };

    const handleMouseLeave = () => {
        setHoveredPoint(null);
    };

    return (
        <section className="py-20 bg-background-light dark:bg-background-dark relative overflow-hidden font-display">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0 opacity-40"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#00A499]/5 blur-[100px] rounded-full pointer-events-none z-0 opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
                    >
                        Calcule sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Eficiência</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light"
                    >
                        Visualize o impacto financeiro e ambiental ao mudar sua frota para a tecnologia Tría Lítio.
                    </motion.p>
                </div>

                {/* Model Selection */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Passo 1: Selecione o Modelo</h3>
                        <span className="text-[10px] text-gray-500 font-mono">4 Modelos Disponíveis</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {models.map((model) => (
                            <div
                                key={model.id}
                                onClick={() => setSelectedModelId(model.id)}
                                className={`flex-shrink-0 w-64 glass-panel rounded-xl p-4 border cursor-pointer group transition-all snap-start ${selectedModelId === model.id
                                    ? 'border-primary ring-1 ring-primary/50 bg-white/5'
                                    : 'border-white/10 hover:border-gray-500 bg-black/20'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    {selectedModelId === model.id ? (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-tighter">Selecionado</span>
                                    ) : (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800/50 text-gray-400 font-bold uppercase tracking-tighter">Selecionar</span>
                                    )}
                                    {selectedModelId === model.id && (
                                        <span className="material-icons-round text-primary text-lg">check_circle</span>
                                    )}
                                </div>
                                <h4 className="text-white font-semibold mb-1">{model.name}</h4>
                                <p className="text-xs text-gray-500 mb-4">{model.type} ({model.capacity})</p>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                                    <span className="flex items-center gap-1"><span className="material-icons-round text-[12px]">bolt</span> {model.voltage}</span>
                                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                    <span className="flex items-center gap-1"><span className="material-icons-round text-[12px]">timer</span> {model.chargeTime} Carga</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Configuration Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="glass-nav rounded-xl p-6 md:p-8 shadow-2xl h-full flex flex-col justify-between border border-white/10 bg-[#141518]/70 backdrop-blur-md">
                            <div className="space-y-8">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Passo 2: Configuração</h3>
                                    <button
                                        onClick={() => { setFleetSize(24); setShiftHours(12); setIncludeMaintenance(true); setSelectedModelId('t-series'); }}
                                        className="text-xs text-primary hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                        <span className="material-icons-round text-[16px]">restart_alt</span> Resetar
                                    </button>
                                </div>

                                {/* Fleet Size Slider */}
                                <div className="group">
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Tamanho da Frota</label>
                                        <div className="flex items-center bg-gray-100 dark:bg-black border border-gray-300 dark:border-white/10 rounded px-2 py-1 focus-within:border-primary transition-colors">
                                            <input
                                                className="w-12 bg-transparent text-right text-sm font-mono focus:outline-none dark:text-white"
                                                max="100" min="1" type="number"
                                                value={fleetSize}
                                                onChange={(e) => setFleetSize(Number(e.target.value))}
                                            />
                                            <span className="text-xs text-gray-500 ml-1">unid.</span>
                                        </div>
                                    </div>
                                    <input
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                                        max="100" min="1" type="range"
                                        value={fleetSize}
                                        onChange={(e) => setFleetSize(Number(e.target.value))}
                                    />
                                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                                        <span>1</span>
                                        <span>50</span>
                                        <span>100</span>
                                    </div>
                                </div>

                                {/* Shift Hours Slider */}
                                <div className="group">
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Média Horas/Turno</label>
                                        <div className="flex items-center bg-gray-100 dark:bg-black border border-gray-300 dark:border-white/10 rounded px-2 py-1 focus-within:border-primary transition-colors">
                                            <input
                                                className="w-12 bg-transparent text-right text-sm font-mono focus:outline-none dark:text-white"
                                                max="24" min="4" type="number"
                                                value={shiftHours}
                                                onChange={(e) => setShiftHours(Number(e.target.value))}
                                            />
                                            <span className="text-xs text-gray-500 ml-1">hrs/dia</span>
                                        </div>
                                    </div>
                                    <input
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                                        max="24" min="4" type="range"
                                        value={shiftHours}
                                        onChange={(e) => setShiftHours(Number(e.target.value))}
                                    />
                                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                                        <span>4h</span>
                                        <span>14h</span>
                                        <span>24h</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Incluir Manutenção</span>
                                            <span className="text-xs text-gray-500 mt-1">Considera troca de bateria e água</span>
                                        </div>
                                        <button
                                            role="switch"
                                            aria-checked={includeMaintenance}
                                            onClick={() => setIncludeMaintenance(!includeMaintenance)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark ${includeMaintenance ? 'bg-primary' : 'bg-gray-700'}`}
                                        >
                                            <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${includeMaintenance ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 flex flex-col gap-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="glass-nav p-5 rounded-xl border-l-4 border-l-primary flex flex-col justify-between border-y border-r border-white/5 bg-[#141518]/70 backdrop-blur-md">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Economia Anual Total</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white tracking-tight font-mono">R$ {results.annualSavings.toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="mt-2 flex items-center text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded w-fit">
                                    <span className="material-icons-round text-[14px] mr-1">trending_up</span> +12% vs Chumbo-Ácido
                                </div>
                            </div>
                            <div className="glass-nav p-5 rounded-xl border-l-4 border-l-[#00A499] flex flex-col justify-between border-y border-r border-white/5 bg-[#141518]/70 backdrop-blur-md">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Retorno (ROI)</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white tracking-tight font-mono">{results.roiBreakEven}</span>
                                    <span className="text-sm text-gray-400">meses</span>
                                </div>
                                <div className="mt-2 flex items-center text-xs text-gray-400">
                                    Baseado no uso atual
                                </div>
                            </div>
                            <div className="glass-nav p-5 rounded-xl border-l-4 border-l-gray-600 flex flex-col justify-between border-y border-r border-white/5 bg-[#141518]/70 backdrop-blur-md">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Redução CO2</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white tracking-tight font-mono">{results.co2Reduction}</span>
                                    <span className="text-sm text-gray-400">ton/ano</span>
                                </div>
                                <div className="mt-2 flex items-center text-xs text-gray-400">
                                    Equivalente a {(results.co2Reduction * 50).toFixed(0)} árvores
                                </div>
                            </div>
                        </div>

                        <div className="glass-nav rounded-xl p-6 flex-grow flex flex-col relative min-h-[400px] border border-white/10 bg-[#141518]/70 backdrop-blur-md">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-white">Economia Acumulada do Projeto</h3>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#00A499] shadow-[0_0_10px_rgba(0,164,153,0.5)]"></div>
                                        <span className="text-gray-300">Tría Lítio</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                                        <span className="text-gray-500">Convencional Chumbo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Graph Area */}
                            <div className="relative w-full h-full flex-grow border-l border-b border-white/10">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-full h-px bg-white/5"></div>
                                    ))}
                                </div>
                                <svg
                                    ref={graphRef}
                                    className="absolute inset-0 w-full h-full overflow-visible z-10"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 100 100"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#00A499" stopOpacity="0.3"></stop>
                                            <stop offset="100%" stopColor="#00A499" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>

                                    {/* Baseline (Static Line) */}
                                    <line x1="0" y1="90" x2="100" y2="85" stroke="#4b5563" strokeDasharray="2,2" strokeWidth="0.5" />

                                    {/* Data Line Construction */}
                                    {/* We generate a path based on our 6 data points (Start to Year 5) */}
                                    <path
                                        d={`M ${results.cumulativeData.map((val, i) => {
                                            const coords = getGraphCoordinates(i, val);
                                            return `${coords.x},${coords.y}`;
                                        }).join(' L ')}`}
                                        fill="url(#chartGradient)"
                                        stroke="none"
                                    />
                                    <path
                                        d={`M ${results.cumulativeData.map((val, i) => {
                                            const coords = getGraphCoordinates(i, val);
                                            return `${coords.x},${coords.y}`;
                                        }).join(' L ')}`}
                                        fill="none"
                                        stroke="#00A499"
                                        strokeWidth="1"
                                        filter="drop-shadow(0 0 4px #00A499)"
                                    />

                                    {/* Interactive Cursor & Points */}
                                    {results.cumulativeData.map((val, i) => {
                                        const coords = getGraphCoordinates(i, val);
                                        const isHovered = hoveredPoint === i;
                                        return (
                                            <g key={i}>
                                                <circle
                                                    cx={coords.x}
                                                    cy={coords.y}
                                                    r={isHovered ? 2.5 : 1.5}
                                                    fill="#0B0C0E"
                                                    stroke="#00A499"
                                                    strokeWidth={isHovered ? 1 : 0.5}
                                                    className="transition-all duration-200"
                                                />
                                            </g>
                                        );
                                    })}

                                    {/* Hover Tooltip Overlay (SVG Level) */}
                                    {hoveredPoint !== null && (
                                        <g transform={`translate(${cursorPosition.x}, ${cursorPosition.y - 10})`}>
                                            <rect fill="#141518" stroke="#333" strokeWidth="0.5" width="70" height="24" rx="4" x="-35" y="-24" />
                                            <text fill="#fff" fontSize="6" fontWeight="bold" textAnchor="middle" x="0" y="-14">
                                                R$ {results.cumulativeData[hoveredPoint].toLocaleString('pt-BR', { notation: "compact" })}
                                            </text>
                                            <text fill="#aaa" fontSize="4" textAnchor="middle" x="0" y="-7">
                                                {hoveredPoint === 0 ? 'Início' : `Ano ${hoveredPoint}`}
                                            </text>
                                        </g>
                                    )}
                                </svg>
                            </div>

                            {/* X Axis Labels */}
                            <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono uppercase tracking-wide">
                                <span>Início</span>
                                <span>Ano 1</span>
                                <span>Ano 2</span>
                                <span>Ano 3</span>
                                <span>Ano 4</span>
                                <span>Ano 5</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-icons-round">description</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-white">Relatório Detalhado</h4>
                                    <p className="text-xs text-gray-500">Inclui análise de energia, manutenção e custos de reposição.</p>
                                </div>
                            </div>
                            <a href="https://wa.me/555499164669" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-red-600 text-white font-medium rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                                <span>Solicitar Relatório no WhatsApp</span>
                                <span className="material-icons-round text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
