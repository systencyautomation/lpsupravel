import { motion } from 'framer-motion';

export default function HeroContent() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-display pt-32 md:pt-40">
            <div className="text-center max-w-4xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-8"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Nova Série Lítio 2026
                </motion.div>

                <motion.h1
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]"
                >
                    <motion.span variants={fadeInUp} className="text-gradient block">Empilhadeiras Elétricas a Lítio</motion.span>
                    <motion.span variants={fadeInUp} className="text-white relative inline-block text-3xl md:text-5xl mt-2">
                        Reduza Custos Operacionais em até 84%
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-80" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.00025 6.99997C25.7265 0.386001 81.6543 -2.25997 127.323 2.08331C152.091 4.43936 177.306 6.58667 197.989 6.99998" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                        </svg>
                    </motion.span>
                </motion.h1>

                <motion.p
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
                >
                    Líder em tecnologia de Lítio no Rio Grande do Sul. Logística inteligência para Caxias do Sul e Porto Alegre.
                </motion.p>

                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button className="group relative px-8 py-4 bg-primary hover:bg-red-600 text-white text-base font-semibold rounded-lg shadow-lg shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative flex items-center gap-2">
                            Solicitar Orçamento
                            <span className="material-icons-round text-sm">arrow_forward</span>
                        </span>
                    </button>
                    <button className="px-8 py-4 bg-transparent text-gray-300 hover:text-white text-base font-medium rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                        <span className="material-icons-round text-lg text-primary">whatsapp</span>
                        Falar com Especialista
                    </button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative mt-8 group"
            >
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] aspect-[21/9] md:aspect-auto">
                    <img
                        alt="Manutenção de empilhadeiras Still e Toyota em Caxias do Sul - Supravel"
                        className="w-full h-auto object-cover max-h-[700px] opacity-80"
                        src="/hero-forklift.png"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60"></div>

                    {/* Hotspots Container - Keeping static for now, can be animated later if needed */}
                    <div className="absolute inset-0 z-20">
                        {/* Hotspot 1 */}
                        <div className="absolute top-[45%] left-[22%] hotspot-group group/h1">
                            <div className="relative w-8 h-8 cursor-pointer">
                                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></div>
                                <div className="relative w-full h-full bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                                    <span className="material-icons-round text-white text-lg">bolt</span>
                                </div>
                            </div>
                            <div className="hotspot-card absolute bottom-12 left-1/2 -translate-x-1/2 w-64 p-4 glass-nav rounded-2xl border border-white/10 opacity-0 -translate-y-4 scale-95 transition-all duration-300 pointer-events-none z-30 shadow-2xl group-hover/h1:opacity-100 group-hover/h1:translate-y-0 group-hover/h1:scale-100 group-hover/h1:pointer-events-auto">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                        <span className="material-icons-round text-xl">battery_charging_full</span>
                                    </div>
                                    <span className="text-sm font-bold text-white">Carregamento Rápido</span>
                                </div>
                                <p className="text-xs text-gray-400 mb-3 leading-relaxed">Carregamento total em apenas 2 horas com tecnologia Lítio de última geração.</p>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[90%]"></div>
                                </div>
                                <div className="mt-2 text-[10px] text-gray-500 font-medium uppercase tracking-wider">Eficiência Energética 95%</div>
                            </div>
                        </div>

                        {/* Hotspot 2 */}
                        <div className="absolute top-[35%] left-[45%] hotspot-group group/h2">
                            <div className="relative w-8 h-8 cursor-pointer">
                                <div className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping"></div>
                                <div className="relative w-full h-full bg-cyan-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                                    <span className="material-icons-round text-white text-lg">settings_remote</span>
                                </div>
                            </div>
                            <div className="hotspot-card absolute bottom-12 left-1/2 -translate-x-1/2 w-64 p-4 glass-nav rounded-2xl border border-white/10 opacity-0 -translate-y-4 scale-95 transition-all duration-300 pointer-events-none z-30 shadow-2xl group-hover/h2:opacity-100 group-hover/h2:translate-y-0 group-hover/h2:scale-100 group-hover/h2:pointer-events-auto">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                                        <span className="material-icons-round text-xl">precision_manufacturing</span>
                                    </div>
                                    <span className="text-sm font-bold text-white">Telemetria Integrada</span>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">Gestão de frota em tempo real com GPS e monitoramento de saúde do motor via IoT.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-500"
            >
                <div className="flex flex-col items-center gap-2 group cursor-default">
                    <span className="material-icons-round text-3xl text-gray-500 group-hover:text-primary transition-colors">battery_charging_full</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Tecnologia Lítio Ion</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-default">
                    <span className="material-icons-round text-3xl text-gray-500 group-hover:text-cyan-400 transition-colors">settings_remote</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Telemetria IoT</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-default">
                    <span className="material-icons-round text-3xl text-gray-500 group-hover:text-primary transition-colors">verified_user</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">5 Anos Garantia</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-default">
                    <span className="material-icons-round text-3xl text-gray-500 group-hover:text-teal-400 transition-colors">eco</span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Zero Emissão</span>
                </div>
            </motion.div>
        </div>
    );
}
