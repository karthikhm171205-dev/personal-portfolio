# 🌐 Personal Portfolio

A modern **full-stack personal portfolio website** built to showcase my skills, projects, education, and development experience. The application uses a React-based frontend with a Node.js/Express backend and MongoDB for data management.

## 🚀 Live Demo

**Portfolio:** https://personal-portfolio-u8vw.vercel.app/

## 👨‍💻 About

Hi, I'm **Karthik H M**, a **CSE AIML student** interested in software development, full-stack web development, and Artificial Intelligence & Machine Learning.

This portfolio provides a central place to showcase my technical skills, academic projects, and full-stack development work.

## ✨ Features

* 👤 Personal introduction and About Me section
* 🛠️ Technical skills showcase
* 💻 Projects portfolio
* 📚 Education information
* 📩 Contact section
* 📱 Responsive design
* 🔗 Links to GitHub and other professional profiles
* ⚡ React-based frontend
* 🔐 Backend API
* 🗄️ MongoDB database integration

## 🧰 Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Tools & Platforms

* Git
* GitHub
* VS Code
* Vercel

## 📁 Project Structure

```text
personal-portfolio/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/karthikhm171205-dev/personal-portfolio.git
```

```bash
cd personal-portfolio
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🔌 API

The backend provides REST API endpoints for managing portfolio-related data.

Example:

```text
GET /api/projects
```

The API can be accessed through:

```text
http://localhost:5000/api/projects
```

## 🌍 Deployment

The frontend is deployed using **Vercel**.

### Live Website

https://personal-portfolio-u8vw.vercel.app/

For production deployment, environment variables such as the MongoDB connection string should be configured through the hosting platform rather than committed to GitHub.

## 📸 Screenshots

Add screenshots of your portfolio here.

Example:

```markdown
![Home Page](screenshots/home.png)
![Projects](screenshots/projects.png)
![Contact](screenshots/contact.png)
```

## 📌 Projects

Some of the projects showcased in my portfolio include:

### 📝 Task Management Application

A full-stack task management application with user authentication, authorization, and CRUD operations.

**Technologies:** React, Node.js, Express.js, MongoDB

### 🛒 E-Commerce Web Application

An online shopping application with product management, authentication, cart functionality, and order management.

**Technologies:** React, Node.js, Express.js, MongoDB

### 🎓 Student Academic Tracking System

An application designed to manage and track student academic information.

**Technologies:** TypeScript and web technologies

## 🔮 Future Improvements

* Add more projects and certifications
* Improve UI/UX and animations
* Add dark/light mode
* Add more backend functionality
* Improve contact form integration
* Add AI/ML projects
* Improve performance and accessibility

## 📬 Contact

**Karthik H M**

* GitHub: https://github.com/karthikhm171205-dev
* Portfolio: https://personal-portfolio-u8vw.vercel.app/

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

**Made with ❤️ by Karthik H M**
