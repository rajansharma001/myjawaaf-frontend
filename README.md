# 🎓 MyJawaaf – Frontend (Next.js)

**MyJawaaf** is a complete online learning platform that allows users to browse courses, enroll in them, and start learning. It includes a powerful **Admin Panel** for managing categories and courses, along with a **User Dashboard** to handle enrollments and course progress.

This repository contains the frontend, built using **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**, and it communicates with a custom-built backend API.

---

## 🌐 Live Project

🔗 Frontend: [myjawaaf-frontend](https://github.com/rajansharma001/myjawaaf-frontend)  
🔗 Backend: [myjawaaf-backend](https://github.com/rajansharma001/myjawaaf-backend)

---

## 💻 Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Hook Form
- React Icons
- Fetch API
- MongoDB (via backend API)

---

## ✅ Features

### 👨‍🏫 Admin Panel

- Role-based admin access
- Manage Course Categories (Create / Edit / Delete)
- Manage Courses (Create / Edit / Delete)
- Upload thumbnails & add course details
- Add multiple lessons per course

### 👤 User Side

- Dashboard with enrolled courses
- Browse courses with filters and search
- Detailed course page (title, description, level, pricing, preview)
- Enroll in free and paid courses
- Upload receipts for payment
- Multilingual course support via language tags
- Display success/error messages via toast notifications

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/rajansharma001/myjawaaf-frontend.git
cd myjawaaf-frontend

# Install dependencies
npm install
```

### 🔐 Add environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 🚀 Run the development server

```bash
npm run dev
```

---

## 🧠 Backend Overview

This frontend relies on a fully featured backend built using:

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT-based auth (HTTP-only cookie)
- Role-based access control
- File uploads & course enrollment logic

📦 [MyJawaaf Backend Repo](https://github.com/rajansharma001/myjawaaf-backend)

---

## 🙋 Author

**Rajan Sharma**  
🧑‍💻 Full Stack Developer  
📬 email.rajan001@gmail.com  
🔗 [LinkedIn](#)

---

## ⭐ Support

If you found this project helpful:

- ⭐ Star the repo
- 📢 Share it with others
- 🛠 Contribute and improve it!
