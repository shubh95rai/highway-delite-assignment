# 📝 OTP Notes App

A modern, full-stack **Notes Application** built using the **MERN Stack**. It supports **OTP-based authentication**, **JWT authorization**, and **secure note management**. The UI is styled with **Tailwind CSS**, and global state is managed using **Zustand**.

---

## ✨ Features

### 👥 Users
- 🔐 **Sign up / Sign in** with **Email + OTP (One-Time Password)**
- 📧 **OTP Verification** (via Email)
- 🎟️ **JWT Authentication** for secure API access
- 📱 **Fully Responsive UI**

### 📝 Notes
- ➕ **Create Notes**
- ❌ **Delete Notes**
- 👤 **User-specific Notes**
- ⚡ **Real-time UI updates** using Zustand

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Zustand (State Management)
- React Router DOM
- Axios

### Backend
- Node.js + Express.js 
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Nodemailer (for OTP emails)

---

## 📦 Features in Detail
- **OTP Authentication**: Secure email-based login without passwords  
- **JWT Authorization**: Protects create/delete note routes  
- **Responsive Design**: Works across mobile, tablet, and desktop  
- **Zustand Store**: Lightweight state management for user and notes  
- **Error Handling**: Inline + toast error messages for OTP mismatch, invalid inputs, or API errors  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/shubh95rai/highway-delite-assignment.git
cd highway-delite-assignment
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### `backend/.env`
```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## ▶️ Usage
1. Go to **Sign Up** page and register with your email  
2. Enter OTP received in your email inbox  
3. Get redirected to the **Welcome page**  
4. Create and delete your notes 🚀  

---

## 🌐 Live Demo

🔗 **[OTP Notes App](https://highway-delite-assignment-r21h.vercel.app/)**