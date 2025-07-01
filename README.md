# 🎓 MyJawaaf – Frontend (Next.js)

**MyJawaaf** is an **online e-learning platform** currently under active development. It allows admins to manage courses and categories, while users will soon be able to browse and enroll in courses. This repository is the **frontend** built using **Next.js 14**, **TypeScript**, and **Tailwind CSS**, fully connected to a custom-built backend API.

> 🚧 **Status:** Early-stage development – Authentication and Admin Dashboard are completed. Course browsing, enrollment, and user features are under development.

---

## 🔗 Live Project

🔗 [Backend Repo (GitHub)](https://github.com/rajansharma001/myjawaaf) — Built with Node.js, Express, TypeScript & MongoDB

---

## 🔧 Tech Stack

### Frontend

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **ShadCN**
- **Lucide-react Icons**
- **React Hook Form**
- **Fetch API** for backend communication

### Backend (MyJawaaf API)

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Auth (HTTP-only cookies)
- Admin/User role-based middleware
- Course/category endpoints

---

## ✅ Finished Features

### 🔐 Authentication

- Register & Login with validation
- Secure JWT auth (HTTP-only cookie)
- Protected routes using `getCurrentUser()`

### 🛠️ Admin Dashboard

- **Course Categories**
  - Create / Update / Delete
- **Courses**
  - Create / Update / Delete
- Role-based access via server middleware

---

## 🧩 Upcoming Features

- ✅ User dashboard
- ✅ Course browsing & filtering
- ✅ Course enrollment system
- ✅ Course details with levels, pricing
- ✅ Language support
- ✅ Search, pagination
- ✅ Toast notifications

---

## 📂 Project Structure (Frontend)

```
/app
  ├─ (auth)         → Login/Register pages
  ├─ /dashboard     → Admin dashboard for course/category management
  ├─ /course        → Add/Edit course routes
  ├─ layout.tsx     → Shared layout

/components         → UI components (inputs, forms, cards)
/constants          → Static configs (levels, languages)
/actions            → Server actions (e.g., courseCreate)
/lib                → Helpers (e.g., getCurrentUser)
/hooks              → Custom React hooks
/public             → Assets (logos, icons)
```

---

## ⚙️ Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/rajansharma001/myjawaaf-frontend.git
   cd myjawaaf-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env.local`**

   ```env
   NEXT_PUBLIC_API_URL=https://api.myjawaaf.com  # Your backend base URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

---

## 🔗 Backend Repository

👉 **Backend Code:**  
[github.com/rajansharma001/myjawaaf](https://github.com/rajansharma001/myjawaaf)

> API built using **Node.js, Express, TypeScript, MongoDB**  
> Handles user auth, course/category CRUD, role management, etc.

---

## 👨‍💻 Author

**Rajan Sharma**  
Full Stack Developer  
🔗 [LinkedIn](https://www.linkedin.com/in/rajan-sharma-280764337/)

---

## ⭐️ Show Your Support

If you like this project:

- ⭐ Star the repo
- 🔁 Share it with developers
- 💬 Feedback is welcome!
