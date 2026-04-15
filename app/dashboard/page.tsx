"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [showTutorial, setShowTutorial] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(0);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            // router.push("/login"); // Uncomment when login is ready
        } else {
            setUser(JSON.parse(loggedInUser));
        }

        // Check if it's the first time for Tutorial
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
        { title: "Welcome to AngiMitra", desc: "Your community-based emergency LPG network." },
        { title: "Sender Side", desc: "List your surplus cylinder and earn trust scores." },
        { title: "Receiver Side", desc: "Request gas based on urgency and location." },
        { title: "Return Assurance", desc: "Ensure you return cylinders to keep the community running." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* --- ANTI-GRAVITY TUTORIAL MODAL --- */}
            <AnimatePresence>
                {showTutorial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.9 }}
                            animate={{ y: 0, scale: 1 }}
                            className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm text-center border-t-4 border-blue-500"
                        >
                            <h3 className="text-2xl font-bold mb-2">{tutorialContent[tutorialStep].title}</h3>
                            <p className="text-gray-600 mb-6">{tutorialContent[tutorialStep].desc}</p>

                            <div className="flex justify-between">
                                {tutorialStep > 0 && (
                                    <button onClick={() => setTutorialStep(s => s - 1)} className="text-gray-400">Back</button>
                                )}
                                <button
                                    onClick={() => tutorialStep < 3 ? setTutorialStep(s => s + 1) : closeTutorial()}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-full ml-auto"
                                >
                                    {tutorialStep === 3 ? "Get Started" : "Next"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- DASHBOARD CONTENT --- */}
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-extrabold text-slate-800">Dashboard</h1>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border">
                    Trust Score: <span className="text-green-600 font-bold">100</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* SENDER CARD */}
                <motion.div
                    whileHover={{ y: -15, scale: 1.02 }}
                    className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-orange-400 cursor-pointer"
                >
                    <div className="text-4xl mb-4">🔥</div>
                    <h2 className="text-2xl font-bold mb-2 text-black">Sender Hub</h2>
                    <p className="text-gray-500 mb-4 text-black">You have a surplus cylinder? Help a neighbor in need.</p>
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold">List Surplus</button>
                </motion.div>

                {/* RECEIVER CARD */}
                <motion.div
                    whileHover={{ y: -15, scale: 1.02 }}
                    className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-blue-400 cursor-pointer"
                >
                    <div className="text-4xl mb-4">🆘</div>
                    <h2 className="text-2xl font-bold mb-2 text-black">Receiver Hub</h2>
                    <p className="text-gray-500 mb-4 text-black">Running low on gas? Request emergency access here.</p>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-xl font-bold">Request Gas</button>
                </motion.div>
            </div>

            {/* HISTORY SECTION */}
            <section className="mt-12">
                <h3 className="text-xl font-bold mb-4 text-black">Recent Activity</h3>
                <div className="bg-white rounded-2xl p-6 shadow-inner text-center text-gray-400 border border-dashed border-gray-300">
                    No transactions yet. Start by helping someone or requesting help!
                </div>
            </section>
        </div>
    );
}