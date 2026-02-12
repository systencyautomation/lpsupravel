import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroContent2() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;

        const relativeX = clientX - containerRect.left;
        let percentage = (relativeX / containerRect.width) * 100;

        percentage = Math.max(0, Math.min(100, percentage));
        setSliderPosition(percentage);
    };

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            isDragging.current = false;
        };

        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (isDragging.current) {
                handleMove(e as any);
            }
        }

        const handleGlobalTouchMove = (e: TouchEvent) => {
            if (isDragging.current) {
                handleMove(e as any);
            }
        }

        window.addEventListener('mouseup', handleGlobalMouseUp);
        window.addEventListener('touchend', handleGlobalMouseUp);
        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('touchmove', handleGlobalTouchMove);

        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchend', handleGlobalMouseUp);
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('touchmove', handleGlobalTouchMove);
        };
    }, []);

    return (
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-32 overflow-hidden z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Tecnologia Híbrida vs Lítio
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white"
                    >
                        Empilhadeira Elétrica ou GLP: <br />
                        <span className="text-primary">Comparativo de ROI e Eficiência 2026</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-4 font-light"
                    >
                        Veja a diferença clara entre o passivo trabalhista do GLP e a <strong className="text-white font-medium">Recarga de Oportunidade</strong> do Lítio.
                    </motion.p>

                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10"
                    >
                        Economia real de R$ 270.000,00 em 5 anos
                    </motion.h3>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative max-w-5xl mx-auto group"
                >
                    {/* Dynamic Stats Cards - Visibility controlled by slider position (Hide near edges) */}
                    <div
                        className={`absolute top-4 left-4 z-30 transition-opacity duration-300 ${sliderPosition < 10 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <div className="glass-nav px-4 py-2 rounded-lg border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 bg-black/40 backdrop-blur-md">Padrão Combustão</div>
                        <div className="bg-black/60 backdrop-blur-sm p-3 rounded-xl border border-white/5 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-round text-sm text-yellow-500">local_gas_station</span>
                                <span className="text-xs text-gray-300">R$ 285k Custo (5 anos)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-icons-round text-sm text-gray-500">warning</span>
                                <span className="text-xs text-gray-300">30% Periculosidade</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-icons-round text-sm text-gray-500">co2</span>
                                <span className="text-xs text-gray-300">Emissões de CO2</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`absolute top-4 right-4 z-30 text-right transition-opacity duration-300 ${sliderPosition > 90 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <div className="glass-nav px-4 py-2 rounded-lg border border-primary/30 text-xs font-bold text-primary uppercase tracking-widest mb-4 bg-black/40 backdrop-blur-md">Supravel Tría Lítio</div>
                        <div className="bg-primary/10 backdrop-blur-sm p-3 rounded-xl border border-primary/20 space-y-2">
                            <div className="flex items-center justify-end gap-2">
                                <span className="text-xs text-white font-medium">R$ 15k Custo (5 anos)</span>
                                <span className="material-icons-round text-sm text-primary">savings</span>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <span className="text-xs text-white font-medium">Isento de NR-16</span>
                                <span className="material-icons-round text-sm text-primary">verified</span>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <span className="text-xs text-white font-medium">Recarga Oportunidade</span>
                                <span className="material-icons-round text-sm text-primary">electric_bolt</span>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Slider */}
                    <div
                        ref={containerRef}
                        className="relative rounded-2xl border border-white/10 shadow-2xl bg-[#121212] aspect-[4/3] md:aspect-video overflow-hidden select-none"
                    >
                        {/* Before Image (Left / Base / Combustion) */}
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src="/forklift-combustion.png?v=3"
                                alt="Empilhadeira a Combustão Padrão - Custo R$ 285 mil em 5 anos"
                                className="w-full h-full object-cover object-center pointer-events-none select-none"
                                draggable={false}
                            />
                        </div>

                        {/* After Image (Right / Overlay / Lithium) */}
                        <div
                            className="absolute inset-0 h-full overflow-hidden"
                            style={{
                                clipPath: `inset(0 0 0 ${sliderPosition}%)`
                            }}
                        >
                            <img
                                src="/forklift-lithium.png?v=3"
                                alt="Nova Empilhadeira Elétrica Supravel Tría - Custo R$ 15 mil em 5 anos"
                                className="absolute inset-0 w-full h-full object-cover object-center max-w-none pointer-events-none select-none"
                                draggable={false}
                            />
                        </div>

                        {/* Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-0.5 bg-primary z-30 flex items-center justify-center cursor-ew-resize touch-manipulation"
                            style={{ left: `${sliderPosition}%` }}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleMouseDown}
                        >
                            <div className="w-10 h-10 bg-primary rounded-full border-4 border-[#080808] flex items-center justify-center shadow-[0_0_20px_rgba(234,42,51,0.4)] hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-lg">↔</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500 font-medium tracking-widest uppercase flex items-center justify-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                            Arraste para comparar tecnologia
                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
