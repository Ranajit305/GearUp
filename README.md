🧥 GearUp – Product Showcase Platform
GearUp is a modern web application built with the MERN stack that allows users to browse, add product and enquire about products. It includes authentication, image uploads with Cloudinary, and email enquiry functionality with Nodemailer.

🚀 Features
    👤 User authentication (signup/login/logout)
    🛍️ Add, view, and filter products by category
    📸 Upload product images (cover + additional up to 4)
    📧 Enquire about products via email (Nodemailer)
    🌫️ Beautiful UI with modals, transitions, and responsive design
    ☁️ Cloudinary integration for image uploads

🛠️ Tech Stack
    Frontend: React, Tailwind CSS, Zustand
    Backend: Node.js, Express, MongoDB, Mongoose
    Other Tools: Cloudinary, Nodemailer, JWT, Cookies

📂 Folder Structure
  project-root/
  ├── backend/          # Express API with routes, models, and controllers
  ├── frontend/         # React app (Vite)
  │   ├── components/
  │   ├── pages/
  │   └── store/
  ├── .env              # Environment variables
  ├── README.md
  └── ...

🧑‍💻 Setup Instructions
1. Clone the repository
  git clone https://github.com/your-username/dresser.git
  cd dresser

2. Backend Setup
  cd backend
  npm install

Create a .env file in /backend:
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  EMAIL_USERNAME=your_email@example.com
  EMAIL_PASSWORD=your_email_password
  NODE_ENV=development

Run the backend server:
  npm start

3. Frontend Setup
  cd ../frontend
  npm install

Create a .env file in /frontend:
  VITE_BACKEND_URL=https://your-backend-url.onrender.com/api

Start the React app:
  npm run dev

🌐 Deployment Notes
    Backend: Deployed using Render. May take ~30–60s to wake up after idle (free tier).
    Frontend: Deploy with Vercel.
    Cookies: Set sameSite: 'none' and secure: true for cross-origin auth to work in production.
