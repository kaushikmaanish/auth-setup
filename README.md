# Auth Setup Project

A simple and powerful **authentication boilerplate** built with **Node.js, Express, and SQLite**.  
This project provides a clean starting point for handling user authentication, registration, and protected routes in backend applications.

---

## 🚀 Features
- 🔑 User authentication with **JWT** (JSON Web Token)  
- 👤 User registration & login APIs  
- 🛡️ Secure password handling using **bcrypt**  
- 🗄️ SQLite database integration  
- 📂 Organized project structure with controllers and routes  
- 🌱 Easy to extend for real-world projects  

---

## 📂 Project Structure
auth-setup-project/
├── backend/
│ ├── controllers/ # Auth and User logic
│ │ ├── auth.js
│ │ └── user.js
│ ├── db.js # Database setup (SQLite)
│ ├── server.js # Entry point
│ ├── package.json # Dependencies
│ └── data.db # SQLite database
└── README.md


---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: SQLite  
- **Auth**: JWT & bcrypt  

---

## ⚙️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/auth-setup-project.git
   cd auth-setup-project/backend

Install dependencies: npm install
Start the server : npm start


🔗 API Endpoints
Auth Routes

POST /api/register → Register a new user

POST /api/login → Login and receive JWT token

User Routes

GET /api/user → Fetch authenticated user details (requires JWT)


Login : curl -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com", "password":"password123"}'

Response : {
  "token": "your-jwt-token"
}

🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

📜 License

This project is licensed under the MIT License.