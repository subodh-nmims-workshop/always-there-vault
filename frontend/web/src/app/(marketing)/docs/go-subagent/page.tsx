'use client';

import { motion } from 'framer-motion';
import { Box, Blocks, ActivitySquare, Terminal, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function GoSubagentPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-[#00add8] uppercase tracking-widest bg-[#00add8]/10 border border-[#00add8]/20 px-3 py-1 rounded-full">
                    <Box className="w-4 h-4" /> High Performance
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 flex items-center">
                    Go Subagent
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    For institutions requiring massive concurrent execution tracing and automated shard orchestration, the Go Subagent is a high-performance, statically compiled Go daemon designed to run alongside standard validator setups.
                </p>
            </motion.div>

            <div className="space-y-12">

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group shadow-2xl shadow-black/20"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00add8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center">
                            <ActivitySquare className="w-6 h-6 text-[#00add8] mr-3" /> Go Channel Concurrency
                        </h2>
                        <p className="text-blue-100/70 mb-6 font-medium leading-relaxed">
                            It heavily utilizes Go channels to parse millions of Ethereum/Polygon blocks concurrently, mapping heartbeat `pulse()` calls without consuming massive backend server RAM.
                        </p>

                        <div className="bg-[#050a1a] rounded-xl border border-white/10 p-5 overflow-x-auto relative shadow-inner">
                            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                <span className="text-xs text-slate-500 font-mono font-bold">main.go</span>
                            </div>
                            <pre className="text-xs lg:text-sm font-mono leading-loose text-slate-300">
                                <code className="text-purple-400">package</code> main{'\n\n'}
                                <code className="text-purple-400">import</code> ({'\n'}
                                {'    '}<code className="text-green-300">"context"</code>{'\n'}
                                {'    '}<code className="text-green-300">"log"</code>{'\n'}
                                {'    '}<code className="text-green-300">"github.com/ethereum/go-ethereum/ethclient"</code>{'\n'}
                                {'    '}<code className="text-green-300">"github.com/digitalwill/go-subagent/dwp"</code>{'\n'}
                                ){'\n\n'}
                                <code className="text-purple-400">func</code> <code className="text-blue-300">main</code>() {'{'}{'\n'}
                                {'    '}client, err := ethclient.<code className="text-blue-300">Dial</code>(<code className="text-green-300">"wss://polygon-mainnet.g.alchemy.com/v2/KEY"</code>){'\n'}
                                {'    '}<code className="text-orange-400">if</code> err != nil {'{'} log.<code className="text-blue-300">Fatal</code>(err) {'}'}{'\n\n'}
                                {'    '}<code className="text-slate-500">// Start concurrent decay verification subagent</code>{'\n'}
                                {'    '}monitor := dwp.<code className="text-blue-300">NewDecayMonitor</code>(client){'\n'}
                                {'    '}monitor.<code className="text-blue-300">Start</code>(context.<code className="text-blue-300">Background</code>()){'\n'}
                                {'}'}
                            </pre>
                        </div>
                    </div>
                </motion.section>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors relative"
                    >
                        <Blocks className="w-8 h-8 text-[#00add8] mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Binary Deployment</h3>
                        <p className="text-blue-100/70 leading-relaxed text-sm">
                            Compiled to a static binary (`~12MB`). It can be deployed in lightweight Alpine Docker containers, making it heavily preferred over Node.js for microservice environments handling thousands of vault verifications per minute.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs/react-native" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: React Native
                </Link>
                <Link href="#" className="flex items-center text-slate-600 cursor-not-allowed transition-colors text-sm font-bold">
                    End of Documentation
                </Link>
            </div>
        </>
    );
}
