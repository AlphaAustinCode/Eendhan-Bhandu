const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   🔹 Dummy Gas Database
========================= */
const gasDatabase = [
    {
        passbook: "12345678901234567",
        gas_id: "GAS001",
        name: "Rahul Sharma",
        phone: "9876543210",
        email: "rahul@gmail.com",
        address: "Mumbai",
    },
    {
        passbook: "23456789102345678",
        gas_id: "GAS002",
        name: "Raj Kumar",
        phone: "9876543211",
        email: "raj@gmail.com",
        address: "Dadar",
    },
    {
        passbook: "34567890123456789",
        gas_id: "GAS003",
        name: "Amit Patel",
        phone: "9876543212",
        email: "amit@gmail.com",
        address: "Andheri",
    },
    {
        passbook: "45678901234567890",
        gas_id: "GAS004",
        name: "Sneha Kapoor",
        phone: "9876543213",
        email: "sneha@gmail.com",
        address: "Bandra",
    },
    {
        passbook: "56789012345678901",
        gas_id: "GAS005",
        name: "Vikram Singh",
        phone: "9876543214",
        email: "vikram@gmail.com",
        address: "Borivali",
    },
    {
        passbook: "67890123456789012",
        gas_id: "GAS006",
        name: "Priya Iyer",
        phone: "9876543215",
        email: "priya@gmail.com",
        address: "Thane",
    },
    {
        passbook: "78901234567890123",
        gas_id: "GAS007",
        name: "Arjun Mehta",
        phone: "9876543216",
        email: "arjun@gmail.com",
        address: "Colaba",
    }
];

/* =========================
   🔹 Temporary Users Storage
========================= */
let users = [
    {
        phone: "9876543210",
        password: "password123",
        name: "Test User"
    }
];

/* =========================
   🔹 OTP Store
========================= */
let otpStore = {};

/* =========================
   ✅ ROOT ROUTE (Added to prevent 404)
========================= */
app.get("/", (req, res) => {
    res.send("<h1>Eendhan-Bhandu Backend is Running!</h1><p>Visit /users to see data.</p>");
});

/* =========================
   ✅ CHECK PASSBOOK
========================= */
app.post("/check-passbook", (req, res) => {
    const { passbook } = req.body;
    const user = gasDatabase.find((u) => u.passbook === passbook);

    if (!user) {
        return res.status(404).json({ message: "Passbook not found" });
    }
    res.json(user);
});

/* =========================
   ✅ SEND OTP (REGISTER)
========================= */
app.post("/send-otp", (req, res) => {
    const { phone } = req.body;
    const otp = "1234";
    otpStore[phone] = otp;
    res.json({ message: "OTP sent", otp });
});

/* =========================
   ✅ VERIFY OTP
========================= */
app.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;
    if (otpStore[phone] === otp) {
        return res.json({ success: true });
    }
    res.status(400).json({ success: false });
});

/* =========================
   ✅ REGISTER USER
========================= */
app.post("/register", (req, res) => {
    const user = {
        ...req.body,
        phone: req.body.phone?.trim(),
        password: req.body.password?.trim(),
    };

    const exists = users.find((u) => u.phone === user.phone);
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push(user);
    res.json({ message: "Registered successfully" });
});

/* =========================
   ✅ LOGIN USER (Safe Version)
========================= */
app.post("/login", (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ message: "Phone and password are required" });
    }

    const user = users.find((u) => {
        // Safe string conversion to prevent crashes if data is null/undefined
        const storedPhone = String(u.phone || "").trim();
        const storedPass = String(u.password || "").trim();
        const inputPhone = String(phone || "").trim();
        const inputPass = String(password || "").trim();
        return storedPhone === inputPhone && storedPass === inputPass;
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid phone or password" });
    }
    res.json({ message: "Login successful", user });
});

/* =========================
   ✅ FORGOT PASSWORD - SEND OTP
========================= */
app.post("/forgot-password/send-otp", (req, res) => {
    const { phone } = req.body;
    const user = users.find((u) => u.phone === phone);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const otp = "1234";
    otpStore[phone] = otp;
    res.json({ message: "OTP sent", otp });
});

/* =========================
   ✅ RESET PASSWORD
========================= */
app.post("/forgot-password/reset", (req, res) => {
    const { phone, password } = req.body;
    const user = users.find((u) => u.phone === phone);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    user.password = password;
    res.json({ message: "Password updated successfully" });
});

/* =========================
   ✅ DEBUG USERS
========================= */
app.get("/users", (req, res) => {
    res.json(users);
});

/* =========================
   ✅ USER HISTORY
========================= */
app.get("/user-history/:phone", (req, res) => {
    res.json([]);
});

/* =========================
   ✅ LIST SURPLUS
========================= */
app.post("/list-surplus", (req, res) => {
    res.json({
        success: true,
        message: "Cylinder listed successfully!",
    });
});

/* =========================
   SERVER START (Fixed Port)
========================= */
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});