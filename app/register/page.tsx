"use client";

import { useState } from "react";
// 1️⃣ Import the router hook
import { useRouter } from "next/navigation";

export default function Register() {
    // 2️⃣ Initialize the router
    const router = useRouter();

    const [passbook, setPassbook] = useState("");
    const [userData, setUserData] = useState<any>(null);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);

    // 🔹 STEP 1: Check Passbook from Backend
    const handleCheckPassbook = async () => {
        if (!/^\d{17}$/.test(passbook)) {
            alert("Passbook must be exactly 17 digits");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/check-passbook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ passbook }),
            });

            if (!res.ok) {
                throw new Error();
            }

            const data = await res.json();
            setUserData(data);
            setStep(2);

        } catch {
            alert("Passbook not found ❌");
        }
    };

    // 🔹 STEP 2: Send OTP via Backend
    const handleSendOtp = async () => {
        const res = await fetch("http://localhost:5000/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone: userData.phone }),
        });

        const data = await res.json();

        alert(`OTP sent (Demo: ${data.otp})`);
        setStep(3);
    };

    // 🔹 STEP 3: Verify OTP via Backend
    const handleVerifyOtp = async () => {
        const res = await fetch("http://localhost:5000/verify-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone: userData.phone,
                otp,
            }),
        });

        const data = await res.json();

        if (data.success) {
            setStep(4);
        } else {
            alert("Invalid OTP ❌");
        }
    };

    // 🔹 STEP 4: Set Password & Register
    const handleRegister = async () => {
        if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password)) {
            alert("Password must contain letters + numbers (min 6 chars)");
            return;
        }

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...userData,
                password,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Registration Successful ✅ Redirecting to login...");

            // 3️⃣ Redirect to the login page
            router.push("/login");
        } else {
            alert(data.message || "Registration failed");
        }

        // Reset
        setStep(1);
        setPassbook("");
        setOtp("");
        setPassword("");
        setUserData(null);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border">

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Register
                </h2>

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter 17-digit Passbook"
                            value={passbook}
                            onChange={(e) => setPassbook(e.target.value)}
                            className="w-full p-3 border rounded mb-4 text-black"
                        />

                        <button
                            onClick={handleCheckPassbook}
                            className="w-full bg-green-500 text-white py-2 rounded-lg"
                        >
                            Verify Passbook
                        </button>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && userData && (
                    <div className="text-black">
                        <p><b>Name:</b> {userData.name}</p>
                        <p><b>Phone:</b> {userData.phone}</p>
                        <p><b>Email:</b> {userData.email}</p>
                        <p className="mb-4"><b>Address:</b> {userData.address}</p>

                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg"
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 border rounded mb-4 text-black"
                        />

                        <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-purple-500 text-white py-2 rounded-lg"
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                    <>
                        <input
                            type="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded mb-4 text-black"
                        />

                        <button
                            onClick={handleRegister}
                            className="w-full bg-black text-white py-2 rounded-lg"
                        >
                            Complete Registration
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}