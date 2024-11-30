Secret Sharing Platform
A secure and scalable MERN Stack application that allows users to share secrets anonymously or privately. With a focus on security and usability, this platform integrates bcrypt, JWT, and robust CRUD operations to provide a seamless experience.

🌐 Deployed Link - https://secret-share-web.onrender.com/
🖥️ Tech Stack
🌟 Frontend
React.js: Responsive and dynamic UI.
HTML5 and CSS3: Clean and modern design.
JavaScript: Enhanced interactivity and functionality.
🔒 Backend
Node.js: Server-side runtime.
Express.js: Lightweight web application framework.
MongoDB Atlas: Cloud-based NoSQL database.
bcrypt: Password hashing for enhanced security.
JWT: Token-based user authentication.
⚙️ Features
🌟 Frontend Features
Responsive Design: Accessible across devices (desktop, tablet, mobile).
Dynamic Forms: User-friendly forms for login, signup, and secret sharing.
Real-Time Feedback: Displays success/error messages dynamically.
🔧 Backend Features
User Authentication: Passwords are hashed with bcrypt, and sessions are secured with JWT tokens.
Secrets Management: Full CRUD operations (Create, Read, Update, Delete) for secrets.
Password Reset System:
Secure email-based password recovery using nodemailer.
Reset links with token expiration for added security.
Security Best Practices:
Helmet.js: Protects against common web vulnerabilities.
CSP (Content Security Policy): Mitigates XSS attacks.
🚦 API Endpoints Overview
Authentication
Method	Endpoint	Description
POST	/signup	Register a new user.
POST	/login	Log in a registered user.
Secrets Management
Method	Endpoint	Description
POST	/newsecret	Add a new secret.
PUT	/Edit-Secret/:id	Edit an existing secret.
DELETE	/delete-Secret/:id	Delete a secret by ID.
GET	/get-secret	Retrieve all user secrets.
Password Reset
Method	Endpoint	Description
POST	/change-password	Request password reset via email.
POST	/reset-password	Reset password with token.
🚀 Getting Started
🔧 Backend Setup
Clone the repository:

bash
Copy code
git clone <repo-url>
cd <repo-name>
Install backend dependencies:

bash
Copy code
npm install
Add your environment variables in a .env file:

bash
Copy code
JWT_SECRET=your_jwt_secret  
EMAIL_USER=your_email@example.com  
EMAIL_PASS=your_email_password  
MONGO_URI=your_mongoDB_connection_string  
Start the backend server:

bash
Copy code
npm start  
The backend will run on http://localhost:4000 by default.

🌐 Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd client
Install frontend dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
The frontend will run on http://localhost:3000.

📂 File Structure
bash
Copy code
📁 Secret Sharing App  
├── 📁 backend  
│   ├── server.js  
│   ├── routes  
│   └── models  
├── 📁 frontend  
│   ├── src  
│   │   ├── components  
│   │     
│   │   
├── .env  
├── README.md  
└── package.json  
✨ Key Highlights
Fully secure JWT-based authentication.
Scalable MERN stack architecture.
Comprehensive CRUD operations for secrets.
Security best practices with Helmet.js and CSP.
Responsive design for seamless cross-device usage.
