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
                    Líder em tecnologia de Lítio no Rio Grande do Sul. Logística inteligência.
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
        </div>
    );
}

