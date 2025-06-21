# 🧥 GearUp – Product Showcase Platform

GearUp is a modern web application built with the MERN stack that allows users to browse, add products, and enquire about them. It includes authentication, image uploads with Cloudinary, and email enquiry functionality with Nodemailer.

---

## 🚀 Features

- 👤 User authentication (signup/login/logout)  
- 🛍️ Add, view, and filter products by category  
- 📸 Upload product images (cover + additional up to 4)  
- 📧 Enquire about products via email (Nodemailer)  
- 🌫️ Beautiful UI with modals, transitions, and responsive design  
- ☁️ Cloudinary integration for image uploads  

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Zustand  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Other Tools:** Cloudinary, Nodemailer, JWT, Cookies  

---

## 📂 Folder Structure

- project-root/
- ├── backend/ # Express API with routes, models, and controllers
- ├── frontend/ # React app (Vite)
- │ ├── components/
- │ ├── pages/
- │ └── store/
- ├── .env # Environment variables
- ├── README.md
- └── ...

---

## 🧑‍💻 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/gearup.git
cd gearup

2. Backend Setup

cd backend
npm install

Create a .env file in /backend with the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USERNAME=your_email@example.com
EMAIL_PASSWORD=your_email_password
NODE_ENV=development

Start the backend server:

npm start

3. Frontend Setup

cd ../frontend
npm install

Create a .env file in /frontend:

VITE_BACKEND_URL=https://your-backend-url.onrender.com/api

Start the frontend app:

npm run dev

🌐 Deployment Notes

    Backend: Deployed using Render. On the free tier, the server may go idle. First request after inactivity might take 30–60 seconds to respond.

    Frontend: Recommended deployment on Vercel.

    Cookies: For cross-origin auth in production, make sure your cookies use:

sameSite: 'None',
secure: true

---
