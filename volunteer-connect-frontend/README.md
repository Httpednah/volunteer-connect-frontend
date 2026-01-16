# Volunteer Connect – Frontend

## Overview

Volunteer Connect is a full-stack web application that connects volunteers with organizations offering volunteer opportunities. This repository contains the **frontend** of the application, built with **React** and **Vite**, and communicates with a **Flask REST API backend** via HTTP requests.

The frontend is responsible for:

* User authentication (login & registration)
* Distinguishing between **volunteer users** and **organization users**
* Displaying volunteer opportunities
* Allowing volunteers to apply for opportunities
* Allowing organizations to create and manage opportunities
* Handling basic navigation and client-side validation

This project is designed for a group-based full-stack assessment and follows best practices for separation of concerns between frontend and backend.

---

## Tech Stack

* React (Functional Components)
* Vite (Development & Build Tool)
* React Router DOM (Client-side routing)
* Fetch API (Backend communication)
* CSS (Vanilla CSS for styling)

---

## Project Structure

```
volunteer-connect-frontend/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── api.js
│   ├── index.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Opportunities.jsx
│   │   ├── OrganizationDashboard.jsx
│   │   └── Apply.jsx
│   └── utils/
│       └── auth.js
└── README.md
```

---

## Application Pages

### 1. Login Page

* Allows existing users to log in
* Sends credentials to the backend `/login` endpoint
* Stores logged-in user info in local storage

### 2. Register Page

* Allows new users to sign up
* Users must choose a role: `volunteer` or `organization`
* Sends data to `/register` endpoint

### 3. Home Page

* Landing page after login
* Displays different options depending on user role

### 4. Opportunities Page

* Fetches all volunteer opportunities from `/opportunities`
* Displays opportunity details
* Volunteers can apply

### 5. Organization Dashboard

* Visible only to organization users
* Allows creating new opportunities
* Lists opportunities created by the organization

### 6. Apply Page

* Volunteers submit an application
* Sends application data to `/applications`

---

## Backend Integration

The frontend communicates with the Flask backend using the Fetch API.

### Expected Backend Base URL

```
http://localhost:5000
```

### API Endpoints Used

| Method | Endpoint       | Purpose                       |
| ------ | -------------- | ----------------------------- |
| POST   | /register      | Register a new user           |
| POST   | /login         | Authenticate user             |
| GET    | /opportunities | Fetch all opportunities       |
| POST   | /opportunities | Create opportunity (org only) |
| POST   | /applications  | Apply for opportunity         |

All requests and responses use JSON.

---

## Environment Setup

### 1. Install dependencies

```
npm install
```

### 2. Start development server

```
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## Authentication Handling

* Authentication state is stored in `localStorage`
* User role determines accessible routes
* Protected routes prevent unauthorized access

---

## Development Workflow

* Each contributor works on their own branch
* Frequent small commits are encouraged
* Pull Requests are made into `main`

---

## Deployment Notes

* Frontend is deployed as a static site
* Backend must be deployed separately
* Backend URL should be updated in `api.js` for production

---

## Contribution Guidelines

* Keep components small and reusable
* Do not hardcode backend URLs outside `api.js`
* Ensure code runs without warnings or errors
* Test features manually before committing

---

## License

This project is for educational purposes only.
