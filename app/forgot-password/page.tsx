"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);

    const router = useRouter();

    const sendOtp = async () => {
        const res = await fetch("http://localhost:5000/forgot-password/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert(`OTP: ${data.otp}`);
        setStep(2);
    };

    const verifyOtp = () => {
        if (otp === "1234") {
            setStep(3);
        } else {
            alert("Invalid OTP ❌");
        }
    };

    const resetPassword = async () => {
        const res = await fetch("http://localhost:5000/forgot-password/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone,
                password: newPassword,
            }),
        });

        const data = await res.json();

        alert(data.message);
        router.push("/login");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl w-80">

                <h2 className="text-xl mb-4 text-center font-bold">
                    Forgot Password
                </h2>

                {step === 1 && (
                    <>
                        <input
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 border mb-4"
                        />
                        <button onClick={sendOtp} className="bg-blue-500 w-full p-2 text-white">
                            Send OTP
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 border mb-4"
                        />
                        <button onClick={verifyOtp} className="bg-green-500 w-full p-2 text-white">
                            Verify OTP
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border mb-4"
                        />
                        <button onClick={resetPassword} className="bg-black w-full p-2 text-white">
                            Reset Password
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}