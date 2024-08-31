
##### Here's the updated README file for YourHR Assignment:
---

# YourHR Assignment

### Description

YourHR is a web application that allows users to manage their profiles, including personal details, educational background, work experience, projects, skills, achievements, and resume uploads. Built with Next.js for the frontend and a Node.js/Express backend, 

this project provides a complete user management system with secure authentication using JSON Web Token (JWT), profile editing, and file handling functionalities.

## Features

  **User Registration and Authentication:**

* **Sign-Up**: Users can create an account by entering their username, password, and personal details.
* **Login:** Secure login using JWT for session management.

* **Password Hashing:** Passwords are hashed with bcrypt for security.

* **Token-Based Authentication:** JWT tokens are used to ensure secure access to protected routes.

**Profile Management**


* **User Profile Creation:** Users can input and save their personal details, educational background, work experience, projects, skills, and achievements.

* **Profile Update:** Users can update their profile information and upload new resumes.

* **Resume Upload and Management:** Upload resumes in PDF or Word format with secure storage.


**Secure File Handling**

* **File Validation:** Ensures that only permitted file types are uploaded.

* **File Size Limitation:** Limits the size of uploaded files to 5MB.

* **File Storage Security:** Securely manages file storage to prevent unauthorized access.

**API Integration**

* **RESTful API:** Provides endpoints for user registration, login, profile updates, and file uploads.

* **Data Exchange:** Uses JSON for communication between frontend and backend.

* **Error Handling:** Handles various response statuses and errors gracefully.

---

## Technology Stack

* **Frontend:** Next.js, React.js, Tailwind CSS
* **Backend:** Node.js, Express.js, MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **File Handling:** Multer for file uploads
* **Environment Management:** dotenv for environment variables


---


## Run Locally


**Prerequisites**

Ensure you have the following installed:

Node.js (v14 or later)

MongoDB (Local or Atlas)



**BackEnd:**

```bash
  git clone https://github.com/GauravOOO2/YourHR.git
```

Navigate to the BackEnd Directory:

```bash
  cd YourHR/backEnd

```

Install dependencies

```bash
  npm install
```

Set Environment Variables:

Create a ".env" file in the backend directory and add the following:
```bash
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=SECr3t

```
Start the BackEnd server 

```bash
  node index.js
```

**FrontEnd**

Navigate to the Front End Directory:

```bash
  cd YourHR/frontend

```

Install dependencies

```bash
  npm install
```

Set Environment Variables:

Create a .env file in the frontend directory and add the following:

```bash
NEXT_PUBLIC_LOGIN_URL=http://localhost:5000/api/login
NEXT_PUBLIC_SIGNUP_URL=http://localhost:5000/api/signup
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RESUME_BASE_URL=http://localhost:5000/uploads/resumes/
```
Run the Application 

```bash
  npm run dev
```


## Built by

This project is built by [J.Gaurav Varma](https://github.com/GauravOOO2).
