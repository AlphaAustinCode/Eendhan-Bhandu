"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        console.log(" FRONTEND LOGIN ATTEMPT:", { phone, password });
        
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone, password }),
        });

        const data = await res.json();
        console.log(" FRONTEND LOGIN RESPONSE:", { status: res.status, data });

        if (!res.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(data.user));
        console.log(" FRONTEND LOGIN SUCCESS - User stored in localStorage");

        alert("Login Success ");
        router.push("/dashboard");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl w-80">

                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border mb-4"
                />

                <button onClick={handleLogin} className="bg-blue-500 w-full p-2 text-white">
                    Login
                </button>

            </div>
        </div>
    );
}