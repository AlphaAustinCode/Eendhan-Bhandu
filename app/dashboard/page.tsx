"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    FiHome, FiSend, FiDownload, FiClock, FiSettings,
    FiLogOut, FiShield, FiMapPin
} from "react-icons/fi"; // Install react-icons

export default function Dashboard() {
    const router = useRouter();
    const [showTutorial, setShowTutorial] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [activeExchange, setActiveExchange] = useState<boolean>(false); // Phase 5 Tracking

    useEffect(() => {
        const loggedInUser = localStorage.getItem("currentUser");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }

        const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
        if (!hasSeenTutorial) {
            setShowTutorial(true);
        }
    }, []);

    const closeTutorial = () => {
        localStorage.setItem("hasSeenTutorial", "true");
        setShowTutorial(false);
    };

    const tutorialContent = [
        { title: "Welcome to AgniMitra", desc: "Your community-based emergency LPG network." },
        { title: "Sender Side", desc: "List your surplus cylinder and help your community." },
        { title: "Receiver Side", desc: "Request gas based on urgency and location." },
        { title: "Return Assurance", desc: "Return cylinders on time to maintain your Trust Score." }
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* 1. SIDEBAR NAVIGATION */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col p-6">
                <div className="text-2xl font-black text-blue-600 mb-10 italic">AgniMitra</div>
                <nav className="space-y-4 flex-1">
                    <button className="flex items-center space-x-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold">
                        <FiHome /> <span>Overview</span>
                    </button>
                    <button onClick={() => router.push('/sender')} className="flex items-center space-x-3 w-full p-3 text-gray-500 hover:bg-gray-50 rounded-xl transition">
                        <FiSend /> <span>Sender Hub</span>
                    </button>
                    <button onClick={() => router.push('/receiver')} className="flex items-center space-x-3 w-full p-3 text-gray-500 hover:bg-gray-50 rounded-xl transition">
                        <FiDownload /> <span>Receiver Hub</span>
                    </button>
                    <button onClick={() => router.push('/history')} className="flex items-center space-x-3 w-full p-3 text-gray-500 hover:bg-gray-50 rounded-xl transition">
                        <FiClock /> <span>History</span>
                    </button>
                </nav>
                <button className="flex items-center space-x-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition mt-auto">
                    <FiLogOut /> <span>Logout</span>
                </button>
            </aside>

            <main className="flex-1 p-6 md:p-10">
                {/* --- TUTORIAL MODAL (Same as your code but higher Z-Index) --- */}
                <AnimatePresence>
                    {showTutorial && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                            <motion.div initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm text-center border-t-4 border-blue-500">
                                <h3 className="text-2xl font-bold mb-2 text-black">{tutorialContent[tutorialStep].title}</h3>
                                <p className="text-gray-600 mb-6">{tutorialContent[tutorialStep].desc}</p>
                                <div className="flex justify-between">
                                    {tutorialStep > 0 && (
                                        <button onClick={() => setTutorialStep(s => s - 1)} className="text-gray-400">Back</button>
                                    )}
                                    <button onClick={() => tutorialStep < 3 ? setTutorialStep(s => s + 1) : closeTutorial()} className="bg-blue-600 text-white px-6 py-2 rounded-full ml-auto">
                                        {tutorialStep === 3 ? "Get Started" : "Next"}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800">Welcome, {user?.name || "User"}!</h1>
                        <p className="text-gray-500">Gas ID: {user?.gas_id || "Verified"}</p>
                    </div>
                    <div className="flex space-x-4">
                        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border flex items-center space-x-2">
                            <FiShield className="text-green-500" />
                            <span className="text-slate-600 font-medium">Trust Score:</span>
                            <span className="text-green-600 font-bold text-lg">100</span>
                        </div>
                    </div>
                </header>

                {/* --- PHASE 5: LIVE TRACKING SECTION --- */}
                {activeExchange && (
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 bg-blue-600 p-6 rounded-3xl text-white shadow-xl">
                        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                            <FiClock className="animate-pulse" /> <span>Active Exchange in Progress</span>
                        </h3>
                        <div className="flex justify-between text-sm mb-2 px-2">
                            <span>Handover</span>
                            <span>In Use</span>
                            <span>Return Deadline</span>
                        </div>
                        <div className="w-full bg-blue-400 rounded-full h-3 mb-2">
                            <div className="bg-white h-3 rounded-full w-1/2"></div>
                        </div>
                        <p className="text-xs text-blue-100">Please return the cylinder within 48 hours to avoid penalties.</p>
                    </motion.section>
                )}

                {/* --- CORE ACTION CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* SENDER CARD */}
                    <motion.div
                        whileHover={{ y: -15, scale: 1.02 }}
                        onClick={() => router.push('/sender')}
                        className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-orange-400 cursor-pointer group"
                    >
                        <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition">🔥</div>
                        <h2 className="text-2xl font-bold mb-2 text-slate-800">Sender Hub</h2>
                        <p className="text-slate-500 mb-6">List your spare cylinder. Help neighbors and boost your trust score.</p>
                        <div className="flex items-center text-orange-600 font-bold space-x-2">
                            <span>Get Started</span> <FiSend />
                        </div>
                    </motion.div>

                    {/* RECEIVER CARD */}
                    <motion.div
                        whileHover={{ y: -15, scale: 1.02 }}
                        onClick={() => router.push('/receiver')}
                        className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-blue-400 cursor-pointer group"
                    >
                        <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition">🆘</div>
                        <h2 className="text-2xl font-bold mb-2 text-slate-800">Receiver Hub</h2>
                        <p className="text-slate-500 mb-6">Request emergency gas access. Verified community support nearby.</p>
                        <div className="flex items-center text-blue-600 font-bold space-x-2">
                            <span>Request Now</span> <FiMapPin />
                        </div>
                    </motion.div>
                </div>

                {/* --- HISTORY SECTION --- */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
                        <button onClick={() => router.push('/history')} className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="bg-white rounded-3xl p-10 shadow-sm border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                        <FiClock size={40} className="mb-4 opacity-20" />
                        <p className="font-medium text-black">Your emergency grid is quiet.</p>
                        <p className="text-sm">Start an exchange to see history here.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}