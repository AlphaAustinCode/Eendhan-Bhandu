const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Dummy Gas Database
// 🔹 Dummy Gas Database (Now with 7 Total Users)
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
// 🔹 Temporary Users Storage
let users = [

];

// 🔹 OTP Store
let otpStore = {};

// ===============================
// ✅ CHECK PASSBOOK
// ===============================
app.post("/check-passbook", (req, res) => {
    const { passbook } = req.body;

    const user = gasDatabase.find((u) => u.passbook === passbook);

    if (!user) {
        return res.status(404).json({ message: "Passbook not found" });
    }

    res.json(user);
});

// ===============================
// ✅ SEND OTP
// ===============================
app.post("/send-otp", (req, res) => {
    const { phone } = req.body;

    const otp = "1234"; // demo
    otpStore[phone] = otp;

    res.json({ message: "OTP sent", otp });
});

// ===============================
// ✅ VERIFY OTP
// ===============================
app.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;

    if (otpStore[phone] === otp) {
        return res.json({ success: true });
    }

    res.status(400).json({ success: false });
});

// ===============================
// ✅ REGISTER USER
// ===============================
app.post("/register", (req, res) => {
    const user = req.body;

    const exists = users.find((u) => u.phone === user.phone);

    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push(user);

    console.log("📦 Users:", users);

    res.json({ message: "Registered successfully" });
});

// ===============================
// ✅ LOGIN USER
// ===============================
app.post("/login", (req, res) => {
    const { phone, password } = req.body;

    console.log("LOGIN USERS:", users);

    const user = users.find(
        (u) => u.phone === phone && u.password === password
    );

    if (!user) {
        return res.status(400).json({
            message: "Invalid phone or password",
        });
    }

    res.json({
        message: "Login successful",
        user,
    });
});

// ===============================
// ✅ FORGOT PASSWORD - SEND OTP
// ===============================
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

// ===============================
// ✅ RESET PASSWORD
// ===============================
app.post("/forgot-password/reset", (req, res) => {
    const { phone, password } = req.body;

    const user = users.find((u) => u.phone === phone);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    user.password = password;

    res.json({ message: "Password updated successfully" });
});

// ===============================
// ✅ DEBUG USERS
// ===============================
app.get("/users", (req, res) => {
    res.json(users);
});

// ===============================
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// ===============================
// ✅ GET USER HISTORY
// ===============================
app.get("/user-history/:phone", (req, res) => {
    const { phone } = req.params;

    // In a real app, you'd fetch this from a 'transactions' table
    // For now, returning an empty list
    const history = [];

    res.json(history);
});

// ===============================
// ✅ LIST SURPLUS (Sender)
// ===============================
app.post("/list-surplus", (req, res) => {
    const { phone, location, urgency } = req.body;
    console.log(`New surplus listed by ${phone} at ${location}`);
    res.json({ success: true, message: "Cylinder listed successfully!" });
});