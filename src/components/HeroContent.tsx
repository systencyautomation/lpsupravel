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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-display pt-8 md:pt-12">
            <div className="text-center max-w-4xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
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


